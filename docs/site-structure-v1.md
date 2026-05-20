# Tourism Landing — 第一版站点结构与模块清单 v1

> 用途：作为后续 Figma Make 模块化生成、组件库搭建、代码实现的总目录。  
> 原则：把 Figma Make 当“模块级生成器”，不是整站生成器。先定页面清单与模块清单，再每个模块独立 prompt，再人工装配成页。  
> 配套文件：  
> - `docs/figma-make-prompt-v4-supersede.md`（首屏 prompt）  
> - `docs/competitor-review-chinahighlights.md`（竞品 review）  
> - `docs/visual-references/REAL-IMAGE-SOURCING.md`（真实图替换流程）  
> - `docs/DESIGN.md`（视觉 token 总规范）

---

## 1. 第一版上线页面清单（priority 顺序）

每页给出业务目标、核心信息和必含模块。  
P0 = MVP 必上，P1 = 第二批，P2 = 后续迭代。

### P0-1 首页 Home (`/`)
- 业务目标：抓住没想好去哪的海外游客 + 海外华人，最低门槛留下联系方式。
- 必含模块：M-NAV、M-LANG、M-AUTH-ENTRY、M-HERO（v2 极简）、**M-CONCIERGE-BAND（hero 下方独立段，含 M-CONCIERGE-NOTE + M-ADVISOR-CARD）**、M-DIAGNOSTIC、M-VISA、M-DESTINATION-TILES、M-DUAL-CTA、M-TRUST-FOOTNOTE、M-CHAT-LAUNCHER、M-INTERACTIVE-DOCK、M-FOOTER。

> **v2 重构说明**：M-HERO v1 评审反馈视觉过密。v2 hero 只承担"震撼一眼"，concierge form + advisor card 推到 hero 正下方独立一段 M-CONCIERGE-BAND，第二屏起。两段合起来仍占首页前 1.5 屏。详见 `docs/modules/M-HERO.md` v2 + 待写的 `docs/modules/M-CONCIERGE-BAND.md`。

### P0-2 目的地总览 Destinations (`/destinations`)
- 业务目标：让用户按主题 / 地理 / 体验切目的地，再向单目的地详情页分流。
- 必含模块：M-NAV、M-LANG、M-DESTINATION-INDEX、M-FILTER-BAR、M-DESTINATION-CARD、M-CONCIERGE-NOTE-MINI、M-FOOTER。

### P0-3 单目的地详情 Destination Detail (`/destinations/:slug`)
- 业务目标：以编辑性叙事讲清这个目的地为什么值得去 + 推荐行程入口。
- 必含模块：M-NAV、M-LANG、M-DESTINATION-HERO、M-DESTINATION-NARRATIVE、M-RECOMMENDED-ROUTES、M-LOCAL-EXPERIENCE-LIST、M-ADVISOR-CARD、M-DUAL-CTA、M-FOOTER。

### P0-4 行程列表 Itineraries (`/itineraries`)
- 业务目标：按天数 / 主题 / 客群展示精选行程，向单行程详情分流。
- 必含模块：M-NAV、M-LANG、M-ITINERARY-FILTER（天数 / 主题 / 客群 / 季节）、M-ITINERARY-CARD、M-COMPARE-DRAWER、M-CONCIERGE-NOTE-MINI、M-FOOTER。

### P0-5 单行程详情 Itinerary Detail (`/itineraries/:slug`)
- 业务目标：把一条行程讲到“我能想象自己在那里”，并提供定制改动入口。
- 必含模块：M-NAV、M-LANG、M-ITINERARY-HERO、M-DAY-TIMELINE、M-ROUTE-MAP、M-SEGMENT-SWAP（替换某段）、M-INCLUSIONS-LIST、M-PRICE-RANGE-HINT、M-ADVISOR-CARD、M-DUAL-CTA、M-FOOTER。

### P0-6 顾问页 Advisors (`/advisors`)
- 业务目标：把“我们是真人”落实到具体的人，提升信任。
- 必含模块：M-NAV、M-LANG、M-ADVISOR-INDEX、M-ADVISOR-CARD（多）、M-FOOTER。

### P0-7 单顾问 Advisor Detail (`/advisors/:slug`)
- 业务目标：让用户直接选定某位顾问，绑定 WhatsApp / 微信对话。
- 必含模块：M-NAV、M-LANG、M-ADVISOR-PROFILE-HERO、M-ADVISOR-EXPERTISE、M-ADVISOR-RECENT-ITINERARIES、M-ADVISOR-DIRECT-CHAT、M-FOOTER。

### P0-8 咨询表单 Plan My Trip (`/plan`)
- 业务目标：高意向用户提交完整需求；从 hero / pill / advisor / itinerary 多入口汇入。
- 必含模块：M-NAV、M-LANG、M-PLAN-FORM、M-CONFIDENCE-NOTE（隐私 / 无义务咨询）、M-CONFIRMATION-VIEW、M-FOOTER。

### P0-9 关于我们 About (`/about`)
- 业务目标：解释品牌信念 + 团队 + 责任旅行立场。
- 必含模块：M-NAV、M-LANG、M-BRAND-STATEMENT、M-TEAM-GRID、M-RESPONSIBLE-TRAVEL、M-FOOTER。

### P0-10 法务与基础页面
- `/privacy`、`/terms`、`/cookies`、`/contact`、`/404`、`/500`
- 必含模块：M-NAV、M-LANG、M-PROSE-PAGE、M-FOOTER。

### P1（第二批）
- 客户故事列表 `/stories`
- 单故事 `/stories/:slug`
- 月份指南 `/best-time/:month`
- 签证页 `/visa` 与按国别子页
- 主题页（家庭 / 美食 / 徒步 / 自然 / 熊猫）
- Newsletter 注册页
- 登录 / 注册 / 找回密码 `/auth/login`、`/auth/register`、`/auth/forgot`
- 用户中心入口 `/account`（个人资料 / 询价历史 / 收藏行程 / 订阅设置 / 退出登录）
- 在线聊天独立通道 `/chat`（顾问聊天主入口；在主站浮动 widget 之外，仍提供独立页面用于深度对话与历史回顾）

### P2（后续）
- Loyalty Program
- 礼品卡 / 推荐计划
- 行程比较高级版（>3 行程）
- 实时聊天 / 顾问在线状态
- 多币种价格估算
- 用户中心进阶（行程定制草稿、家庭成员档案、护照与签证档案、付款记录）

---

## 2. 模块清单（按重用度排）

### 2.1 全站基础（每页都用）

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-NAV | 顶栏 | 品牌 + 主导航 + 登录入口 | 不要 mega-menu。最多 5 项 + “More”。|
| M-LANG | 多语言切换器 | 顶栏右侧，支持 EN/中/日/德/法/西/意/俄；不用国旗 | 切换后全站文案同步；移动端非 footer 折叠 |
| M-AUTH-ENTRY | 登录入口 | 顶栏右侧，未登录显示头像占位 + “Sign in”，已登录显示用户菜单 | 浮层 dropdown：登录 / 注册 / 我的询价 / 收藏行程 / 退出 |
| M-CHAT-LAUNCHER | 主站浮动聊天入口 | 全站右下角浮按钮，唤起在线聊天面板 | 入口克制、不闪烁；尊重静音 / 隐藏偏好 |
| M-CHAT-PANEL | 在线聊天面板 | 浮层式聊天窗，显示当前可联系顾问、消息、快捷问题 | 也可被 `/chat` 页直接复用为主体 |
| M-FOOTER | 页脚 | 集团信息 / 多语言子站 / 社交 / 法务 / Newsletter 入口 | 不要把多语言塞进这里替代顶栏切换 |

### 2.2 转化与信任（高复用）

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-DUAL-CTA | 双 CTA | 主：免费定制行程；副：WhatsApp 直聊；可选 tertiary 文字链 | 不做大色块按钮对 |
| M-CONCIERGE-NOTE | 完整咨询便签 | 4 字段（去哪 / 时间 / 人数 / 联系方式）+ 提示文案 | 不像 SaaS 表单卡 |
| M-CONCIERGE-NOTE-MINI | 精简版 | 只问“去哪 + 联系方式” | 用于列表页底部、详情页中段 |
| M-ADVISOR-CARD | 顾问名片 | 头像 + 姓名 + 语种 + 擅长目的地 + WhatsApp 按钮 | 头像必须真实摄影，不要 stock 笑脸 |
| M-TRUST-FOOTNOTE | 信任脚注 | 3-4 条编辑型小字（本地顾问 / 多语种 / 全程协助 / 免费咨询无义务） | 不做奖项 logo 墙 |

### 2.3 首屏与导览

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-HERO | 首屏主视觉 | v4 prompt 描述的 cinematic editorial hero | 一张主图 + 2-3 张目的地小图；不要单大照片轮播 |
| M-DIAGNOSTIC | 诊断式入口 pills | 4 条软分流：还没想好 / 只有 10 天 / 带孩子 / 想看自然 | 软 pill；不要按钮风 |
| M-VISA | 签证免签智能提示 | 编辑型注解风一行，告知免签政策 | 不做大 banner |
| M-INTERACTIVE-DOCK | 主页交互按钮组 | 首屏右下方一组小入口：聊天 / 收藏 / 上次浏览 / 反馈 | 与 M-CHAT-LAUNCHER 协同位置；不要堆 icon 墙 |
| M-RESUME-CARD | 上次进度卡 | 已登录或匿名 cookie 用户回访时浮层提示“继续上次的行程草稿” | 可关闭；不要弹窗 |
| M-SAMPLE-PLAN-PEEK | 样板行程速览 | tertiary 入口“看看 10 天样板行程”悬停时浮出的轻预览 | 不取代行程详情页，只做诱导 |

### 2.4 目的地

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-DESTINATION-TILES | 首屏小目的地组 | 2-3 张目的地照片 + 简短 caption | 不平铺 8 张 |
| M-DESTINATION-INDEX | 目的地总览 grid | 按地理大区展示 | 留 mood 一致的真实摄影 |
| M-FILTER-BAR | 筛选栏 | 季节 / 主题 / 客群 / 天数 | 与 M-ITINERARY-FILTER 统一 |
| M-DESTINATION-CARD | 单目的地卡 | 列表页用 | 真实摄影，无 stock |
| M-DESTINATION-HERO | 目的地详情 hero | 单目的地大幅图 + 诗性引言 | editorial 排版 |
| M-DESTINATION-NARRATIVE | 编辑型叙事 | 标题 + 摄影 + 段落 + 引述 | 不要 SEO 长滚动 |
| M-LOCAL-EXPERIENCE-LIST | 本地体验列表 | 3-6 个体验小卡 | 配合 v3.5 service mood 风格 |

### 2.5 行程

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-ITINERARY-FILTER | 行程筛选 | 天数 / 主题 / 客群 / 出发月份 | 跟目的地 filter 风格统一 |
| M-ITINERARY-CARD | 行程卡 | 路线 + 标签 + 长度 + 起价区间 | 起价不藏在表单后 |
| M-COMPARE-DRAWER | 行程对比抽屉 | 选 2-3 条行程并排 | 竞品没有，做差异化 |
| M-ITINERARY-HERO | 行程详情 hero | 行程主题图 + 关键标签 | editorial |
| M-DAY-TIMELINE | 每日时间轴 | 可展开每天细节 | 不要 SEO 长 wall of text |
| M-ROUTE-MAP | 可视化路线图 | 真实地理上的路径 | 不是 dashboard widget |
| M-SEGMENT-SWAP | 段替换 | 把某天 / 某城市替换成备选 | 竞品没有，强差异化 |
| M-INCLUSIONS-LIST | 包含与不含 | 编辑型清单 | 不堆 icon 墙 |
| M-PRICE-RANGE-HINT | 价格区间提示 | 给出 from $ 区间 + 影响因素 | 不要骗点击式精确价 |

### 2.6 顾问

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-ADVISOR-INDEX | 顾问列表 | 多张 M-ADVISOR-CARD 并排 | 真实人 + 真实经历 |
| M-ADVISOR-PROFILE-HERO | 顾问个人页 hero | 自我介绍 + 多张工作中真实照片 | 不要 LinkedIn 风证件照 |
| M-ADVISOR-EXPERTISE | 擅长领域 | 主题 / 地区 / 客群 | 编辑型小区块 |
| M-ADVISOR-RECENT-ITINERARIES | 近期行程 | 该顾问操过的真实行程 | 链回 M-ITINERARY-CARD |
| M-ADVISOR-DIRECT-CHAT | 直聊入口 | WhatsApp / 微信 / Email | 主要通道凸显 WhatsApp |

### 2.7 表单与确认

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-PLAN-FORM | 完整咨询表单 | 多字段，但分步骤 | 不一屏到底 |
| M-CONFIDENCE-NOTE | 隐私与承诺说明 | 数据如何用 / 多久回复 | 表单旁辅助 |
| M-CONFIRMATION-VIEW | 提交后页面 | 谢谢 + 下一步建议 + 顾问联系 | 不只是“提交成功” |
| M-AUTH-FORM | 登录 / 注册 / 找回密码 | Email / WhatsApp 验证码或第三方登录 | 与 concierge 风格统一 |
| M-ACCOUNT-DASHBOARD | 用户中心首页 | 询价历史 / 收藏行程 / 草稿 / 设置 / 退出 | 不做 SaaS dashboard，沿用 editorial 网格 |
| M-FAVORITES-LIST | 收藏行程列表 | 用户中心子页与右上 dropdown 入口 | 与 M-ITINERARY-CARD 复用样式 |

### 2.8 内容与品牌

| 模块 ID | 名称 | 用途 | 备注 |
|---|---|---|---|
| M-BRAND-STATEMENT | 品牌信念 | 一段强陈述 + 配图 | 替代竞品抽象 4-on-1 |
| M-TEAM-GRID | 团队网格 | 多人头像 + 简介 | 接 M-ADVISOR-CARD 视觉 |
| M-RESPONSIBLE-TRAVEL | 责任旅行 | 我们对当地的承诺 | 编辑型，不要营销腔 |
| M-PROSE-PAGE | 法务长文 | privacy / terms / cookies | 排版克制即可 |

---

## 3. 模块依赖与生成顺序（建议）

第一轮（建立视觉语言）：

按 codex round 2（5.5）交叉验证回滚为 **hero-first**：hero 第 1 步只画 hero 内容（不画 chrome），后续 chrome 模块继承 hero 视觉锚（字体阶梯 / 配色 / 摄影风格）。

1. M-HERO（不画 chrome；只留 72px 透明 nav strip 占位）
2. M-NAV（继承 hero 配色）
3. M-LANG
4. M-AUTH-ENTRY
5. M-DUAL-CTA
6. M-DIAGNOSTIC
7. M-VISA
8. M-CONCIERGE-NOTE
9. M-ADVISOR-CARD
10. M-DESTINATION-TILES
11. M-TRUST-FOOTNOTE
12. M-CHAT-LAUNCHER
13. M-INTERACTIVE-DOCK
14. M-FOOTER

完成第一轮即可装配出 P0-1 首页全部内容，作为视觉语言锚。第一轮完成后，M-CHAT-PANEL / M-AUTH-FORM / M-ACCOUNT-DASHBOARD / M-FAVORITES-LIST 等再走第三轮。

第二轮（目的地与行程线）：

12. M-DESTINATION-CARD
13. M-DESTINATION-INDEX
14. M-FILTER-BAR
15. M-DESTINATION-HERO
16. M-DESTINATION-NARRATIVE
17. M-LOCAL-EXPERIENCE-LIST
18. M-ITINERARY-CARD
19. M-ITINERARY-FILTER
20. M-ITINERARY-HERO
21. M-DAY-TIMELINE
22. M-ROUTE-MAP
23. M-SEGMENT-SWAP
24. M-INCLUSIONS-LIST
25. M-PRICE-RANGE-HINT
26. M-COMPARE-DRAWER

第三轮（顾问 / 表单 / 品牌 / 账户）：

27. M-ADVISOR-INDEX
28. M-ADVISOR-PROFILE-HERO
29. M-ADVISOR-EXPERTISE
30. M-ADVISOR-RECENT-ITINERARIES
31. M-ADVISOR-DIRECT-CHAT
32. M-PLAN-FORM
33. M-CONFIDENCE-NOTE
34. M-CONFIRMATION-VIEW
35. M-BRAND-STATEMENT
36. M-TEAM-GRID
37. M-RESPONSIBLE-TRAVEL
38. M-PROSE-PAGE
39. M-CHAT-PANEL
40. M-AUTH-FORM
41. M-ACCOUNT-DASHBOARD
42. M-FAVORITES-LIST
43. M-RESUME-CARD
44. M-SAMPLE-PLAN-PEEK

---

## 4. Figma Make 使用约束

每个模块单独 prompt，不要一次塞多个。

每个模块 prompt 必须包含：

- 模块业务目标
- 该模块在哪几个页面用、必须保持一致
- 视觉与 v4 hero 的关系（继承字体 / 颜色 / 摄影风格）
- 必须避免的反模式（参考 v4 prompt 反例清单）
- 多语言要求（headline 留扩展 / 不用国旗）
- 真实图占位说明（标记为 mood-only，不上线）

每个模块完成后：

- 进 review，对照 v4 prompt + 竞品 review；
- 视觉判断由人做，不让 Figma Make 自评；
- 通过后写入 `docs/DESIGN.md` 的 token / 组件章节；
- AI 图统一标 `mood-only`，最终上线前替换。

---

## 5. 与代码层的关系

`docs/site-structure-v1.md` 是设计与代码共同的目录：

- 设计层：每个模块 = 一个 Figma 组件；
- 代码层：每个模块 = 一个 React 组件；命名建议 `Site<ModuleId>`；
- 路由层：每个 P0 页面 = 一个 Next.js route；
- 多语言层：所有 copy 走 i18n key，初期至少 EN / ZH 两套，但代码与组件按多语言 ready 设计。

---

## 6. 阶段性目标（不写排期，按 milestone）

- M1：第一轮 14 个模块完成 + P0-1 首页装配，作为客户视觉方向 review。
- M2：客户 review 通过 → token 落 `docs/DESIGN.md` → 启动第二轮模块。
- M3：P0-3 / P0-5 / P0-7 三个详情页跑通（目的地详情 / 行程详情 / 顾问详情）。
- M4：表单与确认页 + 内容与品牌页，第一版可以上线。
- M5：真实摄影替换 mood-only AI 图，按 `REAL-IMAGE-SOURCING.md`。
- M6：P1 内容（客户故事 / 月份指南 / 签证 / 主题页）补齐。
