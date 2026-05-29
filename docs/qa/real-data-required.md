# Real Data Required Before Launch

Status: active QA checklist
Scope: `D:\projects\tourism-landing`
Last updated: 2026-05-29

This file tracks materials that must come from the site owner or verified external sources. Do not invent these with AI copy, mock data, or design placeholders.

## Reviews And Trust

- [ ] Real traveler reviews: original text, reviewer display preference, trip month, trip type, source link or source capture, and permission to publish.
- [ ] Review widgets: real Tripadvisor / Google Reviews / Trustindex account, widget setup, current rating/count verification, and permission to embed.
- [ ] Traveler photos: original files, location context, photographer/traveler consent, and web usage permission.
- [ ] Awards or media mentions: public source URL, award year/category, logo/name usage permission. If unavailable, keep awards empty.
- [ ] Trust proof data in `lib/data/trust-proofs.ts`: replace only with verified reviews, advisors, cases, credentials, or keep hidden.

## Advisor And Team

- [ ] Real advisor names or approved pseudonyms.
- [ ] Advisor role, service languages, region expertise, and availability boundary.
- [ ] Advisor portraits or team photos with written web usage permission.
- [ ] Advisor short bio and real case snippet, reviewed for privacy.
- [ ] Direct contact boundary: whether personal WhatsApp / WeChat / phone can be published, or whether all contact stays through `/plan`.

## Company, Legal, And Payment

- [ ] Legal company name, registered address, and public business identity allowed for footer/legal pages.
- [ ] Privacy policy, terms of service, cancellation terms, payment terms, and data retention statement reviewed by counsel.
- [ ] Payment processor and receiving entity: Stripe / bank transfer / other, currencies, invoice flow, refund flow.
- [ ] ICP filing number if the China-hosted domain requires one.
- [ ] Any required tourism license, partner credentials, insurance proof, or local operator disclosure.

## Contact And Ops

- [ ] Verified public support email.
- [ ] Verified WhatsApp number if published.
- [ ] Verified WeChat ID / QR code if published.
- [ ] Phone number and response hours if published.
- [ ] Feishu or internal webhook endpoint for real lead routing.
- [ ] Turnstile site key and secret for production anti-spam.
- [ ] Production site URL for metadata, sitemap, robots and webhook links.
- [ ] Production database migration applied for the `leads` table and RLS policies.
- [ ] Controlled test lead submitted only after owner confirms the production destination is ready to receive test data.

## Content And Product Facts

- [ ] Destination copy in `lib/data/destinations.ts` reviewed by a real China travel specialist.
- [ ] Itinerary data in `lib/data/itineraries.ts` either verified and made public, or kept hidden.
- [ ] Pricing examples reviewed against actual supplier costs and quoting policy.
- [ ] Visa-free policy last-reviewed date and coverage reviewed before launch.
- [ ] Image attribution for all photos in `public/landmarks/_attribution.json`.

## Current Public Page Notes

- `/reviews` intentionally publishes no real review count, rating, quote, award logo, or widget until the items above are supplied.
- `/about` uses service-boundary language, not unverifiable founder anecdotes or exact margin/deposit promises.
- `components/about/AdvisorCard.tsx` and `components/reviews/SampleReviewCard.tsx` are dormant/internal templates; do not import them into public pages until real advisor profiles and real review permissions are supplied.
- `/destinations` and `/destinations/[slug]` are localized; destination route-starter copy still needs specialist review before launch.
- `/itineraries` list page is localized; `/itineraries/[slug]` remains closed because all itinerary records are hidden and still need product, price, inclusion, support-scope, and supplier-claim review before publication.

## Current Functional Launch Blockers

`pnpm exec tsx scripts/prelaunch-env-check.ts --json` currently reports these owner-supplied production gaps:

- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- [ ] `TURNSTILE_SECRET_KEY`
- [ ] `SITE_URL` or `NEXT_PUBLIC_SITE_URL` or production `VERCEL_URL`

Where to obtain them:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Dashboard -> Turnstile -> Add site / Create widget. This is the public browser-side site key for the production domain.
- `TURNSTILE_SECRET_KEY`: Cloudflare Dashboard -> the same Turnstile widget -> secret key. This is server-only; put it in `.env.local` and Vercel Production env, never in client code or chat.
- `SITE_URL` / `NEXT_PUBLIC_SITE_URL`: the final canonical production URL after the domain is attached to the Vercel project, for example `https://example.com`. Prefer `SITE_URL` for server metadata/webhook links; add `NEXT_PUBLIC_SITE_URL` only if browser-side code needs it.

Optional but recommended before public launch:

- [ ] `NEXT_PUBLIC_WHATSAPP_PHONE`, if direct WhatsApp entry should be public.
- [ ] `FEISHU_WEBHOOK_URL`, if lead notifications should go to Feishu instead of database-only storage.
