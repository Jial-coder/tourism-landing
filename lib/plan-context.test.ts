/**
 * Unit tests for lib/plan-context.ts — run via `pnpm tsx lib/plan-context.test.ts`.
 */
import { strict as assert } from 'node:assert';
import { buildPlanInitialContext } from './plan-context';

type Test = { name: string; fn: () => void };
const tests: Test[] = [];
const test = (name: string, fn: () => void) => tests.push({ name, fn });

test('visa-free context carries policy fields but still starts at step 1', () => {
  const context = buildPlanInitialContext({
    type: 'visa-free',
    port: 'pek',
    stay: '240h',
  });

  assert.ok(context);
  assert.equal(context.startStep, 0);
  assert.ok(context.interestChips.includes('visa-free'));
  assert.ok(context.items.some((item) => item.id === 'type'));
  assert.ok(context.items.some((item) => item.id === 'port'));
  assert.ok(context.items.some((item) => item.id === 'stay'));
});

test('destination context starts at step 1 and preselects matching interests', () => {
  const context = buildPlanInitialContext({ destination: 'beijing' });

  assert.ok(context);
  assert.equal(context.startStep, 0);
  assert.ok(context.items.some((item) => item.id === 'destination'));
  assert.ok(context.interestChips.includes('history'));
});

let failed = 0;
for (const t of tests) {
  try {
    t.fn();
    console.log(`  ok  ${t.name}`);
  } catch (err) {
    failed += 1;
    console.error(`  FAIL ${t.name}`);
    console.error(err);
  }
}

if (failed > 0) {
  console.error(`\n${failed} of ${tests.length} tests failed`);
  process.exit(1);
}
console.log(`\n${tests.length} tests passed`);
