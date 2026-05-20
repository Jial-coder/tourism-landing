# M-AUTH-ENTRY — 登录入口（Auth Entry in Top Nav）

> 模块 ID：M-AUTH-ENTRY  
> 出现位置：所有页面顶栏右侧；移动端汉堡抽屉。  
> 第一轮模块（与 M-NAV 同步装配）。本身只承担入口与状态切换；登录/注册的实际表单在 M-AUTH-FORM（第三轮）。

---

## 1. 业务目标

- 给老客 / 高意向用户提供回访入口（询价历史、收藏行程、行程草稿、消息）。
- 不打扰新访客，不在首屏抢视觉。
- 在不强制注册的前提下，让“可登录”这件事的存在感稳定可见。

## 2. 反竞品要点

不允许：

- 大蓝 SaaS 登录按钮 + 注册按钮并列。
- 弹窗式登录拦截首屏阅读。
- 登录后切换成花哨用户中心 dashboard。
- 登录入口和 M-LANG 互相挤位、视觉打架。

要做：

- 未登录态克制：仅一个圆形头像占位 + 文字 “Sign in”。
- 已登录态克制：圆形头像 + 极小下拉箭头，无姓名硬贴在顶栏。
- 与 M-LANG / M-DUAL-CTA 同源调色，不喧宾夺主。

## 3. 信息结构

未登录触发：

- 视觉：1px ivory 圆形描边的占位头像（含 person 极简图标）+ “Sign in” 文字 + 微小 chevron。
- 高度 32–36px；宽度自适应；移动端只显示头像。

未登录下拉（点击展开）：

- 标题：Welcome
- 主操作：`Sign in` 主 CTA（编辑型 pill，与 M-DUAL-CTA 视觉同源）
- 次操作：`Create an account` 文字链
- 辅助说明小字：`Save your draft trip and chat history.`
- 第三方登录入口（可选，二期再开）：Google、Apple；用单色图标 + 文字按钮，不要彩色品牌色块。
- 关闭区：点击外部 / Esc 收起。

已登录触发：

- 视觉：用户头像（真实摄影或字符 monogram）+ 微小 chevron。
- 头像描边 1px ivory；hover 微提亮；不要红点徽标。

已登录下拉：

- 顶部：用户名 + 邮箱 / WhatsApp 简写（脱敏，仅前 3 后 2）。
- 区块 1：My inquiries / 我的询价（最近 3 条 + “See all”）。
- 区块 2：Saved itineraries / 收藏行程（最近 3 条 + “See all”）。
- 区块 3：Trip drafts / 行程草稿（如有）。
- 区块 4：Messages with advisors / 与顾问的消息（最近 1 条预览，链回 M-CHAT-PANEL）。
- 区块 5：Settings / 设置（语言偏好、通知、隐私）。
- 底部：Sign out / 退出登录（次要文字链，不要红色按钮）。
- 整体宽 320px；行高 44px；分隔用 1px ivory 6% opacity 横线。
- 不放价格、积分、奖牌等。

## 4. 状态

- Default 未登录：透明触发，hover 出现 underline。
- Default 已登录：头像 + chevron；hover 微提亮 4%。
- Loading（鉴权中）：触发处 1px ivory 进度环；不阻塞导航。
- Empty：无询价 / 无收藏时显示编辑型小字提示，例如“Your future trips will live here.”
- Error：会话过期时下拉头部出现微弱 toast “Session expired. Please sign in again.”，附上 Sign in 主 CTA。

## 5. 移动端

- 顶栏只显示头像，宽 32px；点击展开全屏底部抽屉。
- 抽屉内容与桌面下拉一致，但行高放宽到 56px；底部有大块安全区。
- 抽屉与 M-LANG 抽屉互斥，不能同时打开。

## 6. 与其他模块的关系

- M-NAV：渲染顺序 M-DUAL-CTA → M-AUTH-ENTRY → M-LANG（M-AUTH-ENTRY 居中，M-LANG 永远是最右侧切换器）。
- M-LANG：登录后保存语言偏好；账户中心可改。
- M-CHAT-PANEL：未读消息数显示在头像右上极小圆点（≤6px），无数字。
- M-AUTH-FORM：点 Sign in / Create an account 跳到 `/auth/login` 或 `/auth/register`，不要弹窗式遮罩。
- M-ACCOUNT-DASHBOARD：See all 类入口跳到 `/account` 对应子页。

## 7. Figma Make Prompt（粘贴用，英文）

```
Design a discreet auth entry component for the top navigation of a premium China inbound travel website. Width auto, height 32-36. Editorial cinematic mood. Charcoal blue translucent context. Soft ivory text. No big SaaS sign-in button. No bright OAuth color blocks. No notification badges with numbers.

Provide three states.

State A - logged out trigger: a 1px ivory outlined circular avatar placeholder with a minimal person glyph, followed by the text "Sign in" and a tiny chevron. On hover an underline fades in under the text.

State B - logged out dropdown opened: a 280-wide folded-paper menu surface (not a SaaS card), charcoal blue 90 percent translucent with subtle film grain, 12px radius, single soft drop shadow, an inner 1px ivory hairline only on the top edge. Inside, a small "Welcome" heading, a primary editorial pill CTA "Sign in", a secondary text link "Create an account", and a faint helper line "Save your draft trip and chat history." Optional row of two single-color icon-text buttons "Continue with Google" and "Continue with Apple".

State C - logged in dropdown opened: a 320-wide folded-paper menu surface with the same surface treatment. At top, the user's first name plus a masked contact (e.g. "lin*** @gmail.com"). Below, four sections separated by 1px ivory 6 percent rules: My inquiries (3 recent rows + "See all"), Saved itineraries (3 rows + "See all"), Trip drafts, Messages with advisors (1 preview row). Bottom: a quiet text link "Sign out".

Provide a desktop default and a mobile (375 wide) compact state where the trigger collapses to just the avatar; the dropdown becomes a bottom sheet sliding up to 70 percent height with the same content.

Typography: clean modern sans-serif. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent only on the primary Sign-in pill. No cinnabar red. No parchment beige. Do not use heavy borders. Do not show points, coupons, or award icons.

Hard reject (5.5 negative prompt 兜底): Reject any SaaS dashboard, Material Design panel, white app card, KPI tile, badge band, or equal-grid layout; regenerate as cinematic editorial travel composition.
```

## 8. 接收标准

- 视觉跟 M-NAV / M-LANG 一致，可直接拼装。
- 桌面 + 移动两态都给出。
- 未登录 / 已登录两态均有，且都不抢首屏视觉。
- 联系方式脱敏；不暴露完整邮箱或手机号。
- 不出现红色徽标 / 数字未读提示 / 大色块 OAuth 按钮。
