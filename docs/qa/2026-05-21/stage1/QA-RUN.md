# Stage 1 高 ROI 动效升级验收（2026-05-21）

**分支**: feat/lead-generation-foundation
**Stage 1 commit 区间**: f683630..d0383f9（4 个 commit）
**HEAD（含 QA 截图后）**: 见 git log

## 4 个升级与截图位置

| # | 改造 | 组件 | 桌面截图 | 节点 |
|---|---|---|---|---|
| 1 | Hero Ken Burns + light-ray + 微粒 | HeroBackdrop / HomeHero | `01-hero-fold.jpeg` | 静帧；动效需 dev 看动 |
| 2 | TrustStrip NumberTicker 进入视口数字滚动 | NumberTicker / TrustStrip | `02-trustStrip-ticker.jpeg` | 滚到 y=950 静帧（数字已结束） |
| 3 | HowWeWork 三步飞线连接 | AnimatedBeam / HowWeWork | `03-howWeWork-beam.jpeg` | beam 是流光动效，静帧只能看 base path |
| 4 | DestinationGrid 3D Tilt + BorderBeam | Tilt3D / BorderBeam / DestinationGrid | `04-destinations-rest.jpeg` (静态), `05-destinations-hover-borderbeam.jpeg` (Beijing 卡 hover 触发) | hover 时卡 jade→gold conic 边光带；static 无可见变化 |

## 全页与移动端

| 文件 | 视口 | 用途 |
|---|---|---|
| `06-fullpage-stage1.jpeg` | 1440×900 fullPage | 桌面全页对比基线 |
| `07-mobile-fold.jpeg` | 390×812 viewport | 移动端 hero（light-ray/particle 已被 hidden md:block 关掉） |
| `08-mobile-fullpage.jpeg` | 390×812 fullPage | 移动端全页（beam / borderbeam 在 md 以下不渲染） |

## 验证结果

- typecheck / check:i18n / build：上一轮 `stage1-impl` 已 PASS（commit 时验过）
- LocaleSwitch EN：QA 期间手动 set cookie + localStorage = en，hero 渲染英文标题
- 动效装回点全部命中（视频背景虽然没真视频，Ken Burns + light-ray + particle 三层叠加在静图上视觉接近）

## 已知遗留与决策

1. **Ken Burns / light-ray 静态截图看不出动**：这是预期。要动需在 dev 看实景。
2. **AnimatedBeam 静帧只能看到 base 路径**（`03`），流光的 jade→gold gradient 动效需要 dev 时录屏。
3. **BorderBeam hover 触发**：`05` 是 Beijing 卡 hover 后状态；如果 jade 边光不可见，可能是 `@property --border-beam-angle` 在浏览器（Chromium 老版）不支持 fallback 到静态 conic-gradient，仍可见但不旋转。
4. **移动端动效全部退化**：light-ray / particle / AnimatedBeam / BorderBeam 在 `md` 以下不渲染，保留静图 hero + parallax 即可，避免低端机性能压力。

## Stage 2/3 待选

如果 Stage 1 看下来效果到位，下一步走 Stage 2：
- TrustProofGrid 改 shadcn Tabs（A/B/C/D 切换，减小 2197px 高密度信息）
- LeadForm 改 3-Step Stepper（联系方式 → 旅行偏好 → 时间预算）
- LeadForm 顶部 Marquee 社会证明
