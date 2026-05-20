# M-DUAL-CTA — 双行动按钮组（Dual Low-Friction CTA）

> 模块 ID：M-DUAL-CTA  
> 出现位置：M-NAV 顶栏右侧（紧凑变体）；M-HERO 内主区（完整变体）；行程详情底部、目的地详情底部、咨询确认页（变体）。  
> 第一轮模块。它是网站“最强转化口”，必须明显但不喧嚣。

---

## 1. 业务目标

- 把 SaaS 的“双按钮恐惧”反转：主 CTA 引导承诺、副 CTA 给低门槛对话出口。
- 与 M-CONCIERGE-NOTE 漏斗错位：CTA 是“说出口”，concierge note 是“留下来”。
- 与 M-CHAT-LAUNCHER 联动：副 CTA 走外部 WhatsApp，M-CHAT-LAUNCHER 走站内聊天，二者协调。

## 2. 反竞品要点

不允许：

- 主副两个等大色块按钮并列（chinahighlights / Booking 风）。
- 主 CTA 用 SaaS 蓝 / 紫；副 CTA 用 WhatsApp 荧光绿。
- 重复出现“Start Your Journey”这种泛词。
- 第三 tertiary 文字链长得像 footer 普通链接。

要做：

- 主 CTA：editorial 邀请风 pill；alpine blue 描边，hover 内部填 alpine blue 18%。
- 副 CTA：text-icon 风格；轻微 WhatsApp glyph + 一句话；用文字主导而非色块。
- Tertiary 文字链：editorial italic 文字 + arrow，置于副 CTA 下方。

## 3. 信息结构

完整变体（hero 内主区）：

- 主 CTA：`Plan My China Trip` / `免费定制行程`。
- 副 CTA：`WhatsApp · Local Advisor on Duty` / `WhatsApp · 值班顾问直聊`，带 18px WhatsApp glyph，单色 ivory；不用绿色。文案必须强调"on duty / 值班"，与 M-CHAT-LAUNCHER（站内 concierge desk）和 M-ADVISOR-CARD（具体顾问）区分清楚。
- Tertiary 文字链：`See sample 10-day plan →` / `看看 10 天样板行程 →`，italic ivory 70%。

紧凑变体（M-NAV 顶栏右侧）：

- 主 CTA：`Plan My Trip` / `定制行程`，36 高 pill。
- 副 CTA：`WhatsApp · Duty` / `WhatsApp · 值班`，文字 + 极小 glyph，pill 旁边并排但描边更细。
- Tertiary 文字链不出现在 nav。

底部变体（行程 / 目的地详情结尾）：

- 主 CTA：上下文化文案，例如 `Customize this 12-day plan` / `定制这条 12 天行程`。
- 副 CTA：`WhatsApp the duty advisor about this trip` / `WhatsApp 值班顾问问这条`。
- Tertiary：`Compare with another itinerary →` / `对比另一条 →`（链到 M-COMPARE-DRAWER）。

## 4. 视觉

- 主 CTA pill：高 44（hero 完整变体）/ 36（紧凑）；圆角 999；1px alpine blue 70% 描边；ivory 文字；hover 内填 alpine blue 18%；active 内填 alpine blue 30%；focus ring 2px alpine blue。
- 副 CTA：无填充，仅 ivory 文字 + 18px WhatsApp glyph（描边版）；hover 文字下出现 1px ivory underline。
- Tertiary：14–15px serif italic + ivory 70%；hover underline。
- 间距：主 / 副 CTA 之间 24px；副 CTA / tertiary 之间 12px（hero 完整变体）。

## 5. 状态

- Default
- Hover（仅主 CTA 出现内填变化）
- Pressed
- Disabled（接口不可用或 rate-limit；副 CTA 提示 `Lin is offline — leave a note instead`）
- Loading（主 CTA 内嵌 ivory 进度环，文案不变）

## 6. 行为

- 主 CTA：跳到 `/plan` 表单页，并把诊断 pill 选中状态、目的地选择、签证识别国家通过 query string 传过去。
- 副 CTA：打开 WhatsApp 链接 `wa.me/{number}?text={prefill}`；预填语句根据当前页面上下文：
  - hero 默认：`Hi, I'd like to plan a China trip. I'm not sure where to go yet.`
  - 行程详情：`Hi, I'm interested in your 12-day Sichuan plan.`
  - 目的地详情：`Hi, can you customize a Yunnan trip for me?`
- Tertiary：首页指向 `/itineraries/sample-10-day`；详情页指向 `/itineraries?compare=current`。
- 与 M-AUTH-ENTRY：未登录用户点击主 CTA 后允许在 `/plan` 页用游客模式提交，提交后温和提示注册保留草稿。

## 7. 多语言

- 文案模板字段化；保留主 CTA 在德 / 法 / 西语下不超过 2 行。
- 不允许在主 CTA 文案里同时塞英 / 中两版（避免视觉混乱）；中文版仅在中文语种下显示。

## 8. 移动端

- 完整变体堆叠：主 CTA 在上、副 CTA 在下；tertiary 在副 CTA 下方居左。
- 紧凑变体：主 CTA 显示，副 CTA 隐藏到 M-NAV 汉堡抽屉，避免顶栏挤压。
- 底部变体：主 / 副并排，等高 36；tertiary 折到下一行。

## 9. 与其他模块的关系

- M-NAV：顶栏紧凑变体。
- M-HERO：hero 内完整变体。
- M-CONCIERGE-NOTE：M-DUAL-CTA 主 CTA 视觉权重 > concierge note 提交 pill；不要让两者抢点击。
- M-ADVISOR-CARD：M-ADVISOR-CARD 的 WhatsApp pill 走具体顾问；M-DUAL-CTA 副 CTA 走值班池；不重复。
- M-CHAT-LAUNCHER：浮按钮走站内聊天；M-DUAL-CTA 副 CTA 走外部 WhatsApp；明确分流。
- M-DIAGNOSTIC：诊断 pill 命中后会把状态传给 M-DUAL-CTA 主 CTA 链接。

## 10. Figma Make Prompt（粘贴用，英文）

```
Design a "dual low-friction CTA" component group for a premium China inbound travel website. Editorial cinematic mood. Charcoal blue translucent context. Soft ivory text. No SaaS button pair. No neon WhatsApp green. No filled bright blue.

Provide three variants.

Variant A - Hero full:
- Primary CTA pill, 44 high, 999 radius, 1px alpine blue 70 percent stroke, transparent fill, ivory text "Plan My China Trip / 免费定制行程". Hover state shows alpine blue 18 percent inner fill. Pressed state shows 30 percent. Focus state shows a 2px alpine blue ring.
- Secondary CTA, text-icon style, no fill, with an 18px outline WhatsApp glyph in soft ivory and the label "WhatsApp · Local Advisor on Duty / WhatsApp · 值班顾问直聊". Hover adds a 1px ivory underline beneath the label. The label MUST emphasize "on duty / 值班" so it cannot be confused with the floating chat launcher tooltip ("Chat with our concierge desk") or the M-ADVISOR-CARD WhatsApp pill ("Talk to Lin on WhatsApp").
- Tertiary text link below in 14-15px serif italic, ivory 70 percent, "See sample 10-day plan → / 看看 10 天样板行程 →". Hover underline.

Variant B - Top nav compact:
- Primary CTA pill, 36 high, label "Plan My Trip / 定制行程".
- Secondary text + 16px outline WhatsApp glyph "WhatsApp · Duty / WhatsApp · 值班" sitting next to the primary pill, no underline by default.
- No tertiary link in this variant.

Variant C - Itinerary / destination page bottom:
- Primary CTA pill, 44 high, contextual label e.g. "Customize this 12-day plan".
- Secondary text-icon "WhatsApp the duty advisor about this trip" with WhatsApp glyph.
- Tertiary text link "Compare with another itinerary →".

Provide desktop (1440 context) and mobile (375 context) for each variant. On mobile, Variant A stacks the primary above secondary above tertiary; Variant B keeps the primary pill visible and hides the secondary into the hamburger drawer; Variant C keeps primary and secondary side by side at 36 high and wraps tertiary to a new line.

Multi-language: ensure the primary CTA label fits without truncation in EN, ZH, JA, DE, FR, ES, IT, RU; reserve roughly 30 percent extra width for German/French. The Chinese version should not appear simultaneously with the English in the same pill — only when the active language is Chinese.

Typography: clean modern sans-serif for primary and secondary; editorial serif italic for tertiary. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent on primary border / hover fill / focus ring. No cinnabar red. No SaaS green. No filled bright blue button.
```

## 11. 接收标准

- 主 CTA 是 editorial 描边 pill；副 CTA 是 text-icon；不并列两色块。
- 副 CTA WhatsApp glyph 是单色 ivory，不是品牌绿。
- Tertiary 文字链 italic + arrow，与正文区分明显。
- 三个变体（hero 完整 / nav 紧凑 / 详情底部）都给出。
- 桌面 + 移动两态都给出。
- 多语言不破布局。
- 不命中 §2 任何反竞品禁用项。
