import { after, NextResponse, type NextRequest } from 'next/server';
import { createHash } from 'node:crypto';
import { leadFormSchema } from '@/lib/data/lead-form';
import { getSupabaseAdmin } from '@/lib/db';
import { requiresTurnstileSecret } from '@/lib/security/turnstile-env';

export const runtime = 'nodejs';

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const ipBuckets = new Map<string, number[]>();

const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

function hashIp(ip: string): string {
  const salt = new Date().toISOString().slice(0, 10);
  return createHash('sha256').update(`${ip}|${salt}`).digest('hex').slice(0, 32);
}

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const bucket = (ipBuckets.get(ipHash) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (bucket.length >= RATE_LIMIT) {
    ipBuckets.set(ipHash, bucket);
    return false;
  }
  bucket.push(now);
  ipBuckets.set(ipHash, bucket);
  return true;
}

async function verifyTurnstile(token: string, remoteip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (requiresTurnstileSecret()) {
      console.error('[lead-spam] TURNSTILE_SECRET_KEY not set in production');
      return false;
    }
    console.warn('[lead-spam] TURNSTILE_SECRET_KEY not set — bypassing siteverify in dev');
    return true;
  }
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip });
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (err) {
    console.error('[lead-spam] turnstile siteverify error', err);
    return false;
  }
}

async function notifyFeishu(payload: {
  rowId: string;
  locale: string;
  source: string;
  name: string;
  email: string;
  country?: string;
  tripFocus: string;
  travelMonth: string;
  duration: number;
  partySize: number;
  preferredChannel: string;
  message: string;
}) {
  const url = process.env.FEISHU_WEBHOOK_URL;
  if (!url) {
    console.log(
      `[lead-notify] FEISHU_WEBHOOK_URL not set — skipping notify (lead row id=${payload.rowId})`,
    );
    return;
  }
  const projectRef = process.env.SUPABASE_PROJECT_REF ?? '';
  const tableUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}/editor`
    : '(set SUPABASE_PROJECT_REF for direct link)';
  const summaryMessage = (payload.message || '').slice(0, 200);
  const text = [
    `🆕 New lead — ${payload.name} (${payload.email})`,
    `Locale: ${payload.locale} · Source: ${payload.source}`,
    `Country: ${payload.country ?? '—'}`,
    `Trip focus: ${payload.tripFocus || '—'}`,
    `Travel: ${payload.travelMonth} · ${payload.duration} days · party of ${payload.partySize}`,
    `Preferred channel: ${payload.preferredChannel}`,
    `Message: ${summaryMessage}`,
    ``,
    `Row id: ${payload.rowId}`,
    `Supabase Table Editor: ${tableUrl}`,
  ].join('\n');
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ msg_type: 'text', content: { text } }),
    });
    if (!res.ok) {
      console.error('[lead-notify] feishu webhook returned', res.status);
    }
  } catch (err) {
    console.error('[lead-notify] feishu webhook error', err);
  }
}

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(raw);
  if (!parsed.success) {
    const honeypotIssue = parsed.error.issues.find((i) => i.path[0] === 'company_website');
    if (honeypotIssue) {
      const ip = getClientIp(request);
      console.warn('[lead-spam] honeypot hit', { ip_hash: hashIp(ip) });
      return NextResponse.json({ ok: true, id: 'silenced' }, { status: 200 });
    }
    const turnstileIssue = parsed.error.issues.find((i) => i.path[0] === 'turnstileToken');
    if (turnstileIssue) {
      return NextResponse.json({ ok: false, error: 'turnstile_failed' }, { status: 400 });
    }
    return NextResponse.json(
      {
        ok: false,
        error: 'validation_failed',
        issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const ip = getClientIp(request);
  const ipHash = hashIp(ip);

  if (!checkRateLimit(ipHash)) {
    console.warn('[lead-spam] rate limit', { ip_hash: ipHash });
    return NextResponse.json({ ok: false, error: 'rate_limit' }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    console.warn('[lead-spam] turnstile fail', { ip_hash: ipHash });
    return NextResponse.json({ ok: false, error: 'turnstile_failed' }, { status: 400 });
  }

  let rowId: string;
  try {
    const { data: row, error } = await getSupabaseAdmin()
      .from('leads')
      .insert({
        locale: data.locale,
        name: data.name,
        email: data.email,
        country: data.country || null,
        travel_dates: data.travelMonth,
        duration: data.durationDays,
        party_size: data.partySize,
        interests: data.tripFocus ? [data.tripFocus] : null,
        budget_range: data.budgetRange || null,
        preferred_contact: data.preferredChannel,
        message: data.notes || null,
        source_path: data.source,
        ip_hash: ipHash,
        user_agent: request.headers.get('user-agent') || null,
      })
      .select('id')
      .single();
    if (error) throw error;
    rowId = (row as { id?: string } | null)?.id ?? '';
    if (!rowId) throw new Error('Supabase insert returned no row id');
  } catch (err) {
    console.error('[lead-db] insert failed', err);
    return NextResponse.json({ ok: false, error: 'db_insert_failed' }, { status: 500 });
  }

  after(() => {
    return notifyFeishu({
      rowId,
      locale: data.locale,
      source: data.source,
      name: data.name,
      email: data.email,
      country: data.country || undefined,
      tripFocus: data.tripFocus,
      travelMonth: data.travelMonth,
      duration: data.durationDays,
      partySize: data.partySize,
      preferredChannel: data.preferredChannel,
      message: data.notes || '',
    });
  });

  return NextResponse.json({ ok: true, id: rowId }, { status: 200 });
}
