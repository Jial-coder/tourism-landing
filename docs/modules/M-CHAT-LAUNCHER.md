# M-CHAT-LAUNCHER — 在线聊天浮按钮（Floating Chat Launcher）

> 模块 ID：M-CHAT-LAUNCHER  
> 出现位置：所有页面右下浮层（含首页、详情页、列表页、行程页、顾问页、账户中心）。  
> 第一轮模块（与 M-NAV 同步装配）。承担入口与最小信号；聊天主体在 M-CHAT-PANEL（第三轮）。

---

## 1. 业务目标

- 给高意向访客提供 **即时人工通道**，不强制填表单。
- 与 M-DUAL-CTA 副 CTA（WhatsApp 直聊）形成两条互补路径：站内聊天 vs 外部 WhatsApp。
- 让“真实顾问会回”这件事在每一页都被看见。

## 2. 反竞品要点

不允许：

- Intercom / Drift 等通用 SaaS 风格大圆紫色按钮。
- 自动 3 秒后弹出大对话窗，强行打断阅读。
- 闪烁、跳动、红点未读数字。
- 同时显示 WhatsApp 图标 + 微信图标 + 站内聊天三种入口（造成选择焦虑）。

要做：

- 一个克制的圆形入口，与 hero / nav 共调色。
- 内部图标语言：信件 / 对话气泡 / 简笔笔尖三选一；不要客服耳麦。
- 状态从安静 → 提示 → 在线，逐级递进；最多一个 ≤6px 圆点表达“顾问在线”。
- 用户偏好可静音 / 隐藏（写入 localStorage 与账户偏好）。

## 3. 信息结构

按钮：

- 直径 56px，桌面端右下 24px 边距；移动端右下 16px 边距 + 安全区。
- 圆形，背景 charcoal blue + 1px ivory 6% 描边；内置极简对话气泡图标 ivory 色。
- hover 微提亮 4%，鼠标停留 600ms 后冒出 tooltip：`Chat with our concierge desk`，无衬线小字 + 编辑型描边。
- 状态指示器：右上角一个直径 6px 的圆点。
  - 默认：无圆点。
  - 顾问在线：alpine blue（不要 SaaS 绿）。
  - 留言模式（顾问全员离线）：mist gray 半透。

可选首次提示气泡（onboarding 1 次）：

- 一个 220 宽编辑型小气泡，从按钮左侧浮出，2 行小字：
  - `Have a question about your China trip? Lin and 12 advisors are online.`
- 显示 5 秒后自动收起；用户点关闭后永不再显示。
- 不能阻塞主内容；不能多次打扰。

收起态（用户主动隐藏）：

- 转为 32px 极小弧形抓手贴在右侧屏幕边缘；hover 复原成完整按钮。
- localStorage 写 `chatLauncherHidden=true`，跨页一致。

## 4. 状态

- Default：安静圆按钮，无圆点。
- Online：右上 alpine blue 6px 圆点；tooltip 文案 `12 advisors online`（数字来自后端）。
- Offline：圆点 mist gray 半透；tooltip 文案 `Leave a message — we reply in 4 hours`。
- Unread（已登录）：圆点改为 alpine blue 双层呼吸（≤2 次后停），tooltip 显示 `New message from Lin`；无数字徽标。
- Hidden：极小抓手贴边。

## 5. 行为

- 点击：展开 M-CHAT-PANEL（第三轮模块）。展开方式为右下角浮层式，不全屏。
- 长按 / 右键 / hover 二级菜单（桌面）：选项 `Mute notifications` / `Hide chat launcher` / `Open WhatsApp instead`。
- 与 M-DUAL-CTA 副 CTA 协同：副 CTA 走外部 WhatsApp 链接（`wa.me/?...`），M-CHAT-LAUNCHER 走站内聊天，**不要让两条入口指向同一个目的地**。
- 与 M-AUTH-ENTRY 协同：未登录用户首次发消息后温和提示注册或留下 WhatsApp 联系方式，不强制。

## 6. 移动端

- 浮按钮位置：右下 16px + 安全区；不要遮 footer 关键链接。
- 滚动行为：向下滚动 240px 时按钮缩为 48px；向上滚动恢复。
- 长按弹出抽屉式选项；不使用 hover 二级菜单。
- 在 `/chat` 独立页面中隐藏浮按钮，避免与主面板冲突。

## 7. 与其他模块的关系

- M-CHAT-PANEL：浮按钮唤起的浮层主体；预设语言跟随 M-LANG，可独立切换不影响全站。
- M-DUAL-CTA：副 CTA = WhatsApp（外部），M-CHAT-LAUNCHER = 站内聊天，二选一不冗余。
- M-ADVISOR-CARD：顾问名片中的 WhatsApp 按钮指向具体顾问；M-CHAT-LAUNCHER 默认指向值班顾问池。
- M-AUTH-ENTRY：未读消息以头像右上 6px 圆点同步，不再用数字。
- M-FOOTER：不放重复的“Live Chat” 文字按钮替代浮层。

## 8. Figma Make Prompt（粘贴用，英文）

```
Design a discreet floating chat launcher for a premium China inbound travel website. Position fixed bottom right. Diameter 56. Editorial cinematic mood. No SaaS purple bubble. No headset icon. No big numeric unread badge.

Visual: a charcoal blue translucent circle with a 1px ivory 6 percent stroke and a minimal ivory speech-bubble glyph centered. On hover the surface brightens by 4 percent and after 600ms a small tooltip appears to its left reading "Chat with our concierge desk". Tooltip uses a refined editorial outline, soft ivory text on charcoal blue, no shadcn pill. The tooltip wording must NOT duplicate the M-DUAL-CTA secondary WhatsApp label "Talk to a Local Advisor on Duty" — this launcher routes to in-site chat with the concierge desk, not to WhatsApp duty pool.

Status indicator: a single 6px dot at the top right of the launcher. Provide three states - no dot (idle), alpine blue dot (advisors online), mist gray half-opacity dot (offline message mode).

First-visit hint bubble (state shown separately): a 220 wide editorial bubble appearing once to the left of the launcher with the line "Have a question about your China trip? Lin and 12 advisors are online." Same charcoal blue surface, faint film grain, soft drop shadow, dismissible by a hairline close glyph.

Hidden state: when the user has dismissed the launcher, show a 32 wide arc handle pinned to the right screen edge, hinting the launcher can be restored on hover.

Provide desktop default, desktop online, desktop offline, desktop unread, desktop tooltip, desktop first-visit hint, and mobile (375 wide) bottom-right state where the launcher is 48 diameter when scrolled.

Typography: clean modern sans-serif for tooltip and hint. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent on online dot. No cinnabar red. No SaaS greens. Do not use bouncing or pulsing animations more than 2 cycles. Do not show numeric unread counts.
```

## 9. 接收标准

- 视觉跟 M-NAV / M-LANG / M-AUTH-ENTRY 一致。
- 桌面 + 移动两态、4 个状态都给出。
- 圆点 ≤6px，alpine blue / mist gray，不出现 SaaS 绿、不出现数字徽标。
- 不会自动弹出对话窗。
- 与 M-DUAL-CTA 副 CTA 区分清楚：一个走站内、一个走 WhatsApp。
- 提供静音 / 隐藏选项。
