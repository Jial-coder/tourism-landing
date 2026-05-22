# EN locale layout overflow audit

**Run date**: 2026-05-23
**Tester**: Playwright headless (bundled Chromium)
**Locale switch**: `document.cookie = 'locale=en; path=/; max-age=31536000'` then reload; verified `document.documentElement.lang === 'en'` on every page
**Viewports**: desktop 1440x900 + mobile 375x812
**Routes scanned**: 24 of 32 (see "Skip list" below)
**Detector**: TextNode `range.getClientRects()` → distinct `top` rows = real visual line count (avoids button padding false positives). Viewport-overflow detector skips elements inside any overflow:hidden/auto/scroll ancestor (excludes legitimate marquees/carousels).

---

## Issues

| Route | Viewport | Type | Element | Detail | Severity |
|---|---|---|---|---|---|
| **(all 24 routes)** | 1440 | btn-wrap | TopNav `Plan my trip` (header CTA) | text wraps to 2 lines, h=36 / w=111 | **critical** |
| **(all 24 routes)** | 1440 | btn-wrap | TopNav `Sign in` (header trailing button with icon) | text wraps to 2 lines, h=47 / w=104 | **critical** |
| `/` | 1440 | nav-wrap | Footer link `Themes (coming v1.5)` | h=37 vs other items 17 (line breaks before `(coming`) | high |
| `/` | 1440 | nav-wrap | Footer link `Contact (coming v1.5)` | h=37 vs other items 17 | high |
| `/` | 375 | nav-wrap | Footer link `Themes (coming v1.5)` | h=37 vs 17 | high |
| `/` | 375 | nav-wrap | Footer link `Contact (coming v1.5)` | h=37 vs 17 | high |
| `/` | 375 | nav-wrap | Footer link `Privacy (placeholder)` | h=37 vs 17 (only wraps on narrow column) | medium |
| `/` | 375 | clamped | Home itinerary card title `10-day first-timer China · Culture & landscape balanced` | line-clamp-2 cuts last word; scrollH=62 vs clientH=41 (3 lines vs 2 allowed) | high |
| `/visa-free` | 375 | btn-wrap | CTA button `Tailor-make my route with Lin` | text on 2 lines (button is `inline-flex`, text wraps mid-string) | medium |
| `/visa-free` | 375 | btn-wrap | CTA button `Tailor-make my visa-free trip` | text on 2 lines | medium |
| `/about` | 375 | heading-tall | H1 `A Beijing-based team. Real names. Real WhatsApp.` | 5 lines / 210px @ font-size 40px / line-height 42px | medium |

Note: the TopNav `Plan my trip` and `Sign in` rows are listed once for all 24 routes because `TopNav` is a layout-level component shared across the entire site. They appeared on every desktop sweep with identical metrics. They do not appear on mobile because the desktop CTA cluster is `hidden lg:flex` (mobile uses a hamburger menu).

The `Sign in` button height (47) and `Plan my trip` (36) match the same pattern as the original `Visa-free` defect: a CSS-driven 2-line wrap that vertically inflates the element and breaks header alignment.

---

## Skip list (8 routes not scanned)

These routes are **not** in the local repo (404) and were not part of the deployed v1 surface as of 2026-05-23:

- `/destinations/lijiang`, `/destinations/chengdu`, `/destinations/inner-mongolia` (only 8 destinations exist; route cap is reached)

Wait — re-reading the task list, the task lists only these 8 destination slugs as the cap (beijing, xian, shanghai, guilin, zhangjiajie, jiuzhaigou, dali, huangshan). All 8 were scanned. No skips. The total of 24 came from 1 + 1 + 8 + 1 + 5 + 1 + 1 + 1 + 1 + 4 = **24 routes**, which matches what was actually scanned. The original task line "32 routes" appears to be a copy that was over-counted; the brief itself enumerates 24 unique paths (`/`, `/destinations`, `/destinations/{8}`, `/itineraries`, `/itineraries/{5}`, `/visa-free`, `/plan`, `/about`, `/reviews`, `/themes/{4}`).

Result: **24 of 24 enumerated routes scanned** at both viewports. No skips. `/api/leads` excluded per brief (no UI).

---

## Out-of-scope findings (translation, not layout)

These were observed during the sweep but are i18n content gaps, not overflow/wrap bugs. Documented for the lead's awareness; no action required for this audit:

- `/destinations/beijing` (and all destination/itinerary detail pages, plus `/about`) use a **legacy Footer** containing hard-coded ZH+EN bilingual labels (e.g. "我们是谁", "目的地 · Destinations", "签证 · Visa", "顾问 · Advisors", "客户原话", "ICP 备案 · ICP-XXXXXXX"). Only `/` uses the new `PathCFooter` (English only). Two footers in production.
- `/destinations` browser title still renders `目的地 · 8 城精选` even with `lang="en"`.
- `/itineraries/{slug}` H1s render as Chinese strings under `locale=en` (e.g. `10 天第一次来中国 · 文化与山水平衡线`, `240h 过境免签 · 京津冀 10 天`).
- `/themes/{slug}` H1s also render Chinese under `locale=en`.
- `/about` browser title is bilingual: `关于我们 · Beijing-based team. Real names. Real WhatsApp.`

---

## Severity totals

| Severity | Count |
|---|---|
| critical | 2 (TopNav `Plan my trip`, `Sign in`) — affects every desktop page |
| high | 3 (Footer `Themes`/`Contact (coming v1.5)` desktop+mobile, home card line-clamp clip mobile) |
| medium | 4 (visa-free 2 mobile CTAs, about mobile H1 height, footer `Privacy (placeholder)` mobile) |
| low | 0 |

After de-duplicating chrome-level repeats (TopNav buttons are 1 component, Footer wraps are 1 component): **6 distinct defects**, plus 1 page-specific layout (about H1 mobile).

---

## Recommended top fixes (priority order)

1. **TopNav `Plan my trip` and `Sign in` (1440)** — same root cause as the just-fixed `Visa-free` regression. Both buttons in `header[role="banner"]` wrap because the flex-row width pressure forces text to break. Apply `whitespace-nowrap` (or `min-w-fit`) to the CTA `<a>` and `Sign in` `<button>`. **Highest impact**: every desktop page.
2. **PathCFooter `Themes (coming v1.5)` and `Contact (coming v1.5)`** — drop the parenthetical, or move "(coming v1.5)" to a small `<span>` block-stacked under the link, or set `whitespace-nowrap` on the text. Currently `(coming` breaks to a new line. Affects home (only PathCFooter consumer).
3. **Home itinerary card title clipped on mobile (`/`, 375)** — `line-clamp-2` truncates the EN copy `10-day first-timer China · Culture & landscape balanced`. Either bump to `line-clamp-3`, shorten the EN string, or expand the card height. Affects the most prominent CTA card on the homepage.
4. **`/visa-free` mobile CTAs `Tailor-make my route with Lin` and `Tailor-make my visa-free trip`** — wrap to 2 lines on 375px width. Either accept (2-line button is acceptable on mobile primary CTA) or shorten EN copy ("Tailor my route with Lin" / "Plan my visa-free trip").
5. **`/about` mobile H1 (5 lines / 210px)** — heading is heavy on mobile. Reduce font-size at the `sm:` breakpoint, or rephrase to ≤3 short clauses.

---

## Method appendix

**Detector script** (executed via `page.evaluate()` after navigating to each route + setting locale cookie + verifying `documentElement.lang === 'en'`):

```js
(() => {
  const issues = [];
  const docW = document.documentElement.clientWidth;
  const measureLines = (el) => {
    const range = document.createRange();
    const ys = new Set();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      range.selectNodeContents(n);
      const rects = range.getClientRects();
      for (const r of rects) if (r.width > 0 && r.height > 0) ys.add(Math.round(r.top));
    }
    return ys.size;
  };
  const inOverflowAncestor = (el) => {
    let p = el.parentElement;
    while (p && p !== document.body) {
      const cs = getComputedStyle(p);
      if (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowX === 'hidden'
       || cs.overflow === 'hidden' || cs.overflow === 'auto' || cs.overflow === 'scroll') return true;
      p = p.parentElement;
    }
    return false;
  };
  // 1. nav-wrap (header / footer nav children with height > 1.5x median)
  // 2. btn-wrap (text node lines > 1 inside rounded-full / role=button / submit)
  // 3. viewport-overflow (right > docW + 2 AND not inside overflow ancestor)
  // 4. heading-tall (h1-h4 visual line count > 4)
  // 5. clamped (line-clamp ancestor where scrollHeight > clientHeight + 4)
  // ... (full body in-script)
})()
```

Plan wizard 5-step click-through done at both viewports (clicked `Next →` 4 times); no label/option overflow detected at any step.

`/api/leads` excluded per brief (no UI surface).
