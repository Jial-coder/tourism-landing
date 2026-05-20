# M-FOOTER — 页脚（Site Footer）

> 模块 ID：M-FOOTER  
> 出现位置：所有页面底部。  
> 第一轮模块（与 M-NAV 同步装配，作为视觉语言闭环）。

---

## 1. 业务目标

- 给真正想深入的访客一份清晰目录：目的地 / 行程 / 顾问 / 内容 / 法务。
- 提供与品牌信任有关的 minor reassurance（公司信息、所属集团、联系方式、社交、Newsletter）。
- 不取代 M-NAV / M-LANG / M-CHAT-LAUNCHER；不抢首屏。
- 多市场多语言友好：所属语种子站清单 + 全球办公地址。

## 2. 反竞品要点

不允许：

- chinahighlights.com 风的奖项 logo 墙作为页脚主视觉。
- 把 M-LANG 多语言切换塞进 footer 替代顶栏入口。
- 4–5 列 SaaS 模板 footer，每列堆 8 条同等级链接。
- 大段法律免责声明吃掉一屏。

要做：

- 编辑型版式：少而精、有视觉呼吸。
- 用品牌信念短句 + 真实摄影背景层（可选）做开场。
- 链接按需求人群组织（旅人 / 顾问 / 公司），不按 SEO 关键词。
- Newsletter 入口用一句邀请式文案 + 单输入框，不做 hard sell。
- 多语言子站列表低对比度小字呈现（与 M-LANG 数据一致），承认存在但不喧宾。

## 3. 信息结构

通顶宣言带（顶部 56–80px 高）：

- 单行短句：`Highlights happen when you get closer.`（中：`走得近，旅行才发生。`）
- 居中编辑型字号；颜色 ivory 70%。

主区（4 列网格，桌面 ≥1024px）：

- 列 1 — Brand & Promise：
  - 品牌字标。
  - 一句话 about：`Independent China travel concierge since 2024. Real advisors. Bilingual support.`
  - 公司名称、注册地、ICP（如适用）。
- 列 2 — Travel：
  - Destinations
  - Itineraries
  - Best Time to Visit
  - Visa & Entry
  - Sample 10-day Plan
- 列 3 — People：
  - Advisors
  - Stories from Travelers
  - About Us
  - Responsible Travel
  - Careers
- 列 4 — Get in touch：
  - WhatsApp（带极简图标）
  - Email
  - WeChat（图文并排，不要二维码大块占位）
  - 全球办公地址（最多 2 条）
  - Office hours（GMT 标记）

Newsletter 行（独立行，跨列）：

- 邀请式短文案：`Slow letters from inside China. One a month. No spam.`（中：`一封来自中国深处的慢信。一月一封。`）
- 输入框（Email）+ 编辑型 pill 按钮 `Subscribe`；与 M-DUAL-CTA 主 CTA 同源。
- 隐私小字：`We never share your address.`

底部细线区：

- 左：版权 `© 2026 [Brand]`（独立品牌，无集团归属示例；详见 `docs/design-default-assumptions.md` §1.3）。
- 中：法务链接行 `Privacy · Terms · Cookies · Accessibility · Contact`。
- 右：社交图标（X / Instagram / YouTube / Facebook，最多 4 个，单色线条）。
- 与 M-LANG 不重复：可放一行极淡灰色 `Available in: English · 中文 · 日本語 · Deutsch · Français` 与 `Coming soon: Español · Italiano · Русский`，只展示，不替代切换器；与 `docs/i18n-launch-plan-v1.md` 保持一致。

## 4. 视觉

- 背景：深 charcoal blue 渐到 deep slate，可选叠 `08_film_grain_overlay_texture` 类似纹理。
- 文字：ivory 主文，mist gray 辅文，alpine blue 仅在主 Newsletter 按钮 / WhatsApp 图标小高亮。
- 间距：编辑型呼吸；不是 SaaS dashboard 紧凑。
- 不要奖项 logo 墙；即使保留 World Travel Awards / TripAdvisor，应该极小、单色、占细线区一小片。

## 5. 移动端

- 4 列折叠为单列，每个标题成为可折叠分组，默认收起，点击展开。
- Newsletter 行在分组上方，永久可见。
- 法务链接折成两行；社交图标右对齐。
- 多语言展示行折成 2 行小字。
- 底部留 24px 安全区，避免与 M-CHAT-LAUNCHER 浮按钮重叠。

## 6. 与其他模块的关系

- M-NAV：footer 链接为延伸目录，不重复顶栏 5 项主导航。
- M-LANG：footer 仅"展示"可用语言，点击仍跳到顶栏切换器；不做独立切换。
- M-CHAT-LAUNCHER：footer 不放"Live Chat"文字按钮替代浮层。
- M-DUAL-CTA：footer 主入口仍是 Newsletter，不复用顶栏 CTA。
- M-ACCOUNT-DASHBOARD：footer 不放"Sign in / My account"，避免与 M-AUTH-ENTRY 抢入口。
- **软 404 链接**（codex round 1 决议）：Travel 列的 `Best Time to Visit`、People 列的 `Stories from Travelers` / `Careers` 因对应页 P1/P2 未上线，与 M-NAV 共用同一套软 404 行为（详见 M-NAV §4）：链接保留 ivory 45% 渲染；点击触发"Phase 2 通知我"小弹层；不要变灰禁用、不要做 next/router push 到 404、不要 preventDefault 静默吞掉。

## 7. Figma Make Prompt（粘贴用，英文）

```
Design a premium editorial footer for a China inbound travel concierge website. Width 1440. Editorial cinematic mood. Charcoal blue background that fades into deep slate, with very subtle film grain. Soft ivory primary text, mist gray secondary text, alpine blue accent on a single newsletter button and a WhatsApp glyph. No award badge wall. No flag icons. No SaaS dashboard density. No 5-column SEO link dump.

Top band (about 64 high): a single editorial line centered, "Highlights happen when you get closer." in soft ivory at 70 percent opacity.

Main grid: four columns with generous breathing space.
Column 1 - Brand & Promise: brand wordmark, a one-line about ("Independent China travel concierge since 2024. Real advisors. Bilingual support."), company legal name and registered location.
Column 2 - Travel: links to Destinations, Itineraries, Best Time to Visit, Visa & Entry, Sample 10-day Plan.
Column 3 - People: links to Advisors, Stories from Travelers, About Us, Responsible Travel, Careers.
Column 4 - Get in touch: WhatsApp with a faint glyph, Email, WeChat (text only, no big QR block), up to two office addresses with GMT-marked hours.

Newsletter row spanning all columns: a minimal editorial invitation line "Slow letters from inside China. One a month. No spam.", an unobtrusive email input, and a small editorial pill button "Subscribe" using alpine blue accent. Below the input, a 12px privacy note "We never share your address."

Bottom hairline area: left side shows "© 2026 [Brand]" with NO group affiliation line, center shows "Privacy · Terms · Cookies · Accessibility · Contact" as small text links, right side shows a row of single-color line icons for X, Instagram, YouTube, Facebook (4 max). Beneath the hairline, an extra-soft mist gray line lists available languages: "Available in: English · 中文 · 日本語 · Deutsch · Français" followed by a separate softer line "Coming soon: Español · Italiano · Русский" - this is informational only and not a switcher.

Provide a desktop state and a mobile (375 wide) collapsed state where the four columns become accordions; Newsletter remains visible above the accordions; legal and social rows wrap; bottom safe area 24px to avoid overlap with the floating chat launcher.

Typography: editorial serif for the brand wordmark and the top band line; clean modern sans-serif for everything else. Reserve room for German and French expansion. Do not use cinnabar red, parchment beige, or generic SaaS blue. Do not show award trophy stacks.
```

## 8. 接收标准

- 桌面 4 列 + 移动单列折叠两态都给出。
- 多语言展示行只展示不替代切换器；5 active + 3 coming soon 两行排布与 `docs/i18n-launch-plan-v1.md` 一致。
- 不出现奖项 logo 墙、不出现 SaaS 紫色登录块、不出现重复的 Sign in 入口、不出现集团归属示例文案。
- Newsletter 按钮与 M-DUAL-CTA 主 CTA 同源不冲突。
- 与 M-CHAT-LAUNCHER 浮按钮位置不重叠。
- 颜色与字体与 M-NAV / M-LANG 一致，可装配为完整页面闭环。
