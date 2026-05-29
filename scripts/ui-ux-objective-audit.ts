#!/usr/bin/env tsx
/**
 * Audit the AI-triggered UI/UX orchestration objective.
 *
 * The status CLI tells an agent what is currently failing. This audit maps the
 * user's broader objective to concrete gates and artifacts, so future agents can
 * distinguish infrastructure completion from product/content blockers.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type Status = {
  readiness?: {
    blockingGates?: string[];
    nextRequiredStage?: string;
    aiCanContinueWithoutUserInput?: boolean;
  };
  gates?: Record<string, unknown>;
  verificationCommands?: Record<string, { command?: string; ok?: boolean; exitCode?: number | null }>;
};

type ScenarioRouting = {
  ok?: boolean;
  scenario?: string;
  matchedBy?: string;
  frameworkFamily?: string;
  stagePlan?: {
    minimumStages?: string[];
    implementationStages?: string[];
  };
};

type ScenarioCoverage = {
  ok?: boolean;
  issueCount?: number;
  totals?: {
    routeCount?: number;
    keywordSignalCount?: number;
    routesOk?: number;
    routesWithIssues?: number;
  };
};

type ScenarioPlaybook = {
  ok?: boolean;
  issueCount?: number;
  totals?: {
    scenarioCount?: number;
    scenariosOk?: number;
    scenariosWithIssues?: number;
    externalCapabilityCount?: number;
    unresolvedCapabilityCount?: number;
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
  pages?: Array<unknown>;
  routes?: string[];
  viewports?: string[];
  totals?: {
    errors?: number;
    consoleErrors?: number;
    pageErrors?: number;
    overflowPages?: number;
  };
};

type ReviewValidation = {
  ok?: boolean;
  issueCount?: number;
  summary?: {
    issueCount?: number;
    implementedChangeCount?: number;
    remainingRiskCount?: number;
    nextRequiredStage?: string;
  } | null;
};

type ProposalValidation = {
  ok?: boolean;
  issueCount?: number;
  summary?: {
    ownerCount?: number;
    acceptanceCriteriaCount?: number;
    verificationCommandCount?: number;
    nextStep?: string;
  };
};

type Proposal = {
  selectedPlan?: {
    owners?: Array<unknown>;
    acceptanceCriteria?: string[];
    verificationCommands?: string[];
    implementationBoundaries?: string[];
    evidenceFiles?: string[];
  };
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

type HandoffValidation = {
  ok?: boolean;
  issueCount?: number;
  summary?: {
    sourceArtifactCount?: number;
    missingRequiredArtifactCount?: number;
    cliCommandGroupCount?: number;
    mcpToolsRecorded?: number;
    subagentsRecorded?: number;
    memoryIdsRecorded?: number;
  };
};

type Artifact = {
  label: string;
  path: string;
  required: boolean;
  exists: boolean;
};

type Requirement = {
  id: string;
  objectiveStage: string;
  owner: string;
  fulfilled: boolean;
  evidenceLevel: string;
  gates: string[];
  artifacts: string[];
  remaining: string[];
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;

const files = {
  status: path.join(outDir, 'orchestration-status.json'),
  scenarioRouting: path.join(outDir, 'scenario-routing-resolution.json'),
  scenarioCoverage: path.join(outDir, 'scenario-coverage.json'),
  scenarioPlaybook: path.join(outDir, 'scenario-playbook.json'),
  decisionValidation: path.join(outDir, 'mock-gate-decision-validation.json'),
  renderEvidence: path.join(outDir, 'render-evidence-summary.json'),
  reviewValidation: path.join(outDir, 'aesthetic-review-validation.json'),
  proposalValidation: path.join(outDir, 'aesthetic-proposal-validation.json'),
  proposal: path.join(outDir, 'aesthetic-proposal.json'),
  deconflictValidation: path.join(outDir, 'deconflict-validation.json'),
  handoffValidation: path.join(outDir, 'uiux-handoff-validation.json'),
};

function rel(file: string): string {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function readJson<T>(file: string): T | null {
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as T;
  } catch {
    return null;
  }
}

function artifact(label: string, file: string, required = true): Artifact {
  return {
    label,
    path: rel(file),
    required,
    exists: existsSync(file),
  };
}

function commandOk(status: Status | null, keys: string[]): boolean {
  return keys.every((key) => status?.verificationCommands?.[key]?.ok === true);
}

function renderOk(renderEvidence: RenderEvidence | null): boolean {
  return (
    Boolean(renderEvidence) &&
    (renderEvidence?.totals?.errors ?? 0) === 0 &&
    (renderEvidence?.totals?.consoleErrors ?? 0) === 0 &&
    (renderEvidence?.totals?.overflowPages ?? 0) === 0
  );
}

function bool(value: unknown): boolean {
  return value === true;
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const status = readJson<Status>(files.status);
const scenarioRouting = readJson<ScenarioRouting>(files.scenarioRouting);
const scenarioCoverage = readJson<ScenarioCoverage>(files.scenarioCoverage);
const scenarioPlaybook = readJson<ScenarioPlaybook>(files.scenarioPlaybook);
const decisionValidation = readJson<DecisionValidation>(files.decisionValidation);
const renderEvidence = readJson<RenderEvidence>(files.renderEvidence);
const reviewValidation = readJson<ReviewValidation>(files.reviewValidation);
const proposalValidation = readJson<ProposalValidation>(files.proposalValidation);
const proposal = readJson<Proposal>(files.proposal);
const deconflictValidation = readJson<DeconflictValidation>(files.deconflictValidation);
const handoffValidation = readJson<HandoffValidation>(files.handoffValidation);

const sourceArtifacts = [
  artifact('orchestration status', files.status),
  artifact('scenario routing resolution', files.scenarioRouting),
  artifact('scenario coverage validation', files.scenarioCoverage),
  artifact('scenario playbook validation', files.scenarioPlaybook),
  artifact('decision validation', files.decisionValidation),
  artifact('render evidence summary', files.renderEvidence),
  artifact('aesthetic review validation', files.reviewValidation),
  artifact('aesthetic proposal validation', files.proposalValidation),
  artifact('aesthetic proposal', files.proposal),
  artifact('deconflict validation', files.deconflictValidation),
  artifact('remember handoff validation', files.handoffValidation),
];

const renderedOk = renderOk(renderEvidence);
const proposalHasPlan =
  bool(proposalValidation?.ok) &&
  (proposalValidation?.summary?.ownerCount ?? 0) >= 3 &&
  (proposalValidation?.summary?.acceptanceCriteriaCount ?? 0) >= 1 &&
  Boolean(proposal?.selectedPlan);
const deconflictOk =
  proposalHasPlan &&
  (proposal?.selectedPlan?.implementationBoundaries?.length ?? 0) >= 1 &&
  (proposal?.selectedPlan?.verificationCommands?.length ?? 0) >= 1;
const engineeringVerificationOk = commandOk(status, ['typecheck', 'i18n', 'build']);
const handoffOk =
  bool(handoffValidation?.ok) &&
  (handoffValidation?.summary?.sourceArtifactCount ?? 0) >= 10 &&
  (handoffValidation?.summary?.cliCommandGroupCount ?? 0) >= 5;

const requirements: Requirement[] = [
  {
    id: 'intake-route',
    objectiveStage: 'intake/route',
    owner: 'orchestrator',
    fulfilled: bool(scenarioRouting?.ok) && bool(scenarioCoverage?.ok) && bool(scenarioPlaybook?.ok),
    evidenceLevel: 'machine-readable scenario routing, coverage, and playbook',
    gates: ['scenarioRouting', 'scenarioCoverage', 'scenarioPlaybook'],
    artifacts: [rel(files.scenarioRouting), rel(files.scenarioCoverage), rel(files.scenarioPlaybook)],
    remaining: [],
  },
  {
    id: 'evaluate',
    objectiveStage: 'evaluate',
    owner: 'ux-visual-reviewer',
    fulfilled: bool(reviewValidation?.ok) && renderedOk,
    evidenceLevel: 'rendered desktop/mobile evidence plus review packet validation',
    gates: ['aestheticReview', 'renderEvidence'],
    artifacts: [rel(files.reviewValidation), rel(files.renderEvidence)],
    remaining: [],
  },
  {
    id: 'propose',
    objectiveStage: 'propose',
    owner: 'product + architect + ux',
    fulfilled: proposalHasPlan,
    evidenceLevel: 'selected proposal with owners, acceptance criteria, and verification commands',
    gates: ['aestheticProposal'],
    artifacts: [rel(files.proposalValidation), rel(files.proposal)],
    remaining: [],
  },
  {
    id: 'deconflict',
    objectiveStage: 'deconflict',
    owner: 'orchestrator',
    fulfilled: deconflictOk && Boolean(decisionValidation) && deconflictValidation?.ok === true,
    evidenceLevel: 'dedicated owner, artifact, writer/verifier, capability, and product-boundary validation',
    gates: ['aestheticProposal', 'deconflict', 'productDecisionMatrix'],
    artifacts: [rel(files.proposal), rel(files.deconflictValidation), rel(files.decisionValidation)],
    remaining:
      decisionValidation?.readyToImplement === false
        ? ['Product/content decisions are intentionally blocked until product/ops supplies evidence.']
        : [],
  },
  {
    id: 'implement',
    objectiveStage: 'implement',
    owner: 'frontend-engineer',
    fulfilled: (reviewValidation?.summary?.implementedChangeCount ?? 0) > 0,
    evidenceLevel: 'recorded implementation evidence from the aesthetic review packet',
    gates: ['aestheticReview'],
    artifacts: [rel(files.reviewValidation)],
    remaining: [],
  },
  {
    id: 'verify',
    objectiveStage: 'verify',
    owner: 'qa-engineer',
    fulfilled: renderedOk && engineeringVerificationOk,
    evidenceLevel: 'typecheck, i18n parity, build, and rendered route evidence',
    gates: ['typecheck', 'check:i18n', 'build', 'renderEvidence'],
    artifacts: [rel(files.status), rel(files.renderEvidence)],
    remaining: [],
  },
  {
    id: 'remember-handoff',
    objectiveStage: 'remember/handoff',
    owner: 'orchestrator + AgentMemory',
    fulfilled: handoffOk,
    evidenceLevel: 'project-local handoff packet plus AgentMemory identifiers when available',
    gates: ['rememberHandoff'],
    artifacts: [rel(files.handoffValidation)],
    remaining: [],
  },
];

for (const requirement of requirements) {
  if (!requirement.fulfilled && requirement.remaining.length === 0) {
    requirement.remaining.push(`Missing or failing evidence for ${requirement.objectiveStage}.`);
  }
}

const blockingGates = status?.readiness?.blockingGates ?? [];
const productBlockingGates = blockingGates.filter((gate) =>
  ['production-mock-gate', 'product-decision-matrix'].includes(gate),
);
if (!productBlockingGates.includes('product-decision-matrix') && decisionValidation?.readyToImplement === false) {
  productBlockingGates.push('product-decision-matrix');
}

const artifactIssues = sourceArtifacts
  .filter((item) => item.required && !item.exists)
  .map((item) => `required artifact missing: ${item.path}`);
const requirementIssues = requirements
  .filter((requirement) => !requirement.fulfilled)
  .map((requirement) => `objective stage not fulfilled: ${requirement.objectiveStage}`);
const issues = [...artifactIssues, ...requirementIssues];
const nonProductInfrastructureOk = issues.length === 0;
const complete = nonProductInfrastructureOk && productBlockingGates.length === 0;
const objectiveStatus = complete
  ? 'complete'
  : productBlockingGates.length > 0 && nonProductInfrastructureOk
    ? 'blocked-by-product-decision'
    : 'non-product-infrastructure-incomplete';
const nextRequiredStage =
  objectiveStatus === 'complete'
    ? 'complete'
    : objectiveStatus === 'blocked-by-product-decision'
      ? 'product-ops-decision'
      : requirements.find((requirement) => !requirement.fulfilled)?.objectiveStage ?? 'unknown';

const audit = {
  schemaVersion: 'uiux-objective-audit.v1',
  run: 'run-20-objective-completion-audit',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  objective:
    'AI-triggered UI/UX aesthetic infrastructure: intake/route -> evaluate -> propose -> deconflict -> implement -> verify -> remember/handoff.',
  ok: nonProductInfrastructureOk,
  complete,
  objectiveStatus,
  nextRequiredStage,
  issueCount: issues.length,
  issues,
  productBlockers: {
    gates: productBlockingGates,
    pendingGroups: decisionValidation?.pendingGroups ?? [],
    invalidGroups: decisionValidation?.invalidGroups ?? [],
    representedViolationCount: decisionValidation?.totals?.matrixGroupSum ?? null,
  },
  totals: {
    requirements: requirements.length,
    fulfilledRequirements: requirements.filter((requirement) => requirement.fulfilled).length,
    sourceArtifacts: sourceArtifacts.length,
    missingRequiredArtifacts: sourceArtifacts.filter((item) => item.required && !item.exists).length,
    scenarioRoutes: scenarioCoverage?.totals?.routeCount ?? null,
    keywordSignals: scenarioCoverage?.totals?.keywordSignalCount ?? null,
    scenarioPlaybooks: scenarioPlaybook?.totals?.scenarioCount ?? null,
    externalCapabilityReferences: scenarioPlaybook?.totals?.externalCapabilityCount ?? null,
    unresolvedCapabilities: scenarioPlaybook?.totals?.unresolvedCapabilityCount ?? null,
    renderedPages: renderEvidence?.pages?.length ?? null,
  },
  requirements,
  sourceArtifacts,
  nextActions:
    objectiveStatus === 'blocked-by-product-decision'
      ? [
          'Product/ops must complete mock-gate-product-decision-matrix.json for the six pending groups.',
          'Run pnpm run qa:uiux:plan; only implement content changes after readyToImplement is true.',
          'Rerun pnpm run qa:uiux:status -- --full --render because real content can change layout and aesthetic judgment.',
        ]
      : objectiveStatus === 'non-product-infrastructure-incomplete'
        ? ['Fix the first unfulfilled objective stage, then rerun pnpm run qa:uiux:audit.']
        : ['No objective audit action remains.'],
};

writeFileSync(path.join(outDir, 'objective-completion-audit.json'), `${JSON.stringify(audit, null, 2)}\n`, 'utf-8');

const md = `# UI/UX Objective Completion Audit

Date: 2026-05-24
Run: \`run-20-objective-completion-audit\`
Project: \`${ROOT}\`

## Status

- OK: \`${audit.ok}\`
- Complete: \`${audit.complete}\`
- Objective status: \`${audit.objectiveStatus}\`
- Next required stage: \`${audit.nextRequiredStage}\`
- Issue count: \`${audit.issueCount}\`

## Objective Chain

| Stage | Owner | Fulfilled | Evidence | Gates |
| --- | --- | --- | --- | --- |
${requirements
  .map(
    (requirement) =>
      `| \`${requirement.objectiveStage}\` | ${requirement.owner} | \`${requirement.fulfilled}\` | ${requirement.evidenceLevel} | ${requirement.gates.map((gate) => `\`${gate}\``).join(', ')} |`,
  )
  .join('\n')}

## Product Blockers

- Gates: ${productBlockingGates.length ? productBlockingGates.map((gate) => `\`${gate}\``).join(', ') : 'none'}
- Pending groups: ${audit.productBlockers.pendingGroups.length ? audit.productBlockers.pendingGroups.map((group) => `\`${group}\``).join(', ') : 'none'}
- Represented violation count: \`${audit.productBlockers.representedViolationCount ?? 'unknown'}\`

## Coverage Totals

- Scenario routes: \`${audit.totals.scenarioRoutes ?? 'unknown'}\`
- Keyword signals: \`${audit.totals.keywordSignals ?? 'unknown'}\`
- Scenario playbooks: \`${audit.totals.scenarioPlaybooks ?? 'unknown'}\`
- External capability references: \`${audit.totals.externalCapabilityReferences ?? 'unknown'}\`
- Unresolved capabilities: \`${audit.totals.unresolvedCapabilities ?? 'unknown'}\`
- Rendered pages: \`${audit.totals.renderedPages ?? 'unknown'}\`

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No non-product infrastructure issues found.'}

## Next Actions

${audit.nextActions.map((action) => `- ${action}`).join('\n')}
`;

writeFileSync(path.join(outDir, 'OBJECTIVE-COMPLETION-AUDIT.md'), md, 'utf-8');
console.log(JSON.stringify(audit, null, 2));

if (!nonProductInfrastructureOk) {
  process.exit(1);
}
