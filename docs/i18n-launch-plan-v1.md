# 多语言上线计划 v1

> 关联决议：`docs/design-default-assumptions.md` §5.1（用户 2026-05-20 选 C：第一版上 5 个）  
> 配套模块：`docs/modules/M-LANG.md`、`docs/modules/M-FOOTER.md`、`docs/modules/M-VISA.md`  
> 目的：把 8 语种切换器拆成两阶段，控制翻译质量与工作量。

---

## 1. 阶段定义

### 阶段 1（MVP 上线）— 5 个语种 active

| 语种 | 代码 | 状态 | 内容来源 |
|---|---|---|---|
| English | EN | active | 原创 + 顾问校对（默认） |
| 中文（简体） | ZH | active | 原创中文文案 + 母语审校 |
| 日本語 | JA | active | 母语翻译 + 顾问校对 |
| Deutsch | DE | active | 母语翻译 + 顾问校对 |
| Français | FR | active | 母语翻译 + 顾问校对 |

入境游覆盖：美 / 英 / 加 / 澳 / 新 / 欧（DE/FR）/ 日 / 海外华人。

### 阶段 2（后续）— 3 个语种 coming soon（顺序 ES → IT → RU）

| 语种 | 代码 | 状态 | 触发条件 |
|---|---|---|---|
| Español | ES | coming soon | 阶段 1 上线 ≥4 周 + 西语市场询单 ≥10 条 |
| Italiano | IT | coming soon | 同上 + 意语市场询单 ≥5 条 |
| Русский | RU | coming soon | 同上 + 俄语市场询单 ≥5 条 |

> 顺序优先级（codex round 1 Q10 确认）：ES 排在 IT 之前，理由是覆盖面 — 北京官方国际门户已上 Spanish 未上 Italian，且中国 2025 把 5 个拉美国家纳入免签试行；阶段 2 启动条件按询单数量触发，但即使 IT 询单先到 5 条，也优先开 ES（除非 IT 询单显著领先 ES ≥3 倍）。

阶段 2 启动前不做翻译；M-LANG 下拉里仅显示 `coming soon` 灰态。

---

## 2. 内容清单（Phase 1 翻译范围）

每个 active 语种至少要覆盖以下文案：

- M-NAV 5 项主导航 + “More”
- M-LANG 8 行下拉文字（active 项 + coming soon 项原生写法）
- M-AUTH-ENTRY 触发 + 下拉所有标签
- M-CHAT-LAUNCHER tooltip + 首访气泡
- M-FOOTER 4 列 + Newsletter + 法务链接 + 多语言展示行
- M-HERO headline + supporting copy + diagnostic pills
- M-DIAGNOSTIC 4 条 pill 文案
- M-VISA chip + 浮层 + 政策注脚
- M-CONCIERGE-NOTE 邀请文案 + 4 字段 placeholder + helper + 提交 pill
- M-ADVISOR-CARD 头衔 / 语言 / 擅长 / WhatsApp pill / 离线 helper
- M-DUAL-CTA 三变体所有标签
- M-TRUST-FOOTNOTE 4 条 + Variant C 标题
- M-INTERACTIVE-DOCK 4 个 tooltip
- M-DESTINATION-TILES 目的地 caption（Zhangjiajie / Guilin / Jiuzhaigou / Yunnan）

每条 i18n key 命名规范：`<module-id>.<element>.<purpose>`，例如 `mNav.cta.primary`。

---

## 3. 翻译质量约束

- **禁止机器直译上线**：所有 active 语种至少经一次母语审校。
- **顾问参与**：每个语种由懂该语的顾问做最后一轮 sanity pass，特别是行程 / 文化用词。
- **品牌口吻**：保留 editorial / 朋友式 concierge 调性，不写营销腔。
- **目的地名一致**：地名以拼音 + 国际通用拼写为主，不强行翻译（Zhangjiajie 不译为德语意语版本）。
- **Lin / [Brand] 占位**：所有语种保留拼写。

---

## 4. 技术约束

- i18n 资源：每语种一个 JSON namespace；fallback 到 EN。
- M-LANG 下拉对 `coming soon` 项做 disabled state，不渲染 hover underline。
- M-VISA 文案模板字段化（`{country}` / `{policy_until}`），各语种各自填充。
- M-FOOTER 多语言展示行同时存在 active 与 coming soon 两行，永远不排成 8 个等权重。
- SEO hreflang 只发 5 个 active 语种，coming soon 不发。

---

## 5. 阶段 2 启动条件

满足以下任一即触发 ES / IT / RU 上线：

- 该语种自然询单累积 ≥ 设定阈值（见 §1）；
- 客户书面要求开放该语种；
- 团队招到对应母语顾问，可提供母语 + 顾问双层 QA。

阶段 2 启动后：

- M-LANG 下拉灰态项替换为 active；
- M-FOOTER 多语言展示行合并为单行 8 项；
- 写一份 `i18n-launch-plan-v2.md` 记录差异。
