import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

type Category =
  | 'content-first backlog'
  | 'locale-aware bilingual line'
  | 'bilingual/decorative/data'
  | 'review-only protected route'
  | 'dormant/internal component'
  | 'unclassified public Chinese';

interface Hit {
  file: string;
  line: number;
  text: string;
  category: Category;
}

const ROOT = process.cwd();
const SCAN_ROOTS = ['app', 'components'];
const EXTENSIONS = new Set(['.ts', '.tsx']);
const HAN_RE = /\p{Script=Han}/u;
const failUnclassified = process.argv.includes('--fail-unclassified');

const CONTENT_FIRST_FILES = new Set<string>();

const CONTENT_FIRST_PREFIXES: string[] = [];

const DORMANT_INTERNAL_FILES = new Set([
  'components/sections/AdvisorCard.tsx',
  'components/sections/ConciergeBand.tsx',
  'components/sections/ConciergeNote.tsx',
  'components/sections/DestinationTilesSection.tsx',
  'components/sections/DiagnosticSection.tsx',
  'components/sections/DualCTA.tsx',
  'components/sections/Hero.tsx',
  'components/floating/InteractiveDock.tsx',
  'components/about/AdvisorCard.tsx',
  'components/itineraries/AdvisorPullCta.tsx',
  'components/itineraries/DayByDayAccordion.tsx',
  'components/itineraries/ItineraryGlance.tsx',
  'components/itineraries/PricingMatrix.tsx',
  'components/itineraries/TailorMakeTip.tsx',
  'components/itineraries/TripNotesGrid.tsx',
  'components/reviews/SampleReviewCard.tsx',
  'components/sections/TrustFootnote.tsx',
  'components/sections/VisaSection.tsx',
]);

const LOCALIZED_DATA_FILES = new Set([
  'app/destinations/[slug]/page.tsx',
  'components/destinations/BestTimeStrip.tsx',
  'components/destinations/DestinationDetailPageContent.tsx',
  'components/destinations/DestinationListInteractive.tsx',
  'components/destinations/DestinationsListPageContent.tsx',
  'components/destinations/DurationCards.tsx',
  'components/destinations/NearbyGrid.tsx',
  'components/destinations/TailorMakePullCta.tsx',
  'components/destinations/WowPointsList.tsx',
  'components/i18n/LocaleSwitch.tsx',
  'components/sections/SampleItineraries.tsx',
  'components/sections/Specialists.tsx',
  'components/sections/NewsletterForm.tsx',
  'components/trust/CredentialStrip.tsx',
  'components/trust/TrustProofGrid.tsx',
  'components/visa-free/DecisionTool.tsx',
  'components/wizard/PlanWizard.tsx',
]);

const DECORATIVE_OR_BILINGUAL_FILES = new Set([
  'components/atoms/ChinaMapOverlay.tsx',
  'components/atoms/DestinationCarousel.tsx',
  'components/brand/ChineseSeal.tsx',
]);

const SKIP_PREFIXES = [
  'app/client/',
  'app/_generated/',
];

const toPosix = (value: string) => value.replace(/\\/g, '/');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = toPosix(path.relative(ROOT, full));
    if (entry.isDirectory()) {
      if (
        entry.name === 'node_modules' ||
        entry.name === '.next' ||
        entry.name === '.git' ||
        SKIP_PREFIXES.some((prefix) => `${rel}/`.startsWith(prefix))
      ) {
        continue;
      }
      out.push(...walk(full));
      continue;
    }
    if (EXTENSIONS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function isCommentOnly(line: string) {
  const trimmed = line.trim();
  return (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('*/') ||
    trimmed.startsWith('{/*') ||
    trimmed.endsWith('*/}')
  );
}

function classify(file: string, line: string): Category | null {
  if (!HAN_RE.test(line) || isCommentOnly(line)) return null;

  if (CONTENT_FIRST_FILES.has(file) || CONTENT_FIRST_PREFIXES.some((prefix) => file.startsWith(prefix))) {
    return 'content-first backlog';
  }

  if (file.startsWith('app/hero-pick/')) {
    return 'review-only protected route';
  }

  if (DORMANT_INTERNAL_FILES.has(file)) {
    return 'dormant/internal component';
  }

  if (LOCALIZED_DATA_FILES.has(file)) {
    return 'locale-aware bilingual line';
  }

  if (DECORATIVE_OR_BILINGUAL_FILES.has(file)) {
    return 'bilingual/decorative/data';
  }

  if (
    /\b(?:locale|lang)\s*={1,3}\s*['"]zh['"]/.test(line) ||
    /\bzh\s*:/.test(line) ||
    /\bcn\s*:/.test(line) ||
    /\.[cm]?n\b/.test(line) ||
    /ChineseSeal\s+text=/.test(line) ||
    /LANGUAGE · 语言/.test(line)
  ) {
    return 'locale-aware bilingual line';
  }

  if (
    /text=["'].*\p{Script=Han}/u.test(line) ||
    /alt=["'].*\p{Script=Han}/u.test(line) ||
    /ariaLabel=["'].*\p{Script=Han}/u.test(line)
  ) {
    return 'bilingual/decorative/data';
  }

  return 'unclassified public Chinese';
}

const hits: Hit[] = [];

for (const root of SCAN_ROOTS) {
  const absoluteRoot = path.join(ROOT, root);
  if (!existsSync(absoluteRoot)) continue;
  for (const filePath of walk(absoluteRoot)) {
    const rel = toPosix(path.relative(ROOT, filePath));
    if (SKIP_PREFIXES.some((prefix) => rel.startsWith(prefix))) continue;
    const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      const category = classify(rel, line);
      if (!category) return;
      hits.push({
        file: rel,
        line: index + 1,
        text: line.trim(),
        category,
      });
    });
  }
}

const byCategory = new Map<Category, Hit[]>();
for (const hit of hits) {
  const categoryHits = byCategory.get(hit.category) ?? [];
  categoryHits.push(hit);
  byCategory.set(hit.category, categoryHits);
}

console.log('Hardcoded Chinese public-code report');
for (const category of [...byCategory.keys()].sort()) {
  const categoryHits = byCategory.get(category) ?? [];
  const files = new Set(categoryHits.map((hit) => hit.file));
  console.log(`- ${category}: ${categoryHits.length} line(s), ${files.size} file(s)`);
}

const unclassified = byCategory.get('unclassified public Chinese') ?? [];
if (unclassified.length > 0) {
  console.log('\nUnclassified samples:');
  for (const hit of unclassified.slice(0, 30)) {
    console.log(`${hit.file}:${hit.line}: ${hit.text}`);
  }
}

if (failUnclassified && unclassified.length > 0) {
  console.error(`\nFound ${unclassified.length} unclassified public Chinese line(s).`);
  process.exit(1);
}
