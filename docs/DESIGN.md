# DESIGN.md — Tourism Landing (Inbound China)

> **Source of truth** for visual + interaction design.
> 锁定来源：M-HERO v4（Figma Make Round1，2026-05-20，Gemini 3.1 Pro 生成 + codex 5.4/5.5 双轮交叉验证 + 用户视觉验收通过）。
> Mirror tools (Figma Make / draw.io) read from this; never write back.

---

## 0. 沿革

| 版本 | 日期 | 状态 | 说明 |
|---|---|---|---|
| v0.1 Day 1 骨架 | 2026-05-18 | superseded | 朱砂红 + Noto Serif SC 方向，未上稿即废 |
| **v0.2 hero v4 锚** | **2026-05-20** | **active** | charcoal blue + MiSans VF + cinematic editorial，已通过 Figma Make 验收 |

v0.1 的"朱砂红 + 墨青 + 暖白 + 纸金"配色与 Noto Serif SC 字体方向，因 V4 Real-Website Photo-First 转向 + codex round 1/2 review 全部废弃，仅保留作历史参考。

---

## 1. 视觉锚来源

整站 token 来自 Figma Make 项目 `ieWPFLgN0Mt9Akm7RAzTVb` Version 4 的 `App.tsx` 实际可运行代码。生成顺序：v1（密度过高 + 学术字体 + 双语同屏）→ v2（密度+字体+语言三件套修复）→ v3（背景黑块+tile 大小+route line 三件套修复）→ **v4（删椭圆遮罩 + 加 drop-shadow + CTA 字距修复）**。

第一轮其他 13 模块（M-NAV / M-LANG / M-AUTH-ENTRY / M-CONCIERGE-BAND / M-DUAL-CTA / M-DIAGNOSTIC / M-VISA / M-DESTINATION-TILES / M-TRUST-FOOTNOTE / M-CHAT-LAUNCHER / M-INTERACTIVE-DOCK / M-FOOTER + 视情况 M-CONCIERGE-NOTE / M-ADVISOR-CARD）必须**严格继承**本文件 §2-§7 token，不允许引入新 token 族。

---

## 2. Color tokens

```yaml
color:
  charcoalBlue:   "#1a2538"   # 主表面 / hero 渐变起点 / pill 半透填充 / footer 背景
  deepSlate:      "#0f172a"   # 页面底色 / hero 渐变终点 / 最深背景
  softIvory:      "#fdfbf7"   # 主文字 / 描边 / 选中态
  mistGray:       "#94a3b8"   # 次级文字（reserved，hero 暂未用，下游模块辅文）
  alpineBlue:     "#38bdf8"   # 强调色，仅用于 visa chip 6px 圆点 / focus ring / online dot；不大面积铺
  paperGold:      "#c9a65c"   # 第二 accent，仅用于 hero collage 路线 + 节点 circle marker；hero v5.1 引入
  black:          "#000000"   # 仅用于半透阴影 rgba(15,23,42,...)，不直接用作纯色
```

**透明度规格**（hero v4 实测）：
- 文字主：`text-[#fdfbf7]` (100%)
- 文字次：`text-[#fdfbf7]/95` / `/90` / `/75` / `/60`（headline / pill 文字 / supporting copy / CTA placeholder 字色）
- 描边：`border-[#fdfbf7]/[0.18]` (pill) / `border-[#fdfbf7]/30` (visa chip) / `border-[#fdfbf7]/15` (CTA placeholder) / `border-[#fdfbf7]/10` (destination tile)
- 半透填充：`bg-[#1a2538]/60` (pill) / `bg-[#1a2538]/20` (visa chip)

**禁用色**：
- ❌ 朱砂红 / 暖纸色 / 纸金（v0.1 已废）
- ❌ SaaS 紫 / 鲜艳橙红 / 霓虹绿 / 紫色渐变
- ❌ 任何竞品 chinahighlights.com 风格的 "#C13829 朱砂"

---

## 3. Typography tokens — MiSans VF 单字族

```yaml
typography:
  family:
    primary:  "'MiSans VF', 'MiSans', sans-serif"
  fallbackChain: "MiSans VF → MiSans → sans-serif"
  variableFont: true   # 用 weight axis，不切换字族
  weights:
    heavy:    800    # h1 / hero headline
    bold:     700    # h2 / hero supporting headline
    semibold: 600    # 预留，h3
    regular:  400    # body / supporting copy / pills / CTA / chip / caption
  sizes:
    h1Desktop: "72px"   # font-[800] leading-[1.1] tracking-tight
    h1Mobile:  "36px"   # leading-[1.2]
    h2Desktop: "42px"   # font-[700] leading-[1.2] tracking-tight
    h2Mobile:  "24px"   # leading-[1.3]
    bodyDesktop: "17px" # font-[400] leading-relaxed
    bodyMobile:  "14px"
    pill: "14px"
    chip: "12px"
    caption: "11px"     # destination tile caption
    cta: "13px"         # CTA placeholder（注意：tracking-wide，不 uppercase）
  shadows:
    headlineLegibility: "drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]"   # h1/h2 在透明背景上的可读性兜底（v4 5.5 反证后加）
```

**字体禁用清单**（5.5 cross-validation 总结）：
- ❌ Source Han Serif SC / Source Han Sans SC（学术）
- ❌ Playfair Display / Noto Serif SC（v1 fallback，气质偏新闻杂志）
- ❌ Editorial New / GT Sectra / Tiempos（付费，气质偏时尚 / 学术）
- ❌ Inter / Newsreader / 任何与 MiSans 不同源的拉丁字体

**关键约束**：
- 所有模块统一走 `font-['MiSans_VF','MiSans',sans-serif]`，由 weight axis 调字重，**不切换字族**
- CSS 字距：headline 用 `tracking-tight`，destination caption 用 `tracking-wide`（≈0.025em）；**不要 `uppercase` 配中文**（5.5 反证：中文不存在 uppercase + tracking-[0.1em] 字距太大显涣散）

---

## 4. Spacing / Radius / Shadow tokens

```yaml
spacing:
  containerMaxWidth: "1440px"   # max-w-[1440px]
  paddingDesktop: "64px"        # px-16
  paddingMobile:  "24px"        # px-6
  navStripHeight: "72px"        # 透明 nav 占位
  heroBottomPadding: "128px"    # pb-32 desktop
  heroBottomPaddingMobile: "48px"  # pb-12

radius:
  pill:   "9999px"  # rounded-full（pill / chip / CTA placeholder）
  tile:   "4px"     # rounded（destination tile）
  card:   "12px"    # 预留下游 advisor / form 卡

shadow:
  tile:        "shadow-[0_15px_40px_rgba(15,23,42,0.5)]"
  pillSoft:    "shadow-sm"
  chipSoft:    "shadow-sm"
  textLegible: "drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]"   # 见 §3
  tileCaption: "drop-shadow-md"
```

---

## 5. Background / Gradient / Effects

**主背景结构**（hero v4 标准）：

```
Layer 1: 真实摄影主图   absolute inset-0 w-full h-full object-cover opacity-90
Layer 2: 渐变蒙版       desktop: bg-gradient-to-r from-[#1a2538]/85 via-[#1a2538]/55 to-transparent
                       mobile:  bg-gradient-to-t from-[#1a2538]/90 via-[#1a2538]/70 to-transparent
Layer 3: 颗粒纹理       opacity-[0.05] mix-blend-overlay  (SVG fractalNoise, baseFrequency 0.65)
```

**禁用**（5.5 反证 + lead 决议）：
- ❌ `bg-black/20 mix-blend-multiply blur-3xl rounded-full` 椭圆遮罩 — 大屏会糊出脏暗
- ❌ headline 背后大色块遮罩。可读性靠主渐变 + 文字 drop-shadow

**Photo bleed 原则**：背景图必须**全宽** (`inset-0 w-full`)，让左侧 headline 区也有照片透出，不允许左侧出现纯色 charcoal blue 死区。

---

## 6. Motion tokens

```yaml
motion:
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"   # tailwind ease-default
  duration:
    fast: "150ms"   # button hover
    base: "300ms"   # section fade-in
    slow: "600ms"   # 页面切换
  rules:
    - "禁止 auto-carousel"
    - "禁止 parallax（移动端晕动症）"
    - "首次入场 hero 主图最多 1.02 倍推进 8s 后停，不循环"
    - "reduced-motion 媒体查询关闭所有非必要动效"
```

---

## 7. Component tokens（hero v4 已落地的 6 个 atom）

### 7.1 Pill (Diagnostic)

```
shrink-0 px-4 py-2 rounded-full
border border-[#fdfbf7]/[0.18] bg-[#1a2538]/60 backdrop-blur-md
text-[14px] text-[#fdfbf7]/90 font-[400]
whitespace-nowrap shadow-sm
hover: 仅 stroke 微亮，不变填充色
```

### 7.2 Visa Chip (Annotation)

```
inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full
border border-[#fdfbf7]/30 bg-[#1a2538]/20 backdrop-blur-md
text-[12px] text-[#fdfbf7]/90 font-[400]
shadow-sm
prefix: 6px alpine blue dot (#38bdf8)
```

### 7.3 CTA Placeholder (Ghost outline)

```
inline-flex justify-center items-center px-8 py-3.5 rounded-full
border border-[#fdfbf7]/15 bg-transparent
text-[13px] text-[#fdfbf7]/60 tracking-wide font-[400]
hover: bg-[#fdfbf7]/5 transition-colors
```

> CTA placeholder 仅做占位；**M-DUAL-CTA brief 会定义最终 CTA 样式**（带 alpine blue accent / hover 内填等），覆盖此 placeholder。

### 7.4 Destination Tile (Floating)

```
absolute (positioned by parent)
w-[220px] / w-[240px] (desktop) | w-[200px] (mobile)
aspect-[4/3]
rounded
border border-[#fdfbf7]/10
shadow-[0_15px_40px_rgba(15,23,42,0.5)]
rotate-[-2deg] / rotate-[+1deg]   # 微旋转
caption: text-[11px] font-[400] text-[#fdfbf7]/90 mt-2.5 tracking-wide drop-shadow-md
```

### 7.5 Section Container

```
relative min-h-screen w-full
bg-[#0f172a]
text-[#fdfbf7]
font-['MiSans_VF','MiSans',sans-serif]
overflow-x-hidden
selection:bg-[#38bdf8]/30
```

### 7.6 Headline Group

```
h1: font-[800] text-[36px] lg:text-[72px] leading-[1.2] lg:leading-[1.1] tracking-tight
    drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]
h2: font-[700] text-[24px] lg:text-[42px] leading-[1.3] lg:leading-[1.2] tracking-tight
    text-[#fdfbf7]/95
    drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]
supporting copy:
    font-[400] text-[14px] lg:text-[17px] text-[#fdfbf7]/75
    leading-relaxed max-w-[560px]
```

### 7.7 Dropdown surface（chrome v1 引入，2026-05-20）

> 来源：TopNav.tsx M-AUTH-ENTRY + M-LANG dropdown。所有下游 dropdown / popover / modal 共用这套 surface treatment。

```
位置：absolute top-full right-0 mt-3
宽度：M-AUTH-ENTRY 280 / M-LANG 220 / soft-404 modal 240
背景：bg-[#1a2538]/90 backdrop-blur-md
顶边发丝：border-t border-[#fdfbf7]/[0.06]   # 折纸感的顶部 hairline，不要四边描边
圆角：rounded-[12px]
阴影：shadow-[0_8px_32px_rgba(15,23,42,0.4)]
颗粒：absolute inset-0 opacity-[0.04] mix-blend-overlay 上 SVG fractalNoise
overflow：overflow-hidden（rounded 才能裁剪到子元素）
```

### 7.8 Active marker（list current item）

```
borderLeft: 1px ivory   # 不要 2px，不要 bg-[#fdfbf7]/5 浅底
text: 默认 ivory 100%   # 通过文字亮度区分，不靠 bg fill
```

### 7.9 TopNav scrolled state（chrome v1 引入）

```
trigger：scrolled 判定为 window.scrollY > window.innerHeight * 0.9
       不要用 scrollY > 10（会在 hero 内触发，违反 M-HERO §7）
surface：bg-[#1a2538]/80 backdrop-blur-[12px]
颗粒：opacity-[0.04] mix-blend-overlay 仅在 scrolled 时显示
transition：transition-all motion-safe:duration-300
```

### 7.10 Spacing tokens（chrome v1 引入）

```
right cluster gap (M-DUAL-CTA / M-AUTH-ENTRY / M-LANG 之间): gap-6 (24px)
desktop nav items gap: gap-8 (32px)
mobile drawer item gap: gap-8 (32px) for nav, gap-4 (16px) for CTA stack
dropdown padding: p-5 (20px)
dropdown menu row height: h-[36px]
```

### 7.11 Destination Tile collage（hero v5.1，2026-05-20）

> 来源：M-HERO v5.1 collage 变体。4 个目的地 tile 错位排布 + GPS + IATA + paper gold 路线。

**新增 accent 色**：`paperGold #c9a65c` — 仅用于 hero 路线 + circle marker；不大面积铺。

**TileCaption 组件**：
```
container: mt-2.5 drop-shadow-md flex flex-col gap-0.5 pointer-events-none
line 1 (English caps · 中文): text-[12px] font-[700] text-[#fdfbf7]/90 tracking-wide
line 2 (GPS coordinate):     text-[11px] font-[400] text-[#fdfbf7]/60
line 3 (IATA airport code):  text-[10px] font-[400] text-[#fdfbf7]/50 tracking-widest
```

**Route line SVG 规格**：
```
stroke: #c9a65c (paper gold)
strokeOpacity: 0.3
strokeWidth: 1
strokeDasharray: "6 6"
preserveAspectRatio: "none"   # 关键：让圆点和 path 跟随容器拉伸，不被 slice 截断
circle markers: r="4" fill="#c9a65c" 在每个 tile 中心
```

**4 destination tiles 默认布局**（hero 右半侧 collage）：
| Tile | right-X% top-Y% | size | rotate |
|---|---|---|---|
| Zhangjiajie | right-[28%] top-[20%] | w-[200px] | -1deg |
| Jiuzhaigou | right-[8%] top-[38%] | w-[180px] | +2deg |
| Guilin | right-[32%] top-[58%] | w-[220px] | -2deg |
| Yunnan | right-[12%] top-[78%] | w-[200px] | +1deg |

**Mobile 折叠**：collapse to 2 tiles（Guilin + Jiuzhaigou）horizontal swipe strip + GPS/IATA caption；hide route line + map outline。

### 7.12 ChinaMapOverlay（hero v9 Path A，2026-05-20）

> 来源：Path A 决策。照片归照片，地图归运行时 SVG/DOM 叠层；`DESIGN.md` 记录视觉规格，合规风险见 `docs/known-risks.md` R-001。

**实现规格**：
```
container: desktop only, absolute inset-y-0 right-0 w-[55%]
base image: /landmarks/hero-gen/v4-a.webp（无地图 / marker / 路线烙印）
svg viewBox: 0 0 620 360
outline stroke: rgba(212, 175, 55, 0.85)
outline strokeWidth: 0.8
route stroke: rgba(212, 175, 55, 0.5)
route strokeWidth: 0.7
route strokeDasharray: "4 4"
faint gold: rgba(212, 175, 55, 0.35)
marker: 16px circle, fill #d4af37
marker shadow: 0 0 12px rgba(212,175,55,0.6)
marker hover/focus: scale(1.3), shadow 0 0 18px rgba(212,175,55,0.9)
tooltip: bg-charcoal-blue/85 + border-soft-ivory/15 + text-soft-ivory + text-[11px]
```

**交互门禁**：
- marker 必须是 DOM `Link`，不是 SVG 装饰点；hover/focus/click 均可达。
- mobile (`<lg`) 隐藏 ChinaMapOverlay，只保留风景主图 + CTA，避免地图文字和窄屏内容冲突。
- Hero 内容层不能覆盖右侧 marker 的 pointer target；透明布局容器使用 `pointer-events-none`，真实 CTA 文案区域恢复 `pointer-events-auto`。

**合规门禁**：
- 当前状态是 review/production candidate 的 mitigation，不是法务最终签批。
- 若生产上线前无法确认标准地图合规，关闭地图叠层，仅保留纯风景主图。


---

## 8. 反 SaaS 兜底（写在 prompt 最后必带）

所有第一轮 13 个其他模块的 Figma Make prompt 末尾必须带这段（5.5 round 2 决议 D 项）：

> Reject any SaaS dashboard, Material Design panel, white app card, KPI tile, badge band, equal-grid layout, Playfair Display, Noto Serif SC, or bilingual text stacks. Regenerate as cinematic editorial travel composition that inherits the hero v4 visual anchor (MiSans VF only, charcoal blue + deep slate + soft ivory + alpine blue accent only).

---

## 9. Layout 整页规则

```yaml
layout:
  containerMaxWidth: "1440px"
  paddingX:
    desktop: "64px"
    mobile:  "24px"
  hero:
    minHeight: "100vh"
    navStrip:  "72px"      # 透明占位，chrome 模块覆盖
    bgPhoto:   "full-bleed"  # 全宽 inset-0
  sections:
    desktopGap: "120px"
    mobileGap:  "64px"
```

---

## 10. Do & Don't（hero v4 已验证版本）

✅ Do
- 真实摄影 60-70% screen (hero) / 全宽 inset (其他 section background)
- MiSans VF 单字族 + weight 轴阶梯
- charcoal blue + deep slate 深色调，soft ivory 文字，alpine blue 极少量 accent
- 编辑型描边 pill / chip，半透填充 + backdrop-blur
- Asymmetric 错位排布 destination tile（rotate -2deg / +1deg）
- drop-shadow 只在 headline / tile caption / chip 上微用
- 单语显示，i18n 切换器换屏

❌ Don't
- 多字族 serif + sans 混搭
- Playfair Display / Noto Serif SC / Source Han Serif（学术新闻杂志风）
- 中英双语同屏
- 椭圆 mix-blend-multiply 遮罩（大屏糊脏）
- uppercase + tracking-[0.1em] 配中文
- award badge wall / star rating / customer counter / KPI tile
- equal-grid layout / SaaS card stack / Material panel / shadcn defaults
- 完整描边 alpine blue CTA 在 hero 内（hero 只放 ghost outline placeholder）
- AI poster gloss / 油画风 / 过饱和摄影

---

## Changelog

- **2026-05-20 (hero v5.1 collage)**: §7.11-§7.12 新增 destination tile collage + map outline env-gate；新增 paperGold #c9a65c accent
- **2026-05-20 (chrome v1)**: §7.7-§7.10 新增 dropdown surface / active marker / scrolled state / spacing tokens（来源 TopNav.tsx Round1 chrome v1 + codex 5.5 反证）
- **2026-05-20**: v0.2 重写 — hero v4 锁锚后从 App.tsx 抽取 token；废弃 v0.1 朱砂红 + Noto Serif SC 方向
- 2026-05-18: v0.1 Day 1 初版骨架，tokens + 品牌方向 sign-off（已 superseded）
