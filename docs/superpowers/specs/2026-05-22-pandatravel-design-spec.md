---
id: pandatravel-design-spec-v1
type: design_spec
status: draft
confidence: medium
projects: [tourism-landing]
created: 2026-05-22
author: team-lead (Claude Opus 4.7)
reviewers_pending: [codex, user]
related:
  - 2026-05-21-tourism-lead-generation-design.md
  - stage-2-differentiation-principle.md
  - qa/ui-ux-review/detail-tokens/2026-05-21-detail-tokens-review.md (factual input)
  - C:/Users/Administrator/.claude/tmp/search/chinahighlights/REFERENCE-PACKET.md (competitor)
---

# pandatravel 整站设计 spec — v1 (lead draft)

## 0. Spec 守则

本 spec 由 team-lead 基于事实层素材自己起草，不外包给 worker。

- 每个决策点给出 lead 推荐 + 理由 + 候选方案（如有），用户保留拍板权
- 文案 0 抄竞品。结构和视觉决策可参考竞品（公共设计语言无版权）
- 数据点全部 mock 占位 + MockBadge 守门
- 设计先于实现：本 spec 通过 + codex 交叉验证 + 用户拍板，才进 Phase 2 实现
- spec 是活文档，每个 phase 完成后回写"实际落地与 spec 偏差"

---

## 1. 业务定位与 persona

### 1.1 业务模型（不重写 spec，复述强调）

pandatravel 是面向**海外游客来中国定制旅行**的 lead-generation 落地站。

- **不是** booking engine（不直接收钱、不卖标准包）
- **不是** 攻略博客（攻略只是入口，目的是引导留资）
- **是** 1:1 顾问询价漏斗（访客 → 内容引导 → 留资 → 顾问承接 → 定制方案 → 离站签约）
- 高客单价（USD 3K-15K /人）+ 长决策链（7-30 天考虑期）+ 强信任前置

### 1.2 用户 persona

由于真实用户数据为 0，先按 spec §3 已确认假设 + chinahighlights 业务模型，定 3 个核心 persona：

#### P1 「Daniel · 35 岁澳洲律师」 — 高决策意向、中等预算
- 已经在考虑来中国 14 天，预算 USD 8K /人，第一次来
- 担心：语言、食物、城市间交通、签证、行程合理性
- 来源渠道：Google "private china tour 14 days" / "best time to visit china"
- 决策模式：读 3-5 个网站对比 → 询价 2-3 家 → 选 1 家
- 我们对他的差异化承诺：**北京顾问真人 4h 内回**（chinahighlights 是 1 working day）

#### P2 「Sarah & Mike · 30 岁美国蜜月夫妇」 — 高客单价、感性决策
- 蜜月行 10 天，预算 USD 12K /人，看重体验质量与故事感
- 担心：是否过于游客化、私密度、住宿审美
- 来源渠道：Pinterest / IG / "honeymoon china private"
- 决策模式：被视觉与故事吸引 → 询价 1-2 家深聊 → 选审美对的
- 我们对他的差异化承诺：**editorial cinematic 视觉 + 真人顾问 vlog**

#### P3 「Wei · 28 岁新加坡华人」 — 短决策链、144h 免签触发
- 商务出差延伸，144h 免签游北京/上海周边
- 担心：行程紧凑、效率、值不值得 144h 折腾
- 来源渠道：Google "144 hour visa free china tour" / 华人社群推荐
- 决策模式：3 天内决定，要"开箱即用"方案
- 我们对他的差异化承诺：**144h 免签 ready-made 短行程 + 即时 WhatsApp 顾问**

### 1.3 跟 chinahighlights 的关系

不是抄题，是 **co-exist** + **find a niche**：

| 维度 | chinahighlights | pandatravel v1 |
|---|---|---|
| 经营年限 | 16+ | 0（早期） |
| 内容深度 | 28 城 × 12 月 × 6 主题 = 2000+ 静态页 | 8 城 × 4 主题 + 3 个核心攻略 |
| 客户体量 | 10K+ 真实评价 | 0，需 mock 占位 + 早期叙事 |
| 顾问承诺 | 1 working day reply（多顾问后台拼装） | 4h reply（北京顾问真人 vlog） |
| 价格策略 | 公开起价 + 5 等级酒店锚点 | 公开起价区间（同样不藏） |
| 视觉路线 | 白底黑字 + 红 CTA + 米黄分区 + 大图 | editorial cinematic + 中国红 + 熊猫品牌钩子 |
| 转化模型 | 49 字段单页询价表 | 5 步 wizard（每步问体验不问参数） |
| 差异化主轴 | "20+ years operating in China" | "4 hour reply from a Beijing-based human advisor" |

**借鉴原则**：结构骨架（信息架构 / 跳转动线 / CTA 节奏）借鉴；视觉、文案、数据全自己来。

---

## 2. 品牌系统：pandatravel

### 2.1 品牌主张（一句话）

> **A Beijing-based human advisor designs your China trip in 4 hours, not a chatbot in 1 working day.**
> 北京本地顾问，4 小时内为你写出第一版中国行程，不是机器人 1 天后的标准答案。

这条主张同时锁定 P1（速度 + 真实人）+ P2（设计感 + 故事）+ P3（即时性）。

### 2.2 品牌资产

| 资产 | v1 形态 | 后期升级 |
|---|---|---|
| Wordmark | `pandatravel` 全小写 | 含 svg panda mark 拼合（等真 logo） |
| Mark | 简化 svg 熊猫脸 + 顶部 #C8102E 红圆点（已落地） | Codex / Midjourney 重制 |
| Domain | pandatravel.com.cn | — |
| Tagline (en) | "China trips designed by a Beijing local, for travelers like you." | — |
| Tagline (zh) | "北京本地顾问，给你的中国之行画一张你自己的地图。" | — |
| Voice tone | 克制、具体、第一人称（"我们 / 顾问 Lin"），不打鸡血 | — |

### 2.3 品牌语气示范（lead 写，不抄）

| 场景 | 不要 | 要 |
|---|---|---|
| Hero 主标 | "Discover the magic of China!" | "和北京顾问把中国玩成你自己的样子" |
| Trust 数字 | "10,000+ happy travelers" | "正在筹建 · 首批旅客招募中" + MockBadge |
| Tour 卡 | "Best Beijing Tour" | "故宫日出 + 长城无人段，4 天" |
| 询价后 | "Thanks for inquiry. Reply within 24h." | "Lin 收到了，会在 4 小时内给你写出第一版思路。" |

---

## 3. 配色 token 重校

### 3.1 现状事实（来自 detail-tokens 报告）

- Path C lock 2026-05-21 已切 body 默认 cream/ink 暖底
- 但 5 个页面（destinations/[slug] / themes/[slug] / sample-10d / itineraries 列表 / plan）仍硬编码 deep-slate 冷底，是漏改 bug 不是设计选择
- 红色 token 在 utility 体系内 0 次出现（只 brand svg 一个内联 #C8102E）
- chinahighlights 主 CTA 实测 #BE192A，证明中国红主 CTA 是赛道常识

### 3.2 决策（lead）

**红色加进 token，详情页冷底改暖底，但保留 1 个暗底 hero 当 cinematic 锚点。**

理由：
- 红色不进 utility = brand 跟产品割裂，pandatravel 名字带"中国"但视觉上看不到中国
- 全站统一暖底 = 失去 cinematic 路线本该有的"安静镜头感"对比；保留 HomeHero 暗底作为锚
- 详情页改暖底 = 跟 layout body 默认对齐，修 Path C lock 漏改

### 3.3 红色 token 落地

```css
/* 新增 — 中国红，主 CTA + brand accent */
--color-vermilion       oklch(0.55 0.20 27)    /* ≈ #C8102E，brand svg 已用 */
--color-vermilion-deep  oklch(0.48 0.20 27)    /* hover / pressed */
--color-vermilion-soft  oklch(0.92 0.05 27)    /* 副分区暖红 / pill bg */
```

**应用规则**：

| 用法 | token | 频次约束 |
|---|---|---|
| 主 CTA bg（"开始定制 / Plan my trip"） | `bg-vermilion text-soft-ivory` | 每页 ≤ 2 处主 CTA，避免红色泛滥 |
| 主 CTA hover/active | `hover:bg-vermilion-deep` | — |
| Brand accent（wordmark 圆点 / 顾问名字下划线 / 关键 stat 数字） | `text-vermilion` | 极简，每屏 ≤ 1 处 |
| 副分区背景（仅 inquiry / lead form 转化区） | `bg-vermilion-soft` | 整站 ≤ 3 区 |
| **不要用于**：正文 / 边框 / icon / hover ring 不抢戏 | — | — |

`jade` 退役主 CTA 角色，降级为**辅 CTA / 链接 hover / focus ring**（focus-visible 仍用 jade，对比度合规）。

### 3.4 详情页 bg 切换

将 `bg-deep-slate text-soft-ivory` → `bg-cream text-ink` 的页面：

```
app/destinations/[slug]/page.tsx
app/themes/[slug]/page.tsx
app/itineraries/page.tsx
app/itineraries/sample-10d/page.tsx
app/plan/page.tsx
app/hero-pick/page.tsx
```

**保留暗底**（cinematic 锚）：
- `HomeHero` 首页 hero — 大图 + 暗渐变蒙版，第一印象
- `PathCFooter` 站底 — 收尾呼应
- 详情页 hero 区**保留全屏 next/image + 暗渐变蒙版**（image 是底，不靠 bg-deep-slate）

### 3.5 实测 contrast matrix（codex review v1 跑出，sRGB 近似）

OKLCH `0.55 0.20 27` 实际渲染近似 `#cc2827`（不是预想的 `#C8102E`）。AA 正文阈值 4.5，AA 大字阈值 3.0，AAA 正文 7.0。

| 组合 | ratio | AA 正文 | AA 大字 | AAA 正文 | 用途 |
|---|---|---|---|---|---|
| **vermilion bg + soft-ivory 字** | 5.20 | ✅ | ✅ | ❌ | 主 CTA — 用 |
| vermilion-deep bg + soft-ivory 字 | 6.93 | ✅ | ✅ | ❌ | 主 CTA hover/pressed — 用 |
| brand `#C8102E` bg + soft-ivory 字 | 5.69 | ✅ | ✅ | ❌ | brand wordmark 圆点（极小）— 用 |
| **vermilion text on cream** | 5.07 | ✅ | ✅ | ❌ | brand accent（数字 / 链接 hover）— 慎用，仅大字 |
| vermilion text on paper | 4.78 | ✅ | ✅ | ❌ | brand accent on paper — 慎用，仅大字 |
| ink on vermilion-soft（暖红副分区） | 13.85 | ✅ | ✅ | ✅ | 副分区文字 — 用 |
| **ivory on vermilion-soft（暖红副分区上的浅字）** | 1.26 | ❌ | ❌ | ❌ | **禁用** — 暖红副分区上不能用浅字 |
| jade ring on cream | 7.75 | ✅ | ✅ | ✅ | focus-visible ring — 用 |
| jade-soft text on cream | 4.47 | ❌ | ✅ | ❌ | 仅大字辅文本 |
| jade text on deep-slate（暗底） | 2.40 | ❌ | ❌ | ❌ | **禁用** — HomeHero / PathCFooter 暗底上不能用 jade 文字 |
| vermilion text on deep-slate（暗底） | 3.66 | ❌ | ✅ | ❌ | 暗底上 vermilion 仅大字 |

**强约束**：
- 主 CTA 永远用 **vermilion bg + soft-ivory 字**（5.20）
- vermilion-soft 副分区永远配 **ink 字**（13.85），不配 ivory 字（1.26 fail）
- 暗底（HomeHero / PathCFooter / 详情页 hero 蒙版）的辅文字必须用 **soft-ivory** 不用 jade（jade on deep-slate 2.40 fail）

**TODO（实施时验证）**：以下组合 codex 没实测，Phase 2.1 worker 实施时用 axe / WebAIM 真测后回写：
- vermilion bg + 详情页 hero 暗渐变蒙版穿透色
- vermilion text on hero 蒙版半透明 deep-slate（蒙版 alpha 影响 contrast）
- focus-visible ring on vermilion bg（ring offset 颜色选择）
- disabled state vermilion → vermilion-soft（disabled CTA 对比度）

### 3.6 暖冷对比规则

任何页面允许 1 个暗段（如 hero 大图 + 蒙版）作为视觉锚，其余全 cream/paper。**不允许整页冷底**。



---

## 4. 整站信息架构（IA）

### 4.1 路由清单

```
/                                  首页（已有，保留 11 section 结构 + 修配色）
/destinations                      城市列表页 ✱ 新增
/destinations/[slug]               城市详情（8 slug：beijing/xian/shanghai/guilin/zhangjiajie/jiuzhaigou/dali/huangshan）
/themes                            主题列表页 ✱ 新增
/themes/[slug]                     主题详情（family / nature / food / history / honeymoon / 144h-visa-free）
/itineraries                       行程列表（已有，扩内容）
/itineraries/[slug]                行程详情（sample-10d 已有 + 新增 visa-free-144h / family-12d / honeymoon-9d）
/best-time                         季节总览页 ✱ 新增
/best-time/[month]                 月份页（jan-dec 共 12，按需求逐步铺）
/reviews                           评价页 ✱ 新增（mock 占位 + 早期叙事）
/about                             关于我们 ✱ 新增（顾问团队 + 承诺）
/plan                              询价 wizard（已有，重构为 5 步）
/visa-free                         144h 免签专题（D2/P3 差异化入口）✱ 新增
```

✱ = v1 必做新增；其余迭代。

### 4.2 页面类型与对应 chinahighlights 类型对照

| 我们 | 借鉴自竞品类型 | 关键差异 |
|---|---|---|
| 首页 | home | 已设计，本轮只动配色 + section 顺序微调 |
| /destinations/[slug] | tour 详情 + city 页 hybrid | 我们城市本身是 tour 入口，不分 city 与 tour 两层 |
| /themes/[slug] | theme 页 | FAQ 嵌入此页（不独立路由） |
| /itineraries/[slug] | tour 详情 | 我们走"已设计样板 + 可改"叙事，不是销售产品 |
| /best-time + /best-time/[month] | best-time + month 双层 | 单页综合 + 月份 deep-link |
| /reviews | reviews 页 | mock 占位 + "首批旅客招募中"早期叙事 |
| /about | about 页 | 顾问 vlog + 真名 + 实地视频差异化 |
| /plan | inquiry 表单 | 5 步 wizard 不是 49 字段单页 |
| /visa-free | 无对应（差异化入口） | P3 触发器，chinahighlights 没有专题 |

### 4.3 跨页跳转动线

```
首页
 ├─ DestinationGrid 卡 → /destinations/[slug]                   (P1 主路径)
 ├─ SampleItineraries → /itineraries/[slug]                     (P1 P2 主路径)
 ├─ Specialists 卡 → /about#advisor-[name] anchor               (信任前置)
 ├─ TrustProofGrid → /reviews                                   (信任深读)
 ├─ HomeHero 副 CTA → ContactChannelList modal                  (高意向急路径)
 └─ HomeHero 主 CTA → /plan                                     (主转化)

/destinations/[slug]
 ├─ Wow Points → 内 anchor
 ├─ Best Time → /best-time/[month] 或 /best-time
 ├─ Nearby → 其他 destinations/[slug] (3-4 个推荐)
 ├─ Sample Itinerary → /itineraries/[slug] (匹配的 1-2 条)
 ├─ Advisor → /about#advisor-[name]
 └─ Tailor-Make CTA × 3 → /plan?destination=[slug]              (主转化)

/themes/[slug]
 ├─ Tour 卡 → /itineraries/[slug]
 ├─ FAQ 嵌入（不外跳）
 └─ Tailor-Make CTA → /plan?theme=[slug]

/best-time + /best-time/[month]
 ├─ 12 月份 → /best-time/[month]
 ├─ 推荐目的地 → /destinations/[slug]
 ├─ 推荐行程 → /itineraries/[slug]
 └─ Tailor-Make CTA → /plan?month=[month]

/visa-free
 ├─ 144h 路线卡 → /itineraries/visa-free-144h
 ├─ 主要城市 → /destinations/beijing|shanghai|chengdu|xian
 └─ Tailor-Make CTA → /plan?type=visa-free

/plan (5 步 wizard)
 ├─ 每步进度 + 可返回
 └─ 提交 → LeadFormSuccess → ContactChannelList

站级 footer（每页都有）
 ├─ 顾问 1:1 承诺 (4h reply)
 ├─ 评价聚合 (mock + MockBadge)
 └─ pandatravel.com.cn
```

每个内容页结尾必有 1-3 个 Tailor-Make 触点（参考竞品 5 触点节奏，我们做轻量版避免 spam）。

---

## 5. 每页结构骨架与 schema

每页给出：章节顺序 + 数据 schema + CTA 节奏 + mock 策略。文案占位由 Phase 2 worker 自己写。

### 5.1 首页 `app/page.tsx`

**当前 11 section 顺序保留 95%，调整 2 处**：

```
1. TopNav（已改 i18n + brand）
2. HomeHero（暗底 + 大图 + 主 CTA + 副 CTA modal）        ← 配色保留暗
3. TrustStrip（4 数字 + Marquee）                        ← 数字 mock + MockBadge
4. ★ VisaFreeBanner ✱ 新增窄 banner                      ← 144h 免签触发器（D2/P3）
5. HowWeWork（3 步 + 已删 AnimatedBeam）
6. DestinationGrid（8 卡 → 详情页）                       ← href 已修
7. SampleItineraries（3 条样板）                          ← 内容扩
8. Specialists（顾问卡 → /about anchor）
9. TrustProofGrid（4 类 ABCD proof）                     ← mock
10. LeadForm（home-mid 单 CTA 入口）
11. FAQ
12. PathCFooter（暗底锚）
```

**新增 VisaFreeBanner**（位置 4，在 TrustStrip 之后 HowWeWork 之前）：

```tsx
schema {
  eyebrow: '144h Visa-Free' (zh: 144 小时免签)
  headline: 海外护照可在北京/上海/广州过境免签 144 小时
  body: 一句话点出"我们已经做好的 144h 路线"
  cta: 'See visa-free trips →' → /visa-free
  bg: bg-vermilion-soft (副分区暖红)
  height: ≤ 96px (窄条不抢戏)
}
```
mock：免签政策真实数据，不是 mock。但"我们做好的路线"用 placeholder + MockBadge "正在筹建"。

### 5.2 城市详情 `app/destinations/[slug]/page.tsx`

**现状**：160 行，hero + 80 字 intro + 1 aside CTA。**目标**：450-600 行，8 章节骨架，全暖底。

```
章节顺序：
1. Hero (full-bleed image + 暗渐变蒙版 + meta + H1 + tagline)  // 唯一暗段保留
2. Why Visit Now (kicker + 80-120 字段)
3. Wow Points (3-5 条体验亮点，动词起头)                       // ← 借鉴 chinahighlights
4. Best Time to Visit (12 月简表 + "best 3 months 高亮" + → /best-time/[month] 链接)
5. How Long to Stay (推荐天数：weekend / 4-day / 8-day / longer)
6. Nearby & Combine (3-4 个邻近 destination 卡 + "可串成 X-day 行程"hint)
7. Sample Itineraries Match (1-2 条匹配的 /itineraries/[slug] 卡)
8. Tailor-Make CTA + Advisor pull (引 Lin/顾问 → /about anchor + /plan?destination=[slug])
```

**Schema**（数据层 `lib/data/destinations.ts`）：

```ts
type Destination = {
  slug: 'beijing' | 'xian' | 'shanghai' | 'guilin' | 'zhangjiajie' | 'jiuzhaigou' | 'dali' | 'huangshan';
  cn: string; en: string;
  iata: string; gps: string;
  hero: { src: string; alt: string; credit?: string; };
  tagline: { zh: string; en: string; };
  whyVisit: { zh: string; en: string; };           // 80-120 字
  wowPoints: { icon: string; zh: string; en: string; }[];   // 3-5 条
  bestTime: {
    months: { jan-dec: 'best' | 'good' | 'avoid'; }; // 12-vector
    summary: { zh: string; en: string; };           // 30-60 字
  };
  durations: { days: number; pitch: { zh: string; en: string }; }[]; // 3-4 档
  nearby: { slug: Destination['slug']; days: number; reason: { zh; en } }[];  // 3-4 个
  matchedItineraries: string[];  // /itineraries/[slug] 引用
  advisorAnchor: string;         // /about#lin 等
  mock: true;                    // 整个 destination data 标 mock，渲染时 MockBadge 守门
};
```

mock 策略：所有字段标 mock，渲染时数据点（"best season"、"recommended days"）配 MockBadge "示例占位"。

CTA 节奏：3 处 Tailor-Make 触点（Wow Points 后 / How Long 后 / 章节 8 主 CTA）。每个都跳 `/plan?destination=[slug]`。

### 5.3 城市列表 `app/destinations/page.tsx` ✱ 新增

```
1. Hero (kicker + H1 "8 cities, 8 ways into China")
2. Card Grid (8 destination 卡 + filter by 主题/天数 chip)   // ← 借鉴 chinahighlights tour 列表
3. Why we curated 8 (kicker + 1 段 80 字解释为什么不是 28 城)
4. Tailor-Make CTA → /plan
```

差异化点：明确说"我们 v1 只做 8 城精选，不是 28 城堆砌"——把"内容少"转成"经过筛选"的差异化叙事。

### 5.4 主题详情 `app/themes/[slug]/page.tsx`

**slug**：`family / nature / food / history / honeymoon / visa-free` (6 个，比现有 4 个扩 2)

```
章节顺序：
1. Hero (kicker + H1 + 主图 vibe-driven)
2. Who this is for (2-3 行画 persona 像)
3. Top Itineraries for [theme] (2-3 条匹配 itinerary 卡)
4. Things to Know (3-5 条 FAQ-style，嵌入不外跳)             // ← 借鉴竞品 theme 页 FAQ 嵌入
5. Sample destinations within this theme (3-4 个 destination 卡)
6. Tailor-Make CTA → /plan?theme=[slug]
```

### 5.5 主题列表 `app/themes/page.tsx` ✱ 新增

```
1. Hero (kicker + H1 "How do you want to travel China?")
2. 6 主题卡 (vibe 图 + 一句话定调)
3. Tailor-Make CTA
```

### 5.6 行程详情 `app/itineraries/[slug]/page.tsx`

**slug v1**：`sample-10d`（已有，扩深）+ 新增 `visa-free-144h` / `family-12d` / `honeymoon-9d` / `nature-14d-natural-wonders` / `culture-12d-history`

```
章节顺序：
1. Hero (kicker + H1 + 主图 + meta line "X days · USD Y- per person · Best in [month range]")
2. Itinerary at a Glance (Day 1 → Day N，紧凑表格 / map)     // ← chinahighlights "Itinerary Quick Look"
3. Day-by-Day (折叠卡，每天：morning/afternoon/evening 3 时段细节 + 1-2 张图)  ← 关键深度
4. Highlights (3-5 个亮点，可跨城)
5. Tour Price (USD 区间起 + 3 等级酒店锚 + "real price after 1:1 call")    // ← 借鉴 5 等级酒店锚点
6. What's Included / Not Included (2 列对比表)
7. Tailor-Make Tips (3-5 条 "可改" 提示嵌入 itinerary)        // ← chinahighlights 5 处 Tailor-Make
8. Trip Notes (Accommodation / Transportation / Meals / Visa)
9. Advisor pull (Lin 头像 + 一段话 + WhatsApp 按钮)
10. CTA: Send my inquiry → /plan?itinerary=[slug]
```

**Schema**（数据层 `lib/data/itineraries.ts`）：

```ts
type Itinerary = {
  slug: string; title: { zh; en };
  days: number; priceFromUsd: number; bestMonths: string[];
  hero: { src; alt };
  glance: { day: number; cities: string[]; oneLine: string }[];
  dayByDay: {
    day: number; city: string;
    morning: { activity; minutes; note }[];
    afternoon: { ... };
    evening: { ... };
    images: { src; alt }[];
    tailorMakeTip?: { zh; en };  // 5/10 条
  }[];
  highlights: { icon; zh; en }[];
  pricing: {
    base: { hotelClass: '3-star'|'4-star'|'5-star'|'luxury'|'simple'; usdPerNight: number; }[];
    inclusions: string[]; exclusions: string[];
  };
  tripNotes: { accommodation; transportation; meals; visa };
  advisorSlug: string;
  mock: true;
};
```

mock：价格用 USD 占位（如 USD 2,800-4,200，标 MockBadge "样板价位"），酒店等级真实可写但具体酒店名字不放，写"4 星级精选酒店 / 5 星级国际品牌"。

CTA：3 处 Tailor-Make tip 嵌入 day-by-day + 1 处 Tour Price 章节后主 CTA + 1 处页底 advisor pull。

### 5.7 行程列表 `app/itineraries/page.tsx`

**现状**：34 行只有 1 条卡。

```
1. Hero (kicker + H1 + filter chip: 天数 / 主题 / 出行月份)
2. Filtered grid (5-6 itinerary 卡，hover 显示 day count + price + 主目的地)
3. "Can't find yours? Tell us" CTA → /plan
```

filter chip：客户端 state，无 facet 后端，简单 React useState。

### 5.8 季节总览 `app/best-time/page.tsx` ✱ 新增

```
1. Hero (kicker + H1 "When is the best time to come to China?")
2. 12-month overview (网格 / 时间轴：每月 best season hint + click → /best-time/[month])
3. Best for [topic] sections（仿竞品 6 切片，但减到 3-4）：
   - Best for Good Weather
   - Best for Family
   - Best for Low Crowds & Prices
   - Best for Festivals (春节 / 国庆 / 黄金周避坑)
4. Worst Times (诚实告诉用户什么时候别来 + 反差化叙事差异化)
5. Recommended Itineraries (matched by season)
6. Tailor-Make CTA → /plan?month=auto
```

差异化点：**Worst Times 段** chinahighlights 也有，但我们写"中国本地视角"——比如"春节高铁全售罄，10 月黄金周景区人比山多"，比他们泛泛"high prices"具体。

### 5.9 月份页 `app/best-time/[month]/page.tsx` ✱ 新增

```
1. Hero (kicker + H1 "China in [Month] [Year]")
2. Weather snapshot (4-5 城气温 / 降水)
3. Top places this month (4-5 destinations，每个：why it's good now + 推荐 itinerary)
4. Festivals & events (本月真实节庆，不 mock)
5. Crowd & price hint (诚实：本月人多/少 + 价格区间趋势)
6. Recommended itineraries (matched)
7. Tailor-Make CTA → /plan?month=[month]
```

mock 策略：天气数据可用真实历史平均值（公开数据）；festivals 真实日期；价格趋势用区间占位 + MockBadge。

### 5.10 评价 `app/reviews/page.tsx` ✱ 新增

诚实占位策略 — 早期叙事：

```
1. Hero ("We're new. Here's how we'll prove ourselves.")
2. Status block: "正在招募首批旅客 · Reviews coming after first cohort"
3. What we promise (6 条承诺：4h reply / 顾问真名 / 取消政策 / 不收订金前签合同 / 无购物店 / 公开起价区间)
4. Awards (空状态 + "暂无 · 我们刚起步")               ← 不假装有奖
5. Trustindex / Tripadvisor 占位 (灰色 logo + "Pending" + "我们将在首批旅客后接入")
6. Sample of how reviews will look (1-2 条 mock 评价 + 显示 MockBadge "样例占位")
7. Tailor-Make CTA → /plan
```

**这是 D4 极致透明 + D2 早期叙事的差异化落地**：不假装有 16,917 条评价，而是把"早期"做成卖点。chinahighlights 不能这样讲故事，因为他们不是早期。

### 5.11 关于 `app/about/page.tsx` ✱ 新增

```
1. Hero ("A Beijing-based team. Real names. Real WhatsApp.")
2. Why we started (创始人/lead 故事，2-3 段 200-300 字)
3. Meet our team:
   - 2-3 名顾问（每个：头像 + 真名 + 中英 bio + 案例片段 + WhatsApp ID + Anchor #advisor-[name]）
   - "顾问 vlog"占位 (后期接 30s 视频 + MockBadge)
4. Our promise (4h reply / 公开起价 / 无购物店 / 取消政策 / 数据隐私)
5. How we work (intake → draft → refine → confirm → in-trip → debrief 6 步流程)
6. Pricing transparency (1 段：how we price + 利润结构示意，区分 ground / advisory / margin)
7. CTA: Talk to an advisor → /about#contact 或 /plan
```

**差异化重点**：
- D1 顾问真名 + WhatsApp 直连
- D4 利润结构区分（同业不公开）
- D2 早期阶段诚实叙事

### 5.12 询价 `app/plan/page.tsx`（重构为 5 步 wizard）

替换 chinahighlights 49 字段单页表的反例。每步问"想要的体验"不是"行程参数"。

```
Step 1/5: 你大概什么时候来？
  - 单选：精确日期 / 浮动月份 / 还在考虑
  - 月份 select（如选浮动）
  - 大致天数 select (5-7 / 8-10 / 11-14 / 15+ / 不确定)

Step 2/5: 谁一起来？
  - 单选：自己 / 情侣 / 家庭带娃 / 朋友团 / 商务 + 延伸
  - Adults select、Children age tier select (家庭路径展开)

Step 3/5: 你想要的中国是哪种？
  - 多选 chip：自然山水 / 历史文化 / 美食 / 慢节奏 / 城市现代 / 户外冒险 / 蜜月 / 144h 免签
  - 144h 免签预填路径：从 /visa-free 决策工具跳来时自动选中并填入境/出境城市
  - "Tell us in your own words" textarea（选填，描述你心目中的中国）

Step 4/5: 预算与酒店偏好？ + WhatsApp fallback ⭐
  - 预算区间 select (USD 1,500-3,000 / 3,000-6,000 / 6,000-10,000 / 10,000+ /不确定)
  - 酒店等级 select (3-star / 4-star / 5-star / luxury / 不在意 / 帮我推荐)
  - "Why we ask" tooltip（解释为什么问预算）
  - ★ "Want to chat now? Skip the form → WhatsApp Lin" 跳出按钮（codex review 反馈）
    - 点击后把已填的 Step 1-3 数据 序列化进 WhatsApp 预填消息
    - 不要 modal 拦截，直接 deep link 走

Step 5/5: 我们怎么联系你？
  - Name、Email
  - Country code select、Phone（含 WhatsApp checkbox）
  - "Reply via WeChat" checkbox（中国友好）
  - 同意条款 / 隐私 checkbox
  - 提交按钮 → POST /api/leads → LeadFormSuccess

每步：进度条 + 返回 + 已填字段 sticky 摘要 + "为什么问这个"折叠提示
中途保存：每次切换 step 把 form state 存 localStorage（key: pandatravel:plan-draft），用户回来自动恢复
P3 144h 路径：进入 wizard 时如带 ?type=visa-free 跳过 Step 3 多选（已自动选中），直接到 Step 4
```

**字段总数**：≈ 18 个（chinahighlights 49 个的 37%），重质量不重数量。

**WhatsApp fallback 设计原则**（codex review 反馈）：
- 不能压抑高意向急客 — Step 4 加 WhatsApp 跳出口比 Step 5 提交后再给联系方式更符合 D2 决策代理
- 不能完全提前到 Step 1 — 用户还没让我们了解他就直接推 WhatsApp，对话起点空洞，转化反差
- 中庸：Step 4 当用户已经回答完时间 / 同行人 / 体验三件最重要的事，给一个 "skip the rest, talk now" 出口

数据层共用现有 zod schema (`lib/data/lead-form.ts`)，扩字段时记得 i18n errorMap。



### 5.13 144h 免签**决策工具** `app/visa-free/page.tsx` ✱ 新增

D2 + P3 差异化主入口。**不是攻略列表，是交互式决策工具**（codex review 反馈：列表形态差异化太弱）。

```
1. Hero ("144 hours in China without a visa. Use them well.")

2. Decision Tool 核心交互（client component 单页 wizard，不导航）：
   Step a. Pick your passport country     [select 39 国 + search filter]
   Step b. Pick your entry city           [select 32 个免签口岸城市]
   Step c. Stay duration                  [radio: 24h / 72h / 144h，根据 a+b 自动启用/禁用]
   Step d. Departure city / port           [select：必须不同省，影响行程闭环]
   → 即时输出：
     - "你符合 144h 免签 ✅ / 你不符合 ❌（一句话理由）"
     - "你能玩的城市群"（高亮地图 / 列表）
     - "推荐路线" 1-3 条卡片（每条引到 /itineraries/[slug]）
     - "风险 + 提示" 3-5 条（如出境必须从 b/d 选定的免签口岸离境）

3. Caveats（诚实段，不藏）：
   - 时间怎么算（入境次日 0 时 vs 实际入境时刻）
   - 出境约束（必须从指定口岸 + 不能延长）
   - 哪些活动不允许（禁止跨省工作 / 留学 / 长期居住）
   - 哪些情况会被拒（机票回程 / 第三国规则 / 重复入境冷却期）

4. Ready-made 144h itineraries（3-4 条预设卡 → /itineraries/visa-free-[slug]）

5. Quick contact（D2 决策代理关键）：
   - "Still confused? WhatsApp Lin now"（直跳 WhatsApp，非 modal 非表单）
   - "需要更长时间？Apply for L visa instead" 跳大使馆链接（不留客）

6. Tailor-Make CTA → /plan?type=visa-free（已选答案预填到 wizard）
```

**Schema**（数据层 `lib/data/visa-free.ts`）：

```ts
type VisaFreeRule = {
  passportCountry: string;        // ISO 3166-1 alpha-2，39 国白名单
  eligibleStays: ('24h' | '72h' | '144h')[];
  eligibleEntryCities: string[];  // city slug 数组
  notes: { en: string; zh: string }[];   // 该国特殊规则
};

type EntryCity = {
  slug: string;
  cn: string; en: string;
  applicableStays: ('24h' | '72h' | '144h')[];
  region: 'beijing-tianjin-hebei' | 'yangtze-river-delta' | 'pearl-river-delta' | 'other';
  exitConstraints: { en: string; zh: string };  // 出境约束
};
```

数据真实来源：中国国家移民管理局公开规则（2024 起 39 国 144h 政策）。**真值不 mock**。

**差异化重点 vs 列表形态**：
- chinahighlights 没专题，我们针对 P3 做主入口
- 不是 "看清楚再决定"，是 "选完就知道能不能 / 能玩什么"，把决策成本前置到 30 秒交互
- WhatsApp 直链不藏在 modal，急客一键直达（D2 决策焦虑代理实质）



---

## 6. Mock 数据策略

### 6.1 总原则

- 真实可考的公共数据可用真值（免签政策 / 月份天气历史平均 / GPS / IATA / 节庆日期）
- 所有客户数据 / 评价 / 业绩数字 / 第三方背书 / 合作 logo 全部 mock + MockBadge 守门
- production build 必须开 mock guard release gate（详见 §6.5）：检测 mock 数据未替换前不允许 ship
- 早期叙事 > 假装成熟：宁可写"100+ 旅客咨询"+ MockBadge，不写"10,000+"假数字
- **承诺类文案永远写实**（不 mock）：写到的事必须能在上线时兑现（用户 2026-05-22 拍板）
  - "4h reply by Beijing local advisor" — 上线时必须真做到
  - "公开起价区间" — 上线时必须真公开
  - "顾问真名 + WhatsApp 直链" — 上线时必须真号
  - 这些**承诺写出口**前先确认能兑现，不能兑现就改成温和版本（如 "24h reply"）

### 6.2 字段级 mock 守则

| 字段类 | 真值还是 mock | 守门 |
|---|---|---|
| 月份天气 (avg temp / rainfall) | 真值（公开历史平均） | 来源标注 |
| 节庆日期 | 真值 | 维护 |
| 144h 免签规则（39 国白名单 / 32 城口岸 / 出境约束） | 真值（国家移民管理局公开数据） | 引用源 + 季度 review |
| 价格区间（itinerary base from USD） | mock | MockBadge "样板价位" |
| 顾问真名 + WhatsApp | mock 占位（dev）/ 真值（prod，上线前替换） | dev/prod 双模式 + mock guard |
| 顾问头像 | placeholder svg / 真照片 | dev placeholder 不是 initials |
| 评价数 / 评分 | mock | "正在筹建" + MockBadge |
| 第三方 logo (Tripadvisor / TUV / Feefo) | 不展示，"接入中"占位 | hidden 状态 |
| 合作商家 logo | 不展示 | hidden 状态 |
| 客户 quote | mock | MockBadge "样例占位" |
| 案例 case studies | mock 1-2 个 | MockBadge |
| 行程逐日内容 | mock，但要"像真的"（节奏合理，时段细节具体） | MockBadge "示例行程" |
| **承诺文案**（4h reply / 透明价格 / 真名顾问） | **不 mock，写实即真** | 承诺 → 兑现 链条由用户保证 |

### 6.3 数据层组织

```
lib/data/
  destinations.ts         # 8 城 destination[]
  itineraries.ts          # 6+ itinerary[]
  themes.ts               # 6 theme[]
  best-time.ts            # 12 月 month[]
  advisors.ts             # 2-3 advisor[]，dev mock，prod 真值
  reviews-mock.ts         # mock review[]，标 mock=true
  trust-proofs.ts         # 已有，扩 schema
  visa-free.ts            # 真值（国家移民局规则）
  mock-config.ts          # MockBadge 全局开关 + production lint
```

### 6.4 数据生产责任

**lead 不在 spec 阶段写文案**。Phase 2 实现 worker 拿 schema → 自己生成文案占位 → MockBadge 守门。lead 审稿（codex 指出的真瓶颈）按 Phase 2.x 任务节奏抽检，不全部审。

### 6.5 ⭐ Mock guard release gate（P0，已实施 task #53）

**现状（2026-05-22 凌晨）**：`scripts/prelaunch-mock-guard.ts` 已从 stub 改成真 release gate，由 `mock-guard-worker` 实施 task #53。

**行为规范**：

| 场景 | 行为 |
|---|---|
| `NODE_ENV !== 'production'` 直接跑 | exit 0 通过（开发期 mock 是正常的） |
| `NODE_ENV === 'production'` 或带 `--enforce-production` flag | 扫描代码库，发现违规 exit 1 失败 build |

**扫描范围**：

```
lib/data/**/*.ts
  - 任何对象字面量含 `status: 'mock'`
  - 任何对象字面量含 `mock: true`
  - 已知 placeholder URI / 号码：
    *.demo / wa.me/86130000000... / +861000000000 / 
    weixin://contacts/profile/demo / hello@example-tourism.demo

components/**/*.tsx
  - 任何 <MockBadge .../> JSX 引用（production 不应渲染）
```

**例外白名单**：项目根 `mock-allowlist.json`，每条必含：

```json
{
  "path": "lib/data/某文件.ts",
  "reason": "为什么允许这个 mock 上 prod",
  "expires": "YYYY-MM-DD"  // 过期失效，强制 review
}
```

**集成**：`package.json prebuild` 钩子，build 前自动扫。CI（GitHub Actions / 手动）跑 `pnpm prelaunch-check` 单独验证。

**失败输出格式**（参考 ESLint）：

```
<file>:<line>:<col>  error  <message>  <rule-id>
```

每条违规给出具体修复路径：替换真值 / 改 status: 'hidden' / 加 allowlist。

**P0 强约束**：在 Phase 2.5 9 页全部上线前 mock guard 必须 100% 覆盖。任何"暂时 disable"提议都必须被 lead 拒绝。



---

## 7. 响应式 + a11y + reduced-motion

### 7.1 断点（移动端是海外游客主入口）

```
sm:    640px (大手机横屏)
md:    768px (平板竖屏，hero 缩略图开始显)
lg:    1024px (平板横屏 / 小笔记本，桌面级 sticky CTA 显)
xl:    1280px (主战场)
2xl:   1536px (大屏不优化)
```

mobile-first，每个 section 写 mobile 默认 + md/lg 增强。

### 7.2 mobile 关键决策

- TopNav < lg 只显 brand + 汉堡 + 一个 vermilion floating "Plan" mini button (44×44 触控)
- DestinationGrid < md 单列，md 双列，lg 四列
- 详情页 hero < md 60vh（不要 80vh 挡内容），≥ md 70vh
- 询价 wizard mobile 单步全屏 + sticky 进度条 + sticky 下一步按钮
- 所有 touch target ≥ 44×44

### 7.3 a11y 必做

- color-contrast：实测 contrast matrix 见 §3.5（codex review v1 实测，覆盖所有 token × 状态 × 蒙版组合）
- focus-visible：所有交互元素 `focus-visible:ring-2 ring-jade ring-offset-2 ring-offset-cream`
- semantic html：main / nav / aside / article / section 正确嵌套
- aria-label 给所有 icon-only button
- form-labels：每个输入必有 label / FormDescription
- alt text：所有 next/image 必填 alt（destinations 的 alt 用城市名 + 主要意象，不只 "Beijing"）

### 7.4 reduced-motion 路径

之前已做（task #40 reduced-motion 静态强化）：
- HeroBackdrop reduce 时显缩略图按钮可点切图
- DestinationGrid 卡片底部 jade 条 hover 显
- Marquee reduce 时 grid 静态展示

新页面也按这套：reduce 用户看到的是**完整信息但无自动动画**版本。任何新增 motion 必有 reduce 分支。

### 7.5 语言策略

- detect Accept-Language → 默认 EN（海外游客主入口）
- 手动切换 zh / en，cookie 记住
- 新增页面字典 key 必双语（zh + en）
- Brand wordmark `pandatravel` 不翻译
- 详情页 destination cn 名（北京）+ en 名（Beijing）双语并列

---

## 8. 实施 Phase 分解

按 codex review 反馈调整：原 18 day 估算偏乐观（特别 Phase 2.5 5 day 给 5 个新页明显低估）。改成 **MVP 10-14 day + 扩内容 15-25 day** 双段切分。每阶段独立可 ship。

### Phase 2.0 — Mock guard release gate（≈ 1 day，P0，已派 task #53）

```
任务：scripts/prelaunch-mock-guard.ts 从 stub 改成真 release gate
（详见 §6.5）

并行：跟其他 phase 不冲突，独立任务
```

### Phase 2.1 — 配色 token 重校 + 详情页换暖底（≈ 1-2 day）

```
任务：
- globals.css 加 vermilion / vermilion-deep / vermilion-soft token
- HomeHero 主 CTA 改 vermilion；副 CTA 保留 jade 边
- 6 个详情页（destinations / themes / sample-10d / itineraries 列表 / plan / hero-pick）bg-deep-slate → bg-cream，所有 text-soft-ivory → text-ink
- 详情页 hero 区保留全屏 image + 暗渐变蒙版
- jade 主 CTA 全站搜索 → 替换为 vermilion（保留 jade 作 focus ring / 链接 hover）
- §3.6 contrast matrix 4 个 TODO 组合用 axe / WebAIM 真测后回写
- 视觉验收：4 张截图 before/after 对照
- pnpm tsc + pnpm build 双过 + mock guard 跑过

风险：
- 详情页 aside (bg-charcoal-blue/40) 在 cream 底上视觉不对，要改 bg-paper / ring 风格
- TopNav scroll 后 deep-slate 头条要适配（仍可保留暗 sticky header 提供对比）
```

### Phase 2.2 — destinations/[slug] 8 章节深化（≈ 4 day，包含 lead 审稿时间）

```
任务：
- lib/data/destinations.ts schema 扩展（8 城每个 8 章节字段）
- destinations/[slug] page.tsx 重写为 8 章节渲染（450-600 行）
- 8 城 mock 文案 worker 自己写（spec 守则约束）+ lead 抽查 2-3 城
- 加 4-5 个微组件：WowPointsList / BestTimeStrip / DurationCards / NearbyGrid / TailorMakePullCta
- 验收：访问 /destinations/beijing 等 8 个，每个完整渲染 + Playwright 截图

风险：
- mock 文案质量低 → 标 TODO 留 lead 抽查（codex 指出"内容生产是真瓶颈"，分配 1 day 审稿时间）
- 数据层重构可能 break TypeScript types → 增量改
```

### Phase 2.3 — Plan 询价 5 步 wizard + WhatsApp fallback（≈ 3 day）

```
任务：
- lib/data/lead-form.ts schema 扩字段（trip_window / interests[] / hotel_class / budget_tier / wa_jump_payload）
- /plan 页重构为 5 步组件 + 进度条 + sticky 下一步 + localStorage 中途保存
- Step 4 加 WhatsApp 跳出口（codex review 反馈）
- 每步独立组件：StepWindow / StepGroup / StepInterests / StepBudget+WhatsAppEscape / StepContact
- 客户端 state 用 React Hook Form multistep + zod resolver per step
- LeadFormSuccess 扩展显示 1:1 顾问 4h 承诺 + WhatsApp / WeChat 直链
- /plan?type=visa-free 预填路径联调（来自 §5.13 visa-free 决策工具）
- 验收：mobile 单步全屏 + sticky CTA 不挡内容 + 中途保存 + WhatsApp 跳出

风险：
- multistep RHF 配置容易 hydration 错（之前踩过坑），用 'use client' 严格隔离
- 需要确认 i18n errorMap 跟 multistep 兼容
- WhatsApp deep link payload 序列化（已填字段 → URL-encoded message）需要 e2e 测
```

### Phase 2.4 — visa-free 决策工具（≈ 3 day，D2 差异化主入口）

```
任务（codex 反馈：列表 → 决策工具升级）：
- lib/data/visa-free.ts schema：39 国白名单 + 32 城口岸 + 出境约束
  - 数据真值（国家移民管理局公开规则），不 mock
- /visa-free page.tsx：4 步交互式 wizard（passport → entry → duration → exit）
- 即时输出："你符合 ✅ / ❌"+ 推荐路线 + 风险提示
- WhatsApp 直链 quick contact（不藏 modal）
- 3-4 条 ready-made 144h itineraries（链到 /itineraries/visa-free-[slug]）
- /plan?type=visa-free 联调（已选答案预填）
- 验收：每个国家 + 每个口岸组合输出正确

风险：
- 39 国 × 32 城白名单数据维护：写一次 + 季度 review
- 政策更新延迟（中国 2024 起持续放宽）→ 数据层加版本字段 + lastReviewed 时间戳
```

### Phase 2.5 — itineraries/[slug] 行程详情深化（≈ 5 day，含 lead 审稿）

```
任务：
- lib/data/itineraries.ts schema (10 章节)
- 5 itinerary 数据填充（sample-10d 扩 + visa-free-144h-beijing / family-12d / honeymoon-9d / nature-14d）
- itineraries/[slug]/page.tsx 实现 10 章节
- 微组件：ItineraryGlance / DayByDayAccordion / PricingMatrix / TailorMakeTip / TripNotesGrid / AdvisorPullCta
- itineraries/page.tsx 重构为 filter chip grid
- lead 审稿 5 条 mock itinerary（每条 1 hour = 5 hour）
- 验收：每条 itinerary 完整渲染，filter chip 正常

风险：
- DayByDay accordion 做 reduced-motion 兼容
- 价格 mock 数据要"看起来像真的"否则信任受损 → MockBadge 必加
- 5 条 itinerary × 14 天逐日内容 ≈ 70 day-blocks 文案，worker 写完 lead 必抽审
```

### Phase 2.6 — destinations 列表 + about 顾问页 + reviews 早期透明（≈ 4 day）

```
任务：
- /destinations 列表页（filter chip grid）
- /about 顾问真名（v1 mock + MockBadge，上线前替换） + 6 步流程 + 利润透明段
- /reviews 早期叙事（"正在招募首批旅客" + 6 承诺 + Trustindex placeholder + sample mock review 标记清楚）
- VisaFreeBanner 插入首页 section 4
- TopNav 加 'Visa-free' nav item
- PathCFooter 完整 sitemap + 站级 footer 三段
- 验收：站级 footer 一致 + 顾问页 anchor /about#advisor-[name] 跳转正常

风险：
- /reviews 早期透明文案需要 lead 亲自写或重审（codex 警告"mock quote 不能像真评价"）
- /about 顾问 mock 数据要真名占位（如 "Lin · 占位 demo"），不能 generic
```

### Phase 2.7 — 抛光 + a11y + 性能（≈ 2 day）

```
任务：
- 全站 axe-core 扫 a11y
- 全站 LCP / CLS / INP 测试，主要图片加 priority/ loading
- 全站 mobile 375 视觉过一遍
- production build 跑 mock guard 验通过
- 截图全套 before/after

风险：低
```

### v1.5 后续（不进 v1，留给后续）

- /themes/[slug] 6 主题页 + /themes 列表
- /best-time 总览 + /best-time/[month] 月份页
- 接 Trustindex 真实评价 widget
- 真 logo + 主图替换 svg 占位（Codex / Midjourney 生图，用户提供）

### 总计估算（v1）

```
Phase 2.0  Mock guard           1 day
Phase 2.1  配色重校              1-2 day
Phase 2.2  destinations 深化     4 day（含审稿）
Phase 2.3  Plan wizard           3 day
Phase 2.4  visa-free 决策工具    3 day
Phase 2.5  itineraries 深化      5 day（含审稿）
Phase 2.6  列表 + about + reviews 4 day
Phase 2.7  抛光                  2 day
─────────────────────────────────────
v1 MVP                           23-24 day
```

**比 codex 估"MVP 10-14 + 扩 15-25"略短**，因为 v1 收敛（不做 themes / best-time），但加了审稿时间。lead + worker 单线串行，并行做不到。



---

## 9. 关键页面 ASCII wireframe

### 9.1 destinations/[slug] 桌面 1440

```
┌───────────────────────────────────────────────────────────────────────────┐
│  TopNav: pandatravel | Destinations Itineraries Specialists ... | Plan★  │ ← 红 CTA
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   [full-bleed image: 张家界主图，暗渐变蒙版，60vh-70vh]                   │
│                                                                           │
│   GPS 29.0970° N · 110.4795° E    DYG                                     │
│   Zhangjiajie · 张家界                                                    │
│   砂岩柱林 · 雾峰 · 武陵源                                                 │
│   < 回首页                                                                │
│                                                                           │
├──────── ↓ bg-cream 暖底从此开始 ────────────────────────────────────────┤
│                                                                           │
│   WHY VISIT NOW                                                           │
│   湖南西北，砂岩柱林从林海中拔地而起... [80-120 字]                       │
│                                                                           │
├───────────────────────────────────────────────────────────────────────────┤
│   WOW POINTS                                                              │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                    │
│   │ icon         │ │ icon         │ │ icon         │                    │
│   │ Walk on...   │ │ Witness...   │ │ Stay in...   │                    │
│   │ 30-50 字     │ │ 30-50 字     │ │ 30-50 字     │                    │
│   └──────────────┘ └──────────────┘ └──────────────┘                    │
├───────────────────────────────────────────────────────────────────────────┤
│   BEST TIME TO VISIT       [12 月份小条形图 best/good/avoid 三色]         │
│   Best 3 months: 4月 5月 10月  → /best-time/may                          │
├───────────────────────────────────────────────────────────────────────────┤
│   HOW LONG TO STAY                                                        │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                                │
│   │ 2 天  │ │ 4 天  │ │ 6 天  │ │ 8+ 天 │                                │
│   │ 速览  │ │ 标准  │ │ 深度  │ │ 串线  │                                │
│   └───────┘ └───────┘ └───────┘ └───────┘                                │
│   ── Tailor-Make: 不确定？告诉顾问 → /plan?destination=zhangjiajie ──     │ ← 暗暖红条
├───────────────────────────────────────────────────────────────────────────┤
│   COMBINE WITH NEARBY                                                     │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐                                │
│   │ Guilin   │ │ Wulingyu │ │ Fenghuang│                                │
│   │ + 4 天   │ │ + 2 天   │ │ + 2 天   │                                │
│   │ 一句理由 │ │ 一句理由 │ │ 一句理由 │                                │
│   └──────────┘ └──────────┘ └──────────┘                                │
├───────────────────────────────────────────────────────────────────────────┤
│   SAMPLE ITINERARIES MATCH                                                │
│   ┌────────────────────────────┐ ┌────────────────────────────┐          │
│   │ 14d Natural Wonders        │ │ 8d Zhangjiajie Deep        │          │
│   │ from USD 4,200 [mock]      │ │ from USD 2,800 [mock]      │          │
│   │ → /itineraries/...         │ │ → /itineraries/...         │          │
│   └────────────────────────────┘ └────────────────────────────┘          │
├───────────────────────────────────────────────────────────────────────────┤
│   ┌──────────┬──────────────────────────────────────────────────────┐    │
│   │ [头像]   │ Lin · Beijing-based advisor                          │    │
│   │          │ "上周给一个澳洲家庭..." 案例片段 80 字                │    │
│   │          │ [Plan with Lin →]  [WhatsApp]                        │    │ ← vermilion 主 CTA
│   └──────────┴──────────────────────────────────────────────────────┘    │
├───────────────────────────────────────────────────────────────────────────┤
│   PathCFooter (暗底锚)                                                    │
└───────────────────────────────────────────────────────────────────────────┘
```

### 9.2 plan 询价 wizard mobile 375

```
┌─────────────────────────┐
│ ← Back  Step 2 / 5  •  │ ← sticky 顶部进度
│ ────────●───────────── │
├─────────────────────────┤
│                         │
│ 谁一起来？              │ ← H1，每屏一个问题
│ Who's traveling?        │
│                         │
│ ◉ 自己                  │ ← 大触控选项 ≥ 56px
│ ○ 情侣                  │
│ ○ 家庭带娃              │
│ ○ 朋友团                │
│ ○ 商务 + 延伸           │
│                         │
│ Adults                  │
│ [select 18+ ▾]          │
│                         │
│ Children (if any)       │
│ [select 10-17 ▾]        │
│ [select 3-9 ▾]          │
│ [select 0-2 ▾]          │
│                         │
│                         │
├─────────────────────────┤
│ [ Next →  Vermilion ]  │ ← sticky 底部 CTA 44+ 高
└─────────────────────────┘
```

---

## 10. Codex review checklist

spec 提交 codex review 时附以下问题：

1. 配色 token 重校（vermilion）落地是否覆盖足够 a11y 边界？AA 对比度计算可信吗？
2. P1/P2/P3 三 persona 的 user journey 在 IA 上闭合吗？P3 144h 路径是否真有差异化价值？
3. 5 步 wizard 字段顺序（时间 → 同行人 → 体验 → 预算 → 联系）vs chinahighlights 49 字段单页表，转化率假设是否合理？
4. /reviews 早期叙事透明策略（"正在筹建"+ MockBadge）vs 假装有评价（业内常见），哪个对获客实际伤害更小？
5. 9 个新页面（destinations/列表 / themes/列表 / best-time / month / reviews / about / visa-free / themes/[slug] / itineraries/[slug] 扩 5 条）批量上线，内容生产瓶颈在哪？
6. mock 数据策略 + production lint 是否能真正阻止 mock 上线 ship？
7. Phase 2.x 总计 18 day 估算 vs 单 lead + 主代理派 worker 节奏，是否乐观？
8. 差异化方向 D1/D2/D4 三主轴落地是否够清晰？是否有"形似不神似"陷阱（参考 stage-2-differentiation-principle.md）？

codex review 命令：
```bash
codex review --file docs/superpowers/specs/2026-05-22-pandatravel-design-spec.md \
  --context "tourism-landing pandatravel design spec, lead draft, ready for cross-validation" \
  --prompt "Read attached spec. Answer the 8 questions in section 10. Flag any unclear / risky / over-optimistic decisions."
```

---

## 11. Open questions（用户已拍板，仅留实施期 TODO）

v1 起草阶段的 5 个 open questions 用户 2026-05-22 已拍板（此节只留**实施期**真正悬而未决的 TODO）：

**已拍板**（不再讨论）：
- ✅ 顾问真名 / WhatsApp：v1 全 mock 占位 + MockBadge，上线前替换
- ✅ 价格区间：v1 全 mock 占位 + MockBadge，上线时真公开
- ✅ 144h 免签 v1 必做 + 升级为决策工具（不是攻略列表）
- ✅ 9 页全做（destinations / themes / itineraries / plan / about / reviews / visa-free / best-time / month）
  - 但 v1 收敛到 4 个核心页（destinations 深 / plan wizard / about / visa-free / reviews），themes / best-time / month 推 v1.5
- ✅ logo svg 占位 v1 ship，ship 后 Codex / Midjourney 生真 logo

**实施期 TODO**（Phase 2.x worker 推进中再返回这里更新）：

- §3.5 contrast matrix 4 个 TODO 组合（hero 蒙版穿透色 / 半透明蒙版 / focus-visible ring / disabled state）由 Phase 2.1 worker 实施时 axe / WebAIM 真测后回写本节
2. WhatsApp deep link payload 序列化格式（已填字段 → URL message 模板）由 Phase 2.3 worker 落地时确定
3. 39 国免签白名单 + 32 城口岸数据源最后一次 review 时间戳：Phase 2.4 worker 引用国家移民管理局公开规则时记录
4. 真 logo / 主图生成 prompt：v1 ship 后 lead 给用户出 Midjourney prompt，包含品牌方向（中国红 + 熊猫 + editorial cinematic）

---

## 12. spec changelog

- v1 (2026-05-22, lead 起草)：基于 detail-tokens-reviewer 信息收集 + chinahighlights REFERENCE-PACKET + stage-2-differentiation-principle 整合。13 个 section / 918 行 / 44.5KB。
- v1.1 (2026-05-22, lead 改写, 整合 codex review + 用户拍板)：
  - §3.5 删 7.0:1 错算，加 codex 实测 contrast matrix（10 组合数值 + 4 TODO）+ 暗底禁用 jade 文字硬约束
  - §5.13 visa-free 从攻略列表升级为 4 步交互式决策工具 + 真值数据层 + WhatsApp 直链
  - §5.12 plan wizard 第 4 步加 WhatsApp fallback + localStorage 中途保存 + visa-free 预填路径
  - §6.1-6.5 mock 策略加 P0 release gate（CI 命令 / 失败条件 / 扫描范围 / 允许例外 / 已派 task #53）+ 承诺类文案"上线时真兑现"硬约束
  - §8 时间估算改 18→23-24 day（含审稿）+ Phase 重排（Phase 2.0 mock guard + Phase 2.4 visa-free 决策工具升级）+ v1.5 后续清单（themes / best-time / month / 接 Trustindex / 真 logo）
  - §11 删除 5 个已拍板 questions，只留 4 个实施期 TODO
- 待：codex 二审 v1.1（确认改对了）
- 待：用户拍最终板 → 派 Phase 2.x worker

---

## 13. Relations

- relates_to [[2026-05-21-tourism-lead-generation-design]]（spec source of truth，本 spec 是其 design 落地）
- relates_to [[stage-2-differentiation-principle]]（差异化三门禁原则，本 spec 每页 IA 决策都引用）
- relates_to [[REFERENCE-PACKET-chinahighlights]]（竞品 6 维度首页解构）
- input_from [[detail-tokens-reviewer-2026-05-21-report]]（事实层素材）
- reviewed_by [[codex-review-output-2026-05-22]]（v1 codex review，C:\Users\Administrator\.claude\tmp\codex\pandatravel-design-review\codex-review-output.md）
- gate [[task-53-mock-guard-release-gate]]（P0 mock guard 实施任务）



