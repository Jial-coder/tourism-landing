# 首页 UI/UX 评审 — 2026-05-21

评审者：UI/UX 评审专家（Claude team agent）
评审范围：首页 `app/page.tsx`，桌面 1440×900 / 平板 768×1024 / 移动 375×812 / reduced-motion 四种状态。
评审尺子：`docs/superpowers/specs/2026-05-21-tourism-lead-generation-design.md` + `.claude/skills/ui-ux-pro-max/`（landing.csv pattern 2 + ux-guidelines.csv CRITICAL/HIGH 规则）。

## TL;DR（≤5 行）

最严重的 lead-gen 阻碍按损耗大小排序：

1. **TrustStrip 4 个数字全显示 `0+ / 0.0% / 0 年 / 0 小时`**（NumberTicker spring 配置错误，reduced-motion 也没 fallback）—— spec §4.1 要求的"前置硬信任"在首屏后变成"反信任"，访客第一眼看到 0 分服务，转化漏斗在第一个 trust 节点就漏穿。
2. **TopNav 完全不响应语言切换**（NAV_ITEMS / 桌面 CTA / 登录全硬编码中文）—— EN 用户切换语言后 hero/section 切到英文但导航还是中文，违反 spec §3 "首发英文优先 + 核心 CTA、表单、导航跟随语言切换"；海外游客主入口直接挂掉。
3. **LeadForm 错误信息是 raw zod 英文 + 必填没视觉标识 + 两个看似可填字段实际 readOnly**——见 [问题 5][问题 6][问题 7]，提交时整页跳出 "Too small: expected string to have >=1 characters"，移动端用户基本会放弃。

总体方向是对的：信息架构、photo-first hero、design tokens（cream/jade/ink/gold + Newsreader+Inter）、四类 trust proof 占位都按 spec 落地了。**问题集中在执行层 bug + i18n 漏配 + 表单 UX 细节**，不是结构性返工。

## 评审维度尺子

ui-ux-pro-max landing.csv 把"hero + testimonials + CTA"列为高转化 pattern（pattern #2）：social proof before CTA，3-5 testimonials 含 photo+name+role，CTA after social proof。我们的 section 顺序 hero → trust strip → how-we-work → destinations → sample → specialists → trust grid → leadform → faq 在结构上完全符合，trust grid 4 类 proof（A 评价 / B 顾问 / C 案例 / D 资质）齐全且全部带 mock badge。**结构对，执行掉链子的地方多。**

ux-guidelines CRITICAL 规则命中情况：
- color-contrast：✅ hero primary CTA jade on ivory，对比足；正文 ink/ink-soft on cream 高对比。
- focus-states：✅ 全 CTA 都有 `focus-visible:ring-2`，TopNav v2 cross-validation 修复明确写过。
- touch-target-size 44×44：⚠️ mobile 汉堡菜单 40×40 < 44 [问题 8]。
- reduced-motion：⚠️ NumberTicker 在 reduce 下也不显示数字（应当 fallback 到 setDisplay(value)，但 inView 触发后 spring 路径仍跑死值）[问题 1]。
- aria-label：✅ 汉堡菜单 / WhatsApp / lang switch 都有，soft-404 dialog 有 aria-modal+labelledby。

## 问题清单（按 severity 降序）

### [问题 1] severity=critical | location=components/sections/TrustStrip.tsx + components/motion/NumberTicker.tsx:43-72 | viewport=all

现象：滚到 TrustStrip section（hero 下方第一屏的硬信任区），4 个核心数字显示 `0+ / 0.0% / 0 年 / 0 小时`。等待 5 秒数字仍然是 0；切到 reduced-motion 也是 0；DOM 已挂 `motion.span`，hydration 也完成。

影响：spec §4.1 + §6 "信任证明应在首屏后尽早出现 + 数字 / 评分必须在没有真实来源前标 mock"。我们的 mock badge 是写了，但**数字本身渲染成 0** 比"没有数字"还差，海外游客第一眼直接读到"已为 0 位旅客做过定制 / 0 小时回复"，trust 漏斗在第一节点 100% 漏穿，整页所有后续 section 都救不回来。

修复建议：`components/motion/NumberTicker.tsx:43-47` 的 `useSpring(motionValue, { duration: duration * 1000 })` 是错的——framer-motion `useSpring` 默认走 stiffness/damping 物理模型，传 `duration` 时单位是**秒**不是毫秒（你乘了 1000，超出常规配置），导致 spring 永远不收敛或不触发 `on('change')`。两条路：(a) 改用 `{ stiffness: 50, damping: 18 }`，或 (b) 直接放弃 spring 用 `animate(motionValue, value, { duration: 2.6 })` 命令式 API。同时把 mounted gate 之后的初始 setDisplay 拉到 useEffect 顶层，确保 reduce-motion / inView 任何路径都能保底显示真值。

优先级理由：ux-guidelines `Reduced Motion` HIGH + `Loading States` HIGH + landing.csv pattern 2 "Social proof before CTA"。这是 P0，**ship 前必须修**。

### [问题 2] severity=critical | location=components/chrome/TopNav.tsx:30-36, 84-149, 281-310 | viewport=all

现象：TopNav 整套 chrome 完全不接 dictionary。NAV_ITEMS 五个标签（"目的地 / 行程 / 顾问 / 旅行故事 / 关于我们"）+ "更多" + 桌面 CTA "免费定制行程" + WhatsApp 文案 "WhatsApp · 值班" + "登录" + soft-404 dialog 双语标题，全部硬编码字符串。点击 EN 后页面其它部分（hero / how-we-work / sample itineraries / leadform）全切换为英文，但导航仍然中文。

影响：spec §3.4 "核心 CTA、表单、隐私说明、提示、FAQ、导航和 trust proof 文案都必须跟随语言切换" + §10 "首发支持语言清单"，海外用户首次访问按 Accept-Language 默认 EN（`lib/data/locales.ts:3`），如果浏览器是英文则 hero 是英文但导航中文，**首屏强烈违和感 + 导航不可用 + lead-gen 入口"免费定制行程"用户根本读不懂**。这是 spec §10 "实施前必须确认 - 首发支持语言清单" 的硬约束。

修复建议：把 NAV_ITEMS 移到 `lib/data/dictionaries/{en,zh}.ts` 的 `home.nav` 分支，TopNav 改为 `useDictionary().home.nav`；CTA "免费定制行程" 用 `dict.home.nav.primaryCta`；WhatsApp / 登录 / 移动 drawer 标题 / soft-404 dialog 同样改字典。更稳：把 LocaleSwitch 也升级到 sticky 状态时仍然可见（当前 desktop 滚动后 deep-slate header 内 LocaleSwitch 仍存在 ✅，OK）。

优先级理由：spec §3 / §10 / §4.1 三处都点到，且首页访客第一眼必看，是阻断海外用户的正面墙。

### [问题 3] severity=high | location=components/sections/HomeHero.tsx:57-62 + spec §5 二级入口 | viewport=all

现象：hero 副 CTA 文案 "直接联系顾问 / Talk to a specialist"（zh/en），点击后 `href="#specialists"` 跳到 Specialists section（demo 顾问卡片网格）。**文案承诺 "直接联系" 但行为是 "看顾问列表"**。Specialists 卡片本身没有任何邮箱 / WhatsApp / 电话直链，每张卡片底部 CTA 还是回到 #lead-form。

影响：spec §5 二级入口 "用于高意向或急迫用户。可包含 WhatsApp、邮箱、电话、微信、预约咨询等"。当前 hero 把高意向用户引到一个**没有联系方式**的 demo 卡片墙，浪费最贵的首屏副 CTA 位。Hero pattern 2 的 ui-ux-pro-max 规则也要求"Hero (sticky) + Bottom"双 CTA placement，这里二级 CTA 直接失效。

修复建议：两条路任选 (a) 把副 CTA 改成 inline modal 弹出 ContactChannelList（已有 `components/contact/ContactChannelList.tsx` 在 LeadFormSuccess 用了）。(b) 改文案为 "Meet your specialists / 看看你的顾问"，跟实际 anchor 行为对齐；同时在 Specialists 卡片下方加一行 "Reach a specialist now →" 直链 ContactChannelList。推荐 (a)，转化路径短一节。

优先级理由：spec §5 + landing.csv pattern 2 "Hero (sticky) + Post-testimonials" placement，文案行为不一致是直接的转化漏损。

### [问题 4] severity=high | location=components/chrome/TopNav.tsx:131-149 + 移动端整页 | viewport=tablet/mobile

现象：768px 到 1024px（含主流平板和大手机横屏）完全没有 sticky CTA。`lg:flex` 在 1024 以下隐藏桌面级 "免费定制行程 + WhatsApp"，TopNav 只剩 brand + 汉堡菜单。Hero CTA 之后 11 个 section 没有任何浮动 / sticky 的 lead 入口，用户必须滚到 LeadForm（6724px）或回到 hero 才能转化。

影响：spec §5.1 一级入口 "应在首屏 CTA、页面中段和底部至少有三处可达路径 + 贯穿页面"。中段（destinations / sample / specialists）每个 section 自己有 inline CTA "定制类似行程"链回 #lead-form，OK；但**整个 viewport sticky 层在移动端是空的**，海外手机用户中段任何时刻想转化都得先收起内容栈跳回顶部。

修复建议：移动 / 平板加一个 `bottom: 16px; right: 16px` 的 floating CTA pill（或 sticky bottom bar），在 hero 滚出 viewport 后渐入，文案 "Plan your trip / 开始定制"，含 WhatsApp 副入口。pill 优于 bar 不挡内容。也可考虑 TopNav 在移动端 sticky 阶段内嵌一个迷你 CTA 按钮（比汉堡菜单优先级高的红色 dot indicator）。

优先级理由：海外游客主入口是手机（spec 用户假设），中段六屏没有触发器是漏斗第二大损耗。

### [问题 5] severity=high | location=components/sections/LeadForm.tsx:148-185 + lib/data/lead-form 的 zod schema | viewport=all

现象：表单提交（点 "发送给顾问"）后错误提示直接显示 zod 默认英文：
- "Too small: expected string to have >=1 characters"（出现在 name / travelMonth / preferredChannel）
- "Invalid email address"
- "人机校验失败，请重试。"（这条是 dict 里的，OK）

影响：spec §3.4 "表单错误提示、成功提示" 必须跟随语言切换，且对中文用户 / EN 用户 raw zod 字符串都是无 UI 设计味道的。spec §4.7 "必填字段应控制在最小范围"，但当前用户面对的是 **5 条英文报错** 全屏蹦出，移动端体验更差（错误堆叠占半屏）。

修复建议：在 `lib/data/lead-form.ts` 给 zod schema 每个字段加 `{ message: ... }`，并把 message 改成从 dict 注入的 callback（zod v4 支持 `errorMap`），或改成 ld.errors.required / ld.errors.invalidEmail 静态映射。最低限度先在 schema 里写双语 fallback：`z.string().min(1, 'Required · 必填')`。

优先级理由：spec §3.4 硬约束 + 移动端表单 UX 直接劝退。

### [问题 6] severity=high | location=components/sections/LeadForm.tsx:148-253 | viewport=all

现象：表单 10 个字段，4 个标 "(选填)"，**剩下 6 个就是必填**（你的称呼 / 邮箱 / 出行月份 / 行程天数 / 出行人数 / 希望的回复方式）。但视觉上没有 `*` 必填标识或颜色提示，用户得自己反推"没标(选填)的=必填"。

影响：spec §4.7 "必填字段应控制在最小范围：姓名、联系方式、预计旅行时间或灵活度、人数 / 旅行类型"。当前必填正好对得上 spec 建议，但 UI 不告诉用户哪些必填，用户填完两三个就提交，再被 [问题 5] 的英文报错糊一脸。

修复建议：FormLabel 组件加 `required` prop，渲染 `<span aria-hidden className="ml-1 text-jade">*</span>` + label 末尾自动加 `<span className="sr-only">required</span>`。或在每个 FormDescription 里写 "Required" / "必填"。两个改一个就够。

优先级理由：跟 [问题 5] 配合就构成 "必填看不出 + 错了报英文"，移动端基本退站。

### [问题 7] severity=high | location=components/sections/LeadForm.tsx:306-348 | viewport=all

现象：表单中段 "旅行风格（选填）" 和 "想去的目的地（选填）" 两个 textarea 是 `readOnly`，placeholder 写了示例，但点击后无法输入。下方 FormDescription 说 "Multi-select coming later — describe your style in the notes below for now."

影响：用户看到一个有 placeholder、看起来可填的字段，点了没反应，**第一反应是网页坏了**，不会去读下方那行英文 description。spec §4.7 "表单应低摩擦"，dead-end 字段是反摩擦。两个字段同时这样问题翻倍。

修复建议：要么真的实现 multi-select chip（参考 react-select 或 shadcn `<Combobox multiple>`），要么直接把这两字段从表单移除，把 placeholder 内容合并到 notes 字段的 placeholder 提示里。临时方案最差：把 readOnly 去掉允许用户写文本；下面补 FormDescription 改成中性 "Describe in your own words / 用你的话描述"。

优先级理由：用户 mid-form 卡死，最伤"信任 + 转化"。

### [问题 8] severity=medium | location=components/chrome/TopNav.tsx:206-213 | viewport=mobile

现象：移动端汉堡菜单按钮 `h-10 w-10` = 40×40px。

影响：ui-ux-pro-max ux-guidelines #22 CRITICAL "Touch Target Size 44x44px minimum"。当前小 4px，老人 / 大手指用户点击容易误触 brand wordmark。

修复建议：`h-11 w-11`（44×44）或 `h-12 w-12`（48×48）。同时检查 `LocaleSwitch` 内的两个按钮 EN/中文 在 mobile drawer 内是否也满足 44×44。

优先级理由：CRITICAL 规则，但只影响移动端 + 触屏精度，所以 medium。

### [问题 9] severity=medium | location=components/sections/PathCFooter.tsx:62-69 | viewport=all

现象：footer 的联系入口在 a11y tree 里读出来是 "Email a specialistmock"（label 和 mock 角标无空格）。视觉上 `ml-2` 给了间距，但屏幕阅读器忽略 inline-block 间距。

影响：a11y 受损，且 mock badge 紧贴 label 在所有视觉调试时也不容易一眼看出哪是 label 哪是状态。spec §6 "mock data 命名、文案和视觉状态都必须让评审者一眼看出是 mock"，目前视觉过得去，a11y 不及格。

修复建议：`<a>` 内把 mock badge 拆出来用 `<span className="sr-only">·</span>` 分隔，或在 `<a aria-label="...">` 上显式覆盖 a11y name；视觉 badge 仍保留。

优先级理由：a11y + spec §6 占位规则双重影响，但仅在 footer。

### [问题 10] severity=medium | location=components/sections/HomeHero.tsx + Reveal/Tilt3D/CardStack/BorderBeam motion stack | viewport=all

现象：hero 三段 Reveal delay 0/0.15/0.3/0.45 + HeroParallax + HeroBackdrop + MagneticCta + DestinationGrid Tilt3D + CardStack + BorderBeam + Marquee + AnimatedBeam + ScrollProgress + CursorAura — 同一首页堆了至少 12 套 motion 组件。视觉上 hero CTA 显示有 0.45 秒延迟。

影响：lead-gen 漏斗第一秒最重要，spec §9 "首屏能在 5 秒内让用户理解服务对象、服务内容和下一步行动"，0.45 秒装饰延迟把 CTA 显示时间推后。ui-ux-pro-max ux-guidelines `Loading States` 要求 skeleton / spinner，但 Reveal delay 是 "已加载但故意延迟显现"，等同于人为减速。

修复建议：hero CTA 的 Reveal delay 改 0（CTA 跟 headline 同时出），保留 eyebrow / subheadline 的 stagger 即可。同时考虑把 CursorAura（鼠标光晕）在移动端 / reduced-motion 下完全关闭（当前 ScrollProgress + CursorAura 全局加载，对获客无帮助）。整体 motion 组件做一次"对获客有正向贡献吗？"的回归审视，删掉 BorderBeam / Tilt3D 这种纯炫技的，留 Reveal / Marquee / NumberTicker 这种叙事性的。

优先级理由：单点伤害不大但累积影响 LCP 感知，且这些装饰在移动端流量大时会变性能负担。

### [问题 11] severity=medium | location=components/sections/LeadForm.tsx (form 区) + LocaleProvider | viewport=all

现象：表单字段 `country: ''` 在 `defaultValues:54-69` 但 form 体里没有任何输入控件（无 country select 也无 input）。spec §4.7 字段建议含"国家/地区"。

影响：spec §4.7 + §7.2 "每条线索至少应包含：来源页面/语言、用户联系方式、旅行时间、人数、兴趣、预算或备注。**需要能区分用户偏好的联系方式和语言**"。当前提交后人工承接拿不到国家信息，但访客 IP / Accept-Language 可以反推；country 字段缺失对运营按区域承接 / 时差排班是损失。

修复建议：加一个 `<Select name="country">` 包含主要 inbound 国家（US / UK / AU / DE / FR / JP / KR / SG ...），可选字段不必填。或者退一步：根据 Accept-Language 自动填 hidden field 提交给 lead API。

优先级理由：影响运营承接质量，对 spec §7 "内部承接要求" 直接相关，但访客感知低。

### [问题 12] severity=medium | location=components/sections/HomeHero.tsx + framer-motion Reveal stack | viewport=all (尤其 reduced-motion)

现象：reduced-motion 状态下，console 持续打印 framer-motion warning："You have Reduced Motion enabled on your device. Animations may not appear as expected. For more information visit motion.dev/troubleshooting/reduced-motion-disabled"。同一 warning 至少在 hero / Reveal / NumberTicker / BorderBeam 多处触发。

影响：纯开发噪音，但说明 motion 组件没有完整 honor `prefers-reduced-motion`。spec 没硬性要求，但 ux-guidelines `Reduced Motion` 是 HIGH 规则。

修复建议：在 motion 组件里用 `useReducedMotion()` 检查返回值后动态决定是否渲染 motion；不要让 framer-motion 自己处理。或全局加 CSS `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` 兜底。

优先级理由：影响 a11y 子集（前庭敏感用户）+ console 干扰开发体验。

### [问题 13] severity=low | location=components/trust/TrustProofGrid.tsx + spec §4.1 信任前置 | viewport=all

现象：TrustProofGrid（4 类 ABCD proof 完整版）在第 7 个 section 才出现（destinations 之后、leadform 之前），距离 hero 大约 5 屏。spec §4.1 "首屏顶部或导航附近应出现简短 trust strip"——这点 TrustStrip 已经做了。但 spec §6 "信任证明应尽量靠前，并与 CTA 联动" 在 TrustProofGrid 这一层没那么"靠前"。

影响：用户看到 trust grid 时已经过了三个引导 section；如果在 destinations 之前能瞥见 trust grid 的关键证据（比如 1 条评价 + 1 个顾问头像），转化效率会更好。但 TrustStrip 数据指标 + Specialists section 已经做了铺垫，TrustProofGrid 在 leadform 上方已经是接近 transactional 位置——OK。

修复建议：可在 destinations 与 sample-itineraries 之间插一条窄的 review strip（1-2 条评价 + Tripadvisor 占位 logo），把 trust 信号撒一点到中段。**优先级低，先修 P0/P1。**

优先级理由：跟 spec 还能吻合，结构性微调。

### [问题 14] severity=low | location=components/sections/SampleItineraries.tsx + Specialists.tsx + TrustProofGrid.tsx | viewport=all

现象：SampleItineraries 三个 demo case 标题用 EN ("First-time couple from the US" / "Slow-travel couple from the UK")，body 是中文（"每城私人向导、故宫日出..."）。Specialists 名字是中文（"陆奕雯 / 陈博"），但 Marquee 重复滚动 EN+ZH 拼接（"陆奕雯 资深中国顾问 · 北京 English · 中文 Beijing · Xi'an..."）。

影响：当前 zh locale 状态下混排是合理的（spec §3.4 内部评审中文，公开素材英文）。但 EN locale 状态下检查时 Marquee 仍混排没切换，spec §3.3 用户切换语言后 trust proof 文案应跟随语言。**主要影响 EN 用户**。

修复建议：marquee items 改成 `dict.home.specialists.marqueeItems` 由字典提供，根据 locale 切换；advisor displayName.[locale] / role.[locale] 已经是双语对象，应该按 locale 提取。

优先级理由：影响有但比 [问题 2] 弱很多，因为 marquee 是装饰性 trust 信号，错配读起来"国际化感"反而强。

### [问题 15] severity=low | location=components/sections/PathCFooter.tsx:62-69 + lib/data/contact-channels | viewport=all

现象：footer 的联系入口都是 mock URL（mailto:hello@example-tourism.demo / wa.me/8613000000000 / tel:+861000000000 / weixin://contacts/profile/demo）。**用户点击 mailto / wa 链接会真实打开邮件 / WhatsApp 客户端**，但发送目标是 mock 域名，邮件无法投递；电话拨出去也是错号；wa.me/8613000000000 跳转到一个不存在的 WhatsApp 用户。

影响：spec §6 "mock 必须明确标注 + 不能伪装成真实背书"，目前每个链接旁边有 mock badge ✅，但用户点击后**没有阻止行为**或 confirm dialog，可能造成误投递、错号。在生产 build 之前必须替换 OR 拦截点击。

修复建议：dev 模式给 mock 链接加 onClick 拦截 + alert "This is a mock link · 上线前由运营替换"；或者改成 `href="#"` 加 cursor-not-allowed + visual disabled。**生产 build 前 spec §9 pre-launch checklist 必清。**

优先级理由：开发环境影响低，但有上线遗忘风险，spec §9 "Pre-launch checklist：mock proof 清理" 已经覆盖，所以仅记录。

## 优先 P0 修复（建议下一轮先做的 5 项）

| # | 问题 | 文件 | 改动方向 | 工作量 |
|---|---|---|---|---|
| 1 | NumberTicker 数字显示 0 | `components/motion/NumberTicker.tsx:43-72` | 改 useSpring 为 stiffness/damping 或换 `animate()` 命令式；reduced-motion 走简单 fallback | S |
| 2 | TopNav 不响应语言切换 | `components/chrome/TopNav.tsx:30-149` + `lib/data/dictionaries/{en,zh}.ts` | NAV_ITEMS / CTA / 登录 / soft-404 全部抽到字典；TopNav 用 `useDictionary()` | M |
| 3 | Hero 副 CTA 文案/行为脱节 | `components/sections/HomeHero.tsx:57-62` | 改文案 = 行为；或副 CTA 弹 ContactChannelList modal | S |
| 4 | LeadForm 错误信息英文 + 必填无标识 | `lib/data/lead-form.ts` zod schema + `components/sections/LeadForm.tsx` | zod 加 message / errorMap 双语；FormLabel 加 required marker | M |
| 5 | LeadForm readOnly 死字段 | `components/sections/LeadForm.tsx:306-348` | 临时把两个 readOnly textarea 移除或改成 input；spec 说 multi-select 后续做 | S |

P1 跟进：[问题 4] 移动端无 sticky CTA、[问题 8] 汉堡菜单 40×40。

## 不需要动的 / 已经做对的

- 整体信息架构（hero → trust strip → how-we-work → destinations → sample → specialists → trust grid → leadform → faq）符合 ui-ux-pro-max landing.csv pattern 2。
- design tokens（cream/jade/ink/gold）+ 字体（Newsreader serif heading + Inter body）一致，没有 AI slop 通病（无泛 SaaS 渐变卡 / 假 dashboard）。
- TrustProofGrid 4 类 ABCD proof 占位结构、mock badge 命名、`renderableProofs(isProduction)` 守门已按 spec §6 落地。
- TopNav v2 cross-validation 修复（scroll 阈值 90vh / outside-click / aria-haspopup / focus-visible / motion-safe）执行得到位。
- Hero LCP 图 `/landmarks/hero-gen/v4-a.webp` + 8 个 destination 真实图都加载成功（naturalWidth 359），不是 placeholder。
- a11y 主体（dialog aria-modal+labelledby、focus ring、semantic main/banner/contentinfo、icon aria-label）做得不错。
- Cookie/storage locale 策略 + Accept-Language detection（`app/layout.tsx:37-42`）正确。
- LeadFormSuccess 提交后展示 ContactChannelList + 编号 + 24h 承诺，符合 spec §7 人工承接路径。

## 截图索引

- `qa/ui-ux-review/desktop-1440-fullpage.png` — 桌面 1440 全页（zh）
- `qa/ui-ux-review/desktop-1440-hero-fold.png` — 桌面首屏
- `qa/ui-ux-review/desktop-1440-EN-fullpage.png` — 桌面 EN 全页（TopNav 仍中文，bug 可视）
- `qa/ui-ux-review/desktop-1440-truststrip-after-scroll.png` — 滚到 TrustStrip 后数字显示 0+ 等
- `qa/ui-ux-review/desktop-1440-reduced-motion.png` — reduced-motion 状态下 trust strip 仍 0
- `qa/ui-ux-review/desktop-1440-leadform.png` — LeadForm 区域（无 country 字段、readOnly textarea）
- `qa/ui-ux-review/tablet-768-hero.png` / `tablet-768-fullpage.png` — 平板（768<lg=1024，无桌面 sticky CTA）
- `qa/ui-ux-review/mobile-375-hero.png` / `mobile-375-fullpage.png` — 移动 375
- `qa/ui-ux-review/snapshot-desktop-1440.md` / `snapshot-desktop-1440-EN.md` / `snapshot-mobile-375.md` / `snapshot-truststrip-scrolled.md` — Playwright a11y snapshot
- `qa/ui-ux-review/console-desktop.log` / `console-final.log` — console 日志（0 errors）
- `qa/ui-ux-review/network-desktop.txt` — 网络请求日志（0 失败）
