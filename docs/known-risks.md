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

- **触发**：M-HERO Round 1 用户决策"坚持画中国轮廓 review 用，上线前再调"（2026-05-20）。B 图（B_destination_discovery_collage.png）右半侧的中国地图轮廓 + 4 个目的地坐标点路线，被采纳为 hero v5 collage 变体灵感。
- **当前状态**：active（review 端可显，prod 端必须门禁关闭）
- **风险细节**：
  - 中华人民共和国《地图管理条例》《公开地图内容表示规范》要求面向中国大陆用户的网站展示中国地图必须包含台湾、南海诸岛（含九段线）、藏南；不得与大陆颜色 / 边界差异。
  - 同时面向海外华人 / 外国客户时，九段线和藏南可能引发反感，存在双向敏感。
  - AI 生成（Figma Make / Gemini）和原型阶段手画几乎必然漏画台湾、南海、藏南。
- **临时缓解**（review 阶段）：
  1. 地图轮廓 SVG 用 build-time 环境变量门禁：`NEXT_PUBLIC_ENABLE_MAP_OUTLINE=true` 才渲染
  2. 仅 Cloudflare Tunnel `https://*.trycloudflare.com/client?review=1` 客户预览端启用该 flag
  3. Production deploy CI/CD 强制 `NEXT_PUBLIC_ENABLE_MAP_OUTLINE=false`
  4. .env.example 显式注释 `# WARNING: must be false in prod, see docs/known-risks.md R-001`
- **上线前必做**（prod 启用前选一）：
  - **A**（推荐）：移除中国地图轮廓 SVG，改用纯连点路线风（4 个金色坐标点 + GPS 数字 + 机场代码 + 金色虚线，无底图）
  - **B**：找标准 GIS 数据源（中华人民共和国自然资源部官方 1:100 万矢量底图）画完整合规轮廓（含台湾、南海诸岛、藏南），且通过法务审核
  - **C**：上线时该模块整体下线，仅保留 destination tiles 不带地图
- **决策人**：用户最终签批（上线前 ≥7 天）
- **创建**：2026-05-20
- **关联**：
  - `docs/modules/M-HERO.md` §5 §7 §8 §9 collage 变体段
  - `docs/DESIGN.md` §7 destination collage 规格
  - `docs/visual-references/B_destination_discovery_collage.png`（mood 图，非可上线素材）
  - `tmp/codex-collab/20260520-tourism-landing-chrome-v1-cross-out.md`（chrome v1 cross review）

---

## 累积位（待 lead 持续追加）

未来识别到的合规 / 安全 / 法律 / 商务风险写在这里。每条按 R-002 / R-003 / ... 编号。
