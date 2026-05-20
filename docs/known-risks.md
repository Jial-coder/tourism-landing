# Tourism Landing — 已知上线前必处理风险清单

> 维护：lead 持续追加，上线前用户最终签批
> 性质：上线门禁清单，每条必须在 production deploy 前归零
> 创建：2026-05-20

---

## 风险登记规范

每条风险登记格式：

```
### R-XXX <短标题>
- **触发**：什么场景下风险存在
- **当前状态**：active / mitigated / resolved
- **临时缓解**：原型/review 阶段如何安全展示
- **上线前必做**：production deploy 前必须完成的动作
- **决策人**：用户 / lead / 等待外部裁定
- **创建**：YYYY-MM-DD
- **关联**：相关 brief / 决策日志路径
```

---

## R-001 中国地图轮廓合规风险

- **触发**：M-HERO 早期版本把 AI 生成的中国地图轮廓、4 个目的地 marker 和金色路径直接栅格化烙进 hero 主图，轮廓未经标准地图数据和法务审核，且无法在生产构建中关闭或修正。
- **当前状态**：mitigated（Path A 已落地：栅格地图从主图移除，地图改为运行时 SVG/DOM 叠层；生产上线前仍需法务/合规最终签批）
- **已落地缓解**：
  1. Hero 主图改为 `public/landmarks/hero-gen/v4-a.webp`：仅保留黄山云海日出摄影质感，不再包含栅格化地图、marker、路线或文字。
  2. 中国轮廓改由 `lib/china-map-data.ts` 提供的矢量 path 渲染，数据源来自 `public/maps/china-outline.json`，避免 AI 手绘轮廓。
  3. 4 个目的地 marker 改为 `components/atoms/ChinaMapOverlay.tsx` 内的 DOM `Link`，桌面端可 hover/focus/click，移动端隐藏地图叠层。
  4. 运行时验收已确认桌面 marker 可点击进入 `/destinations/jiuzhaigou`，移动端无地图叠层且无横向溢出。
- **上线前必做**：
  - 法务/合规确认当前矢量地图是否允许用于目标市场；若不能确认，生产版本关闭 `ChinaMapOverlay`，仅保留纯风景主图。
  - 若要面向中国大陆公开投放，必须改用具备审图号/自然资源部合规来源的完整标准地图，并完成人工复核。
- **决策人**：用户最终签批（上线前 ≥7 天）
- **创建**：2026-05-20
- **更新**：2026-05-20（Path A：清底主图 + 运行时 SVG/DOM 叠层完成）
- **关联**：
  - `components/sections/Hero.tsx`（v9 使用 v4-a 主图并叠加 ChinaMapOverlay）
  - `components/atoms/ChinaMapOverlay.tsx`（运行时 SVG/DOM 地图与 marker）
  - `lib/china-map-data.ts`（中国轮廓 path 与 marker 坐标）
  - `public/landmarks/hero-gen/v4-a.webp`（当前 hero 主图，无地图烙印）
  - `public/landmarks/hero-gen/_gen-log.json`（生图历史 + prompt 审计）
  - `scripts/edit-hero-image.mjs`（image-to-image 重生工具）
  - `.playwright-mcp/hero-v9-desktop-metrics.json` / `.playwright-mcp/hero-v9-mobile-metrics.json` / `.playwright-mcp/hero-v9-marker-hit-test-after.json`（运行时验收证据）

---

## 累积位（待 lead 持续追加）

未来识别到的合规 / 安全 / 法律 / 商务风险写在这里。每条按 R-002 / R-003 / ... 编号。
