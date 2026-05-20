# M-VISA — 签证免签智能提示（Visa-Free Smart Hint）

> 模块 ID：M-VISA  
> 出现位置：M-HERO 顶部右侧（headline 上方或贴近）；签证页 `/visa` 顶部；行程详情页 hero 下；账户中心首次访问。  
> 第一轮模块。直接消除“能不能来中国”这道最大顾虑。

---

## 1. 业务目标

- 利用中国免签政策（截至 2026 年底覆盖 US / UK / CA / EU / AU / NZ / JP / KR 等多国）作为竞争壁垒。
- 让访客无需翻 menu 就知道“我能 30 天免签来”，去掉决策摩擦。
- 反竞品 chinahighlights.com 把这条利好埋在 menu 深处的做法，搬到首屏。

## 2. 反竞品要点

不允许：

- 全屏宽 banner / 顶栏置顶 alert（像运营公告）。
- 包含国旗 emoji 列表 / 鲜艳橙红配色。
- 强 CTA “Read More”，会抢主 CTA。
- 静态展示固定文案；信息陈旧时不更新。

要做：

- 一条 editorial 注解风格 chip。
- 自动根据访客地理（IP + Accept-Language）个性化国家：能识别就显示“Your country qualifies”，识别不出就显示通用“多国免签”列表。
- 文案精炼一行；可点开浮层查看全名单 + 时效（直到 2026 年底）。
- 与 M-NAV / M-HERO 调色一致。

## 3. 信息结构

视觉：

- 高度 28–32px；圆角 999px；1px ivory 24% 描边；charcoal blue 50% 半透；soft ivory 文字。
- 左侧极简图标：一个细线护照角 + check 微符号（仅 12px）。不要红色印章、不要国旗。
- 中间文字：

  - 已识别国家：`30-day visa-free for travelers from {Country} — through Dec 2026`
  - 未识别 / 通用：`30-day visa-free for travelers from US / UK / Canada / EU / AU / NZ / JP / KR — through Dec 2026`
  - 中文同位置：`{国家} 30 天免签，2026 年底前有效`
- 右侧极小 chevron 提示可点开。
- chip 不带阴影；与 hero 主图保持 8px 安全间距。

点击展开浮层：

- 浮层尺寸约 420 × auto；24px 内边距；charcoal blue 92% 半透 + 微颗粒；圆角 16px。
- 内容三段：
  1. 30 天免签国家清单（多列编辑型小字，不分国旗，每行 16px）。
  2. 10 天过境免签覆盖国家（次级，更小字）。
  3. 备注：`Policy valid through December 2026. Always confirm with your nearest Chinese embassy.` / `政策有效期至 2026 年 12 月，请以最近的中国使领馆通知为准。`
- 浮层底部左侧：`Updated YYYY-MM` 编辑型小字（ivory 45%，11px），数据来自 `last_updated`；右侧文字链 `Full visa & entry guide →`，跳到 `/visa` 子站。
- 关闭：点击外部 / Esc / 顶部 X。

## 4. 状态

- Default：未展开 chip 默认显示。
- Loading：地理识别中显示通用文案，识别完成后用 200ms 渐变替换为定制文案，不闪烁。
- Hover / Focus：chip 微提亮 4%；chevron 显出来。
- Open：浮层展开；chip 描边亮度 +20%。
- Error：地理识别失败保留通用文案；浮层内可点 “Where am I?” 切回手动选择。
- Dismissed：用户点过 X 后 7 天内不再显示在 hero（仍在 `/visa` 页保留）。
- Reduced motion：不使用渐变切换，改为直接替换。

## 5. 多语言

- 文案模板字段化：`{country}` / `{policy_until}`。
- 必须支持 EN / ZH / JA / DE / FR / ES / IT / RU；德 / 法预留扩展。
- 文案禁止使用敏感政治措辞；统一使用 `China` / `中国`，不使用其他正式国名变体。

## 6. 行为

- 数据来源：后端返回 `{ country_code, eligibility, policy_until, last_updated }`。
- 缓存策略：12 小时 TTL；过期再请求；用户切语言或切国家时强制刷新。
- 隐私（codex round 2 / 5.5 第三方案）：地理识别仅基于 IP CIDR / Accept-Language，不做长期画像。chip 与浮层文案：`Approximate location helps us show visa-free options. We do not use it to build a travel profile. See Privacy.` / `我们只用粗略位置提示免签选项，不用它建立旅行画像，详见隐私政策。` 既不写"不存 IP"绝对句（GDPR/CCPA 下 IP 属个人信息范畴，承诺过满有合规风险），也不藏起来；具体存储与保留策略写在 `/privacy`。
- A/B 文案位（后期）：可换成 `30 days, no visa, no paperwork.` / `30 天免签，零材料。` 这种更口语化版本。

## 7. 与其他模块的关系

- M-HERO：visa chip 与 headline 同区，间距 ≥ 16px；不要遮挡 M-DIAGNOSTIC。
- M-LANG：切语言后 chip 与浮层同步更新；不允许部分语言不变。
- M-DUAL-CTA：visa chip 不抢点击；用户点 chip 进入浮层，浮层底部链 `/visa`，不直接触发表单。
- M-AUTH-ENTRY：未登录情况下 visa chip 同样工作；登录用户的“常用护照国别”可在账户中心修改，覆盖地理识别。
- M-INTERACTIVE-DOCK：dock 中“上次进度卡”的下游 funnel 可参考 visa chip 状态做不同提示。

## 8. Figma Make Prompt（粘贴用，英文）

```
Design a discreet visa-free smart hint chip for the hero of a premium China inbound travel concierge website. Width auto, height 30. Editorial cinematic mood. Charcoal blue translucent background. Soft ivory text. No banner. No flag icons. No bright SaaS alert color.

Chip: 999 radius, 1px ivory 24 percent stroke, charcoal blue 50 percent translucent fill. Left: a 12px hairline passport-corner glyph with a tiny check mark, no stamp red. Middle: 13px clean sans-serif text reading, depending on recognition state, "30-day visa-free for travelers from United States — through Dec 2026" OR "30-day visa-free for travelers from US / UK / Canada / EU / AU / NZ / JP / KR — through Dec 2026". Right: an 8px chevron suggesting expand.

Provide three states. Default closed. Hover with chip slightly brightened and chevron emphasised. Open with a 420 wide expanded floating panel below the chip showing three editorial sections: a multi-column list of 30-day visa-free countries, a smaller secondary list of 10-day transit-free countries, and a footer note "Policy valid through December 2026. Always confirm with your nearest Chinese embassy." At the bottom of the panel, on the left side, a small ivory 45% editorial line "Updated 2026-04" (placeholder for the last_updated date), and on the right a small text link "Full visa & entry guide →". Panel surface: charcoal blue 92 percent translucent with subtle film grain, 16px radius, soft drop shadow.

Provide a desktop default state, a desktop opened panel state, a mobile (375 wide) chip that wraps onto a single short line and a mobile bottom-sheet variant of the panel sliding from the bottom to show the same three sections.

Typography: clean modern sans-serif. Color palette: charcoal blue, mist gray, soft ivory, alpine blue accent only on the chevron and the "Full visa & entry guide" link. No cinnabar red. No flag emoji. No SaaS yellow alert.
```

## 9. 接收标准

- chip 极简、editorial、不抢 headline。
- 无国旗、无大色块、无 banner、无运营公告感。
- 默认 / hover / 展开三态都给出。
- 浮层包含 30 天 / 10 天免签清单 + 政策时效 + Last updated 时间戳 + 引导链。
- 隐私文案改成"Approximate location helps us show visa-free options. We do not use it to build a travel profile. See Privacy." / "我们只用粗略位置提示免签选项，不用它建立旅行画像，详见隐私政策。"，不出现"We don't store your IP" 之类绝对句，也不省略到没有信任承诺。
- 多语言切换后 chip 与浮层同步。
- 与 M-HERO 留 ≥16px 间距，不挤压 M-DIAGNOSTIC。
- 桌面 + 移动两态都给出。
