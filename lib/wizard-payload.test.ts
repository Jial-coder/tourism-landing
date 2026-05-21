/**
 * Unit tests for lib/wizard-payload.ts — run via `pnpm tsx lib/wizard-payload.test.ts`.
 *
 * No Jest dependency: spec §5.12.1 only requires schema correctness, not a
 * full test runner. We use node:assert/strict + a tiny local runner.
 */
import { strict as assert } from 'node:assert';
import {
  PAYLOAD_LIMITS,
  PAYLOAD_VERSION,
  PAYLOAD_BRAND,
  buildWizardPayload,
  buildWhatsAppDeepLink,
  groupTextFrom,
  interestsTextFrom,
  whenTextFrom,
} from './wizard-payload';

type Test = { name: string; fn: () => void };
const tests: Test[] = [];
const test = (name: string, fn: () => void) => tests.push({ name, fn });

test('payload starts with v1 | pandatravel and uses pipe separator', () => {
  const r = buildWizardPayload({
    whenText: 'Apr 2027 / ~12 days',
    groupText: 'family +2 kids 6&9',
    interestsText: 'nature, food, slow',
  });
  assert.equal(
    r.payload,
    `${PAYLOAD_VERSION} | ${PAYLOAD_BRAND} | Apr 2027 / ~12 days | family +2 kids 6&9 | nature, food, slow`,
  );
  assert.equal(r.truncated, false);
});

test('encoded payload survives URL-encode round-trip and stays under total cap', () => {
  const r = buildWizardPayload({
    whenText: 'Oct 2026 / ~8 days',
    groupText: 'couple ×2',
    interestsText: 'history, food, city, nightlife',
  });
  // wa.me text param is just the encoded payload — decoding must yield the original.
  assert.equal(decodeURIComponent(r.encoded), r.payload);
  assert.ok(r.payload.length <= PAYLOAD_LIMITS.total);
  // & must be encoded so it doesn't break URL structure
  assert.ok(!r.encoded.includes(' | '));
});

test('over-cap interests_text downgrades to fallback string', () => {
  // Each field individually fits its cap; the sum (60 + 60 + 80 + framing) > 220.
  const r = buildWizardPayload({
    whenText: 'A'.repeat(PAYLOAD_LIMITS.whenText),
    groupText: 'B'.repeat(PAYLOAD_LIMITS.groupText),
    interestsText: 'C'.repeat(PAYLOAD_LIMITS.interestsText),
  });
  assert.ok(r.payload.length <= PAYLOAD_LIMITS.total);
  assert.ok(r.truncated);
  assert.match(r.payload, /see web form for details$/);
});

test('buildWhatsAppDeepLink strips + / spaces from phone and embeds encoded payload', () => {
  const { href, result } = buildWhatsAppDeepLink('+86 138 0000 0000', {
    whenText: 'Apr 2027 / ~12 days',
    groupText: 'family +2 kids 6&9',
    interestsText: 'nature, food, slow',
  });
  assert.ok(href.startsWith('https://wa.me/8613800000000?text='));
  assert.ok(href.endsWith(result.encoded));
});

test('whenTextFrom / groupTextFrom / interestsTextFrom build expected strings', () => {
  assert.equal(
    whenTextFrom({
      tripWindow: 'approximate',
      tripMonth: 'Apr 2027',
      tripLength: '11-14 days',
    }),
    'Apr 2027 / ~11-14 days',
  );
  assert.equal(
    groupTextFrom({
      groupType: 'family',
      adultsCount: 2,
      childrenAgeTiers: ['6', '9'],
    }),
    'family +2 kids 6, 9',
  );
  assert.equal(
    interestsTextFrom({
      chips: ['nature', 'food', 'slow'],
      notes: '',
    }),
    'nature, food, slow',
  );
  assert.equal(
    interestsTextFrom({
      chips: ['nature'],
      notes: 'Want a slow honeymoon',
    }),
    'nature (+ note)',
  );
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
