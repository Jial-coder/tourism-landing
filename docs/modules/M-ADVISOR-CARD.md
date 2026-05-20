# M-ADVISOR-CARD — 顾问名片（Local Advisor Card）

> 模块 ID：M-ADVISOR-CARD  
> 出现位置：M-HERO 内嵌，与 M-CONCIERGE-NOTE 合成 concierge unit；行程详情页底部；目的地详情页底部；顾问列表页 `/advisors`；账户中心“我的顾问”。  
> 第一轮模块。它把抽象的 4-on-1 服务承诺替换为“一个真实的人”。

---

## 1. 业务目标

- 让访客感知“真有一个人会回我”，从而提升留联系方式的意愿。
- 把信任从奖项 logo 转移到具体顾问的脸 / 名字 / 语言 / 擅长领域。
- 与 M-CHAT-LAUNCHER（站内聊天）+ M-DUAL-CTA 副 CTA（WhatsApp 直聊）协同，形成多通道直达。

## 2. 反竞品要点

不允许：

- LinkedIn 风证件照大头。
- 抽象 4 角色服务包（personal designer / storyteller / driver / 24x7）继续做主表达。
- 无姓无名的“Your travel expert”泛指。
- 把顾问名片做成大色块按钮，让点击像“立即下单”。
- 同时塞 5 个联系方式图标。

要做：

- 真实摄影感的小幅人像（侧脸 / 室内自然光 / 工作中），裁成 1:1 或 4:5。
- 真实姓名 + 头衔 + 语言 + 擅长目的地 + 一条直聊入口。
- 视觉与 M-CONCIERGE-NOTE 同源；在 hero 内是 concierge unit 的“人”侧。
- 全站通用样式：完整版 / 横向变体 / mini 行版三态。

## 3. 信息结构

完整版（hero / 详情页底部 / 顾问列表）：

- 头像区：1:1 或 4:5，宽 96px，圆角 16px；摄影风（参考 `mood-only/service/05_local_advisor_planning.png` 风格）；不要去背景剪裁。
- 姓名行：`Lin · Senior China Travel Advisor` / `Lin · 资深中国旅行顾问`，主色 ivory，serif。
- 语言行：`English · 中文 · 1 more`（具体语种以顾问真实掌握为准；不要在 Phase 1 brief 里硬写 `Español`，i18n-launch-plan §1 仍把 ES 列为 coming soon），12–13px sans-serif，ivory 65%。
- 擅长行：`Nature & remote regions in Sichuan / Yunnan` / `四川、云南自然秘境`。
- 一句话价值观（可选）：editorial italic 12px，最多 1 行，例如 `I plan trips I'd take myself.`。
- 直聊入口：一行水平按钮组：
  1. `Talk to Lin on WhatsApp`（次要 pill，与 M-DUAL-CTA 副 CTA 同源；但与 M-DUAL-CTA 副 CTA "WhatsApp · Local Advisor on Duty" 不冗余 — 副 CTA 走值班池，本卡走 Lin 本人）。
  2. `Open chat in-site`（站内聊天 mini 文字链，与 M-CHAT-LAUNCHER tooltip "Chat with our concierge desk" 同语义但走 Lin 个人通道）。
- 在线状态点：头像右下 alpine blue 6px 圆点（在线）/ mist gray 半透（离线）。
- 不放星级、不放评价数字、不放“已服务 X 人”。

横向变体（行程详情底部 / 目的地详情底部）：

- 头像 64px + 姓名 + 一行擅长 + WhatsApp 文字按钮，单行布局，宽满栏。
- 移动端折成两行：第一行头像 + 姓名 + 状态点；第二行擅长 + WhatsApp。

mini 行版（M-AUTH-ENTRY 已登录下拉里 / M-CHAT-PANEL 顶 / 列表预览）：

- 头像 32px + 姓名 + 在线点；不显示语言 / 擅长。
- 用于上下文已知时只做提醒。

## 4. 状态

- Default：在线 + 完整资料展示。
- Offline：在线点变 mist gray；WhatsApp pill 文案不变，但 helper 小字提示 `Lin replies within 4 hours.`。
- Loading：头像处 ivory 6% 占位；姓名为 ivory 12% 占位 bar；不闪烁。
- Empty data：仅在顾问临时不可用时显示通用顾问“our local team”，但仍带头像组合（多人剪影），不要写“unknown”。
- Reduced motion：禁用呼吸光晕、禁用头像 hover 微缩放。

## 5. 交互

- Hover 头像：极淡 ivory 6% 描边淡入；不放大。
- 点击头像 / 姓名：跳转 `/advisors/:slug` 顾问个人页。
- 点击 WhatsApp pill：打开 `wa.me/?text=...`（带预填语句：`Hi Lin, I'd like to plan my China trip.` / `你好 Lin，我想规划一次中国旅行。`），新标签。
- 点击站内聊天文字链：触发 M-CHAT-PANEL 打开，预选当前顾问。
- 多语言切换：所有文案、擅长描述跟随 M-LANG 更新；姓名保留原拼写。

## 6. 数据规范

每张顾问卡背后的数据建议字段：

```
{
  "slug": "lin",
  "displayName": "Lin",
  "title": "Senior China Travel Advisor",
  "languages": ["English", "中文", "1 more (TBD by real advisor)"],
  "specialty": "Nature & remote regions in Sichuan / Yunnan",
  "tagline": "I plan trips I'd take myself.",
  "avatar": "real-photo path",
  "online": true,
  "whatsapp": "+86xxx",
  "wechatId": "lin_advisor",
  "intentPrefill": {
    "en": "Hi Lin, I'd like to plan my China trip.",
    "zh": "你好 Lin，我想规划一次中国旅行。"
  }
}
```

数据进 `attribution.json`（参考 `REAL-IMAGE-SOURCING.md`），头像来源标注真人摄影 / 已签授权。

## 7. 移动端

- 完整版整体宽度 = 容器 - 32px；头像 80px；姓名 / 擅长字号下调 1 阶。
- 横向变体折两行；保留 WhatsApp pill 在第二行右侧。
- mini 行版始终保持单行。
- 浮按钮重叠：保持与 M-CHAT-LAUNCHER 留 24px 安全间距。

## 8. 与其他模块的关系

- M-CONCIERGE-NOTE：concierge unit 的一半；hero 内必须紧贴或下叠堆叠。
- M-CHAT-LAUNCHER：浮按钮默认指向值班顾问池；M-ADVISOR-CARD 命中后聊天面板预选具体顾问。
- M-DUAL-CTA：副 CTA WhatsApp 与 M-ADVISOR-CARD 的 WhatsApp pill 不冗余——副 CTA 走值班池，M-ADVISOR-CARD 走具体顾问。
- M-AUTH-ENTRY：登录用户的“我的顾问”关系展示在下拉与账户中心。
- M-FOOTER：不重复放顾问 grid；顾问 grid 在 `/advisors` 页与 hero / 详情底部。

## 9. Figma Make Prompt（粘贴用，英文）

```
Design a real local-advisor card for a premium China inbound travel concierge website. Width 320 (full variant). Editorial cinematic mood. Charcoal blue 88 percent translucent surface with subtle film grain, 18 radius, 1px ivory 8 percent stroke, single soft drop shadow. No LinkedIn-style headshot. No award stars. No "served X travelers" counter.

Layout, full variant:
- Top: a 96 square avatar with 16 radius. Photo style: documentary, side-three-quarter, indoor natural light, the advisor working at a wooden desk with a paper map. Real-photo realism, no AI poster gloss.
- A small alpine blue 6px dot at the avatar's bottom-right denotes online; switch to mist gray semi-transparent for offline.
- Name line: "Lin · Senior China Travel Advisor" in soft ivory editorial serif, with a small Chinese version "Lin · 资深中国旅行顾问" beneath in 12-13px serif Chinese ivory 80 percent.
- Languages line: "English · 中文 · 1 more" in 12-13px clean sans-serif, ivory 65 percent. Do NOT render "Español" in this Phase 1 prompt — Spanish is still listed as coming-soon in i18n-launch-plan §1; the advisor can have a real third language but the Phase-1 brief leaves it as "1 more" until the real advisor is on board.
- Specialty line: "Nature & remote regions in Sichuan / Yunnan" in 14px sans-serif ivory 80 percent. Chinese support: "四川、云南自然秘境".
- Optional italic editorial line: "I plan trips I'd take myself." 12px italic, ivory 70 percent.
- Action row: a quiet pill labeled "Talk to Lin on WhatsApp" with a faint WhatsApp glyph (no neon green button), 1px alpine blue 70 percent stroke, transparent fill; to its right a small text link "Open chat in-site →".

Provide four representations:
1. Full variant 320 wide, online state.
2. Full variant offline state with mist gray dot and helper line "Lin replies within 4 hours.".
3. Horizontal variant for itinerary / destination page bottom: 64 avatar + name + one-line specialty + WhatsApp pill, single row, 720 wide; on mobile 343 wide it wraps to two lines (avatar + name + dot, then specialty + WhatsApp).
4. Mini row variant for use inside chat panel headers and account dropdown: 32 avatar + name + dot, single line, 240 wide.

Mobile (full variant) 343 wide: avatar 80, type sizes scaled down by one step, action row keeps WhatsApp pill plus in-site chat link.

Typography: editorial serif for name; clean modern sans-serif for languages, specialty, tagline, buttons. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent only on online dot and WhatsApp pill stroke. No cinnabar red. No neon WhatsApp green. No filled SaaS pills.
```

## 10. 接收标准

- 真实摄影头像感，不是证件照风。
- 在线 / 离线状态点 ≤6px、克制不闪烁。
- 完整 / 横向 / mini 三态都给出。
- 与 M-CONCIERGE-NOTE 视觉一体。
- WhatsApp pill 不抢主 CTA；与 M-DUAL-CTA 副 CTA 区分清楚（一个走具体顾问，一个走值班池）。
- 桌面 + 移动两态都给出。
- 不命中 §2 任何反竞品禁用项。
