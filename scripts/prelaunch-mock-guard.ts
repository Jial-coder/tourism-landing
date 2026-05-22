#!/usr/bin/env tsx
/**
 * prelaunch-mock-guard
 *
 * Release gate that fails the production build when mock / placeholder data
 * leaks into shipped code. In dev / preview it is a no-op.
 *
 * Activation:
 *   - NODE_ENV === 'production'
 *   - or CLI flag --enforce-production
 *
 * Scans:
 *   - lib/data/**\/*.ts          → status: 'mock' | mock: true | known placeholder URIs
 *   - components/**\/*.tsx       → <MockBadge ...> JSX
 *   - app/**\/*.tsx              → <MockBadge ...> JSX (route-level usages)
 *
 * Allowlist:
 *   mock-allowlist.json at repo root. Each entry:
 *     { path: <prefix>, reason: <text>, expires: <YYYY-MM-DD> }
 *   Expired entries are ignored (still flagged) so the gate cannot rot silently.
 *
 * Output: ESLint-style `<file>:<line>:<col>  error  <message>  <rule-id>`
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const enforceProduction =
  process.env.NODE_ENV === 'production' ||
  process.argv.includes('--enforce-production');

if (!enforceProduction) {
  console.log('[prelaunch-mock-guard] dev mode — skipping mock scan');
  process.exit(0);
}

type AllowEntry = { path: string; reason: string; expires: string };
type Violation = {
  file: string;
  line: number;
  col: number;
  rule: string;
  message: string;
};

const today = new Date().toISOString().slice(0, 10);

function loadAllowlist(): AllowEntry[] {
  const p = path.join(ROOT, 'mock-allowlist.json');
  if (!existsSync(p)) return [];
  try {
    const raw = JSON.parse(readFileSync(p, 'utf-8'));
    const entries: AllowEntry[] = Array.isArray(raw?.entries) ? raw.entries : [];
    const valid: AllowEntry[] = [];
    for (const e of entries) {
      if (!e?.path || !e?.expires) continue;
      if (e.expires < today) {
        console.error(
          `[prelaunch-mock-guard] allowlist entry expired and ignored: ${e.path} (expired ${e.expires})`,
        );
        continue;
      }
      valid.push(e);
    }
    return valid;
  } catch (err) {
    console.error(`[prelaunch-mock-guard] failed to read mock-allowlist.json: ${(err as Error).message}`);
    return [];
  }
}

const allowlist = loadAllowlist();

function isAllowed(relPath: string): boolean {
  const norm = relPath.replace(/\\/g, '/');
  return allowlist.some((entry) => norm.startsWith(entry.path.replace(/\\/g, '/')));
}

function listFiles(dir: string, ext: string): string[] {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) return [];
  const entries = readdirSync(abs, { recursive: true, withFileTypes: true }) as ReadonlyArray<{
    name: string;
    parentPath?: string;
    path?: string;
    isFile(): boolean;
  }>;
  const out: string[] = [];
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    if (!ent.name.endsWith(ext)) continue;
    const parent = ent.parentPath ?? ent.path ?? abs;
    const rel = path.relative(ROOT, path.join(parent, ent.name)).replace(/\\/g, '/');
    out.push(rel);
  }
  return out;
}

const violations: Violation[] = [];

const placeholderPatterns: { rule: string; message: string; re: RegExp }[] = [
  { rule: 'placeholder-uri', message: 'Placeholder host example-tourism.demo', re: /example-tourism\.demo/ },
  { rule: 'placeholder-uri', message: 'Placeholder WhatsApp number wa.me/86130…', re: /wa\.me\/86130\d{8}/ },
  { rule: 'placeholder-uri', message: 'Placeholder phone +861000000000', re: /\+861000000000/ },
  { rule: 'placeholder-uri', message: 'Placeholder weixin demo profile', re: /weixin:\/\/contacts\/profile\/demo/ },
];

for (const file of listFiles('lib/data', '.ts')) {
  if (isAllowed(file)) continue;
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const mockStatus = line.match(/status:\s*['"]mock['"]/);
    if (mockStatus) {
      violations.push({
        file,
        line: idx + 1,
        col: (mockStatus.index ?? 0) + 1,
        rule: 'mock-status',
        message: "Found `status: 'mock'` — mock data in production build",
      });
    }
    const mockFlag = line.match(/mock:\s*true/);
    if (mockFlag) {
      violations.push({
        file,
        line: idx + 1,
        col: (mockFlag.index ?? 0) + 1,
        rule: 'mock-flag',
        message: 'Found `mock: true` — mock data in production build',
      });
    }
    for (const { rule, message, re } of placeholderPatterns) {
      const m = line.match(re);
      if (m) {
        violations.push({
          file,
          line: idx + 1,
          col: (m.index ?? 0) + 1,
          rule,
          message,
        });
      }
    }
  });
}

for (const file of listFiles('components', '.tsx')) {
  if (isAllowed(file)) continue;
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  // Skip the MockBadge component definition itself — that's the implementation.
  if (file.endsWith('components/trust/MockBadge.tsx')) continue;
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const m = line.match(/<MockBadge\b/);
    if (m) {
      violations.push({
        file,
        line: idx + 1,
        col: (m.index ?? 0) + 1,
        rule: 'mock-badge',
        message: '<MockBadge> JSX found — should be hidden in production',
      });
    }
  });
}

for (const file of listFiles('app', '.tsx')) {
  if (isAllowed(file)) continue;
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const m = line.match(/<MockBadge\b/);
    if (m) {
      violations.push({
        file,
        line: idx + 1,
        col: (m.index ?? 0) + 1,
        rule: 'mock-badge',
        message: '<MockBadge> JSX found — should be hidden in production',
      });
    }
  });
}

if (violations.length === 0) {
  console.log('[prelaunch-mock-guard] PASS — no mock data found in production scan');
  process.exit(0);
}

console.error(`[prelaunch-mock-guard] FAIL — ${violations.length} violations found:\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}:${v.col}  error  ${v.message}  ${v.rule}`);
}
console.error('\nFix options:');
console.error('  1. Replace mock data with real data');
console.error("  2. Set status: 'hidden' instead of 'mock' (data will not render in prod)");
console.error('  3. Add a time-bound entry to mock-allowlist.json (use sparingly)');
console.error('\nSee docs/superpowers/specs/2026-05-22-pandatravel-design-spec.md §6 mock strategy');
process.exit(1);
