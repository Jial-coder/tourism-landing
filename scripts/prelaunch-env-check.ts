#!/usr/bin/env tsx
/**
 * prelaunch-env-check
 *
 * Local release gate for production environment readiness. It loads Next.js
 * env files, validates variable presence and obvious placeholders, and never
 * connects to Supabase, Turnstile, Feishu, or any other external service.
 */
import { loadEnvConfig } from '@next/env';

const ROOT = process.cwd();
const outputJson = process.argv.includes('--json') || process.argv.includes('--format=json');

loadEnvConfig(ROOT, false, {
  info: () => undefined,
  error: (...args: unknown[]) => console.error(...args),
});

type Check = {
  name: string;
  severity: 'error' | 'warning';
  message: string;
};

type EnvSpec = {
  name: string;
  required: boolean;
  description: string;
  validate?: (value: string) => string | null;
};

const specs: EnvSpec[] = [
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    description: 'Supabase project URL for client and server configuration',
    validate: (value) =>
      /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(value)
        ? null
        : 'must look like https://<project-ref>.supabase.co',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
    required: true,
    description: 'Supabase publishable client key',
  },
  {
    name: 'SUPABASE_SECRET_KEY',
    required: true,
    description: 'Server-only Supabase secret key for admin/server paths',
  },
  {
    name: 'DATABASE_URL',
    required: true,
    description: 'Postgres connection string used by Drizzle lead inserts',
    validate: (value) =>
      /^postgres(ql)?:\/\//i.test(value)
        ? null
        : 'must be a postgres:// or postgresql:// connection string',
  },
  {
    name: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
    required: true,
    description: 'Cloudflare Turnstile public site key for the lead form',
  },
  {
    name: 'TURNSTILE_SECRET_KEY',
    required: true,
    description: 'Server-only Cloudflare Turnstile secret key for /api/leads',
  },
  {
    name: 'SUPABASE_PROJECT_REF',
    required: false,
    description: 'Supabase project ref used for notification dashboard links',
  },
  {
    name: 'NEXT_PUBLIC_WHATSAPP_PHONE',
    required: false,
    description: 'Optional public WhatsApp E.164 number for navigation shortcuts',
    validate: (value) =>
      /^\d{8,15}$/.test(value.replace(/\D/g, ''))
        ? null
        : 'should be an E.164-like number without a leading plus, for example 8613800138000',
  },
  {
    name: 'FEISHU_WEBHOOK_URL',
    required: false,
    description: 'Optional server-only Feishu webhook for lead notifications',
    validate: (value) =>
      /^https:\/\//i.test(value) ? null : 'should be an https:// webhook URL when configured',
  },
];

const originGroups: { names: string[]; description: string }[] = [
  {
    names: ['SITE_URL', 'NEXT_PUBLIC_SITE_URL', 'VERCEL_URL'],
    description: 'one production origin for SEO/Open Graph metadata',
  },
];

function valueOf(name: string): string {
  return (process.env[name] ?? '').trim();
}

function isPlaceholder(value: string): boolean {
  if (!value) return false;
  return /YOUR-|PLACEHOLDER|PASSWORD|example\.com|example-tourism\.demo/i.test(value);
}

const checks: Check[] = [];

for (const spec of specs) {
  const value = valueOf(spec.name);
  if (!value) {
    checks.push({
      name: spec.name,
      severity: spec.required ? 'error' : 'warning',
      message: `${spec.description} is not set`,
    });
    continue;
  }

  if (isPlaceholder(value)) {
    checks.push({
      name: spec.name,
      severity: spec.required ? 'error' : 'warning',
      message: `${spec.description} still contains a placeholder value`,
    });
    continue;
  }

  const validationMessage = spec.validate?.(value);
  if (validationMessage) {
    checks.push({
      name: spec.name,
      severity: spec.required ? 'error' : 'warning',
      message: validationMessage,
    });
  }
}

for (const group of originGroups) {
  const value = group.names.map(valueOf).find(Boolean);
  if (!value) {
    checks.push({
      name: group.names.join(' | '),
      severity: 'error',
      message: `Set ${group.description}`,
    });
  } else if (isPlaceholder(value)) {
    checks.push({
      name: group.names.join(' | '),
      severity: 'error',
      message: `${group.description} still contains a placeholder value`,
    });
  }
}

const errors = checks.filter((check) => check.severity === 'error');
const warnings = checks.filter((check) => check.severity === 'warning');

if (outputJson) {
  console.log(JSON.stringify({
    ok: errors.length === 0,
    generatedAt: new Date().toISOString(),
    totals: { errors: errors.length, warnings: warnings.length },
    checks,
  }, null, 2));
  process.exit(errors.length === 0 ? 0 : 1);
}

if (errors.length === 0) {
  console.log(
    `[prelaunch-env-check] PASS — required production env is present (${warnings.length} warnings)`,
  );
  for (const warning of warnings) {
    console.warn(`  warning  ${warning.name}: ${warning.message}`);
  }
  process.exit(0);
}

console.error(`[prelaunch-env-check] FAIL — ${errors.length} required env issues found:\n`);
for (const error of errors) {
  console.error(`  error  ${error.name}: ${error.message}`);
}
if (warnings.length > 0) {
  console.error('\nWarnings:');
  for (const warning of warnings) {
    console.error(`  warning  ${warning.name}: ${warning.message}`);
  }
}
process.exit(1);
