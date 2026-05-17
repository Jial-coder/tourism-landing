# DESIGN.md — Tourism Landing (Inbound China)

> **Source of truth** for visual + interaction design.
> Edited by user (S5 driver) and AI (executor). Mirror tools (Figma / Stitch / draw.io) read from this; never write back.
> Lint with `npx @google/design.md@0.1.1 lint`.

```yaml
schemaVersion: design.md/v0.1.1
project: tourism-landing
brand:
  name: "Inbound China Tourism"
  voice: "warm, premium, china-cultural-modern"
  audience: "international tourists planning China visits, age 30-55"

tokens:
  color:
    cinnabar:        "#C13829"   # primary, 朱砂红, hero CTA
    inkTeal:         "#1F4E5C"   # accent, 墨青, headings
    warmWhite:       "#F8F4EC"   # background, 暖白
    charcoal:        "#1A1A1A"   # body text
    paperGold:       "#C9A65C"   # highlight, 纸金, badges/emphasis
    softMist:        "#E8E0D5"   # surface, 雾色, cards

  typography:
    display: "Noto Serif SC, Source Han Serif, serif"   # 大标题，宋体气质
    body:    "Inter, PingFang SC, system-ui, sans-serif" # 正文
    sizes:
      hero:  "clamp(48px, 7vw, 96px)"
      h1:    "clamp(36px, 5vw, 64px)"
      h2:    "clamp(28px, 3.5vw, 48px)"
      body:  "16px"
      micro: "13px"

  spacing:
    base: "8px"
    section: "120px"   # desktop section padding
    sectionMobile: "64px"

  radius:
    sm: "4px"
    md: "12px"
    lg: "24px"

  motion:
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    duration:
      fast: "150ms"
      base: "300ms"
      slow: "600ms"

layout:
  maxWidth: "1280px"
  gridColumns: 12
  gutter: "24px"
```

## Overview

入境游客的中国旅游产品定位：**不是廉价跟团，是文化深度 + 商务舒适**。
品牌方向：**当代中国美学** —— 朱砂红 / 墨青 / 暖白 / 纸金。避开"中国风老套"（不要龙凤纹 / 红灯笼装饰 / 毛笔字符号化）。

## Colors

| Token | Hex | 用途 | Don't |
|---|---|---|---|
| `cinnabar` | #C13829 | 主 CTA 按钮 / 强调 | 不要大面积铺底 |
| `inkTeal` | #1F4E5C | H1/H2 标题 / 链接 | 不要用于按钮 |
| `warmWhite` | #F8F4EC | 页面背景 | 不用纯白 #FFF |
| `charcoal` | #1A1A1A | 正文 | 不用纯黑 #000 |
| `paperGold` | #C9A65C | 价格 / 徽章 / 装饰线 | 不用于大段文字 |
| `softMist` | #E8E0D5 | 卡片 / 分割面 | 不用于按钮 |

对比度全部 ≥ WCAG AA（warmWhite + charcoal = 12.6:1，cinnabar + warmWhite = 5.2:1）。

## Typography

- **Display 大标题**：Noto Serif SC，weight 600，line-height 1.1，letter-spacing -1%
- **Body 正文**：Inter，中文 PingFang SC fallback，weight 400，line-height 1.6
- **绝对不用**：Times New Roman / 楷体 / 隶书 / 任何"风景区景点说明牌"风格字体

## Layout

- 12 列网格，1280 max-width，24px gutter
- 桌面 section 间距 120px，移动 64px
- Hero 全屏（100vh），其余 section 内容驱动高度
- 卡片 24px radius，1px softMist border

## Shapes & Patterns

- **允许**：圆角矩形、薄分割线（1px paperGold）、留白构图
- **慎用**：渐变（仅用于 hero 背景过渡，方向永远从左上 → 右下）
- **禁用**：投影深度 > 12px / 任何 skeumorphic 元素 / 卡通插画

## Motion

- 按钮 hover：150ms ease-out，背景色变化 + transform translateY(-1px)
- Section 进场：fade + translateY(20px)，300ms，stagger 80ms
- 不允许 parallax 滚动（移动端晕动症）
- react-bits 组件每页 1-3 个，不堆砌

## Do & Don't

✅ Do
- 高质量真实摄影（中国地理 / 文化场景，不要 stock photo 老外脸贴纸）
- 留白 ≥ 内容面积（呼吸感）
- CTA 文案具体（"获取 7 天京沪深度行程方案" 而不是 "立即咨询"）
- 价格透明（区间 + 含/不含明细）

❌ Don't
- 红灯笼 / 龙纹 / 京剧脸谱装饰
- 大段中英对照（用语言切换器）
- 自动播放视频带声音
- 全屏弹窗营销

## Sections

待 v9 落地后填充：
- HERO-01 首屏价值主张
- ITIN-01 行程卡片
- PRICE-01 价格区
- FORM-01 询价表单
- FAQ-01 常见问题
- FOOT-01 页脚

每个 section 详细 spec 在实现时单独章节添加。

## Changelog

- 2026-05-18: Day 1 初版骨架，tokens + 品牌方向 sign-off
