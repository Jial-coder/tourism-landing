# i18n 全站接通 + UX/动效升级 验收（2026-05-21）

**分支**: feat/lead-generation-foundation
**HEAD**: 见 git log
**任务**: #24（实施）+ #25（QA）

## 验证矩阵

| 项目 | 命令 / 操作 | 结果 |
|---|---|---|
| typecheck | `pnpm run typecheck` | PASS |
| build | `pnpm run build` | PASS（20 routes，no hydration mismatch） |
| i18n parity | `pnpm run check:i18n` | PASS — en/zh schema 完全平齐 |
| LocaleSwitch 实时切换 | Playwright 桌面点 中文 | PASS — html lang=zh、所有 H1/H2 实时变中文 |
| LocaleSwitch reload 持久化 | navigate→reload | PASS — cookie locale=zh + 1 年期，reload 后保持 |
| 桌面 EN 截图 | 1440×900 | `01-desktop-en-full.jpeg` / `02-desktop-en-fold1.jpeg` |
| 桌面 ZH 截图 | 1440×900 | `03-desktop-zh-fold1.jpeg` / `04-desktop-zh-full.jpeg` / `05-desktop-zh-leadform.jpeg` |
| 移动 ZH 截图 | 390×812 | `06-mobile-zh-fold1.jpeg` / `07-mobile-zh-full.jpeg` |

## 实测文案验证

切换前后核心标题：

| key | EN | ZH |
|---|---|---|
| `home.hero.headline` | "Plan your private China trip with local experts" | "和本地顾问，把中国玩成你自己的样子" |
| `home.howWeWork.heading` | "Three steps from idea to itinerary" | （切换后变中文） |
| `home.destinations.heading` | "Start with one place that pulls you" | （切换后变中文） |
| `home.sampleItineraries.heading` | "How others have travelled with us" | （切换后变中文） |
| `home.specialists.heading` | "Real people behind every reply" | （切换后变中文） |
| `home.trustGrid.heading` | "Specialists, examples, reviews and the small print" | （切换后变中文） |
| `home.leadForm.heading` | "Tell us your trip — a specialist replies within 24h" | （切换后变中文） |
| `home.faq.heading` | "Common questions before your China trip" | （切换后变中文） |
| `leadResponsePromise` (锁定) | "A China travel advisor usually replies within 24 hours (Chinese holidays excluded)." | "我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）" |

## 动效装回点

| 组件 | 装载位置 | 行为 |
|---|---|---|
| HeroParallax | HomeHero 背景图 | scrollY 0-800 → 图片 y 0-120px + brightness 1→0.7 |
| Reveal | 全部 9 个 section + 标题/卡片 | fade-up + viewport once，duration 0.7s |
| MagneticCta | HomeHero 主 CTA + LeadForm submit | 光标进入半径 100px 微跟随，最多 6px |
| Marquee | TrustStrip 底部 + Specialists 顶部 | 双倍数组无限滚动，hover 暂停 |
| CardStack | DestinationGrid 8 卡 | hover y -4 + scale + 浮层 "Plan a trip to X →" |
| AccordionItemMotion | FAQ 8 条 | content open 时 stagger 0.06s/child fade-in |
| ScrollProgress | layout.tsx 全站 | 顶部 1px jade，scrollYProgress + spring |
| CursorAura | layout.tsx 全站桌面 | 桌面 trail，touch 设备 return null |

## prefers-reduced-motion 处理

全部 motion 组件首行检 `useReducedMotion()` true 时退化静态 DOM；CursorAura/ScrollProgress 直接 return null。

## 决策记录

1. **app/page.tsx 清理**: 删掉外壳 `<section id="lead-form">` 包 LeadForm 的 hardcode 英文标题；现在直接 `<LeadForm source="home-mid" />`，让 LeadForm 内部走 i18n。commit `40ef8d3` 之后又加了一个修复 commit。
2. **Marquee 内容部分仍 inline 英文/中文 ternary**：6 条品牌词 hardcode；如果想全字典化，下次任务补 `home.trustStripMarquee` / `home.specialistsMarquee` key。
3. **CursorAura 在 hover-capable 设备显示**：默认 jade 12px 圆，覆盖 link/button 时 scale 2.5；不闪不眩，符合反 AI slop 边界。
4. **Hero 视差幅度 120px**：移动端测试无明显卡顿；如果想更克制可改 80px。

## 已知遗留

1. mock 全占位（A/B/C/D + stats），prebuild guard stub 仍是 exit 0；Phase 6 Task 6.2 真实 guard 待落
2. rate limit 单 instance（Vercel 多实例不共享，Phase 7 备忘）
3. Turnstile/Feishu env 缺失时 dev bypass / log only
4. country / multiselect 字段 schema 有但未渲染（保留待 form v2）
5. 移动端 ScrollProgress 仍渲染（不影响性能）；如不喜欢可加 hidden md:block
