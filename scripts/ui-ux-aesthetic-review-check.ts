#!/usr/bin/env tsx
/**
 * Validate the rendered aesthetic review packet used by AI follow-up agents.
 *
 * This script does not judge taste. It checks whether the current review packet
 * is machine-readable, references real evidence files, and contains the fields
 * needed for the evaluate -> propose -> implement -> verify loop.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type ReviewIssue = {
  id?: string;
  severity?: string;
  evidence?: string[];
  diagnosis?: string;
  status?: string;
};

type ReviewPacket = {
  run?: string;
  date?: string;
  project?: string;
  scenario?: string;
  skillRoute?: string;
  evidenceLevel?: string;
  inputs?: {
    status?: string;
    renderSummary?: string;
    screenshots?: string[];
    localSmokeEvidence?: string[];
  };
  overallJudgment?: string;
  strongestAssets?: string[];
  mainIssuesBeforeThisRun?: ReviewIssue[];
  implementedChanges?: Array<{
    file?: string;
    change?: string;
    truthBoundary?: string;
  }>;
  verification?: {
    fullStatusCommand?: string;
    fullStatusExitCode?: number;
    expectedNonZeroReason?: string[];
    passingChecks?: Record<string, string>;
  };
  remainingRisks?: string[];
  nextRequiredStage?: string;
};

type RenderEvidence = {
  pages: Array<{
    screenshot?: string;
    ok?: boolean;
  }>;
  totals: {
    errors: number;
    consoleErrors: number;
    pageErrors: number;
    overflowPages: number;
  };
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const packetArg = process.argv.find((arg) => arg.startsWith('--packet='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;
const packetPath = packetArg
  ? path.resolve(ROOT, packetArg.slice('--packet='.length))
  : path.join(outDir, 'render-review-packet.json');

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

function existsRelative(base: string, relativePath: string | undefined): boolean {
  if (!relativePath) return false;
  return existsSync(path.resolve(base, relativePath));
}

function writeText(file: string, content: string): string {
  const target = path.join(outDir, file);
  writeFileSync(target, content, 'utf-8');
  return target;
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const issues: string[] = [];
let packet: ReviewPacket | null = null;
let renderEvidence: RenderEvidence | null = null;

if (!existsSync(packetPath)) {
  issues.push(`review packet missing: ${path.relative(ROOT, packetPath)}`);
} else {
  try {
    packet = readJson<ReviewPacket>(packetPath);
  } catch (error) {
    issues.push(`review packet is not valid JSON: ${(error as Error).message}`);
  }
}

const renderEvidencePath = path.join(outDir, 'render-evidence-summary.json');
if (existsSync(renderEvidencePath)) {
  try {
    renderEvidence = readJson<RenderEvidence>(renderEvidencePath);
  } catch (error) {
    issues.push(`render evidence summary is not valid JSON: ${(error as Error).message}`);
  }
} else {
  issues.push('render-evidence-summary.json is missing');
}

if (packet) {
  const requiredStringFields: Array<keyof ReviewPacket> = [
    'run',
    'date',
    'project',
    'scenario',
    'skillRoute',
    'evidenceLevel',
    'overallJudgment',
    'nextRequiredStage',
  ];

  for (const field of requiredStringFields) {
    if (!packet[field] || typeof packet[field] !== 'string') {
      issues.push(`packet field ${field} is missing or not a string`);
    }
  }

  if (packet.scenario !== 'website-landing') {
    issues.push(`packet scenario should be website-landing, got ${packet.scenario ?? 'missing'}`);
  }
  if (packet.skillRoute !== 'ui-ux-aesthetic-review') {
    issues.push(`packet skillRoute should be ui-ux-aesthetic-review, got ${packet.skillRoute ?? 'missing'}`);
  }

  if (!packet.inputs?.status || !existsRelative(outDir, packet.inputs.status)) {
    issues.push('packet inputs.status does not point to an existing artifact');
  }
  if (!packet.inputs?.renderSummary || !existsRelative(outDir, packet.inputs.renderSummary)) {
    issues.push('packet inputs.renderSummary does not point to an existing artifact');
  }

  const screenshots = packet.inputs?.screenshots ?? [];
  if (screenshots.length === 0) {
    issues.push('packet inputs.screenshots is empty');
  }
  for (const screenshot of screenshots) {
    if (!existsRelative(outDir, screenshot)) {
      issues.push(`packet screenshot missing: ${screenshot}`);
    }
  }

  const expectedScreenshots = renderEvidence?.pages
    .map((page) => page.screenshot)
    .filter((value): value is string => Boolean(value)) ?? [];
  for (const screenshot of expectedScreenshots) {
    if (!screenshots.includes(screenshot)) {
      issues.push(`packet does not reference render evidence screenshot: ${screenshot}`);
    }
  }

  if (!packet.strongestAssets || packet.strongestAssets.length < 2) {
    issues.push('packet needs at least two strongestAssets');
  }
  if (!packet.mainIssuesBeforeThisRun || packet.mainIssuesBeforeThisRun.length < 1) {
    issues.push('packet needs mainIssuesBeforeThisRun');
  }
  if (!packet.implementedChanges || packet.implementedChanges.length < 1) {
    issues.push('packet needs implementedChanges');
  }
  if (!packet.remainingRisks || packet.remainingRisks.length < 1) {
    issues.push('packet needs remainingRisks');
  }

  for (const issue of packet.mainIssuesBeforeThisRun ?? []) {
    if (!issue.id) issues.push('review issue missing id');
    if (!issue.severity) issues.push(`review issue ${issue.id ?? '<unknown>'} missing severity`);
    if (!issue.diagnosis) issues.push(`review issue ${issue.id ?? '<unknown>'} missing diagnosis`);
    if (!issue.status) issues.push(`review issue ${issue.id ?? '<unknown>'} missing status`);
  }

  for (const change of packet.implementedChanges ?? []) {
    if (!change.file) {
      issues.push('implemented change missing file');
      continue;
    }
    if (!existsSync(path.resolve(ROOT, change.file))) {
      issues.push(`implemented change file missing: ${change.file}`);
    }
    if (!change.truthBoundary) {
      issues.push(`implemented change ${change.file} missing truthBoundary`);
    }
  }
}

if (renderEvidence) {
  if (
    renderEvidence.totals.errors > 0 ||
    renderEvidence.totals.consoleErrors > 0 ||
    renderEvidence.totals.overflowPages > 0
  ) {
    issues.push('render evidence has blocking errors, console errors, or horizontal overflow pages');
  }
}

const validation = {
  run: 'run-14-aesthetic-review-packet-check',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  packetPath: path.relative(ROOT, packetPath).replace(/\\/g, '/'),
  ok: issues.length === 0,
  issueCount: issues.length,
  issues,
  summary: packet
    ? {
        reviewRun: packet.run,
        scenario: packet.scenario,
        skillRoute: packet.skillRoute,
        evidenceLevel: packet.evidenceLevel,
        issueCount: packet.mainIssuesBeforeThisRun?.length ?? 0,
        implementedChangeCount: packet.implementedChanges?.length ?? 0,
        remainingRiskCount: packet.remainingRisks?.length ?? 0,
        nextRequiredStage: packet.nextRequiredStage,
      }
    : null,
};

writeText('aesthetic-review-validation.json', `${JSON.stringify(validation, null, 2)}\n`);

const md = `# Aesthetic Review Status

Date: 2026-05-24
Run: \`run-14-aesthetic-review-packet-check\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Issue count: \`${validation.issueCount}\`
- Packet: \`${validation.packetPath}\`

## Packet Summary

${validation.summary ? `- Review run: \`${validation.summary.reviewRun}\`
- Scenario: \`${validation.summary.scenario}\`
- Skill route: \`${validation.summary.skillRoute}\`
- Evidence level: ${validation.summary.evidenceLevel}
- Review issues: \`${validation.summary.issueCount}\`
- Implemented changes: \`${validation.summary.implementedChangeCount}\`
- Remaining risks: \`${validation.summary.remainingRiskCount}\`
- Next required stage: \`${validation.summary.nextRequiredStage}\`` : '- Packet unavailable.'}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No packet integrity issues found.'}
`;

writeText('AESTHETIC-REVIEW-STATUS.md', md);

console.log(JSON.stringify(validation, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
