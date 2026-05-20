# 夜间自主推进开发进度日志（2026-05-20 23:46 → 2026-05-21）

> **任务**：用户授权离场期间，主代理 + team mode 自主把 hero v5.1 视觉锚锁定的 14 模块落成实际 Next.js 网站，浏览器跑通，配 codex 反证。
> **不允许**：等待人工决策、需要 API key、停顿超过任务自然耗时。
> **风格**：rules/05 cockpit 章程 + rules/15 team-mode + rules/16 codex-collab。
> **责任**：一切技术决策由 lead 自主拍板，关键节点叫 codex 反证；codex 不可用 → code-reviewer subagent 替代。

---

## 起始状态（2026-05-20 23:46）

| 项 | 状态 |
|---|---|
| `app/page.tsx` | redirect → /client/prototype（v0.1 朱砂红 49KB 老代码） |
| `app/globals.css` | v0.1 cinnabar / ink-teal / Noto Serif SC 主题 |
| `app/layout.tsx` | Geist + Geist Mono（不是 MiSans VF） |
| `components/atoms/` | 不存在 |
| `components/sections/` | 不存在 |
| `components/chrome/` | 不存在 |
| `docs/DESIGN.md` | v0.2 hero v5.1 锁锚（已有完整 token 表） |
| `docs/modules/M-*.md` | 14 个 brief 全在（不含 M-CONCIERGE-BAND，需补） |
| `public/landmarks/` | 10 张 Unsplash 景点照（zhangjiajie / guilin / lijiang / lhasa / 等） |
| `public/fonts/` | 不存在（MiSans VF 待装） |
| `.env.local` | 含 UNSPLASH_ACCESS_KEY + 缺 NEXT_PUBLIC_ENABLE_MAP_OUTLINE |

## 终态（2026-05-21 早 8:30 之前）

| 项 | 状态 |
|---|---|
| `app/page.tsx` | ✅ 直渲染整页 11 section + 2 浮层 |
| `app/globals.css` | ✅ DESIGN.md v0.2 全套 token + MiSans VF + 颗粒/dropdown/headline-shadow utilities |
| `app/layout.tsx` | ✅ MiSans VF / lang="zh-CN" / charcoal blue body |
| `components/atoms/` | ✅ 8 个原子（Pill / VisaChip / CTAGhost+CTAPrimary / DestinationTile+TileCaption / SectionContainer+SectionInner / HeadlineGroup / DropdownSurface / FilmGrain） |
| `components/chrome/TopNav.tsx` | ✅ chrome v2，6 项 5.5 fix 全部命中 + 移动汉堡抽屉 + 软 404 dialog |
| `components/sections/` | ✅ 10 个 section（Hero / ConciergeBand / DiagnosticSection / DestinationTilesSection / VisaSection / AdvisorCard / ConciergeNote / DualCTA / TrustFootnote / Footer + NewsletterForm） |
| `components/floating/` | ✅ ChatLauncher（4 态 FAB）+ InteractiveDock（右侧 4 按钮 dock） |
| `docs/modules/M-CONCIERGE-BAND.md` | ✅ 新 brief（v2 重构 form 下沉段） |
| `docs/night-build-progress.md` | ✅ 本日志 |
| `pnpm misans-vf` | ✅ 装机 |
| `.env.example` | ✅ R-001 守门 NEXT_PUBLIC_ENABLE_MAP_OUTLINE=false |
| Playwright 双视口验收 | ✅ 0 console error / 0 horizontal overflow / 6 fix 全过 |

## 工作 wave（执行轨迹）

```
Wave 0   状态摸底（13 brief Explore 摘要 + 老代码盘点） → ✅
Wave 1   DESIGN tokens + MiSans VF 字体 + env 基础设施   → ✅
Wave 2   6 atom + 2 chrome 组件                          → ✅
Wave 3   TopNav v2 整合 chrome 三件套                    → ✅
Wave 4   Hero v5.1（视觉锚）                             → ✅
Wave 5   M-CONCIERGE-BAND brief + 实施                   → ✅
Wave 6   8 业务 section                                  → ✅
Wave 7   浮层 ChatLauncher + InteractiveDock             → ✅
Wave 8   page.tsx 总装                                   → ✅
Wave 9   Playwright 双视口验收                           → ✅
Wave 10  codex exec 终审 → 决议 B 微调                   → ✅
Wave 11  codex 5 项必修：nav Link / drawer inert /        → ✅
         alt 诚实文案 / eyebrow 单语 + TrustFootnote 非
         对称 + 圆角降一档 / misans-vf license 修正
```

## codex 终审决议（Wave 10）

> 文件：`C:/Users/Administrator/.claude/tmp/codex-collab/20260520-night-build-final-review-out.md`
> 输入：`20260520-night-build-final-review-in.md`

**决议 B（微调可锁）**：首屏视觉方向可锁，确实更像 cinematic editorial，不是 SaaS 模板；`next build`、本地 `tsc --noEmit`、桌面/移动 Playwright 抽查都过，console 无 error、无横向溢出。

**5 项必修（已全部修复）**：
1. ✅ 桌面主导航除"旅行故事"外是无动作 button → 改 `Link href` 路由占位
2. ✅ 移动抽屉关闭时仍在 a11y 树暴露为 dialog → 加 `aria-hidden={!open}` + `inert={true}`
3. ✅ Jiuzhaigou 用 lhasa.jpg / Advisor 用风景图但 alt 写 "顾问肖像" → alt 改诚实占位文案 + R-N1/N6 升优先级
4. ✅ 多个 section eyebrow 中英同屏 / TrustFootnote 4 等分网格 / 16-20px 圆角 → 删英文 eyebrow 单语化 + TrustFootnote 改 2x2 偏移非对称 + 圆角统一降到 6-8px
5. ✅ misans-vf license 是 Apache-2.0 不是 OFL → 进度日志改正

## 决策日志

### D-1：字体走 npm `misans-vf` subset 包，不下二进制 ttf
- 触发：DESIGN.md §3 锁死 MiSans VF 单字族；OFL 公开但 jsdelivr/Xiaomi-CyberDog 路径 404
- 选项：A) jsdelivr 直拉单 ttf；B) hyperos.mi.com 手动下载 ttf；C) `pnpm add misans-vf` package（@Bluemangoo subset，80+ woff2 unicode-range，font-display:swap，**Apache-2.0 license**）
- 选 C：subset 优化 + 打包好的 @font-face + lazy load by unicode-range，加载体感 < 单 ttf 整 6MB；不需要 next/font 复杂配置；@import 进 globals.css 一行解决
- 风险：misans-vf 是社区包不是官方；官方 MiSans 字体本体是商用免费授权（含 OFL 字段说明），但本 npm 包代码层是 Apache-2.0；生产建议走官方 hyperos distribution + 自签 License 备案

### D-2：v0.1 朱砂红老代码不删，保留 /client/prototype 路径
- v0.1 49KB page.tsx 含 china-map d3-geo + 真实景区圆形 marker + 行程卡 framer-motion，是 Day 1-5 的真实交付物
- 当前 app/page.tsx 重写后 redirect 失效；用户睡醒可能问"那个有地图的 prototype 还在吗"
- 决定：保留 /client/prototype 不动；新整页占根 /；这样两个状态都可访问，方便对照
- TODO（待 lead 醒后决策）：v0.1 prototype 是否归档 / superseded

### D-3：advisor 头像用风景图占位，不假装真人
- brief M-ADVISOR-CARD 要求真人 portrait + GDPR 授权
- 用户离场无法签授权
- 决定：用 lijiang.jpg 风景图占位 + alt 标注 "顾问肖像"；component 注释明说占位
- 风险：截图视觉偏弱（没人脸 emotional anchor）；但比 stock-photo "顾问头像" 假笑更真诚
- TODO：用户醒后用真实 Lin 肖像 + 签 release

### D-4：M-CONCIERGE-BAND 边写 brief 边实施
- 之前缺 brief（标 #33 pending），但 hero v2 重构已经把 form 下移，必须有
- 用户指令"自己制定目标"+ 时间紧
- 决定：先用 lead 拍板的最小可行 brief（4 字段表单 + advisor mini，70/30 layout）写 docs/modules/M-CONCIERGE-BAND.md；再立即实施
- 不叫 codex 反证 brief，只在最终整页时叫 codex 一次

### D-5：所有表单 fake submit，不接后端
- 用户明令"不要有需要 API 的地方"
- 决定：concierge form / newsletter / chat input 全部前端 setState fake，800ms 假装异步 + 切到 done 态
- TODO：用户醒后决定接什么后端（自有 API / Form spree / Tally / Notion DB / supabase 等）

### D-6：先实施再叫 codex（违反 rules/16？）
- rules/16 要求关键节点叫 codex；但实施一份 8h 时间预算的工作时不每步都叫
- 用户明令"自主推进，自己决定"，并允许"重要环节叫 codex 反证"
- 我把"重要环节"定为 wave 9 = 整页装完 + Playwright 通过，**这一次叫 codex exec 终审**（执行中）
- 这是用户明许范围内的偏离，记录在此

## 风险登记（醒后请看）

| 编号 | 内容 | 风险 | 建议 |
|---|---|---|---|
| R-001 | 中国地图轮廓合规 | 已守门 prod=false，review 也建议关 | 不变 |
| R-N1 | advisor 用风景图占位 | 视觉缺人脸锚点 + brief 偏离 | 醒后换真人 + GDPR release |
| R-N2 | 表单全 fake submit | 客户输入丢失 | 醒后接后端或 Tally embed |
| R-N3 | v0.1 老 prototype 还能访问 | 用户/客户撞见有歧义 | 醒后归档或 410 |
| R-N4 | misans-vf npm 是社区包 | 版本/repo 跑路风险 | 醒后评估换官方 dist |
| R-N5 | TopNav 中"目的地/行程/顾问"按钮无 onClick 跳转（站点未建子路由） | 点击后无反应 | 醒后建占位路由或临时 alert |
| R-N6 | TileCaption GPS 字段是手算坐标 | 数值不一定精确（DYG 机场代码 OK，GPS 是 mood） | 醒后核对真坐标 |
| R-N7 | i18n 仅占位（TopNav 切换 ZH 但 hero 文案不变） | 切换器是 UI placeholder，未接 next-intl | 醒后规划 i18n |

## 工程指标

- 改动文件：20 个新建 + 4 个改写
- 净增代码：约 1900 行 TypeScript + 100 行 CSS
- 装机依赖：1 个（misans-vf）
- Console error：0
- Horizontal overflow：无
- Lighthouse / WCAG：未测（夜间无浏览器扩展）
- next dev 启动时间：241ms

## 下一步（醒后）

按 R-N1-N7 逐项决策。codex 终审输出落 `C:/Users/Administrator/.claude/tmp/codex-collab/20260520-night-build-final-review-out.md`，醒后看一眼。

---

**最终交付 URL**：`http://localhost:3000/` （pnpm dev 还在 background）
**截图**：
- `.playwright-mcp/qa-final-desktop-fold1.png` 桌面首屏
- `.playwright-mcp/qa-final-desktop-full.png` 桌面整页 6075px
- `.playwright-mcp/qa-final-mobile-fold1.png` 移动首屏 390×844
- `.playwright-mcp/qa-final-mobile-full.png` 移动整页

**codex 评审**：`C:/Users/Administrator/.claude/tmp/codex-collab/20260520-night-build-final-review-out.md` → 决议 B 微调可锁，5 项必修已修复
