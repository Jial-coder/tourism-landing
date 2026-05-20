# 默认设计假设清单 — 第一轮模块

> 用途：把第一轮 14 个模块 brief 里所有由我（lead）默认填写、需要你拍板的关键假设抽出来，便于一次性 review。  
> 工作流：你逐条确认或修改 → 我把改动同步回 brief → 一并打包给 codex review → 再进 Figma Make。  
> 不在本清单的，按当前 brief 默认走。

---

> **决议状态：用户 2026-05-20 全推荐路径签署**  
> 全 19 条假设按“推荐”项采纳。1.1 / 1.2 仍是占位，待真实顾问与品牌名就位后回填；1.3 删除集团关系示例；5.1 第一版上 EN + ZH + JA + DE + FR 五种，余 3 种在 M-LANG 下拉显示 “coming soon”；8.2 真实摄影并行采购，不等客户 review。  
> 所有非默认决定已同步回对应模块 brief 与 i18n / real-image 流程文件。

---

## 0. 怎么用这份清单

每条都给：
- 假设：当前我已写入哪个 brief。
- 影响范围：动这条会牵动哪些模块。
- 选项：可选答案。
- 推荐：我目前的倾向 + 理由。
- 你的决定：保持空白，等你写。

---

## 1. 品牌与命名

### 1.1 顾问默认显示名

- 假设：`Lin · Senior China Travel Advisor`，多处 brief 用到 “Lin”。
- 影响：M-CONCIERGE-NOTE 邀请文案、M-ADVISOR-CARD、M-DUAL-CTA WhatsApp 预填语句、M-AUTH-ENTRY 已读消息预览。
- 选项：
  - A 保持 “Lin”，作为示例顾问，上线前替换为真实顾问；
  - B 直接换成你团队真实存在顾问的名字（请给我 1 个）；
  - C 改成通用 `your local advisor`，不绑名字。
- 推荐：A，等真实顾问就位再换；客户 review 阶段“Lin”足以传达“真有人”感。
- 你的决定：A（推荐）— 占位 “Lin”，上线前替换为真实顾问

### 1.2 品牌中文名 / 域名

- 假设：brief 内只用 `[Brand]` 占位，没有定中文名也没有定域名。
- 影响：M-NAV 字标、M-FOOTER 公司信息、M-AUTH-ENTRY 邮件域名占位、SEO meta。
- 选项：
  - A 我先用 `[Brand]` 占位，等你定再回填；
  - B 现在告诉我中文 / 英文品牌名 + 主域名。
- 推荐：A，避免 Figma Make 出图时把临时名印进 hero。
- 你的决定：A（推荐）— 保持 [Brand] 占位，待品牌名 / 域名就位回填

### 1.3 集团关系展示

- 假设：M-FOOTER 沿用 chinahighlights “Highlights Travel Family” 的归属感写了示例 `© 2026 [Brand] · part of Highlights Travel Family`。
- 影响：M-FOOTER 底部细线区。
- 选项：
  - A 你确实属于 Highlights Travel 集团 → 用真实集团名；
  - B 不属于 → 删掉这一行；
  - C 你有自己的母公司 → 给我母公司名。
- 推荐：B（独立品牌），减少与竞品视觉关联。
- 你的决定：B（推荐）— 独立品牌，删除 “part of Highlights Travel Family” 一行

---

## 2. 视觉与调色

### 2.1 主色调

- 假设：`charcoal blue + alpine blue + soft ivory + mist gray + dark slate`，warmth 仅在 sunlight accent。
- 影响：所有第一轮模块。
- 选项：
  - A 沿用当前调色；
  - B 偏暖（加 deep terracotta / muted gold accent）；
  - C 偏冷亮（加 glacier blue 主导）；
  - D 你给一组关键词。
- 推荐：A，理由：与 cinematic editorial 母题一致，反竞品朱砂红 / 暖纸色。
- 你的决定：A（推荐）— 当前调色不变

### 2.2 字体方向

- 假设：editorial serif 做 headline + 干净 sans-serif 做 body；中文 headline Source Han Serif SC，body Source Han Sans SC。
- 影响：M-HERO、M-NAV、M-FOOTER、几乎所有模块的字体阶梯。
- 选项：
  - A 沿用上面方案；
  - B 改 sans-serif 为主（更现代但少编辑感）；
  - C 指定具体字体（例如 EB Garamond / Inter / Pretendard / Noto Serif SC 等）。
- 推荐：A，给到 codex review 时再补字体授权与 fallback 列表。
- 你的决定：**C — MiSans 全家桶**（2026-05-20 round 2 后修正；之前 A 方案"editorial serif + Source Han"出稿气质偏学术不偏 cinematic，已弃）

### 2.2.1 字体规格（落地版，v2）

> 触发：M-HERO Round1 v1 评审用户反馈"字体不舒服 / 排版怪异"；查源码发现 Figma Make fallback 到学术风 serif。round 2 锁字体规格如下，所有第一轮 14 模块 brief 引用此节。

**Headline / Display**：MiSans VF（Variable）
- 中文：MiSans VF Heavy / Bold（hero headline）/ Semibold（h2）
- 拉丁：MiSans Latin VF Heavy / Bold
- license：OFL 1.1，免费商用
- 来源：https://hyperos.mi.com/font/

**Body / UI**：MiSans VF
- 中文：MiSans VF Regular / Medium
- 拉丁：MiSans Latin VF Regular / Medium
- 数字、字母、标点统一走 MiSans Latin 而不是系统默认

**多语言 fallback**：MiSans Global VF
- 覆盖 20+ 语言（含日 / 韩 / 阿拉伯 / 泰 / 西里尔 / 拉丁扩展）
- 用作 ja / de / fr / ru 等非默认语言的 fallback

**编辑型注解 italic**（可选小用量）：仅 Newsreader Italic 12-14px 用于 tertiary 文字链；不作为主字体

**理由**：
- MiSans 几何克制现代，不像 Source Han 那种文人书法腔
- 拉丁与中文同源系出一手，不会出现"中文 serif + 英文 sans"的字体打架
- Variable Font，hero headline 可走 Heavy 800、body 走 Regular 400，阶梯靠字重而不是字族切换
- 商用免费，不存在 Editorial New 那种付费门槛

**禁用清单**：
- ❌ Source Han Serif SC（之前默认，已撤）
- ❌ Editorial New / GT Sectra / Tiempos（付费，且偏学术 / 时尚）
- ❌ Inter / Söhne 拉丁场景（现代但跟 MiSans 中文不同源）

### 2.2.2 默认语言策略（v2）

> 同样在 round 2 修正。之前 brief 把 headline 中英双语同屏，跟 M-LANG 热切换冲突，已撤。

- **开发预览阶段**（2026-05-20 至客户 review）：默认语言 = **中文**。理由：用户本人快速识别内容
- **上线后**：
  - 第一次访问按 `Accept-Language` 推断
  - 匹配 active 语种（ZH / EN / JA / DE / FR）→ 显示该语种
  - 匹配不到 → fallback **英文**
  - 用户切换后写入 cookie + localStorage + 已登录用户偏好
- **同屏不双语**：所有第一轮 14 模块 brief 的 headline / supporting copy / pills / 文案，**只写一种语言**，其他语言走 i18n 资源包，由 M-LANG 切换器整屏切换
- **写 brief 的 placeholder 约定**：从今往后所有 module brief 的 prompt 文案都用**英文** placeholder（而不是同时给中英两版）；中文资源放在 `i18n/zh.json`，开发预览阶段把整站语言设为 `zh`

### 2.3 摄影风格

- 假设：documentary / 纪实摄影感、自然光、轻颗粒、不修过度；与 `mood-only/` 系列保持一致。
- 影响：M-HERO、M-DESTINATION-TILES、M-ADVISOR-CARD、M-FOOTER 背景。
- 选项：
  - A 维持纪实摄影；
  - B 换成轻度 cinematic painterly（更慢节奏、艺术感强）；
  - C 加一组 archival / 老胶片质感（有故事性，但风险是显旧）。
- 推荐：A。
- 你的决定：A（推荐）— 维持纪实摄影风

---

## 3. 目的地优先级

### 3.1 hero 主图候选

- 假设：默认 Zhangjiajie 雾峰；备选 Guilin 喀斯特、Jiuzhaigou 高山湖。
- 影响：M-HERO、M-DESTINATION-TILES、整站调子。
- 选项：
  - A Zhangjiajie；
  - B Guilin；
  - C Jiuzhaigou；
  - D 三张混编一张主 + 两张副；
  - E 你想换成别的（云南 / 西藏 / 黄山 / 新疆 等）。
- 推荐：A，理由：与“Avatar 同款”有海外认知优势。
- 你的决定：A（推荐）— Zhangjiajie 雾峰为 hero 主图

### 3.2 第一批主推目的地

- 假设：Zhangjiajie / Guilin / Jiuzhaigou / Yunnan 4 个，自然为主。
- 影响：M-DESTINATION-TILES、M-DIAGNOSTIC pill 下游、单目的地详情页路由。
- 选项：
  - A 自然 4 个；
  - B 自然 + 文化（加 Xi'an / 苏州 / 黄山）；
  - C 城市门户（加 Beijing / Shanghai / Chengdu）；
  - D 给我你想推的 4–6 个。
- 推荐：A，避免和竞品城市重叠。
- 你的决定：A（推荐）— 自然 4 个：Zhangjiajie / Guilin / Jiuzhaigou / Yunnan

---

## 4. 转化与漏斗

### 4.1 诊断 pill 文案

- 假设：4 条 = `Not sure where to go / Only 10 days / Traveling with kids / Nature, not cities`。
- 影响：M-DIAGNOSTIC、M-CONCIERGE-NOTE 联动预填、`/itineraries` 筛选。
- 选项：
  - A 保留 4 条；
  - B 替换其中 1–2 条（候选：First time / Returning / Quieter trip / On a budget）；
  - C 加到 5 条，但 hero 只显 4 条做 A/B。
- 推荐：A，理由：覆盖最大流量人群。
- 你的决定：A（推荐）— 4 条 pill 文案保留

### 4.2 主 CTA 文案

- 假设：`Plan My China Trip / 免费定制行程`。
- 影响：M-DUAL-CTA、M-NAV 紧凑变体、所有页面底部 CTA。
- 选项：
  - A 保持当前；
  - B 换成 `Start My Custom Trip / 开启定制行程`；
  - C `Talk to Lin / 找 Lin 聊聊`（更人化，但与副 CTA 重）；
  - D 其他你的版本。
- 推荐：A。
- 你的决定：A（推荐）— 主 CTA `Plan My China Trip / 免费定制行程` 不变

### 4.3 副 CTA 通道

- 假设：副 CTA 走 **WhatsApp**（值班顾问池），M-CHAT-LAUNCHER 走 **站内聊天**，M-ADVISOR-CARD 的 WhatsApp pill 走具体顾问。
- 影响：M-DUAL-CTA、M-CHAT-LAUNCHER、M-ADVISOR-CARD、M-AUTH-ENTRY 已读未读联动。
- 选项：
  - A 沿用当前三通道分流；
  - B 副 CTA 改 WeChat（针对海外华人）；
  - C 副 CTA 同时给 WhatsApp + WeChat 选择 popover；
  - D 副 CTA 直接取消，只留站内聊天。
- 推荐：A，C 排第二；放弃 D（副 CTA 是关键转化）。
- 你的决定：A（推荐）— 三通道分流：副 CTA WhatsApp / 浮按钮站内聊天 / 顾问名片走具体顾问

### 4.4 价格透明度

- 假设：行程详情页有 `M-PRICE-RANGE-HINT`，给 from $ 区间和影响因素，不藏后端。
- 影响：M-ITINERARY-CARD、M-PRICE-RANGE-HINT、`/plan` 表单成功率预期。
- 选项：
  - A 透明区间；
  - B 完全藏在表单后（同竞品）；
  - C 透明 + “Locked rate” 注脚（按当前汇率锁定）。
- 推荐：A，竞品 B 是其失分点。
- 你的决定：A（推荐）— 行程详情透明 from $ 区间

---

## 5. 多语言

### 5.1 第一版上线语种

- 假设：M-LANG 列出 8 种（EN / 中 / 日 / 德 / 法 / 西 / 意 / 俄）。
- 影响：M-LANG 下拉、M-FOOTER 展示行、i18n 资源工作量。
- 选项：
  - A 第一版只上 EN + ZH，其他显示 “coming soon” 或灰；
  - B 第一版上 EN + ZH + JA + DE + FR + ES + IT + RU 全部（每种至少机器翻译 + 顾问校）；
  - C 介于二者：EN + ZH + JA + DE + FR 五种。
- 推荐：C，覆盖前 5 大入境游市场，工作量可控。
- 你的决定：C（推荐）— 第一版 EN + ZH + JA + DE + FR；ES / IT / RU 在 M-LANG 下拉显示 "coming soon"，**阶段 2 启动顺序 ES → IT → RU**（codex round 1 确认 Spanish 覆盖面优先于 Italian），详细分阶段方案见 `docs/i18n-launch-plan-v1.md`。

### 5.2 默认语种识别

- 假设：基于浏览器 Accept-Language；M-VISA 同步个性化国家。
- 影响：M-LANG、M-VISA、SEO hreflang。
- 选项：
  - A 保持当前；
  - B 第一次访问总是英文，登录后才切到偏好；
  - C 提供首屏单次提示横幅 “Switch to Chinese?”。
- 推荐：A。
- 你的决定：A（推荐）— Accept-Language 自动识别 + M-VISA 同步

---

## 6. 信任与安全

### 6.1 顾问头像隐私

- 假设：M-ADVISOR-CARD 用真人照片；半数 brief 用工作中照片（手 / 笔 / 地图特写）作为兜底。
- 影响：M-ADVISOR-CARD、`/advisors`、`REAL-IMAGE-SOURCING.md`。
- 选项：
  - A 真人照 + 真名；
  - B 真名 + 工作中半身照（不露脸）；
  - C 化名（保护隐私）+ 真照。
- 推荐：A，理由：信任效率最高；前提需顾问签授权。
- 你的决定：A（推荐）— 真人照 + 真名。上线前必须满足以下 GDPR 配套（写入 `docs/real-image-sourcing-plan-v1.md` §4）：
  1. 书面肖像 / 姓名授权 release（多语种模板，覆盖 EEA / UK / CA 适用法）
  2. 用途范围明示：网站 / 社媒 / 印刷品 / AI 训练（默认 opt-out）
  3. 撤回机制：顾问随时可撤回授权，撤回后 30 天内全网下线
  4. 保留期限：授权 24 个月，到期前 90 天提醒续签
  5. 区域法务说明仅写入 `/privacy` 页，不在 advisor card UI 上加法律小字

### 6.2 联系方式脱敏

- 假设：M-AUTH-ENTRY 已登录下拉显示 `lin***@gmail.com`，仅前 3 后 2。
- 影响：M-AUTH-ENTRY、M-ACCOUNT-DASHBOARD。
- 选项：
  - A 当前；
  - B 显示完整邮箱；
  - C 默认完全打码 `***@gmail.com`。
- 推荐：A。
- 你的决定：A（推荐）— `lin***@gmail.com` 前 3 后 2 脱敏

### 6.3 IP / cookie 政策

- 假设：M-VISA 写 “We don't store your IP.” / “我们不存储您的 IP。”
- 影响：M-VISA、`/privacy`、Cookie banner（未列入第一轮）。
- 选项：
  - A 不存 IP；
  - B 短期存（30 分钟）以做反爬虫；
  - C 长期存（合规需要）。
- 推荐：A，A/B 方案我可以做技术降级，不影响 UI。
- 你的决定：A（推荐）— 不存 IP（技术层面）。M-VISA UI 文案按 codex round 2（5.5）第三方案改为：`Approximate location helps us show visa-free options. We do not use it to build a travel profile. See Privacy.` / `我们只用粗略位置提示免签选项，不用它建立旅行画像，详见隐私政策。` 既不写绝对句，也不省略信任承诺；具体保留策略写在 `/privacy`。

---

## 7. 交互与微动效

### 7.1 hero 主图入场动效

- 假设：第一次进入 1.02 倍轻微推进 8s 后停，不循环；reduced-motion 关闭。
- 影响：M-HERO。
- 选项：
  - A 当前；
  - B 完全静态；
  - C 视频背景（更重，CDN / 流量风险）。
- 推荐：A，B 排第二。
- 你的决定：A（推荐）— hero 主图首次轻推进 8s 后停，reduced-motion 关闭

### 7.2 M-CHAT-LAUNCHER 自动行为

- 假设：浮按钮**永不自动弹出对话窗**；首访气泡 1 次后再不显示。
- 影响：M-CHAT-LAUNCHER。
- 选项：
  - A 当前；
  - B 在用户停留 30s 后弹出 advisor 在线提示 1 次；
  - C 完全无气泡。
- 推荐：A。
- 你的决定：A（推荐）— 浮按钮永不自动弹窗；首访气泡仅 1 次

### 7.3 dock 默认显示状态

- 假设：M-INTERACTIVE-DOCK 默认隐藏，只显 2px right-edge highlight。
- 影响：M-INTERACTIVE-DOCK、首访发现率。
- 选项：
  - A 当前；
  - B 默认半显（更易发现，但视觉拥挤）；
  - C 默认完全不显，仅在用户滚动 600px 后出现。
- 推荐：A。
- 你的决定：A（推荐）— dock 默认 right-edge 高亮线，hover 才显形

---

## 8. 范围与时间

### 8.1 第一版“上线”定义

- 假设：第一轮 14 模块 + P0-1 首页装配 + 客户 review 通过 = MVP “可发链接预览”（非真实上线）。
- 影响：进度判断、是否启动 codex review、第二轮启动条件。
- 选项：
  - A MVP = 客户预览；
  - B MVP = 真实上线 P0-1 + P0-8 表单页；
  - C MVP = 完整 P0 全部 10 页。
- 推荐：A，路径最清晰；A 通过后再决定 B。
- 你的决定：A（推荐）— MVP = 客户预览（Cloudflare Tunnel）

### 8.2 真实摄影替换时机

- 假设：第一轮全部用 `mood-only/` AI 图；客户 review 通过后启动真实摄影替换。
- 影响：M-HERO / M-DESTINATION-TILES / M-ADVISOR-CARD 真实素材进度。
- 选项：
  - A 当前；
  - B review 之前就开始联系图库 / 摄影师，并行进行；
  - C review 之前不启动，只用 AI 占位上 MVP。
- 推荐：B，并行风险可控且节省 1–2 周。
- 你的决定：B（推荐）— 真实摄影并行采购。**T0+14d 全量到位过激进**，按 codex round 1 反馈拆三段：T0+7 shortlist + 摄影师签约 / T0+21 destinations licensed / T0+28 advisor cleared with GDPR release。详细计划见 `docs/real-image-sourcing-plan-v1.md`。

---

## 9. 用户审完后的动作

1. 你在每条 “你的决定：” 行写答案（直接编辑这个 .md，或者在对话里告诉我）。
2. 我把所有 “非默认” 的决定同步到对应 `docs/modules/M-*.md` 的“接收标准”里。
3. 把 `site-structure-v1` / `competitor-review` / 14 个模块 brief / `figma-make-execution-checklist.md` / 本文件 一起打包给 codex review。
4. codex 反馈后再决定是否进 Figma Make。
