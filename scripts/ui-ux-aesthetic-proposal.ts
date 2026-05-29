#!/usr/bin/env tsx
/**
 * Produce the AI-facing proposal layer for the rendered aesthetic review.
 *
 * The proposal is the "propose" stage of the evaluate -> propose -> implement
 * -> verify loop. It is derived from the current review packet and explains
 * the selected plan, tradeoffs, boundaries, and acceptance criteria.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

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
  mainIssuesBeforeThisRun?: Array<{
    id?: string;
    severity?: string;
    evidence?: string[];
    diagnosis?: string;
    status?: string;
  }>;
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

type ReviewValidation = {
  ok: boolean;
  issueCount: number;
  issues: string[];
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const packetArg = process.argv.find((arg) => arg.startsWith('--packet='));
const reviewArg = process.argv.find((arg) => arg.startsWith('--review-validation='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;
const packetPath = packetArg
  ? path.resolve(ROOT, packetArg.slice('--packet='.length))
  : path.join(outDir, 'render-review-packet.json');
const reviewValidationPath = reviewArg
  ? path.resolve(ROOT, reviewArg.slice('--review-validation='.length))
  : path.join(outDir, 'aesthetic-review-validation.json');

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
let reviewValidation: ReviewValidation | null = null;

if (!existsSync(packetPath)) {
  issues.push(`missing review packet: ${path.relative(ROOT, packetPath)}`);
} else {
  try {
    packet = readJson<ReviewPacket>(packetPath);
  } catch (error) {
    issues.push(`review packet is not valid JSON: ${(error as Error).message}`);
  }
}

if (!existsSync(reviewValidationPath)) {
  issues.push(`missing review validation: ${path.relative(ROOT, reviewValidationPath)}`);
} else {
  try {
    reviewValidation = readJson<ReviewValidation>(reviewValidationPath);
  } catch (error) {
    issues.push(`review validation is not valid JSON: ${(error as Error).message}`);
  }
}

if (reviewValidation && !reviewValidation.ok) {
  issues.push('review packet validation is not OK');
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

const selectedPlan = {
  name: 'First visual trust pass and thin-state polish',
  summary:
    'Preserve the high-end local China travel direction, remove hidden placeholder surfaces from the rendered homepage, and turn the itinerary index empty state into a deliberate custom-route entry without fabricating advisor, review, pricing, or contact claims.',
  owners: [
    {
      role: 'UX reviewer',
      responsibility: 'Prioritize rendered aesthetic issues that reduce trust, conversion clarity, or editorial quality.',
    },
    {
      role: 'Frontend implementer',
      responsibility: 'Apply scoped component and route changes that keep existing design tokens and content truth boundaries intact.',
    },
    {
      role: 'QA verifier',
      responsibility: 'Rerun render, accessibility, keyboard, typecheck, i18n, build, and full orchestration checks.',
    },
    {
      role: 'Memory steward',
      responsibility: 'Record the run trace, reusable lesson, and verified handoff in AgentMemory and project-local artifacts.',
    },
  ],
  implementationScope: [
    'homepage hidden advisor/trust placeholder sections',
    '/itineraries empty public state after hidden sample routes',
    '/plan wizard surface contrast and responsive rhythm',
    'review packet and proposal wording for the current visual pass',
    'render, axe, keyboard, and full orchestration verification',
  ],
  tradeoffs: [
    'A thinner homepage is preferable to visible placeholder advisor or trust proof blocks.',
    'The itinerary index should become a polished custom-route entry while no itinerary/pricing samples are verified.',
    'The /plan pass is intentionally surface-level; it avoids changing validation, submission logic, or the lead schema.',
  ],
  rejectedAlternatives: [
    'Restoring hidden advisor, review, itinerary, pricing, or direct-contact content for visual fullness',
    'Deleting the itinerary index route instead of making the empty state intentional',
    'Starting a broad redesign or changing global design tokens before verifying the first visual pass',
  ],
  implementationBoundaries: [
    'No fabricated advisor identities, reviews, credentials, itinerary prices, or direct contact channels',
    'No weakening production-mock-gate or product-decision-matrix',
    'No global design-system mutation',
    'No lead-form API, schema, database, auth, or Turnstile changes',
    'No destructive cleanup of unrelated dirty worktree files',
  ],
  acceptanceCriteria: [
    'Homepage no longer renders hidden advisor cards or an empty trust-proof section.',
    '/itineraries no longer advertises unavailable sample routes or shows filters when the public itinerary list is empty.',
    '/itineraries has a visual, image-led custom-route entry on desktop and mobile.',
    '/plan keeps the same wizard behavior while improving surface contrast and spacing.',
    'Render evidence reports 12 pages with 0 errors, 0 console errors, and 0 horizontal overflow pages.',
    'Axe and keyboard smoke checks remain at 0 failures.',
    'The full UI/UX orchestration status exits successfully after the reviewed changes.',
  ],
  verificationCommands: [
    'pnpm run qa:uiux:review',
    'pnpm run qa:uiux:propose',
    'pnpm run qa:uiux:status -- --full --render',
    'pnpm typecheck',
    'pnpm run check:i18n',
    'pnpm run build',
  ],
  evidenceFiles: [
    'qa/ui-ux-review/codex-2026-05-24/RENDERED-AESTHETIC-REVIEW.md',
    'qa/ui-ux-review/codex-2026-05-24/render-review-packet.json',
    'qa/ui-ux-review/codex-2026-05-24/aesthetic-review-validation.json',
    'qa/ui-ux-review/codex-2026-05-24/render-evidence-summary.json',
    'qa/ui-ux-review/codex-2026-05-24/AXE-AUDIT.md',
    'qa/ui-ux-review/codex-2026-05-24/KEYBOARD-FLOW.md',
  ],
};

const proposal = {
  run: 'run-15-aesthetic-proposal-packaging',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  scenario: packet?.scenario ?? 'website-landing',
  skillRoute: packet?.skillRoute ?? 'ui-ux-aesthetic-review',
  sourceReviewPacket: path.relative(ROOT, packetPath).replace(/\\/g, '/'),
  sourceReviewValidation: path.relative(ROOT, reviewValidationPath).replace(/\\/g, '/'),
  selectedPlan,
  nextStep: packet?.nextRequiredStage ?? 'product-ops-decision',
};

const validation = {
  run: 'run-15-aesthetic-proposal-packaging',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  proposalPath: path.relative(ROOT, path.join(outDir, 'aesthetic-proposal.json')).replace(/\\/g, '/'),
  ok: issues.length === 0,
  issueCount: issues.length,
  issues,
  summary: {
    scenario: proposal.scenario,
    skillRoute: proposal.skillRoute,
    planName: selectedPlan.name,
    ownerCount: selectedPlan.owners.length,
    acceptanceCriteriaCount: selectedPlan.acceptanceCriteria.length,
    verificationCommandCount: selectedPlan.verificationCommands.length,
    nextStep: proposal.nextStep,
  },
};

writeText('aesthetic-proposal.json', `${JSON.stringify(proposal, null, 2)}\n`);
writeText('aesthetic-proposal-validation.json', `${JSON.stringify(validation, null, 2)}\n`);

const md = `# Aesthetic Proposal

Date: 2026-05-24
Run: \`run-15-aesthetic-proposal-packaging\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Issue count: \`${validation.issueCount}\`
- Proposal: \`${validation.proposalPath}\`

## Selected Plan

- Name: ${selectedPlan.name}
- Summary: ${selectedPlan.summary}
- Next step: \`${proposal.nextStep}\`

### Owners

${selectedPlan.owners.map((owner) => `- ${owner.role}: ${owner.responsibility}`).join('\n')}

### Scope

${selectedPlan.implementationScope.map((item) => `- ${item}`).join('\n')}

### Tradeoffs

${selectedPlan.tradeoffs.map((item) => `- ${item}`).join('\n')}

### Rejected Alternatives

${selectedPlan.rejectedAlternatives.map((item) => `- ${item}`).join('\n')}

### Boundaries

${selectedPlan.implementationBoundaries.map((item) => `- ${item}`).join('\n')}

### Acceptance Criteria

${selectedPlan.acceptanceCriteria.map((item) => `- ${item}`).join('\n')}

### Verification

${selectedPlan.verificationCommands.map((command) => `- \`${command}\``).join('\n')}

### Evidence

${selectedPlan.evidenceFiles.map((file) => `- \`${file}\``).join('\n')}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No proposal integrity issues found.'}
`;

writeText('AESTHETIC-PROPOSAL.md', md);

console.log(JSON.stringify(validation, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
