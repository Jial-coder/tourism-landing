# M-DESTINATION-TILES — 首屏目的地小图组（Destination Tiles）

> 模块 ID：M-DESTINATION-TILES  
> 出现位置：M-HERO 内嵌；目的地总览页 `/destinations` 顶部精选区；行程详情页“探索沿线”板块。  
> 第一轮模块。它是 hero 主图之外的“旅行板”，让访客视觉上感到“真有很多地方”。

---

## 1. 业务目标

- 不堆 8 张同等级目的地卡，但仍要传达“可去之处的丰富性”。
- 每张小图作为视觉锚点，链向单目的地详情页，承担 cross-sell。
- 与 M-HERO 主图错位排布；不能像并排矩阵。

## 2. 反竞品要点

不允许：

- 4–8 张等大正方形 grid。
- 圆形头像样 marker。
- 城市名 + 房子图标的 SaaS 卡。
- 滚动到 hero 自动旋转的轮播（auto-carousel）。

要做：

- 2–3 张小图，错位 / 重叠在 hero 主图右侧或下方。
- 每张带极小 caption（目的地 + 一句话气质）。
- 视觉风格一致：同光线（cinematic golden-hour）、同色温、同 grain。
- 链路明确：hover 显尾箭头 →，click 跳目的地详情页。

## 3. 信息结构

默认推荐 3 张（hero 内）：

1. Zhangjiajie — `Mist peaks` / `雾峰`
2. Guilin — `Karst rivers` / `喀斯特河流`
3. Jiuzhaigou — `Alpine lakes` / `高山湖泊`

可选第 4 张（hero 不放，仅 `/destinations` 用）：

- Yunnan — `Old towns & highland trails` / `古镇与高地小径`

每张 tile：

- 矩形（4:3 或 5:4），宽 220–280px，高度同步等比。
- 圆角 16–18px。
- 1px ivory 6% 描边；hover 时描边变 ivory 16%。
- 顶部 / 底部 caption 编辑型小字：英文主 + 中文小字辅；不带 icon。
- hover 出现 → 微箭头与 caption 同行右侧。

排布：

- hero 内：右下区错位排布，第 1 张最大，第 2、3 张稍小并部分重叠主图边缘。
- `/destinations` 顶部：3 张以非对称编辑型集群排布，**不是 side-by-side 三等分**：领头瓦最大、第二瓦下偏 ~24px、第三瓦上偏 ~12px；瓦间允许 12–24px 横向重叠，避免 SaaS 矩阵感。
- 详情页“沿线”板块：横向滑动一排 5–7 张小图。

## 4. 视觉

- 摄影风格：与 `mood-only/destinations/` 系列保持一致；记录性、自然光、不修过度。
- 色温：偏冷 / 中性，统一 charcoal blue 调；hero 主图与 tile 不要色温撞墙。
- 阴影：单层柔光投影，不要硬边。
- caption：12–13px sans-serif；英文 ivory 80%；中文 ivory 60%；间距 8px。

## 5. 状态

- Default：静态显示。
- Hover：tile 微抬 4px + 描边亮度 +10% + 右下出现 12px 箭头 →。
- Pressed：tile 微缩 2px。
- Loading：每张 tile 用 ivory 4% 占位；不出现破图。
- Empty：极少见情况下可暂时只显 2 张，但不允许只 1 张。
- Reduced motion：hover 不抬高；只描边变化。

## 6. 行为

- 点击：跳转到 `/destinations/:slug`。
- 多语言：caption 跟随 M-LANG；目的地名保留拼写。
- A/B：默认 3 张可由运营改成 2 张或 4 张；视觉规则保持 asymmetric。

## 7. 移动端

- hero 内：3 张折成横向滑动 strip，宽度 = 容器；每张 240px 宽 4:3；左右 8px fade。
- `/destinations` 顶部：3 张以单列显示，每张满栏 -32px，仍保留 4px 错位 y 偏移。

## 8. 与其他模块的关系

- M-HERO：M-DESTINATION-TILES 是 hero 内嵌；不能单独出现在 hero 之外的首屏区。
- M-CONCIERGE-NOTE / M-ADVISOR-CARD：tiles 不抢 concierge unit 的视觉权重；可以与之有 4–8px 重叠或错位。
- M-INTERACTIVE-DOCK：dock 在右屏边线，不与 tiles 视觉冲突。
- M-VISA：tiles 不显示签证标识，那是 M-VISA 的事。
- M-FOOTER：footer 不重复列目的地名清单（M-FOOTER 有但用 link 形式，不是 tile）。

## 9. Figma Make Prompt（粘贴用，英文）

```
Design a "destination tiles" component for the hero of a premium China inbound travel website. Editorial cinematic mood. Real-photo realism, golden-hour or cool-blue light, consistent grain. No badges. No icons. No equal-size grid. No circular markers.

Provide three layout variants.

Variant A - Hero embedded:
- Three rectangular tiles, 4:3 ratio, sizes 280, 240, 220 wide. Position them asymmetrically at the lower-right of the hero, partially overlapping the main hero photo edge with 4-8 px y offsets, like a curated travel-board collage. Each tile has a 16-18 radius, a 1px ivory 6 percent stroke, a single soft drop shadow.
- Each tile shows a real-photo cover and a small caption in soft ivory 80 percent (English) plus a 60 percent Chinese support line:
  1. Zhangjiajie — Mist peaks / 雾峰
  2. Guilin — Karst rivers / 喀斯特河流
  3. Jiuzhaigou — Alpine lakes / 高山湖泊
- On hover, the tile lifts 4px, stroke brightens by 10 percent, and a 12px arrow → appears next to the caption.

Variant B - /destinations top featured row:
- Three asymmetric editorial tiles arranged in an off-axis cluster, NOT a side-by-side equal-size row. The leading tile is 360 wide, the second 280 wide and shifted down ~24px, the third 240 wide and shifted up ~12px, each with 4-8 px y micro offsets and 12-24 px x overlaps so the cluster reads as a curated print spread, never as a 3-up grid. Same captions, same hover behavior.

Variant C - Itinerary detail "along the route":
- A horizontal scroll strip of 5-7 tiles at 200 wide, 4:3, with 16 px gap and ivory fade masks at both ends.

Mobile (375 wide) for Variant A and B: convert into a horizontal scroll strip of 3 tiles at 240 wide, each 4:3, with 8px fade masks at both ends. Variant C keeps horizontal scroll, tiles 180 wide.

Color and photography: charcoal blue, mist gray, alpine blue, soft ivory text; photographs should look cinematic and realistic; do not use AI poster gloss. No cinnabar red.

Typography: clean modern sans-serif for captions. Editorial italic only allowed for an optional one-line caption modifier.

Hard reject (5.5 negative prompt 兜底): Reject any SaaS dashboard, Material Design panel, white app card, KPI tile, badge band, or equal-grid layout; regenerate as cinematic editorial travel composition.
```

## 10. 接收标准

- 3 张目的地小图，错位或部分重叠，不并排成矩阵。
- 摄影风格统一，与 `mood-only/destinations/` 系列匹配。
- caption 英文 + 中文两栏；hover 出箭头不变色块。
- 三个变体（hero 内 / 总览顶部 / 详情沿线）都给出。
- 桌面 + 移动两态都给出。
- 不命中 §2 任何反竞品禁用项。
