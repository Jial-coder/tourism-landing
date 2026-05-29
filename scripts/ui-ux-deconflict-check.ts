#!/usr/bin/env tsx
/**
 * Validate deconfliction for the UI/UX orchestration loop.
 *
 * Scenario routing and playbooks prove that a route can be selected. This gate
 * proves the selected route can execute without role, artifact, framework, or
 * product-decision conflicts.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type CapabilityResolution = {
  raw?: string;
  normalized?: string;
  kind?: string;
  source?: string;
  ok?: boolean;
};

type ScenarioRouting = {
  ok?: boolean;
  scenario?: string;
  frameworkFamily?: string;
  route?: {
    id?: string;
    primaryCapabilities?: string[];
    optionalCapabilities?: string[];
    skipByDefault?: string[];
  };
};

type ScenarioPlaybook = {
  ok?: boolean;
  scenarioPlaybooks?: Array<{
    id?: string;
    stageSequence?: Array<{
      id?: string;
      owner?: string;
      ownerLabel?: string;
      requiresVerification?: boolean;
      tools?: string[];
      outputs?: string[];
    }>;
    primaryCapabilities?: CapabilityResolution[];
    optionalCapabilities?: CapabilityResolution[];
    skipByDefault?: CapabilityResolution[];
  }>;
};

type Proposal = {
  nextStep?: string;
  selectedPlan?: {
    owners?: Array<{ role?: string; responsibility?: string }>;
    implementationScope?: string[];
    implementationBoundaries?: string[];
    verificationCommands?: string[];
    evidenceFiles?: string[];
  };
};

type DecisionValidation = {
  readyToImplement?: boolean;
  pendingGroups?: string[];
  invalidGroups?: string[];
  readyGroups?: string[];
  totals?: {
    matrixGroupSum?: number;
  };
};

type ImplementationPlan = {
  readyToImplement?: boolean;
  groups?: Array<{
    id?: string;
    implementationOwner?: string;
    files?: string[];
    readyForImplementation?: boolean;
  }>;
};

type Status = {
  readiness?: {
    blockingGates?: string[];
    nextRequiredStage?: string;
  };
  verificationCommands?: Record<string, { command?: string; ok?: boolean }>;
};

type ArtifactOwner = {
  artifact: string;
  owner: string;
  verifier: string;
  source: string;
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;

const files = {
  scenarioRouting: path.join(outDir, 'scenario-routing-resolution.json'),
  scenarioPlaybook: path.join(outDir, 'scenario-playbook.json'),
  proposal: path.join(outDir, 'aesthetic-proposal.json'),
  proposalValidation: path.join(outDir, 'aesthetic-proposal-validation.json'),
  decisionValidation: path.join(outDir, 'mock-gate-decision-validation.json'),
  implementationPlan: path.join(outDir, 'mock-gate-implementation-plan.json'),
  status: path.join(outDir, 'orchestration-status.json'),
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

function normalizedCapabilities(items: CapabilityResolution[] | undefined): string[] {
  return (items ?? [])
    .map((item) => item.normalized ?? item.raw ?? '')
    .map((item) => item.trim())
    .filter(Boolean);
}

function includesText(items: string[] | undefined, needle: string): boolean {
  return (items ?? []).some((item) => item.toLowerCase().includes(needle.toLowerCase()));
}

function hasOwnerRole(proposal: Proposal | null, role: string): boolean {
  return (proposal?.selectedPlan?.owners ?? []).some((owner) =>
    `${owner.role ?? ''} ${owner.responsibility ?? ''}`.toLowerCase().includes(role.toLowerCase()),
  );
}

function duplicateIds(items: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const item of items) {
    if (seen.has(item)) duplicates.add(item);
    seen.add(item);
  }
  return [...duplicates];
}

function asCheck(name: string, ok: boolean, details: Record<string, unknown>, issues: string[]): {
  name: string;
  ok: boolean;
  details: Record<string, unknown>;
  issues: string[];
} {
  return { name, ok, details, issues };
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const scenarioRouting = readJson<ScenarioRouting>(files.scenarioRouting);
const scenarioPlaybook = readJson<ScenarioPlaybook>(files.scenarioPlaybook);
const proposal = readJson<Proposal>(files.proposal);
const decisionValidation = readJson<DecisionValidation>(files.decisionValidation);
const implementationPlan = readJson<ImplementationPlan>(files.implementationPlan);
const status = readJson<Status>(files.status);
const scenarioId = scenarioRouting?.scenario ?? scenarioRouting?.route?.id ?? 'website-landing';
const currentPlaybook = scenarioPlaybook?.scenarioPlaybooks?.find((item) => item.id === scenarioId) ?? null;
const stageSequence = currentPlaybook?.stageSequence ?? [];

const artifactOwners: ArtifactOwner[] = [
  {
    artifact: 'scenario-routing-resolution.json',
    owner: 'orchestrator',
    verifier: 'orchestrator',
    source: 'qa:uiux:route',
  },
  {
    artifact: 'scenario-coverage.json',
    owner: 'orchestrator',
    verifier: 'orchestrator',
    source: 'qa:uiux:scenario-coverage',
  },
  {
    artifact: 'scenario-playbook.json',
    owner: 'orchestrator',
    verifier: 'architect',
    source: 'qa:uiux:playbook',
  },
  {
    artifact: 'render-review-packet.json',
    owner: 'ux-visual-reviewer',
    verifier: 'qa-engineer',
    source: 'qa:uiux:review',
  },
  {
    artifact: 'aesthetic-proposal.json',
    owner: 'orchestrator',
    verifier: 'qa-engineer',
    source: 'qa:uiux:propose',
  },
  {
    artifact: 'mock-gate-implementation-plan.json',
    owner: 'product',
    verifier: 'qa-engineer',
    source: 'qa:uiux:plan',
  },
  {
    artifact: 'uiux-handoff.json',
    owner: 'memory-steward',
    verifier: 'orchestrator',
    source: 'qa:uiux:handoff',
  },
];

const checks: Array<{ name: string; ok: boolean; details: Record<string, unknown>; issues: string[] }> = [];

const sourceIssues: string[] = [];
for (const [label, file] of Object.entries(files)) {
  if (!existsSync(file)) sourceIssues.push(`missing source artifact: ${rel(file)}`);
}
checks.push(
  asCheck(
    'source-artifacts',
    sourceIssues.length === 0,
    { artifacts: Object.fromEntries(Object.entries(files).map(([label, file]) => [label, rel(file)])) },
    sourceIssues,
  ),
);

const stageIds = stageSequence.map((stage) => stage.id ?? '').filter(Boolean);
const stageIssues: string[] = [];
if (scenarioRouting?.ok !== true) stageIssues.push('scenario routing is missing or not OK');
if (scenarioPlaybook?.ok !== true) stageIssues.push('scenario playbook is missing or not OK');
if (!currentPlaybook) stageIssues.push(`scenario playbook missing current scenario: ${scenarioId}`);
for (const stage of stageSequence) {
  if (!stage.id) stageIssues.push('stage missing id');
  if (!stage.owner) stageIssues.push(`stage ${stage.id ?? '<unknown>'} missing owner`);
  if (!stage.outputs || stage.outputs.length === 0) stageIssues.push(`stage ${stage.id ?? '<unknown>'} missing outputs`);
}
for (const duplicate of duplicateIds(stageIds)) {
  stageIssues.push(`stage has duplicate owner slot: ${duplicate}`);
}
checks.push(
  asCheck(
    'single-stage-owner',
    stageIssues.length === 0,
    {
      scenario: scenarioId,
      stages: stageSequence.map((stage) => ({
        id: stage.id,
        owner: stage.owner,
        ownerLabel: stage.ownerLabel,
        requiresVerification: stage.requiresVerification,
      })),
    },
    stageIssues,
  ),
);

const artifactIssues: string[] = [];
for (const duplicate of duplicateIds(artifactOwners.map((item) => item.artifact))) {
  artifactIssues.push(`artifact has multiple current owners: ${duplicate}`);
}
for (const item of artifactOwners) {
  if (!item.owner) artifactIssues.push(`artifact ${item.artifact} missing owner`);
  if (!item.verifier) artifactIssues.push(`artifact ${item.artifact} missing verifier`);
  if (!item.source) artifactIssues.push(`artifact ${item.artifact} missing source command`);
}
checks.push(
  asCheck(
    'single-artifact-owner',
    artifactIssues.length === 0,
    { artifactOwners },
    artifactIssues,
  ),
);

const separationIssues: string[] = [];
if (!hasOwnerRole(proposal, 'frontend')) separationIssues.push('proposal missing frontend implementer owner');
if (!hasOwnerRole(proposal, 'QA')) separationIssues.push('proposal missing QA verifier owner');
if (hasOwnerRole(proposal, 'frontend') && !hasOwnerRole(proposal, 'QA')) {
  separationIssues.push('frontend writer has no separate QA verifier');
}
if (!includesText(proposal?.selectedPlan?.verificationCommands, 'typecheck')) {
  separationIssues.push('proposal verification commands missing typecheck');
}
if (!includesText(proposal?.selectedPlan?.verificationCommands, 'build')) {
  separationIssues.push('proposal verification commands missing build');
}
if (!includesText(proposal?.selectedPlan?.verificationCommands, 'qa:uiux:status')) {
  separationIssues.push('proposal verification commands missing qa:uiux:status');
}
checks.push(
  asCheck(
    'writer-verifier-separation',
    separationIssues.length === 0,
    {
      owners: proposal?.selectedPlan?.owners ?? [],
      verificationCommands: proposal?.selectedPlan?.verificationCommands ?? [],
    },
    separationIssues,
  ),
);

const frameworkIssues: string[] = [];
const activeCapabilities = [
  ...normalizedCapabilities(currentPlaybook?.primaryCapabilities),
  ...normalizedCapabilities(currentPlaybook?.optionalCapabilities),
];
const skippedCapabilities = normalizedCapabilities(currentPlaybook?.skipByDefault);
const reactNextDisallowedActive = [
  'building-native-ui',
  'react-native-skills',
  'ai-website-cloner-template',
  'supabase-postgres-best-practices',
];
if (scenarioRouting?.frameworkFamily !== 'reactNext') {
  frameworkIssues.push(`expected reactNext framework family, got ${scenarioRouting?.frameworkFamily ?? 'missing'}`);
}
for (const capability of reactNextDisallowedActive) {
  if (activeCapabilities.includes(capability)) {
    frameworkIssues.push(`React/Next route has disallowed active capability: ${capability}`);
  }
}
for (const capability of ['building-native-ui', 'react-native-skills', 'ai-website-cloner-template']) {
  if (!skippedCapabilities.includes(capability)) {
    frameworkIssues.push(`React/Next website route should skip by default: ${capability}`);
  }
}
checks.push(
  asCheck(
    'framework-capability-conflicts',
    frameworkIssues.length === 0,
    {
      frameworkFamily: scenarioRouting?.frameworkFamily ?? null,
      activeCapabilities,
      skippedCapabilities,
    },
    frameworkIssues,
  ),
);

const productIssues: string[] = [];
const productPending = decisionValidation?.readyToImplement === false;
if (productPending && proposal?.nextStep !== 'product-ops-decision') {
  productIssues.push(`proposal nextStep should remain product-ops-decision while product decisions are pending`);
}
if (productPending && !includesText(proposal?.selectedPlan?.implementationBoundaries, 'No content truth claims')) {
  productIssues.push('proposal boundaries must block content truth claims while product decisions are pending');
}
if (productPending && !includesText(proposal?.selectedPlan?.implementationBoundaries, 'No product-data rewrite')) {
  productIssues.push('proposal boundaries must block product-data rewrite while product decisions are pending');
}
if (productPending && (implementationPlan?.groups ?? []).some((group) => group.readyForImplementation)) {
  productIssues.push('implementation plan has ready product groups while decision validation is not ready');
}
if (productPending && (decisionValidation?.readyGroups?.length ?? 0) > 0) {
  productIssues.push('decision validation has readyGroups while readyToImplement is false');
}
checks.push(
  asCheck(
    'product-decision-boundary',
    productIssues.length === 0,
    {
      readyToImplement: decisionValidation?.readyToImplement ?? null,
      pendingGroups: decisionValidation?.pendingGroups ?? [],
      invalidGroups: decisionValidation?.invalidGroups ?? [],
      representedViolationCount: decisionValidation?.totals?.matrixGroupSum ?? null,
      proposalNextStep: proposal?.nextStep ?? null,
      implementationBoundaries: proposal?.selectedPlan?.implementationBoundaries ?? [],
    },
    productIssues,
  ),
);

const consistencyIssues: string[] = [];
if (!includesText(proposal?.selectedPlan?.evidenceFiles, 'render-review-packet.json')) {
  consistencyIssues.push('proposal evidence files should include render-review-packet.json');
}
if (!includesText(proposal?.selectedPlan?.evidenceFiles, 'render-evidence-summary.json')) {
  consistencyIssues.push('proposal evidence files should include render-evidence-summary.json');
}
if ((status?.readiness?.blockingGates ?? []).some((gate) => !['production-mock-gate', 'product-decision-matrix'].includes(gate))) {
  consistencyIssues.push(`status has non-product blocking gates: ${(status?.readiness?.blockingGates ?? []).join(', ')}`);
}
if (productPending && status?.readiness?.nextRequiredStage !== 'product-ops-decision') {
  consistencyIssues.push(
    `status nextRequiredStage should be product-ops-decision while product decisions are pending, got ${status?.readiness?.nextRequiredStage ?? 'missing'}`,
  );
}
checks.push(
  asCheck(
    'artifact-command-consistency',
    consistencyIssues.length === 0,
    {
      statusBlockingGates: status?.readiness?.blockingGates ?? [],
      statusNextRequiredStage: status?.readiness?.nextRequiredStage ?? null,
      proposalEvidenceFiles: proposal?.selectedPlan?.evidenceFiles ?? [],
    },
    consistencyIssues,
  ),
);

const issues = checks.flatMap((check) => check.issues);
const ok = issues.length === 0;
const validation = {
  schemaVersion: 'uiux-deconflict.v1',
  run: 'run-20-deconflict-check',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  ok,
  issueCount: issues.length,
  issues,
  scenario: scenarioId,
  frameworkFamily: scenarioRouting?.frameworkFamily ?? null,
  productDecisionState: {
    readyToImplement: decisionValidation?.readyToImplement ?? null,
    pendingGroups: decisionValidation?.pendingGroups ?? [],
    invalidGroups: decisionValidation?.invalidGroups ?? [],
    representedViolationCount: decisionValidation?.totals?.matrixGroupSum ?? null,
  },
  checks,
  summary: {
    stageOwnerCount: stageSequence.length,
    artifactOwnerCount: artifactOwners.length,
    activeCapabilityCount: activeCapabilities.length,
    skippedCapabilityCount: skippedCapabilities.length,
    writerVerifierSeparated: checks.find((check) => check.name === 'writer-verifier-separation')?.ok ?? false,
    productDecisionBoundaryHeld: checks.find((check) => check.name === 'product-decision-boundary')?.ok ?? false,
  },
};

writeFileSync(path.join(outDir, 'deconflict-validation.json'), `${JSON.stringify(validation, null, 2)}\n`, 'utf-8');

const md = `# UI/UX Deconflict Check

Date: 2026-05-24
Run: \`run-20-deconflict-check\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Issue count: \`${validation.issueCount}\`
- Scenario: \`${validation.scenario}\`
- Framework family: \`${validation.frameworkFamily ?? 'unknown'}\`

## Checks

| Check | OK | Issues |
| --- | --- | --- |
${checks.map((check) => `| \`${check.name}\` | \`${check.ok}\` | ${check.issues.length ? check.issues.join('<br>') : 'none'} |`).join('\n')}

## Stage Owners

| Stage | Owner | Requires verification |
| --- | --- | --- |
${stageSequence.map((stage) => `| \`${stage.id ?? 'unknown'}\` | ${stage.owner ?? 'missing'} | \`${stage.requiresVerification === true}\` |`).join('\n')}

## Artifact Owners

| Artifact | Owner | Verifier | Source |
| --- | --- | --- | --- |
${artifactOwners.map((item) => `| \`${item.artifact}\` | ${item.owner} | ${item.verifier} | \`${item.source}\` |`).join('\n')}

## Product Boundary

- Ready to implement: \`${decisionValidation?.readyToImplement ?? 'unknown'}\`
- Pending groups: ${(decisionValidation?.pendingGroups ?? []).length ? (decisionValidation?.pendingGroups ?? []).map((group) => `\`${group}\``).join(', ') : 'none'}
- Represented violation count: \`${decisionValidation?.totals?.matrixGroupSum ?? 'unknown'}\`
- Proposal next step: \`${proposal?.nextStep ?? 'unknown'}\`

## Capability Boundary

- Active capabilities: ${activeCapabilities.length ? activeCapabilities.map((item) => `\`${item}\``).join(', ') : 'none'}
- Skipped by default: ${skippedCapabilities.length ? skippedCapabilities.map((item) => `\`${item}\``).join(', ') : 'none'}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No deconflict issues found.'}
`;

writeFileSync(path.join(outDir, 'DECONFLICT-CHECK.md'), md, 'utf-8');
console.log(JSON.stringify(validation, null, 2));

if (!ok) {
  process.exit(1);
}
