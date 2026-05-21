# 竞品 mood board — 海外定制旅行（Tailor-made China）参考

**目的**：为 tourism-landing 走 path C（推翻现有首页 IA 重做）选定 2-3 个视觉 archetype，作为 Stitch 出 mockup 与代码落地的参考。
**采集时间**：2026-05-21
**采集者**：team-lead via Playwright，desktop 1440×900 + full page 滚动截图
**覆盖范围**：8 个海外向定制旅行品牌（涵盖 mass-market / mid-tier / luxury 三档），其中 5 个对中国有专门 landing。

---

## 8 个截图与第一印象

| # | 品牌 | URL | 定位 | 文件 |
|---|---|---|---|---|
| 01 | China Highlights | chinahighlights.com | mass-market China specialist；用户特别要求加入参考 | `01-chinahighlights-full.jpeg` |
| 02 | Audley Travel | audleytravel.com/china | UK mid-luxury，国家专属 landing 行业模板 | `02-audley-full.jpeg` |
| 03 | WildChina | wildchina.com | 北京本地，luxury，editorial 风格 | `03-wildchina-full.jpeg` |
| 04 | Trufflepig | trufflepig.com/china | 北美 boutique，serif typography + 文学叙事 | `04-trufflepig-full.jpeg` |
| 05 | Wild Frontiers | wildfrontierstravel.com | UK 探险型，更朴素工具感 | `05-wildfrontiers-full.jpeg` |
| 06 | Steppes Travel | steppestravel.com | UK luxury，clean editorial + 大字 sans | `06-steppes-full.jpeg` |
| 07 | Black Tomato | blacktomato.com | UK luxury 旗舰，bold cinematic | `07-blacktomato-full.jpeg` |
| 08 | Bamboo Travel | bambootravel.co.uk | UK Asia specialist，朴素信息密度高 | `08-bamboo-full.jpeg` |

每个品牌都存了 fold1（首屏）和 full（全页）两张 jpeg，目录在 `docs/qa/2026-05-21/competitor-mood/`。

---

## 共性提取（给我们做模板的"必需品"）

跨 8 个品牌一致出现：

1. **Hero = 大幅高质量目的地图 + 1-2 行价值主张 + 1 个明确主 CTA**（"Start planning" / "Get in touch" / "Speak to a specialist" 这类）。没有一家把 hero 做成"诊断式 chip"。
2. **首屏正下方 trust strip**：年限、客户数、评分（多数引用 AITO / TTG / Tripadvisor / Google）+ 1-2 个媒体引用。
3. **"How we work" 三步流程**：talk-to-specialist → tailor-make → travel-with-confidence。文案各异但结构稳定。
4. **目的地灵感矩阵 / sample itineraries**：网格布局、每张卡片 = 大图 + 标题 + 1 行 hook + "Explore" / "Read more"。
5. **Specialists / advisors 区块**：真人头像 + 姓名 + 服务区域 + 简短引述。竞品全部用真照片真姓名，没有一家用"林颂阳"这种单顾问 hero 的写法。
6. **Lead 入口三处可达**：sticky CTA、表单 section、footer。表单字段 = 5-8 个，不超过 1 屏。
7. **资质与媒体背书在首屏底部或第二屏**：ATOL / ABTA / AITO / Tripadvisor / 媒体 logo 一行排开。
8. **配色克制**：8 家里 7 家用浅色 (white / cream / sand) + 深色（forest green / ink / charcoal）作为强调，**没有一家用我们当前的"全页深蓝"**。

---

## 三个 archetype（candidate styles）

我从 8 张里抽出三种风格母题，给你选。

### Archetype A — Editorial Magazine（推荐：Trufflepig / Steppes / WildChina）

**视觉语言**：
- 浅色底（cream `#F5F2EC` / off-white）+ 深绿（`#2E3D2C`）或墨色作为强调
- Serif 主标题（Playfair Display / Tiempos / Source Serif）+ Sans 正文（Inter / Open Sans）
- Hero 大图横幅 + 大量留白；标题尺寸 64-80px，跟我们当前 72px 数量级一致
- 段落式叙事，少 chip，多卡片+引文
- 节奏：每 section 大留白，目的地卡片 2-3 列网格

**适合谁**：mid-luxury，强调"慢、深、私人定制"；目标客群是 35+ 中产家庭、高知人群。

**对应你目前文案语气**：契合"林颂阳·我们不卖路线"那种独白式叙事，但要把它从主舞台搬到一个 specialist 卡片里，不再是 hero。

### Archetype B — Cinematic Bold（参考：Black Tomato / Audley）

**视觉语言**：
- 深色或全图 hero 占满首屏，文字反白，动态视频或 ken-burns 静图
- Sans-serif 大字（Helvetica / Söhne / Inter Display），主标 80-96px，weight 600-800
- 强烈对比色：深底 + 单一品牌色（橘红 / 金 / 翠绿）作为 CTA
- 滚动到第二屏立刻进入"How we work"或"Trust strip"
- 节奏：紧凑，每 section 之间有视觉分隔（彩色 banner / 横线 /满图）

**适合谁**：luxury，强调"独特、戏剧、为你私人量身"；目标客群是 40+ 高净值用户。

**对应你目前底色**：`bg-deep-slate` 深蓝接近 cinematic 走向，但需要 1) 换强调色（当前没有）；2) 加大图视频；3) 字号字体重排；4) 删 chip。

### Archetype C — Functional Tools（参考：China Highlights / Wild Frontiers / Bamboo）

**视觉语言**：
- 白底 + 蓝色（`#1F77B4` 类）+ 橙色 CTA
- Sans-serif 全程，标题 36-48px（不张扬）
- Hero 标题下直接放搜索框 / 行程时长选择器 / 出发日期选择器
- 信息密度极高：评分 / 评价数 / "free 24/7 service" / 各国签证状态
- 滚动到下面是大量 sample itineraries 网格 + 每条 itinerary 卡片含详细字段（Day count / 价格起步 / 包含项）

**适合谁**：mass-market 转化优先，强调"效率、可比、快速询价"；目标客群是 25-45 价格敏感型用户。

**对应你定位**：转化导向最强，但视觉天花板比 A、B 低，"高级感"靠后。

---

## 我对你的推荐

走 **A**（Editorial Magazine）+ **B 的 hero 视觉**：

- 主体框架按 Editorial：浅色底、留白、serif 主标、卡片节奏
- 但 hero 借 B 的 Cinematic 处理：1 张大目的地图占满 100vh，反白主标 + 主 CTA
- Trust strip + How we work 走 Editorial 卡片
- Lead form 走 Editorial 简洁版

**理由**：
1. 你目标客群是"海外游客来中国定制旅行"，35+ 家庭和高知是主力，Editorial 调性契合
2. C 的 mass-market 路线对你来说是降级；luxury B 完整路线对你 mock 阶段太重（缺真实素材）
3. A + B-hero 是当前 8 个竞品里最接近"专业、温暖、可信、尊贵"四件套的组合
4. 跟你现有 atoms（MiSans + Tailwind v4 token）兼容，色板换浅色后落代码成本最低

---

## 下一步（等你拍板）

1. 你先看 `docs/qa/2026-05-21/competitor-mood/` 8 张全页截图
2. 拍板 archetype（A / B / C / A+B / 其它组合）+ 1-2 个最有"对味"的竞品作为视觉锚
3. 我用你拍板的 archetype 跑 Stitch 出 2-3 稿首页 mockup
4. 你选最合适的 → 落代码

---

## Relations

- relates_to [[../../../superpowers/specs/2026-05-21-tourism-lead-generation-design]]（spec §4 模块）
- relates_to [[../../../superpowers/plans/2026-05-21-tourism-lead-generation-implementation]]（plan 决策 j 的多稿门禁）
- relates_to rules/05 cockpit 章程 第一原则（form 维度多稿对比 + reference-first）
- relates_to rules/55 design-stack-routing（drafting 阶段 reference packet 门禁）
