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
 *   - components/**\/*.tsx       → <MockBadge ...> JSX | known placeholder URIs
 *   - app/**\/*.tsx              → <MockBadge ...> JSX | known placeholder URIs
 *
 * Allowlist:
 *   mock-allowlist.json at repo root. Each entry:
 *     { path: <prefix>, reason: <text>, expires: <YYYY-MM-DD> }
 *   Expired entries are ignored (still flagged) so the gate cannot rot silently.
 *
 * Output: ESLint-style `<file>:<line>:<col>  error  <message>  <rule-id>`
 *   Add --json for machine-readable output.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const enforceProduction =
  process.env.NODE_ENV === 'production' ||
  process.argv.includes('--enforce-production');
const outputJson = process.argv.includes('--json') || process.argv.includes('--format=json');

if (!enforceProduction) {
  if (outputJson) {
    console.log(JSON.stringify({
      ok: true,
      skipped: true,
      reason: 'dev mode',
      generatedAt: new Date().toISOString(),
      violations: [],
      totals: { violations: 0, byRule: {}, byFile: {} },
    }, null, 2));
  } else {
    console.log('[prelaunch-mock-guard] dev mode — skipping mock scan');
  }
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
  return out.sort();
}

const violations: Violation[] = [];

const placeholderPatterns: { rule: string; message: string; re: RegExp }[] = [
  { rule: 'placeholder-uri', message: 'Placeholder host example-tourism.demo', re: /example-tourism\.demo/ },
  { rule: 'placeholder-uri', message: 'Placeholder email hello@example.com', re: /hello@example\.com/i },
  { rule: 'placeholder-uri', message: 'Empty WhatsApp link https://wa.me/', re: /^https:\/\/wa\.me\/?$/ },
  { rule: 'placeholder-uri', message: 'Placeholder WhatsApp number wa.me/86130…', re: /wa\.me\/86130\d{8}/ },
  { rule: 'placeholder-uri', message: 'Placeholder WhatsApp phone 86130000000…', re: /86130000000\d+/ },
  { rule: 'placeholder-uri', message: 'Placeholder phone +861000000000', re: /\+861000000000/ },
  { rule: 'placeholder-uri', message: 'Placeholder weixin demo profile', re: /weixin:\/\/contacts\/profile\/demo/ },
];

function getNodeLocation(sourceFile: ts.SourceFile, pos: number): { line: number; col: number } {
  const loc = sourceFile.getLineAndCharacterOfPosition(pos);
  return { line: loc.line + 1, col: loc.character + 1 };
}

function getPropertyNameText(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  return null;
}

function isStringLiteralNode(node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);
}

function scanDataFile(file: string): void {
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  function addViolation(node: ts.Node, rule: string, message: string): void {
    const pos = node.getStart(sourceFile);
    const { line, col } = getNodeLocation(sourceFile, pos);
    violations.push({ file, line, col, rule, message });
  }

  function visit(node: ts.Node): void {
    if (ts.isPropertyAssignment(node)) {
      const propertyName = getPropertyNameText(node.name);
      if (propertyName === 'status' && isStringLiteralNode(node.initializer) && node.initializer.text === 'mock') {
        addViolation(
          node.name,
          'mock-status',
          "Found `status: 'mock'` — mock data in production build",
        );
      }
      if (propertyName === 'mock' && node.initializer.kind === ts.SyntaxKind.TrueKeyword) {
        addViolation(node.name, 'mock-flag', 'Found `mock: true` — mock data in production build');
      }
    }

    if (isStringLiteralNode(node)) {
      for (const { rule, message, re } of placeholderPatterns) {
        if (re.test(node.text)) {
          addViolation(node, rule, message);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function scanSourceFilePlaceholders(file: string, scriptKind: ts.ScriptKind): void {
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  const sourceFile = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true, scriptKind);

  function addViolation(node: ts.Node, rule: string, message: string): void {
    const pos = node.getStart(sourceFile);
    const { line, col } = getNodeLocation(sourceFile, pos);
    violations.push({ file, line, col, rule, message });
  }

  function visit(node: ts.Node): void {
    if (isStringLiteralNode(node)) {
      for (const { rule, message, re } of placeholderPatterns) {
        if (re.test(node.text)) {
          addViolation(node, rule, message);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function countBy(items: string[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] ?? 0) + 1;
    return acc;
  }, {});
}

function emitJsonAndExit(exitCode: number): never {
  console.log(JSON.stringify({
    ok: violations.length === 0,
    skipped: false,
    generatedAt: new Date().toISOString(),
    allowlist: allowlist.map((entry) => ({
      path: entry.path,
      reason: entry.reason,
      expires: entry.expires,
    })),
    totals: {
      violations: violations.length,
      byRule: countBy(violations.map((v) => v.rule)),
      byFile: countBy(violations.map((v) => v.file)),
    },
    violations,
  }, null, 2));
  process.exit(exitCode);
}

for (const file of listFiles('lib/data', '.ts')) {
  if (isAllowed(file)) continue;
  scanDataFile(file);
}

for (const file of listFiles('components', '.tsx')) {
  if (isAllowed(file)) continue;
  const content = readFileSync(path.join(ROOT, file), 'utf-8');
  // Skip the MockBadge component definition itself — that's the implementation.
  if (file.endsWith('components/trust/MockBadge.tsx')) continue;
  scanSourceFilePlaceholders(file, ts.ScriptKind.TSX);
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
  scanSourceFilePlaceholders(file, ts.ScriptKind.TSX);
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
  if (outputJson) emitJsonAndExit(0);
  console.log('[prelaunch-mock-guard] PASS — no mock data found in production scan');
  process.exit(0);
}

if (outputJson) emitJsonAndExit(1);

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
