#!/usr/bin/env tsx
/**
 * Produce and validate the AI-facing remember/handoff packet.
 *
 * This is the last project-local stage in the UI/UX orchestration loop. It
 * does not claim launch readiness; it records what an AI should read next,
 * which gates are intentionally blocked, and how memory should be written
 * after a verified run.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type Status = {
  generatedAt?: string;
  project?: string;
  scenario?: string;
  evidenceLevel?: string;
  skillRoute?: string;
  technologyStack?: Record<string, string | undefined>;
  full?: boolean;
  render?: boolean;
  readiness?: {
    readyForLaunch?: boolean;
    blockingGates?: string[];
    nextRequiredStage?: string;
    aiCanContinueWithoutUserInput?: boolean;
  };
  gates?: Record<string, unknown>;
  verificationCommands?: Record<string, { command?: string; exitCode?: number | null; ok?: boolean; durationMs?: number }>;
  artifacts?: Record<string, string>;
};

type ReviewPacket = {
  run?: string;
  scenario?: string;
  skillRoute?: string;
  evidenceLevel?: string;
  technologyStack?: Record<string, string>;
  inputs?: {
    status?: string;
    renderSummary?: string;
    screenshots?: string[];
    localSmokeEvidence?: string[];
  };
  verification?: {
    expectedNonZeroReason?: string[];
    passingChecks?: Record<string, string>;
  };
  remainingRisks?: string[];
  externalCapabilities?: {
    used?: string[];
    skipped?: Array<{ name?: string; reason?: string }>;
  };
  nextRequiredStage?: string;
};

type Proposal = {
  run?: string;
  scenario?: string;
  skillRoute?: string;
  selectedPlan?: {
    name?: string;
    owners?: Array<{ role?: string; responsibility?: string }>;
    acceptanceCriteria?: string[];
    verificationCommands?: string[];
    evidenceFiles?: string[];
    implementationBoundaries?: string[];
  };
  nextStep?: string;
};

type DeconflictValidation = {
  ok?: boolean;
  issueCount?: number;
  summary?: {
    stageOwnerCount?: number;
    artifactOwnerCount?: number;
    writerVerifierSeparated?: boolean;
    productDecisionBoundaryHeld?: boolean;
  };
};

type DecisionValidation = {
  readyToImplement?: boolean;
  totals?: {
    pendingGroups?: number;
    invalidGroups?: number;
    readyGroups?: number;
    matrixGroupSum?: number;
  };
  pendingGroups?: string[];
  invalidGroups?: string[];
  readyGroups?: string[];
};

type RenderEvidence = {
  run?: string;
  base?: string;
  motion?: string;
  viewports?: string[];
  routes?: string[];
  pages?: Array<{ route?: string; viewport?: string; ok?: boolean; screenshot?: string }>;
  totals?: {
    errors?: number;
    consoleErrors?: number;
    pageErrors?: number;
    overflowPages?: number;
  };
};

type ScenarioResolution = {
  scenario?: string;
  matchedBy?: string;
  frameworkFamily?: string;
  ok?: boolean;
  route?: {
    id?: string;
    minimumStages?: string[];
    implementationStages?: string[];
    primaryCapabilities?: string[];
    optionalCapabilities?: string[];
    skipByDefault?: string[];
    outputs?: string[];
  };
};

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const skillsArg = process.argv.find((arg) => arg.startsWith('--skills='));
const mcpArg = process.argv.find((arg) => arg.startsWith('--mcp='));
const subagentsArg = process.argv.find((arg) => arg.startsWith('--subagents='));
const agentMemoryActionArg = process.argv.find((arg) => arg.startsWith('--agentmemory-action='));
const memoryIdsArg = process.argv.find((arg) => arg.startsWith('--memory-ids='));
const snapshotIdArg = process.argv.find((arg) => arg.startsWith('--snapshot-id='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;

const artifactPaths = {
  statusJson: path.join(outDir, 'orchestration-status.json'),
  statusMarkdown: path.join(outDir, 'ORCHESTRATION-STATUS.md'),
  runLedger: path.join(outDir, 'RUN-LEDGER.md'),
  scenarioRouting: path.join(outDir, 'scenario-routing-resolution.json'),
  scenarioCoverage: path.join(outDir, 'scenario-coverage.json'),
  scenarioCoverageMarkdown: path.join(outDir, 'SCENARIO-COVERAGE.md'),
  scenarioPlaybook: path.join(outDir, 'scenario-playbook.json'),
  scenarioPlaybookMarkdown: path.join(outDir, 'SCENARIO-PLAYBOOK.md'),
  deconflictValidation: path.join(outDir, 'deconflict-validation.json'),
  deconflictMarkdown: path.join(outDir, 'DECONFLICT-CHECK.md'),
  decisionValidation: path.join(outDir, 'mock-gate-decision-validation.json'),
  decisionMatrix: path.join(outDir, 'mock-gate-product-decision-matrix.json'),
  decisionPacket: path.join(outDir, 'MOCK-GATE-DECISION-PACKET.md'),
  implementationPlan: path.join(outDir, 'MOCK-GATE-IMPLEMENTATION-PLAN.md'),
  reviewPacket: path.join(outDir, 'render-review-packet.json'),
  reviewValidation: path.join(outDir, 'aesthetic-review-validation.json'),
  reviewStatus: path.join(outDir, 'AESTHETIC-REVIEW-STATUS.md'),
  proposal: path.join(outDir, 'aesthetic-proposal.json'),
  proposalValidation: path.join(outDir, 'aesthetic-proposal-validation.json'),
  proposalMarkdown: path.join(outDir, 'AESTHETIC-PROPOSAL.md'),
  renderEvidence: path.join(outDir, 'render-evidence-summary.json'),
  renderMarkdown: path.join(outDir, 'RENDER-EVIDENCE.md'),
};

function readJson<T>(file: string): T | null {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as T;
  } catch {
    return null;
  }
}

function rel(file: string): string {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function listArg(arg: string | undefined, prefix: string): string[] {
  if (!arg) return [];
  return arg
    .slice(prefix.length)
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter((item) => item && item.toLowerCase() !== 'none');
}

function readPackageJson(): {
  next?: string;
  react?: string;
  typescript?: string;
  packageManager: string;
  styling: string;
  runtime: string;
} {
  const pkg = readJson<PackageJson>(path.join(ROOT, 'package.json'));
  return {
    next: pkg?.dependencies?.next,
    react: pkg?.dependencies?.react,
    typescript: pkg?.devDependencies?.typescript,
    packageManager: 'pnpm',
    styling: 'Tailwind CSS v4',
    runtime: 'Next.js app router',
  };
}

function artifactEntry(label: string, file: string, required = true): {
  label: string;
  path: string;
  required: boolean;
  exists: boolean;
} {
  return {
    label,
    path: rel(file),
    required,
    exists: existsSync(file),
  };
}

function commandGroups(status: Status | null, proposal: Proposal | null): Record<string, string[]> {
  const fromStatus = Object.values(status?.verificationCommands ?? {})
    .map((command) => command.command)
    .filter((command): command is string => Boolean(command));
  const fromProposal = proposal?.selectedPlan?.verificationCommands ?? [];
  const commands = Array.from(new Set([...fromStatus, ...fromProposal]));

  return {
    intake: commands.filter(
      (command) =>
        command.includes('qa:uiux:route') ||
        command.includes('qa:uiux:scenario-coverage') ||
        command.includes('qa:uiux:playbook'),
    ),
    evaluate: commands.filter((command) => command.includes('qa:uiux:render') || command.includes('qa:uiux:review')),
    propose: commands.filter((command) => command.includes('qa:uiux:propose')),
    deconflict: commands.filter((command) => command.includes('qa:uiux:deconflict')),
    decide: commands.filter((command) => command.includes('qa:uiux:plan') || command.includes('prelaunch')),
    verify: commands.filter(
      (command) =>
        command.includes('qa:uiux:status') ||
        command.includes('typecheck') ||
        command.includes('check:i18n') ||
        command.includes('build'),
    ),
  };
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const status = readJson<Status>(artifactPaths.statusJson);
const scenarioRouting = readJson<ScenarioResolution>(artifactPaths.scenarioRouting);
const deconflictValidation = readJson<DeconflictValidation>(artifactPaths.deconflictValidation);
const decisionValidation = readJson<DecisionValidation>(artifactPaths.decisionValidation);
const reviewPacket = readJson<ReviewPacket>(artifactPaths.reviewPacket);
const proposal = readJson<Proposal>(artifactPaths.proposal);
const renderEvidence = readJson<RenderEvidence>(artifactPaths.renderEvidence);
const stack = status?.technologyStack ?? readPackageJson();
const skillsTriggered = listArg(skillsArg, '--skills=');
const mcpTriggered = listArg(mcpArg, '--mcp=');
const subagents = listArg(subagentsArg, '--subagents=');
const memoryIds = listArg(memoryIdsArg, '--memory-ids=');
const agentMemoryActionId = agentMemoryActionArg ? agentMemoryActionArg.slice('--agentmemory-action='.length).trim() : null;
const snapshotId = snapshotIdArg ? snapshotIdArg.slice('--snapshot-id='.length).trim() : null;

const sourceArtifacts = [
  artifactEntry('orchestration status json', artifactPaths.statusJson, false),
  artifactEntry('orchestration status markdown', artifactPaths.statusMarkdown, false),
  artifactEntry('run ledger', artifactPaths.runLedger),
  artifactEntry('scenario routing resolution', artifactPaths.scenarioRouting),
  artifactEntry('scenario coverage validation', artifactPaths.scenarioCoverage),
  artifactEntry('scenario coverage markdown', artifactPaths.scenarioCoverageMarkdown),
  artifactEntry('scenario playbook validation', artifactPaths.scenarioPlaybook),
  artifactEntry('scenario playbook markdown', artifactPaths.scenarioPlaybookMarkdown),
  artifactEntry('deconflict validation', artifactPaths.deconflictValidation),
  artifactEntry('deconflict markdown', artifactPaths.deconflictMarkdown),
  artifactEntry('decision validation', artifactPaths.decisionValidation),
  artifactEntry('product decision matrix', artifactPaths.decisionMatrix),
  artifactEntry('decision packet', artifactPaths.decisionPacket),
  artifactEntry('implementation plan', artifactPaths.implementationPlan),
  artifactEntry('render review packet', artifactPaths.reviewPacket),
  artifactEntry('aesthetic review validation', artifactPaths.reviewValidation),
  artifactEntry('aesthetic review status', artifactPaths.reviewStatus),
  artifactEntry('aesthetic proposal json', artifactPaths.proposal),
  artifactEntry('aesthetic proposal validation', artifactPaths.proposalValidation),
  artifactEntry('aesthetic proposal markdown', artifactPaths.proposalMarkdown),
  artifactEntry('render evidence summary', artifactPaths.renderEvidence),
  artifactEntry('render evidence markdown', artifactPaths.renderMarkdown),
];

const blockingGates = status?.readiness?.blockingGates ?? [
  ...(decisionValidation?.readyToImplement === false ? ['product-decision-matrix'] : []),
];
const nextRequiredStage = status?.readiness?.nextRequiredStage ?? proposal?.nextStep ?? reviewPacket?.nextRequiredStage ?? 'unknown';
const aiCanContinueWithoutUserInput =
  status?.readiness?.aiCanContinueWithoutUserInput ?? nextRequiredStage !== 'product-ops-decision';
const renderOk =
  Boolean(renderEvidence) &&
  (renderEvidence?.totals?.errors ?? 0) === 0 &&
  (renderEvidence?.totals?.consoleErrors ?? 0) === 0 &&
  (renderEvidence?.totals?.overflowPages ?? 0) === 0;

const handoff = {
  schemaVersion: 'uiux-handoff.v1',
  run: 'run-17-ui-ux-remember-handoff',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  scenario: status?.scenario ?? scenarioRouting?.scenario ?? proposal?.scenario ?? reviewPacket?.scenario ?? 'website-landing',
  skillRoute: status?.skillRoute ?? proposal?.skillRoute ?? reviewPacket?.skillRoute ?? 'ui-ux-aesthetic-review',
  evidenceLevel:
    status?.evidenceLevel ??
    reviewPacket?.evidenceLevel ??
    (renderEvidence ? 'source + rendered evidence + project-local handoff' : 'source + project-local handoff'),
  currentState: {
    readyForLaunch: status?.readiness?.readyForLaunch ?? false,
    blockingGates,
    nextRequiredStage,
    aiCanContinueWithoutUserInput,
    intentionalNonZeroExit:
      blockingGates.includes('production-mock-gate') || blockingGates.includes('product-decision-matrix'),
  },
  completedStages: {
    intake: scenarioRouting?.ok === true,
    evaluate: reviewPacket?.skillRoute === 'ui-ux-aesthetic-review' && renderOk,
    propose: proposal?.skillRoute === 'ui-ux-aesthetic-review' && Boolean(proposal.selectedPlan),
    deconflict:
      deconflictValidation?.ok === true || Boolean(proposal?.selectedPlan?.implementationBoundaries?.length),
    implement: Boolean(reviewPacket?.verification?.passingChecks),
    verify: renderOk,
    rememberHandoff: true,
  },
  productDecisionState: {
    readyToImplement: decisionValidation?.readyToImplement ?? false,
    pendingGroups: decisionValidation?.pendingGroups ?? [],
    invalidGroups: decisionValidation?.invalidGroups ?? [],
    readyGroups: decisionValidation?.readyGroups ?? [],
    representedViolationCount: decisionValidation?.totals?.matrixGroupSum ?? null,
  },
  runTrace: {
    technologyStack: stack,
    skillsTriggered: skillsTriggered.length > 0 ? skillsTriggered : ['ui-ux-aesthetic-review'],
    mcpToolsTriggered: mcpTriggered,
    subagents,
    cliCommandGroups: commandGroups(status, proposal),
    externalCapabilitiesUsed: reviewPacket?.externalCapabilities?.used ?? [],
    externalCapabilitiesSkipped: reviewPacket?.externalCapabilities?.skipped ?? [],
  },
  memory: {
    layer: 'AgentMemory MCP',
    projectActionId: agentMemoryActionId,
    memoryIds,
    snapshotId,
    projectLocalPacket: 'qa/ui-ux-review/codex-2026-05-24/uiux-handoff.json',
    policy: [
      'Save reusable decisions and lessons to AgentMemory after verified loops.',
      'Keep project-local handoff artifacts readable without requiring MCP access.',
      'Do not promote unstable product/content assumptions into dev-knowledge.',
      'Mesh sync is optional and may fail when AGENTMEMORY_SECRET is not configured.',
    ],
  },
  sourceArtifacts,
  nextActions:
    nextRequiredStage === 'product-ops-decision'
      ? [
          'Product/ops fills mock-gate-product-decision-matrix.json with verified, hidden, or time-bound-allowlist decisions.',
          'Run pnpm run qa:uiux:plan to confirm the six groups are implementable.',
          'Only after the decision matrix is valid, implement the generated mock-gate implementation plan.',
          'Rerun pnpm run qa:uiux:status -- --full --render because real content can change layout density.',
        ]
      : [
          'Fix the first failing orchestration gate reported by ORCHESTRATION-STATUS.md.',
          'Rerun pnpm run qa:uiux:status -- --full --render after the fix.',
        ],
  guardrails: [
    'Do not remove MockBadge or mark sample/mock/demo content verified without product/ops evidence.',
    'Do not weaken production-mock-gate or product-decision-matrix exits.',
    'Do not edit global prompts, hooks, MCP config, Claude config, or AgentMemory package/dashboard source for this review.',
    'Do not use GitNexus as a required step while it is intentionally deprioritized.',
  ],
};

const issues: string[] = [];

for (const artifact of sourceArtifacts) {
  if (artifact.required && !artifact.exists) {
    issues.push(`required artifact missing: ${artifact.path}`);
  }
}

if (handoff.skillRoute !== 'ui-ux-aesthetic-review') {
  issues.push(`skillRoute should be ui-ux-aesthetic-review, got ${handoff.skillRoute}`);
}
if (handoff.scenario !== 'website-landing') {
  issues.push(`scenario should be website-landing for this run, got ${handoff.scenario}`);
}
if (!stack.packageManager || !stack.styling || !stack.runtime) {
  issues.push('technology stack is missing packageManager, styling, or runtime');
}
if (!scenarioRouting || scenarioRouting.ok !== true) {
  issues.push('scenario routing is missing or not OK');
}
if (!reviewPacket || reviewPacket.skillRoute !== 'ui-ux-aesthetic-review') {
  issues.push('review packet is missing or has the wrong skill route');
}
if (!proposal?.selectedPlan?.owners || proposal.selectedPlan.owners.length < 3) {
  issues.push('proposal needs at least three owners');
}
if (!proposal?.selectedPlan?.acceptanceCriteria || proposal.selectedPlan.acceptanceCriteria.length < 1) {
  issues.push('proposal acceptance criteria are missing');
}
if (!deconflictValidation || deconflictValidation.ok !== true) {
  issues.push('deconflict validation is missing or not OK');
}
if (!Array.isArray(reviewPacket?.externalCapabilities?.used)) {
  issues.push('review packet externalCapabilities.used is missing');
}
if (!Array.isArray(reviewPacket?.externalCapabilities?.skipped)) {
  issues.push('review packet externalCapabilities.skipped is missing');
}
if (renderEvidence && !renderOk) {
  issues.push('render evidence is present but not OK');
}
if (nextRequiredStage === 'product-ops-decision' && decisionValidation?.readyToImplement !== false) {
  issues.push('product-ops-decision stage should have an explicit not-ready decision validation');
}
if (handoff.nextActions.length < 1) {
  issues.push('handoff nextActions are missing');
}
if (handoff.memory.policy.length < 3) {
  issues.push('memory policy is incomplete');
}

const validation = {
  run: 'run-17-ui-ux-remember-handoff',
  generatedAt: handoff.generatedAt,
  project: ROOT,
  packetPath: 'qa/ui-ux-review/codex-2026-05-24/uiux-handoff.json',
  ok: issues.length === 0,
  issueCount: issues.length,
  issues,
  summary: {
    scenario: handoff.scenario,
    skillRoute: handoff.skillRoute,
    nextRequiredStage: handoff.currentState.nextRequiredStage,
    blockingGates: handoff.currentState.blockingGates,
    sourceArtifactCount: sourceArtifacts.length,
    missingRequiredArtifactCount: sourceArtifacts.filter((artifact) => artifact.required && !artifact.exists).length,
    cliCommandGroupCount: Object.keys(handoff.runTrace.cliCommandGroups).length,
    mcpToolsRecorded: handoff.runTrace.mcpToolsTriggered.length,
    subagentsRecorded: handoff.runTrace.subagents.length,
    memoryIdsRecorded: handoff.memory.memoryIds.length + (handoff.memory.snapshotId ? 1 : 0),
  },
};

writeFileSync(path.join(outDir, 'uiux-handoff.json'), `${JSON.stringify(handoff, null, 2)}\n`, 'utf-8');
writeFileSync(path.join(outDir, 'uiux-handoff-validation.json'), `${JSON.stringify(validation, null, 2)}\n`, 'utf-8');

const md = `# UI/UX Remember Handoff

Date: 2026-05-24
Run: \`run-17-ui-ux-remember-handoff\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Scenario: \`${handoff.scenario}\`
- Skill route: \`${handoff.skillRoute}\`
- Next required stage: \`${handoff.currentState.nextRequiredStage}\`
- Blocking gates: ${handoff.currentState.blockingGates.length ? handoff.currentState.blockingGates.map((gate) => `\`${gate}\``).join(', ') : 'none'}
- AI can continue without user input: \`${handoff.currentState.aiCanContinueWithoutUserInput}\`

## Completed Stages

${Object.entries(handoff.completedStages).map(([stage, ok]) => `- \`${stage}\`: \`${ok}\``).join('\n')}

## Run Trace

- Next.js: \`${stack.next ?? 'unknown'}\`
- React: \`${stack.react ?? 'unknown'}\`
- TypeScript: \`${stack.typescript ?? 'unknown'}\`
- Styling: ${stack.styling}
- Package manager: ${stack.packageManager}
- Skills triggered: ${handoff.runTrace.skillsTriggered.map((item) => `\`${item}\``).join(', ')}
- MCP tools recorded by CLI args: ${handoff.runTrace.mcpToolsTriggered.length ? handoff.runTrace.mcpToolsTriggered.map((item) => `\`${item}\``).join(', ') : 'none'}
- Subagents recorded by CLI args: ${handoff.runTrace.subagents.length ? handoff.runTrace.subagents.map((item) => `\`${item}\``).join(', ') : 'none'}

## Product Decision State

- Ready to implement: \`${handoff.productDecisionState.readyToImplement}\`
- Represented violation count: \`${handoff.productDecisionState.representedViolationCount ?? 'unknown'}\`
- Pending groups: ${handoff.productDecisionState.pendingGroups.length ? handoff.productDecisionState.pendingGroups.map((group) => `\`${group}\``).join(', ') : 'none'}

## Next Actions

${handoff.nextActions.map((action) => `- ${action}`).join('\n')}

## Guardrails

${handoff.guardrails.map((guardrail) => `- ${guardrail}`).join('\n')}

## Source Artifacts

| Artifact | Required | Exists | Path |
| --- | --- | --- | --- |
${sourceArtifacts.map((artifact) => `| ${artifact.label} | \`${artifact.required}\` | \`${artifact.exists}\` | \`${artifact.path}\` |`).join('\n')}

## Memory

- Layer: \`${handoff.memory.layer}\`
- Project action ID: \`${handoff.memory.projectActionId ?? 'not recorded in project artifact'}\`
- Memory IDs: ${handoff.memory.memoryIds.length ? handoff.memory.memoryIds.map((id) => `\`${id}\``).join(', ') : 'none recorded in project artifact'}
- Snapshot ID: \`${handoff.memory.snapshotId ?? 'not recorded in project artifact'}\`

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No handoff integrity issues found.'}
`;

writeFileSync(path.join(outDir, 'UIUX-HANDOFF.md'), md, 'utf-8');

console.log(JSON.stringify(validation, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
