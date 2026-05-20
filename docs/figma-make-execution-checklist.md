# Figma Make 执行 Checklist v1（第一轮 14 模块）

> 用途：作为你在 Figma Make 网页里实际操作的指挥单。  
> 顺序、模型、参考图、依赖关系都已规定好；按表执行即可。  
> 模块详情各自见 `docs/modules/M-*.md`。

---

## 0. 通用规则

每个模块在 Figma Make 里的执行都遵循这 6 条：

1. **模型**：默认 **Gemini 3.1 Pro**；只有列出 “Opus” 的模块才换 Claude Opus 4.7。
2. **不附旧 Figma**：不要把 `Tourism Landing Figma Prototype` 文件作为参考附进 Figma Make context；那版会把模型拉回旧风格。
3. **不选 Astra Demo Kit / 任何 design system kit**：要的是裸生成，不要被组件库绑架。
4. **mood 锚图**：每个模块按下方“参考图”一栏附 1–2 张 `docs/visual-references/mood-only/` 下的图。
5. **prompt 来源**：直接复制对应 `docs/modules/M-*.md` 文件里 “Figma Make Prompt（粘贴用，英文）” 章节的 ```` ``` ```` 包裹内容。
6. **导出**：每生成一稿，命名为 `Round1-<MODULE_ID>-v1`；保留所有候选稿不要覆盖。

---

## 1. 推荐生成顺序

按视觉父子关系排序，保证后面的模块能继承前面的字体 / 色彩 / 调子。

| # | 模块 ID | 任务 | 参考图（mood） | 模型 | 备注 |
|---|---|---|---|---|---|
| 1 | M-HERO | 首屏完整画面（不画 chrome） | destinations/01_zhangjiajie_mist_peaks.png | Gemini 3.1 Pro | 视觉锚先做；prompt 仅留 72px 透明 nav strip 占位，nav/auth/lang/CTA 内容由后续模块绘制 |
| 2 | M-NAV | 顶栏 | 1 步 hero 截图 | Gemini 3.1 Pro | 继承 hero 字体 / 配色；右侧顺序 CTA→AUTH→LANG |
| 3 | M-LANG | 多语言切换器 | 2 步 nav 截图 | Gemini 3.1 Pro | 顶栏右侧子模块；5 active + 3 coming soon 灰态 |
| 4 | M-AUTH-ENTRY | 登录入口 | 2 步 nav 截图 | Gemini 3.1 Pro | 与 M-LANG 并列 |
| 5 | M-DUAL-CTA | 双 CTA | 1 步 hero 截图 | Gemini 3.1 Pro | 三变体（hero / nav / 详情底）一起出；副 CTA 写 `WhatsApp · Local Advisor on Duty` |
| 6 | M-DIAGNOSTIC | 诊断 pills | 1 步 hero 截图 | Gemini 3.1 Pro | 软 pill，不是按钮 |
| 7 | M-VISA | 签证 hint | 1 步 hero 截图 | Gemini 3.1 Pro | 同时出展开浮层 + Last updated 行 |
| 8 | M-CONCIERGE-NOTE | 咨询便签 | service/06_concierge_itinerary_note.png | Gemini 3.1 Pro | 完整 + mini + 4 个状态 |
| 9 | M-ADVISOR-CARD | 顾问名片 | service/05_local_advisor_planning.png | Gemini 3.1 Pro | 完整 + 横向 + mini，含在线/离线态；语言只写 `English · 中文 · 1 more` |
| 10 | M-DESTINATION-TILES | 目的地小图组 | destinations/02_guilin_li_river_dawn.png + 03_jiuzhaigou_turquoise_lake.png | Gemini 3.1 Pro | hero 内 + /destinations 顶部 + 详情沿线 三变体；非对称 editorial 排布 |
| 11 | M-TRUST-FOOTNOTE | 信任脚注 | 1 步 hero 截图 | Gemini 3.1 Pro | 三变体；Variant B 不做 icon band |
| 12 | M-CHAT-LAUNCHER | 聊天浮按钮 | （无参考图，纯 UI） | Gemini 3.1 Pro | 4 状态 + 隐藏态 + 首访气泡；tooltip 写 `Chat with our concierge desk` |
| 13 | M-INTERACTIVE-DOCK | 右侧交互 dock | （无参考图，纯 UI） | Gemini 3.1 Pro | 4 态 + tooltip 变体 |
| 14 | M-FOOTER | 页脚 | background/07_misty_mountain_atmosphere.png | Gemini 3.1 Pro | 桌面 4 列 + 移动 accordion |

---

## 2. 每模块操作清单

每个模块按这 5 步走，不跳：

1. 在 Figma Make 里 **新建 frame**，命名 `Round1-<MODULE_ID>-v1`。
2. 模型选 **Gemini 3.1 Pro**（除非表里写 Opus）。
3. **Add context**：
   - 不选 design system kit。
   - Attach “参考图”一栏列出的 mood 图（最多 2 张）。
   - 第 2 步及之后的模块，把 hero 第 1 步的截图也附上，作为统一视觉锚。
4. **粘 prompt**：从对应 `docs/modules/M-*.md` 复制 prompt 全部内容。
5. **生成 → 检查**：
   - 对照该 brief 的“接收标准”逐项打勾；
   - 若某项不达标，就在 Figma Make 内做 **一次** 局部 prompt 改进；仍不达标则在该 brief 增写 “Round 1 reject reason”，跳过本模块进入下一个，最后做 v2 重生成。

---

## 3. 第一轮验收标准（汇总）

每模块完成后，必须满足：

- 桌面 + 移动两态都给出（部分模块要求 4–5 态）。
- 不命中各 brief §2 的反竞品禁用项。
- 颜色 / 字体与 M-HERO 一致（除非 brief 明确允许变化）。
- 多语言切换后不破布局（至少在 EN / ZH / DE 三语下验证）。
- 文件命名 `Round1-<MODULE_ID>-v<n>`；候选稿全部保留。

第一轮整体可以装配进首页 P0-1 时，再进入第二轮。

---

## 4. 我能做的 vs 你必须做的

我能做：

- 起 prompt、写 brief、改 prompt、对生成结果做 review。
- 解读 Figma Make 输出，告诉你哪个不达标。
- 在 prompt-optimizer / search-router / codex 协作里跑流程。

你必须做（Figma Make 没有 API 给我直接调）：

- 在 Figma Make 网页里实际粘 prompt、附 mood 图、点生成、保存稿。
- 选定 hero v1 之后告诉我“锁定方向”，让我用同一锚去推动后续模块。
- 顾问头像、目的地真实摄影最终替换需要你来上传 / 联系图库。

---

## 5. 工件路径速查

- 模块 brief：`docs/modules/M-*.md`
- 站点结构：`docs/site-structure-v1.md`
- 竞品 review：`docs/competitor-review-chinahighlights.md`
- v4 hero prompt（与 M-HERO 同源）：`docs/figma-make-prompt-v4-supersede.md` / `.txt`
- mood 图：`docs/visual-references/mood-only/`
- 真实图替换流程：`docs/visual-references/REAL-IMAGE-SOURCING.md`
- 默认假设清单（B 步产出）：`docs/design-default-assumptions.md`
- 本 checklist：`docs/figma-make-execution-checklist.md`

---

## 6. 第一轮做完后的下一步

1. 第一轮 14 模块全部通过验收后，在 Figma 里把它们装配进 `P0-1 Home` 一张页面 frame，作为视觉语言锚。
2. 把视觉 token（颜色、字体、间距、阴影、动效曲线）抽取到 `docs/DESIGN.md`，作为整站 source of truth。
3. 启动第二轮（M-DESTINATION-* 与 M-ITINERARY-* 系列）。
