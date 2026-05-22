# pandatravel 全站结构总览

> 时间戳：2026-05-22 · 分支：`feat/lead-generation-foundation` · Next.js 16 app router
> 数据驱动 + 静态生成（`generateStaticParams`）；所有非 visa-free 数据 `status: 'mock'`，渲染由 `<MockBadge>` 守门。
> 本文按"用户从上到下读、每节都能停下问问题"组织。

---

## 0. 全局 chrome（每页都有）

### 0.1 TopNav — `components/chrome/TopNav.tsx`
- **品牌区**（`TopNav.tsx:83-97`）：链接到 `/` · 红底白印章 `<PandaMark>` SVG（带"-2°旋转汉印"红框 + 中央熊猫）+ wordmark "pandatravel"
- **桌面端导航项 6 条**（数据源 `lib/data/dictionaries/zh.ts:39-46`，渲染 `TopNav.tsx:105-132`）：
  1. 目的地 → `/destinations`
  2. 行程 → `/itineraries`
  3. 免签攻略 → `/visa-free`
  4. 顾问 → `/advisors` ← **路由不存在（page 缺失）**
  5. 旅行故事 → `/stories` · `soft404: true` ← 点击触发 `<SoftFourOhFourDialog>` 而非跳转
  6. 关于我们 → `/about`
- **"更多"假下拉**（`TopNav.tsx:133-138`）：`href="/more"`，**也是路由不存在**（无 `app/more/`）
- **右侧 cluster**：
  - `CTAPrimary` "免费定制行程" → `/plan`（`TopNav.tsx:145-150`）
  - WhatsApp 链接 `https://wa.me/`（占位号码，没真号）
  - `<M-AUTH-ENTRY>` 用户头像下拉（`TopNav.tsx:162-208`）：登录 → `/auth/sign-in`、注册 → `/auth/sign-up` ← **两个 auth 路由都不存在**
  - `<LocaleSwitch>` 语言切换（zh/en）
  - 移动端汉堡按钮（`TopNav.tsx:216-223`）触发 `<MobileDrawer>`
- **Mobile drawer**（`TopNav.tsx:246-345`）：全屏暗色蒙版，导航项同桌面、底部 CTA + WhatsApp + 语言切换 + 登录链接
- **变体**：`variant="home-hero"`（默认透明，scrollY > 90vh 后变 charcoal-blue/80 + backdrop-blur） / `variant="always-chromed"`（钉死深色，列表/详情页用）
- **a11y**：role/aria-haspopup/aria-expanded、Esc 关闭、外点击关闭、focus-visible 完整

### 0.2 Footer — 项目里有两套 Footer，按页面区分使用

⚠ **特殊发现**：实际上 footer 有 **两个不同实现**，同时存在：

#### 0.2.1 `<PathCFooter>` — `components/sections/PathCFooter.tsx`（**仅首页用**）
- 数据源 `lib/data/dictionaries/zh.ts:559-618`（`pathCFooter` 段）
- 4 列 sitemap：
  - **开始规划**：免费定制行程 `/plan` · 240 小时免签 `/visa-free` · 目的地 `/destinations`
  - **看看路线**：行程一览 `/itineraries` · 样板 10 天 `/itineraries/sample-10d` · 主题（v1.5 上线） `/themes` ← `/themes` 根目录无 page，只有 `[slug]`
  - **关于我们**：关于 pandatravel `/about` · 旅客评价 `/reviews` · 联系顾问（v1.5） `/about#contact`
  - **小字**：隐私（占位） `/legal/privacy` · 条款（占位） `/legal/terms` · ICP 占位 `/legal/icp` ← **三个 legal 路由都不存在**
- 信任网络 widgets（4 家「待接入」徽章：Tripadvisor / Google Reviews / Feefo / Trustindex）
- 回复承诺（"Lin 在北京 4 小时内人工回复"）
- "为什么是 pandatravel" 简介
- 法务行：版权 + Mock 提示 + 语言提示

#### 0.2.2 `<Footer>` — `components/sections/Footer.tsx`（**所有非首页都用**）
- 数据**写死在组件里**（不走 dictionaries 字典）—— `Footer.tsx:12-49` 4 列硬编码：
  - **Brand & Promise**：`/about` · `/about/promise` · `/about/responsible-travel` ← 后两个不存在
  - **Travel**：`/destinations` · `/itineraries` · `/visa` · `/stories`(soft404) · `/best-time`(soft404)
  - **People**：`/advisors`(无 page) · `/about/voices` · `/careers`(soft404)
  - **Get in touch**：WhatsApp · email · WeChat 扫码（`/contact/wechat` 不存在）· `/press`(不存在)
- 内含 `<NewsletterForm>`、多语言展示行、底部 `/legal/privacy|terms|icp` 链接
- ⚠ 跟 PathCFooter 的链接有出入（PathCFooter 数据走 zh 字典；Footer 是硬编码 mock 占位 + 大量 soft404）

> 修复建议：detail 页是否要切到 PathCFooter 让用户决策；目前两套 footer 内容口径不一致。

---

## 1. 路由树（app/ 顶层 page.tsx 清单）

12 个 page.tsx 路由；其中 3 个是动态 `[slug]`。Footer 列出的 `/advisors` `/themes` `/visa` `/auth/*` `/legal/*` `/about/promise` `/about/responsible-travel` 等**实际未实现 page**。

| # | 路由 | 文件 | 类型 | 静态 slug 数 |
|---|---|---|---|---|
| 1 | `/` | `app/page.tsx` | 首页 | — |
| 2 | `/destinations` | `app/destinations/page.tsx` | 列表 | — |
| 3 | `/destinations/[slug]` | `app/destinations/[slug]/page.tsx` | 动态 | **8** |
| 4 | `/itineraries` | `app/itineraries/page.tsx` | 列表 | — |
| 5 | `/itineraries/[slug]` | `app/itineraries/[slug]/page.tsx` | 动态 | **5** |
| 6 | `/visa-free` | `app/visa-free/page.tsx` | 决策工具 | — |
| 7 | `/plan` | `app/plan/page.tsx` | 5 步表单 | — |
| 8 | `/about` | `app/about/page.tsx` | 静态 | — |
| 9 | `/reviews` | `app/reviews/page.tsx` | 静态 | — |
| 10 | `/themes/[slug]` | `app/themes/[slug]/page.tsx` | 动态 | **4** |
| 11 | `/hero-pick` | `app/hero-pick/page.tsx` | 内部 review 页 | — |
| 12 | `/client/{prototype,workflow,progress}` | `app/client/...` | 内部交付 portal | — |
| API | `/api/leads` | `app/api/leads/route.ts` | POST | — |

详情、组合的 section 模块见下面各小节。

---

### 1.1 `/` 首页 — `app/page.tsx`
chrome：默认 `<TopNav>`（home-hero variant）+ `<PathCFooter>`
模块组合（从上到下，10 个 section）：

| 序号 | Section | 文件 | 跳转/动作 |
|---|---|---|---|
| 1 | `<HomeHero>` | `components/sections/HomeHero.tsx:102,151` | "看完整行程" → `/itineraries/sample-10d` · "免费定制行程" → `/plan` |
| 2 | `<TrustStrip>` | `components/sections/TrustStrip.tsx` | 4 个统计数字（10000+/98.8%/8 年/24h），数据 `dictionaries/zh.ts:84-91` |
| 3 | `<VisaFreeBanner>` | `components/sections/VisaFreeBanner.tsx:33` | "看免签路线" → `/visa-free` |
| 4 | `<HowWeWork>` | `components/sections/HowWeWork.tsx` | 三步流程（联系/量身/后援），数据 `zh.ts:98-119` |
| 5 | `<DestinationGrid>` | `components/sections/DestinationGrid.tsx:37` | 8 城网格 → `/destinations/${slug}`（数据 `zh.ts:124-133`） |
| 6 | `<SampleItineraries>` | `components/sections/SampleItineraries.tsx:87,145` | 卡片 → `/itineraries/${slug}` · "全部样板" → `/itineraries` |
| 7 | `<Specialists>` | `components/sections/Specialists.tsx` | 顾问 3 张卡（Lin/Mei/Wei） |
| 8 | `<TrustProofGrid>` | `components/trust/TrustProofGrid.tsx` | 信任证据墙（数据 `lib/data/trust-proofs.ts`，全 mock） |
| 9 | `<LeadForm source="home-mid">` | `components/sections/LeadForm.tsx:155` | POST `/api/leads` |
| 10 | `<FAQ>` | `components/sections/FAQ.tsx` | 数据 `zh.ts:374+` |

> ⚠ 首页是**唯一使用 `<PathCFooter>` 的页面**（`app/page.tsx:30`）。所有其他页面都用 `<Footer>`。

---

### 1.2 `/destinations` 列表 — `app/destinations/page.tsx`
chrome：`<TopNav variant="always-chromed">` + `<Footer>`
4 个 section（`page.tsx:21-117`）：
1. **Hero**（`page.tsx:21-42`）— "8 座城市，8 种进入中国的方式"
2. **Filtered grid**（`page.tsx:44-55`）— 渲染 `<DestinationListInteractive items={...}>` (`components/destinations/DestinationListInteractive.tsx`)，含主题筛选器
3. **Why we curated 8**（`page.tsx:57-88`）— 编辑型说明
4. **Tailor-Make CTA**（`page.tsx:90-116`）— "想去的城市不在这 8 个里？" → `/plan`

---

### 1.3 `/destinations/[slug]` 详情 — `app/destinations/[slug]/page.tsx`
- `generateStaticParams`（`page.tsx:22-24`）→ 数据源 `lib/data/destinations.ts:DESTINATION_SLUGS`，**生成 8 个静态页**：
  `beijing` / `xian` / `shanghai` / `guilin` / `zhangjiajie` / `jiuzhaigou` / `dali` / `huangshan`
- 8 个 section（`page.tsx:55-374`）：

| # | Section | 组件/文件 | 跳转 |
|---|---|---|---|
| 1 | Hero（暗段） | `<Image>` + `<ChineseSeal text="北">` | "回首页" → `/` |
| 2 | Why Visit Now | inline | CTA → `/plan?destination=${slug}` · WhatsApp → `wa.me?text=...` |
| 3 | Wow Points | `<WowPointsList>` (`components/destinations/WowPointsList.tsx`) | 节奏 CTA → `/plan?destination=${slug}` |
| 4 | Best Time to Visit | `<BestTimeStrip>` (`components/destinations/BestTimeStrip.tsx`) | — |
| 5 | How Long to Stay | `<DurationCards>` (`components/destinations/DurationCards.tsx`) | 节奏 CTA → `/plan?...` |
| 6 | Nearby & Combine | `<NearbyGrid>` (`components/destinations/NearbyGrid.tsx`) | 跳到其他 destination |
| 7 | Sample Itineraries Match | inline cards | 已写好的 → `/itineraries/${itSlug}`；筹建中 → `/plan?...` |
| 8 | Tailor-Make CTA | `<TailorMakePullCta>` (`components/destinations/TailorMakePullCta.tsx`) | → `/plan` |

- 数据：`lib/data/destinations.ts`（**42KB**，每个 dest 1 段 ~127 行），**8 条全 status: 'mock'**

---

### 1.4 `/itineraries` 列表 — `app/itineraries/page.tsx`
chrome：`<TopNav variant="always-chromed">` + `<Footer>`
3 个 section（`page.tsx:14-77`）：
1. Hero — "先看一条样板路线 · 再改成你的版本"
2. `<ItineraryListInteractive items={listItineraries()}>`（`components/itineraries/ItineraryListInteractive.tsx`）
3. CTA "没有完全符合的？" → `/plan`

---

### 1.5 `/itineraries/[slug]` 详情 — `app/itineraries/[slug]/page.tsx`
- `generateStaticParams`（`page.tsx:19-21`）→ 数据源 `lib/data/itineraries.ts:2043-2049`，**生成 5 个静态页**：
  `sample-10d` / `visa-free-240h-beijing` / `family-12d` / `honeymoon-9d` / `nature-14d`
- **10 个 section**（`page.tsx:39-313`）：

| # | Section | 组件 | 备注 |
|---|---|---|---|
| 1 | Hero（暗段） | inline + `<ChineseSeal text="行">` | 顶部价格/天数/最佳月份徽章 |
| 1.5 | Compact Price Anchor | inline | 紧贴 hero 的价格条 |
| 2 | Itinerary at a Glance | `<ItineraryGlance>` (`components/itineraries/ItineraryGlance.tsx`) | — |
| 3 | Day-by-Day | `<DayByDayAccordion>` (`components/itineraries/DayByDayAccordion.tsx`) | 每日折叠 |
| 4 | Highlights | inline | — |
| 5 | Tour Price | `<PricingMatrix>` (`components/itineraries/PricingMatrix.tsx`) | scroll-mt-24 锚点 |
| 6 | Tailor-Make Tips | `<TailorMakeTip>` (`components/itineraries/TailorMakeTip.tsx`) | — |
| 7 | Trip Notes | `<TripNotesGrid>` (`components/itineraries/TripNotesGrid.tsx`) | — |
| 8 | Advisor pull | `<AdvisorPullCta>` (`components/itineraries/AdvisorPullCta.tsx`) | — |
| 9 | Final CTA | inline | → `/plan?itinerary=${slug}` |

- 数据：`lib/data/itineraries.ts`（**131KB**，单文件 5 行程全展开），**5 条全 status: 'mock'**

---

### 1.6 `/visa-free` 决策工具 — `app/visa-free/page.tsx`
chrome：默认 `<TopNav>` + `<Footer>`
6 个 section（`page.tsx:36-167`）：
1. **Hero**（暗段，`page.tsx:36-75`）— 北京天际线背景 + `<ChineseSeal text="客">` + 来源链接 `SOURCE_URL`（NIA 公告）+ `NIA_REVIEWED` 日期
2. **Decision Tool**（`page.tsx:77-88`）— 渲染 `<DecisionTool>` (`components/visa-free/DecisionTool.tsx`)，4 步决策（passport → port → onward → duration）
3. **Caveats**（`page.tsx:90-109`）— `<VisaFreeCaveats>` 条目列表
4. **Ready-made routes**（`page.tsx:111-120`）— `<VisaFreeReadymade>` 已写好的过境路线
5. **Quick contact**（`page.tsx:122-131`）— `<QuickContactCard>`（`components/visa-free/QuickContactCard.tsx`）
6. **Tailor-Make CTA**（`page.tsx:133-167`）→ `/plan?type=visa-free`

- ⚠ **唯一全套 status: 'verified' 的真实公告数据**：`lib/data/visa-free.ts:VISA_FREE_RULES` / `VISA_FREE_PORTS` / `THIRD_DESTINATIONS` / `READYMADE_ROUTES`
- `VisaFreePageClient.tsx` 是 client 子组件包，处理 zh/en 文案切换

---

### 1.7 `/plan` 5 步表单 — `app/plan/page.tsx`
chrome：`<TopNav variant="always-chromed">` + `<Footer>`
- 渲染 `<PlanWizard initialVisaFree={type === 'visa-free'}>`（`components/wizard/PlanWizard.tsx`，37KB）
- `?type=visa-free` 时直接跳到 step 3（`PlanWizard.tsx:69`）
- ⚠ "5-step" 实际 = 5 个 step（`WizardStep = 0|1|2|3|4`，`TOTAL_STEPS = 5`）：

| Step | 名称 | 字典 key | 内容 |
|---|---|---|---|
| 1 (idx 0) | When + Length | `step1` | 出行月份 / 节奏长度 |
| 2 (idx 1) | Who | `step2` | 同行人数 / 群体 / 儿童 |
| 3 (idx 2) | Interests | `step3` | 主题 chips + 备注 |
| 4 (idx 3) | Budget | `step4` | 预算等级 + 酒店偏好 |
| 5 (idx 4) | Contact | `step5` | 姓名 / email / 国家代码 / 手机 / WhatsApp / WeChat / 条款勾选 |

- 提交：POST `/api/leads`（`PlanWizard.tsx:929`）
- WhatsApp escape hatch 全程可用（首页 hero/banner/wizard 都有 `wa.me/` 链接，号码占位）
- 字典数据 `dictionaries/zh.ts:443+`

---

### 1.8 `/about` — `app/about/page.tsx`
chrome：`<TopNav>` + `<Footer>`
7 个 section（`page.tsx:24-241`）：
1. Hero
2. Why we started（origin 故事）
3. Meet our team — 渲染 `<AdvisorCard>` × ADVISORS（3 位顾问）
4. Our promise — `<PromiseList>` (`components/about/PromiseList.tsx`)
5. How we work
6. Pricing transparency
7. CTA

数据：`lib/data/advisors.ts:ADVISORS = [lin, mei, wei]`，**3 条全 status: 'mock'**

---

### 1.9 `/reviews` — `app/reviews/page.tsx`
chrome：`<TopNav>` + `<Footer>`
7 个 section（`page.tsx:44-225`）：
1. Hero
2. Status block — `<EarlyStatusBanner>` (`components/reviews/EarlyStatusBanner.tsx`)
3. What we promise（6 承诺）— `<PromiseList>`
4. Awards（空状态）
5. Trustindex / Tripadvisor 占位
6. Sample of how reviews will look
7. CTA

> 跟 about 共用 `<PromiseList>` 和 `<MockBadge>` `<ChineseSeal>`。

---

### 1.10 `/themes/[slug]` — `app/themes/[slug]/page.tsx`
- 数据**写死在 page 文件 `THEMES` 里**（`page.tsx:14-43`），**4 个 slug**：
  `family` / `nature` / `business-add-on` / `heritage`
- `generateStaticParams`（`page.tsx:45-47`）= `Object.keys(THEMES)`
- ⚠ **没有 `/themes` 列表页**（PathCFooter 的"主题（v1.5 上线）" `/themes` 链接会 404）
- 简单介绍页：title / kicker / description / bullets，提供 CTA 回 `/plan` `/itineraries`
- chrome：`<TopNav>` + `<Footer>`

---

### 1.11 `/hero-pick` — `app/hero-pick/page.tsx`
- ⚠ **内部 review 页**，文件头注释明说"决策完毕后告诉 lead 编号即可换图，本路由 review 完毕后删除"（`page.tsx:11`）
- 5 张暖金时刻 hero 候选，70vh 渲染对比
- 没有 TopNav/Footer，纯 client component

---

### 1.12 `/client/{prototype,workflow,progress}` — 内部交付 portal
- 共享 layout `app/client/layout.tsx`：3 个 tab（原型 / 流程 / 进度），暖米色调
- `/client/prototype` — `app/client/prototype/page.tsx`（**1258 行**）：交互式中国地图 + 地标点击展开 detail 信息
- `/client/workflow` — `app/client/workflow/page.tsx`：流程说明
- `/client/progress` — `app/client/progress/page.tsx`：状态彩色徽章，数据源 `docs/client-progress.json`
- ⚠ 这套是**给客户内部 review 的小 portal**，不是公开站的产品页

---

## 2. API 路由

### `/api/leads` POST — `app/api/leads/route.ts`
- runtime: nodejs
- 流程：
  1. `leadFormSchema.safeParse(raw)`（`lib/data/lead-form.ts`，含 honeypot 字段 `company_website` + Cloudflare Turnstile token）
  2. honeypot 命中 → 200 假装成功（`route.ts:117-121`）
  3. 速率限制 5 次 / 60s / IP（`route.ts:140-143`）
  4. Turnstile 验证（`TURNSTILE_SECRET_KEY`，未设则 dev 跳过）
  5. 写 Drizzle/Supabase `schema.leads`（`route.ts:153-173`）
  6. 异步通知飞书 webhook（`FEISHU_WEBHOOK_URL`，未设则 console.log）
  7. 返回 `{ ok: true, id: rowId }`
- 调用方：`<LeadForm>` (`components/sections/LeadForm.tsx:155`) + `<PlanWizard>` (`components/wizard/PlanWizard.tsx:929`)

---

## 3. 内部跳转矩阵（谁跳到谁）

```
/  (HomeHero)     ──→ /itineraries/sample-10d       ("看完整行程"、anchor card)
                  ──→ /plan                         (主 CTA)
   (TopNav)       ──→ /destinations | /itineraries | /visa-free | /about
                  ──→ /stories  ✗ soft-404 dialog（拦截）
                  ──→ /advisors ✗ 路由不存在
                  ──→ /more     ✗ 路由不存在
                  ──→ /plan     (CTAPrimary)
                  ──→ /auth/sign-in | /auth/sign-up ✗ 都不存在
   (VisaFreeBanner) ──→ /visa-free
   (DestinationGrid) ──→ /destinations/{slug} × 8
   (SampleItineraries) ──→ /itineraries  +  /itineraries/{slug} × 5
   (LeadForm)     ──→ POST /api/leads

/destinations                   ──→ /destinations/{slug}
                                ──→ /plan
/destinations/{slug}            ──→ /  (回首页)
                                ──→ /plan?destination={slug}
                                ──→ /itineraries/{itSlug} (matchedItineraries.available)
                                ──→ wa.me/?text=...
                                ──→ 邻近 destination

/itineraries                    ──→ /itineraries/{slug}
                                ──→ /plan
/itineraries/{slug}             ──→ /itineraries  (回列表)
                                ──→ /plan?itinerary={slug}

/visa-free                      ──→ /plan?type=visa-free        (Tailor-Make CTA)
                                ──→ /  (回首页)
                                ──→ Decision Tool 内部 step

/plan         (PlanWizard 5 步) ──→ POST /api/leads (步 5 提交)
                                ──→ ?type=visa-free 直接跳 step 3

/about                          ──→ AdvisorCard × 3 (含 wa.me/, 暂无独立顾问页)
/reviews                        ──→ /plan
/themes/{slug}                  ──→ /plan、/itineraries

(Footer 通用)                   ──→ /destinations | /itineraries | /visa | /stories ✗ | /best-time ✗
                                ──→ /advisors ✗ | /about/voices | /careers ✗
                                ──→ /press ✗ | /contact/wechat ✗
                                ──→ /legal/{privacy,terms,icp} ✗
(PathCFooter 仅首页)            ──→ /plan | /visa-free | /destinations | /itineraries
                                ──→ /itineraries/sample-10d | /themes ✗(列表无)
                                ──→ /about | /reviews | /about#contact
                                ──→ /legal/{privacy,terms,icp} ✗
```

> ✗ = 链接存在但目标 page 文件不存在；或被 `soft404: true` 标记，TopNav 内拦截到 dialog。

---

## 4. 数据层 status 分布

| 数据文件 | 大小 | 条数 | status | 守门 |
|---|---|---|---|---|
| `lib/data/destinations.ts` | 42KB | **8** dest | 全 `'mock'`（8/8）| `<MockBadge>` + `scripts/prelaunch-mock-guard.ts` |
| `lib/data/itineraries.ts` | 131KB | **5** itinerary | 全 `'mock'`（5/5）| 同上 |
| `lib/data/advisors.ts` | 7.8KB | **3** advisor (lin/mei/wei) | 全 `'mock'`（3/3）| 同上 |
| `lib/data/visa-free.ts` | 34KB | 多张表（rules/ports/destinations/routes）| **全 `'verified'` + lastReviewed**（NIA 公告真数据）| 来源链接 `SOURCE_URL` |
| `lib/data/trust-proofs.ts` | 10KB | 8+ 条 proof | 全 `'mock'` | `<MockBadge>` |
| `lib/data/contact-channels.ts` | 2KB | 4 channel | 全 `'mock'`（type: `'verified' \| 'mock' \| 'pending'`）| inline |
| `lib/data/lead-form.ts` | 6KB | zod schema | — | — |
| `lib/data/locales.ts` | 283B | zh / en | — | — |

> **唯一可信数据**是 visa-free（NIA 公告 + lastReviewed=`REVIEWED`）。其他全 mock 占位，上线前要替换。

---

## 5. 反常 / 特殊发现

1. **Footer 双轨**：`<PathCFooter>` 仅首页用（数据走 zh 字典）；`<Footer>` 给所有非首页用（数据**硬编码**在组件文件 `Footer.tsx:12-49`，且大量链接是 soft404 / 不存在）。两套口径不一致。
2. **TopNav 6 项里 `/advisors` 路由实际不存在**（`zh.ts:43` 列了，但 `app/advisors/` 目录没有），点击会 404。
3. **`/stories` 是真 soft404**：TopNav 拦截到 `<SoftFourOhFourDialog>`（`TopNav.tsx:387-449`），不会跳转。
4. **`/more` "更多"假下拉**：TopNav 直接 `<Link href="/more">` 但路由不存在，非 soft404 拦截，会真 404。
5. **`/themes` 没列表页**：只有 `[slug]` 动态页（4 个 slug），但 PathCFooter 把 `/themes` 当链接给出。
6. **`/hero-pick` 是内部 review 页**，文件头注明"review 完毕后删除"，目前还在。
7. **`/client/*` 是给客户内部 review 的 portal**（原型/流程/进度），不是公开产品页；shipped 前应该收紧或不指南到。
8. **`/auth/sign-in` `/auth/sign-up`** 在 TopNav 用户菜单里出现，但**两个路由都不存在**；上线前要么补、要么隐藏入口。
9. **legal 链接全占位**：`/legal/privacy|terms|icp` 在两套 footer 都引用，**全部 page 不存在**。
10. **dest 详情 matchedItineraries**：每个目的地数据里有 `matchedItineraries` 数组，标 `available: false` 的是"筹建中"卡，但 `lib/data/itineraries.ts` 实际只有 5 个 slug，需校对每个 dest 引用的 itSlug 是否都在表里（潜在死链）。
11. **itineraries 数据是单 131KB 文件**，5 个行程全展开内联；后续扩到 v1.5 可能拆文件。
12. **PlanWizard 文件 37KB / 1058 行**，包含 5 个 Step 函数 + reducer + dispatch + 提交 + 草稿恢复（hydrate）；非常重。
13. **WhatsApp 号占位**：所有 `wa.me/` 链接都没带号码（`https://wa.me/`），上线前要全局替换。
14. **`/about/promise` `/about/responsible-travel` `/about/voices`** 在 Footer 里被指向，但 `app/about/` 下只有 `page.tsx` 一个文件，三个子路由不存在。
