# M-TRUST-FOOTNOTE — 信任脚注（Trust Footnote Strip）

> 模块 ID：M-TRUST-FOOTNOTE  
> 出现位置：M-HERO 底部一线；行程详情页底部、目的地详情页底部、表单页 sidebar、咨询确认页。  
> 第一轮模块。承担“克制信任”——不以奖项墙形式存在的信任带。

---

## 1. 业务目标

- 替代 chinahighlights.com 风的奖项 logo + 评分大数字堆叠。
- 用 3–4 条编辑型小字告诉访客：本地、双语、全程、免费咨询。
- 给那些“想要再确认一下” 的访客一个轻微的信任 lock-in。

## 2. 反竞品要点

不允许：

- TripAdvisor / WTA / 米其林等 logo 平铺。
- “98.8% 5-star” 大数字饰带。
- 弹窗式 testimonial。
- 跟 M-FOOTER 法务区视觉混淆。

要做：

- 一行 / 一带 editorial 小字 + 极简 hairline 分隔。
- 与 M-HERO 主图底部融合，不像独立段。
- 不放 icon；如果加，必须是单色 hairline 12px。

## 3. 信息结构

默认 4 条文案：

1. `Local China travel advisors, on the ground` / `本地中国旅行顾问，全程在中国`
2. `Bilingual / multi-lingual support` / `中英双语，多语种可选`
3. `Routes, hotels, transport, tickets — handled` / `行程、酒店、交通、门票全包`
4. （客户引述位，替代奖项墙；引述 + 真名首字母 + 行程标签，**不出现完整姓名 / 头像 / 评分数字**）：
   - 英文：`"They built a quiet 12 days through Yunnan that felt designed for us." — J.K., USA`
   - 中文：`「他们用 12 天给我们安排了一段安静的云南，像是为我们量身定的。」— J.K.，美国`
   - 文案可由运营按月轮换，但格式锁死：≤ 28 个英文 word；首字母 + 国家/城市；末尾 12px ivory 50% 行程标签 italic。

变体 A（hero 底部一线）：

- 单行水平排布；条目之间 24px + 1px ivory 12% 竖线；总高 36–40px。
- 字号 12–13px，ivory 70%，sans-serif。
- 不含 icon。
- 在 hero 底部 24–32px 处贴 hero 主图，但保留可读性。

变体 B（详情页底部条带）：

- 4 条以编辑型一行 + 一行 italic 注解的形式排版，分两组各 2 条，组间用 1px ivory 8% 横线分隔；总高 96px；charcoal blue 86% 半透；6% 颗粒；圆角 16px；与 M-DUAL-CTA 同水平区。
- **不放 4 项 icon band**（避免 SaaS 信任带）；每条左侧改成 8px 数字编号 ivory 35%（01 / 02 / 03 / 04），不是 icon。
- 中文 / 英文同条排版：英文为主行，中文以 italic 11px ivory 50% 紧贴下方。

变体 C（表单页 sidebar）：

- 垂直堆叠，4 行，编辑型小字；每行间距 16px；不带 icon。
- 顶部一句 italic：`Why travelers trust us` / `他们为什么信任我们`。
- 不带评分 / 数字。

## 4. 视觉

- 文字颜色：ivory 70%；hover 时上浮一档（4%）；不变色块。
- 分隔：1px ivory 12% 竖线（变体 A）/ 1px ivory 8% 横线（变体 C）。
- 图标（仅变体 B）：不使用 icon band；每条左侧用 8px 数字编号 ivory 35%（01–04）作为编辑型节奏，不是图标墙。
- 不要阴影；不要徽标块。

## 5. 状态

- Default
- Hover（仅文案微提亮，不变下划线）
- Reduced motion：直切，不渐变

## 6. 行为

- 不可点击（不是 link）。它是“注解”，不是 nav。
- 例外：变体 C 顶部 italic 标题可作为 anchor，链到 `/about/responsible-travel`。
- 多语言：4 条文案模板字段化；可由运营覆盖一条或全部。

## 7. 与其他模块的关系

- M-HERO：变体 A 内嵌；与 M-DUAL-CTA、M-VISA、M-DESTINATION-TILES 留 ≥16px 间距。
- M-DUAL-CTA：M-TRUST-FOOTNOTE 不抢点击；视觉权重最低。
- M-FOOTER：footer 已有 newsletter / 法务 / 社交，不重复 trust 短句；twin reading 时确认不冗余。
- M-CONCIERGE-NOTE：concierge note 内 helper 文案 `We reply within 4 hours` 与 M-TRUST-FOOTNOTE 文案语调一致但内容不同；不要互抢。

## 8. 移动端

- 变体 A：折成两行 × 2 条；竖线分隔变成中间点。
- 变体 B：4 条折成 2x2 网格；图标保持。
- 变体 C：保持垂直堆叠，行距适当压缩。

## 9. Figma Make Prompt（粘贴用，英文）

```
Design a "trust footnote strip" component for a premium China inbound travel website. Editorial cinematic mood. Soft ivory 70 percent text. Charcoal blue translucent context. No badge wall. No award trophies. No 5-star ratings. No big numbers. No filled cards.

Provide three variants.

Variant A - hero bottom line, single row:
- Width 1100, height 40. Four bilingual entries separated by 1px ivory 12 percent vertical hairlines:
  1. "Local China travel advisors, on the ground / 本地中国旅行顾问，全程在中国"
  2. "Bilingual / multi-lingual support / 中英双语，多语种可选"
  3. "Routes, hotels, transport, tickets — handled / 行程、酒店、交通、门票全包"
  4. A short customer quote slot, treated as an editorial micro-pull-quote (NOT an award badge, NOT a star rating): an italic English line "\"They built a quiet 12 days through Yunnan that felt designed for us.\" — J.K., USA" followed by a Chinese italic line "「他们用 12 天给我们安排了一段安静的云南，像是为我们量身定的。」— J.K.，美国". Initials only, no full name, no avatar, no rating numbers.
- Text size 12-13px, sans-serif, ivory 70 percent. No icons. No hover underline.

Variant B - itinerary / destination page bottom band:
- 96 high. Charcoal blue 86 percent translucent surface, subtle film grain, 16 radius. The same four entries arranged as two pairs split by a 1px ivory 8 percent horizontal hairline. Do NOT use a 4-item icon band — instead, prefix each entry with a small 8px ivory-35% editorial numeral "01 / 02 / 03 / 04" as quiet rhythm. Bilingual labels render as one English line in 13px sans-serif ivory 80% with a tighter 11px Chinese italic line ivory 50% beneath, both flush left under the numeral.

Variant C - form page sidebar:
- 280 wide vertical stack. Top line in italic editorial serif: "Why travelers trust us / 他们为什么信任我们" with a faint underline. Below it, the four entries stacked vertically, no icons, ivory 70 percent text, 16 line spacing, separated by 1px ivory 8 percent rules.

Provide desktop (1440 context) and mobile (375 context) for each variant. Variant A wraps to a 2x2 grid on mobile with thin dot separators between rows. Variant B keeps the two-pairs structure on mobile but stacks the pairs vertically with the same numeral prefixes — never an icon band. Variant C keeps vertical stacking with tighter spacing.

Typography: editorial serif italic only on Variant C heading; otherwise clean modern sans-serif. Color palette: charcoal blue, mist gray, soft ivory. No cinnabar red. No SaaS green. No filled badge cards. No award icons.

Hard reject (5.5 negative prompt 兜底): Reject any SaaS dashboard, Material Design panel, white app card, KPI tile, badge band, or equal-grid layout; regenerate as cinematic editorial travel composition.
```

## 10. 接收标准

- 没有奖项 logo / 大数字 / 评分饰带。
- 三个变体都给出，桌面 + 移动两态都给出。
- 文字 ivory 70%，编辑型，hover 不变色块。
- 与 M-FOOTER 文案 / M-CONCIERGE-NOTE helper 不重复。
- 不命中 §2 任何反竞品禁用项。
