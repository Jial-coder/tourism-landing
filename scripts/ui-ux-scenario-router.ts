#!/usr/bin/env tsx
/**
 * Resolve the smallest UI/UX orchestration route for a given scenario or artifact.
 *
 * This is the machine-readable "intake" gate. It reads the routing table and
 * execution plan from the ui-ux-aesthetic-review skill references, then writes a
 * scenario resolution artifact that later stages can consume.
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
  frameworkFamilyRules: {
    reactNext: string[];
    vueViteNuxt: string[];
    reactNativeExpo: string[];
    rule: string;
  };
};

type ExecutionPlan = {
  generatedAt: string;
  source: string;
  stages: Array<{
    id: string;
    label: string;
    owner: string;
    ownerLabel: string;
    optional: boolean;
    requiresVerification: boolean;
    tools: string[];
    outputs: string[];
    next: Array<{ id: string; optional: boolean }>;
  }>;
};

const ROOT = process.cwd();
const DEFAULT_OUT_DIR = path.join(ROOT, 'qa', 'ui-ux-review', 'codex-2026-05-24');
const ROUTING_PATH = path.join(
  'C:\\Users\\Administrator\\.codex\\skills\\ui-ux-aesthetic-review\\references\\scenario-routing.json',
);
const EXECUTION_PLAN_PATH = path.join(
  'C:\\Users\\Administrator\\.codex\\skills\\ui-ux-aesthetic-review\\references\\generated\\execution-plan.json',
);

const outDirArg = process.argv.find((arg) => arg.startsWith('--out-dir='));
const scenarioArg = process.argv.find((arg) => arg.startsWith('--scenario='));
const inputArg = process.argv.find((arg) => arg.startsWith('--input='));
const artifactArg = process.argv.find((arg) => arg.startsWith('--artifact='));
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;
const explicitScenario = scenarioArg ? scenarioArg.slice('--scenario='.length).trim() : '';
const inputText = [
  inputArg ? inputArg.slice('--input='.length) : '',
  artifactArg ? artifactArg.slice('--artifact='.length) : '',
  explicitScenario,
].filter(Boolean).join(' ');

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(file, 'utf-8')) as T;
}

function writeText(file: string, content: string): string {
  const target = path.join(outDir, file);
  writeFileSync(target, content, 'utf-8');
  return target;
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function scoreRoute(route: ScenarioRoute, text: string): number {
  const haystack = normalize(text);
  let score = 0;
  if (haystack.includes(normalize(route.id))) score += 10;
  for (const token of route.when) {
    const normalizedToken = normalize(token);
    if (haystack.includes(normalizedToken)) {
      score += 2 + normalizedToken.split(' ').length;
    }
  }
  return score;
}

function selectRoute(routing: ScenarioRouting): { route: ScenarioRoute; matchedBy: string } {
  if (explicitScenario) {
    const route = routing.routes.find((candidate) => candidate.id === explicitScenario);
    if (!route) {
      throw new Error(`unknown scenario id: ${explicitScenario}`);
    }
    return { route, matchedBy: 'explicit-scenario' };
  }

  if (!inputText) {
    const defaultRoute = routing.routes.find((candidate) => candidate.id === 'website-landing');
    if (!defaultRoute) {
      throw new Error('default route website-landing is missing from scenario routing');
    }
    return { route: defaultRoute, matchedBy: 'default' };
  }

  let bestRoute: ScenarioRoute | null = null;
  let bestScore = 0;
  for (const route of routing.routes) {
    const score = scoreRoute(route, inputText);
    if (score > bestScore) {
      bestScore = score;
      bestRoute = route;
    }
  }

  if (!bestRoute || bestScore === 0) {
    throw new Error(`unable to classify scenario from input: ${inputText}`);
  }

  return { route: bestRoute, matchedBy: 'keyword-signal' };
}

function readPackageJson(): { name: string; dependencies?: Record<string, string>; devDependencies?: Record<string, string> } {
  return JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf-8')) as {
    name: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
}

function inferFrameworkFamily(
  route: ScenarioRoute,
  pkg: { dependencies?: Record<string, string>; devDependencies?: Record<string, string> },
  routing: ScenarioRouting,
): 'reactNext' | 'vueViteNuxt' | 'reactNativeExpo' | 'unknown' {
  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
  if (deps.next && deps.react) return 'reactNext';
  if (deps.expo || deps['react-native']) return 'reactNativeExpo';
  if (deps.vue || deps.nuxt) return 'vueViteNuxt';

  if (route.primaryCapabilities.some((cap) => routing.frameworkFamilyRules.reactNext.includes(cap))) {
    return 'reactNext';
  }
  if (route.primaryCapabilities.some((cap) => routing.frameworkFamilyRules.vueViteNuxt.includes(cap))) {
    return 'vueViteNuxt';
  }
  if (route.primaryCapabilities.some((cap) => routing.frameworkFamilyRules.reactNativeExpo.includes(cap))) {
    return 'reactNativeExpo';
  }

  if (route.id === 'website-landing' || route.id === 'webapp-dashboard') {
    return 'reactNext';
  }
  if (route.id === 'mobile-mini-h5') {
    return deps.expo || deps['react-native'] ? 'reactNativeExpo' : 'unknown';
  }
  return 'unknown';
}

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const routing = readJson<ScenarioRouting>(ROUTING_PATH);
const executionPlan = readJson<ExecutionPlan>(EXECUTION_PLAN_PATH);
const pkg = readPackageJson();
const selected = selectRoute(routing);
const route = selected.route;
const planStageIds = new Set(executionPlan.stages.map((stage) => stage.id));
const routeIssues: string[] = [];

for (const stage of route.minimumStages) {
  if (!planStageIds.has(stage)) routeIssues.push(`minimum stage missing from execution plan: ${stage}`);
}
for (const stage of route.implementationStages ?? []) {
  if (!planStageIds.has(stage)) routeIssues.push(`implementation stage missing from execution plan: ${stage}`);
}

const frameworkFamily = inferFrameworkFamily(route, pkg, routing);

const resolution = {
  run: 'run-16-scenario-routing-resolution',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  packageName: pkg.name,
  routingPath: path.relative(ROOT, ROUTING_PATH).replace(/\\/g, '/'),
  executionPlanPath: path.relative(ROOT, EXECUTION_PLAN_PATH).replace(/\\/g, '/'),
  matchedBy: selected.matchedBy,
  inputText: inputText || null,
  scenario: route.id,
  route,
  frameworkFamily,
  stagePlan: {
    minimumStages: route.minimumStages,
    implementationStages: route.implementationStages ?? [],
    executionPlanStages: executionPlan.stages.map((stage) => stage.id),
  },
  routeIssues,
  ok: routeIssues.length === 0,
};

writeText('scenario-routing-resolution.json', `${JSON.stringify(resolution, null, 2)}\n`);

const md = `# Scenario Routing Resolution

Date: 2026-05-24
Run: \`run-16-scenario-routing-resolution\`
Project: \`${ROOT}\`

## Status

- OK: \`${resolution.ok}\`
- Matched by: \`${resolution.matchedBy}\`
- Scenario: \`${resolution.scenario}\`
- Framework family: \`${resolution.frameworkFamily}\`

## Route

- Minimum stages: ${route.minimumStages.map((stage) => `\`${stage}\``).join(', ')}
- Implementation stages: ${(route.implementationStages ?? []).map((stage) => `\`${stage}\``).join(', ') || 'none'}
- First evidence: ${route.firstEvidence.map((item) => `\`${item}\``).join(', ')}
- Primary capabilities: ${route.primaryCapabilities.map((item) => `\`${item}\``).join(', ')}
- Optional capabilities: ${(route.optionalCapabilities ?? []).map((item) => `\`${item}\``).join(', ') || 'none'}
- Skip by default: ${(route.skipByDefault ?? []).map((item) => `\`${item}\``).join(', ') || 'none'}
- Outputs: ${route.outputs.map((item) => `\`${item}\``).join(', ')}

## Issues

${routeIssues.length ? routeIssues.map((issue) => `- ${issue}`).join('\n') : 'No routing issues found.'}
`;

writeText('SCENARIO-ROUTING-RESOLUTION.md', md);

console.log(JSON.stringify(resolution, null, 2));

if (routeIssues.length > 0) {
  process.exit(1);
}
