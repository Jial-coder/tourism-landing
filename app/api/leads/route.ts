import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';

// Stub for #21 — Phase 5 Task 5.3 will replace this with Drizzle write +
// Turnstile siteverify + Feishu webhook + Supabase RLS service-role insert.
export async function POST(request: NextRequest) {
  await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, id: `stub-${Date.now()}` }, { status: 200 });
}
