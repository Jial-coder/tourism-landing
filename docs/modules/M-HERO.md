# M-HERO — 首屏主视觉（Cinematic Editorial Hero）

> 模块 ID：M-HERO  
> 出现位置：首页 `/` 顶部首屏。是整个网站视觉语言的锚点。  
> 第一轮模块。它是其他模块的视觉父级：决定字体、配色、摄影风格、字号阶梯、间距尺度。
> **v2 重构**（2026-05-20）：v1 评审反馈视觉过密 / 字体不舒服 / 中英同屏与 M-LANG 切换冲突。v2 三件事：1）concierge form + advisor card 下移成 hero 下方独立段（M-CONCIERGE-BAND），hero 里不画；2）字体锁死 MiSans 全家桶；3）默认显示**中文**单语（开发预览），上线后浏览器自适应。

---

## 1. 业务目标

- 让海外游客和海外华人 3 秒内产生”想去中国 + 想被人帮忙规划”的双重欲望。
- 把竞品 chinahighlights.com 的”密集信息门户”用一张大图 + 编辑型留白替代。
- 给 M-DIAGNOSTIC、M-VISA、M-CONCIERGE-BAND（hero 下方）、M-DUAL-CTA、M-TRUST-FOOTNOTE 提供承载位置。
- 与 v4 prompt（`docs/figma-make-prompt-v4-supersede.md`）严格对齐；本模块是 v4 的 Figma 化拆解。

## 2. 反竞品要点

不允许：

- 单大照片轮播 / 全屏背景视频。
- 左大字 + 右表单卡的 SaaS 模板布局。
- 中央硬地图 widget + 围绕它的小卡。
- 圆形目的地 marker + 短文字徽标。
- 暖纸色 / 朱砂红 / 金墨色调 / 平面拼贴中式插画。
- shadcn 卡片 / 图标墙 / 奖项 logo 排队。
- 大段说明文字（>3 行）压在 hero 下方。

要做：

- 真实摄影主导 60–70% 屏幕；其余空间用编辑型排版承载文字与轻交互模块。
- 一张主导照片（强情绪锚）+ 2–3 张目的地小图（异步排布）。
- 多语言可扩展 headline；保留 30% 横向余量给德语 / 法语。
- 与 M-NAV 透明顶栏 + 滚动后 charcoal blue 半透叠加行为兼容。

## 3. 信息结构

整体尺寸：

- 桌面 1440 × 900；hero 高度严格不超过 100vh；不允许把首屏第二段也视为 hero。
- 移动 375 × 812；hero 自适应 ≥ 100vh；保留 sticky M-NAV + M-CHAT-LAUNCHER 安全区。

视觉层（自下而上）：

1. 背景层：cinematic 真实摄影主图（默认推荐 Zhangjiajie 雾峰 / Guilin 喀斯特）。可叠极淡颗粒纹理（≤6%）。
2. 渐变压暗层：左下到右上 charcoal blue 0% → 35%，确保左上文字可读。
3. 内容层（**hero v2 极简**——concierge form + advisor card 已被推到 hero 下方独立段 M-CONCIERGE-BAND，hero 里不画；M-NAV / M-LANG / M-AUTH-ENTRY / M-DUAL-CTA 紧凑变体已在 chrome 模块独立装配，hero prompt 假设它们已锁定，只留 nav 透明带的占位空间，不重复绘制）：
   - 上：占位预留给 M-NAV（透明态），不重新画 nav 内容。
   - 中（左对齐，左侧 60% 区域）：editorial headline 单语（中文 zh 默认）+ supporting copy 单语（≤2 行）。
   - 中下：M-DIAGNOSTIC 诊断 pills 一行，最多 4 个，软风格。
   - 下方左侧：M-DUAL-CTA hero 完整变体的占位标记（具体样式由 M-DUAL-CTA brief 决定，hero 不重画 pill）。
   - 右上紧贴 nav 下沿：M-VISA 签证 hint chip。
   - 右下空白区：1-2 张 M-DESTINATION-TILES 照片错位漂浮（不超过 hero 视觉重心）。
4. 注解层：极小的目的地名称 caption（如 "Zhangjiajie · 张家界 · 雾峰"），编辑型小字而非 badge。
5. 路线层（可选）：从主图边缘伸出一条 ivory 14% 的细线，连向目的地小图，形成隐式旅行板。

排版尺度：

- **字体规格按 design-default-assumptions §2.2.1**：headline / supporting / pills / advisor 全部走 MiSans VF（中文）+ MiSans Latin VF（拉丁），字重靠 Variable Font 调（Heavy 800 / Bold 700 / Semibold 600 / Regular 400），不切换字族
- Headline：MiSans Heavy 64–80px；两行内
- Supporting copy：MiSans Regular 16–18px，ivory 75%
- 诊断 pills：MiSans Regular 14px，文字 ivory 90%，1px ivory 18% 描边，圆角 999px
- CTA 主：MiSans Bold 16–18px，编辑型 pill
- CTA 副：MiSans Regular 16px + 微 WhatsApp 玻璃 glyph
- 顾问名片名字（M-CONCIERGE-BAND 段落里）：MiSans Bold 18px；语种 / 擅长目的地 MiSans Regular 12px ivory 60%

## 4. 状态

- Default：第一次进入，主图 1.02 倍轻微推进 8s 然后停（不要循环 Ken Burns）。
- Reduced motion：禁用推进，仅保持静态。
- Loading：先显示 charcoal blue 渐变 + 极简骨架；图片懒加载完成淡入 400ms。
- Error：图片加载失败时显示 atmospheric 颗粒占位 + 简短编辑型提示，不显示破图。
- Hover on destination tile：tile 微抬 4px + caption 揭示更长副标题（2 行内）。
- Pill hover：pill underline 淡入；不变色块。
- 滚动锁定：hero 不需要锁定滚动；用户向下滚自然进入下一段。

## 5. 内容默认值（v4 锚定）

## 5. 内容默认值（v4 锚定 + v2 单语原则）

> v2 重构：所有 hero copy 只写**一种语言**。开发预览阶段默认中文（zh），上线后浏览器自适应（design-default-assumptions §2.2.2）。

### 5.1 中文版（开发预览默认 / zh.json）

- Headline：`还没想好去中国哪？` / `从你喜欢的，开始一段旅程。`
- Supporting copy：`告诉我们你的旅行节奏、时间和目的地灵感。本地中国旅行顾问会把你的想法变成一条专属路线，而不是一个标准包。`
- Diagnostic pills：`还没想好` / `只有 10 天` / `带孩子` / `想看自然`
- Visa chip：`美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩 公民 30 天免签 — 截至 2026 年 12 月`
- Primary CTA placeholder：`免费定制行程`
- Tertiary text link：`看看 10 天样板行程`
- Destination tiles caption：`Zhangjiajie · 张家界 · 雾峰` / `Guilin · 桂林 · 喀斯特河流` / `Jiuzhaigou · 九寨沟 · 高山湖泊`

### 5.2 英文版（上线 fallback / en.json）

- Headline：`Still deciding where to go in China?` / `Start with what you love. We'll shape the journey.`
- Supporting copy：`Tell us your travel style, dates, and dream destinations. A real local China advisor will turn your idea into a route — not a generic package.`
- Diagnostic pills：`Not sure where to go` / `Only 10 days` / `Traveling with kids` / `Nature, not cities`
- Visa chip：`30-day visa-free for US / UK / Canada / EU / AU / NZ / JP / KR — through Dec 2026`
- Primary CTA placeholder：`Plan My China Trip`
- Tertiary text link：`See sample 10-day plan`
- Destination tiles caption：`Zhangjiajie — Mist peaks` / `Guilin — Karst rivers` / `Jiuzhaigou — Alpine lakes`

> **关键约束**：Figma Make 第一稿（v2）用中文版（5.1）生成；其他语言走 i18n 资源包。**不允许**在同一屏同时显示中英两版。

## 6. 移动端

- 主图占 60–65% viewport 高度（v2 hero 极简后可比 v1 多占）。
- Headline 最多 2 行；只显示一种语言（开发预览中文）。
- Diagnostic pills 横滚一行，不要换行折叠。
- M-DUAL-CTA 主 / 副堆叠为两行 pill，主 CTA 在上。
- M-VISA chip 折成单行小字，停在 headline 下沿。
- M-DESTINATION-TILES 折成横滑小卡，2-3 张可滑。
- **concierge form + advisor card 不在 hero 段，往下滚才会到**（M-CONCIERGE-BAND 段，site-structure 已加）。
- M-CHAT-LAUNCHER 不重叠 M-DUAL-CTA。

## 7. 与其他模块的关系

- M-NAV：透明顶栏处于 hero 上层；hero 高度内不允许出现 scrolled 态。
- M-LANG：切换语言后 headline / supporting / pills / CTA / chip 全部更新整屏；layout 不破；**不要双语同屏**。
- M-DIAGNOSTIC：在 hero 内部承载，是 hero 的下半身。
- M-VISA：editorial hint chip，非 banner；位置近 headline。
- M-CONCIERGE-BAND（hero 下方独立段）：concierge form + advisor mini card 在那段做，**不在 hero 内**。这是 v2 重构最大的改动。
- M-DUAL-CTA：固定在 hero 主区，主 CTA 占位，详细样式由 M-DUAL-CTA brief 决定。
- M-DESTINATION-TILES：与主图错位排布，1-2 张漂浮，**不要并排矩阵**，**不要把 hero 撑成画廊**。
- M-INTERACTIVE-DOCK：右下浮层，hero 范围内不与 M-CHAT-LAUNCHER 重叠。

## 8. Figma Make Prompt v2（粘贴用，英文）

> v2 的设计原则：**Hero only does one job — make people feel "I want to go to China."** 所有不直接服务这个情绪的元素都推到 hero 下方独立段。

```
Design a single high-fidelity hero frame for the home page of a premium China inbound travel concierge website. Frame 1440x900 desktop + 375x812 mobile. Editorial cinematic mood, image-led, high impact. NOT a SaaS landing page. NOT a card-based hero. NOT a chinahighlights.com mega-portal. NOT a Figma template. NOT a dashboard. Reject every default SaaS aesthetic.

This hero does ONE job: make the visitor feel "I want to go to China." Everything else (concierge form, advisor card, full inquiry) lives in a separate band BELOW this hero — do NOT draw them inside this frame.

Layered composition (only 6 elements; keep generous breathing room):

1. Background photo: a single dramatic real-photo of misty Zhangjiajie sandstone peaks at dawn or golden hour, fills ~70% of the screen. Cinematic depth, atmospheric haze, soft natural light, photographic realism, NO AI poster gloss, NO digital painting.

2. Gradient overlay: subtle dark gradient from charcoal blue at lower-left to deep slate at upper-right, ensuring headline legibility without crushing the photo's mood.

3. Top: leave a transparent 72px navigation strip placeholder ONLY. Do NOT draw the wordmark, nav items, CTA, auth, or language switcher in this hero. Chrome is generated by other modules and overlaid later. The hero MUST NOT bake chrome into the image.

4. Headline block (left-aligned, occupying about 55% of width, vertically anchored upper-middle):
   - Primary headline in MiSans VF Heavy (Variable Font, weight 800), 64-80px desktop / 36-44px mobile, soft ivory color: "还没想好去中国哪？" then a second line in MiSans VF Bold (700) slightly warmer ivory: "从你喜欢的，开始一段旅程。"
   - Supporting copy directly below in MiSans VF Regular (400), 16-18px desktop / 14-15px mobile, ivory 75% opacity, max 2 lines: "告诉我们你的旅行节奏、时间和目的地灵感。本地中国旅行顾问会把你的想法变成一条专属路线，而不是一个标准包。"
   - ONLY render the Chinese version. Do NOT show English alongside. Do NOT show bilingual stacks.

5. Diagnostic pills row (4 soft pills, NOT buttons; positioned below the supporting copy with ~32px breathing space):
   - Labels: "还没想好", "只有 10 天", "带孩子", "想看自然"
   - Style: 1px ivory 18% stroke, charcoal blue 60% translucent fill, 999 radius, MiSans VF Regular 14px ivory 90%, no fill on hover (only stroke brightens)
   - On mobile, pills become a single horizontal scroll row with 8px fade masks at edges.

6. Visa hint chip (right-aligned, near headline top-right corner; an editorial annotation, NOT a banner):
   - Label: "美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩 公民 30 天免签 — 截至 2026 年 12 月"
   - Style: pill 1px ivory 30% hairline outline, charcoal blue 20% translucent fill, MiSans VF Regular 12px ivory 90%, with a 6px alpine blue dot prefix (NOT a flag, NOT a stamp).

7. CTA placeholder (positioned bottom-left of hero, NOT a finished button):
   - A ghost outline pill, 1px ivory 15% stroke, transparent fill, MiSans VF Regular 13px ivory 60% letter-spaced uppercase: "免费定制行程"
   - This is a PLACEHOLDER for M-DUAL-CTA — do NOT design the final button here. Final CTA styling comes from the M-DUAL-CTA module and overlays this placeholder later.

8. Destination tiles (1-2 small floating photos, asymmetric, lower-right area; subtle, do NOT compete with the headline):
   - Each tile 140-160px wide, 4:3 aspect, slight rotation (-2deg / +1deg), 1px ivory 10% stroke, soft drop shadow.
   - Captions in MiSans VF Regular 10-11px ivory 90%: "Guilin · 桂林 · 喀斯特河流" / "Jiuzhaigou · 九寨沟 · 高山湖泊"
   - On mobile, hide both tiles or show one only as a horizontal swipe strip below the pills.

9. Optional faint ivory 14% dashed route line connecting the main photo edge to one destination tile, suggesting an implicit travel-board.

10. Subtle film grain overlay across the whole frame, 4-6%.

Typography (lock down strictly):
- ALL text in MiSans VF (Chinese) + MiSans Latin VF (Latin), Variable Font, weight axis used for hierarchy:
  - 800 Heavy for primary headline line 1
  - 700 Bold for primary headline line 2
  - 600 Semibold for h2 if needed
  - 400 Regular for supporting copy, pills, chip, caption, CTA placeholder
- Do NOT use Source Han Serif, Source Han Sans, Editorial New, Newsreader, GT Sectra, Tiempos, Inter, Playfair Display, Noto Serif SC, Noto Sans SC, or any other font.
- DO NOT mix serif and sans — single family with weight contrast only.

Color palette (fixed, no improvisation):
- Charcoal blue #1a2538
- Deep slate #0f172a
- Soft ivory #fdfbf7
- Mist gray #94a3b8
- Alpine blue accent #38bdf8 (only on visa-chip dot and CTA hover state, used sparingly)
- NO cinnabar red, NO parchment beige, NO SaaS bright blue, NO neon green, NO purple gradients.

Mobile (375x812): same elements, restacked. Photo occupies top 60% of viewport. Headline 36-44px. Pills horizontal scroll. Visa chip wraps to a single short line below headline. CTA placeholder full-width but still ghost outline. Hide route line. One destination tile only or swipe strip.

CRITICAL — what NOT to do (regenerate if any of these slip in):
- A concierge form / inquiry form / "Where do you want to go" input fields in this hero (those go in M-CONCIERGE-BAND below, separate)
- An advisor card / portrait + name + WhatsApp button in this hero (also M-CONCIERGE-BAND territory)
- A finished colored CTA button (use the ghost outline placeholder only)
- Bilingual stacks (Chinese + English on the same line/screen)
- Card-based layout, KPI dashboard, stat tiles, badge band, equal grid, mega portal, three-column landing
- Award trophies, star ratings, customer counters, "served X travelers" stats
- Heavy serif fonts that look academic or like print magazine flagship
- Material Design panels, white app cards, shadcn defaults
- AI poster gloss, oversaturated photo, painterly look

If output drifts toward any of those, regenerate it as a cinematic, restrained, image-led editorial travel magazine cover.
```

## 9. 接收标准（v2）

- 真实摄影占 ~70% 屏幕（v2 比 v1 更纯粹），单一情绪锚，不是单大图轮播。
- Headline + supporting copy **只显示一种语言**（中文版优先），不双语同屏。
- 4 条诊断 pills 软风格，不像按钮。
- 签证 hint 是 editorial chip，不是横幅 banner。
- **Hero 内不出现 concierge form / advisor card**（已下移到 M-CONCIERGE-BAND）。
- CTA 是 **ghost outline placeholder**（透明无填充），不是完整 pill。
- 1–2 张目的地小图错位漂浮，不抢主图。
- 字体严格走 MiSans VF 全家桶，单字族不同字重；不出现 serif + sans 混搭。
- 桌面 + 移动两态都给出。
- 不命中 §2 任何反竞品禁用项。
