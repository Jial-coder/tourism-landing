---
version: "1.0"
name: "Tourism Landing — Tailor-Made China"
description: "海外游客来中国定制旅行的获客网站；客户是 35+ 海外中产/高知与高净值；目标情感是向往、信任、安心、被专业承接"
---

# Tourism Landing Design System (Path C)

> Path C = 推翻现有「8 段同色深底 + 诊断式 chip hero + 单顾问独白」首页 IA，按竞品 mood board（Editorial Magazine + Cinematic Bold）重做。
> 本文件是项目视觉与信息架构的 **single source of truth**；任何 mockup、组件、Stitch/Figma 草稿都不得覆盖本文件。
> 任何视觉判断变更必须先回写本文件，再落代码（rules/55 design-stack-routing 规则）。
> 旧版 M-HERO v4（2026-05-20，Figma Make Round1）已被 Path C 取代，正式归档于 git history。

---

## 1. 目标客群与定位

面向计划来中国的海外游客（首次来华、家庭、文化深度、高预算、商务顺访），核心客群 35-55 岁、可支配旅游预算 $5K-$10K USD/trip、英文优先；网站定位是「人工承接的中国定制旅行咨询 + 多入口获客」，不卖标准化 OTA 商品，不做即时成单闭环。详见 `docs/superpowers/specs/2026-05-21-tourism-lead-generation-design.md` §2。

---

## 2. 视觉 Archetype 决策

**选定**：Editorial Magazine（主体框架）+ Cinematic Bold（hero 局部）。

**视觉锚（reference packet）**：

- **Trufflepig**（`docs/qa/2026-05-21/competitor-mood/04-trufflepig-full.jpeg`）— serif 文学叙事感、卡片节奏、留白、长读体验
- **Steppes Travel**（`06-steppes-full.jpeg`）— editorial 卡片网格、克制配色、信任 strip 节奏
- **Black Tomato**（`07-blacktomato-full.jpeg`）— hero 大图反白主标 + 明确主 CTA 的戏剧感
- 辅助参考：**WildChina**（`03-wildchina-full.jpeg`）editorial 长图叙事

**风格分歧覆盖**：Editorial Magazine（calm authority + 文学叙事）与 Cinematic Bold（cinematic premium + 戏剧化 hero）属两个独立 style archetype，满足 rules/55 §3.7 多稿对比门禁。

**反模式（anti-pattern blacklist）**：

- 8 段同色深底（当前 deep-slate-only 路线已被否）
- 诊断式 chip hero（"我现在 / 我担心" 三 chip 已被否）
- 无主 CTA hero / 顾问独白式微文案当 hero
- 泛 SaaS 渐变卡 / glassmorphism / 假豪华金边
- "5-star reviews from travelers worldwide" 无来源声明
- 假评分 / 假资质 / 假合作 logo / 假人脸头像
- chinahighlights 风格的土黄红 + 蓝 + 高密度搜索框（C archetype 已被否）
- AI purple/pink gradient / startup landing blob

**视觉记忆钩子**：cream paper + ink serif + jade CTA + 全屏 cinematic 山水 hero 反白主标。

竞品全文分析：`docs/qa/2026-05-21/competitor-mood/MOODBOARD.md`。

---

## 3. 色板（Tailwind v4 OKLCH tokens）

色板分两组：**editorial light**（主体页面默认）与 **cinematic dark**（hero / advisor 局部保留）。

| Token | OKLCH | 用途 |
|---|---|---|
| `--color-cream` | `oklch(0.98 0.005 80)` | 页面默认底色（light 模式） |
| `--color-paper` | `oklch(0.96 0.005 80)` | 卡片底色 / 次级 section 底色 |
| `--color-ink` | `oklch(0.20 0.020 250)` | light 底上的主文本 / serif 主标 |
| `--color-ink-soft` | `oklch(0.40 0.015 250)` | 次级文本 / caption / muted |
| `--color-jade` | `oklch(0.42 0.06 155)` | 主 CTA 底色 / 强调 / link |
| `--color-jade-soft` | `oklch(0.55 0.05 155)` | jade 的 hover 态 |
| `--color-gold` | `oklch(0.78 0.10 75)` | mock badge / highlight / 稀有徽标 |
| `--color-deep-slate` | `oklch(0.20 0.025 245)` | cinematic hero 底（保留现有 token） |
| `--color-soft-ivory` | `oklch(0.97 0.012 85)` | 深底上的反白文本（保留） |

**使用纪律**：

- 主体页面 = `cream`（body bg） + `paper`（card） + `ink`（primary text） + `ink-soft`（muted）
- HomeHero / Specialists 局部 = `deep-slate`（bg） + `soft-ivory`（text） + jade CTA
- 主 CTA 永远是 `jade`，hover 用 `jade-soft`；次 CTA = `ink` 描边 + 透明底
- mock badge = `gold` 底 + `ink` 文字 + 小写 `mock` / `demo` / `example` / `sample` 前缀
- 不允许在主体连续 3 个 section 都用深底，避免回到旧"8 段同色深底"

---

## 4. 字体

| 角色 | 字体 | 来源 | 备注 |
|---|---|---|---|
| 主标 EN | Newsreader | `next/font/google`（variable，weights 200-800） | serif 文学感，对标 Trufflepig 视觉锚 |
| 正文 EN | Inter | `next/font/google`（variable） | 正文 + 表单 + 导航 |
| 中文（主标 + 正文） | MiSans | 项目已配 `@font-face`（保留） | 中英双栈，中文环境无须切 Newsreader |
| 数字（可选） | Inter `tabular-nums` | tabular-figures CSS feature | trust strip 数字对齐 |

**接入方式（layout.tsx）**：

```tsx
import { Newsreader, Inter } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

// <html className={`${newsreader.variable} ${inter.variable}`}>
```

CSS 上 `font-family: var(--font-newsreader), 'MiSans', serif;` 用于主标，`font-family: var(--font-inter), 'MiSans', system-ui, sans-serif;` 用于正文。

**字号阶梯（desktop）**：

| 层级 | 字号 | 行高 | weight | 用途 |
|---|---|---|---|---|
| display | 64-80 px | 1.05-1.15 | 600 (serif) | HomeHero 主标 |
| h1 | 48-56 px | 1.15 | 600 (serif) | section heading |
| h2 | 32-40 px | 1.2 | 600 (serif) | sub-section / 卡片大标 |
| h3 | 22-28 px | 1.3 | 500-600 | 卡片标题 / 强调段 |
| body-lg | 18 px | 1.6 | 400 (sans) | hero 副标 / 引言 |
| body | 16 px | 1.6 | 400 (sans) | 正文默认 |
| caption | 13-14 px | 1.5 | 500 (sans) | label / meta / footer |

移动端各档下移一阶（display = 40-48；h1 = 32；h2 = 24；其余按比例缩）。所有 serif 标题字间距 `letter-spacing: -0.01em`，避免默认 web serif 略松。

---

## 5. 间距与圆角

- 容器：`max-w-7xl mx-auto px-6 lg:px-10`（保持现有）
- section 纵向：`py-20 lg:py-28`（统一节奏，不再 case-by-case）
- 卡片：`rounded-2xl`（目的地 / itinerary / specialist / FAQ 折叠卡）
- 按钮：主 CTA = `rounded-full px-7 py-3.5`（pill jade），次 CTA = `rounded-lg px-6 py-3`
- 阴影克制：默认 `shadow-sm`；hover 才升 `shadow-lg`；不堆 multi-layer 阴影
- 边距栅格：4-based scale（沿用 Tailwind 默认），节奏使用 4 / 8 / 12 / 16 / 24 / 32
- 图片：目的地卡 `rounded-2xl overflow-hidden aspect-[4/5]`；hero 全屏 `h-[100svh]`，移动端 `h-[88svh]`
- 分隔：用 `border-t border-ink/10` 替代色块分隔，避免视觉破碎

---

## 6. 信息架构（IA 重排）

新首页 10 个 section 顺序，旧 sections（Hero / DiagnosticSection / ConciergeBand / DestinationTilesSection / VisaSection / AdvisorCard / ConciergeNote / DualCTA / TrustFootnote）保留文件不删，仅在 `app/page.tsx` 不再装配。

| # | Section | 用途 | 视觉色调 | 主 CTA | 数据来源 |
|---|---|---|---|---|---|
| 1 | **HomeHero** | 5 秒说清"海外游客 / 中国定制 / 人工承接" | cinematic dark（deep-slate + soft-ivory） | "Start planning" → `#lead-form` | 字典 `home.hero.*` + `public/landmarks/hero-gen/*` |
| 2 | **TrustStrip** | 4 个 stat 立刻接上 trust，不留全图后真空 | light（cream + ink） | — | `lib/data/trust-proofs.ts` 中 4 条 `category: 'stats'` mock |
| 3 | **HowWeWork** | 3 步流程（Talk → Tailor → Travel） | light（cream + ink-soft 描边） | "Talk to a specialist" → `#lead-form` | 字典 `home.howWeWork.*` |
| 4 | **DestinationGrid** | 8-12 张目的地卡片激发咨询，不假装 OTA SKU | light（paper card） | 单卡 hover "Plan a trip to X" → `#lead-form` | 字典 `home.destinations[]` + `public/landmarks/*.jpg` |
| 5 | **SampleItineraries** | 3-4 条样例行程卡片（Example trip case） | light（paper card + gold mock badge） | "See how this could work for you" → `#lead-form` | `lib/data/trust-proofs.ts` `category: 'C'` mock |
| 6 | **Specialists** | 顾问网格（mock，首字母圆形头像 + 渐变） | dark（deep-slate + soft-ivory） | "Speak to a specialist" → `#lead-form` | `lib/data/trust-proofs.ts` `category: 'B'` mock |
| 7 | **TrustProofGrid** | A/B/C/D 四类 proof（Tripadvisor/Google quote、advisor、case、credentials） | light（paper card + mock badge） | — | `lib/data/trust-proofs.ts` 全部分类 |
| 8 | **LeadFormSection** | 完整 lead form（rhf + zod + shadcn + honeypot + Turnstile） | light（cream） | submit → `/api/leads` | `lib/data/lead-form.ts` schema |
| 9 | **FAQ** | 折叠卡片（海外游客 8 问：签证 / 安全 / 语言 / 支付 / 隐私 / 响应 / 定制流程 / 退款） | light（cream） | "Still have questions? Talk to us" → `#lead-form` | 字典 `home.faq[]` |
| 10 | **Footer** | 公司 / 联系 / 隐私 / 条款 / 语言切换 / 社媒 | dark（deep-slate） | — | `lib/data/contact-channels.ts` + 字典 `footer.*` |

**Lead 入口三处可达**（spec §5）：HomeHero 主 CTA（hero 内 anchor 到 `#lead-form`）+ LeadFormSection（mid 区直接渲染） + Footer 链接。

**深底分布**：仅 Hero（1）、Specialists（6）、Footer（10）三段是深底，其余 light，避免连续深底审美疲劳。

---

## 7. 图片策略

**复用现有素材**：

- 目的地：`public/landmarks/{beijing,xian,guilin,shanghai,zhangjiajie,jiuzhaigou,dali,huangshan,hangzhou,chengdu,lhasa,dunhuang,lijiang,lijiang-night}.jpg` 共 14 张
- hero：先从 `public/landmarks/hero-gen/v3-* / v4-*` 系列里挑一张 cinematic 山水（候选：v4-a / v4-b / v3-c），加 `object-cover` + 顶部 0.55 → 0.05 的渐变遮罩保证反白文本可读；如全无满意候选，先用 `huangshan.jpg` / `zhangjiajie.jpg` / `jiuzhaigou.jpg` 之一
- 不引入外部生图工具（imagegen / midjourney 不在 MCP 通道）
- attribution：素材在 `public/landmarks/_attribution.json` 已记录，footer 加一句 "Photography credits" 链接到 `/credits`（本期不做完整 credits 页，只在 footer 占位）

**禁用**：

- 假人脸头像 / 假员工照（Specialists 用首字母圆形 + 双色渐变背景代替，例如 "YL" 在 `deep-slate → jade` 渐变圆里）
- mock 客户评价不带头像，仅 quote + 名字 + 国家（"— Sarah M., Australia"）
- AI 生成的"中国元素"插画（红灯笼 + 龙 + 京剧脸谱）

---

## 8. 反 AI Slop 清单（implementation-time gate）

写代码 / 接 mock data / 写文案时一票否决：

- 泛 SaaS 渐变卡 / glassmorphism
- 假豪华金边 / 鎏金描边
- "5-star reviews from travelers worldwide" 这种泛化无来源声明
- chip 化 hero（"我现在 / 我担心 / 我想要" 已被否）
- 无主 CTA hero
- 8 段同色深底
- 顾问独白式微文案当 hero（"我们不卖路线" 已被否）
- 假评分 / 假资质 / 假合作 logo / 假媒体名 / 假人脸头像
- AI 生成的中国元素插画
- 自动播放 video / 视差到失控 / 鼠标悬停大幅旋转

任何看起来"通用 AI/SaaS 模板"的一屏，立刻退回本文件 §2 反模式与 §7 图片策略对照。

---

## 9. 路径 C 与既有决策对齐

Phase 0 决策 a-j 全部仍生效（`docs/superpowers/plans/2026-05-21-tourism-lead-generation-implementation.md` 第 73-141 行）：

- a. Supabase Free + Drizzle ORM；RLS 默认拒绝；service_role 写入
- b. `typecheck` + `prebuild` mock guard；不引入 lint / test runner
- c. `leadResponsePromise` 单一字典 key
- d. mock proof guard 行为（prod 拦 / dev 警告）
- e. 部署 = Vercel + Node.js runtime
- f. trust proof 全部 mock 占位（A/B/C/D 四类，命名前缀强约束）
- g. 飞书自定义机器人 webhook
- h. WhatsApp 仅作访客联系入口
- i. 蜜罐 + Cloudflare Turnstile + sliding window 限流
- j. 前端栈 6 条 + 七步 dev-server-QA 循环

**Path C 新增决策**：

- **k. Path C IA 重做**：旧 sections（Hero / DiagnosticSection / ConciergeBand / DestinationTilesSection / VisaSection / AdvisorCard / ConciergeNote / DualCTA / TrustFootnote）保留文件不删，但 `app/page.tsx` 不再装配，留作 archive。新 sections 在 `components/sections/` 下新建（HomeHero / TrustStrip / HowWeWork / DestinationGrid / SampleItineraries / Specialists / TrustProofGrid / LeadFormSection / FAQ；Footer 重写）。
- **l. 色板从 deep-slate-only 切到 cream-editorial + cinematic dark hero 局部**：主体走 cream + paper + ink + jade；Hero / Specialists / Footer 三段保留 deep-slate；其余必须 light，避免 8 段同色深底。
- **m. 表单库不变（j 子集）**：rhf + zod + shadcn form + sonner + 蜜罐 + Turnstile；本次 Path C 不重新讨论表单库选型，只重排 LeadFormSection 在 IA 中的位置（从「mid 区单 form」改为「专属 section + hero/footer 双 anchor」）。

---

## 10. Mock → Real 替换清单

按 spec §6 A/B/C/D 与 Phase 0 决策 f 命名硬约束，本期所有 trust proof 走 mock，上线前由 user 替换。替换流程见 plan Task 7.1。

| 类别 | mock entry id 前缀 | 文件位置 | 替换需要的真实材料 |
|---|---|---|---|
| **A 真实评价/评分** | `mock-review-*` | `lib/data/trust-proofs.ts` | Tripadvisor / Google Reviews 平台账号 + 真实 quote + 评价时间 + 旅行类型 + 客户授权状态 + 原始链接；或授权邮件/聊天摘录 |
| **B 顾问/团队信息** | `demo-advisor-*` | `lib/data/trust-proofs.ts` | 真实顾问姓名 / 角色 + 服务语言 + 熟悉目的地 + 服务年限 + 头像授权 + 联系方式边界；无可公开个人信息时降级为 "Local Advisor Team"（隐藏个人化字段） |
| **C 真实案例** | `example-trip-*` | `lib/data/trust-proofs.ts` | 客户类型 + 旅行天数 + 同行人数 + 兴趣偏好 + 目的地组合 + 定制挑战 + 解决方式 + 行程摘要 + 客户反馈与素材授权状态；无真实案例则降级为"行程方向示例"，不得称真实客户案例 |
| **D 资质/合作/支付/隐私** | `sample-credential-*` | `lib/data/trust-proofs.ts` | 公司合法主体 + 旅行服务资质（证件号 + 颁发机构） + 合作酒店/车队/导游 + 支付方式 logo 使用授权 + 隐私政策定稿 + 法务确认状态；无材料则隐藏 logo，只留中性流程说明 |

**Pre-launch checklist（spec §9）**：`prebuild` mock guard（决策 d）在 `NODE_ENV === 'production'` 时扫描 `status: 'mock'` 且 `productionVisible: true` 的条目并拒绝构建；`docs/lead-generation-overview.md`（plan Task 7.1）维护本清单的逐项替换状态。

---

## Relations

- relates_to `docs/superpowers/specs/2026-05-21-tourism-lead-generation-design.md`（spec 全文）
- relates_to `docs/superpowers/plans/2026-05-21-tourism-lead-generation-implementation.md`（实施 plan Phase 0 决策 a-j + Path C 决策 k/l/m）
- relates_to `docs/qa/2026-05-21/competitor-mood/MOODBOARD.md`（archetype 决策依据）
- relates_to [[cognitive-cockpit-design-stack-v9]]（v9 source-of-truth 架构）
- relates_to [[design-md-template]]（本文件按此模板写）
- relates_to rules/05 cognitive-cockpit-constitution（form 维度 + Reference-First 多稿门禁）
- relates_to rules/55 design-stack-routing（status × 工具决策表 / Taste Brief 门禁）
