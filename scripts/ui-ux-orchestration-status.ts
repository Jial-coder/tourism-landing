#!/usr/bin/env tsx
/**
 * AI-facing UI/UX orchestration status entrypoint.
 *
 * This script runs the smallest useful website-landing status chain for
 * follow-up agents: mock release gate, optional verification commands, and a
 * machine-readable summary that points to the next required stage.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

type CommandResult = {
  command: string;
  exitCode: number | null;
  ok: boolean;
  stdout: string;
  stderr: string;
  durationMs: number;
};

type MockGateReport = {
  ok: boolean;
  skipped: boolean;
  generatedAt: string;
  allowlist: Array<{ path: string; reason: string; expires: string }>;
  totals: {
    violations: number;
    byRule: Record<string, number>;
    byFile: Record<string, number>;
  };
  violations: Array<{
    file: string;
    line: number;
    col: number;
    rule: string;
    message: string;
  }>;
};

type DecisionValidation = {
  readyToImplement: boolean;
  totals: {
    workflowViolations: number;
    matrixGroupSum: number;
    workflowGroupSum: number;
    groupCount: number;
    readyGroups: number;
    pendingGroups: number;
    invalidGroups: number;
  };
  crossIssues: string[];
  pendingGroups: string[];
  invalidGroups: string[];
  readyGroups: string[];
};

type RenderEvidence = {
  run: string;
  base: string;
  viewports: string[];
  routes: string[];
  pages: Array<{
    route: string;
    viewport: string;
    ok: boolean;
    status?: number;
    screenshot?: string;
    issueCount?: number;
  }>;
  totals: {
    errors: number;
    consoleErrors: number;
    pageErrors: number;
    overflowPages: number;
  };
};

type ReviewValidation = {
  run: string;
  generatedAt: string;
  project: string;
  packetPath: string;
  ok: boolean;
  issueCount: number;
  issues: string[];
  summary: {
    reviewRun?: string;
    scenario?: string;
    skillRoute?: string;
    evidenceLevel?: string;
    issueCount?: number;
    implementedChangeCount?: number;
    remainingRiskCount?: number;
    nextRequiredStage?: string;
  } | null;
};

type ProposalValidation = {
  run: string;
  generatedAt: string;
  project: string;
  proposalPath: string;
  ok: boolean;
  issueCount: number;
  issues: string[];
  summary: {
    scenario?: string;
    skillRoute?: string;
    planName?: string;
    ownerCount?: number;
    acceptanceCriteriaCount?: number;
    verificationCommandCount?: number;
    nextStep?: string;
  };
};

type ScenarioRoutingResolution = {
  run: string;
  generatedAt: string;
  project: string;
  packageName: string;
  routingPath: string;
  executionPlanPath: string;
  matchedBy: string;
  inputText: string | null;
  scenario: string;
  route: {
    id: string;
    when: string[];
    minimumStages: string[];
    implementationStages?: string[];
    firstEvidence: string[];
    primaryCapabilities: string[];
    optionalCapabilities?: string[];
    skipByDefault?: string[];
    outputs: string[];
  };
  frameworkFamily: 'reactNext' | 'vueViteNuxt' | 'reactNativeExpo' | 'unknown';
  stagePlan: {
    minimumStages: string[];
    implementationStages: string[];
    executionPlanStages: string[];
  };
  routeIssues: string[];
  ok: boolean;
};

type ScenarioCoverageValidation = {
  run: string;
  generatedAt: string;
  project: string;
  packageName: string;
  routingPath: string;
  executionPlanPath: string;
  ok: boolean;
  issueCount: number;
  issues: string[];
  totals: {
    routeCount: number;
    stageCount: number;
    keywordSignalCount: number;
    routesOk: number;
    routesWithIssues: number;
  };
};

type ScenarioPlaybookValidation = {
  run: string;
  generatedAt: string;
  project: string;
  routingPath: string;
  executionPlanPath: string;
  capabilitySources: string[];
  ok: boolean;
  issueCount: number;
  issues: string[];
  totals: {
    scenarioCount: number;
    scenariosOk: number;
    scenariosWithIssues: number;
    externalCapabilityCount: number;
    unresolvedCapabilityCount: number;
  };
};

type HandoffValidation = {
  run: string;
  generatedAt: string;
  project: string;
  packetPath: string;
  ok: boolean;
  issueCount: number;
  issues: string[];
  summary: {
    scenario?: string;
    skillRoute?: string;
    nextRequiredStage?: string;
    blockingGates?: string[];
    sourceArtifactCount?: number;
    missingRequiredArtifactCount?: number;
    cliCommandGroupCount?: number;
    mcpToolsRecorded?: number;
    subagentsRecorded?: number;
    memoryIdsRecorded?: number;
  };
};

type DeconflictValidation = {
  run: string;
  generatedAt: string;
  project: string;
  ok: boolean;
  issueCount: number;
  issues: string[];
  scenario: string;
  frameworkFamily: string | null;
  summary: {
    stageOwnerCount?: number;
    artifactOwnerCount?: number;
    activeCapabilityCount?: number;
    skippedCapabilityCount?: number;
    writerVerifierSeparated?: boolean;
    productDecisionBoundaryHeld?: boolean;
  };
};

type ObjectiveAudit = {
  run: string;
  generatedAt: string;
  project: string;
  ok: boolean;
  complete: boolean;
  objectiveStatus: string;
  nextRequiredStage: string;
  issueCount: number;
  issues: string[];
  totals: {
    requirements?: number;
    fulfilledRequirements?: number;
    sourceArtifacts?: number;
    missingRequiredArtifacts?: number;
    scenarioRoutes?: number | null;
    scenarioPlaybooks?: number | null;
    externalCapabilityReferences?: number | null;
    unresolvedCapabilities?: number | null;
    renderedPages?: number | null;
  };
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;
const full = process.argv.includes('--full');
const render = process.argv.includes('--render');
const handoffSkills = readCliValue('--handoff-skills=') ?? 'ui-ux-aesthetic-review';
const handoffMcp = readCliValue('--handoff-mcp=');
const handoffSubagents = readCliValue('--handoff-subagents=');
const agentMemoryActionId = readCliValue('--agentmemory-action=');
const memoryIds = readCliValue('--memory-ids=');
const snapshotId = readCliValue('--snapshot-id=');

function readCliValue(prefix: string): string | null {
  const index = process.argv.findIndex((arg) => arg.startsWith(prefix));
  if (index === -1) return null;

  const parts = [process.argv[index].slice(prefix.length)];
  for (let i = index + 1; i < process.argv.length; i += 1) {
    const next = process.argv[i];
    if (next.startsWith('--')) break;
    parts.push(next);
  }

  const value = parts.join(',').trim().replace(/\s+/g, ',');
  return value || null;
}

function run(command: string, args: string[]): CommandResult {
  const started = Date.now();
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });
  return {
    command: [command, ...args].join(' '),
    exitCode: typeof result.status === 'number' ? result.status : null,
    ok: result.status === 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    durationMs: Date.now() - started,
  };
}

function readPackageJson(): {
  next?: string;
  react?: string;
  typescript?: string;
  packageManager: string;
  styling: string;
  runtime: string;
} {
  const pkgPath = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  return {
    next: pkg.dependencies?.next,
    react: pkg.dependencies?.react,
    typescript: pkg.devDependencies?.typescript,
    packageManager: 'pnpm',
    styling: 'Tailwind CSS v4',
    runtime: 'Next.js app router',
  };
}

function safeParseMockGate(command: CommandResult): MockGateReport | null {
  try {
    return JSON.parse(command.stdout) as MockGateReport;
  } catch {
    return null;
  }
}

function safeReadDecisionValidation(): DecisionValidation | null {
  const file = path.join(outDir, 'mock-gate-decision-validation.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as DecisionValidation;
  } catch {
    return null;
  }
}

function safeReadRenderEvidence(): RenderEvidence | null {
  const file = path.join(outDir, 'render-evidence-summary.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as RenderEvidence;
  } catch {
    return null;
  }
}

function safeReadReviewValidation(): ReviewValidation | null {
  const file = path.join(outDir, 'aesthetic-review-validation.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ReviewValidation;
  } catch {
    return null;
  }
}

function safeReadProposalValidation(): ProposalValidation | null {
  const file = path.join(outDir, 'aesthetic-proposal-validation.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ProposalValidation;
  } catch {
    return null;
  }
}

function safeReadScenarioRoutingResolution(): ScenarioRoutingResolution | null {
  const file = path.join(outDir, 'scenario-routing-resolution.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ScenarioRoutingResolution;
  } catch {
    return null;
  }
}

function safeReadScenarioCoverageValidation(): ScenarioCoverageValidation | null {
  const file = path.join(outDir, 'scenario-coverage.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ScenarioCoverageValidation;
  } catch {
    return null;
  }
}

function safeReadScenarioPlaybookValidation(): ScenarioPlaybookValidation | null {
  const file = path.join(outDir, 'scenario-playbook.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ScenarioPlaybookValidation;
  } catch {
    return null;
  }
}

function safeReadHandoffValidation(): HandoffValidation | null {
  const file = path.join(outDir, 'uiux-handoff-validation.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as HandoffValidation;
  } catch {
    return null;
  }
}

function safeReadDeconflictValidation(): DeconflictValidation | null {
  const file = path.join(outDir, 'deconflict-validation.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as DeconflictValidation;
  } catch {
    return null;
  }
}

function safeReadObjectiveAudit(): ObjectiveAudit | null {
  const file = path.join(outDir, 'objective-completion-audit.json');
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf-8')) as ObjectiveAudit;
  } catch {
    return null;
  }
}

function writeText(file: string, content: string): string {
  const target = path.join(outDir, file);
  writeFileSync(target, content, 'utf-8');
  return target;
}

function summarizeCommand(result: CommandResult): string {
  return `${result.ok ? 'PASS' : 'FAIL'} exit=${result.exitCode} duration=${result.durationMs}ms`;
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const generatedAt = new Date().toISOString();
const stack = readPackageJson();
const commands: Record<string, CommandResult> = {};

commands.route = run('pnpm', ['run', 'qa:uiux:route']);
writeText('orchestration-route.log', `${commands.route.stdout}${commands.route.stderr}`);

commands.scenarioCoverage = run('pnpm', ['run', 'qa:uiux:scenario-coverage']);
writeText('orchestration-scenario-coverage.log', `${commands.scenarioCoverage.stdout}${commands.scenarioCoverage.stderr}`);

commands.scenarioPlaybook = run('pnpm', ['run', 'qa:uiux:playbook']);
writeText('orchestration-scenario-playbook.log', `${commands.scenarioPlaybook.stdout}${commands.scenarioPlaybook.stderr}`);

commands.mockGateJson = run('pnpm', [
  'exec',
  'tsx',
  'scripts/prelaunch-mock-guard.ts',
  '--enforce-production',
  '--json',
]);

writeText('orchestration-mock-gate.stdout.json', commands.mockGateJson.stdout);
writeText('orchestration-mock-gate.stderr.log', commands.mockGateJson.stderr);

commands.decisionPlan = run('pnpm', ['run', 'qa:uiux:plan']);
writeText('orchestration-decision-plan.log', `${commands.decisionPlan.stdout}${commands.decisionPlan.stderr}`);

commands.reviewPacket = run('pnpm', ['run', 'qa:uiux:review']);
writeText('orchestration-review-packet.log', `${commands.reviewPacket.stdout}${commands.reviewPacket.stderr}`);

commands.proposal = run('pnpm', ['run', 'qa:uiux:propose']);
writeText('orchestration-proposal.log', `${commands.proposal.stdout}${commands.proposal.stderr}`);

if (render) {
  commands.renderEvidence = run('pnpm', ['run', 'qa:uiux:render']);
  writeText('orchestration-render-evidence.log', `${commands.renderEvidence.stdout}${commands.renderEvidence.stderr}`);
}

if (full) {
  commands.typecheck = run('pnpm', ['typecheck']);
  commands.i18n = run('pnpm', ['run', 'check:i18n']);
  commands.build = run('pnpm', ['run', 'build']);
  writeText('orchestration-typecheck.log', `${commands.typecheck.stdout}${commands.typecheck.stderr}`);
  writeText('orchestration-i18n.log', `${commands.i18n.stdout}${commands.i18n.stderr}`);
  writeText('orchestration-build.log', `${commands.build.stdout}${commands.build.stderr}`);
}

const mockGate = safeParseMockGate(commands.mockGateJson);
const routeResolution = safeReadScenarioRoutingResolution();
const scenarioCoverage = safeReadScenarioCoverageValidation();
const scenarioPlaybook = safeReadScenarioPlaybookValidation();
const decisionValidation = safeReadDecisionValidation();
const reviewValidation = safeReadReviewValidation();
const proposalValidation = safeReadProposalValidation();
const renderEvidence = render ? safeReadRenderEvidence() : null;
const verificationCommands = Object.fromEntries(
  Object.entries(commands).map(([key, value]) => [
    key,
    {
      command: value.command,
      exitCode: value.exitCode,
      ok: value.ok,
      durationMs: value.durationMs,
    },
  ]),
);

const blockingGates: string[] = [];
if (!mockGate) {
  blockingGates.push('mock-gate-json-unparseable');
} else if (!mockGate.ok) {
  blockingGates.push('production-mock-gate');
}
if (!routeResolution) {
  blockingGates.push('scenario-routing-unavailable');
} else if (!routeResolution.ok) {
  blockingGates.push('scenario-routing');
}
if (!scenarioCoverage) {
  blockingGates.push('scenario-coverage-unavailable');
} else if (!scenarioCoverage.ok) {
  blockingGates.push('scenario-coverage');
}
if (!scenarioPlaybook) {
  blockingGates.push('scenario-playbook-unavailable');
} else if (!scenarioPlaybook.ok) {
  blockingGates.push('scenario-playbook');
}
if (!decisionValidation) {
  blockingGates.push('decision-plan-unavailable');
} else if (!decisionValidation.readyToImplement) {
  blockingGates.push('product-decision-matrix');
}
if (!reviewValidation) {
  blockingGates.push('aesthetic-review-unavailable');
} else if (!reviewValidation.ok) {
  blockingGates.push('aesthetic-review-packet');
}
if (!proposalValidation) {
  blockingGates.push('aesthetic-proposal-unavailable');
} else if (!proposalValidation.ok) {
  blockingGates.push('aesthetic-proposal');
}
if (render) {
  if (!renderEvidence) {
    blockingGates.push('render-evidence-unavailable');
  } else if (
    renderEvidence.totals.errors > 0 ||
    renderEvidence.totals.consoleErrors > 0 ||
    renderEvidence.totals.overflowPages > 0
  ) {
    blockingGates.push('render-evidence');
  }
}
for (const [key, result] of Object.entries(commands)) {
  if (
    key !== 'mockGateJson' &&
    key !== 'decisionPlan' &&
    key !== 'scenarioCoverage' &&
    key !== 'scenarioPlaybook' &&
    key !== 'renderEvidence' &&
    !result.ok
  ) {
    blockingGates.push(key);
  }
}

const nextRequiredStage =
  routeResolution && !routeResolution.ok
    ? 'intake'
    : !routeResolution
      ? 'intake'
      : scenarioCoverage && !scenarioCoverage.ok
        ? 'intake'
        : !scenarioCoverage
          ? 'intake'
          : scenarioPlaybook && !scenarioPlaybook.ok
            ? 'intake'
            : !scenarioPlaybook
              ? 'intake'
              : proposalValidation && !proposalValidation.ok
        ? 'rendered-aesthetic-proposal'
        : !proposalValidation
          ? 'rendered-aesthetic-proposal'
          : reviewValidation && !reviewValidation.ok
            ? 'rendered-aesthetic-review'
            : !reviewValidation
              ? 'rendered-aesthetic-review'
              : decisionValidation && !decisionValidation.readyToImplement
                ? 'product-ops-decision'
                : mockGate && !mockGate.ok
                  ? 'product-ops-decision'
                  : renderEvidence && blockingGates.includes('render-evidence')
                    ? 'frontend-render-fix'
                    : !render
                      ? 'rendered-evidence'
                      : blockingGates.length > 0
                        ? 'engineering-fix'
                        : 'rendered-visual-regression';

const status = {
  run: 'ui-ux-orchestration-status-cli',
  generatedAt,
  project: ROOT,
  scenario: 'website-landing',
  evidenceLevel: render
    ? 'source + build verification + rendered evidence'
    : full
      ? 'source + build verification'
      : 'source gate status',
  skillRoute: 'ui-ux-aesthetic-review',
  technologyStack: stack,
  full,
  render,
  readiness: {
    readyForLaunch: blockingGates.length === 0,
    blockingGates,
    nextRequiredStage,
    aiCanContinueWithoutUserInput: nextRequiredStage !== 'product-ops-decision',
  },
  gates: {
    mockGate: mockGate
      ? {
          ok: mockGate.ok,
          skipped: mockGate.skipped,
          violations: mockGate.totals.violations,
          byRule: mockGate.totals.byRule,
          byFile: mockGate.totals.byFile,
          allowlistCount: mockGate.allowlist.length,
        }
        : {
          ok: false,
          parseError: true,
        },
    scenarioRouting: routeResolution
      ? {
          ok: routeResolution.ok,
          scenario: routeResolution.scenario,
          matchedBy: routeResolution.matchedBy,
          frameworkFamily: routeResolution.frameworkFamily,
          stageCount: routeResolution.stagePlan.minimumStages.length + routeResolution.stagePlan.implementationStages.length,
          routeIssues: routeResolution.routeIssues,
        }
      : {
          ok: false,
          parseError: true,
        },
    scenarioCoverage: scenarioCoverage
      ? {
          ok: scenarioCoverage.ok,
          issueCount: scenarioCoverage.issueCount,
          routeCount: scenarioCoverage.totals.routeCount,
          keywordSignalCount: scenarioCoverage.totals.keywordSignalCount,
          routesOk: scenarioCoverage.totals.routesOk,
          routesWithIssues: scenarioCoverage.totals.routesWithIssues,
        }
      : {
          ok: false,
          parseError: true,
        },
    scenarioPlaybook: scenarioPlaybook
      ? {
          ok: scenarioPlaybook.ok,
          issueCount: scenarioPlaybook.issueCount,
          scenarioCount: scenarioPlaybook.totals.scenarioCount,
          scenariosOk: scenarioPlaybook.totals.scenariosOk,
          scenariosWithIssues: scenarioPlaybook.totals.scenariosWithIssues,
          externalCapabilityCount: scenarioPlaybook.totals.externalCapabilityCount,
          unresolvedCapabilityCount: scenarioPlaybook.totals.unresolvedCapabilityCount,
        }
      : {
          ok: false,
          parseError: true,
        },
    decisionMatrix: decisionValidation
      ? {
          readyToImplement: decisionValidation.readyToImplement,
          groupCount: decisionValidation.totals.groupCount,
          pendingGroups: decisionValidation.totals.pendingGroups,
          invalidGroups: decisionValidation.totals.invalidGroups,
          readyGroups: decisionValidation.totals.readyGroups,
          matrixGroupSum: decisionValidation.totals.matrixGroupSum,
          pendingGroupIds: decisionValidation.pendingGroups,
        }
      : {
          readyToImplement: false,
          parseError: true,
        },
    aestheticReview: reviewValidation
      ? {
          ok: reviewValidation.ok,
          issueCount: reviewValidation.issueCount,
          packetPath: reviewValidation.packetPath,
          nextRequiredStage: reviewValidation.summary?.nextRequiredStage ?? null,
        }
      : {
          skipped: true,
        },
    aestheticProposal: proposalValidation
      ? {
          ok: proposalValidation.ok,
          issueCount: proposalValidation.issueCount,
          proposalPath: proposalValidation.proposalPath,
          nextStep: proposalValidation.summary?.nextStep ?? null,
        }
      : {
          skipped: true,
        },
    renderEvidence: renderEvidence
      ? {
          ok:
            renderEvidence.totals.errors === 0 &&
            renderEvidence.totals.consoleErrors === 0 &&
            renderEvidence.totals.overflowPages === 0,
          pages: renderEvidence.pages.length,
          routes: renderEvidence.routes,
          viewports: renderEvidence.viewports,
          errors: renderEvidence.totals.errors,
          consoleErrors: renderEvidence.totals.consoleErrors,
          pageErrors: renderEvidence.totals.pageErrors,
          overflowPages: renderEvidence.totals.overflowPages,
        }
      : {
          skipped: !render,
        },
  },
  verificationCommands,
  artifacts: {
    statusJson: 'qa/ui-ux-review/codex-2026-05-24/orchestration-status.json',
    statusMarkdown: 'qa/ui-ux-review/codex-2026-05-24/ORCHESTRATION-STATUS.md',
    scenarioRoutingResolution: 'qa/ui-ux-review/codex-2026-05-24/scenario-routing-resolution.json',
    scenarioRoutingMarkdown: 'qa/ui-ux-review/codex-2026-05-24/SCENARIO-ROUTING-RESOLUTION.md',
    routeLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-route.log',
    scenarioCoverageJson: 'qa/ui-ux-review/codex-2026-05-24/scenario-coverage.json',
    scenarioCoverageMarkdown: 'qa/ui-ux-review/codex-2026-05-24/SCENARIO-COVERAGE.md',
    scenarioCoverageLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-scenario-coverage.log',
    scenarioPlaybookJson: 'qa/ui-ux-review/codex-2026-05-24/scenario-playbook.json',
    scenarioPlaybookMarkdown: 'qa/ui-ux-review/codex-2026-05-24/SCENARIO-PLAYBOOK.md',
    scenarioPlaybookLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-scenario-playbook.log',
    mockGateJson: 'qa/ui-ux-review/codex-2026-05-24/orchestration-mock-gate.stdout.json',
    mockGateStderr: 'qa/ui-ux-review/codex-2026-05-24/orchestration-mock-gate.stderr.log',
    decisionPlanLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-decision-plan.log',
    decisionPacket: 'qa/ui-ux-review/codex-2026-05-24/MOCK-GATE-DECISION-PACKET.md',
    decisionWorkflow: 'qa/ui-ux-review/codex-2026-05-24/mock-gate-decision-workflow.json',
    decisionMatrix: 'qa/ui-ux-review/codex-2026-05-24/mock-gate-product-decision-matrix.json',
    decisionValidation: 'qa/ui-ux-review/codex-2026-05-24/mock-gate-decision-validation.json',
    implementationPlan: 'qa/ui-ux-review/codex-2026-05-24/MOCK-GATE-IMPLEMENTATION-PLAN.md',
    aestheticReviewValidation: 'qa/ui-ux-review/codex-2026-05-24/aesthetic-review-validation.json',
    aestheticReviewStatus: 'qa/ui-ux-review/codex-2026-05-24/AESTHETIC-REVIEW-STATUS.md',
    reviewPacketLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-review-packet.log',
    aestheticProposalValidation: 'qa/ui-ux-review/codex-2026-05-24/aesthetic-proposal-validation.json',
    aestheticProposalStatus: 'qa/ui-ux-review/codex-2026-05-24/AESTHETIC-PROPOSAL.md',
    proposalLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-proposal.log',
    renderEvidenceSummary: 'qa/ui-ux-review/codex-2026-05-24/render-evidence-summary.json',
    renderEvidenceMarkdown: 'qa/ui-ux-review/codex-2026-05-24/RENDER-EVIDENCE.md',
    renderEvidenceLog: 'qa/ui-ux-review/codex-2026-05-24/orchestration-render-evidence.log',
  },
};

writeText('orchestration-status.json', `${JSON.stringify(status, null, 2)}\n`);

commands.deconflict = run('pnpm', ['run', 'qa:uiux:deconflict']);
writeText('orchestration-deconflict.log', `${commands.deconflict.stdout}${commands.deconflict.stderr}`);

const deconflictValidation = safeReadDeconflictValidation();
if (!deconflictValidation) {
  blockingGates.push('deconflict-unavailable');
} else if (!deconflictValidation.ok) {
  blockingGates.push('deconflict');
}

verificationCommands.deconflict = {
  command: commands.deconflict.command,
  exitCode: commands.deconflict.exitCode,
  ok: commands.deconflict.ok,
  durationMs: commands.deconflict.durationMs,
};

(status.gates as Record<string, unknown>).deconflict = deconflictValidation
  ? {
      ok: deconflictValidation.ok,
      issueCount: deconflictValidation.issueCount,
      scenario: deconflictValidation.scenario,
      frameworkFamily: deconflictValidation.frameworkFamily,
      stageOwnerCount: deconflictValidation.summary.stageOwnerCount ?? null,
      artifactOwnerCount: deconflictValidation.summary.artifactOwnerCount ?? null,
      writerVerifierSeparated: deconflictValidation.summary.writerVerifierSeparated ?? false,
      productDecisionBoundaryHeld: deconflictValidation.summary.productDecisionBoundaryHeld ?? false,
    }
  : {
      ok: false,
      parseError: true,
    };

(status.artifacts as Record<string, string>).deconflictValidation =
  'qa/ui-ux-review/codex-2026-05-24/deconflict-validation.json';
(status.artifacts as Record<string, string>).deconflictMarkdown =
  'qa/ui-ux-review/codex-2026-05-24/DECONFLICT-CHECK.md';
(status.artifacts as Record<string, string>).deconflictLog =
  'qa/ui-ux-review/codex-2026-05-24/orchestration-deconflict.log';

const handoffArgs = [
  'run',
  'qa:uiux:handoff',
  '--',
  `--skills=${handoffSkills}`,
];

if (handoffMcp) handoffArgs.push(`--mcp=${handoffMcp}`);
if (handoffSubagents) handoffArgs.push(`--subagents=${handoffSubagents}`);
if (agentMemoryActionId) handoffArgs.push(`--agentmemory-action=${agentMemoryActionId}`);
if (memoryIds) handoffArgs.push(`--memory-ids=${memoryIds}`);
if (snapshotId) handoffArgs.push(`--snapshot-id=${snapshotId}`);

commands.handoff = run('pnpm', handoffArgs);
writeText('orchestration-handoff.log', `${commands.handoff.stdout}${commands.handoff.stderr}`);

const handoffValidation = safeReadHandoffValidation();
if (!handoffValidation) {
  blockingGates.push('remember-handoff-unavailable');
} else if (!handoffValidation.ok) {
  blockingGates.push('remember-handoff');
}

verificationCommands.handoff = {
  command: commands.handoff.command,
  exitCode: commands.handoff.exitCode,
  ok: commands.handoff.ok,
  durationMs: commands.handoff.durationMs,
};

(status.gates as Record<string, unknown>).rememberHandoff = handoffValidation
  ? {
      ok: handoffValidation.ok,
      issueCount: handoffValidation.issueCount,
      packetPath: handoffValidation.packetPath,
      nextRequiredStage: handoffValidation.summary.nextRequiredStage ?? null,
      sourceArtifactCount: handoffValidation.summary.sourceArtifactCount ?? null,
      missingRequiredArtifactCount: handoffValidation.summary.missingRequiredArtifactCount ?? null,
      mcpToolsRecorded: handoffValidation.summary.mcpToolsRecorded ?? 0,
      subagentsRecorded: handoffValidation.summary.subagentsRecorded ?? 0,
      memoryIdsRecorded: handoffValidation.summary.memoryIdsRecorded ?? 0,
    }
  : {
      ok: false,
      parseError: true,
    };

(status.artifacts as Record<string, string>).handoffPacket =
  'qa/ui-ux-review/codex-2026-05-24/uiux-handoff.json';
(status.artifacts as Record<string, string>).handoffValidation =
  'qa/ui-ux-review/codex-2026-05-24/uiux-handoff-validation.json';
(status.artifacts as Record<string, string>).handoffMarkdown =
  'qa/ui-ux-review/codex-2026-05-24/UIUX-HANDOFF.md';
(status.artifacts as Record<string, string>).handoffLog =
  'qa/ui-ux-review/codex-2026-05-24/orchestration-handoff.log';

status.readiness.readyForLaunch = blockingGates.length === 0;
status.readiness.blockingGates = blockingGates;
if (
  blockingGates.some((gate) => gate.startsWith('deconflict')) &&
  status.readiness.nextRequiredStage !== 'product-ops-decision'
) {
  status.readiness.nextRequiredStage = 'deconflict';
}
if (
  blockingGates.some((gate) => gate.startsWith('remember-handoff')) &&
  status.readiness.nextRequiredStage !== 'product-ops-decision'
) {
  status.readiness.nextRequiredStage = 'remember-handoff';
}
status.readiness.aiCanContinueWithoutUserInput = status.readiness.nextRequiredStage !== 'product-ops-decision';

writeText('orchestration-status.json', `${JSON.stringify(status, null, 2)}\n`);

commands.objectiveAudit = run('pnpm', ['run', 'qa:uiux:audit']);
writeText('orchestration-objective-audit.log', `${commands.objectiveAudit.stdout}${commands.objectiveAudit.stderr}`);

const objectiveAudit = safeReadObjectiveAudit();
if (!objectiveAudit) {
  blockingGates.push('objective-audit-unavailable');
} else if (!objectiveAudit.ok) {
  blockingGates.push('objective-audit');
}

verificationCommands.objectiveAudit = {
  command: commands.objectiveAudit.command,
  exitCode: commands.objectiveAudit.exitCode,
  ok: commands.objectiveAudit.ok,
  durationMs: commands.objectiveAudit.durationMs,
};

(status.gates as Record<string, unknown>).objectiveAudit = objectiveAudit
  ? {
      ok: objectiveAudit.ok,
      complete: objectiveAudit.complete,
      objectiveStatus: objectiveAudit.objectiveStatus,
      nextRequiredStage: objectiveAudit.nextRequiredStage,
      issueCount: objectiveAudit.issueCount,
      requirements: objectiveAudit.totals.requirements ?? null,
      fulfilledRequirements: objectiveAudit.totals.fulfilledRequirements ?? null,
      unresolvedCapabilities: objectiveAudit.totals.unresolvedCapabilities ?? null,
    }
  : {
      ok: false,
      parseError: true,
    };

(status.artifacts as Record<string, string>).objectiveAuditJson =
  'qa/ui-ux-review/codex-2026-05-24/objective-completion-audit.json';
(status.artifacts as Record<string, string>).objectiveAuditMarkdown =
  'qa/ui-ux-review/codex-2026-05-24/OBJECTIVE-COMPLETION-AUDIT.md';
(status.artifacts as Record<string, string>).objectiveAuditLog =
  'qa/ui-ux-review/codex-2026-05-24/orchestration-objective-audit.log';

status.readiness.readyForLaunch = blockingGates.length === 0;
status.readiness.blockingGates = blockingGates;
if (
  blockingGates.some((gate) => gate.startsWith('objective-audit')) &&
  status.readiness.nextRequiredStage !== 'product-ops-decision'
) {
  status.readiness.nextRequiredStage = 'objective-audit';
}
status.readiness.aiCanContinueWithoutUserInput = status.readiness.nextRequiredStage !== 'product-ops-decision';

writeText('orchestration-status.json', `${JSON.stringify(status, null, 2)}\n`);

const md = `# UI/UX Orchestration Status

Date: 2026-05-24
Run: \`ui-ux-orchestration-status-cli\`
Project: \`${ROOT}\`

## Scenario

- Route: \`website-landing\`
- Skill route: \`ui-ux-aesthetic-review\`
- Evidence level: ${status.evidenceLevel}
- Full verification: \`${full}\`
- Render verification: \`${render}\`

## Scenario Routing

${routeResolution ? `- OK: \`${routeResolution.ok}\`
- Matched by: \`${routeResolution.matchedBy}\`
- Scenario: \`${routeResolution.scenario}\`
- Framework family: \`${routeResolution.frameworkFamily}\`
- Minimum stages: ${routeResolution.stagePlan.minimumStages.map((stage) => `\`${stage}\``).join(', ')}
- Implementation stages: ${routeResolution.stagePlan.implementationStages.map((stage) => `\`${stage}\``).join(', ')}` : '- Scenario routing could not be parsed.'}

## Scenario Coverage

${scenarioCoverage ? `- OK: \`${scenarioCoverage.ok}\`
- Route count: \`${scenarioCoverage.totals.routeCount}\`
- Keyword signals: \`${scenarioCoverage.totals.keywordSignalCount}\`
- Routes OK: \`${scenarioCoverage.totals.routesOk}\`
- Routes with issues: \`${scenarioCoverage.totals.routesWithIssues}\`` : '- Scenario coverage could not be parsed.'}

## Scenario Playbook

${scenarioPlaybook ? `- OK: \`${scenarioPlaybook.ok}\`
- Scenarios: \`${scenarioPlaybook.totals.scenarioCount}\`
- Scenarios OK: \`${scenarioPlaybook.totals.scenariosOk}\`
- External capability references: \`${scenarioPlaybook.totals.externalCapabilityCount}\`
- Unresolved capabilities: \`${scenarioPlaybook.totals.unresolvedCapabilityCount}\`` : '- Scenario playbook could not be parsed.'}

## Deconflict

${deconflictValidation ? `- OK: \`${deconflictValidation.ok}\`
- Issue count: \`${deconflictValidation.issueCount}\`
- Stage owners: \`${deconflictValidation.summary.stageOwnerCount ?? 'unknown'}\`
- Artifact owners: \`${deconflictValidation.summary.artifactOwnerCount ?? 'unknown'}\`
- Writer/verifier separated: \`${deconflictValidation.summary.writerVerifierSeparated ?? false}\`
- Product boundary held: \`${deconflictValidation.summary.productDecisionBoundaryHeld ?? false}\`` : '- Deconflict validation could not be parsed.'}

## Technology Stack

- Next.js: \`${stack.next ?? 'unknown'}\`
- React: \`${stack.react ?? 'unknown'}\`
- TypeScript: \`${stack.typescript ?? 'unknown'}\`
- Styling: ${stack.styling}
- Package manager: ${stack.packageManager}

## Readiness

- Ready for launch: \`${status.readiness.readyForLaunch}\`
- Blocking gates: ${status.readiness.blockingGates.length ? status.readiness.blockingGates.map((gate) => `\`${gate}\``).join(', ') : 'none'}
- Next required stage: \`${status.readiness.nextRequiredStage}\`
- AI can continue without user input: \`${status.readiness.aiCanContinueWithoutUserInput}\`

## Mock Gate

${mockGate ? `- OK: \`${mockGate.ok}\`
- Violations: \`${mockGate.totals.violations}\`
- By rule: \`${JSON.stringify(mockGate.totals.byRule)}\`
- Allowlist entries: \`${mockGate.allowlist.length}\`` : '- JSON output could not be parsed.'}

## Decision Matrix

${decisionValidation ? `- Ready to implement: \`${decisionValidation.readyToImplement}\`
- Pending groups: \`${decisionValidation.totals.pendingGroups}\`
- Invalid groups: \`${decisionValidation.totals.invalidGroups}\`
- Ready groups: \`${decisionValidation.totals.readyGroups}\`
- Matrix group sum: \`${decisionValidation.totals.matrixGroupSum}\`` : '- Decision validation could not be parsed.'}

## Render Evidence

${renderEvidence ? `- OK: \`${status.gates.renderEvidence.ok}\`
- Pages: \`${renderEvidence.pages.length}\`
- Errors: \`${renderEvidence.totals.errors}\`
- Console errors: \`${renderEvidence.totals.consoleErrors}\`
- Horizontal overflow pages: \`${renderEvidence.totals.overflowPages}\`` : render ? '- Render evidence could not be parsed.' : '- Skipped. Run with `--render` to capture screenshots and rendered metrics.'}

## Remember Handoff

${handoffValidation ? `- OK: \`${handoffValidation.ok}\`
- Issue count: \`${handoffValidation.issueCount}\`
- Packet: \`${handoffValidation.packetPath}\`
- Source artifacts: \`${handoffValidation.summary.sourceArtifactCount ?? 'unknown'}\`
- MCP tools recorded: \`${handoffValidation.summary.mcpToolsRecorded ?? 0}\`
- Subagents recorded: \`${handoffValidation.summary.subagentsRecorded ?? 0}\`` : '- Handoff validation could not be parsed.'}

## Objective Audit

${objectiveAudit ? `- OK: \`${objectiveAudit.ok}\`
- Complete: \`${objectiveAudit.complete}\`
- Objective status: \`${objectiveAudit.objectiveStatus}\`
- Next required stage: \`${objectiveAudit.nextRequiredStage}\`
- Requirements: \`${objectiveAudit.totals.fulfilledRequirements ?? 'unknown'} / ${objectiveAudit.totals.requirements ?? 'unknown'}\`` : '- Objective audit could not be parsed.'}

## Commands

${Object.values(commands).map((command) => `- \`${command.command}\`: ${summarizeCommand(command)}`).join('\n')}

## Artifacts

- \`orchestration-status.json\`
- \`scenario-routing-resolution.json\`
- \`SCENARIO-ROUTING-RESOLUTION.md\`
- \`orchestration-route.log\`
- \`scenario-coverage.json\`
- \`SCENARIO-COVERAGE.md\`
- \`orchestration-scenario-coverage.log\`
- \`scenario-playbook.json\`
- \`SCENARIO-PLAYBOOK.md\`
- \`orchestration-scenario-playbook.log\`
- \`deconflict-validation.json\`
- \`DECONFLICT-CHECK.md\`
- \`orchestration-deconflict.log\`
- \`orchestration-mock-gate.stdout.json\`
- \`orchestration-mock-gate.stderr.log\`
- \`orchestration-decision-plan.log\`
${full ? '- `orchestration-typecheck.log`\n- `orchestration-i18n.log`\n- `orchestration-build.log`' : ''}
- \`MOCK-GATE-DECISION-PACKET.md\`
- \`mock-gate-decision-workflow.json\`
- \`mock-gate-product-decision-matrix.json\`
- \`mock-gate-decision-validation.json\`
- \`MOCK-GATE-IMPLEMENTATION-PLAN.md\`
- \`aesthetic-review-validation.json\`
- \`AESTHETIC-REVIEW-STATUS.md\`
- \`orchestration-review-packet.log\`
- \`aesthetic-proposal-validation.json\`
- \`AESTHETIC-PROPOSAL.md\`
- \`orchestration-proposal.log\`
${render ? '- `render-evidence-summary.json`\n- `RENDER-EVIDENCE.md`\n- `orchestration-render-evidence.log`' : ''}
- \`uiux-handoff.json\`
- \`uiux-handoff-validation.json\`
- \`UIUX-HANDOFF.md\`
- \`orchestration-handoff.log\`
- \`objective-completion-audit.json\`
- \`OBJECTIVE-COMPLETION-AUDIT.md\`
- \`orchestration-objective-audit.log\`

## Next Action

${status.readiness.nextRequiredStage === 'product-ops-decision'
  ? 'Use the decision packet to resolve the 43 real mock/content/display violations. Do not remove mock markers or mark content verified without product/ops evidence.'
  : status.readiness.nextRequiredStage === 'intake'
    ? 'Fix scenario routing or choose an explicit scenario, then rerun this status CLI.'
  : status.readiness.nextRequiredStage === 'rendered-visual-regression'
    ? 'Run rendered desktop/mobile visual regression and manual accessibility checks for the high-value flows.'
    : status.readiness.nextRequiredStage === 'remember-handoff'
      ? 'Fix the remember/handoff packet integrity issue, then rerun this status CLI.'
    : 'Fix the failing engineering verification command, then rerun this status CLI.'}
`;

writeText('ORCHESTRATION-STATUS.md', md);

console.log(JSON.stringify(status, null, 2));

if (blockingGates.length > 0) {
  process.exit(1);
}
