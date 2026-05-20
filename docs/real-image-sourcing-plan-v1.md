# 真实摄影并行采购计划 v1

> 关联决议：`docs/design-default-assumptions.md` §8.2（用户 2026-05-20 选 B：并行采购）  
> 配套规范：`docs/visual-references/REAL-IMAGE-SOURCING.md`（替换流程总规范）  
> 目的：在第一轮 Figma Make 仍用 `mood-only/` AI 图的同时，**并行**启动真实摄影采购，缩短上线前的素材切换窗口。

---

## 1. 并行原则

- AI mood 图照常做客户 review，但不允许进入正式上线产物。
- 真实摄影 / 图库素材立刻启动采购，**不等客户 review 通过**。
- 风险控制：每张候选必须先签授权再投入设计；客户改方向时摄影成本不浪费。
- 真实素材完成后按 `REAL-IMAGE-SOURCING.md` 流程入 `real/`，并写 `attribution.json`。

---

## 2. 目标素材清单（Phase 1）

### 2.1 目的地（每地至少 3 张候选）

| 目的地 | 必拍 / 必采镜头 | 优先级 |
|---|---|---|
| Zhangjiajie | 雾峰横构图（Avatar 同款） / 玻璃栈道侧角 / 局部地质细节 | 高（hero 主图） |
| Guilin | 漓江竹筏晨雾 / 喀斯特山形俯瞰 / 阳朔田园 | 高 |
| Jiuzhaigou | 五花海晨光 / 树正瀑布特写 / 高山秋林反射 | 高 |
| Yunnan | 丽江古城清晨人物 / 高原牧场 / 大理苍山洱海 | 中 |

### 2.2 顾问镜头（按本地顾问 1 人计 3–5 张）

- 工作中半身：在地图前规划行程（参考 `mood-only/service/05_local_advisor_planning.png`）。
- 工作中特写：手部 + 笔 + 行程本（参考 `mood-only/service/06_concierge_itinerary_note.png`）。
- 自然环境：顾问在某目的地的现场环境照（不要 LinkedIn 证件照）。
- 团队合照（可选）：用于 `/about` 页 M-TEAM-GRID。

### 2.3 背景与材质

- 中国山雾大背景（替代 `mood-only/background/07`）。
- 自然光纸笔静物（可选，替代某些 concierge 视觉）。
- 颗粒 / 胶片纹理：可继续用 AI 占位，无须替换。

---

## 3. 来源优先级

按可信度从高到低：

1. **自家拍摄**：让本地顾问 / 合作摄影师专项拍。最强信任。
2. **签约摄影师授权**：付费买商用授权。
3. **地方旅游局 / 景区官方授权**：免费但流程慢。
4. **公开真实图库**：Unsplash / Pexels / Wikimedia Commons CC-BY 商用。
5. **付费图库**：Getty / Adobe Stock。最容易凑齐但易撞车。

---

## 4. 工作分工（lead 与用户）

我（lead）能做：

- 列具体镜头清单与分镜建议（已在 §2 完成）。
- 给每个目的地写 brief（光线、构图、人物比例、拍摄禁区）。
- 把候选图过 attribution check（来源 / 授权 / 商用范围 / 替换是否 1:1 替代 AI mood）。
- 写 `attribution.json` 模板与入库流程。

你必须做：

- 联系 / 签约摄影师 / 委托本地顾问拍摄。
- 与景区 / 旅游局沟通授权。
- 跟当事顾问签**多语种肖像 + 姓名 GDPR release**（M-ADVISOR-CARD 上线前必须有书面授权，对应决议 §6.1；release 必须包含：用途范围 / 撤回机制 / 保留期限 24 个月 / 到期前 90 天提醒续签）。
- 在付费图库账号下买素材。
- 敏感目的地合规闸：若后续扩到 Tibet / Xinjiang / Hong Kong，必须先评估当地拍摄许可、人物肖像政策、外国旅客准入限制；这些目的地不进 Phase 1，扩张前由 lead × codex 二次评估。

---

## 5. 时间锚（不写绝对日期）

- T0 = 决议落定（2026-05-20，本文件创建当天）。
- **T0 + 3d**：完成签约摄影师或合作顾问的拍摄 brief。
- **T0 + 7d**：shortlist 锁定 + 摄影师 / 顾问签约（每目的地 ≥ 3 张候选 brief，但暂不要求成片）。
- **T0 + 14d**：第一批目的地候选成片回流（≥ 6 张／目的地，最低标准 3 张）。
- **T0 + 21d**：所有 Phase 1 目的地（Zhangjiajie / Guilin / Jiuzhaigou / Yunnan）完成授权谈判 + 入 `real/` + 写 `attribution.json`。
- **T0 + 28d**：顾问肖像 + GDPR release（多语种）签署完毕；advisor card 真实头像可上线。
- 客户视觉方向 review 通过后立即按 `REAL-IMAGE-SOURCING.md` 退场 AI mood。

如果到 T0 + 28d 仍有目的地凑不齐，转付费图库兜底，但**不允许 hero 主图与 advisor 头像走付费图库**——这两个位置必须自家拍 / 摄影师授权。

> **路径定位（codex round 2 / 5.5）**：以上 T0+7 / T0+21 / T0+28 为**并行采购检查点**，不阻塞第一轮 Figma Make 与客户 review；真实图只在视觉方向锁定后替换。本节点表是采购追踪用，不是 critical path。

> 历史版本：T0+14d 全量到位（含 advisor + 授权）由 codex round 1 评估为偏乐观，已拆为上述三段；以减少摄影师档期 + 顾问授权流程的并发压力。

---

## 6. 风险与对冲

- **方向变更**：客户 review 后改主推目的地 → 已采素材按目的地归档保留，未来内容页可复用。
- **顾问换人**：新顾问就位后立即重拍；旧顾问素材保留作为档案。
- **图库撞车**：入库前用反向图搜检测竞品是否同图，撞车率高的换。
- **授权失效**：每条 `attribution.json` 加 `expires_at` 字段，到期前 30 天告警。

---

## 7. 与 Figma Make 流程的衔接

- 第一轮 Figma Make 全部使用 `mood-only/`（AI 图），不变。
- 真实图到位后，先在 Figma 设计层替换：把 mood 图层 swap 成 `real/` 同名图。
- 再在代码层把 `<img src>` 切换。
- 客户 review 之前**禁止**把 `real/` 路径上线，确保未签授权的图不外发。

---

## 8. 下一步

- 我接下来会在 codex review 输入包里附带这份计划，让 codex 一并审计风险。
- codex 通过后，由你决定是先发摄影 brief 给摄影师，还是先去谈授权。
- 真实图入库后，我帮你做 attribution 校验与代码层批量替换。
