# M-LANG — 多语言切换器（Language Switcher）

> 模块 ID：M-LANG  
> 出现位置：所有页面顶栏右侧；移动端汉堡抽屉与 hero 浮动 mini-pill；不在 footer 替代。  
> 第一轮模块，与 M-NAV 同步装配。

---

## 1. 业务目标

- 服务多个目标市场（海外英语圈、海外华人、日法德西意俄欧亚客户），让访客 1 秒钟切到母语。
- 形成与竞品 chinahighlights.com 的代差：他们多语言只在 footer 与子站，M-LANG 必须显式可见。
- 所有可见 copy（headline、CTA、表单、advisor 卡、聊天预设问题）跟随切换。

## 2. 反竞品要点

不允许：

- 国旗图标。
- 把多语言切换塞进 footer 替代顶栏入口。
- 像 OS 系统下拉那种粗大菜单。
- 切换语种后部分文案不更新。
- 切换语种后布局错位（headline 撑破容器、CTA 文字截断）。

要做：

- globe 图标 + 当前语言代码（如 “EN”）。
- 悬停 / 点击展开极简编辑型下拉。
- 桌面 / 平板 / 手机三态。
- 切换后写入持久化（localStorage + cookie + 已登录用户的偏好）。
- 与品牌字标和顶栏其他元素同色系。

## 3. 信息结构

触发 (Trigger)：

- 视觉：globe 线条图标 + 当前语言两位代码 + 微小 chevron。
- 尺寸：高度 32–36px，宽度自适应；仅图标态宽 32px。
- 状态：默认 ivory；悬停时 underline 轻量淡入。

下拉面板：

- 第一版只上 5 个语种为可选项，其余 3 个显 `coming soon` 灰态（参考 `docs/i18n-launch-plan-v1.md`）：
  - English / English（active）
  - 中文 / Simplified Chinese（active）
  - 日本語 / Japanese（active）
  - Deutsch / German（active）
  - Français / French（active）
  - Español / Spanish（coming soon）
  - Italiano / Italian（coming soon）
  - Русский / Russian（coming soon）
- 当前语言行左侧 1px ivory underline 标识。
- 行高 36px；总宽 220px；圆角 12px；背景 charcoal blue 90%；细颗粒纹理；soft ivory 文字。
- 不要描边粗框；阴影只用一层柔软的下投影。
- coming soon 项：原生写法保留 ivory 35%，英文标签后追加 `· coming soon` 12px ivory 28%；不可点击；hover 不触发 underline；屏幕阅读器读出 `language not yet available`。

可访问性 / 行为：

- 触发使用 aria-haspopup + aria-expanded。
- 键盘 Tab 进入触发，Enter / Space 展开；上下键切换；Esc 收起。
- 屏幕阅读器读出当前语言 + 可选语言列表。

## 4. 状态

- Default：触发与顶栏同透明背景。
- Hover / Focus：触发出现 underline；下拉以 120ms 缓出展开，无弹跳。
- Active item：1px underline + 文字略亮。
- Loading：切换后短时（< 600ms）顶栏显示 1px 进度条；不要全屏遮罩。
- Error fallback：若 i18n 资源加载失败，回退英语并在右上角弹出 toast 提示。

## 5. 移动端

- 顶栏右侧紧凑形态：仅 globe 图标，宽 32px，点击展开全屏底部抽屉。
- 抽屉行为：从底部滑入 60% 高度，列出全部语言，点击选中后抽屉滑出 + 顶栏触发显示新代码。
- 在 hero 之外的页面（详情 / 列表 / 个人中心），仍可用顶栏访问；不必再多浮按钮。

## 6. 与其他模块的关系

- M-NAV：M-LANG 是 M-NAV 右侧子模块，整组顺序 M-DUAL-CTA → M-AUTH-ENTRY → M-LANG，M-LANG 永远是顶栏最右侧的切换器。
- M-AUTH-ENTRY：登录后用户的语言偏好与 M-LANG 双向同步；账户中心也能修改。
- M-CHAT-PANEL：聊天面板初始语言跟随 M-LANG；用户在聊天里可独立切换不影响全站。
- M-FOOTER：可保留次级语言入口列表，但不替代顶栏 M-LANG。

## 7. Figma Make Prompt（粘贴用，英文）

```
Design a discreet language switcher component for a premium China inbound travel website's top navigation. Width auto, height 32. Editorial cinematic mood, charcoal blue translucent background.

Trigger: a thin globe glyph + the current language code "EN" + a small chevron, in soft ivory text. No flag icons. No filled pill. On hover, a 1px ivory underline appears beneath the code.

Dropdown: a folded-paper menu surface, not a SaaS card. 220 wide, charcoal blue 90 percent translucent with subtle film grain, 12px radius, single soft drop shadow, an inner 1px ivory hairline only on the top edge as if the panel is hung from the nav. List rows of 36 height. Each row shows the language in its native script (English, 中文, 日本語, Deutsch, Français, Español, Italiano, Русский) followed by a small ivory-faded English label (English, Simplified Chinese, Japanese, German, French, Spanish, Italian, Russian). Show the first 5 entries as active and the last 3 (Español, Italiano, Русский) as ivory 35% disabled rows with a small "· coming soon" tag. The current language row has a 1px ivory underline on its left edge and slightly brighter text. No flag icons. No system-OS look.

Provide a desktop default state, a desktop dropdown-open state with English active, and a mobile (375 wide) state where the trigger collapses to a single globe icon and the dropdown becomes a bottom sheet that slides up to 60 percent height with the same language list.

Typography: clean modern sans-serif. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent only on active marker. No cinnabar red. No parchment beige. Do not use a heavy border. Use a subtle shadow only.

Hard reject (5.5 negative prompt 兜底): Reject any SaaS dashboard, Material Design panel, white app card, KPI tile, badge band, or equal-grid layout; regenerate as cinematic editorial travel composition.
```

## 8. 接收标准

- 视觉跟 M-NAV 一致，能直接组合在顶栏右侧。
- 不出现国旗、不出现 OS 风格菜单、不放进 footer。
- 桌面 / 移动两态都给出。
- 当前语言有 1px underline 标识；其他无强色块。
- 切换后顶栏触发立即显示新语言代码。
- 5 个 active 语种文字都能渲染（中日字符正确）；3 个 coming soon 项以 ivory 35% 灰态显示并禁用点击。
