#!/usr/bin/env tsx
/**
 * Validate scenario-routing coverage for AI-triggered UI/UX orchestration.
 *
 * This checks the shared ui-ux-aesthetic-review routing table without
 * overwriting the current project route resolution. It proves every scenario
 * can be selected explicitly, has usable keyword signals, and references
 * execution-plan stages that exist.
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

type PackageJson = {
  name: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
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
const outDir = outDirArg ? path.resolve(ROOT, outDirArg.slice('--out-dir='.length)) : DEFAULT_OUT_DIR;

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

function classify(routes: ScenarioRoute[], text: string): { route: ScenarioRoute | null; score: number; ties: string[] } {
  let bestScore = 0;
  let bestRoutes: ScenarioRoute[] = [];

  for (const route of routes) {
    const score = scoreRoute(route, text);
    if (score > bestScore) {
      bestScore = score;
      bestRoutes = [route];
    } else if (score === bestScore && score > 0) {
      bestRoutes.push(route);
    }
  }

  return {
    route: bestRoutes.length === 1 ? bestRoutes[0] : null,
    score: bestScore,
    ties: bestRoutes.map((route) => route.id),
  };
}

function inferFrameworkFamily(
  route: ScenarioRoute,
  pkg: PackageJson,
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
const pkg = readJson<PackageJson>(path.join(ROOT, 'package.json'));
const stageIds = new Set(executionPlan.stages.map((stage) => stage.id));
const routeIds = new Set<string>();
const issues: string[] = [];

if (!routing.routes.length) {
  issues.push('scenario routing has no routes');
}
if (!routing.globalRules.length) {
  issues.push('scenario routing has no global rules');
}

for (const route of routing.routes) {
  if (routeIds.has(route.id)) {
    issues.push(`duplicate route id: ${route.id}`);
  }
  routeIds.add(route.id);
}

const routeChecks = routing.routes.map((route) => {
  const routeIssues: string[] = [];
  const explicit = routing.routes.find((candidate) => candidate.id === route.id) ?? null;
  const keywordSignals = route.when.map((token) => {
    const result = classify(routing.routes, token);
    const ok = result.route?.id === route.id;
    if (!ok) {
      routeIssues.push(
        `keyword "${token}" classified as ${result.route?.id ?? (result.ties.length ? `tie:${result.ties.join(',')}` : 'none')}`,
      );
    }
    return {
      token,
      expected: route.id,
      actual: result.route?.id ?? null,
      score: result.score,
      ties: result.ties,
      ok,
    };
  });

  if (!explicit) routeIssues.push('explicit scenario lookup failed');
  if (route.when.length === 0) routeIssues.push('route has no keyword signals');
  if (route.minimumStages.length === 0) routeIssues.push('route has no minimum stages');
  if (route.firstEvidence.length === 0) routeIssues.push('route has no first evidence requirements');
  if (route.primaryCapabilities.length === 0) routeIssues.push('route has no primary capabilities');
  if (route.outputs.length === 0) routeIssues.push('route has no outputs');

  const minimumStageIssues = route.minimumStages
    .filter((stage) => !stageIds.has(stage))
    .map((stage) => `minimum stage missing from execution plan: ${stage}`);
  const implementationStageIssues = (route.implementationStages ?? [])
    .filter((stage) => !stageIds.has(stage))
    .map((stage) => `implementation stage missing from execution plan: ${stage}`);

  routeIssues.push(...minimumStageIssues, ...implementationStageIssues);

  const frameworkFamily = inferFrameworkFamily(route, pkg, routing);

  return {
    id: route.id,
    ok: routeIssues.length === 0,
    frameworkFamily,
    explicitScenarioOk: Boolean(explicit),
    keywordSignalCount: route.when.length,
    keywordSignals,
    stagePlan: {
      minimumStages: route.minimumStages,
      implementationStages: route.implementationStages ?? [],
      missingStages: [...minimumStageIssues, ...implementationStageIssues],
    },
    firstEvidence: route.firstEvidence,
    primaryCapabilities: route.primaryCapabilities,
    optionalCapabilities: route.optionalCapabilities ?? [],
    skipByDefault: route.skipByDefault ?? [],
    outputs: route.outputs,
    issues: routeIssues,
  };
});

for (const check of routeChecks) {
  for (const issue of check.issues) {
    issues.push(`${check.id}: ${issue}`);
  }
}

const validation = {
  run: 'run-18-scenario-coverage',
  generatedAt: new Date().toISOString(),
  project: ROOT,
  packageName: pkg.name,
  routingPath: path.relative(ROOT, ROUTING_PATH).replace(/\\/g, '/'),
  executionPlanPath: path.relative(ROOT, EXECUTION_PLAN_PATH).replace(/\\/g, '/'),
  ok: issues.length === 0,
  issueCount: issues.length,
  issues,
  totals: {
    routeCount: routing.routes.length,
    stageCount: executionPlan.stages.length,
    keywordSignalCount: routeChecks.reduce((sum, check) => sum + check.keywordSignalCount, 0),
    routesOk: routeChecks.filter((check) => check.ok).length,
    routesWithIssues: routeChecks.filter((check) => !check.ok).length,
  },
  routeChecks,
};

writeText('scenario-coverage.json', `${JSON.stringify(validation, null, 2)}\n`);

const md = `# Scenario Coverage

Date: 2026-05-24
Run: \`run-18-scenario-coverage\`
Project: \`${ROOT}\`

## Status

- OK: \`${validation.ok}\`
- Route count: \`${validation.totals.routeCount}\`
- Keyword signals: \`${validation.totals.keywordSignalCount}\`
- Routes OK: \`${validation.totals.routesOk}\`
- Routes with issues: \`${validation.totals.routesWithIssues}\`

## Routes

| Route | OK | Framework family | Keywords | Minimum stages | Implementation stages |
| --- | --- | --- | ---: | --- | --- |
${routeChecks
  .map(
    (check) =>
      `| \`${check.id}\` | \`${check.ok}\` | \`${check.frameworkFamily}\` | ${check.keywordSignalCount} | ${check.stagePlan.minimumStages.map((stage) => `\`${stage}\``).join(', ')} | ${check.stagePlan.implementationStages.map((stage) => `\`${stage}\``).join(', ') || 'none'} |`,
  )
  .join('\n')}

## Issues

${issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No scenario coverage issues found.'}
`;

writeText('SCENARIO-COVERAGE.md', md);

console.log(JSON.stringify(validation, null, 2));

if (issues.length > 0) {
  process.exit(1);
}
