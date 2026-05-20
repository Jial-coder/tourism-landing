# M-CONCIERGE-BAND — 顾问咨询带（hero 下方）

> 模块 ID：M-CONCIERGE-BAND
> 出现位置：首页 hero 正下方第一段，跨整页宽。
> 衍生：M-HERO v2 重构（2026-05-20）把原 hero 内的 concierge form + advisor mini card 推到独立段，让 hero 只服务"想去中国"的情绪。

---

## 1. 业务目标

- 在用户向下滚的第一秒钟，让"低门槛留资 + 真实顾问可见"同时出现，承接 hero 激起的欲望。
- 用编辑型小卡 + 极简表单，避开 SaaS lead-gen 表单卡的冷感。
- 与 M-DUAL-CTA 形成互补：M-DUAL-CTA 是"承诺型"行动入口，M-CONCIERGE-BAND 是"低门槛聊"。

## 2. 反竞品要点

不允许：
- 大白底 SaaS 表单卡 + 必填红色错误状态。
- "立即领取免费方案" 噱头型 CTA。
- 顾问头像 + 五星评分 + 服务过 X 客户 数字徽章。
- LinkedIn 证件照风格头像。
- 表单 5+ 字段堆叠。

要做：
- 横向 band 形态，左 70% 表单 + 右 30% advisor mini，桌面双栏，移动堆叠。
- 4 字段编辑型表单（去哪 / 时间 / 人数 / 联系方式），下边线代替整体描边框。
- advisor mini：96px 头像 + 姓名 + 语言 + 在线 dot + WhatsApp 文字链。
- 整 band 背景 `charcoal-blue/88%` + 颗粒，不抢 hero 风头。

## 3. 信息结构

### 3.1 桌面（≥ lg）

```
┌──── max-w 1440 px-16 py-20 ──────────────────────────────────────────────┐
│                                                                          │
│   左 70%（表单）                                | 右 30%（advisor mini） │
│   "把想法告诉一个真人顾问"                       |  ┌─────────────────┐  │
│   "Tell a real advisor what you have in mind."   |  │  [头像 96px]    │  │
│                                                  |  │                 │  │
│   ┌─目的地──┐ ┌─时间──┐ ┌─人数──┐ ┌─联系方式─┐  |  │  Lin 林颂阳    │  │
│   │ select  │ │ Mar..  │ │ 2 大... │ │ wa/wechat│  |  │  • Online       │  │
│   └─────────┘ └────────┘ └────────┘ └─────────┘  |  │                 │  │
│                                                  |  │  English · 中文  │  │
│   [Send to Lin]   4 小时内回复 · 不主动外发      |  │  专长：自然·家庭 │  │
│                                                  |  └─────────────────┘  │
│                                                  |  → WhatsApp 直聊      │
└──────────────────────────────────────────────────────────────────────────┘
```

### 3.2 移动端

- 单列堆叠：表单在上，advisor mini 在下。
- 字段竖直排列，间距 16px。
- advisor mini 横向（小头像 56 + 文字一列 + WhatsApp 行）。

## 4. 状态

- Empty：placeholder ivory/40%。
- 半填：进度条不显示，提交按钮永远可点（不做 progressive disable）。
- 提交中：按钮变 spinner（细发丝级 12px）。
- 成功：表单整体淡入替换为编辑型 confirmation：`收到 · 4 小时内 Lin 会回你 WhatsApp`。
- 失败：保持表单内容，下方添 ivory/65% 微提示，建议直接 WhatsApp。

## 5. Token 继承

继承 DESIGN.md v0.2 §2-§7：
- 背景：`bg-charcoal-blue/88%` + FilmGrain opacity-[0.05]
- 容器：max-w 1440 + px-16/px-6 + py-20/py-12
- 表单字段下边线：1px ivory/12%；focus 变 alpine-blue/50%
- 提交 CTA：CTAPrimary（alpine-blue/70 stroke pill h-10）
- advisor 头像：rounded-[16px] + ivory/12% 描边
- online dot：6px alpine-blue 圆

## 6. 与其他模块关系

- 上接 M-HERO（视觉锚 v5.1）。
- 不抢 M-DUAL-CTA 主 CTA（hero 内）。
- 顾问名字与 M-ADVISOR-CARD 共用 Lin 角色（保持单一真人）。

## 7. 接收标准

- 表单 4 字段，不超过 4，不掺杂可选。
- advisor mini 含头像 / 名字 / 语言 / 专长 / 在线 dot / WhatsApp 文字链。
- 桌面横向 70/30，移动堆叠。
- 颜色 charcoal-blue + soft-ivory + alpine-blue accent，不引入新色。
- 字体 MiSans VF 单字族。
- 不命中 §2 反竞品。

---

**创建**：2026-05-20 night-build wave 5
**关联**：M-HERO §3, M-CONCIERGE-NOTE（小变体派生）, M-ADVISOR-CARD（独立大卡派生）
