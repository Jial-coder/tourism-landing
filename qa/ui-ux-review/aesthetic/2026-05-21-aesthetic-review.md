# 整页 UI/动效审美评审 — 2026-05-21

评审者：UI/UX 审美评审专家（Claude team agent）
评审范围：首页 `app/page.tsx`，桌面 1440×900 / 平板 768×1024 / 移动 375×812 + reduced-motion 双模式。
本轮焦点：动效审美 + 整页视觉节奏 + AI slop 风险 + hierarchy + typography 微调（**不重复 `qa/ui-ux-review/2026-05-21-home-review.md` 已经评过的结构 / lead-gen 漏斗 / 表单字段维度**）。
评审尺子：`.claude/skills/ui-ux-pro-max/data/{landing,styles,ux-guidelines}.csv`（关键编号已嵌入下方各章）。

## TL;DR

页面在 spec `editorial cinematic concierge` 路线上**结构对、骨架对、token 对**，但审美执行层有三件事在直接拖低高级感和获客信号：

1. **Hero 同时跑了 6 套并发装饰层**（HeroBackdrop ken-burns 12s + 自动切图 4.5s + 18 颗粒子 11–15s + lightray 14s + HeroParallax y/brightness + CursorAura 全局），对获客是负贡献——海外游客第一秒读 headline + CTA，结果 CTA 还在 0.45s Reveal 里，背景是粒子 + 光带 + 平移 + 切图四件事在抢戏。spec 的 cinematic 不等于"全开"。
2. **Tilt3D + BorderBeam + group-hover scale + CardStack y=-4** 同时挂在每张 destination 卡上，hover 时 4 套动效互相叠加，结果是 toy-like / 炫技感强，跟 editorial 高级感反向。属于 ui-ux-pro-max landing.csv pattern 22 "Feature-Rich Showcase" 的 hover stack，但用错在了 photo-first 旅游目的地卡上。
3. **Reveal 0/0.15/0.3/0.45 + duration 0.7s** 全站统一节奏，没有为不同信息密度做层次（hero 关键 CTA 跟 footer 装饰段同 stagger），导致整页 11 个 section 滚下来"每一段都在做同一件事"，节奏单调。

不是结构性返工，是**减法审美**：删 / 调参 / 关闭装饰层即可。**移除 CursorAura、关闭 Tilt3D + BorderBeam 在 destination 卡上的叠加、Hero 收敛到 1 个动效叙事 + CTA 即时显示**，这三件事做完高级感和获客转化都涨。

## 8 维度打分总表

| 维度 | 评分 | 关键证据 | P0 改动 |
|---|---|---|---|
| 动效节奏（duration / easing / stagger） | **2/5** | NumberTicker 2.6s + 0.3s delay = 2.9s 才到位；Reveal 0.7s × 4 段 stagger 0.15 累计；HeroBackdrop ken-burns 12s + 切图 4.5s 双时钟 | P0-1 / P0-2 |
| 动效层次（叙事 vs 装饰） | **2/5** | hero 6 层并发；CursorAura + ScrollProgress 全局；BorderBeam + Tilt3D 装饰挂卡 | P0-1 / P0-3 |
| 视觉密度（section 间过渡） | **3/5** | 11 节奏一致没有起伏；hero deep-slate → cream 反差对比强 OK，但 cream 段连 4 屏（trust strip / how-we-work / destinations / sample）平铺 | P1-1 |
| AI slop 风险 | **3/5** | 命中：粒子 18 颗装饰 / lightray 14s 渐变扫光 / HowWeWork "01/02/03 NumberTicker" 套路 / CTA 全 jade 椭圆 / advisor avatar gradient 占位 | P0-3 / P1-2 |
| hierarchy（同屏视觉权重） | **3/5** | hero CTA 因 0.45s 延迟 + 背景过载视觉权重不够；destination 卡 hover 时 BorderBeam 抢镜超过名称 | P0-1 / P0-3 |
| typography 微调 | **3/5** | hero h1 7xl + drop-shadow 强 OK；section h2 4xl→md:5xl 一致；但 eyebrow `text-[12px] tracking-[0.22em]` 跨 4 段 cream + 2 段 deep-slate 颜色一致（jade / jade-soft），没有视觉权重区分 | P1-3 |
| spacing 节奏 | **3/5** | section py-20 lg:py-28 一致；hero `py-24 lg:py-32` ok；但 cream 4 连段 vertical rhythm 同节拍，缺呼吸点 | P1-1 |
| color 应用 | **4/5** | cream/jade/ink/gold 4 token 用得克制，jade-soft accent / gold 仅在 marquee + advisor badge 出现；ivory / paper 区分清晰 | — |

总评：色彩控场是亮点；动效是主要拖累；节奏与层次是次要拖累；typography 与 spacing 只需微调。

## 动效组件逐个体检（12 个）

每条三段：现状参数 / 审美问题 / 对获客价值（A 强相关，B 弱相关，C 装饰无价值）+ 建议（保留 / 调参 / 删除）。参数引用对应文件行号。

### 1. HeroBackdrop — `components/motion/HeroBackdrop.tsx:42-234`

**现状**：4 张 slide 自动切换 4.5s（intervalMs:11）；切图过渡 1.0s easeInOut（:125）；ken-burns 12s scale 1.0→1.18→1.0 infinite（:132）；18 颗粒子 11–15s float（:21-40）；lightray 14s linear infinite（:189-200）；md+ 才显示 dot indicator + 缩略图选择器。
**审美问题**：(a) 同一图层并发 5 件事：切图淡入 + ken-burns + lightray + 粒子 + parallax y/brightness（HeroParallax）。spec 的 cinematic 是"一个有节奏的画面"，不是"五件事并发"。(b) 4500ms 切图节奏过快——一张大景照片在 cinematic 路线下应该让用户读 5–8 秒才转场（参考 ui-ux-pro-max landing.csv pattern 9 "Video-First Hero" 的 86% 高粘性来自慢节奏）。(c) lightray + 粒子在 photo-first 旅游摄影上属于"加滤镜抢戏"——好照片自己会讲故事，spec §4 photo-first 路线本身排斥粒子装饰。
**对获客价值**：A（hero 切图本身是叙事）/ C（粒子 + lightray 装饰）。
**建议**：(1) intervalMs 4500 → **6500** 让用户看清单张照片；(2) 删除 PARTICLES 18 颗粒子整段（:21-40 + :167-188 + :202-223）—— 这是 pure decoration；(3) 删除 lightray（:162-166 + :189-201）—— 跟粒子同性质；(4) ken-burns scale 1.0→1.18 → **1.0→1.06**，duration 12s → **18s**，从"明显呼吸"降到"几乎不察觉的缓推"，更符合 editorial。

### 2. HeroParallax — `components/motion/HeroParallax.tsx`

**现状**：scrollY [0, 800] → y [0, 120] + brightness [1, 0.7]；reduce/SSR 时旁路。
**审美问题**：120px 平移幅度对单图 hero 偏大，滚到 800px 时图片已被压暗 30%，跟 hero overlay 的 deep-slate/85 叠加后变成"hero 沉下去"，不像电影感更像图层 bug；ux-guidelines #99 CRITICAL "Parallax/Scroll-jacking causes nausea"。
**对获客价值**：B（叙事感弱，主要靠图本身）。
**建议**：保留 parallax 但 **y 120 → 60**、**brightness 0.7 → 0.85**；或直接删除 brightness 部分只留 y。

### 3. CursorAura — `components/motion/CursorAura.tsx`（全局加载于 layout.tsx:57）

**现状**：全局 fixed 跟随鼠标的 12px 圆点 jade/35 mix-blend-multiply；hover link 时 scale 2.5；text 时 scale 0.5。
**审美问题**：(a) 旅游 lead-gen 站不是 portfolio / agency / experimental UI，自定义光标在 editorial 路线下属于**绝对 AI slop / 设计师 over-engineering**——参考 ui-ux-pro-max landing.csv pattern 21 "Conversion-Optimized" 强调"minimal distractions"，光标特效就是典型 distraction。(b) mix-blend-multiply 在 cream 背景上是淡淡浅绿色团，在 deep-slate 段几乎看不见，效果不一致。(c) 跟系统光标重叠产生"两个光标"的视觉错觉。
**对获客价值**：C。
**建议**：**删除**（layout.tsx:9 + :57 + 整个 components/motion/CursorAura.tsx）。这是本轮 P0-#1 推荐的最干净的一刀。

### 4. ScrollProgress — `components/motion/ScrollProgress.tsx`（全局 layout.tsx:56）

**现状**：fixed top 1px jade 进度条，scaleX 跟 scrollYProgress；reduce/SSR 旁路。
**审美问题**：1px 高度低调 OK；但旅游 lead-gen 站用 progress bar 的合理性偏弱——progress bar 适合长 storytelling / 文章 / 教程页（landing.csv pattern 10 "Scroll-Triggered Storytelling"）。lead-gen 站的目标是让用户**早转化**而不是**读完**，progress 条暗示"还有多少"反而提示用户"还很长"。
**对获客价值**：B（弱负向）。
**建议**：**删除**或仅在 desktop ≥1024 + 滚过 hero 后才显示（条件渲染）；优先级低于 CursorAura，但同样属于装饰。

### 5. Reveal — `components/motion/Reveal.tsx`（全站 ~30 处使用）

**现状**：opacity 0→1 + y 24→0，duration 0.7s，EASE = cubic-bezier(0.25, 0.1, 0.25, 1)（标准 ease-out 类似），whileInView margin -80px。
**审美问题**：(a) **duration 0.7s 偏慢**——ux-guidelines #8 "150-300ms for micro-interactions, >500ms 慢"。Reveal 是组件入场不是 micro-interaction，按 styles.csv 15 Motion-Driven 推荐 300-400ms 合适，700ms 显得拖。(b) y=24px 对小卡片合适，对 hero h1/h2 偏小（视觉移动幅度不够），对全屏 section 整段又偏大。(c) 全站统一 EASE 没区分"重要内容快进 / 装饰段慢出"，结果是单调感。
**对获客价值**：A（reveal 本身有"信息分段进入"的认知价值）。
**建议**：(1) **duration 0.7 → 0.45**；(2) hero 内的 Reveal **delay 0/0.15/0.3/0.45 → 0/0.1/0.2/0.25**（CTA 不应等 0.45s）；(3) section 内卡片 stagger `idx*0.1` → `idx*0.06`；(4) margin -80px OK 保留。

### 6. NumberTicker — `components/motion/NumberTicker.tsx`

**现状**：duration 2.6s + delay 0.3s = **2.9s 才到位**；ease cubic-bezier(0.16, 1, 0.3, 1)（强 ease-out）；arrived 后还有 0.4s scale 1→1.06→1 + color flash。
**审美问题**：(a) 2.9s 是 spec 的"3 秒读懂首屏" 一半——TrustStrip 滚到时数字还在跑，访客视线已经下移到 marquee。(b) HowWeWork 用 NumberTicker 滚 "01/02/03" 步骤号是误用——固定枚举数字不需要 count-up，1 也 count-up 反而像加载动画没结束。(c) arrived 后的 scale 弹跳 + color flash 是 over-design，数字跑完直接静默是 editorial 路线该做的事。
**对获客价值**：A（trust strip 数字 count-up 在 ui-ux-pro-max landing.csv pattern 24 "Social Proof-Focused" 是认可的 stat counter pattern）。
**建议**：(1) **duration 2.6 → 1.6**，delay 0.3 → 0.1；(2) **HowWeWork 移除 NumberTicker 包装**，直接 `<span>0{idx+1}</span>`（HowWeWork.tsx:45 改 `{`0${idx+1}`}` 即可）；(3) **删掉 arrived 后的 scale + color flash 整段**（NumberTicker.tsx:108-122 简化为静态 span）。

### 7. Tilt3D — `components/motion/Tilt3D.tsx`（DestinationGrid 8 张卡）

**现状**：max=12° 倾斜 + spring stiffness 220 damping 22；hover 时叠加 jade-soft 55% radial gradient highlight 跟随鼠标；hover/move 双 spring。
**审美问题**：(a) 12° 倾斜对**全图卡片（aspect 4/5 风景照片）**偏激进——3D 倾斜让风景产生透视错觉，像在歪着看明信片，跟 editorial 摄影路线冲突；该交互更适合 3D model / 产品图 / icon 卡（参考 styles.csv 5 "3D & Hyperrealism"）。(b) 跟下方 BorderBeam（duration 5s 转一圈 + hover 时 2.5s）+ CardStack（whileHover y -4 scale 1.02）+ inner img scale 1.05 = **同时 4 件事**。
**对获客价值**：B 弱（视觉趣味）/ C 偏（对决策无帮助）。
**建议**：(1) **DestinationGrid 移除 Tilt3D 包装**（DestinationGrid.tsx:37-71 把 `<Tilt3D>` 拆掉）；(2) 保留组件本体供其他场景（如 sample card 或 advisor avatar）按需使用，但**不在 photo-first 卡上挂**；(3) 替代审美：CardStack 的 y -4 scale 1.02 + img scale 1.05 已经够了。

### 8. CardStack — `components/motion/CardStack.tsx`（DestinationGrid 用）

**现状**：whileHover y -4 + scale 1.02，duration 0.4s EASE。
**审美问题**：单独看 OK，跟 Tilt3D + BorderBeam 叠加才出问题。如果删 Tilt3D，CardStack 就成了主导 hover。
**对获客价值**：B。
**建议**：**保留**，但 hoverScale **1.02 → 1.015** 微调；duration 0.4 → 0.3 更接近 ux-guidelines #8 推荐的 300ms 阈值。

### 9. BorderBeam — `components/motion/BorderBeam.tsx`（DestinationGrid 8 张卡）

**现状**：conic-gradient jade→gold 旋转一圈 5s linear，opacity 0.5 → hover 1.0 + duration 5s → 2.5s + inset shadow 24px jade 35%。
**审美问题**：(a) **typical AI slop**——这种"边框光圈追逐"特效在 SaaS landing pages 是 2024 滥用模板，旅游摄影站完全不需要。(b) jade → gold conic-gradient 是 spec 4 token 里的两个，但**漫成边框光带**让卡看起来像在播放 loading 状态。(c) hover 时 inset shadow `inset 0 0 24px rgba(61,168,102,0.35)` 是绿色内发光，跟黑色 hover overlay 撞。
**对获客价值**：C。
**建议**：**删除**——DestinationGrid.tsx:55 移除 `<BorderBeam />`；组件本体可保留供其他高聚焦 CTA 使用（比如 leadform submit 按钮聚焦态），但当前八张卡上是错位使用。

### 10. AnimatedBeam — `components/motion/AnimatedBeam.tsx`（HowWeWork 步骤 1→2→3 之间）

**现状**：SVG path 2 段 quadratic curve，duration 1.4s linear infinite + 中点圆环扩散 r 0→24 opacity 0.6→0；md+ 才显示。
**审美问题**：(a) "step1 → step2 → step3 流光线" 是 SaaS / 数据流图典型 pattern，旅游 lead-gen 页的"How we work" 三步是**对话流程**（聊一聊 → 出方案 → 安排），不是数据流；流光线视觉上暗示"自动 / 算法 / 实时"，跟"真人顾问"主张冲突。(b) infinite 重复造成持续视觉骚扰。
**对获客价值**：C 偏负向（误导信号）。
**建议**：**删除**（HowWeWork.tsx:62-74 整段 + import）；用静态 dotted line 或简单 chevron 取代，或干脆不画连线，让 3 个卡靠 grid 自然成列。

### 11. Marquee — `components/motion/Marquee.tsx`（TrustStrip + Specialists）

**现状**：speed 36s（TrustStrip）/ 42s（Specialists）一个完整循环；linear infinite；hover paused。
**审美问题**：速度 OK，linear ease 是 marquee 标准。但 **Specialists 段 marqueeItems 是 advisor name + role + languages + destinations 拼接展开 ~24 项**，速度 42s 还是觉得密。
**对获客价值**：B（轻 trust 信号）。
**建议**：保留；**Specialists marquee speed 42 → 56** 让阅读更从容；TrustStrip 36 OK。

### 12. MagneticCta — `components/motion/MagneticCta.tsx`（Hero 主 CTA）

**现状**：100px 半径内鼠标吸引 spring，stiffness 220 damping 18 mass 0.4；strength = 6/100。
**审美问题**：吸力幅度 6px 上限合理，spring 参数舒适；但跟 hero 6 层装饰叠加时效果被淹没；移动端旁路 OK。
**对获客价值**：A（强化主 CTA 触感）。
**建议**：**保留**，无需调参；条件是 hero 其他装饰先减下去（见 1/2/3）。

## section 视觉节奏分析（11 段）

按现状粗略分组：

| section | bg | py | 主要装饰 | 节奏属性 |
|---|---|---|---|---|
| HomeHero | deep-slate | min-88svh + py-24/32 | 6 层并发动效 | **过载** |
| TrustStrip | cream | py-16/20 | 4 数字 + marquee | 中 |
| HowWeWork | cream | py-20/28 | 3 步骤 + AnimatedBeam | 中 |
| DestinationGrid | cream | py-20/28 | 8 卡 + Tilt+Beam+Stack 叠加 | **过载** |
| SampleItineraries | paper | py-20/28 | 3 卡 + Reveal stagger | 安静 |
| Specialists | deep-slate | py-20/28 | 4 advisor + Marquee | 中 |
| TrustProofGrid | cream | py-? | 4 类 ABCD proof | 中 |
| LeadForm | ? | ? | 表单 | 安静 |
| FAQ | ? | ? | 折叠 + AccordionItemMotion | 安静 |
| PathCFooter | deep-slate | ? | contact channels | 安静 |

**问题**：(a) cream 段连续 4 屏（TrustStrip / HowWeWork / DestinationGrid / SampleItineraries 中 paper 仅是浅 off-white），视觉上"白卡海"；(b) 整页 bg 反差：deep-slate（hero）→ cream×3 → paper → deep-slate（specialists）→ cream → ?（form）→ deep-slate（footer），中段 cream 缺呼吸点；(c) py 节奏全部 20/28 一致——hero 之后没有"长呼吸"段（如 60–80 高度的纯图带 / 引言带）。

**建议**：(1) 在 DestinationGrid 与 SampleItineraries 之间插一条 **80px 高的 deep-slate 引言带**（一行 italic quote + 顾问签名），制造视觉呼吸 + trust 撒点；或（2）**HowWeWork 改为 paper 背景**（bg-cream → bg-paper），打破 cream 4 连段；(3) Specialists 之后 TrustProofGrid 跟它都是深 + 浅切换，OK；(4) 全页 vertical rhythm 引入"重段（py-28）/ 轻段（py-16）"二级结构，目前 py-20 lg:py-28 是单一节奏。

## AI slop 检测

逐项对照常见 slop pattern：

| slop pattern | 命中？ | 证据 |
|---|---|---|
| 泛 SaaS 渐变卡（multi-stop / glassmorphism） | **轻命中** | TrustProofGrid 暂未细看，但 advisor avatar `bg-gradient-to-br from-deep-slate via-jade/40 to-jade-soft` 是占位 gradient，editorial 路线下应换成实拍头像或纯色字母占位 |
| 无意义 glassmorphism | 未命中 | 全站没用 backdrop-blur 大面积，仅 advisor card `backdrop-blur-sm` 在 deep-slate 上微妙感 OK |
| 模板 hero（粒子 + 渐变 + 大字） | **强命中** | HeroBackdrop 18 颗粒子 + lightray + ken-burns + parallax 是 2024 SaaS 模板的典型组合，跟 photo-first 旅游冲突 |
| 假 dashboard / 假数据展示 | 未命中 | TrustStrip 数字标 mock badge OK，符合 spec §6 |
| 随机 SaaS 插画 | 未命中 | 没有插画占位 |
| 千篇一律 jade-gold gradient | **轻命中** | jade→gold conic-gradient 出现在 BorderBeam（DestinationGrid 8 卡）+ AnimatedBeam（HowWeWork 步骤连线）+ advisor avatar，3 处用同一渐变 |
| icon 通用化（lucide 套同一组） | 未细查 | 当前页面 icon 用得克制（footer / form 才出现），未深查 |
| CTA 全 jade 椭圆复读 | **命中** | hero / how-we-work / specialists / sample 卡 / trust grid / footer 至少 6 处 `rounded-full bg-jade px-7 py-3 text-sm font-semibold`，editorial 路线应允许至少一种次级 CTA 风格（underline link / outlined / ghost）来分层 |
| BorderBeam 旋转光带 | **命中** | 8 张 destination 卡 + hover 加速 |
| MagicUI / aceternity 套件味 | **轻命中** | BorderBeam + AnimatedBeam + Marquee + Tilt3D 这套组合是 magicui 标准配方，移植到 editorial 站需要二次裁剪 |

主要 slop 集中在 **hero 装饰组合 + destination 卡 hover stack + jade-gold gradient 复读**，砍掉这三块整页 slop 风险大幅降低。

## P0 审美修复（建议本轮先做的 5 项）

| # | 问题 | 文件 | 具体改动思路（含数值 / class / before-after） | 工作量 |
|---|---|---|---|---|
| **P0-1** | Hero 装饰过载，CTA 视觉权重不够 | `components/sections/HomeHero.tsx` + `components/motion/HeroBackdrop.tsx` + `app/layout.tsx` | (a) HeroBackdrop intervalMs 4500 → 6500，删 PARTICLES 18 颗粒子（:21-40 + :167-188 + :202-223），删 lightray（:162-166 + :189-201），ken-burns scale 1.0→1.18 改 1.0→1.06、duration 12s→18s。(b) HomeHero Reveal delay 0/0.15/0.3/**0.45** → 0/0.1/0.2/**0.25**（CTA 早 0.2s 进场）。(c) layout.tsx:9+:57 删 `<CursorAura />` 整段（含 import），整 file `components/motion/CursorAura.tsx` 可保留但不再加载。(d) HeroParallax y 120→60，brightness 0.7→0.85（HeroParallax.tsx:13-14）。 | M（单个 reviewer 1-1.5h，含目视过 hero 节奏） |
| **P0-2** | DestinationGrid hover 4 层叠加 + slop hover stack | `components/sections/DestinationGrid.tsx` | (a) 移除 `<Tilt3D>` 包装层（:37、:71）；(b) 移除 `<BorderBeam />`（:55）；(c) CardStack hoverScale 1.02 → 1.015（修改 CardStack.tsx:16 默认 prop，或 DestinationGrid 显式传 `hoverScale={1.015}`）；(d) inner img scale-105 保留作为唯一 hover 信号。结果：每张卡 hover 只剩 "lift -4 + scale 1.015 + img zoom 1.05 + bottom hint 渐入"，是 editorial 推荐节奏。 | S（30 min，含 hover 视觉抽查） |
| **P0-3** | NumberTicker 慢 + HowWeWork 步骤号误用 | `components/motion/NumberTicker.tsx` + `components/sections/HowWeWork.tsx` | (a) NumberTicker 默认 duration 2.6 → **1.6**，delay 0.3 → **0.1**（:32-33）；(b) 删除 arrived 后的 scale + color flash（`motion.span` 的 `animate` prop 整段：107-122 改为静态 `<span>{prefix}{display}{suffix}</span>`，组件保留 ref 用于 IntersectionObserver）；(c) HowWeWork.tsx:44-46 不再用 NumberTicker：`<div className="...">0{idx + 1}</div>`，删除 import NumberTicker。 | S（45 min） |
| **P0-4** | AnimatedBeam 误用在 HowWeWork（数据流暗示 vs 真人服务） | `components/sections/HowWeWork.tsx` | 删除 `<AnimatedBeam>` 两段（:62-74）+ 顶部 `import { AnimatedBeam }`；保留组件本体到 `components/motion/`，未来可在数据/旅程 demo 复用。结果：3 张步骤卡靠 grid 自然成列，无流光线，与"真人顾问"主张一致。 | S（15 min） |
| **P0-5** | Reveal duration 0.7s 全站偏慢 | `components/motion/Reveal.tsx` | (a) 默认 duration 0.7 → **0.45**（:26）；(b) 全站 stagger `idx*0.1` 默认 OK 不改；(c) hero 内 Reveal delay 跟 P0-1 同步改完。 | S（20 min，含全站冒烟一遍） |

P0 总工作量估约 **3-4h**（单 reviewer 顺序做完，含 dev server hot reload 过目）。

## P1 跟进（先做 P0，再考虑这些）

| # | 问题 | 文件 | 改动 |
|---|---|---|---|
| P1-1 | cream 4 连段视觉节奏单调 | `components/sections/HowWeWork.tsx` | bg-cream → bg-paper，制造 cream/paper 隔段交替；或在 DestinationGrid 与 SampleItineraries 之间插 80px 引言带 |
| P1-2 | jade-gold conic-gradient 复读（advisor avatar / BorderBeam / AnimatedBeam） | `components/sections/Specialists.tsx:69` | advisor avatar gradient 改为单色 jade-soft 或 gold-soft 字母占位（更 editorial）；BorderBeam / AnimatedBeam 删除后这条自动消化大半 |
| P1-3 | eyebrow 全站统一 12px tracking-0.22em，缺视觉权重区分 | 各 section eyebrow | hero eyebrow 升级为 `text-[13px] tracking-[0.28em]`（更威严）；section eyebrow 保持 12px；细微差异让 hero 仍是 visual lead |
| P1-4 | ScrollProgress 在 lead-gen 站价值低 | `app/layout.tsx:56` | 删除或改条件渲染（仅在 desktop ≥1024 + 滚过 hero 后显示） |
| P1-5 | Specialists Marquee 太密 | `components/sections/Specialists.tsx:49` | speed 42 → 56 |
| P1-6 | section py 全部 20/28 单一节奏 | 多文件 | TrustStrip py-16/20 偏轻 OK；其他可分"重段 py-28 / 轻段 py-20"二级 |

## 不需要动的 / 已经做对的（避免 lead 来回拆建）

- **token 系统克制**：cream / jade / ink / gold 4 token 跨 11 section 用得收敛，未出现 5 种以上配色失控。color 4/5 是亮点。
- **typography 主结构**：Newsreader 7xl hero h1 + drop-shadow + 5xl section h2 + Inter body，serif/sans 对比清晰，符合 styles.csv "editorial" 母题。
- **bg 大反差**：hero deep-slate ↔ TrustStrip cream 反差强，符合 ui-ux-pro-max landing.csv pattern 20 "Hero-Centric Design" 推荐 contrast。
- **HeroBackdrop reduce 路径**：reduced-motion 时降级为渐变切图 + 缩略图选择器是好设计（HeroBackdrop.tsx:68-114），保留。
- **MagneticCta 触感**：100px radius + spring 220/18/0.4 是优雅参数，移动端旁路也对。
- **Specialists advisor card hover**：border + bg 渐变只是颜色微调，没堆动效，节奏正确（Specialists.tsx:63）。
- **Marquee hover-paused** 是好的人性化（Marquee.tsx:38）。
- **AccordionItemMotion 0.35s + EASE**：FAQ 段动效节奏对（已有合适参数）。
- **MockBadge 视觉系统**：mock / sample / demo / example 四种 badge 命名清晰（spec §6）。
- **Newsreader font-display: swap**（layout.tsx:16）+ Inter 同样 swap，无 layout shift。
- **`translate="no"`** + dev meta google notranslate（layout.tsx:47, 50-52）是好的细节。

## 截图索引

`qa/ui-ux-review/aesthetic/` 目录下：

- `desktop-1440-noPref-hero-t0.png` / `-t2s.png` / `-t5s.png` — 桌面 hero 切图节奏 0/2/5 秒
- `desktop-1440-noPref-truststrip.png` — 桌面 TrustStrip section
- `desktop-1440-noPref-howwework.png` — 桌面 HowWeWork（含 AnimatedBeam 流光线问题）
- `desktop-1440-noPref-destinations.png` / `-destinations-hover.png` — 桌面 DestinationGrid 默认 + Beijing 卡 hover（看 Tilt3D + BorderBeam + CardStack 叠加）
- `desktop-1440-noPref-specialists.png` — 桌面 Specialists（advisor avatar gradient）
- `desktop-1440-noPref-trustgrid.png` — 桌面 TrustProofGrid
- `desktop-1440-noPref-leadform.png` — 桌面 LeadForm
- `desktop-1440-noPref-footer.png` — 桌面 Footer
- `desktop-1440-noPref-fullpage.png` — 桌面整页（看 11 section 视觉节奏）
- `desktop-1440-reduce-hero.png` / `-reduce-fullpage.png` — reduced-motion 模式
- `tablet-768-noPref-hero.png` / `-fullpage.png` — 平板
- `mobile-375-noPref-hero.png` / `-destinations.png` / `-fullpage.png` — 移动
- `console-desktop-noPref.log` — 桌面 console（warning level）

## 评审尺子引用清单

ui-ux-pro-max csv 关键编号：
- ux-guidelines.csv #7 "Excessive Motion: 1-2 key elements per view max"（hero 6 层并发命中违反）
- ux-guidelines.csv #8 "Duration Timing: 150-300ms micro / >500ms 慢"（Reveal 700ms / NumberTicker 2900ms 命中）
- ux-guidelines.csv #14 "Easing: ease-out 入 ease-in 出 / linear 不用于 UI"（HeroBackdrop ken-burns easeInOut 用于 12s 循环 OK；BorderBeam linear 用于装饰 OK）
- ux-guidelines.csv #99 CRITICAL "Parallax/Scroll-jacking causes nausea"（HeroParallax y=120 偏激进，建议 60）
- landing.csv pattern 2 "Hero + Testimonials + CTA"（结构对）
- landing.csv pattern 21 "Conversion-Optimized: minimal distractions"（CursorAura + ScrollProgress 命中违反）
- landing.csv pattern 22 "Feature-Rich Showcase: card hover lift/scale"（DestinationGrid hover stack 用错对象——风景照片不是 feature 卡）
- styles.csv 1 "Minimalism & Swiss: Subtle hover 200-250ms"（Tilt3D + BorderBeam 远超推荐）
- styles.csv 15 "Motion-Driven: 300-400ms"（Reveal 700 命中违反）
- styles.csv 20 "Hero-Centric: smooth scroll reveal, subtle background parallax"（subtle 是关键词）




