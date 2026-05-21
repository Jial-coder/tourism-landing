# 首页版面 + 详情页内容深度评审 — 2026-05-21

> 评审师：layout-content reviewer（task #47 / 本会话 #30）
> 性质：只读评审，不动代码
> 范围：首页 9 section 版面密度 + hierarchy + 详情页内容深度（destinations / themes / itineraries / sample-10d）+ 转化路径完整性
> 不重复维度：动效 / lead-gen 漏斗 / TopNav i18n / 表单字段 / 颜色字体（前两轮已评）
> 评审视角 persona：**Daniel，35 岁澳洲律师，下个月想带 32 岁太太来中国 14 天，预算 USD 8K/人，没来过中国，担心语言和食物**

---

## TL;DR

**这网站现在不能吸引客户。** 不是因为难看，而是因为它**对一个海外游客来说几乎没有可读内容**：8 张 destination 卡里 4 张直接 404，所有"探索入口"实际都跳同一个 LeadForm 锚点，唯一一条 sample 行程只有 5 张一行字的卡。Daniel 滑完整页只学到一件事——"有人会回我邮件"，但不知道**会回什么、能给什么、价位什么样、自己 14 天该怎么过**。

最严重 3 个内容缺口（按对获客的实际伤害排序）：
1. **destinations/[slug] 8 个里 4 个 404**（beijing / xian / shanghai / huangshan）+ 在线的 4 个每页只有 279 字符 intro，无图集、季节、案例、价位、注意事项
2. **首页 9 section 里 8 个 CTA 全部指向 `#lead-form` 同一锚点**，整站没有可探索的"内容旅程"——读者除了填表无路可走
3. **价格区间 / 起步价 / 预算锚 在网站任何位置都不存在**（FAQ 都没回答），LeadForm 里有 `budgetOptions` 5 档但被锁在表单里看不到，Daniel 不知道自己的 USD 8K/人 是高还是低

下一阶段优先做：填详情页内容深度（让 8 个 destination 都能打开 + 每页至少 6 个内容模块）、把首页 8 个 #lead-form 改成"先去详情页 → 再到 LeadForm"两段式、加价位锚（首页 + FAQ + 详情页 sidebar 至少三处）。

---

## 评审视角

> 我是 Daniel，35 岁澳洲律师，下个月（其实是 6 月）想带 Sarah 来中国 14 天。预算 USD 8K/人。没来过。担心语言不通、食物吃不惯、签证。听同事说"找个本地顾问做定制"会舒服很多，但同事去的是日本，不能直接复用。
> 我打开了这个网站，标题写"和本地顾问，把中国玩成你自己的样子"。OK，我得搞清楚三件事：
> 1. 你们能做什么、做过什么样的、看几张图能不能让我相信
> 2. 我这个 USD 8K/人 / 14 天 / 6 月 大概对应什么级别的产品
> 3. 现在留资风险大不大、对方多久回我、他们会不会狂打电话推销

下面每个 section 我都用这三个问题去对。

---

## 首页版面密度（9 section 体检）

实测 desktop 1440×900 各 section 高度 + 实文字符数（不含空格折叠）：

| # | section / fid | 高度 px | 文字字符 | 信息密度 | hierarchy 清晰度 | 内容缺口 | 评分 1-5 | P0 改动方向 |
|---|---|---|---|---|---|---|---|---|
| 1 | HomeHero | 900 | 74 | 极低（hero 正常） | 高 | "为什么选你"在哪？hero 只是 tagline | 4 | 副标题改成"value prop + trust signal"，例如"自 2017 起服务 10K+ 海外旅客 · 24h 内由 Beijing 顾问回复" |
| 2 | TrustStrip | 412 | 232 | 低 | 中（4 数字平铺没主次） | 4 个数字都打了 "sample" 占位徽章，反信任 | 2 | sample 徽章是 mock 阶段必要，但视觉太抢；上线时切换；当下加一句"以下数据由顾问真实订单滚动统计" |
| 3 | **HowWeWork** | 742 | **145** | **极低（742px / 3 步 / 仅 145 字）** | 中 | 3 步只是话术（"Talk → Tailor → Travel"），没有"实际多久 / 流程几次邮件 / 谁参与" | 2 | 加 timeline 数据：步骤 1 = "你填完表，4-24h 内 Lin 给一封邮件；预算粗谈 1-2 轮，1 周内出方案" |
| 4 | DestinationGrid | 1068 (mobile 3924) | 193 | 中（8 张图 + 钩子句） | 中 | **每张卡都不可点详情页** href="#lead-form"；mobile 8 张大图垂直堆 3924px 极疲劳 | 2 | href 改成 `/destinations/[slug]`；mobile 改 2 列（4:5 改 16:11） |
| 5 | SampleItineraries | 736 | 411 | 中 | 高（3 张卡有日程 + outcome） | 3 个 case 都不可点详情；"durationDays / partySize / destinations" 是好数据但没价位 | 3 | 每张卡加价位段（"~$6K/人"），CTA 改成"看完整行程"指 sample-10d |
| 6 | Specialists | 1185 | 566 | 中 | 中（avatar 用 initials，无真人脸） | 头像是文字 initials → 跟"真人顾问"叙事矛盾；从业年限隐藏 | 2 | 至少放 placeholder 头像（mock 也要看起来像顾问）；显式列年限"9 yrs" |
| 7 | TrustGrid | 1994 | 1368 | 中-高 | 低（4 子段 advisors / cases / reviews / credentials 视觉权重一样） | 评价是占位、license 是占位、credential 视觉很弱 | 3 | 子段 hierarchy 区分（reviews 第一屏，credentials 折叠）；license / payment 用真品牌 logo（占位也要 logo 形） |
| 8 | LeadForm | 989 | 312 | 中（标题+表单标签） | 高 | budgetOptions 5 档很好但**只在表单里**；进表单前看不到价位锚 | 3 | 表单前置一段"参考预算"卡：USD 5K / 5-15K / 15-30K / 30K+ 三档典型旅程对应案例 |
| 9 | FAQ | 924 | 131 | **极低（手风琴折叠）** | 高 | 8 条 FAQ 都答得不错，但没有"价格区间"和"取消政策细节" 这两条是关键 | 3 | 默认展开第 1-2 条；加"我的预算够吗" + "取消政策" 两条 |
| 10 | PathCFooter | 327 | 181 | 标准 footer | 中 | 没有"当前是 mock 阶段，正式版本待 X 时间" 标识 | 4 | 已有 mockNotice，可读性更强一些 |

**整页（desktop）总高 ≈ 9.4K px / mobile 17K+ px，但实文字符 < 3.5K 个汉字**——大部分像素被图片背景、留白、占位符占据，文字密度（信息含量 / 像素）大约只有同档高端定制游网站的 30-40%。

### 11 section 之缺：spec 说 11 但实际 9

`docs/superpowers/specs/2026-05-21-tourism-lead-generation-design.md` 设想 11 section，实际只有 9（缺 ConciergeBand 和某种"价位/比较"屏）。这两个缺失让 hierarchy 断层：从 "How we work（流程）" 直接跳 "Destinations（货架）"，中间没有"为什么不是跟团 / 我大概要花多少 / 你们具体能解决什么"的桥梁。

---

## 详情页内容深度

### A. destinations/[slug] — **P0 严重故障 + 内容深度极浅**

**结构性故障**：

| 字典里的 slug | `/destinations/[slug]` 实测响应 | 备注 |
|---|---|---|
| beijing | **404** | 首屏 grid 第一张卡，最高曝光 |
| xian | **404** | |
| shanghai | **404** | |
| guilin | 200 | |
| zhangjiajie | 200 | |
| jiuzhaigou | 200 | |
| dali | 200 | |
| huangshan | **404** | |

**字典 8 个 slug，路由只 generateStaticParams 4 个**（`app/destinations/[slug]/page.tsx:63-65`）。点进去**裸 Next.js 404 页**（连 brand 头都没），是任何"我考虑留资"的客户都会立刻流失的硬故障。叠加 DestinationGrid `href="#lead-form"`（`components/sections/DestinationGrid.tsx:37`）——所有卡都 **不指向** detail 页。换句话说：详情页存在但首页不通向它，且一半 detail 不存在。

**内容深度（仅 4 个能打开的页面）**：

实测 zhangjiajie 详情页 main 区 textLen = **279 字符**（一张图 + 一段 6 行 intro + sidebar CTA）。用 Daniel 视角去读：

```
✓ 知道 Zhangjiajie 在湖南西北
✓ 知道 4-6 月或 10-11 月去
✓ 知道你会"避开人流最重的路线"
✗ 不知道几天合适（spec 说 6 天串川西，但 detail 没说）
✗ 不知道高反 / 玻璃栈道有没有限流 / 雨季封山
✗ 不知道配什么城市连游
✗ 不知道大概预算
✗ 不知道有没有真实案例可读
✗ 看不到任何其他客人去过的照片
```

每页缺这 8 个模块（按"对留资影响"排序）：
1. **图集 4-6 张**（峰林 / 山顶酒店 / 玻璃栈道 / 武陵源全景 / 客人合影）—— 现在只有 1 张 hero
2. **推荐天数 + 周边联游**（"3-4 天主线，可串黄龙/九寨/凤凰 → 8-10 天川西线"）
3. **季节细节**（"4-6 月雨季水雾最美但易封路 / 11 月秋色 / 12-2 月不建议"）
4. **注意事项**（玻璃栈道限流 / 山顶住宿少 / 雨衣必带 / 高反风险）
5. **价位段位**（这条线 8 天大概 USD X/人 起，14 天加大理 USD Y/人 起）
6. **案例引用**（"上个月给一个澳洲家庭做了 6 天版本，跟九寨拼成 12 天" + 链接到 case 详情）
7. **当地特色食宿**（土家菜 / 山顶酒店类型 / 客栈 vs 度假村区别）
8. **顾问匹配**（"这条线由 Bo Chen 做主导，他从业 7 年" + 链回 specialist 卡）

**改造工作量**：约 4 个模块走 trust-proofs.ts 风格 typed data + bilingual，每个 destination 大约 1-1.5 屏，整 8 个 slug 大约 M-L（数据层 + 模块组件 + 数据填充各一周）。**但缺路由的 4 个必须先补**，工作量 S（30 行 generateStaticParams + 数据补齐）。

### B. themes/[slug] — **存在但非常浅**

4 个 theme 都 200，每页约 152 字符 = 一段描述 + 3 个 bullets + 一个 sidebar CTA（`/themes/family` 实测）。用 Daniel 视角：

```
我看完 family 主题：
✓ 知道你说"少换酒店、少赶车"
✗ 不知道你过去做了几个 family trip
✗ 没看到任何带孩子的真实案例
✗ 没说几岁孩子合适（spec说 wheelchair、accessibility 都 cover 但 detail 没体现）
✗ 没告诉我跟"普通跟团"差别在哪
```

themes 比 destinations 还浅，因为没有图、没有案例、没有"对应的目的地推荐"。

每页缺：
1. 至少 1 张主题氛围图
2. 关联的 destination 推荐（"family 主题 → 推荐 Beijing / Chengdu pandas / Guilin 平缓段"）
3. 至少 1 条这个主题的真实/示例 case 引用
4. 跟"跟团游 / OTA 自由行" 对比表（这是定制游获客王牌，但全站 0 处）
5. 适配的顾问推荐（family → Jian Li，"擅长无障碍与家庭节奏"）

### C. itineraries 列表页 — **是占位**

`/itineraries` 页（34 行源码）只有一个 hero 标题 + 一段话 + **唯一一条** "10 天第一次来中国" 链接。Daniel 视角：

```
我点 nav 里的 "Itineraries"，想看你做过什么；
结果只有一条 "10 天第一次来中国"。
我留资是因为"看了多个样板觉得风格对路"，看一条就要我填表？
```

至少需要 5-8 条样板，按主题分组：
- 第一次来中国（10 天 / 14 天 / 21 天 三档）
- 自然主题（云南 9 天 / 川西 8 天 / 桂林+张家界 7 天）
- 家庭主题（北京西安成都 12 天 / 14 天慢节奏含黄龙）
- 商务延伸（上海+周边 4 天 / 北京+周边 5 天）
- 探亲+旅行（上海+祖籍城市 + 杭州 8 天）

每条至少要有：天数 / 城市 / 价位段 / "适合谁" / 一段 outcome 故事。

### D. itineraries/sample-10d — **唯一的样板，但只有 5 张一行字卡**

实测页面：
```
D1-D2 北京 — 抵达、胡同慢走、故宫与景山日落
D3-D4 西安 — 兵马俑、城墙、回民街夜游
D5-D6 张家界 — 砂岩峰林、玻璃栈道、森林公园轻徒步
D7-D8 桂林·阳朔 — 漓江、喀斯特山水、乡村骑行
D9-D10 上海 — 外滩、老城厢、返程前自由时间
```

每天只一行字。Daniel 视角：

```
✓ 知道 5 城节奏
✗ 不知道每天具体安排（早 / 中 / 晚做什么）
✗ 不知道住哪类酒店
✗ 不知道吃什么
✗ 不知道城市间怎么动（高铁 / 飞机 / 私车）
✗ 不知道总价大概多少
✗ 不知道这条线有没有真人走过（feedbackAvailable=false 全站）
✗ 不知道遇到下雨 / 高铁延误怎么办
```

样板行程的根本作用是**让客户在脑子里"试穿一遍"**，现在只有衣服标签没有衣服。

每天至少需要：
- 上午 / 下午 / 晚上 三段（每段 1-2 行具体活动）
- 当天住宿类型（"Beijing Hutong Boutique / 4-star 私人四合院"，可标 "样品/sample"）
- 城市间交通（高铁 / 私车 / 国内航班）
- 当天预估预算段（"~USD 350-500/人/天"）
- 1-2 张当天活动的图
- 雨天 / 体力差 备选

整页保留侧边栏 sticky CTA。

### E. plan 路由 — **存在 200，但是新一个 LeadForm 入口而不是详情页**

`/plan` 200，但内容是表单页面，不是行程构建器。OK 当前阶段可接受，但 destinations/themes 全都 CTA 跳 `/plan?destination=X`，意味着用户**唯一的"探索行为"是再填一遍表**。实际上用户期望从 destinations → 看推荐行程 → 看顾问 → 比对预算 → 然后才填表。

---

## 转化路径完整性

理想 journey vs 实际 journey：

```
Daniel 期望：
首页 → "中国能给我什么样" → "我大概该花多少 / 几天" → "他们做过谁" → "现在留资"

实际可走：
首页 → (8 张 destination 卡里 4 张 404，4 张点了跳 #lead-form) → 同一页填表
首页 → SampleItineraries (3 张卡都跳 #lead-form) → 同一页填表
首页 → Specialists (8 个顾问 avatar 不可点) → CTA 跳 #lead-form
首页 → FAQ → CTA 跳 #lead-form
TopNav → /destinations → /destinations/[slug] (4 个能打开) → 一段 intro → /plan
TopNav → /itineraries → 唯一一个 sample-10d → 5 张卡 → /plan
TopNav → /themes/family → 一段话 → /plan
```

**整站 26 个 main 区域链接里 16 个都是 `#lead-form`** —— 这不是 lead generation，这是 lead **trapping**（强行把客户压回唯一一个表单）。

断点：
1. **destination → destination 详情** 缺：DestinationGrid 卡 href 错指 `#lead-form`
2. **destination 详情 → 同主题行程** 缺：`/destinations/zhangjiajie` 没有"包含张家界的样板行程"链接
3. **destination 详情 → 顾问** 缺：detail 页 sidebar 写 "Lin 会回复"，但 specialists 节根本没有 Lin 这个人，姓名/语种/年限信息断层
4. **theme → 关联 destination** 缺：theme 页没有"family 主题推荐去 X / Y / Z"
5. **sample 行程 → 案例 / 评价** 缺：sample-10d 旁边没有"真实客户走过这条线的反馈"
6. **case → sample 行程** 缺：TrustGrid 里 "First-time couple from US 12d" 案例不可点详情，看不到完整行程
7. **任何深页面 → 联系顾问 modal** 缺：所有 detail sidebar 只指向 `/plan`，不能直接 WhatsApp（只有 destination detail 有 WhatsApp，theme 和 sample 都没）

---

## 内容缺口排序（最影响获客）

| # | 缺口 | 出现位置 | Daniel 会问 | 推荐补救 | 工作量 |
|---|---|---|---|---|---|
| 1 | **4/8 destination 详情 404** | `/destinations/{beijing,xian,shanghai,huangshan}` | "你们连北京都不做？" | 补 generateStaticParams + 4 份数据 | S |
| 2 | **destination grid 卡 href 错** | DestinationGrid.tsx:37 | "我点了卡，怎么跳到表单？" | href 改 `/destinations/${slug}` | S |
| 3 | **价位锚全站缺失** | 首页 / FAQ / 详情页 sidebar 全无 | "USD 8K/人 14天 够吗？" | 首页加预算锚卡（5K/15K/30K三档样板）+ FAQ 加"价格大概区间"条 | M |
| 4 | **destination 详情每页只 279 字符** | `/destinations/[slug]` 全部 | "你能告诉我什么具体的？" | 加 8 模块（图集/天数/季节/注意事项/价位/案例/食宿/顾问） | L |
| 5 | **唯一 1 条样板行程，每天 1 行字** | `/itineraries`, `/itineraries/sample-10d` | "我能预演一下我的 14 天吗？" | sample-10d 改成日内细节 + 加 5-8 条样板 | L |
| 6 | **跟跟团游对比表 0 处** | 全站 | "比 Viator/G Adventures 多花 30% 我图什么？" | 首页插一节"为什么不是跟团"+ themes 内嵌 | M |
| 7 | **真实/示例案例不可读** | TrustGrid 3 张 case 卡都不可点 | "真有人走过这条线吗？" | 给 example-trip-* 加详情页（共享 destination 模板） | M |
| 8 | **顾问头像是 initials 字母** | Specialists section | "这真是真人吗？" | 至少 placeholder 头像（性别+地域+age range，可标 mock） | S |
| 9 | **取消政策只在 FAQ 一行字** | FAQ.items[5] | "我现在订了，6 月生病能退多少？" | 详情页 sidebar / footer 加 "取消政策" 链接到独立页 | S |
| 10 | **季节性建议未直接呈现** | destinations 详情 inline 一句 | "5 月去川西好还是新疆好？" | destination 详情加"4-12 月最佳时段"网格 | M |
| 11 | **HowWeWork 太抽象** | HowWeWork section | "你说 talk → tailor，到底要几次邮件？" | 3 步加 timeline 数字（"4-24h 首回 / 1 周内方案 / 出发前 30 天定稿"）| S |
| 12 | **TrustStrip 数字带"sample"徽章反信任** | TrustStrip section | "10K+ 是真的吗？" | mock 阶段无解，但减小徽章视觉权重 | S |
| 13 | **video / vlog 0 处** | 全站 | "看看真客人现场说话" | mock 阶段难补，标记为 future P1 | L |
| 14 | **紧急联系 / 在地客服时间 缺** | 全站 | "我半夜行程出问题找谁？" | footer 加"24/7 行程中支持电话"或 detail page sidebar | S |
| 15 | **支付 / 担保 流程不可见** | FAQ items[4] 一句 + credentials 折叠 | "我 USD 16K 转给你，跑路怎么办？" | 加"分期 / 行程后付清比例 / 三方担保" 段 | M |

---

## P0 内容改造（建议下一阶段先做的 5-8 项）

按"获客伤害 ÷ 工作量"排序，工作量 S < M < L：

### P0-1 修 destinations/[slug] 路由 + 卡片正确指向（S，半天）
- `app/destinations/[slug]/page.tsx:63-65` 的 generateStaticParams 补齐 8 个 slug（beijing/xian/shanghai/huangshan + 现有 4 个）
- 同步把 DESTINATIONS 表补齐到 8 条
- `components/sections/DestinationGrid.tsx:37` 的 href 改为 `/destinations/${item.slug}`
- 验收：所有 8 个 destination 卡可点 + 每页都不 404

### P0-2 destination 详情页内容模块化（L，3-5 天）
新组件 `components/destination/DestinationDetail.tsx`，至少包含：
- ImageGallery（4-6 张图，mock 占位也可）
- WhenToGo 表格（按月份）
- DurationTip（推荐天数 + 周边联游）
- BudgetBand（"~USD X-Y/人 起"，至少 3 档）
- HeadsUp（注意事项 list）
- LocalFood（特色食宿，2-3 条）
- RelatedCase（链 trust-proofs.ts 里相关 case）
- AssignedSpecialist（链 demoAdvisors）

数据层用 typed data 像 trust-proofs.ts 一样，所有占位用 mock 标识。

### P0-3 加价位锚（M，1-2 天）
- 首页 LeadForm 之前插一段"参考预算"卡（同时补 spec 缺的第 10/11 个 section）
  - 三张卡 USD 5K / 15K / 30K，每张 1 个示例行程 + 时长 + 城市数
- FAQ 加 1 条"How much does a typical trip cost?" 答 "~USD 5–30K/人，取决于天数和酒店等级，参见预算锚 section"
- destination 详情页 sidebar 加 "From ~USD X" 价格段位

### P0-4 itineraries 内容深度补齐（L，3-5 天）
- `/itineraries` 列表页扩到 5-8 条，按主题分组
- `/itineraries/sample-10d` 改成日内 3 时段细节 + 住宿类型 + 城际交通 + 当天预算段

### P0-5 转化路径补缺（M，1-2 天）
- destination 详情 sidebar 加：
  - 链回 "包含 X 的样板行程" 列表
  - 链回 "X 由 Y 顾问主理" 跳 specialists
- theme 详情加：
  - 关联 destination 推荐（3-4 张缩略卡）
  - 1 条相关案例引用
- sample-10d 旁边加"走过这条线的客户反馈"（mock 占位 OK）

### P0-6 跟团游对比表（M，1 天）
首页"为什么不是跟团" 一节，10 行表对比：
- 节奏（"自由 vs 大巴满档"）
- 改期（"24h 内灵活 vs 不可改"）
- 餐食（"米其林 / 本地家宴 vs 旅游团餐"）
- 顾问（"named real person 24h reachable vs 集团客服热线"）
- 价位（"USD 5-30K/人 vs USD 1.5-3K/人，但客单价 ÷ 体验值高很多"）

### P0-7 顾问头像不要 initials（S，半天）
现在 `Specialists.tsx:73` 用 `initials(advisor.displayName.en)` 渲染纯字母圆——客户看到 "YL" / "BC" / "ML" 完全没有"真人"感。占位也至少要：
- 矢量人像 + age range + 地域风格区分
- 或 unsplash placeholder（mock 标识下可接受）
- 旁注 "Photo to be replaced by ops before launch"

### P0-8 HowWeWork 加 timeline 数字（S，半天）
3 步现在抽象，每步加一行具体的"用时"数字：
- 01 Talk to a specialist · "4-24h 内首封邮件"
- 02 Tailor-make a route · "1 周内出第一版方案，2-3 轮邮件确认"
- 03 Travel with backup · "出发前 30 天定稿，行程中 24/7 在地支持"

---

## 不需要动 / 已经做对的

- **TrustGrid 数据层**（`lib/data/trust-proofs.ts`）做得很好：typed proof + sample/verified/pending/hidden 状态机 + production filter + bilingual。**未来填真实内容时不需要重构**，只需要把 `status: 'mock'` 改 `'verified'` + 补 `evidenceUrl/photoSrc/source`。**这是网站最大的隐形资产**。
- **LeadForm 字段设计**（前一轮 #38/#39 已修）已经够好：travelMonth / partySize / preferredChannel / budgetRange 字段对路，zod errorMap 完整。
- **destination 详情页 sidebar 的"4 小时内回复"承诺** + WhatsApp 直跳：方向对，保留。
- **TopNav i18n 字典**（前一轮 #36）OK，不动。
- **全部 reduced-motion / Reveal 动效优化**（前一轮 #23/#26-#29）已收尾，不要再加动效。
- **首页 9 section 顺序大方向对**（trust strip → how → destinations → cases → specialists → trust grid → form），不要重排，**重点是给每个 section 加内容深度**而不是换位。
- **bg cream / paper / deep-slate 三层色块节奏**正常，不要为了密度乱换底色。
- **section 之间 padding（py-20 lg:py-28）**节奏 OK，密度问题不在 padding，在内容。

---

## 截图索引

`qa/ui-ux-review/layout-content/` 全部截图：

| 文件 | 内容 | Daniel 视角批注 |
|---|---|---|
| 01-home-fullpage.png | 首页 desktop 1440 全长 | "9 section 看完我学到一件事：他们会回我邮件" |
| 02-destination-zhangjiajie.png | /destinations/zhangjiajie 详情 | "一张图 + 一段话 + 一个表单链接，我学到一个地名" |
| 03-destination-beijing-404.png | /destinations/beijing 实际响应 | "他们连北京都不做？我关掉浏览器" |
| 04-theme-family.png | /themes/family 详情 | "你说少换酒店，但你做过几个 family trip？" |
| 05-itineraries-list.png | /itineraries 列表 | "唯一一条样板，我点不点？" |
| 06-sample-10d.png | /itineraries/sample-10d | "10 天每天一行字，我没法预演" |
| 07-home-mobile.png | 首页 mobile 390 全长 | "17K+ px 滑了 5 屏才到 LeadForm，destinations 占了 4 屏" |

---

## 一句话回答用户的核心问题

**"这个网站能不能吸引客户？"**

不能。它在视觉上已经很克制（前两轮成果），但**对一个海外游客来说几乎没有可读内容、没有可预演的行程、没有价位锚、没有可探索的内容旅程**。所有路径都通向同一个 LeadForm。补完上面 P0-1 ~ P0-8 之后，再回头评一次"骨架"的层级就基本到位。
