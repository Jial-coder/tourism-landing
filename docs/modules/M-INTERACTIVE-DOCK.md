# M-INTERACTIVE-DOCK — 主页交互按钮组（Right-Side Interactive Dock）

> 模块 ID：M-INTERACTIVE-DOCK  
> 出现位置：所有页面右侧浮层（首页、详情页、列表页、账户中心）。  
> 第一轮模块。承担除主转化外的轻量入口集合：聊天 / 收藏 / 上次进度 / 反馈。

---

## 1. 业务目标

- 给访客一组持久但克制的“小工具”，方便 cross-page 操作。
- 与 M-CHAT-LAUNCHER 协同：聊天浮按钮已经独立存在，dock 只补充其它入口。
- 与 M-RESUME-CARD / M-FAVORITES-LIST 联动：让“继续上次的草稿”和“收藏行程”都能 1 步到达。

## 2. 反竞品要点

不允许：

- 一栏 6+ 按钮长 dock，像电商客服侧栏。
- 与 M-CHAT-LAUNCHER 重叠或共位。
- 出现“客服 / 投诉 / 售后”这种售后语义。
- 圆形 floating action button + 弹出式扇形菜单（FAB 风）。

要做：

- 垂直 3–4 个极小图标按钮，统一 ivory hairline 风格。
- 与 M-CHAT-LAUNCHER 上下分离，留 16px 间距。
- 默认隐入边缘；hover 才微微显形。
- 用户可在 settings 关闭整组 dock，不强行存在。

## 3. 信息结构

固定按钮（默认 4 个）：

1. `Saved itineraries` / `收藏行程`：心形 hairline；click → /account/favorites；未登录用户跳登录或本地 cookie 收藏。
2. `Resume your trip draft` / `继续上次草稿`：document hairline；click → 打开 M-RESUME-CARD（浮层）；无草稿时按钮隐藏。
3. `Send feedback` / `反馈`：speech-bubble hairline；click → 打开 240 宽极简反馈面板（不是聊天）。
4. `Hide dock` / `隐藏`：minus hairline；click → dock 收起为右侧 2px 高亮边线。

可选按钮（运营开关）：

- `Currency switch` / `币种` (P2)
- `Compare itineraries` / `对比行程` (在 P0-4/P0-5 页激活)

## 4. 视觉

- 容器：竖排 dock，宽 40，高 auto，圆角 999；charcoal blue 70% 半透；1px ivory 8% 描边。
- 按钮：32x32；图标 16px hairline；ivory 75%；hover 出现 1px ivory underline 在图标右侧。
- dock 与右屏边距 24px；与 M-CHAT-LAUNCHER 上方距 16px。
- 无阴影；不闪烁；不展开扇形子菜单。

## 5. 状态

- Idle：dock 仅显 2px 高亮边线，按钮隐藏。
- Hovered（鼠标进 right-edge 24px 区域）：dock 渐显出来，120ms。
- Focused（键盘 Tab）：键盘焦点进入时 dock 渐显，且当前按钮显示 1px ivory ring。
- Resume hidden：无草稿时该按钮位置坍缩，dock 自动变短。
- Reduced motion：dock 始终半显，hover 不动画。

## 6. 行为

- 与 M-CHAT-LAUNCHER 互斥：dock hover 时浮按钮保持原状；浮按钮 hover 时 dock 不动。
- 设置：`Settings → Interactive dock → Off` 整组关闭；`Off` 状态下右屏边线也不显示。
- 隐私：本地匿名收藏走 `localStorage.favorites`；登录后自动迁入账户。

## 7. 移动端

- 移动端 dock 隐藏；其功能合并到 M-NAV 汉堡抽屉的“Quick actions”里。
- 反馈入口仍可在 footer 链接 `Feedback` 找到。

## 8. 与其他模块的关系

- M-CHAT-LAUNCHER：dock 在浮按钮上方，互斥不重叠。
- M-RESUME-CARD：dock 的 “Resume” 按钮唤起 M-RESUME-CARD（第三轮）。
- M-FAVORITES-LIST：dock 的 “Saved” 按钮直达；未登录用户点开会先打开 mini auth gate 或本地匿名收藏 toast。
- M-AUTH-ENTRY：dock 不重复用户菜单入口；保持 dock 是“工具”，nav 是“身份”。
- M-FOOTER：footer 不放 dock 的复制项。

## 9. Figma Make Prompt（粘贴用，英文）

```
Design a discreet right-side interactive dock for a premium China inbound travel website. Position fixed right edge, 24px from edge. Width 40, height auto. Editorial cinematic mood. Charcoal blue 70 percent translucent surface, 999 radius, 1px ivory 8 percent stroke, no shadow, no SaaS FAB style.

Vertical stack of 32x32 button cells, hairline icons in soft ivory 75 percent, 16px glyph each:
1. Heart hairline icon — Saved itineraries.
2. Document hairline icon — Resume your trip draft (hidden when no draft).
3. Speech-bubble hairline icon — Send feedback.
4. Minus hairline icon — Hide dock.

Idle state: the dock collapses to a 2px ivory 30 percent right-edge highlight line; the buttons are not visible until hover or keyboard focus.
Hovered state: the dock fades in over 120ms, buttons visible, no animations beyond opacity. Each button on hover shows a 1px ivory underline to the right of its icon as a subtle hint.
Focused state (keyboard): the focused button shows a 1px ivory 60 percent ring inside its 32x32 cell.
Hidden state: dock and edge line are both gone (when user disables it in settings).

Provide a tooltip variant: 120 wide, 28 high, charcoal blue 92 percent translucent, single soft drop shadow, ivory text — appears on hover/focus to the left of the active button with the bilingual label e.g. "Saved itineraries / 收藏行程".

Provide three states (idle, hovered, focused) and one tooltip variant. Mobile: hide entirely; show no edge line on screens narrower than 768.

Typography: clean modern sans-serif for tooltips. Color palette: charcoal blue, soft ivory. Alpine blue accent only on focus ring. No cinnabar red. No SaaS green. No FAB plus button. No expanding fan menus.
```

## 10. 接收标准

- dock 4 按钮，全部 hairline，单色 ivory；不出现填色块。
- idle / hovered / focused / hidden 四态都给出。
- 与 M-CHAT-LAUNCHER 留 16px 间距，互斥不冲突。
- 桌面状态下 dock 主要靠 right-edge 高亮线提示存在，不打扰阅读。
- 移动端整体隐藏。
- 不命中 §2 任何反竞品禁用项。
