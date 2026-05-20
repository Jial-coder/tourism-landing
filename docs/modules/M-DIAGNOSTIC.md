# M-DIAGNOSTIC — 诊断式入口 pills（Diagnostic Entry Pills）

> 模块 ID：M-DIAGNOSTIC  
> 出现位置：M-HERO 内部下半身；详情页底部、关键长页中段可复用作为“另一种入口”。  
> 第一轮模块，承担首屏对“没想好的人”的软分流。

---

## 1. 业务目标

- 面向最大流量人群：海外游客 / 海外华人，目的地不明、行程长度不定、伴行人不定。
- 用 4 条软分流让他们 0.5 秒内自我归类，不强迫填表单。
- 与 M-DUAL-CTA / M-CONCIERGE-NOTE 形成漏斗：还没想好 → 软 pill → 半步个性化 → 留联系。
- 反竞品 chinahighlights.com 单一 “Start Your Journey” 表单的硬入口模式。

## 2. 反竞品要点

不允许：

- 把 pills 做成 SaaS 主按钮（大色块、强对比 fill）。
- 一行塞 8 条选项 / 自动横滑无止境。
- 选项是“城市名”：北京 / 上海 / 西安。这是 SEO 思路，不是诊断。
- pills 命中后跳转去同一个长表单。

要做：

- 4 条软 pill，固定排布，不轮播。
- 每条 pill 命中后进入对应的 funnel：
  - 还没想好 → 兴趣 / 季节 / 节奏 三步 lite quiz。
  - 只有 10 天 → 推荐 10 天样板行程页 + 行程对比抽屉。
  - 带孩子 → 家庭主题页 + 顾问筛选 “family”。
  - 想看自然 → 自然主题目的地总览 + 自然顾问。
- 每条 pill 的下游页都比 chinahighlights 的同类页更短、更视觉化。

## 3. 信息结构

视觉：

- 一行 pill 行，水平居中或左对齐贴 headline 下沿（取决于 hero 设计），距离 headline 24–32px。
- 每个 pill 圆角 999px；高度 36–40px；左右 padding 18–24px。
- 描边：1px ivory 18%；填充：charcoal blue 60% 半透；hover 时 underline 淡入。
- pill 内部：英文主文 14px sans-serif + 中文小字 12px ivory 60%（一行内并列，中间用 thin slash 或竖线）。
- pill 之间间距 12px；移动端横滚一行 + 两端 fade。
- 不允许 icon。允许极小尾箭头 →（仅 hover 时显示）。

四条默认 pill（与 v4 prompt 一致）：

1. `Not sure where to go / 还没想好`
2. `Only 10 days / 只有 10 天`
3. `Traveling with kids / 带孩子`
4. `Nature, not cities / 想看自然`

可选第五（不上首屏，用在内页）：

- `I want a quieter trip / 想要安静一点`
- `First time in China / 第一次来中国`
- `Returning traveler / 第 N 次来中国`
- `On a budget / 预算有限`

## 4. 行为

- 默认：静态显示。
- Hover：底边 1px ivory underline 淡入；pill 文字提亮 4%；尾箭头微出现。
- Active（被点击但还在加载下游）：pill 描边变 ivory 40%。
- 命中后：跳转目标页 / 打开 lite quiz drawer，不做全屏 loading。
- 多语言：切换语种后两栏文字同时更新；中文 pill 右栏可在非中文语种下隐藏。
- A/B 实验位（后期）：4 条 pill 文案可由实验配置覆盖；UI 不变，仅文案换。

## 5. 状态

- Default
- Hover / Focus
- Active（点击中）
- Disabled（lite quiz 配置缺失时；最多隐藏，不显示灰色）
- 横滚 fade（移动端两端边缘渐隐，提示可滑）

## 6. 移动端

- 一行横滚；两端 8px ivory 渐隐 mask 提示可滑。
- pill 高度 36px；不允许换行成两层。
- 触感反馈：点击时短闪一次描边亮度，无震动。

## 7. 与其他模块的关系

- M-HERO：M-DIAGNOSTIC 是 hero 的下半身锚，必须出现在 hero 内。
- M-VISA：visa hint chip 与 M-DIAGNOSTIC 同水平区域时，hint 在上、pills 在下，间距 ≥ 16px。
- M-CONCIERGE-NOTE：诊断 pill 命中后引导用户到对应 funnel；最终都汇回 concierge note 收联系方式。
- M-DUAL-CTA：诊断 pill 与主副 CTA 不抢点击；视觉权重低于 CTA。
- M-LANG：每条 pill 必须在所有支持语种下不破布局。

## 8. Figma Make Prompt（粘贴用，英文）

```
Design a row of 4 soft "diagnostic entry" pills used inside a cinematic editorial travel hero. Frame width 1100, height 64. Editorial cinematic mood. Charcoal blue translucent background context. Soft ivory text. No SaaS button look. No icons. No badges.

Each pill: 999 radius, 38 high, 1px ivory 18 percent stroke, charcoal blue 60 percent translucent fill. Inside: English label at 14px clean sans-serif, separated by a thin vertical bar, then Chinese label at 12px ivory 60 percent. The four pills, in order:
- "Not sure where to go | 还没想好"
- "Only 10 days | 只有 10 天"
- "Traveling with kids | 带孩子"
- "Nature, not cities | 想看自然"

Provide three states. Default state: static, no underline, no arrow. Hover state: a 1px ivory underline fades in beneath the pill, the text brightens by 4 percent, and a tiny right-arrow glyph appears at the end of the label. Active state (mid-click): pill stroke deepens to ivory 40 percent.

Provide a desktop 1100 wide row, and a mobile 343 wide horizontal-scroll row where the four pills sit on a single line that scrolls horizontally with subtle 8px fade masks at both ends. Do not collapse to two rows.

Typography: clean modern sans-serif. Color palette: charcoal blue, mist gray, soft ivory. Alpine blue accent only on the focus ring (2px outside, accessibility). No cinnabar red. No fill color blocks. Do not include icons.
```

## 9. 接收标准

- 4 条 pill 默认横向单行，文字两栏并列。
- 不像 SaaS 主按钮、不像 badge、不带 icon。
- Hover / Active 状态克制，不变成色块。
- 移动端单行横滚 + 两端 fade，不折成多行。
- 多语言切换后所有 pill 不破布局。
- 与 M-HERO 内部 24–32px 间距一致。
