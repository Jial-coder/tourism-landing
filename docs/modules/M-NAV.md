# M-NAV — 顶栏（Top Navigation）

> 模块 ID：M-NAV  
> 出现位置：所有页面顶部  
> 第一轮模块，必须先于 M-HERO 与 M-LANG 装配。  
> 视觉来源：v4 hero 风（cinematic editorial），与首屏共用调色与字体。

---

## 1. 业务目标

- 让访客一眼知道：这是一家可信的中国深度定制旅行品牌，不是 SEO 流量门户。
- 5 秒内提供 4 条主要决策入口：看目的地 / 看行程 / 找顾问 / 立即咨询。
- 不抢首屏视觉，让 hero 大图与诊断式入口承担情绪。
- 同时承载多语言切换 (M-LANG)、登录入口 (M-AUTH-ENTRY)、聊天入口 (M-CHAT-LAUNCHER 协同)。

## 2. 反竞品要点（基于 chinahighlights.com review）

不允许：

- mega-menu 深 3 层下拉。
- 顶栏放奖项 logo 墙。
- 国旗图标作为多语言切换。
- “Start Your Journey” 单一表单按钮独占右侧。
- 把多语言切换塞进 footer 替代顶栏切换。

要做：

- 主导航最多 5 项 + “More”。
- 右侧只放：M-LANG 切换、M-AUTH-ENTRY、双 CTA（主：免费定制行程；副：WhatsApp 直聊）。
- 桌面端: 单行高度约 64–72px。
- 滚动后顶栏从透明渐变为深色 cinematic 半透 (charcoal blue 透 80%)，保持文字可读。

## 3. 信息结构

左侧：

- 品牌字标 (logotype)，无图形 logo 喧宾夺主。
- 在小屏可缩为 monogram。

中部主导航（最多 5 项）：

1. Destinations / 目的地
2. Itineraries / 行程
3. Advisors / 顾问
4. Stories / 旅行故事
5. About / 关于我们

“More”下拉里放 P1：Best Time / Visa / Themes / Loyalty。

右侧（按视觉权重从高到低）：

1. M-DUAL-CTA（紧凑变体）：主 CTA `Plan My Trip`、副 CTA `WhatsApp` 微图标 + 文字。
2. M-AUTH-ENTRY：未登录显示头像占位 + “Sign in”，已登录显示头像 + 用户菜单。
3. M-LANG：globe 图标 + 当前语种代码。
4. M-CHAT-LAUNCHER 不放在顶栏内，但右下浮按钮的颜色与顶栏 CTA 同源，避免产品语言断裂。

移动端 (<= 768px)：

- 左侧：品牌字标。
- 右侧：紧凑 M-LANG（仅 globe 图标）、M-AUTH-ENTRY（仅头像）、汉堡菜单。
- 汉堡展开抽屉式全屏菜单，里面包含：5 项主导航、M-DUAL-CTA、再次显示 M-LANG 全选项、用户中心入口。
- 不允许把 M-LANG 只放进 footer。

## 4. 状态

- Default：背景透明，文字 ivory；hero 高对比时自动加 4–6px backdrop blur。
- Scrolled：背景 charcoal blue / 80% 透明 + 微噪点，文字保留 ivory。
- Active route：当前路由对应的导航项下方显示 1px 编辑型 underline，不用色块。
- Hover：导航项下划线淡入；CTA 主按钮微提亮 4%；副 CTA 出现 WhatsApp 微动效（脉冲 1 次后停止）。
- Loading：仅 M-LANG / M-AUTH-ENTRY 触发数据时使用细发丝级 spinner；不阻塞导航。
- **软 404 链接**（codex round 1 决议）：Stories / Best Time / Careers 在 nav 下拉与 footer 的链接保留位置，但因对应页是 P1/P2，第一版做软 404：
  - 默认渲染 ivory 60%（不是 ivory 100%）；
  - hover 时下划线淡入但颜色保持 ivory 60%（区别于活跃链接 hover 的 ivory 100%）；
  - 点击触发一个 240×120 编辑型小弹层（charcoal blue 92% + 颗粒 + 16px radius）：`This corner of the site is opening in Phase 2. Want us to email you when it's live?` / `这一栏将在第二阶段开放。要我们上线时通知你吗？` 提供 `Notify me` 文字链 + Esc 关闭。
  - 不要做 next/router push 到 404 页；不要变灰禁用；不要 onClick={(e)=>e.preventDefault()} 静默吞掉。

## 5. 多语言要求

- 导航项必须支持 EN / ZH / JA / DE / FR / ES / IT / RU 文案。
- 德语 / 法语预留 30% 横向扩展，不允许换行截断。
- 默认基于浏览器 Accept-Language 推断；用户切换后写入持久化 (cookie + 用户中心)。
- 切换时全站 copy 同步更新；不允许局部不变。

## 6. 可用性与无障碍

- 顶栏 role="banner"，主导航 role="navigation"。
- 键盘 Tab 顺序：品牌 → 主导航逐项 → 主 CTA → 副 CTA → M-AUTH-ENTRY → M-LANG。
- 所有交互元素提供清晰的 focus ring（2px ivory，与 charcoal blue 对比够）。
- 颜色对比满足 WCAG AA。

## 7. Figma Make Prompt v2（chrome 三件套合并版，粘贴用）

> v2 重构（2026-05-20，hero v4 锁锚后）：合并 M-NAV + M-LANG + M-AUTH-ENTRY 为一份 chrome prompt，让 Figma Make 一次出三件套，保证视觉一致继承 hero v4。原 §7 v1 单 NAV prompt 保留作历史参考，不再用于 Figma Make 第一轮。

> 字体规格按 DESIGN.md §3 锁死 MiSans VF 单字族，不再用 "editorial serif for the wordmark"。

```
Design the chrome layer for a premium China inbound travel concierge website. This chrome overlays the hero v4 frame already generated (Zhangjiajie misty peaks background, charcoal blue + soft ivory editorial cinematic mood, MiSans VF typography). The chrome must inherit hero v4's visual language exactly — same MiSans VF font, same charcoal blue / soft ivory / alpine blue palette, same restraint.

Generate THREE related components in ONE frame, sharing visual language:

═══════════════════════════════════════
PART 1: M-NAV — Top Navigation Bar
═══════════════════════════════════════

Width 1440, height 72. Background: transparent at top of page; on scroll becomes charcoal blue #1a2538 at 80% opacity with subtle backdrop-blur and 4% film grain. Soft ivory text #fdfbf7. NO shadcn cards. NO SaaS button pair. NO mega menu. NO award badges. NO flag icons.

Left: brand wordmark in MiSans VF Bold (700), calm letter-spacing tracking-tight, soft ivory. Placeholder text "[Brand]" — do NOT invent a brand name.

Center: 5 navigation items in MiSans VF Regular (400) 14px ivory 90%:
- 目的地  (Destinations)
- 行程  (Itineraries)
- 顾问  (Advisors)
- 旅行故事  (Stories) — render at ivory 60% (soft 404, P2 not yet live)
- 关于我们  (About)

Plus a sixth "更多 / More" with a subtle 8px chevron caret.

Active route hint: a 1px ivory underline beneath the current item (e.g. "目的地"), NOT a colored pill, NOT a background fill.

Right cluster, ordered LEFT to RIGHT: M-DUAL-CTA compact → M-AUTH-ENTRY → M-LANG (the language switcher is ALWAYS the rightmost element).

═══════════════════════════════════════
PART 2: M-DUAL-CTA compact (lives inside M-NAV right cluster)
═══════════════════════════════════════

Two siblings:
- Primary pill: 36 high, rounded-full, 1px alpine blue #38bdf8 70% stroke, transparent fill, MiSans VF Regular 13px ivory: "免费定制行程"
- Secondary text-icon: NOT a pill, just MiSans VF Regular 13px ivory + a 14px outline WhatsApp glyph (single-color ivory, no neon green): "WhatsApp · 值班"

═══════════════════════════════════════
PART 3: M-AUTH-ENTRY (logged-out state, lives inside M-NAV right cluster)
═══════════════════════════════════════

A 32px circular outline avatar (1px ivory 30% stroke, transparent fill, minimal person glyph inside) + 13px MiSans VF Regular ivory text "登录" + a tiny 8px chevron caret. NO big SaaS sign-in button. NO bright OAuth color blocks.

ALSO provide the dropdown-open state in a separate frame to the right:
- 280 wide folded-paper menu surface (NOT a SaaS card), charcoal blue 90% translucent + faint film grain, 12px radius, single soft drop shadow, 1px ivory 6% inner top hairline.
- Inside: small "欢迎" heading, primary editorial pill CTA "登录" (alpine blue 70% stroke), secondary text link "创建账号", helper line "保存草稿和聊天记录" in ivory 60%.
- Optional row: two single-color icon-text buttons "Continue with Google" / "Continue with Apple".

═══════════════════════════════════════
PART 4: M-LANG (lives inside M-NAV right cluster, ALWAYS rightmost)
═══════════════════════════════════════

Trigger (collapsed): a thin globe glyph + the current language code "ZH" + a small chevron, in soft ivory text, MiSans VF Regular 13px. NO flag icons. NO filled pill. On hover, a 1px ivory underline appears beneath "ZH".

ALSO provide the dropdown-open state in a separate frame to the right of the M-AUTH-ENTRY dropdown:
- 220 wide folded-paper menu surface (same as M-AUTH-ENTRY surface treatment).
- 8 rows, 36 height each, MiSans VF Regular 13px:
  - 中文  (Simplified Chinese) — current, with 1px ivory underline on left edge
  - English  (English) — active
  - 日本語  (Japanese) — active
  - Deutsch  (German) — active
  - Français  (French) — active
  - Español  (Spanish) — coming soon, ivory 35% disabled, "· coming soon" suffix in 12px ivory 28%
  - Italiano  (Italian) — coming soon, same treatment
  - Русский  (Russian) — coming soon, same treatment
- DO NOT show OS-style menu, DO NOT use flag icons.

═══════════════════════════════════════
SCROLLED STATE for M-NAV (provide as second frame)
═══════════════════════════════════════

Same layout as default but background becomes charcoal blue #1a2538 at 80% opacity, with subtle backdrop-blur(12px) and 4% film grain. Text remains ivory.

═══════════════════════════════════════
MOBILE (375 wide) — provide as third frame
═══════════════════════════════════════

Compact M-NAV:
- Left: brand wordmark, smaller (or monogram).
- Right: M-LANG just globe icon, M-AUTH-ENTRY just avatar circle, then a hamburger icon. NO desktop nav items visible inline.

Hamburger drawer (provide as fourth mobile frame, full-screen):
- Slides from right to fill 100vw 100vh, charcoal blue 95% + film grain.
- Inside, vertically stacked: 5 main nav items in MiSans VF Bold 28px (one per line), with the 4th item "旅行故事" at ivory 60% (soft 404), 32px gap.
- Below: M-DUAL-CTA stacked vertically (primary pill full-width, secondary text-icon below).
- Below: M-LANG full list with 8 rows (5 active + 3 coming soon disabled).
- Below: M-AUTH-ENTRY shown as "登录 →" text link.
- Bottom: 24px safe area.

═══════════════════════════════════════
TYPOGRAPHY (LOCK)
═══════════════════════════════════════

ALL text in 'MiSans VF', 'MiSans', sans-serif. Variable Font weight axis only:
- 700 Bold for brand wordmark and mobile drawer nav items
- 400 Regular for everything else

DO NOT use Source Han Serif, Source Han Sans, Editorial New, Newsreader, GT Sectra, Tiempos, Inter, Playfair Display, Noto Serif SC, Noto Sans SC, or any other font. Single family with weight contrast only.

═══════════════════════════════════════
COLOR (FIXED, inherit from hero v4 / DESIGN.md §2)
═══════════════════════════════════════

- Charcoal blue #1a2538 (scrolled nav surface, dropdown surfaces)
- Deep slate #0f172a (page bg, drawer bg)
- Soft ivory #fdfbf7 (text, strokes)
- Mist gray #94a3b8 (reserved, secondary text in dropdowns)
- Alpine blue #38bdf8 (primary CTA stroke, focus ring)

NO cinnabar red, NO parchment beige, NO SaaS bright blue, NO neon green, NO purple gradients.

═══════════════════════════════════════
HARD REJECT (regenerate if any of these slip in)
═══════════════════════════════════════

- Mega menu deep dropdown panels
- Award badge wall, star ratings, customer counters
- Flag icons next to language codes
- "Start Your Journey" giant single CTA dominating right side
- M-LANG placed in footer instead of nav
- M-LANG NOT being the rightmost element
- shadcn cards, Material Design panels, KPI tiles, equal-grid SaaS dashboard
- Playfair Display, Noto Serif SC, Source Han Serif, or any serif font
- Bilingual text stacks (e.g. "Plan My Trip / 免费定制行程" on the same line — only Chinese in this default-Chinese build)
- AI poster gloss, neon glow, fake glassmorphism (we use ONLY backdrop-blur + soft ivory stroke)

If output drifts toward any of these, regenerate as a restrained chrome layer that visually disappears against the hero v4 photo background.
```

## 8. 接收标准（chrome 三件套合并版）

- 字体严格走 MiSans VF 单字族，不出现任何 serif
- 顶栏右侧顺序：M-DUAL-CTA → M-AUTH-ENTRY → M-LANG（M-LANG 永远最右）
- 5 项主导航中"旅行故事"渲染 ivory 60%（软 404 视觉提示）
- M-LANG 下拉 5 active + 3 coming soon 灰态，coming soon 行后追加 "· coming soon" 12px ivory 28%
- M-AUTH-ENTRY 未登录态文字写 "登录"，dropdown 打开状态包含主 CTA + 创建账号文字链 + helper line
- 桌面默认透明 + 桌面 scrolled 半透 + 移动紧凑 + 移动汉堡抽屉，**4 个状态都给出**
- 与 hero v4 共用 charcoal blue / soft ivory / alpine blue 调色
- 不命中 §2 任何反竞品禁用项

## 7-legacy. Figma Make Prompt v1（已 superseded，仅供历史参考）

```
Design a top navigation bar for a premium China inbound travel concierge website. Width 1440, height 72. Editorial cinematic mood, charcoal blue translucent background suitable to overlay a real-photo hero, soft ivory text, no shadcn cards, no SaaS button pair, no mega menu.

Left: brand wordmark in elegant serif, calm letter-spacing. Center: 5 navigation items in a refined sans-serif - Destinations, Itineraries, Advisors, Stories, About - plus a sixth "More" with a subtle dropdown caret. Right cluster, ordered: a primary editorial-style CTA "Plan My Trip", a secondary WhatsApp text-icon CTA "Talk on WhatsApp" with a faint glyph (no neon green button), an auth entry shown as a circular outline avatar + "Sign in" text, and a language switcher shown as a globe glyph + current language code "EN".

State: when the page is scrolled the bar becomes a translucent charcoal blue layer with subtle noise; when at top of a hero the bar is fully transparent and relies on text shadow for legibility.

Active route hint: a 1px ivory underline beneath the current item, not a colored pill.

Provide a desktop default state, a desktop scrolled state, and a mobile (375 wide) compact state with hamburger menu icon. Do not use flag icons for language. Do not stack award badges in the bar. Do not show megamenu panels.

Typography: editorial serif for the wordmark; clean modern sans-serif for navigation and CTAs. Color palette: charcoal blue, mist gray, alpine blue, soft ivory, faint warm sunlight accent on primary CTA. No cinnabar red. No parchment beige.
```
