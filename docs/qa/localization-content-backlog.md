# Localization Content Backlog

Status: active QA note
Scope: public pages in `app/` and public components in `components/`
Last updated: 2026-05-29

## Decision

Do not blindly translate unfinished narrative pages. The English experience should be fixed in two passes:

1. Functional UI must be bilingual immediately: navigation, footer, forms, CTAs, dialogs, SEO, `/plan`, `/visa-free`, newsletter, and soft-link dialogs.
2. Narrative/detail pages need content structure reviewed first, then rewritten/localized into English and Chinese.

This avoids shipping mechanically translated content that still has weak product structure, unclear claims, or unverified proof.

## Immediate Functional UI

These areas should not show Chinese when the active locale is English:

- `components/chrome/TopNav.tsx`
- `components/sections/Footer.tsx`
- `components/sections/PathCFooter.tsx`
- `components/chrome/SoftLinkDialog.tsx`
- `components/sections/NewsletterForm.tsx`
- `components/floating/ChatLauncher.tsx` if it is mounted later
- `/plan` wizard and lead form flow
- `/visa-free` public tool and contact cards
- metadata, robots, sitemap, and launch guards

Current pass:

- Non-home `Footer` manifesto, newsletter pitch, and legal short labels are dictionary-driven.
- `ChatLauncher` visible strings are dictionary-driven, even though the component is not mounted now.
- `/destinations` list page has been reorganized into locale-aware page, filter, and card copy.
- `/itineraries` list page has been reorganized into locale-aware page, empty-state, filter, and card copy.
- `/about` page has been reorganized into locale-aware page, promise, workflow, pricing, and CTA copy.
- `/reviews` page has been reorganized into locale-aware proof policy, current review status, real-data-needed, awards empty state, and CTA copy.
- `/themes/[slug]` has been reorganized into locale-aware metadata, theme body, bullets, and CTA copy.
- `/destinations/[slug]` pages have been reorganized into locale-aware route-starter pages with cautious planning language, localized support components, and no fixed-package or supplier-availability promises.
- `/itineraries/[slug]` stays hard-gated with `notFound()` while every source itinerary remains `status: hidden`; the route no longer renders the unreviewed detail template.
- Real owner-supplied material is tracked in `docs/qa/real-data-required.md`.
- `pnpm check:i18n` still checks dictionary parity only; it does not detect hardcoded Chinese in `.tsx`.
- `pnpm check:i18n:hardcoded` now reports hardcoded Chinese categories in public app/component code.

## Content-First Backlog

No active public page or imported public component remains in this backlog.

Dormant/internal templates still contain Chinese or placeholder copy, but they are not imported by active public routes and must not be enabled before their underlying data is verified:

- `components/about/AdvisorCard.tsx`
- `components/reviews/SampleReviewCard.tsx`
- `components/itineraries/*` dormant detail support components, excluding the localized list component

Before any dormant template is enabled, it needs:

- Product intent: what job the page does in the funnel.
- Claim audit: no fake reviews, fake awards, fake direct support, or unsupported legal/payment promises.
- Content hierarchy: headline, proof, next action, and supporting details.
- Data model check: avoid duplicating copy in page components if it belongs in dictionaries or structured data.
- Locale plan: English-first copy for inbound travelers, Chinese copy for internal/local context.

## Allowed Exceptions

The hardcoded Chinese report may classify these as acceptable:

- `zh` and `cn` fields in structured bilingual data.
- Locale-aware ternaries that only render Chinese for `locale === 'zh'` or `lang === 'zh'`.
- Localized destination detail support components that render from the active locale.
- Decorative `ChineseSeal` text or bilingual alt text where intentional.
- Protected review-only routes such as `/hero-pick`.
- Dormant internal components that are not imported by public routes.
- Dormant itinerary detail support components while every itinerary remains hidden.

## Completion Standard

Localization can be considered launch-ready when:

- `pnpm check:i18n` passes.
- `pnpm check:i18n:hardcoded -- --fail-unclassified` has no unclassified public Chinese.
- English locale pages do not show Chinese except intentional bilingual/decorative text.
- Content-first pages have been reviewed, rewritten, and then localized.
