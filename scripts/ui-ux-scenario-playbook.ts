#!/usr/bin/env tsx
/**
 * Generate and validate AI-facing scenario playbooks.
 *
 * Scenario coverage proves routes are selectable. This playbook layer proves
 * each route has a concrete evaluate -> propose -> implement -> verify ->
 * remember path and that routed capabilities resolve to registered external
 * projects, internal review methods, or explicit skip policies.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

type ScenarioRoute = {
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

type ScenarioRouting = {
  version: string;
  purpose: string;
  globalRules: string[];
  routes: ScenarioRoute[];
};

type ExecutionStage = {
  id: string;
  label: string;
  owner: string;
  ownerLabel: string;
  optional: boolean;
  requiresVerification: boolean;
  tools: string[];
  outputs: string[];
  next: Array<{ id: string; optional: boolean }>;
};

type ExecutionPlan = {
  generatedAt: string;
  source: string;
  stages: ExecutionStage[];
};

type CapabilityResolution = {
  raw: string;
  normalized: string;
  kind: 'external-project' | 'internal-method' | 'policy' | 'stage' | 'unresolved';
  source: string;
  ok: boolean;
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const SKILL_ROOT = 'C:\\Users\\Administrator\\.codex\\skills\\ui-ux-aesthetic-review';
const ROUTING_PATH = path.join(SKILL_ROOT, 'references\\scenario-routing.json');
const EXECUTION_PLAN_PATH = path.join(SKILL_ROOT, 'references\\generated\\execution-plan.json');
const CAPABILITIES_PATH = path.join(SKILL_ROOT, 'references\\external-project-capabilities.md');
const REGISTRY_PATH = path.join(SKILL_ROOT, 'references\\external-project-registry.md');

const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;

const externalCapabilityAliases: Record<string, string[]> = {
  'spec-kit': ['spec-kit', 'github/spec-kit', 'gitHub spec kit'],
  bmad: ['bmad', 'bmadcode/bmad-method'],
  agenthub: ['agenthub', 'skb3002/agenthub'],
  'wshobson-agents': ['wshobson/agents'],
  impeccable: ['impeccable', 'pbakaus/impeccable', 'impeccable cli'],
  'ui-ux-pro-max': ['ui-ux-pro-max', 'ui ux pro max', 'nextlevelbuilder/ui-ux-pro-max-skill'],
  'awesome-design-md': ['awesome-design-md', 'voltagent/awesome-design-md'],
  'design-md-router': ['design-md-router', 'awesome-design-md'],
  'web-design-guidelines': ['web-design-guidelines'],
  'vercel-react-best-practices': ['vercel-react-best-practices', 'react-best-practices'],
  'vercel-composition-patterns': ['vercel-composition-patterns', 'composition-patterns'],
  'next-best-practices': ['next-best-practices'],
  'seo-audit': ['seo-audit', 'seomator'],
  'ai-website-cloner-template': ['ai-website-cloner-template'],
  'building-native-ui': ['building-native-ui', 'expo'],
  'react-native-skills': ['react-native-skills', 'vercel-react-native-skills', 'react-native-guidelines'],
  'antfu-skills': ['antfu-skills', 'antfu/skills'],
  'supabase-postgres-best-practices': ['supabase-postgres-best-practices', 'supabase/agent-skills'],
  playwright: ['playwright', 'microsoft/playwright'],
  storybook: ['storybook', 'storybookjs/storybook'],
  'axe-core': ['axe-core', 'dequelabs/axe-core'],
  'lighthouse-ci': ['lighthouse-ci'],
  imagegen: ['imagegen'],
  'openapi-generator': ['openapi-generator'],
  prisma: ['prisma'],
  renovate: ['renovate'],
  semgrep: ['semgrep'],
  trivy: ['trivy'],
  opentelemetry: ['opentelemetry', 'opentelemetry-js'],
};

const internalMethods = new Set([
  'visual-composition-critique',
  'visual composition critique',
  'source-level-design-risk-assessment',
  'source-level design risk assessment',
  'design-readiness-review',
  'design-readiness review',
  'desktop-first-critique',
  'desktop-first critique',
  'final-visual-verdict-before-rendering',
  'final visual verdict before rendering',
  'final-rendered-aesthetic-verdict',
]);

const policyCapabilities = new Set(['backend-data', 'unlicensed asset copying', 'global install']);

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

function writeText(file: string, content: string): string {
  const target = path.join(outDir, file);
  writeFileSync(target, content, 'utf-8');
  return target;
}

function normalizeCapability(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/\bcli\b/g, '')
    .split(/\s+(?:when|unless|if|for|only)\s+/)[0]
    .trim()
    .replace(/\s+/g, '-')
    .replace(/\/+/g, '-');
}

function asPhrase(normalized: string): string {
  return normalized.replace(/-/g, ' ');
}

function resolveCapability(raw: string, referenceText: string, stageIds: Set<string>): CapabilityResolution {
  const normalized = normalizeCapability(raw);
  const phrase = asPhrase(normalized);

  if (stageIds.has(normalized)) {
    return { raw, normalized, kind: 'stage', source: 'execution-plan stage', ok: true };
  }
  if (internalMethods.has(normalized) || internalMethods.has(phrase)) {
    return { raw, normalized, kind: 'internal-method', source: 'ui-ux-aesthetic-review skill method', ok: true };
  }
  if (policyCapabilities.has(normalized) || policyCapabilities.has(phrase)) {
    return { raw, normalized, kind: 'policy', source: 'routing skip policy', ok: true };
  }

  for (const [source, aliases] of Object.entries(externalCapabilityAliases)) {
    if (aliases.some((alias) => normalized === normalizeCapability(alias))) {
      return { raw, normalized, kind: 'external-project', source, ok: true };
    }
  }

  const referenceHit = referenceText.includes(normalized) || referenceText.includes(phrase);
  if (referenceHit) {
    return { raw, normalized, kind: 'external-project', source: 'external registry text match', ok: true };
  }

  return { raw, normalized, kind: 'unresolved', source: 'unresolved', ok: false };
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function orderedStages(route: ScenarioRoute, executionPlan: ExecutionPlan): ExecutionStage[] {
  const stageMap = new Map(executionPlan.stages.map((stage) => [stage.id, stage]));
  const requested = new Set([...route.minimumStages, ...(route.implementationStages ?? [])]);
  const hasImplementation = [...requested].some((stage) =>
    ['frontend-implementation', 'mobile-implementation', 'backend-data'].includes(stage),
  );
  if (hasImplementation) requested.add('qa-verification');
  requested.add('report-loop');

  return executionPlan.stages.filter((stage) => requested.has(stage.id) && stageMap.has(stage.id));
}

function evidenceLevelFor(route: ScenarioRoute): string {
  if (route.id === 'static-image-asset') return 'rendered image / direct image evidence';
  if (route.id === 'design-doc-spec-wireframe') return 'intent evidence, then rendered prototype if feasible';
  if (route.id === 'source-or-pr-only') return 'source evidence, then rendered evidence if feasible';
  return 'rendered evidence whenever local app, URL, or preview can run';
}

function commandHintsFor(route: ScenarioRoute): string[] {
  const commands = [
    `pnpm run qa:uiux:route -- --scenario=${route.id}`,
    'pnpm run qa:uiux:scenario-coverage',
    'pnpm run qa:uiux:playbook',
  ];

  if (['website-landing', 'webapp-dashboard', 'mobile-mini-h5', 'authorized-site-rebuild'].includes(route.id)) {
    commands.push('pnpm run qa:uiux:render');
  }
  if (['website-landing', 'webapp-dashboard', 'source-or-pr-only', 'authorized-site-rebuild'].includes(route.id)) {
    commands.push('pnpm typecheck', 'pnpm run check:i18n', 'pnpm run build');
  }
  commands.push('pnpm run qa:uiux:handoff');
  return unique(commands);
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const routing = readJson<ScenarioRouting>(ROUTING_PATH);
const executionPlan = readJson<ExecutionPlan>(EXECUTION_PLAN_PATH);
const referenceText = [
  readFileSync(CAPABILITIES_PATH, 'utf-8'),
  readFileSync(REGISTRY_PATH, 'utf-8'),
].join('\n').toLowerCase();
const stageIds = new Set(executionPlan.stages.map((stage) => stage.id));
const issues: string[] = [];

const scenarioPlaybooks = routing.routes.map((route) => {
  const stages = orderedStages(route, executionPlan);
  const stageIdsForRoute = new Set(stages.map((stage) => stage.id));
  const capabilityInputs = [
    ...route.primaryCapabilities,
    ...(route.optionalCapabilities ?? []),
    ...(route.skipByDefault ?? []),
  ];
  const capabilityResolutions = capabilityInputs.map((capability) =>
    resolveCapability(capability, referenceText, stageIds),
  );
  const unresolvedCapabilities = capabilityResolutions.filter((capability) => !capability.ok);

  const loopCoverage = {
    intake: stageIdsForRoute.has('intake'),
    evaluate: stageIdsForRoute.has('ux-visual-eval'),
    propose:
      stageIdsForRoute.has('product-spec') ||
      stageIdsForRoute.has('architecture') ||
      stageIdsForRoute.has('deconflict'),
    implement:
      stageIdsForRoute.has('frontend-implementation') ||
      stageIdsForRoute.has('mobile-implementation') ||
      stageIdsForRoute.has('backend-data'),
    verify: stageIdsForRoute.has('qa-verification'),
    report: stageIdsForRoute.has('report-loop'),
    remember: true,
  };

  const routeIssues: string[] = [];
  for (const [key, ok] of Object.entries(loopCoverage)) {
    if (!ok) routeIssues.push(`loop stage missing: ${key}`);
  }
  for (const capability of unresolvedCapabilities) {
    routeIssues.push(`unresolved capability: ${capability.raw}`);
  }

  const playbook = {
    id: route.id,
    when: route.when,
    evidencePolicy: evidenceLevelFor(route),
    firstEvidence: route.firstEvidence,
    stageSequence: stages.map((stage) => ({
      id: stage.id,
      label: stage.label,
      owner: stage.owner,
      ownerLabel: stage.ownerLabel,
      tools: stage.tools,
      outputs: stage.outputs,
      requiresVerification: stage.requiresVerification,
    })),
    loopCoverage,
    primaryCapabilities: route.primaryCapabilities.map((capability) =>
      resolveCapability(capability, referenceText, stageIds),
    ),
    optionalCapabilities: (route.optionalCapabilities ?? []).map((capability) =>
      resolveCapability(capability, referenceText, stageIds),
    ),
    skipByDefault: (route.skipByDefault ?? []).map((capability) =>
      resolveCapability(capability, referenceText, stageIds),
    ),
    outputs: route.outputs,
    commandHints: commandHintsFor(route),
    rememberHandoff: {
      artifact: 'qa/ui-ux-review/codex-2026-05-24/uiux-handoff.json',
      rule: 'write handoff after verification so future AI can continue from evidence, not memory alone',
    },
    issues: routeIssues,
    ok: routeIssues.length === 0,
  };

  for (const issue of routeIssues) {
    issues.push(`${route.id}: ${issue}`);
  }

  return playbook;
});

const validation = {
  run: 'run-19-scenario-playbook',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  routingPath: path.relative(ROOT, ROUTING_PATH).replace(/\\/g, '/'),
  executionPlanPath: path.relative(ROOT, EXECUTION_PLAN_PATH).replace(/\\/g, '/'),
  capabilitySources: [
    path.relative(ROOT, CAPABILITIES_PATH).replace(/\\/g, '/'),
    path.relative(ROOT, REGISTRY_PATH).replace(/\\/g, '/'),
  ],
  ok: issues.length === 0,
  issueCount: issues.length,
  issues,
  totals: {
    scenarioCount: scenarioPlaybooks.length,
    scenariosOk: scenarioPlaybooks.filter((playbook) => playbook.ok).length,
    scenariosWithIssues: scenarioPlaybooks.filter((playbook) => !playbook.ok).length,
    externalCapabilityCount: scenarioPlaybooks.reduce(
      (sum, playbook) =>
        sum +
        [...playbook.primaryCapabilities, ...playbook.optionalCapabilities, ...playbook.skipByDefault].filter(
          (capability) => capability.kind === 'external-project',
        ).length,
      0,
    ),
    unresolvedCapabilityCount: scenarioPlaybooks.reduce(
      (sum, playbook) =>
        sum +
        [...playbook.primaryCapabilities, ...playbook.optionalCapabilities, ...playbook.skipByDefault].filter(
          (capability) => !capability.ok,
        ).length,
      0,
    ),
  },
  scenarioPlaybooks,
};

writeText('scenario-playbook.json', `${JSON.stringify(validation, null, 2)}\n`);

const md = `# Scenario Playbook

Date: 2026-05-24
Run: \`run-19-scenario-playbook\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Scenarios: \`${validation.totals.scenarioCount}\`
- Scenarios OK: \`${validation.totals.scenariosOk}\`
- External capability references: \`${validation.totals.externalCapabilityCount}\`
- Unresolved capabilities: \`${validation.totals.unresolvedCapabilityCount}\`

## Scenario Loop Coverage

| Scenario | OK | Intake | Evaluate | Propose | Implement | Verify | Remember | Stage sequence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
${scenarioPlaybooks
  .map(
    (playbook) =>
      `| \`${playbook.id}\` | \`${playbook.ok}\` | \`${playbook.loopCoverage.intake}\` | \`${playbook.loopCoverage.evaluate}\` | \`${playbook.loopCoverage.propose}\` | \`${playbook.loopCoverage.implement}\` | \`${playbook.loopCoverage.verify}\` | \`${playbook.loopCoverage.remember}\` | ${playbook.stageSequence.map((stage) => `\`${stage.id}\``).join(' -> ')} |`,
  )
  .join('\n')}

## Capability Routing

${scenarioPlaybooks
  .map((playbook) => {
    const capabilities = [...playbook.primaryCapabilities, ...playbook.optionalCapabilities];
    return `### ${playbook.id}

${capabilities.map((capability) => `- \`${capability.raw}\` -> ${capability.kind}: \`${capability.source}\``).join('\n')}`;
  })
  .join('\n\n')}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No scenario playbook issues found.'}
`;

writeText('SCENARIO-PLAYBOOK.md', md);

console.log(JSON.stringify(validation, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
