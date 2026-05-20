# M-CONCIERGE-NOTE — 咨询便签（Concierge Inquiry Note）

> 模块 ID：M-CONCIERGE-NOTE  
> 出现位置：M-HERO 右下作为 concierge unit 主体；列表页 / 详情页底部精简变体；行程详情页中段精简变体。  
> 第一轮模块。承担首屏低门槛收联系信息的核心模块，是漏斗的“软杯口”。

---

## 1. 业务目标

- 让没填完整长表单意愿的访客也愿意留下一两条信息：去哪 / 时间 / 人数 / 联系方式。
- 与 M-DIAGNOSTIC 软分流互补：诊断 pill 帮“没想好”的人入门；concierge note 帮“想好一点点”的人留言。
- 反竞品 chinahighlights.com 的“Start Your Journey”单一长表单。

## 2. 反竞品要点

不允许：

- 大白色 SaaS 表单卡盖在 hero 上。
- 强制必填多字段 / 标红错误提示满屏。
- “Submit / Send Inquiry” 按钮独占视觉权重。
- 把它做成主 CTA 抢 M-DUAL-CTA 风头。
- 把它跟 M-ADVISOR-CARD 拆成两张并排卡。

要做：

- 视觉像“旅行便签”/“itinerary slip”，半透 charcoal blue + 极淡颗粒。
- 字段尽量少，4 条以内；用 single line 标签，不带 *。
- 与 M-ADVISOR-CARD 合成 concierge unit；用户感知是“给某个真人留言”。
- 多入口接入：M-HERO 主、M-DIAGNOSTIC 命中后弹出、M-FOOTER newsletter 区下、详情页底部 mini 变体。

## 3. 信息结构

完整变体（hero / 详情 / 表单页底部）：

- 顶部一句邀请：`Tell Lin where you'd love to go.` / `告诉 Lin 你想去哪里。`（顾问名跟 M-ADVISOR-CARD 联动）。
- 4 个字段，垂直堆叠，单行：
  1. `Where do you want to go?` / `想去哪里？`（自由文本，自动建议张家界 / 桂林 / 九寨沟 / 云南 / Beijing / 我还不确定）
  2. `When are you traveling?` / `什么时候出发？`（month picker + “还不确定” pill）
  3. `How many travelers?` / `几人同行？`（数字 stepper，含 “含儿童” 子选项）
  4. `WhatsApp / WeChat / Email`（智能识别输入；不要拆三个字段）
- 字段下编辑型小字 helper：
  - `No fixed plan yet? Send us your rough idea.`
  - `还没确定路线也没关系，先告诉我们你的大概想法。`
- 提交按钮：克制 pill，文案 `Send to Lin` / `发给 Lin`，与 M-DUAL-CTA 主 CTA 视觉同源但权重低 1 档（更小、更窄）。
- 隐私小字：`We reply within 4 hours during China daylight.` / `中国白天 4 小时内回复。`

精简变体（mini，列表页 / 详情页中段）：

- 一行 input + pill：`Tell us where you'd love to go in China` + `Send →`。
- 提交后展开剩余 3 字段，作为 progressive disclosure。
- 不与 M-CHAT-LAUNCHER 浮按钮重叠。

## 4. 视觉

- 容器：360 宽（hero 完整变体），charcoal blue 88% 半透 + 6% 颗粒，圆角 18px，1px ivory 8% 描边，单层柔光阴影。
- 背景叠加：可选一条对角 ivory 6% 折痕线，模拟便签纸纹（仅 hero 用）。
- 字段输入：透明背景，1px ivory 12% 下边线，无圆角填充；focus 时下边线变 alpine blue 50%，无外围 ring 厚壳。
- helper 文：12–13px ivory 60% / 中文 ivory 55%。
- 提交 pill：高 36px，alpine blue 70% 描边 + 透明填充，hover 填充 alpine blue 18%。

## 5. 状态

- Empty default：所有字段空，提交 pill 可点（允许只填 1 项，提示“至少留下联系方式”）。
- Filled progressive：每填一项 helper 文案微调，比如已填联系方式后 helper 变 `Lin will text you back.`。
- Submitting：pill 变 ivory 进度环；其它字段锁定但保留可见。
- Success：整张 note 渐隐，替换为 confirmation 视觉（与 M-CONFIRMATION-VIEW 同源缩略），含“Lin will reply within 4 hours.”。
- Error：字段下出现 ivory 70% 编辑型小字；不要红色填充；不闪烁。
- Reduced motion：渐变 / 微动画一律降到 ≤ 100ms 直切。

## 6. 行为

- 字段验证软门槛：只校验联系方式格式（是否像 WhatsApp 号 / Email），其它字段可空。
- 智能识别 WhatsApp / WeChat / Email：纯数字判 WhatsApp；含 @ 判 Email；含 wxid_ 或 中文备注判 WeChat。
- 与 M-ADVISOR-CARD 联动：当 M-ADVISOR-CARD 的“Lin”在线时，邀请文案显示 Lin 的名字；离线则换通用 `our local advisor`。
- 与 M-DIAGNOSTIC 联动：诊断 pill 命中后预填“去哪 / 时间”预设；用户可改。
- 与 M-CHAT-LAUNCHER 联动：用户在 concierge note 填一半离开，2 分钟后聊天浮按钮的 tooltip 微温柔提醒 `Want help finishing your trip idea?`，不弹窗。

## 7. 移动端

- 完整变体：宽度满栏 - 32px 留白；垂直堆叠 4 字段；提交 pill 满栏宽不超 320px。
- mini 变体：单行 input + 圆形 → 按钮（直径 36）。
- 自动聚焦联系方式字段，不弹键盘到 hero 顶部。

## 8. 与其他模块的关系

- M-HERO：完整变体内嵌；不允许 hero 同时显示 mini 变体。
- M-ADVISOR-CARD：concierge unit 的另一半；视觉一体；在小屏下可堆叠。
- M-DUAL-CTA：M-CONCIERGE-NOTE 提交按钮权重低于主 CTA；不要同时强引导。
- M-DIAGNOSTIC / M-VISA：作为 concierge note 的上游入口与上下文。
- M-AUTH-ENTRY：未登录用户提交后温和提示注册以保存草稿；可跳过。

## 9. Figma Make Prompt（粘贴用，英文）

```
Design a "concierge inquiry note" component for a premium China inbound travel website. Width 360, height auto. Editorial cinematic mood. Charcoal blue 88 percent translucent surface with subtle film grain and a faint ivory 6 percent diagonal crease line, 18 radius, 1px ivory 8 percent stroke, single soft drop shadow. No SaaS form card. No big white background.

Top: a single editorial invitation line "Tell Lin where you'd love to go." with a Chinese support line "告诉 Lin 你想去哪里。" in slightly smaller serif Chinese.

Then four vertical fields, each as a transparent input with a 1px ivory 12 percent bottom rule (no rounded filled box). Labels live as floating placeholders.
1. "Where do you want to go? / 想去哪里？" (free text + suggested chips: Zhangjiajie / Guilin / Jiuzhaigou / Yunnan / Beijing / Not sure)
2. "When are you traveling? / 什么时候出发？" (month chip selector with a "Not sure / 还不确定" pill)
3. "How many travelers? / 几人同行？" (numeric stepper with a "Including kids / 含儿童" toggle)
4. "WhatsApp / WeChat / Email" (one smart input that adapts)

Below the fields, helper text in two languages at 12-13px ivory 60 percent: "No fixed plan yet? Send us your rough idea." / "还没确定路线也没关系，先告诉我们你的大概想法。"

Submit pill: 36 high, alpine blue 70 percent stroke, transparent fill, label "Send to Lin / 发给 Lin", visually quieter than the primary M-DUAL-CTA above. To its right or below, a 12px privacy note "We reply within 4 hours during China daylight. / 中国白天 4 小时内回复。"

Provide four states.
- Empty default.
- Half-filled progressive (helper text adapts to "Lin will text you back.").
- Submitting (pill replaced by ivory progress ring; fields softly disabled but still visible).
- Success (entire note fades into a small confirmation block: a tiny ivory check, line "Lin will reply within 4 hours.", and a quiet text link "Open chat with Lin").

Also provide a "mini" inline variant: a single horizontal input "Tell us where you'd love to go in China" with a 36 round arrow button "Send →"; on click, expand to reveal the remaining three fields below as progressive disclosure.

Provide desktop 360 wide and mobile 343 wide states. Mobile uses full-width minus 32 padding, vertical stack; mini variant becomes a single-row input with a 36 round button.

Typography: editorial serif for the invitation line; clean modern sans-serif for fields, helper, button, privacy note. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent only on focus underline and submit pill border. No cinnabar red. No SaaS green check. No bright error red — use a quiet ivory 70 percent inline note for errors.
```

## 10. 接收标准

- 视觉像 travel note，不像 SaaS 表单卡。
- 4 字段以内，提交按钮权重低于主 CTA。
- 提供完整变体 + mini 变体两种形态。
- Empty / 半填 / 提交中 / 成功四态都给出。
- 与 M-ADVISOR-CARD 视觉成 concierge unit。
- 桌面 + 移动两态都给出。
- 不命中 §2 任何反竞品禁用项。
