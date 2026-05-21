# 信息收集报告 — chinahighlights 子页面拆解 + 我们现状 token 使用地图

reporter: detail-tokens-reviewer (task #33)
nature: 纯事实记录 — 不评价、不推荐、不出 spec、不做配色判断
scope: chinahighlights 7 类子页面结构 + 视觉决策 + 跳转动线；我们当前页面与 token 使用现状

---

## 0. 报告守则

- 不写"推荐 / 应该 / 建议"
- 不给配色路径判断
- 不出详情页 spec / schema
- 不做设计层 recommendation
- chinahighlights 文案 0 复制粘贴；只记录结构、字段名、跳转 href、可量化的视觉数据
- 决策权全部留给 lead

---

## 1. chinahighlights 子页面拆解

### 1.0 抓取实测路径与 404

| 想抓 | 真实可达 URL | 备注 |
|---|---|---|
| home | `/` | OK |
| tour 详情 | `/china-tours/natural-wonders-discovery.htm` | OK，单样本 36k 像素 |
| tour 列表 | `/china-tours/` | OK |
| city | `/beijing/` | OK |
| theme | `/family-tours/` | OK（不是 `/travelguide/family-travel/`，那个 404）|
| best-time（city） | `/beijing/weather.htm` → 重定向到 `/beijing/best-time-to-visit.htm` | OK |
| month | `/weather/october.htm` | OK |
| reviews | `/reviews.htm`（带 `.htm`）| `/reviews/` 404 |
| about | `/aboutus/` | OK |
| inquiry 表单 | `/forms/create-my-trip.htm` | OK |
| 备选 tour | `/china-tours/eight-day-classic-tour.htm`、`/8-day-china-classic-tour.htm`、`/beijing-tours/` | 全 404 |

每个真实可达页都已抓 fullPage 截图 + DOM evaluate，存到 `qa/ui-ux-review/detail-tokens/competitor/<type>/`。

### 1.1 home (chinahighlights.com/)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/00-home-fullpage.png` |
| Body bg | `rgb(255,255,255)` 纯白 |
| 已有解构 | `~/.claude/tmp/search/chinahighlights/REFERENCE-PACKET.md`（6 维度矩阵）|

本轮重抓首页只为颜色采样与对照，不再补结构（packet 已覆盖）。

### 1.2 tour 详情页 (`/china-tours/natural-wonders-discovery.htm`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/01-tour-natural-wonders-fullpage.png`（36268 px 长）|
| viewport | `competitor/01-tour-natural-wonders-hero.png` |
| a11y snapshot | `competitor/01-tour-natural-wonders.md` |
| Page H1 | "14-Day China Natural Wonders Discovery" |
| 字数 | 3610 |
| 标题数 | 29（H1=1 / H2=10 / H3=18）|
| Body bg | `rgb(255,255,255)` |
| Body fg | `rgb(32,32,32)` |
| 米黄分区 bg | `rgb(248,243,239)` ≈ #F8F3EF |
| 主 CTA "Start Your Journey" | bg `rgb(190,25,42)` ≈ #BE192A + 白字 |
| 询价 CTA "Inquire / Send My Inquiry" | bg `rgb(173,24,24)` ≈ #AD1818 + 白字 |
| 副 CTA 边框版 | 白底 + #AD1818 边 + 红字 |
| 高亮色集合 | red 190/25/42、red 173/24/24、red 198/22/43、orange 242/97/34（极少）|
| H1/H2 颜色 | `rgb(32,32,32)` 黑灰，无色彩 |
| 价格锚点 | "US$4,009" 起 + 5 等级（US$400 / US$200 / US$100 / US$100 / US$100）|
| 转化 CTA 节点 | Start Your Journey × 3 + Inquire × 2 + Contact us × 1 = 6 个主转化触点 |
| Tailor-Make 触点 | 5 处 H3 "Tips to Tailor-Make Your Tour"（在 Itinerary 段每一段后）|

**章节顺序（按文档流）**：

```
1. Hero（标题 + 价格起 + Start Your Journey 红 CTA + Inquire 红边 CTA）
2. Suggested 14-Day Itinerary（H2）
3. Beijing-Xi'an-Zhangjiajie-Shanghai Tour Map（H2）
4. Tour 'Wow' Points（H2，下设 7 个 H3 动词起头）：
   - Discover the Hidden Halls in the Forbidden City
   - Walk on a Delicate Mixture of the Restored and Wild Great Wall
   - Meet the Terracotta Army and Make Your Own Terracotta Warriors
   - Witness the Closest Things on Earth to the Hallelujah Mountains
   - Walk on the World's Longest and Highest glass-floored bridge
   - Go Cycling in the Most Beautiful Countryside of China
   - Enjoy a Half-Day Customized Icing-on-the-Cake Experience in Shanghai
5. Itinerary Quick Look（H2，含 5 处 Tailor-Make tips × 5）
6. Trip Notes（H2，下设 H3：1. Extend the Tour / 2. Accommodation / 3. Transportation / 4. Meals）
7. Tour Price（H2，含 H3 "Your 1:1 travel consultant will reply within 1 working day"）
8. A Global Network of Trust and Recognition（H2）
9. Let the Journey Come to You（H2）
10. Why China Highlights（H2，下设 H3 Our Belief / Our Promise）
```

### 1.3 tour 列表页 (`/china-tours/`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/list/01-china-tours-fullpage.png` |
| Page H1 | "Private China Tours 2026/2027: Customized, No Shopping Stops" |
| 字数 | 1038 |
| 总长度 | 9181 px |
| Tour 卡链接数 | 40 个 `/china-tours/*.htm` |
| filter / facet 数 | 0（DOM 没有 select/role=tab/class=filter 实现）|

**章节顺序**：
```
1. Hero（H1 + 价格区间或主图）
2. Top China Private Tours: 1-2 Weeks（H2）
3. Top China Private Tours: 2 Weeks+（H2）
4. Travelers Love China Highlights（H2）
5. Asia Multi-Country Tours Including China（H2）
6. Top City Tours（H2）
7. A Global Network of Trust and Recognition（H2）
8. Let the Journey Come to You（H2）
9. Why China Highlights（H2 + 子 H3 Our Belief / Our Promise）
```

**tour 卡跳转动线（前 12 个）**：
- `/china-tours/natural-wonders-discovery.htm` "2-Week China Natural Wonders Discovery"
- `/china-tours/china-essence-panda-tour.htm` "2-Week China Essence and Panda Tour"
- `/china-tours/china-landmarks.htm` "3-Week Grand Tour of China's Landmarks"
- `/china-tours/must-see-places-including-tibet.htm` "3-Week Must-See Places China Tour Including Holy Tibet"
- `/china-tours/top-tours.htm` "Top China Tours"
- `/china-tours/couple-tours.htm` "Couple"
- `/china-tours/food-tours.htm` "Foodie Journeys"
- `/china-tours/hiking-tours.htm` "Hiking Adventures"

**事实**：列表是分类网格（按时长分组 + 按主题分组），不是 facet 筛选。

### 1.4 city 页 (`/beijing/`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/city/01-beijing-fullpage.png` |
| Page H1 | "Beijing Travel Guide" |
| 字数 | 1062 |
| 总长度 | 10611 px |
| 内部 nav 链接数 | 80 |

**章节顺序**：
```
1. Hero（H1）
2. Top Attractions & Places to Visit in Beijing（H2）
3. How to Plan a Trip to Beijing（H2）
4. Travelers Love China Highlights（H2）
5. Top Private Beijing Tours（H2）
6. Beijing Travel Guide by Month（H2）
7. What to Eat in Beijing（H2）
8. Beijing Maps（H2）
9. A Global Network of Trust and Recognition / Let the Journey Come to You / Why China Highlights（站级 footer 段）
```

**跳转动线统计（href segment 出现次数）**：
- `china-tours/` 19 次
- `weather/` 13 次
- `travelguide/` 4 次
- `customer-stories/` 3 次
- 其他城市 1 次每（chengdu / chongqing / guilin / hong-kong / pingyao / shanghai / xian / huangshan / jiuzhaigou / zhangjiajie 等共 28 城）
- `aboutus/` 2 次
- `china-trains/` 1 次

city 页是**多入口枢纽**：进 tour 列表 / 月份天气 / 攻略 / 客户故事 / 跨城跳转 / about。

### 1.5 theme 页 (`/family-tours/`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/theme/01-family-tours-fullpage.png` |
| Page H1 | "China Family Tours 2026/2027: Ancient Heritage Meets Robot Adventures" |
| 字数 | 1030 |
| 总长度 | 8256 px |

**章节顺序**：
```
1. Hero（H1）
2. Top Private China Family Tours（H2）
3. Travelers Love China Highlights（H2）
4. Good to Know Before Your Go（H2）
5. Combine China with Asia（H2）
6. FAQs about Your China Trip with Kids（H2，FAQ 嵌入此处不是独立页）
7. A Global Network of Trust and Recognition / Let the Journey Come to You / Why China Highlights（站级 footer 段）
```

**事实**：theme 页比 city 页轻（10611 vs 8256 px），核心是"theme + tour 卡 + reviews + FAQ"四件套。FAQ 在这里是嵌入段，不在独立路由。

### 1.6 best-time（city 级） (`/beijing/best-time-to-visit.htm`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/best-time/01-beijing-best-time-fullpage.png` |
| Page H1 | "Best (& Worst) Times to Visit Beijing: Travel Tips for 12 Months" |
| 字数 | 1834 |
| 总长度 | 13939 px |

**章节顺序**：
```
1. Hero（H1）
2. Content Preview（H2，目录式）
3. Best Times to Visit Beijing for Good Weather（H2）
4. Best Times to Visit the Great Wall（H2）
5. Best Times to Visit Beijing for a Family Trip（H2）
6. Best Times to Visit Beijing for Low Prices（H2）
7. Best Times to Visit Beijing for Festivals（H2）
8. The Worst Times to Visit Beijing（H2，正面+负面双视角）
9. Beijing Travel Guide by Month（H2，下设 H3 12 个：Beijing in January … December）
10. Recommended Beijing Tours（H2）
11. Why China Highlights (10,000+ reviews & 98.8% 5-star rating)（H3）
12. 站级 footer 三段
```

**跳转动线**：
- 站级月份页：`/weather/january.htm` … `/weather/december.htm`（12 条）
- 城市级月份页：`/beijing/weather/january.htm` … `/beijing/weather/december.htm`（12 条）

**事实**：单页 6 个"为什么来"切片（天气 / 长城 / 家庭 / 价格 / 节日 / 最差时段）+ 12 个月明细。1834 字承载这些。

### 1.7 month 页 (`/weather/october.htm`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/month/01-october-fullpage.png` |
| Page H1 | "China Weather in October 2026: Where to Go, Crowds, and Costs" |
| 字数 | 2575 |
| 总长度 | 20179 px |

**章节顺序**：
```
1. Hero（H1）
2. Is October a Good Time to Visit China?（H2）
3. China Weather in October: Overview（H2）
4. Top 10 Places to Visit in China in October（H2，下设 10 个 H3）：
   1. Daocheng Yading — The Last Pure Land on Earth
   2. Populus Euphratica Forest in Inner Mongolia
   3. Kanas in North Xinjiang
   4. Jiuzhaigou
   5. Beijing: Embracing History Amid Fall Foliage
   6. Shanghai: the Modern Marvels of Fall
   7. Tibet: Spirituality and Majesty in Harmony
   8. Zhangjiajie: Avatar's Enchanted Realm
   9. Guilin: Autumn's Splendor in Karst Landscapes
   10. The Silk Road: Tracing Ancient Trade Routes
5. Discover China in October with Us（H2）
6. Monthly Weather and Travel Information for China（H2）
7. Why China Highlights (10,000+ reviews & 98.8% 5-star rating)（H3）
8. 站级 footer 三段
```

**事实**：month 页比 best-time 长 6240 px / 多 741 字，主体是"10 places"内容栈（每条都对应一条 destination + tour 跳转）。

### 1.8 reviews 页 (`/reviews.htm`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/reviews/01-reviews-fullpage.png` |
| Page H1 | "Our Reviews: Real Feedback on Trusted Platforms" |
| 字数 | 1695 |
| 总长度 | 7681 px |
| review 数字 | Tripadvisor 16,917 / Feefo 485 / Google 15,889 / 第四方 543 |
| 提及平台 | Tripadvisor / Google / Travelers（'Choice 字样）|
| 嵌入方式 | Trustindex 第三方 widget（DOM 类名 `ti-header-rating-reviews` 等多次重复）|

**章节顺序**：
```
1. Hero（H1）
2. Our Awards（H2，下设 H3 Travelers' Choice / Certificate of Excellence）
3. 平台聚合：Tripadvisor + Google + Feefo + Trustindex 区块（widget 嵌入）
4. 站级 footer 三段
```

**事实**：reviews 页不存原创评价文本，全靠第三方 widget 数字 + 奖项展示。

### 1.9 about 页 (`/aboutus/`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/about/01-aboutus-fullpage.png` |
| Page H1 | "About China Highlights" |
| 字数 | 970 |
| 总长度 | 9662 px |

**章节顺序**：
```
1. Hero（H1）
2. Proven Excellence By The Numbers（H2）
3. Experts in Customizing Your Trip（H2）
4. Meet Our Team（H2）
5. Guaranteed Satisfaction on the Ground（H2）
6. What You Will Experience（H2）
7. Best Rated Reviews（H2）
8. Our Awards（H2）
9. More About Us（H2）
10. 站级 footer 三段
```

### 1.10 inquiry 表单 (`/forms/create-my-trip.htm`)

| 字段 | 值 |
|---|---|
| 截图 | `competitor/inquiry/01-create-my-trip-fullpage.png` |
| Page H1 | "Unlock Your Personalized & Stress-free China Journey" |
| 字数 | 1007 |
| 总长度 | 3325 px |
| 字段总数 | 49 个 input/select/textarea |
| 步骤化 fieldset 数 | 1（不是多步 wizard，单页一次性铺开）|

**字段分组（按 H2 段落归类）**：

```
* Where would you like to travel?  H2
  - destination[] checkbox × 12（Beijing / Xian / Shanghai / Guilin / Yunnan / Chengdu /
    Chongqing / Yangtze / Zhangjiajie / Tibet / Huangshan / Silk）
  - other_destination textarea

* When would you like to travel to China?  H2
  - trip_date radio × 3（exact / approximate / yet=未定）
  - date_start text "Select your exact travel date."
  - expected_month select
  - trip_length select

* What type of hotel would you like to stay in?  H2
  - hotel radio × 6（Luxury / fiveStar / fourStar / threeStar / Simple / selfbooking）

* How many people will participate in this trip?  H2
  - travel_group radio × 4（Family / Couple / Other / Solo）
  H3 Adults number (age ≥ 18 yrs old)
    - adult_18_plus select
  H3 Children number (age of children at time of trip)
    - teenager_10_17 select   (10-17 岁)
    - children_3_9 select      (3-9 岁)
    - infant_0_2 select        (0-2 岁)

* How should we contact you?  H2
  - name text "Your name"
  - email email "Your email address"
  - country_code select
  - PhoneNo tel "Your phone number"
  - contact_via_WhatsApp checkbox
  - contact_via_iMessage checkbox

Finally, any additional information you'd like to share  H2
  - additional_requirements textarea
  - interests[] checkbox × 6（Birthday / Anniversary / Honeymoon / graduation /
    Retirementgift / visitfriend）

隐藏 / 验证：
  - product_code hidden
  - g-recaptcha-response textarea
```

**事实**：单页全表展开，不分步。Required 字段用 `*` 前缀 H2 标记。内容长度 3325 px，跟 reviews 页（7681 px）和 best-time 页（13939 px）相比相对短。

### 1.11 共同 footer 段（每页都有）

每个内容页（除 inquiry 表单）末尾都重复以下三段：
```
H2 A Global Network of Trust and Recognition
H2 Let the Journey Come to You
H2 Why China Highlights
   H3 Our Belief
   H3 Our Promise
```

### 1.12 跨页跳转动线汇总

```
home / city → tour 列表 (/china-tours/)
home / city → 月份页 (/weather/<month>.htm)
city → city 级月份页 (/beijing/weather/<month>.htm)
city → city 级 best-time 页
city → 攻略 (/travelguide/...)
city → 客户故事 (/customer-stories/...)
city → 跨城（28 城互链）
tour 详情 → inquiry 表单 (/forms/create-my-trip.htm?product_code=cht-hn-01)
month / best-time / theme → tour 详情
任意页 → reviews / aboutus（站级 footer）
```

### 1.13 站级配色采样

| 元素 | RGB | hex |
|---|---|---|
| Body bg | rgb(255,255,255) | #FFFFFF |
| Body fg | rgb(32,32,32) | #202020 |
| 主 CTA bg | rgb(190,25,42) | #BE192A |
| 询价 CTA bg | rgb(173,24,24) | #AD1818 |
| 副分区 bg | rgb(248,243,239) | #F8F3EF |
| H1/H2 fg | rgb(32,32,32) | #202020 |
| 出现的非黑非白色集合 | red 190/25/42、red 173/24/24、red 198/22/43、red 198/22/42、orange 242/97/34 | — |

---

## 2. 我们的现状记录（不评价，只记录）

### 2.1 截图清单

| 页面 | 文件 |
|---|---|
| 首页 | `qa/ui-ux-review/detail-tokens/ours/00-home-fullpage.png` |
| destinations/beijing | `ours/01-destinations-beijing-fullpage.png` |
| destinations/zhangjiajie | `ours/02-destinations-zhangjiajie-fullpage.png` |
| destinations/jiuzhaigou | `ours/03-destinations-jiuzhaigou-fullpage.png` |
| itineraries/sample-10d | `ours/04-itineraries-sample10d-fullpage.png` |
| themes/family | `ours/05-themes-family-fullpage.png` |

### 2.2 destinations/[slug]（`app/destinations/[slug]/page.tsx`，160 行）

**章节顺序**：
```
1. Hero section（min-h-[80vh]，bg-deep-slate + 全屏 next/image + 暗渐变蒙版）
   - GPS · IATA metadata（小字 widegram）
   - H1 英 + 中文名（40/72px font-misans-heavy）
   - tagline 一行
   - 左上 ArrowLeft "回首页"链接

2. 主体 section（bg-deep-slate，py-16/24）
   - lg:grid-cols-[1fr_minmax(0,420px)] 两栏
   - 左栏：kicker "这一站值得去吗" + 80-150 字 intro + 一行 footnote
   - 右 aside：bg-charcoal-blue/40，单 CTA "把 X 加进我的行程"（CTAPrimary）+ WhatsApp 链接
```

**8 个 slug**：beijing / xian / shanghai / guilin / zhangjiajie / jiuzhaigou / dali / huangshan，每个有 cn / en / tagline / intro / src / iata / gps 7 个字段。

### 2.3 itineraries/sample-10d（57 行）

**章节顺序**：
```
1. main（bg-deep-slate）
   - kicker "SAMPLE ITINERARY"
   - H1 "10 天第一次来中国样板行程"
   - 一段 80-100 字 description
   - 5 个 day-pair 卡（D1-D2 北京 / D3-D4 西安 / D5-D6 张家界 / D7-D8 桂林·阳朔 / D9-D10 上海）
   - 右 aside：bg-charcoal-blue/45，CTA "免费定制行程" + "回到首页"
```

每个 day-pair 卡只有 [day, place, detail]（一行 30-50 字）三字段。

### 2.4 themes/[slug]（102 行）

**章节顺序**：
```
1. main（bg-deep-slate）
   - kicker（如 FAMILY TRAVEL）
   - H1 主题标题
   - description 80-100 字
   - 3 个 bullet 卡
   - 右 aside：CTA "用这个方向定制行程"
```

**4 个 slug**：family / nature / business-add-on / heritage，每个 4 字段（slug / title / kicker / description / bullets[3]）。

### 2.5 itineraries 列表 (`app/itineraries/page.tsx`)

bg-deep-slate + charcoal-blue 单层 list 容器；卡片层级浅。

### 2.6 plan 页 (`app/plan/page.tsx`)

bg-deep-slate text-soft-ivory（暗底）。

### 2.7 首页（`app/page.tsx`，11 个 section）

按文档流：
```
1. TopNav
2. HomeHero          bg-deep-slate text-soft-ivory（暗底 hero）
3. TrustStrip
4. HowWeWork         bg-cream（暖底）
5. DestinationGrid   bg-cream（暖底）
6. SampleItineraries bg-paper（暖底）
7. Specialists
8. TrustProofGrid    bg-cream（暖底）
9. LeadForm          bg-paper（暖底）
10. FAQ              bg-paper（暖底）
11. PathCFooter      bg-deep-slate（暗底）
```

### 2.8 我们的页面级 bg / fg 对照

| 页面 | 主 bg | 主 fg |
|---|---|---|
| `app/layout.tsx` (body) | bg-cream | text-ink |
| 首页中段（HowWeWork / DestinationGrid / TrustProofGrid / LeadForm / FAQ / SampleItineraries）| bg-cream / bg-paper | text-ink |
| HomeHero / PathCFooter | bg-deep-slate | text-soft-ivory |
| destinations/[slug] | bg-deep-slate（hero + 主体）| text-soft-ivory |
| themes/[slug] | bg-deep-slate | text-soft-ivory |
| itineraries/sample-10d | bg-deep-slate | text-soft-ivory |
| itineraries（list） | bg-deep-slate | text-soft-ivory |
| plan | bg-deep-slate | text-soft-ivory |
| hero-pick | bg-deep-slate | text-soft-ivory |

---

## 3. tokens 使用地图（grep 实测）

### 3.1 token 定义来源（`app/globals.css`）

```css
/* Path C OKLCH（暖底，2026-05-21 lock） */
--color-cream     oklch(0.98 0.005 80)     html/body 默认 bg
--color-paper     oklch(0.96 0.005 80)     副暖底
--color-ink       oklch(0.20 0.020 250)    暖深灰，body 默认 text
--color-ink-soft  oklch(0.40 0.015 250)    副文字
--color-jade      oklch(0.42 0.06 155)     绿
--color-jade-soft oklch(0.55 0.05 155)
--color-gold      oklch(0.78 0.10 75)

/* legacy v0.2（冷底，hero/详情页/footer 仍在用）*/
--charcoal-blue   #1a2538
--deep-slate      #0f172a
--soft-ivory      #fdfbf7
--mist-gray       #94a3b8
--alpine-blue     #38bdf8
--paper-gold      #c9a65c

/* 品牌 */
brand wordmark SVG: #C8102E（圆点，仅出现在 brand 组件，不在任何 Tailwind utility token 里）
```

### 3.2 token 全站出现次数（grep app/ + components/，不计 .claude / node_modules / docs）

| token | 总次数 |
|---|---|
| `soft-ivory` | 120 |
| `ink` | 35 |
| `alpine-blue` | 28 |
| `charcoal-blue` | 20 |
| `ink-soft` | 12 |
| `jade` | 12 |
| `deep-slate` | 12 |
| `cream` | 8 |
| `gold` | 4 |
| `jade-soft` | 3 |
| `paper` | 2 |
| `paper-gold` | 0（grep 命中 0）|
| `mist-gray` | 0（grep 命中 0）|

注：`bg-paper` 在组件中实际有使用（FAQ / SampleItineraries / LeadForm），上表 grep 模式漏命中（命中 paper-gold 时优先匹配）。这个数字是 token-as-suffix 的最严格匹配；实际 paper 出现次数 ≥ 8。`paper-gold` / `mist-gray` 在所有 .tsx/.ts/.css 中确实是 0 次（client/prototype 子目录里 paper-gold 仍被引用）。

### 3.3 高频 token 落点（top 文件）

| 文件 | 总命中 | token 分布 |
|---|---|---|
| `components/chrome/TopNav.tsx` | 40 | charcoal-blue:2 soft-ivory:29 alpine-blue:8 deep-slate:1 |
| `components/floating/ChatLauncher.tsx` | 23 | charcoal-blue:3 soft-ivory:17 alpine-blue:3 |
| `app/destinations/[slug]/page.tsx` | 18 | deep-slate:3 charcoal-blue:3 soft-ivory:10 alpine-blue:2 |
| `components/trust/AdvisorProfileCard.tsx` | 18 | cream:1 ink:8 jade:3 jade-soft:1 gold:1 ink-soft:3 paper:1 |
| `app/hero-pick/page.tsx` | 17 | deep-slate:3 soft-ivory:11 charcoal-blue:2 alpine-blue:1 |
| `components/trust/TrustProofGrid.tsx` | 17 | cream:1 jade:1 ink:10 ink-soft:5 |
| `app/itineraries/sample-10d/page.tsx` | 12 | deep-slate:1 soft-ivory:7 alpine-blue:2 charcoal-blue:2 |
| `components/floating/InteractiveDock.tsx` | 12 | soft-ivory:9 charcoal-blue:1 alpine-blue:2 |
| `app/themes/[slug]/page.tsx` | 10 | deep-slate:1 soft-ivory:6 alpine-blue:1 charcoal-blue:2 |
| `components/contact/ContactChannelList.tsx` | 10 | jade:4 jade-soft:2 cream:1 paper:1 ink:2 |
| `components/atoms/DestinationTile.tsx` | 10 | soft-ivory:7 charcoal-blue:1 alpine-blue:2 |
| `components/trust/ReviewCard.tsx` | 8 | cream:1 ink:5 jade:1 ink-soft:1 |
| `components/trust/CaseStudyCard.tsx` | 8 | cream:1 ink:4 ink-soft:2 jade:1 |
| `app/itineraries/page.tsx` | 7 | deep-slate:1 soft-ivory:4 alpine-blue:1 charcoal-blue:1 |
| `components/atoms/Pill.tsx` | 7 | charcoal-blue:1 soft-ivory:5 alpine-blue:1 |
| `components/atoms/CTAGhost.tsx` | 7 | soft-ivory:5 alpine-blue:2 |
| `components/trust/CredentialStrip.tsx` | 6 | cream:1 ink:3 jade:1 ink-soft:1 |
| `app/plan/page.tsx` | 5 | deep-slate:1 soft-ivory:3 alpine-blue:1 |
| `components/atoms/VisaChip.tsx` | 4 | charcoal-blue:1 soft-ivory:2 alpine-blue:1 |
| `components/trust/MockBadge.tsx` | 4 | ink:1 gold:3 |
| `components/atoms/HeadlineGroup.tsx` | 4 | alpine-blue:1 soft-ivory:3 |
| `app/layout.tsx` | 2 | cream:1 ink:1 |
| `components/atoms/SectionContainer.tsx` | 2 | deep-slate:1 soft-ivory:1 |

完整 grep 原始结果：`C:\Users\Administrator\.claude\projects\D--projects-tourism-landing\32e1cd89-bc80-4cc1-9158-1e190c9f484d\tool-results\tooluse_IiuqRz0OcQvrfhkHepCqj0.txt`

### 3.4 token × 页面 群组归属（按 import / 使用域归类）

| token 群组 | 主要使用域 |
|---|---|
| **暖 (cream / paper / ink / ink-soft / jade / jade-soft / gold)** | trust 卡 (TrustProofGrid / CaseStudyCard / ReviewCard / CredentialStrip / AdvisorProfileCard) + ContactChannelList + 首页 cream/paper section + body 默认 + MockBadge + LeadForm 内部 |
| **冷 (deep-slate / charcoal-blue / soft-ivory / alpine-blue)** | TopNav / HomeHero / PathCFooter / 4 个详情页（destinations / themes / sample-10d / itineraries 列表）/ plan / hero-pick / Pill / VisaChip / CTAGhost / DestinationTile / Specialists 暗块 / ChatLauncher / InteractiveDock / SectionContainer / 详情页内所有 aside 块 |
| **未使用 (paper-gold / mist-gray)** | 0 次（仅 client/prototype 目录里 paper-gold 还在用，grep 路径已包括但未在统计中突出）|

### 3.5 token 范围内的 brand red 缺位事实

- `app/globals.css` 中**没有**任何一个 token 名为 red / vermilion / cinnabar / scarlet 类
- `components/` 全 grep `bg-red`、`text-red`、`border-red` 均 0 次
- brand SVG 中的 #C8102E 是 inline `fill` 属性，没有进入 Tailwind utility 体系
- legacy `--destructive: #f97e6e` 是橙红错误态色，不是品牌红

---

## 4. 报告关心范围之外（lead 自己处理）

- 红色 token 是否要进入：lead 自己定
- 详情页 bg-deep-slate vs bg-cream 切换：lead 自己定
- pandatravel 品牌方向落到具体设计上：lead 自己定
- 详情页章节骨架 / schema：lead 自己定
- Wow Points / Tailor-Make 节奏要不要借鉴：lead 自己定
- inquiry 表单从 49 字段单页变形成什么形态：lead 自己定

本报告只把上面所有事实整理到位，不替 lead 拍板。

---

## 5. 文件索引

```
qa/ui-ux-review/detail-tokens/
├── 2026-05-21-detail-tokens-review.md         本报告（信息收集）
├── ours/
│   ├── 00-home-fullpage.png
│   ├── 01-destinations-beijing-fullpage.png
│   ├── 02-destinations-zhangjiajie-fullpage.png
│   ├── 03-destinations-jiuzhaigou-fullpage.png
│   ├── 04-itineraries-sample10d-fullpage.png
│   └── 05-themes-family-fullpage.png
└── competitor/
    ├── 00-home-fullpage.png
    ├── 01-tour-natural-wonders-fullpage.png
    ├── 01-tour-natural-wonders-hero.png
    ├── 01-tour-natural-wonders.md
    ├── about/01-aboutus-fullpage.png
    ├── best-time/01-beijing-best-time-fullpage.png
    ├── city/01-beijing-fullpage.png
    ├── inquiry/01-create-my-trip-fullpage.png
    ├── list/01-china-tours-fullpage.png
    ├── month/01-october-fullpage.png
    ├── reviews/01-reviews-fullpage.png
    └── theme/01-family-tours-fullpage.png

参考：
~/.claude/tmp/search/chinahighlights/REFERENCE-PACKET.md   竞品 6 维度首页解构（之前轮已抓）
C:\Users\Administrator\.claude\projects\...\tool-results\tooluse_IiuqRz0OcQvrfhkHepCqj0.txt   token grep 全量原始结果
```
