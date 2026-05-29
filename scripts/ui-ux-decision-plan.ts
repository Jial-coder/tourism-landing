#!/usr/bin/env tsx
/**
 * Validate product/ops UI/UX release decisions and produce an implementation plan.
 *
 * This does not modify product content. It answers whether the current decision
 * matrix is actionable and what the next implementation owner should do.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type Decision = 'pending' | 'verified' | 'hidden' | 'time-bound-allowlist';

type DecisionGroup = {
  id: string;
  count: number;
  decision: Decision | string;
  ownerNeeded: string;
  implementationOwner: string;
  evidenceNeeded: string[];
  selectedResolution: string | null;
  evidenceOwner: string | null;
  verificationNote: string | null;
  allowlistExpires: string | null;
};

type DecisionMatrix = {
  run: string;
  project: string;
  sourceWorkflow: string;
  sourceStatus: string;
  status: string;
  decisionOptions: string[];
  rules: string[];
  groups: DecisionGroup[];
  verificationAfterDecision: string[];
};

type Workflow = {
  totalViolations: number;
  decisionGroups: Array<{
    id: string;
    label: string;
    count: number;
    files: string[];
    requiredEvidence: string[];
    allowedResolutions: string[];
    blockedResolutions: string[];
  }>;
};

type GroupValidation = {
  id: string;
  label: string;
  decision: string;
  count: number;
  ownerNeeded: string;
  implementationOwner: string;
  files: string[];
  readyForImplementation: boolean;
  issues: string[];
  nextAction: string;
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const DEFAULT_MATRIX = path.join(DEFAULT_OUT_DIR, 'mock-gate-product-decision-matrix.json');
const DEFAULT_WORKFLOW = path.join(DEFAULT_OUT_DIR, 'mock-gate-decision-workflow.json');

const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const matrixArg = process.argv.find((arg) => arg.startsWith('--matrix='));
const workflowArg = process.argv.find((arg) => arg.startsWith('--workflow='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;
const matrixPath = matrixArg ? path.resolve(ROOT, matrixArg.slice('--matrix='.length)) : DEFAULT_MATRIX;
const workflowPath = workflowArg ? path.resolve(ROOT, workflowArg.slice('--workflow='.length)) : DEFAULT_WORKFLOW;

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

function writeText(file: string, content: string): string {
  const target = path.join(outDir, file);
  writeFileSync(target, content, 'utf-8');
  return target;
}

function isValidFutureDate(value: string | null): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return value >= new Date().toISOString().slice(0, 10);
}

function validateGroup(group: DecisionGroup, workflow: Workflow): GroupValidation {
  const workflowGroup = workflow.decisionGroups.find((candidate) => candidate.id === group.id);
  const files = workflowGroup?.files ?? [];
  const label = workflowGroup?.label ?? group.id;
  const issues: string[] = [];

  if (!workflowGroup) {
    issues.push('group is not present in the workflow contract');
  }
  if (workflowGroup && workflowGroup.count !== group.count) {
    issues.push(`count mismatch: matrix=${group.count}, workflow=${workflowGroup.count}`);
  }

  if (group.decision === 'pending') {
    issues.push('decision is pending');
  } else if (group.decision === 'verified') {
    if (!group.selectedResolution) issues.push('verified decision needs selectedResolution');
    if (!group.evidenceOwner) issues.push('verified decision needs evidenceOwner');
    if (!group.verificationNote) issues.push('verified decision needs verificationNote');
  } else if (group.decision === 'hidden') {
    if (!group.selectedResolution) issues.push('hidden decision needs selectedResolution');
    if (!group.verificationNote) issues.push('hidden decision needs verificationNote describing the production UX fallback');
  } else if (group.decision === 'time-bound-allowlist') {
    if (!group.selectedResolution) issues.push('allowlist decision needs selectedResolution/reason');
    if (!group.evidenceOwner) issues.push('allowlist decision needs evidenceOwner');
    if (!group.verificationNote) issues.push('allowlist decision needs verificationNote');
    if (!isValidFutureDate(group.allowlistExpires)) {
      issues.push('allowlist decision needs a valid future allowlistExpires date');
    }
  } else {
    issues.push(`unknown decision: ${group.decision}`);
  }

  return {
    id: group.id,
    label,
    decision: group.decision,
    count: group.count,
    ownerNeeded: group.ownerNeeded,
    implementationOwner: group.implementationOwner,
    files,
    readyForImplementation: issues.length === 0,
    issues,
    nextAction: issues.length === 0
      ? `Implement the approved ${group.decision} resolution across the listed files, then run the verification chain.`
      : `Resolve decision issues with ${group.ownerNeeded} before editing source content.`,
  };
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const matrix = readJson<DecisionMatrix>(matrixPath);
const workflow = readJson<Workflow>(workflowPath);
const groups = matrix.groups.map((group) => validateGroup(group, workflow));
const matrixGroupSum = matrix.groups.reduce((sum, group) => sum + group.count, 0);
const workflowGroupSum = workflow.decisionGroups.reduce((sum, group) => sum + group.count, 0);
const crossIssues: string[] = [];

if (matrixGroupSum !== workflow.totalViolations) {
  crossIssues.push(`matrix group sum ${matrixGroupSum} does not match workflow total ${workflow.totalViolations}`);
}
if (workflowGroupSum !== workflow.totalViolations) {
  crossIssues.push(`workflow group sum ${workflowGroupSum} does not match workflow total ${workflow.totalViolations}`);
}

const pendingGroups = groups.filter((group) => group.decision === 'pending').map((group) => group.id);
const invalidGroups = groups.filter((group) => !group.readyForImplementation).map((group) => group.id);
const readyGroups = groups.filter((group) => group.readyForImplementation).map((group) => group.id);
const readyToImplement = crossIssues.length === 0 && invalidGroups.length === 0;

const plan = {
  run: 'run-11-ui-ux-decision-plan-cli',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  matrixPath: path.relative(ROOT, matrixPath).replace(/\\/g, '/'),
  workflowPath: path.relative(ROOT, workflowPath).replace(/\\/g, '/'),
  readyToImplement,
  totals: {
    workflowViolations: workflow.totalViolations,
    matrixGroupSum,
    workflowGroupSum,
    groupCount: groups.length,
    readyGroups: readyGroups.length,
    pendingGroups: pendingGroups.length,
    invalidGroups: invalidGroups.length,
  },
  crossIssues,
  pendingGroups,
  invalidGroups,
  readyGroups,
  groups,
  verificationAfterImplementation: matrix.verificationAfterDecision,
  artifacts: {
    validationJson: 'qa/ui-ux-review/codex-2026-05-24/mock-gate-decision-validation.json',
    implementationPlanJson: 'qa/ui-ux-review/codex-2026-05-24/mock-gate-implementation-plan.json',
    implementationPlanMarkdown: 'qa/ui-ux-review/codex-2026-05-24/MOCK-GATE-IMPLEMENTATION-PLAN.md',
  },
};

writeText('mock-gate-decision-validation.json', `${JSON.stringify({
  readyToImplement,
  totals: plan.totals,
  crossIssues,
  pendingGroups,
  invalidGroups,
  readyGroups,
}, null, 2)}\n`);
writeText('mock-gate-implementation-plan.json', `${JSON.stringify(plan, null, 2)}\n`);

const md = `# Mock Gate Implementation Plan

Date: 2026-05-24
Run: \`run-11-ui-ux-decision-plan-cli\`
Project: \`${ROOT}\`

## Decision Readiness

- Ready to implement: \`${readyToImplement}\`
- Workflow violations represented: \`${workflow.totalViolations}\`
- Matrix group sum: \`${matrixGroupSum}\`
- Pending groups: \`${pendingGroups.length}\`
- Ready groups: \`${readyGroups.length}\`

${crossIssues.length ? `## Cross-File Issues\n\n${crossIssues.map((issue) => `- ${issue}`).join('\n')}\n` : ''}
## Group Status

| Group | Count | Decision | Ready | Owner needed | Next action |
| --- | ---: | --- | --- | --- | --- |
${groups.map((group) => `| \`${group.id}\` | ${group.count} | \`${group.decision}\` | \`${group.readyForImplementation}\` | ${group.ownerNeeded} | ${group.nextAction} |`).join('\n')}

## Blocking Detail

${groups
  .filter((group) => group.issues.length > 0)
  .map((group) => `### ${group.id}\n\n${group.issues.map((issue) => `- ${issue}`).join('\n')}`)
  .join('\n\n') || 'No decision issues remain.'}

## Verification After Implementation

${matrix.verificationAfterDecision.map((command) => `- \`${command}\``).join('\n')}
`;

writeText('MOCK-GATE-IMPLEMENTATION-PLAN.md', md);

console.log(JSON.stringify(plan, null, 2));

if (!readyToImplement) {
  process.exit(1);
}
