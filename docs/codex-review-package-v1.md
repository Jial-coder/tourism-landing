# Codex Review 输入包 v1（第一轮 14 模块 + 站点结构 + 决议）

> 创建：2026-05-20  
> 用途：把 tourism-landing 第一轮全部设计文档打包为一份给 codex 的 review 任务清单。  
> 范围：A 步 checklist 已完成、B 步 19 条假设已全推荐路径签署，所有非默认决定（5.1 / 1.3 / 8.2）已同步回模块 brief。  
> codex 通过后才进入 Figma Make 实际生成。

---

## 1. 项目背景（给 codex）

我们在做一个 **海外华人 / 海外游客的中国 inbound 定制旅游获客网站**。  
当前阶段是 **设计原型阶段**，尚未写代码、未做 Figma 高保真稿。  
本轮请求 codex 做一次跨文档评审，专注 4 件事：

1. 第一轮 14 个模块 brief 的内部一致性（命名、调色、字体、行为、状态）。
2. 站点结构与模块清单是否漏关键页或关键模块（特别是登录 / 在线聊天 / 多语言 / 真实摄影流程）。
3. 决议清单（design-default-assumptions）的 19 条选择是否有隐藏风险，特别 5.1（5 active + 3 coming soon）/ 8.2（真实摄影并行采购）。
4. 与竞品 chinahighlights.com 的差异化是否成立，是否有反竞品过头变成自找麻烦的地方。

---

## 2. 文件清单（codex 应顺序读）

按重要性 / 依赖关系排：

### 2.1 基线决策

- `docs/competitor-review-chinahighlights.md` — 竞品 review，含 7 维度超越点与反竞品禁用项。
- `docs/site-structure-v1.md` — 第一版页面清单 + 38 模块清单 + 生成顺序 + Figma Make 约束。
- `docs/design-default-assumptions.md` — 19 条假设决议（用户 2026-05-20 全推荐路径签署）。

### 2.2 视觉与提示词

- `docs/figma-make-prompt-v3-optimized.md` — v3 视觉锚（被 v4 取代但保留为参考）。
- `docs/figma-make-prompt-v4-supersede.md` / `.txt` — v4：cinematic editorial + 竞品超越点 + 多语言切换。
- `docs/visual-references/REAL-IMAGE-SOURCING.md` — 真实图替换流程总规范。
- `docs/real-image-sourcing-plan-v1.md` — 真实摄影并行采购计划（决议 §8.2 落地）。
- `docs/i18n-launch-plan-v1.md` — 多语言上线计划（决议 §5.1 落地）。

### 2.3 第一轮 14 模块 brief

按生成顺序：

1. `docs/modules/M-HERO.md`
2. `docs/modules/M-NAV.md`
3. `docs/modules/M-LANG.md`
4. `docs/modules/M-AUTH-ENTRY.md`
5. `docs/modules/M-DUAL-CTA.md`
6. `docs/modules/M-DIAGNOSTIC.md`
7. `docs/modules/M-VISA.md`
8. `docs/modules/M-CONCIERGE-NOTE.md`
9. `docs/modules/M-ADVISOR-CARD.md`
10. `docs/modules/M-DESTINATION-TILES.md`
11. `docs/modules/M-TRUST-FOOTNOTE.md`
12. `docs/modules/M-CHAT-LAUNCHER.md`
13. `docs/modules/M-INTERACTIVE-DOCK.md`
14. `docs/modules/M-FOOTER.md`

### 2.4 执行清单

- `docs/figma-make-execution-checklist.md` — 14 模块 Figma Make 执行顺序与每模块附图 / 模型 / 验收。

### 2.5 mood 图（可选只看缩略图）

- `docs/visual-references/mood-only/destinations/01_zhangjiajie_mist_peaks.png`
- `docs/visual-references/mood-only/destinations/02_guilin_li_river_dawn.png`
- `docs/visual-references/mood-only/destinations/03_jiuzhaigou_turquoise_lake.png`
- `docs/visual-references/mood-only/destinations/04_yunnan_old_town_life.png`
- `docs/visual-references/mood-only/service/05_local_advisor_planning.png`
- `docs/visual-references/mood-only/service/06_concierge_itinerary_note.png`
- `docs/visual-references/mood-only/background/07_misty_mountain_atmosphere.png`
- `docs/visual-references/mood-only/background/08_film_grain_overlay_texture.png`

---

## 3. 我希望 codex 重点回答的问题

### 一致性

1. 14 个 brief 之间是否在调色 / 字体 / 文案口吻上完全一致？哪几处出现轻微矛盾？
2. concierge unit（M-CONCIERGE-NOTE + M-ADVISOR-CARD）的视觉权重是否高于或冲突于 M-DUAL-CTA？
3. M-CHAT-LAUNCHER 与 M-DUAL-CTA 副 CTA 的双通道分流（站内 vs WhatsApp）是否真的互不冗余？

### 范围与漏项

4. 第一轮 14 模块装配出 P0-1 首页时是否会缺关键组件？
5. 多语言扩展（5 active + 3 coming soon）在 M-LANG / M-FOOTER / M-VISA / M-HERO 的 i18n 字段是否齐？
6. 真实摄影并行采购在签证敏感目的地（西藏 / 新疆方向）是否有合规风险？本轮目的地清单是否合适？

### 反竞品过头

7. 我们对 chinahighlights.com 的反 mega-menu / 反单 CTA 是否走得过远？  
   例如：5 项主导航是否会让首次访问的人找不到 “行程” 入口？
8. visa-free hint 把利好搬到首屏，是否在政策变化时容易过期？应不应该加“最后更新”时间戳？
9. 把奖项 logo 完全踢出 hero，第一版上线时会不会因为没有任何信任背书反而吃亏？

### 决议风险

10. 5.1 决定 EN+ZH+JA+DE+FR 是否选错了语种顺序？是不是 ES 比 IT 更值得 active？
11. 6.1 顾问真人照 + 真名是否在某些海外市场（特别是欧盟 GDPR）需要额外授权流程？
12. 8.2 真实摄影并行采购给出了 T0+14d 节点，是否过于乐观？

### Figma Make 风险

13. 把 hero 作为视觉锚先做（顺序第 1）是否合理？  
    如果 hero 第一稿不通过，后续 13 个模块的 mood 锚将整体重做，会不会该把 M-NAV 或 M-DUAL-CTA 提前？
14. 每个 brief 的 Figma Make prompt 是否仍然有引发模型回到默认 SaaS 卡片审美的语句？

---

## 4. codex 应输出什么

请 codex 给出 4 段：

A. **一致性诊断**：表格列出存在矛盾的字段（模块 vs 字段 vs 当前值 vs 矛盾点）。  
B. **范围漏项 / 风险**：列出第一轮装配 P0-1 时的潜在缺口与建议补的模块或文档。  
C. **决议风险评估**：对 19 条决议中风险最大的 3 条给出强反对或强支持意见，理由 + 替代方案。  
D. **Figma Make 顺序建议**：是否调整 14 模块的生成顺序，给出最终建议序列。

每段最多 400 字；不需要写代码；引用文件路径与具体 brief 章节。

---

## 5. 调用方式（lead 操作步骤）

按 `rules/45-codex-search-router-bridge.md` 与 `rules/16-codex-collab-checklist.md`：

1. 切到 `C:\Users\Administrator\.codex` 目录。
2. 用 `bin/codex-logged.sh` 包装器调 `codex exec`：

   ```bash
   bash bin/codex-logged.sh exec "$(cat <<'EOF'
   请按 D:/projects/tourism-landing/docs/codex-review-package-v1.md
   §3 列出的 14 个问题逐项回答，并按 §4 的 4 段输出格式给结论。
   所有 brief 在 docs/modules/ 下；其他文档清单见 §2。
   EOF
   )"
   ```

3. 结果保存到 `C:\Users\Administrator\.claude\tmp\codex-collab\20260520-tourism-landing-round1-out.md`。
4. 我读完 codex 反馈后，回到主对话向用户汇报：
   - 哪些建议接受 → 同步回 brief；
   - 哪些拒绝 → 写理由进 `tmp/codex-collab/20260520-tourism-landing-round1-merge.md`。

---

## 6. 这份输入包不写到 Figma

`docs/codex-review-package-v1.md` 是 lead × codex 的协作物，不是给 Figma Make 的 prompt。  
codex 通过后，进入 Figma Make 阶段，按 `figma-make-execution-checklist.md` 顺序执行。
