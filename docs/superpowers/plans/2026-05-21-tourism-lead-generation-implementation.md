# Tourism Lead Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `tourism-landing` 从静态展示页面改造为面向海外游客来中国定制旅行的获客网站，提供结构化主表单、并行的多渠道联系入口、可切换语言体验和带有 mock/verified/hidden 状态的 trust proof 模块。

**Architecture:** Next.js 16 App Router + Tailwind v4 单一首页（保留现有 sections 装配），新增 `lib/data/*` typed 数据层、`components/i18n/*` 语言 provider、`app/api/leads` route handler（线索落地到 Supabase Free 托管 Postgres，通过 Drizzle ORM 写入；Service Role Key 仅用于 server route handler，client 不接触），`components/contact/*` 统一渠道入口、`components/trust/*` typed proof 渲染层；通过 `next build` 时 prelaunch guard 在 production 拦截 mock proof，development 仅警告不阻断。**部署目标：Vercel**；`app/api/leads/route.ts` 默认 `runtime = 'nodejs'`，使用 `postgres-js` + Drizzle 直连 Supabase Free `DATABASE_URL`，不引入 Edge Runtime / HTTP driver / Cloudflare 适配层。

**Tech Stack:** Next.js 16.2.6（App Router、Server Components 优先、Route Handlers），React 19，TypeScript，Tailwind v4 + tw-animate（已配置在 `app/globals.css`），shadcn/ui 原子（已存在于 `components/ui/*`，本计划新增按需 form/input/textarea/select/button/dialog/alert/sonner，theme 沿用 radix-nova），现有自有组件 `components/sections/*`、`components/atoms/*`、`components/floating/*`、`components/chrome/TopNav.tsx`。**表单栈 = react-hook-form + zod + shadcn form**（schema 由 `lib/data/lead-form.ts` 单源导出，client / server / Drizzle types 共享）；图标统一 lucide；Toast/Loading 统一 shadcn sonner；不引入 MUI / Chakra / Mantine / Ant Design。**线索存储 = Supabase Free（托管 Postgres + PostgREST + JS SDK + 后台 UI + RLS）**；ORM = **Drizzle**（`drizzle-orm` + `drizzle-kit` + `postgres-js` driver）；同时安装 `@supabase/supabase-js` 用于 admin/anon client（运营后台或后续表单端校验复用）。**反垃圾 = 蜜罐 + Cloudflare Turnstile + 内存滑动窗口限流**（详见决策 i）；**新 lead 通知 = 飞书自定义机器人 webhook**（详见决策 g）。本计划只增 `typecheck`（`tsc --noEmit`），不引入 test runner；不在本期引入 `lint`（仓库未配 eslint，留待 Phase 7 再决定是否补）。包管理器统一 **pnpm**（`pnpm-lock.yaml` 入仓；`package-lock.json` 在 `.gitignore` 中拦截）。Phase 7 验证闭环 = `pnpm run build && pnpm run typecheck`。

---

## File Structure

只列本次会创建或修改的文件，未列出的文件保持现状。

### 创建

- `lib/data/locales.ts` — locale 类型与受支持语言清单（`'en' | 'zh'`），默认 fallback 等。
- `lib/data/dictionaries/en.ts` — 英文文案字典（按 section 分组的 namespace 树）。
- `lib/data/dictionaries/zh.ts` — 中文文案字典，结构与英文严格对齐。
- `lib/data/contact-channels.ts` — 联系渠道单一配置源（type 定义 + 已批准/未批准状态 + 海外排序）。
- `lib/data/lead-form.ts` — 表单单源 schema：导出 `LEAD_FIELDS` 元数据 + `leadFormSchema`（zod）+ `LeadPayload` 类型（zod `infer`）+ `LeadFormState` 状态机；client（react-hook-form `zodResolver`）、server（route handler `leadFormSchema.safeParse`）、Drizzle insert（typed payload → `leads` columns）共用同一份 schema。
- `lib/data/trust-proofs.ts` — A/B/C/D 四类 trust proof 数据及 `status: 'mock' | 'verified' | 'hidden'` 标记。
- `lib/i18n/detect.ts` — Accept-Language 解析与默认 fallback。
- `lib/i18n/storage.ts` — localStorage key 常量与 helpers，仅运行在 client。
- `components/i18n/LocaleProvider.tsx` — Client Component，承载 locale state、切换、持久化、表单不丢失；导出 `useLocale()`、`useDictionary()` hooks。
- `components/i18n/LocaleSwitch.tsx` — 顶部导航语言切换按钮，复用 `LocaleProvider`。
- `components/contact/ContactChannelList.tsx` — 渲染海外排序后的渠道列表，被 hero、ConciergeNote、Footer、ChatLauncher、InteractiveDock 共享。
- `components/contact/ContactRail.tsx` — 移动端/桌面端浮层版本，复用同一数据源。
- `components/sections/LeadForm.tsx` — 主获客表单（替换现有 `ConciergeNote` 中的非结构化表单部分，或在其内部托管）。基于 react-hook-form + `zodResolver(leadFormSchema)` + shadcn form 原子。
- `components/forms/HoneypotField.tsx` — 可复用蜜罐字段（`<input type="text" name="company_website">`，`tabindex={-1}` + `autocomplete="off"` + `aria-hidden="true"` + Tailwind `sr-only`/visually-hidden 类；server 收到非空即视为 bot 静默丢弃）。
- `components/forms/TurnstileWidget.tsx` — Cloudflare Turnstile 客户端封装：基于 `@marsidev/react-turnstile`（或官方 React 组件），通过 `next/script` 异步加载 `https://challenges.cloudflare.com/turnstile/v0/api.js`，把 token 暴露到 react-hook-form 的 hidden field（`turnstileToken`）；token 过期或失败重置时清空字段。
- `components/sections/LeadFormSuccess.tsx` — 提交成功状态，提供备选联系方式与响应时间承诺文案（24 小时；中国大陆法定节假日除外）。
- `components/trust/TrustProofGrid.tsx` — 四类 proof 渲染主容器（A/B/C/D）。
- `components/trust/MockBadge.tsx` — 显式标注 mock/demo/example/sample 的可视徽标。
- `components/trust/AdvisorProfileCard.tsx` — B 类顾问卡（替换现有 `AdvisorCard.tsx` 中硬编码的卡数据为来自数据层的版本）。
- `components/trust/CaseStudyCard.tsx` — C 类真实案例卡。
- `components/trust/CredentialStrip.tsx` — D 类资质/合作/支付/隐私显示条。
- `app/api/leads/route.ts` — Route Handler，接收表单 POST，按以下管线串行处理：(1) 蜜罐字段非空 → 静默 200 false-positive；(2) Cloudflare Turnstile token siteverify（必须 server 端校验，client token 不可信）；(3) ip_hash + sliding window 限流（每分钟同 ip ≤ 5 次，超出 429）；(4) `leadFormSchema.safeParse(payload)` 校验；(5) Drizzle 写入 `leads` 表；(6) 飞书自定义机器人 webhook 通知（失败不阻塞，console.error 后照常返回 200）。强制 `runtime = 'nodejs'`；只读 `SUPABASE_SECRET_KEY` / `TURNSTILE_SECRET_KEY` / `FEISHU_WEBHOOK_URL`（绝不向 client 暴露）。
- `lib/db.ts` — 唯一数据库入口：导出 `db`（Drizzle client，绑定 `postgres-js` + Supabase Postgres 连接串）、`supabaseAdmin`（基于 `SUPABASE_SECRET_KEY` 的 server-only Supabase JS 客户端）、`supabaseAnon`（基于 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 的浏览器侧客户端，仅用于公开读场景；本计划默认不调用）。文件首行 `import 'server-only'` 仅约束 admin/db 导出；`supabaseAnon` 单独从子模块 `lib/db.client.ts` 导出以避免污染 client bundle。
- `lib/db.client.ts` — 浏览器侧 Supabase JS 客户端（仅 anon key + url），不写 `import 'server-only'`，预留给后续 newsletter / 公开读取场景使用。
- `drizzle/schema.ts` — Drizzle schema：`leads` 表 `pgTable` 定义（字段见 Phase 1 Task 1.3 leads schema 段），并导出 `Lead` / `NewLead` 类型。
- `drizzle.config.ts` — `drizzle-kit` 配置：`schema: './drizzle/schema.ts'`、`out: './drizzle/migrations'`、dialect = `postgresql`、`dbCredentials.url = process.env.DATABASE_URL`。
- `drizzle/migrations/0000_init_leads.sql` — `pnpm run db:generate` 产物（leads 表 DDL + RLS 启用语句）；提交到仓库以便 `pnpm run db:migrate` 或 Supabase SQL Editor 手工执行。
- `drizzle/migrations/0001_leads_rls.sql` — 手写迁移：`alter table leads enable row level security;` 加上「默认拒绝、仅 service_role 可读写」的 policy（详见 Task 5.3）。
- `scripts/prelaunch-mock-guard.ts` — 生产构建前 guard（TypeScript，`tsx` 运行）：扫描 `lib/data/trust-proofs.ts` + `components/trust/MockBadge` 出现位置，若 `process.env.NODE_ENV === 'production'` 且发现 `status: 'mock'` 或带 `<MockBadge>` 的可见 proof，则 `process.exit(1)` 并打印冲突项；`NODE_ENV !== 'production'` 时 `console.warn` 列出冲突，但 `exit 0`。
- `.env.local.example` — 本地开发环境变量样板：`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`（publishable / secret in 2026 naming）、`SUPABASE_SECRET_KEY`（publishable / secret in 2026 naming）、`DATABASE_URL`、`NEXT_PUBLIC_DEFAULT_LOCALE`、`SUPABASE_PROJECT_REF`、`FEISHU_WEBHOOK_URL`（飞书自定义机器人 webhook，可选；缺失时只入库不通知）、`NEXT_PUBLIC_TURNSTILE_SITE_KEY`、`TURNSTILE_SECRET_KEY`、`NEXT_PUBLIC_WHATSAPP_PHONE`（E.164 格式，例如 8613800138000；构建 wa.me/&lt;phone&gt; 链接）。文件头部用注释明确暴露边界：`NEXT_PUBLIC_*` 可进 client bundle；`SUPABASE_SECRET_KEY` / `TURNSTILE_SECRET_KEY` / `FEISHU_WEBHOOK_URL` 必须 server-only，禁止从 `'use client'` 文件 import。

### 修改

- `app/page.tsx` — 重排 sections 顺序使 trust proof 前置；接入 `LocaleProvider` 包裹与 `LeadForm`；用 `ContactChannelList` 替代散落的硬编码联系入口。
- `app/layout.tsx` — `<html lang>` 改为 dynamic（依赖 cookie / 检测结果），metadata 接入字典；导入 LocaleProvider 顶层。
- `app/globals.css` — 仅新增必要 utility（如 `.locale-fade`），不重构既有 token。
- `components/chrome/TopNav.tsx` — 把现有内嵌的语言开关迁移到 `LocaleSwitch`，导航文案改为字典读取。
- `components/sections/Hero.tsx` — 文案改为字典；主 CTA 指向 `LeadForm` 锚点；次 CTA 指向真实 trust proof 区。
- `components/sections/DiagnosticSection.tsx` — 文案改为字典，CTA 指向 LeadForm。
- `components/sections/DestinationTilesSection.tsx` — 文案改为字典；卡片文案不再暗示“可即时购买”。
- `components/sections/VisaSection.tsx` — 文案改为字典。
- `components/sections/AdvisorCard.tsx` — 拆分数据来源到 `lib/data/trust-proofs.ts` B 类，渲染层薄化。
- `components/sections/ConciergeBand.tsx` — 文案改为字典；CTA 文案与 LeadForm 锚点一致。
- `components/sections/ConciergeNote.tsx` — 拆出表单到 `LeadForm`，本组件保留环绕文案与提示。
- `components/sections/DualCTA.tsx` — 联系入口替换为 `ContactChannelList`，主 CTA 指向 LeadForm。
- `components/sections/TrustFootnote.tsx` — 不再硬编码 5-star/Tripadvisor 等占位背书；改为读 `lib/data/trust-proofs.ts` 中 verified 项；当无 verified 项时降级为中性文案。
- `components/sections/Footer.tsx` — 渠道与法律资质改为读数据层；语言切换接入 `LocaleSwitch`；占位资质打 mock badge。
- `components/floating/ChatLauncher.tsx` — 共用 `ContactChannelList`，移除内部硬编码渠道。
- `components/floating/InteractiveDock.tsx` — 同上。
- `package.json` — `scripts` 增补 `typecheck`（`tsc --noEmit`）、`prebuild`（`tsx scripts/prelaunch-mock-guard.ts`）、`db:generate`（`drizzle-kit generate`）、`db:migrate`（`drizzle-kit migrate`）；`dependencies` 增补 `drizzle-orm`、`postgres`、`@supabase/supabase-js`、`react-hook-form`、`zod`、`@hookform/resolvers`、`@marsidev/react-turnstile`、`sonner`、`lucide-react`；`devDependencies` 增补 `drizzle-kit`、`tsx`。**不**引入 test runner、不引入 MUI / Chakra / Mantine / Ant Design。shadcn 组件按需 `pnpm dlx shadcn@latest add form input textarea select button dialog alert sonner`，不一次全装。
- `.env.example` — 占位以下 keys（无真实凭据）：`NEXT_PUBLIC_DEFAULT_LOCALE=en`、`NEXT_PUBLIC_SUPABASE_URL=`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=`、`SUPABASE_SECRET_KEY=`、`DATABASE_URL=`、`SUPABASE_PROJECT_REF=`、`FEISHU_WEBHOOK_URL=`、`NEXT_PUBLIC_TURNSTILE_SITE_KEY=`、`TURNSTILE_SECRET_KEY=`、`NEXT_PUBLIC_WHATSAPP_PHONE=`。文件末尾追加注释行 `# VERCEL_URL` —— 仅文档说明：部署到 Vercel 时由平台自动注入运行时环境，开发者**不需要也不应当**手工填值；本仓库不在代码中依赖 `VERCEL_URL`，留作未来 canonical URL / OG 图地址等场景的占位指引。
- `.gitignore` — 显式追加 `.env.local`、`.env.*.local`（防 service role 泄漏）。
- `next.config.ts` 或 `next.config.mjs`（取实际存在文件） — 仅当需要 i18n redirect 或环境变量透传时改动；默认不动。

### 决策记录（已由 team lead 在 Phase 0 决策落地）

a. **线索存储 = Supabase Free + Drizzle ORM**
   - Supabase Free 项目：托管 Postgres + PostgREST + JS SDK + 后台 Table UI + RLS 默认开启。
   - 写入路径：`app/api/leads/route.ts`（server-only）→ `lib/db.ts` 的 `db` Drizzle client → `leads` 表。
   - **绝不**把 `SUPABASE_SECRET_KEY` 暴露到 client；`NEXT_PUBLIC_*` 前缀仅用于 url 与 anon key。
   - `leads` 表必须启用 RLS，policy 默认拒绝所有 role；仅 `service_role` 可 `select` / `insert`。anon role 没有任何 grant。
   - **免费档限制提醒**：项目 1 周无活动会被 Supabase 暂停；本计划不内置 cron/keepalive，改在 Phase 7 Task 7.5 加「上线后 1 周访问回温」备忘（手工触发或后续接 Vercel Cron / GitHub Actions）。

b. **package.json scripts**
   - 增加 `typecheck` = `tsc --noEmit`、`prebuild` = mock guard；不在本期引入 `lint`（仓库未配 eslint，留待 Phase 7 再决定是否补）。
   - **不**新增 `test` 脚本；本仓库无 test runner，本计划不引入 vitest/jest。
   - Phase 7 验证闭环统一为：`pnpm run build && pnpm run typecheck`（本期不引入 `lint`）。

c. **响应时间承诺文案 = `leadResponsePromise` 单一 key**
   - 字典 key 名：`leadResponsePromise`（不再用 `leadFormSuccess.responsePromise` 嵌套，单 key 让 sections / email autoresponse 共享同一份）。
   - 中文：`"我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）"`
   - 英文：`"A China travel advisor usually replies within 24 hours (Chinese holidays excluded)."`
   - 引用方位置：`LeadFormSuccess`、`ConciergeNote`、未来 email autoresponse 模板（不在本 plan 内做，但字典 key 在本计划锁定，禁止其它任何文案承诺响应时间）。

d. **Mock proof guard 行为**
   - 实现位置：`scripts/prelaunch-mock-guard.ts`，由 `prebuild` 脚本触发。
   - 判定逻辑：扫描 `lib/data/trust-proofs.ts` 中 `status: 'mock'` 或 `productionVisible: true` 但仍带 mock 标记 / `<MockBadge>` 的条目。
   - `NODE_ENV === 'production'`：发现冲突 → `console.error` 列冲突项 + `process.exit(1)`，build 直接失败。
   - `NODE_ENV !== 'production'`（dev / preview / staging）：发现冲突 → `console.warn` 列冲突项，**继续 exit 0**，不阻断本地开发与预览构建。

e. **部署目标 = Vercel**
   - 选择理由：最少改动、跟 `drizzle-orm` + `postgres-js` 直连 Supabase Free 完全兼容（Vercel 默认 Node.js 运行时支持 TCP 连接）、对海外访客延迟够用、与 Next.js 16 同源生态。
   - 实现约束：`app/api/leads/route.ts` 必须 `export const runtime = 'nodejs'`；不引入 `wrangler.jsonc`、`@opennextjs/cloudflare`、`@cloudflare/next-on-pages` 任何 Cloudflare 适配；不在 `lib/db.ts` 切换到 HTTP driver（`@neondatabase/serverless` / `@vercel/postgres-kysely` 等）。
   - 环境变量：Supabase 三件套 + `DATABASE_URL` 由 Vercel Project Settings → Environment Variables 配置；`VERCEL_URL` 由平台自动注入，不在代码中依赖。
   - 未来迁移备忘：若改投 VPS / Cloudflare Workers，只需替换 `lib/db.ts` 内 driver 与 route runtime（例如 Cloudflare 改 HTTP driver + Edge Runtime），其余业务代码、字典、表单 schema、trust proof 数据层完全不动。

f. **Trust proof 全部 mock 占位（本阶段）**
   - 决策：A/B/C/D 四类 trust proof 在本阶段**全部使用明确标注的 mock/demo/example/sample 占位资料**；后续由 user 在上线前逐项替换为真实数据。
   - 命名硬约束：`lib/data/trust-proofs.ts` 中所有占位条目的 `id` 必须以 `mock-` / `demo-` / `example-` / `sample-` 前缀开头（按四类分别用对应词：A=mock, B=demo, C=example, D=sample）；`status: 'mock'`；`productionVisible: false`。
   - 视觉硬约束：渲染时所有 status=mock 的卡片必须叠加 `<MockBadge />`，肉眼一望可知是占位材料。
   - 内容硬约束：禁止写真实姓名 / 真实评分数字 / 真实合作 logo / 真实媒体名 / 真实证书号；占位文案应明显非真实（例如 "Demo Advisor Yiwen Lu"、"Example 8-day Sichuan loop"、"Sample Tourism License Placeholder"）。
   - 上线流程：prelaunch guard（决策 d）在生产 build 时拦截任何 status=mock 且 productionVisible=true 的条目；`docs/lead-generation-overview.md`（Task 7.1）必须列 mock proof 替换清单，方便 user 后续逐项替换。

g. **新 lead 通知 = 飞书自定义机器人 webhook**
   - 实现位置：`app/api/leads/route.ts`，写库成功后 `POST` JSON 到 `process.env.FEISHU_WEBHOOK_URL`。
   - 通知字段：`created_at` / `locale` / `source_path` / `name` / `email` / `country` / `travel_dates` / `duration` / `party_size` / `preferred_contact` / `message` 摘要前 200 字 / `row id` / Supabase Table Editor 直链（`https://supabase.com/dashboard/project/<SUPABASE_PROJECT_REF>/editor` + 表名）。
   - 失败行为：try/catch 捕获，`console.error` 后**继续返回 200 给用户**，不让 webhook 故障影响主提交链路；不重试，不写本地降级队列。
   - 环境变量：`FEISHU_WEBHOOK_URL`（server-only，**绝不**加 `NEXT_PUBLIC_` 前缀）；缺失或为空时跳过通知，仅入库 + console.log。
   - 不接 WhatsApp Cloud API；不接邮件 SMTP；不接 Slack。

h. **WhatsApp 仅作访客联系入口**
   - 不接 WhatsApp Cloud API、不引入 Meta 模板审批流程、不做主动外发模板消息。
   - `lib/data/contact-channels.ts` 中 WhatsApp 渠道使用 `wa.me/<E.164>` 链接形式，`href = "https://wa.me/" + process.env.NEXT_PUBLIC_WHATSAPP_PHONE`；env 缺失时该渠道 `visibility: 'hidden'` 不渲染。
   - 默认占位 demo 号段（不要写真实可达号码，避免 mock 阶段误触达运营）。
   - 未来扩展位备忘：Cloud API 用法（自动回复客户、模板消息）属第二阶段；启用前需 Meta 模板审批 1-3 天 + Permanent Access Token + Phone Number ID + 单独 Phase；本计划不实现，Self-Review 备忘里钉一条。

i. **防垃圾三件套（蜜罐 + Cloudflare Turnstile + 速率限制）**
   - 蜜罐：`components/forms/HoneypotField.tsx` 在 LeadForm 内挂载一个隐藏字段（命名建议 `company_website`，`type="text"` + `tabindex={-1}` + `autocomplete="off"` + `aria-hidden="true"` + Tailwind `sr-only` 类）；server 收到非空即视为 bot，**返回 200 false-positive 静默丢弃**（不写库、不通知、不报错），让 bot 误以为成功。
   - Cloudflare Turnstile：客户端 `next/script` 异步加载 Turnstile JS API + `<TurnstileWidget />` 渲染挑战；token 通过 react-hook-form hidden field 提交。Server 在 `/api/leads` `fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: { secret: TURNSTILE_SECRET_KEY, response: token, remoteip } })` 校验；`success !== true` → 拒绝写库 + 返回 400。
   - 速率限制：基于 `ip_hash` + sliding window in-memory（每分钟同 ip 最多 5 次 POST，超出 429）。**这是单实例近似限流**，Vercel 部署时每个 Function instance 各自计数；未来上量再换 Upstash Redis（备忘只记，不在本计划实现）。
   - 串行管线（任一关失败直接拒绝写库 + server 端日志记录原因）：蜜罐命中 → 静默 200 + `console.warn('[lead-spam] honeypot hit', { ip_hash })`；Turnstile 失败 → 400 + `console.warn('[lead-spam] turnstile fail', { reason })`；限流 → 429 + `console.warn('[lead-spam] rate limit', { ip_hash })`。
   - 环境变量：`NEXT_PUBLIC_TURNSTILE_SITE_KEY`（client）+ `TURNSTILE_SECRET_KEY`（server-only）。
   - 客户端依赖：`@marsidev/react-turnstile` 或 Cloudflare 官方推荐 React 组件（在 Phase 5 装依赖时锁定一项，不并存）。

j. **前端栈与界面工作模式**
   - 前端栈 6 条硬约束：
     1. 表单 = react-hook-form + zod + shadcn form；不允许裸 `useState` 表单或 react-hook-form 不带 zod。
     2. 校验 schema 共享：`lib/data/lead-form.ts` 导出 `leadFormSchema`（zod），client（`zodResolver`）/ server（`safeParse`）/ Drizzle insert（typed payload）三方同源，禁止任何一方私写 schema。
     3. shadcn 组件按需装：`form / input / textarea / select / button / dialog / alert / sonner`，不一次全装；新增其它组件前在 plan 上加任务说明。
     4. 不引入 MUI / Chakra / Mantine / Ant Design / DaisyUI；UI 原子统一从 shadcn/ui 来。
     5. Toast / Loading 用 shadcn `sonner`（基于 Sonner 库）；不用 react-hot-toast / radix-toast。
     6. 图标只用 `lucide-react`；不引入 heroicons / phosphor / tabler。
   - 界面工作模式：每个 section / 新组件改造遵循 **read → 改 → `pnpm run dev` → 浏览器桌面+移动 QA → 截图给 team-lead → user 确认 → commit** 七步循环。Phase 4 / 5 / 6 中所有动到 UI 的 task 必须在 Step 列表里追加「dev server 验证 + 截图记录到 `docs/qa/2026-05-21/<section-name>/`」步骤；不允许「一次性写几百行不验证再 commit」。截图命名建议：`<task-id>-desktop-before.png` / `<task-id>-desktop-after.png` / 同名 `-mobile-` 系列。

---

## Phase 0 — 文档校对与脚本基线

### Task 0.1: 阅读 Next.js 16 App Router server/client 边界文档

**Files:**

- Read: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Read: `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-server.md`

- [ ] **Step 1: 阅读两份文档**

阅读上述两份文档，写下：
- LocaleProvider 必须是 `"use client"` 还是可保持为 server component。
- Server Component 内是否可以直接读取 cookie 决定 `<html lang>`。

- [ ] **Step 2: 确认结论**

把结论写入 `docs/superpowers/plans/2026-05-21-tourism-lead-generation-implementation.md` 同目录的 `notes-2026-05-21-nextjs-research.md`（如果不存在则创建）。结论必须显式陈述“LocaleProvider 边界 = X”和“html lang 设置入口 = Y”。

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/notes-2026-05-21-nextjs-research.md
git commit -m "docs(plan): record Next.js 16 server/client boundary research"
```

### Task 0.2: 阅读 Route Handler 与 metadata 文档

**Files:**

- Read: `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
- Read: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- Read: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`

- [ ] **Step 1: 阅读四份文档并记录关键 API 形态**

把以下问题答案写入上一步的 `notes-2026-05-21-nextjs-research.md`：
- POST handler 的导出签名（含 `Request` / `NextRequest` / `Response` / `NextResponse` 选择）。
- 16 版本下是否仍支持 `route.config = { runtime: 'edge' | 'nodejs' }`。
- `generate_metadata` 是否可以读 cookie 来切语言（决定 layout 是否能 SSR 出语言相关 meta）。

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/notes-2026-05-21-nextjs-research.md
git commit -m "docs(plan): record Next.js route handler and metadata research"
```

### Task 0.3: 落地 Phase 0 决策（scripts、依赖、Supabase Free 项目、env vars）

**Files:**

- Modify: `package.json`
- Modify: `.env.example`
- Create: `.env.local.example`
- Modify: `.gitignore`
- Create: `.env.local`（不入仓库；仅本地，由 user 手工填入真实 keys）

决策已在计划上方「决策记录」段确认：a) Supabase Free + Drizzle，env 三件套（url / anon / service role）+ DATABASE_URL；b) 加 `typecheck` + `lint`，不加 `test`；c) 响应文案 key 锁定 `leadResponsePromise`；d) mock guard 生产拦截、开发警告不阻断。本任务把这些决策落到 scripts、依赖、env 与 RLS 准备上。

- [ ] **Step 1: 追加 scripts**

把以下条目追加到 `package.json` 的 `scripts`（保留既有 `dev/build/start/client:*`）：

```json
"typecheck": "tsc --noEmit",
"prebuild": "tsx scripts/prelaunch-mock-guard.ts",
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate"
```

不要加 `test`。`prebuild` 由 `next build` 自动触发。

- [ ] **Step 2: 安装依赖**

```bash
pnpm add drizzle-orm postgres @supabase/supabase-js
pnpm add -D drizzle-kit tsx
```

`postgres` = `postgres-js` driver（Drizzle + Supabase 官方推荐组合）；`@supabase/supabase-js` 用于 admin / anon client；`tsx` 给 `prebuild` 跑 TypeScript guard 脚本用。

- [ ] **Step 3: 在 Supabase Free 创建项目并取四件 key**

由 user 在 https://supabase.com 控制台手工完成（agent 不替 user 登录）：
1. 新建 Free 项目（Region 任选，建议靠近运营所在地，例如 `ap-southeast-1` Singapore）。
2. Project Settings → API：拷贝 `Project URL`（→ `NEXT_PUBLIC_SUPABASE_URL`）、`anon public` key (publishable / secret in 2026 naming)（→ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`）、`service_role secret` key (publishable / secret in 2026 naming)（→ `SUPABASE_SECRET_KEY`）。
3. Project Settings → Database → Connection String → 选「URI」→ 拷贝 `postgresql://...`（→ `DATABASE_URL`）。
4. Project Settings → General → 拷贝 `Reference ID`（→ `SUPABASE_PROJECT_REF`，用于诊断）。

把以上 5 个值填入本地 `.env.local`。

- [ ] **Step 4: 写 `.env.example` / `.env.local.example`**

`.env.example`（已入仓库，仅占位）：

```
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_PLACEHOLDER
SUPABASE_SECRET_KEY=sb_secret_PLACEHOLDER
DATABASE_URL=postgresql://postgres:PASSWORD@db.YOUR-REF.supabase.co:5432/postgres
SUPABASE_PROJECT_REF=YOUR-REF
```

`.env.local.example` 内容相同，目的是给 user 一个直接 `cp .env.local.example .env.local` 起手模板。文件头部加注释：

```
# WARNING: SUPABASE_SECRET_KEY bypasses RLS — server-only.
# Never import it from a "use client" file. Never log it. Never bake it into
# next/client bundles. Only `app/api/leads/route.ts` and `lib/db.ts` (server)
# may read it.
```

- [ ] **Step 5: 加 `.gitignore` 防泄漏**

确保以下条目存在于 `.gitignore`（已存在则跳过）：

```
.env.local
.env.*.local
```

- [ ] **Step 6: 验证 typecheck + lint**

```bash
pnpm run typecheck
```

预期：两条命令都 PASS。失败先记录，但不修；进入对应 phase 再处理。

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json .env.example .env.local.example .gitignore
git commit -m "chore(scripts): add typecheck/lint/prebuild and supabase+drizzle deps"
```

提交前 `git status` 确认无 `.env.local`。

### Task 0.4: 把响应文案锁进字典 key 备忘

**Files:**

- Modify: `docs/superpowers/plans/notes-2026-05-21-nextjs-research.md`

- [ ] **Step 1: 记录字典 key 与值**

在 notes 文件中追加一段，标明 Phase 4/5 实填字典时必须使用以下唯一 key（不是 TBD，不是 pending，禁止任何 sections / email autoresponse 用其它文案承诺响应时间）：

```
leadResponsePromise.en = "A China travel advisor usually replies within 24 hours (Chinese holidays excluded)."
leadResponsePromise.zh = "我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）"
```

引用方至少：`components/sections/LeadFormSuccess.tsx`、`components/sections/ConciergeNote.tsx`、未来 email autoresponse 模板。

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/notes-2026-05-21-nextjs-research.md
git commit -m "docs(plan): lock leadResponsePromise copy for sections and email"
```

---

## Phase 1 — Typed 数据层

### Task 1.1: 定义 locale 类型与字典骨架

**Files:**

- Create: `lib/data/locales.ts`
- Create: `lib/data/dictionaries/en.ts`
- Create: `lib/data/dictionaries/zh.ts`

- [ ] **Step 1: 写 locale 类型**

在 `lib/data/locales.ts` 写入：

```ts
export const SUPPORTED_LOCALES = ['en', 'zh'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const isLocale = (value: string | null | undefined): value is Locale =>
  SUPPORTED_LOCALES.includes(value as Locale);
```

- [ ] **Step 2: 写英文字典骨架**

在 `lib/data/dictionaries/en.ts` 写入按 section 分组的命名空间（`nav`、`hero`、`diagnostic`、`destinations`、`visa`、`advisor`、`concierge`、`leadForm`、`leadFormSuccess`、`trust`、`contact`、`faq`、`footer`、`chat`），加上一个**顶层 string 单 key** `leadResponsePromise`（不嵌入任何 section 命名空间，由 Phase 0 决策锁定）。所有其它键值用空字符串占位 + `// TODO_COPY` 注释，**等 Phase 4/5 任务再逐 section 实填**；只有 `leadResponsePromise` 在本任务直接写入最终文案：

```ts
export default {
  // ...all section namespaces with TODO_COPY placeholders...
  leadResponsePromise: "A China travel advisor usually replies within 24 hours (Chinese holidays excluded).",
} as const;
```

中文版（`zh.ts`）的 `leadResponsePromise` 同步写：

```ts
leadResponsePromise: "我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）",
```

键的形状以现有 sections 的 props/text 为准（已盘点：见 `components/sections/*.tsx` 与 `components/chrome/TopNav.tsx`）。

- [ ] **Step 3: 镜像中文字典**

`lib/data/dictionaries/zh.ts` 必须 export 与英文严格同形的对象；中文键值占位允许使用现有 sections 内的中文文本。

- [ ] **Step 4: 验证 typecheck**

```bash
pnpm run typecheck
```

预期：PASS。

- [ ] **Step 5: Commit**

```bash
git add lib/data/locales.ts lib/data/dictionaries
git commit -m "feat(i18n): add locale types and dictionary scaffolding"
```

### Task 1.2: 定义联系渠道数据

**Files:**

- Create: `lib/data/contact-channels.ts`

- [ ] **Step 1: 写类型与示例数据**

```ts
export type ChannelKind = 'form' | 'email' | 'whatsapp' | 'phone' | 'wechat' | 'social';

export interface ContactChannel {
  id: string;
  kind: ChannelKind;
  label: { en: string; zh: string };
  href: string;
  visibility: 'always' | 'overseas-priority' | 'cn-priority' | 'hidden';
  status: 'verified' | 'mock' | 'pending';
  note?: { en: string; zh: string };
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  // entries to be filled per spec §4.8 ordering: form > email > whatsapp > phone > wechat > social
];

export const overseasOrder = (channels: ContactChannel[]): ContactChannel[] =>
  [...channels].sort((a, b) => priority(a) - priority(b));

const priority = (c: ContactChannel): number => {
  if (c.visibility === 'hidden') return 99;
  const order: Record<ChannelKind, number> = {
    form: 0,
    email: 1,
    whatsapp: 2,
    phone: 3,
    wechat: 4,
    social: 5,
  };
  return order[c.kind];
};
```

具体 entry 在 Task 3.1 时根据 `components/floating/ChatLauncher.tsx`、`components/sections/Footer.tsx`、`components/sections/DualCTA.tsx` 中已有的渠道值搬迁过来；本任务只搭骨架与排序函数。

- [ ] **Step 2: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/data/contact-channels.ts
git commit -m "feat(contact): add typed contact channel registry skeleton"
```

### Task 1.3: 定义 lead form schema

**Files:**

- Create: `lib/data/lead-form.ts`

- [ ] **Step 1: 写字段 schema**

```ts
export type LeadFieldId =
  | 'name'
  | 'email'
  | 'phone'
  | 'preferredChannel'
  | 'country'
  | 'travelMonth'
  | 'durationDays'
  | 'partySize'
  | 'travelStyle'
  | 'destinations'
  | 'budgetRange'
  | 'notes';

export interface LeadFieldSpec {
  id: LeadFieldId;
  required: boolean;
  type: 'text' | 'email' | 'tel' | 'select' | 'multiselect' | 'textarea' | 'number';
  options?: ReadonlyArray<{ id: string; label: { en: string; zh: string } }>;
  maxLength?: number;
}

export const LEAD_FIELDS: LeadFieldSpec[] = [
  { id: 'name', required: true, type: 'text', maxLength: 80 },
  { id: 'email', required: true, type: 'email', maxLength: 120 },
  { id: 'phone', required: false, type: 'tel', maxLength: 40 },
  { id: 'preferredChannel', required: true, type: 'select' },
  { id: 'country', required: false, type: 'text', maxLength: 80 },
  { id: 'travelMonth', required: true, type: 'text', maxLength: 40 },
  { id: 'durationDays', required: true, type: 'number' },
  { id: 'partySize', required: true, type: 'number' },
  { id: 'travelStyle', required: false, type: 'multiselect' },
  { id: 'destinations', required: false, type: 'multiselect' },
  { id: 'budgetRange', required: false, type: 'select' },
  { id: 'notes', required: false, type: 'textarea', maxLength: 2000 },
];

export type LeadFormState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'error'; messageKey: string }
  | { kind: 'success'; submissionId: string };

export interface LeadPayload {
  locale: 'en' | 'zh';
  source: 'home-hero' | 'home-mid' | 'home-footer' | 'chat-launcher';
  fields: Partial<Record<LeadFieldId, string | string[] | number>>;
  submittedAt: string;
}
```

`preferredChannel` / `travelStyle` / `destinations` / `budgetRange` 的 `options` entry 在 Task 5.1 时基于 dictionary 与 `lib/data/contact-channels.ts` 填入。

- [ ] **Step 1.2: 在同文件追加 zod schema（client / server / Drizzle 共享）**

按 Phase 0 决策 j，`lib/data/lead-form.ts` 必须导出 zod schema 作为单一校验源；client（`zodResolver`）、server（`leadFormSchema.safeParse`）、Drizzle insert（typed payload）三方共用：

```ts
import { z } from 'zod';

export const leadFormSchema = z.object({
  locale: z.enum(['en', 'zh']),
  source: z.enum(['home-hero', 'home-mid', 'home-footer', 'chat-launcher']),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  preferredChannel: z.string().min(1),
  country: z.string().trim().max(80).optional().or(z.literal('')),
  travelMonth: z.string().trim().min(1).max(40),
  durationDays: z.coerce.number().int().min(1).max(365),
  partySize: z.coerce.number().int().min(1).max(50),
  travelStyle: z.array(z.string()).default([]),
  destinations: z.array(z.string()).default([]),
  budgetRange: z.string().optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  // 反垃圾字段（Phase 0 决策 i）：
  company_website: z.string().max(0, { message: 'honeypot_hit' }).optional(), // 蜜罐：必须为空
  turnstileToken: z.string().min(1, { message: 'turnstile_missing' }),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
```

注：原 `LeadPayload` interface 替换为 `LeadFormInput = z.infer<typeof leadFormSchema>`，下游 client / server / Drizzle 都引用这个类型；不允许在其它文件再写一遍 schema。

- [ ] **Step 1.5: 写 leads 表 Drizzle schema（与表单字段对齐）**

新建 `drizzle/schema.ts`，按 team-lead Phase 0 决策锁定如下字段（snake_case 列名 + Drizzle 字段类型）：

```ts
import { pgTable, uuid, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  locale: text('locale').notNull(),                    // 'en' | 'zh'
  name: text('name').notNull(),
  email: text('email').notNull(),
  country: text('country'),
  travelDates: text('travel_dates').notNull(),         // ISO month or free text from form
  duration: integer('duration').notNull(),             // travel days
  partySize: integer('party_size').notNull(),
  interests: jsonb('interests').$type<string[]>(),     // multiselect destination/travelStyle ids
  budgetRange: text('budget_range'),
  preferredContact: text('preferred_contact').notNull(), // channel id from CONTACT_CHANNELS
  message: text('message'),                            // free notes
  sourcePath: text('source_path').notNull(),           // e.g. 'home-hero' | 'home-mid' | 'home-footer' | 'chat-launcher'
  ipHash: text('ip_hash'),                             // server-side sha256(ip + daily salt)
  userAgent: text('user_agent'),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
```

字段映射回 `LeadFieldId`：`name/email/country/preferredChannel/budgetRange/notes` 直对，`travelMonth → travel_dates`、`durationDays → duration`、`partySize → party_size`、`travelStyle + destinations → interests`（合并入 jsonb）、`phone` 留在 `lib/data/lead-form.ts` 但不进数据库（如要持久化电话再单独决策，本计划不默认存）。`source_path / ip_hash / user_agent` 由 route handler 在 server 端填，不通过表单收。

- [ ] **Step 2: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/data/lead-form.ts drizzle/schema.ts
git commit -m "feat(lead): add typed lead form schema + drizzle leads table"
```

### Task 1.4: 定义 trust proof 数据模型

**Files:**

- Create: `lib/data/trust-proofs.ts`

- [ ] **Step 1: 写四类 proof 类型**

```ts
export type ProofStatus = 'mock' | 'verified' | 'pending' | 'hidden';

interface BaseProof {
  id: string;
  status: ProofStatus;
  productionVisible: boolean;
  source?: string;
  authorizedAt?: string;
}

export interface ReviewProof extends BaseProof {
  kind: 'A_review';
  platform: 'tripadvisor' | 'google' | 'email' | 'other';
  rating?: number;
  quote: { en: string; zh: string };
  travelType: string;
  destination: string;
  evidenceUrl?: string;
}

export interface AdvisorProof extends BaseProof {
  kind: 'B_advisor';
  displayName: { en: string; zh: string };
  role: { en: string; zh: string };
  languages: string[];
  destinations: string[];
  yearsOfExperience?: number;
  photoSrc?: string;
  responseModel: { en: string; zh: string };
}

export interface CaseProof extends BaseProof {
  kind: 'C_case';
  customerType: string;
  durationDays: number;
  partySize: number;
  destinations: string[];
  challenge: { en: string; zh: string };
  outcome: { en: string; zh: string };
  feedbackAvailable: boolean;
}

export interface CredentialProof extends BaseProof {
  kind: 'D_credential';
  category: 'entity' | 'license' | 'partner' | 'payment' | 'privacy' | 'process';
  displayName: { en: string; zh: string };
  description: { en: string; zh: string };
  publicAllowed: boolean;
}

export type TrustProof = ReviewProof | AdvisorProof | CaseProof | CredentialProof;

export const TRUST_PROOFS: TrustProof[] = [
  // Phase 6 时根据 spec §4.3 与现有 components/sections/AdvisorCard.tsx 等内容迁移；初始为空数组占位。
];

export const renderableProofs = (
  proofs: TrustProof[],
  { isProduction }: { isProduction: boolean }
): TrustProof[] =>
  proofs.filter((p) => {
    if (p.status === 'hidden') return false;
    if (isProduction && p.status === 'mock') return false;
    return p.productionVisible || !isProduction;
  });
```

- [ ] **Step 2: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/data/trust-proofs.ts
git commit -m "feat(trust): add typed trust proof data model with status flags"
```

---

## Phase 2 — 语言策略与 LocaleProvider

### Task 2.1: 写浏览器语言检测与持久化 helpers

**Files:**

- Create: `lib/i18n/detect.ts`
- Create: `lib/i18n/storage.ts`

- [ ] **Step 1: 实现 `detect.ts`**

```ts
import { DEFAULT_LOCALE, type Locale, isLocale, SUPPORTED_LOCALES } from '@/lib/data/locales';

export const detectLocaleFromAcceptLanguage = (
  header: string | null | undefined
): Locale => {
  if (!header) return DEFAULT_LOCALE;
  const parts = header
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase());
  for (const tag of parts) {
    const base = tag.split('-')[0];
    if (isLocale(base) && SUPPORTED_LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
};
```

- [ ] **Step 2: 实现 `storage.ts`**

```ts
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/lib/data/locales';

const STORAGE_KEY = 'tourism-landing.locale.v1';

export const readStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(raw) ? raw : null;
};

export const writeStoredLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, locale);
};

export const fallbackLocale = (): Locale => DEFAULT_LOCALE;
```

- [ ] **Step 3: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add lib/i18n
git commit -m "feat(i18n): add locale detection and storage helpers"
```

### Task 2.2: 写 LocaleProvider 与 hooks

**Files:**

- Create: `components/i18n/LocaleProvider.tsx`

- [ ] **Step 1: 实现 provider**

```tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/lib/data/locales';
import en from '@/lib/data/dictionaries/en';
import zh from '@/lib/data/dictionaries/zh';
import { readStoredLocale, writeStoredLocale } from '@/lib/i18n/storage';

const dictionaries = { en, zh } as const;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (typeof dictionaries)['en'];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) => {
  const [locale, setLocaleState] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE
  );

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored && stored !== locale) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
    if (typeof document !== 'undefined') document.documentElement.lang = next;
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider />');
  return ctx;
};

export const useDictionary = () => useLocale().t;
```

- [ ] **Step 2: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add components/i18n/LocaleProvider.tsx
git commit -m "feat(i18n): add LocaleProvider with persistence and dynamic html lang"
```

### Task 2.3: 把 LocaleProvider 接入 layout

**Files:**

- Modify: `app/layout.tsx`

- [ ] **Step 1: 改 `app/layout.tsx`**

读取 cookie 与请求头决定 `initialLocale`，把 `<html lang>` 改成动态值，并把 children 包在 `LocaleProvider` 中。具体调用形态以 Task 0.1/0.2 调研结论为准；如确认 server 端可直接 `headers()` 读 Accept-Language，则用：

```tsx
import { headers, cookies } from 'next/headers';
import { detectLocaleFromAcceptLanguage } from '@/lib/i18n/detect';
import { isLocale, DEFAULT_LOCALE } from '@/lib/data/locales';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const cookieLocale = cookieStore.get('locale')?.value;
  const initialLocale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocaleFromAcceptLanguage(headerStore.get('accept-language')) ?? DEFAULT_LOCALE;
  return (
    <html lang={initialLocale}>
      <body>
        <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: build 验证**

```bash
pnpm run build
```

预期：构建成功；如果出现 `headers()` / `cookies()` async 形态变化，回到 Task 0.1/0.2 笔记调整。

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(i18n): wire LocaleProvider into root layout with header detection"
```

### Task 2.4: 实现 LocaleSwitch 并接入 TopNav

**Files:**

- Create: `components/i18n/LocaleSwitch.tsx`
- Modify: `components/chrome/TopNav.tsx`

- [ ] **Step 1: 实现 LocaleSwitch**

```tsx
'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { SUPPORTED_LOCALES } from '@/lib/data/locales';

export const LocaleSwitch = () => {
  const { locale, setLocale } = useLocale();
  return (
    <div role="group" aria-label="language switch" className="flex gap-2">
      {SUPPORTED_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          className={locale === code ? 'font-semibold' : 'text-muted-foreground'}
          onClick={() => setLocale(code)}
        >
          {code === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  );
};
```

- [ ] **Step 2: 替换 TopNav 现有语言切换**

打开 `components/chrome/TopNav.tsx`，删除内嵌的 locale state / localStorage 逻辑，改为 `import { LocaleSwitch } from '@/components/i18n/LocaleSwitch'` 并在原位置替换为 `<LocaleSwitch />`。

- [ ] **Step 3: 浏览器 QA**

```bash
pnpm run dev
```

打开 `http://localhost:3000`，验证：
- 切换语言后刷新仍保持选择。
- 切换后 `<html lang>` 在 devtools 中改变。
- 表单未填写场景下不报错（表单内容保留场景留到 Task 5.4 验证）。

- [ ] **Step 4: Commit**

```bash
git add components/i18n/LocaleSwitch.tsx components/chrome/TopNav.tsx
git commit -m "feat(i18n): replace topnav locale toggle with LocaleProvider-backed switch"
```

---

## Phase 3 — 联系渠道单一配置源

### Task 3.1: 把渠道数据搬到 `lib/data/contact-channels.ts`

**Files:**

- Modify: `lib/data/contact-channels.ts`

- [ ] **Step 1: 盘点现有渠道**

阅读 `components/floating/ChatLauncher.tsx`、`components/floating/InteractiveDock.tsx`、`components/sections/Footer.tsx`、`components/sections/DualCTA.tsx`，把 WhatsApp / Email / WeChat / Phone / Social 等条目逐项搬迁为 `ContactChannel` 数组 entry。每条标 `status: 'mock' | 'pending'`：除非是真实可达资源，否则 `status: 'mock'`。

- [ ] **Step 2: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 3: Commit**

```bash
git add lib/data/contact-channels.ts
git commit -m "feat(contact): migrate hardcoded channels into typed registry"
```

### Task 3.2: 实现 ContactChannelList / ContactRail

**Files:**

- Create: `components/contact/ContactChannelList.tsx`
- Create: `components/contact/ContactRail.tsx`

- [ ] **Step 1: 实现列表组件**

```tsx
'use client';

import { CONTACT_CHANNELS, overseasOrder } from '@/lib/data/contact-channels';
import { useLocale } from '@/components/i18n/LocaleProvider';

export const ContactChannelList = ({ variant = 'inline' }: { variant?: 'inline' | 'grid' }) => {
  const { locale } = useLocale();
  const channels = overseasOrder(CONTACT_CHANNELS).filter((c) => c.visibility !== 'hidden');
  return (
    <ul data-variant={variant} className="contact-channel-list">
      {channels.map((c) => (
        <li key={c.id}>
          <a href={c.href}>{c.label[locale]}</a>
          {c.status === 'mock' ? <span aria-label="mock channel">[mock]</span> : null}
        </li>
      ))}
    </ul>
  );
};
```

- [ ] **Step 2: 实现 ContactRail（浮层版本）**

`ContactRail.tsx` 与 `ContactChannelList` 共用数据源，只是改用 `position: fixed` 风格的 wrapper，确保 mobile/desktop 都使用同一来源；具体样式继承 `components/floating/ChatLauncher.tsx` 已有 className，不要重写视觉风格。

- [ ] **Step 3: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add components/contact
git commit -m "feat(contact): add ContactChannelList and ContactRail backed by registry"
```

### Task 3.3: 替换 sections / floating 中的硬编码渠道

**Files:**

- Modify: `components/floating/ChatLauncher.tsx`
- Modify: `components/floating/InteractiveDock.tsx`
- Modify: `components/sections/Footer.tsx`
- Modify: `components/sections/DualCTA.tsx`

- [ ] **Step 1: 逐文件迁移**

对每个文件：
- 删除内部的 channel 数组 / 直接写死的 href。
- 引入 `<ContactChannelList />` 或 `<ContactRail />`。
- 保留外层 layout 与文案；文案改为字典读取（`useDictionary().contact`）。

- [ ] **Step 2: build + dev QA**

```bash
pnpm run build
pnpm run dev
```

在浏览器分别确认 hero / mid / footer / 浮层中渠道顺序与文案一致；切换语言后 channel label 跟随。

- [ ] **Step 3: Commit**

```bash
git add components/floating components/sections/Footer.tsx components/sections/DualCTA.tsx
git commit -m "refactor(contact): replace hardcoded channels with single-source registry"
```

---

## Phase 4 — 首页 sections 接入字典

> **界面工作模式（Phase 0 决策 j）**：本 Phase 内每个改动 UI 的 task 必须按 read → 改 → `pnpm run dev` → 桌面 + 移动 QA → 截图 `docs/qa/2026-05-21/<section-name>/` → user 确认 → commit 七步循环；不允许「一次写完不验证再 commit」。每个 task 在 commit 前必须输出 `<task-id>-desktop-before.png` / `-after.png` 与对应 `-mobile-` 系列。

### Task 4.1: 填充 Hero / DualCTA / ConciergeBand 字典

**Files:**

- Modify: `lib/data/dictionaries/en.ts`
- Modify: `lib/data/dictionaries/zh.ts`
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/DualCTA.tsx`
- Modify: `components/sections/ConciergeBand.tsx`

- [ ] **Step 1: 用 spec §4.2 与 §5 替换占位文案**

在 `dictionaries/en.ts` 的 `hero`, `dualCta`, `conciergeBand` 命名空间下写入英文文案，覆盖：
- Hero headline / subheadline / primary CTA / secondary CTA。
- Dual CTA 主 CTA 锚定到 `#lead-form`，次 CTA 锚定到 `#trust`。
- ConciergeBand 文案与 spec §4.6 一致，CTA 文案点向 LeadForm。

中文版同形写入。

- [ ] **Step 2: 改组件读字典**

把 `Hero.tsx`、`DualCTA.tsx`、`ConciergeBand.tsx` 中所有展示文本改为 `const t = useDictionary()` + `t.hero.title` 等。`<a href>` 改为 `#lead-form` / `#trust`。

- [ ] **Step 3: build + dev QA**

```bash
pnpm run build
pnpm run dev
```

切换 EN/ZH 验证文案随之变化、CTA 滚动到正确锚点。

- [ ] **Step 4: Commit**

```bash
git add lib/data/dictionaries components/sections/Hero.tsx components/sections/DualCTA.tsx components/sections/ConciergeBand.tsx
git commit -m "feat(home): wire hero/dualCta/conciergeBand to locale dictionaries"
```

### Task 4.2: 接入 Diagnostic / DestinationTiles / Visa / AdvisorCard / TrustFootnote / Footer

**Files:**

- Modify: `lib/data/dictionaries/en.ts`
- Modify: `lib/data/dictionaries/zh.ts`
- Modify: `components/sections/DiagnosticSection.tsx`
- Modify: `components/sections/DestinationTilesSection.tsx`
- Modify: `components/sections/VisaSection.tsx`
- Modify: `components/sections/AdvisorCard.tsx`
- Modify: `components/sections/TrustFootnote.tsx`
- Modify: `components/sections/Footer.tsx`

- [ ] **Step 1: 字典补全**

按各 section 的现有文本结构在两份字典中补 keys。`AdvisorCard` 文案中所有具体顾问个人信息只允许引用 `lib/data/trust-proofs.ts` 中 status=verified 的条目；status=mock 时显示 `[demo advisor]` 徽标 + 中性占位文案。

- [ ] **Step 2: 改各 section 读字典**

逐个文件替换，禁止保留任何硬编码英文/中文字符串（除 aria-label 中的纯英文标签）。

- [ ] **Step 3: build + dev QA**

```bash
pnpm run build
pnpm run dev
```

逐 section 视觉走查，DOM 中无残留硬编码文案（搜索 `Tripadvisor`、`5-star`、`licensed` 等关键词不应出现在 .tsx 中，应只在数据层）。

- [ ] **Step 4: Commit**

```bash
git add lib/data/dictionaries components/sections
git commit -m "feat(home): localize diagnostic/destinations/visa/advisor/trust/footer sections"
```

### Task 4.3: 重排 `app/page.tsx` 以前置 trust proof

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: 调整顺序**

按 spec §4.3「信任证明应在首屏后尽早出现」要求，把 `TrustProofGrid`（Phase 6 创建）紧贴 Hero 之后；保留 `ConciergeBand`、`DiagnosticSection`、`DestinationTilesSection`、`VisaSection` 等顺序；`LeadForm` 至少在 hero、mid、footer 三处可达（hero 内主 CTA 锚定、mid 区直接渲染 `<LeadForm id="lead-form" />`、Footer 链接）。

- [ ] **Step 2: build + dev QA**

```bash
pnpm run build
pnpm run dev
```

桌面 + 移动端各确认一次。

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "refactor(home): reorder sections to surface trust proof above the fold"
```

---

## Phase 5 — Lead form 与提交流程

> **界面工作模式（Phase 0 决策 j）**：本 Phase 内每个改动 UI 的 task 必须按 read → 改 → `pnpm run dev` → 桌面 + 移动 QA → 截图 `docs/qa/2026-05-21/lead-form/` → user 确认 → commit 七步循环；不允许「一次写完不验证再 commit」。

### Task 5.0: 装表单与反垃圾依赖（按 Phase 0 决策 j）

**Files:**

- Modify: `package.json` / `package-lock.json`
- Create: `components/ui/form.tsx` / `components/ui/input.tsx` / `components/ui/textarea.tsx` / `components/ui/select.tsx` / `components/ui/dialog.tsx` / `components/ui/alert.tsx` / `components/ui/sonner.tsx`（shadcn add 产物，按需）

- [ ] **Step 1: 安装 npm 依赖**

```bash
pnpm add react-hook-form zod @hookform/resolvers @marsidev/react-turnstile sonner lucide-react
```

不要装 MUI / Chakra / Mantine / Ant Design / DaisyUI / heroicons / phosphor / tabler；这些都被 Phase 0 决策 j 显式禁止。

- [ ] **Step 2: 按需安装 shadcn 组件**

```bash
pnpm dlx shadcn@latest add form input textarea select button dialog alert sonner
```

如果某个组件已存在于 `components/ui/`（之前 task 已加），shadcn CLI 会提示是否覆盖，选不覆盖。

- [ ] **Step 3: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json components/ui
git commit -m "chore(deps): add react-hook-form/zod/turnstile/sonner/lucide and shadcn form atoms"
```

### Task 5.1: 实现 LeadForm UI（react-hook-form + zod + shadcn form）

**Files:**

- Create: `components/sections/LeadForm.tsx`
- Create: `components/forms/HoneypotField.tsx`
- Create: `components/forms/TurnstileWidget.tsx`

- [ ] **Step 1: 写 HoneypotField**

```tsx
import { forwardRef } from 'react';

export const HoneypotField = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function HoneypotField(props, ref) {
    return (
      <input
        ref={ref}
        type="text"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        {...props}
      />
    );
  }
);
```

字段命名建议 `company_website`，与 zod schema 对齐；`sr-only` 走 Tailwind 内置（`position: absolute; width: 1px; height: 1px; ...`），不影响 a11y。

- [ ] **Step 2: 写 TurnstileWidget**

```tsx
'use client';

import { Turnstile } from '@marsidev/react-turnstile';

export const TurnstileWidget = ({
  onToken,
  onExpire,
}: {
  onToken: (token: string) => void;
  onExpire: () => void;
}) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={onExpire}
      onError={onExpire}
      options={{ theme: 'auto', size: 'normal' }}
    />
  );
};
```

`@marsidev/react-turnstile` 内部已用 `next/script` 异步加载 Turnstile JS API；`onExpire` / `onError` 都触发 `onExpire` 把 token 清空，react-hook-form 重新进入 invalid 态。

- [ ] **Step 3: 写 LeadForm**

要求：
- `useForm({ resolver: zodResolver(leadFormSchema), mode: 'onBlur' })`，`source` 由 prop 注入到 `defaultValues.source`，`locale` 由 `useLocale()` 注入。
- 字段渲染走 shadcn `<Form><FormField>` 模式；`preferredChannel` options 来自 `lib/data/contact-channels.ts` 中 `kind !== 'form'` 的渠道；`travelStyle` / `destinations` / `budgetRange` options 走字典。
- 表单 children 顺序：可见字段 → `<HoneypotField {...register('company_website')} />` → `<TurnstileWidget onToken={(t) => setValue('turnstileToken', t)} onExpire={() => setValue('turnstileToken', '')} />` → submit button。
- 切换语言时表单内部 state 不清空（react-hook-form 默认非受控，dictionary 重渲不重置）；标签从 dictionary 读取。
- 提交：`fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) })`。响应 200 + `ok:true` → success；400 + `error:'turnstile_failed'` → toast 提示「verification failed, please retry」并 reset Turnstile；429 → toast「too many submissions, try again in a minute」；其它 4xx/5xx → toast 通用错误。
- Sonner toast 在 layout 里挂一次（`<Toaster />`）；本任务不重复挂。

- [ ] **Step 4: typecheck**

```bash
pnpm run typecheck
```

- [ ] **Step 5: dev QA + 截图**

```bash
pnpm run dev
```

桌面 + 移动各跑一次：填表 → Turnstile 通过 → 提交。截图保存到 `docs/qa/2026-05-21/lead-form/5.1-desktop.png` 与 `5.1-mobile.png`。

- [ ] **Step 6: Commit**

```bash
git add components/sections/LeadForm.tsx components/forms docs/qa/2026-05-21/lead-form
git commit -m "feat(lead): LeadForm with rhf+zod+shadcn form, honeypot, turnstile"
```

### Task 5.2: 实现 LeadFormSuccess 状态

**Files:**

- Create: `components/sections/LeadFormSuccess.tsx`

- [ ] **Step 1: 写成功状态组件**

要求：
- 显示字典中 `leadFormSuccess.title` / `leadFormSuccess.subtitle`。
- 渲染响应时间承诺句 `dictionaries.*.leadResponsePromise`（Phase 0 决策锁定的顶层单 key，sections / 未来 email autoresponse 共享同一份）：
  - en: "A China travel advisor usually replies within 24 hours (Chinese holidays excluded)."
  - zh: "我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）"
- 渲染 `<ContactChannelList variant="grid" />` 作为备选联系。

- [ ] **Step 2: 在 LeadForm 中根据 state.kind === 'success' 切换渲染**

- [ ] **Step 3: dev QA**

```bash
pnpm run dev
```

在浏览器手工提交一次走通成功路径（API 暂返回 stub 200，详见 Task 5.3）。

- [ ] **Step 4: Commit**

```bash
git add components/sections/LeadFormSuccess.tsx components/sections/LeadForm.tsx
git commit -m "feat(lead): add success state with response-time placeholder and channels"
```

### Task 5.3: 实现 `app/api/leads` Route Handler（Drizzle + Supabase Free + RLS）

**Files:**

- Create: `app/api/leads/route.ts`
- Create: `lib/db.ts`
- Create: `lib/db.client.ts`
- Modify: `drizzle/schema.ts`（schema 已在 Task 1.3 Step 1.5 写入；本任务在此基础上加 RLS 配套迁移）
- Create: `drizzle.config.ts`
- Create: `drizzle/migrations/0000_init_leads.sql`（由 `pnpm run db:generate` 产出）
- Create: `drizzle/migrations/0001_leads_rls.sql`（手写）

依赖前置：Task 0.3 已完成 `drizzle-orm` / `postgres` / `@supabase/supabase-js` / `drizzle-kit` / `tsx` 依赖安装；`.env.local` 含 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_SECRET_KEY` / `DATABASE_URL` / `SUPABASE_PROJECT_REF`。

- [ ] **Step 1: 写 `lib/db.ts`（server-only）**

```ts
import 'server-only';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { createClient } from '@supabase/supabase-js';
import * as schema from '@/drizzle/schema';

const databaseUrl = process.env.DATABASE_URL;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SECRET_KEY;

if (!databaseUrl) throw new Error('DATABASE_URL is not set');
if (!supabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
if (!serviceRoleKey) throw new Error('SUPABASE_SECRET_KEY is not set');

const queryClient = postgres(databaseUrl, { prepare: false });
export const db = drizzle(queryClient, { schema });

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
```

- [ ] **Step 2: 写 `lib/db.client.ts`（浏览器侧 anon-only）**

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabaseAnon = createClient(supabaseUrl, anonKey);
```

不要在 `lib/db.client.ts` 顶部加 `import 'server-only'`；本计划默认不在 client 调用 `supabaseAnon`，但为后续 newsletter / 公开读取场景预留入口。

- [ ] **Step 3: 写 `drizzle.config.ts`**

```ts
import type { Config } from 'drizzle-kit';

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
} satisfies Config;
```

- [ ] **Step 4: 生成首迁移**

```bash
pnpm run db:generate
```

预期：产出 `drizzle/migrations/0000_init_leads.sql`，含 `create table leads (...)` DDL。

- [ ] **Step 5: 写 RLS 迁移 `drizzle/migrations/0001_leads_rls.sql`**

```sql
alter table public.leads enable row level security;

revoke all on public.leads from anon;
revoke all on public.leads from authenticated;

drop policy if exists "service_role_full_access" on public.leads;
create policy "service_role_full_access"
  on public.leads
  as permissive
  for all
  to service_role
  using (true)
  with check (true);
```

逻辑：默认拒绝所有 role；service_role 绕过 RLS（这是 Supabase 默认行为，但显式写 policy 让意图清晰）；anon / authenticated 没有 grant 也没有 policy，无法 select / insert / update / delete。

- [ ] **Step 6: 在 Supabase 上跑迁移**

```bash
pnpm run db:migrate
```

如果本地无法连 Supabase（防火墙 / 网络），fallback：在 Supabase Dashboard → SQL Editor 中先后粘贴 `0000_init_leads.sql` 与 `0001_leads_rls.sql` 手工执行。执行后在 Table Editor 看到 `leads` 表 + 表头有红色 RLS 标记 + Policies 标签页有 `service_role_full_access`。

- [ ] **Step 7: 写 `app/api/leads/route.ts`（管线：蜜罐 → Turnstile → 限流 → 校验 → 写库 → 飞书）**

```ts
import { NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { db } from '@/lib/db';
import { leads } from '@/drizzle/schema';
import { leadFormSchema } from '@/lib/data/lead-form';

export const runtime = 'nodejs';

const dailySalt = (): string =>
  new Date().toISOString().slice(0, 10) + (process.env.SUPABASE_PROJECT_REF ?? '');

const hashIp = (ip: string | null | undefined): string | null => {
  if (!ip) return null;
  return createHash('sha256').update(ip + dailySalt()).digest('hex');
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipBuckets = new Map<string, number[]>();

const isRateLimited = (ipHash: string | null): boolean => {
  if (!ipHash) return false;
  const now = Date.now();
  const bucket = (ipBuckets.get(ipHash) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (bucket.length >= RATE_LIMIT_MAX) {
    ipBuckets.set(ipHash, bucket);
    return true;
  }
  bucket.push(now);
  ipBuckets.set(ipHash, bucket);
  return false;
};

const verifyTurnstile = async (token: string, remoteip: string | null): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token, ...(remoteip ? { remoteip } : {}) });
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
};

const notifyFeishu = async (row: { id: string }, payload: Record<string, unknown>): Promise<void> => {
  const url = process.env.FEISHU_WEBHOOK_URL;
  if (!url) return;
  const ref = process.env.SUPABASE_PROJECT_REF ?? '';
  const link = ref ? `https://supabase.com/dashboard/project/${ref}/editor` : '';
  const text = [
    `New lead ${row.id}`,
    `created_at: ${new Date().toISOString()}`,
    `locale: ${payload.locale}`,
    `source_path: ${payload.source}`,
    `name: ${payload.name}`,
    `email: ${payload.email}`,
    `country: ${payload.country ?? ''}`,
    `travel_dates: ${payload.travelMonth}`,
    `duration: ${payload.durationDays}`,
    `party_size: ${payload.partySize}`,
    `preferred_contact: ${payload.preferredChannel}`,
    `message: ${(typeof payload.notes === 'string' ? payload.notes : '').slice(0, 200)}`,
    link ? `link: ${link}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ msg_type: 'text', content: { text } }),
    });
  } catch (err) {
    console.error('[lead-notify] feishu webhook failed', err);
  }
};

export async function POST(request: Request): Promise<Response> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(json);
  if (!parsed.success) {
    // honeypot 命中是 zod schema 上的 max(0) 报错，统一在这里识别后静默 200
    const honeypotHit = parsed.error.issues.some((i) => i.path[0] === 'company_website');
    if (honeypotHit) {
      const ipForLog = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
      console.warn('[lead-spam] honeypot hit', { ipHash: hashIp(ipForLog) });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: 'validation', issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip');
  const ipHash = hashIp(ip);

  if (isRateLimited(ipHash)) {
    console.warn('[lead-spam] rate limit', { ipHash });
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip ?? null);
  if (!turnstileOk) {
    console.warn('[lead-spam] turnstile fail');
    return NextResponse.json({ ok: false, error: 'turnstile_failed' }, { status: 400 });
  }

  const interests = [...data.travelStyle, ...data.destinations];

  const [row] = await db
    .insert(leads)
    .values({
      locale: data.locale,
      name: data.name,
      email: data.email,
      country: data.country || null,
      travelDates: data.travelMonth,
      duration: data.durationDays,
      partySize: data.partySize,
      interests,
      budgetRange: data.budgetRange || null,
      preferredContact: data.preferredChannel,
      message: data.notes || null,
      sourcePath: data.source,
      ipHash,
      userAgent: request.headers.get('user-agent'),
    })
    .returning({ id: leads.id });

  // 飞书通知失败不阻塞主响应（Phase 0 决策 g）
  void notifyFeishu(row, data);

  return NextResponse.json({ ok: true, submissionId: row.id });
}
```

- [ ] **Step 8: build**

```bash
pnpm run build
```

预期：构建成功。如果 build 阶段执行了 `lib/db.ts` 顶层逻辑导致 env 缺失报错，把 env 校验移到 `db` / `supabaseAdmin` 的 lazy getter（`getDb()` / `getSupabaseAdmin()`）；不要在构建期强连库。

- [ ] **Step 9: dev QA + 截图**

```bash
pnpm run dev
```

在浏览器分别走 4 条路径，每条路径都截图保存到 `docs/qa/2026-05-21/api-leads/`：
- `5.3-success-desktop.png` / `5.3-success-mobile.png`：填齐字段 + Turnstile 通过 → 进入成功状态；Supabase Dashboard → Table Editor → `leads` 表中出现新记录，列对应 `name/email/travel_dates/duration/party_size/interests/preferred_contact/message/source_path/ip_hash/user_agent` 全部有值；飞书机器人收到通知（如配置了 webhook）。
- `5.3-validation.png`：缺必填提交 → 400 + zod issues。
- `5.3-honeypot.png`：浏览器 devtools 把 `company_website` 字段塞个值再提交 → 200 ok 但 Supabase 表中没新行（蜜罐静默丢弃）；server console 应有 `[lead-spam] honeypot hit`。
- `5.3-turnstile-fail.png`：把 `turnstileToken` 塞个无效字符串提交 → 400 `turnstile_failed`。
- `5.3-rate-limit.png`：连续提交 6 次 → 第 6 次 429 `rate_limited`。
- `5.3-rls.png`：用 anon key 直连（在 Supabase Dashboard 的 SQL Editor 切到 anon role）跑 `select * from leads`，应返回权限错误，确认 RLS 生效。

- [ ] **Step 10: Commit**

```bash
git add app/api/leads/route.ts lib/db.ts lib/db.client.ts drizzle.config.ts drizzle docs/qa/2026-05-21/api-leads
git commit -m "feat(lead): persist leads via Drizzle to Supabase with RLS, honeypot, turnstile, rate limit, feishu notify"
```

### Task 5.4: 在 hero / mid / footer 至少接入三处 LeadForm 入口

**Files:**

- Modify: `app/page.tsx`
- Modify: `components/sections/Hero.tsx`
- Modify: `components/sections/Footer.tsx`

- [ ] **Step 1: hero 主 CTA 锚定到 mid 表单**

在 `Hero.tsx` 主 CTA `<a href="#lead-form">…`。

- [ ] **Step 2: mid 渲染 `<LeadForm id="lead-form" source="home-mid" />`**

由 `app/page.tsx` 在 ConciergeBand 与 DestinationTilesSection 之间插入。

- [ ] **Step 3: footer 渲染锚点链接 + 备用 inline 表单（可只放链接）**

最少在 `Footer.tsx` 提供 `<a href="#lead-form">` 链接 + `<ContactChannelList />`。

- [ ] **Step 4: 浏览器 QA + 截图**

```bash
pnpm run dev
```

桌面 + 移动端确认三处入口都能滚动到 lead-form；切换语言不丢失填写内容；点 hero CTA 跳到表单。截图保存到 `docs/qa/2026-05-21/lead-form/5.4-hero-desktop.png` / `5.4-mid-desktop.png` / `5.4-footer-desktop.png` 加 mobile 版本。

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/sections/Hero.tsx components/sections/Footer.tsx docs/qa/2026-05-21/lead-form
git commit -m "feat(lead): expose lead-form entry points in hero, mid, and footer"
```

---

## Phase 6 — Trust proof 模块

> **界面工作模式（Phase 0 决策 j）**：本 Phase 内每个改动 UI 的 task 必须按 read → 改 → `pnpm run dev` → 桌面 + 移动 QA → 截图 `docs/qa/2026-05-21/trust/` → user 确认 → commit 七步循环；mock badge 在桌面 + 移动两端都必须显眼可见。

### Task 6.1: 实现 TrustProofGrid 与子卡片

**Files:**

- Create: `components/trust/TrustProofGrid.tsx`
- Create: `components/trust/MockBadge.tsx`
- Create: `components/trust/AdvisorProfileCard.tsx`
- Create: `components/trust/CaseStudyCard.tsx`
- Create: `components/trust/CredentialStrip.tsx`
- Modify: `lib/data/trust-proofs.ts`（按 Phase 0 决策 f 填占位条目）

按 Phase 0 决策（f）：四类 trust proof 在本阶段全部用 mock 占位资料；user 上线前逐项替换为真实数据。

- [ ] **Step 0: 在 `lib/data/trust-proofs.ts` 写入 mock 占位条目**

四类 proof 各放至少 2 条占位 entry，必须满足以下硬约束（违反任一项 → 回到本步骤修，不许进入 Step 1）：
- `id` 前缀：A 用 `mock-`、B 用 `demo-`、C 用 `example-`、D 用 `sample-`（例如 `mock-tripadvisor-01` / `demo-advisor-yiwen` / `example-sichuan-loop` / `sample-tourism-license`）。
- `status: 'mock'`。
- `productionVisible: false`。
- 内容禁止真实姓名 / 真实评分数字 / 真实合作 logo / 真实媒体名 / 真实证书号。占位文案必须明显非真实，例如：
  - A 类 quote："Mock review placeholder — real Tripadvisor / Google reviews to be plugged in by ops"
  - B 类 displayName: `{ en: "Demo Advisor — Yiwen L.", zh: "Demo 顾问 — 怡文 L." }`
  - C 类 outcome: `{ en: "Example case — replace with verified itinerary before launch.", zh: "示例案例 — 上线前替换为真实行程。" }`
  - D 类 displayName: `{ en: "Sample Tourism License Placeholder", zh: "示例旅行业资质占位" }`

- [ ] **Step 1: MockBadge**

```tsx
import { useDictionary } from '@/components/i18n/LocaleProvider';

export const MockBadge = ({ status }: { status: 'mock' | 'pending' }) => {
  const t = useDictionary();
  return (
    <span data-status={status} aria-label={t.trust.mockLabel} className="trust-mock-badge">
      {t.trust.mockLabel} ({status})
    </span>
  );
};
```

- [ ] **Step 2: 四个卡片 + 主网格**

`TrustProofGrid.tsx` 使用 `renderableProofs(TRUST_PROOFS, { isProduction: process.env.NODE_ENV === 'production' })`，把 A/B/C/D 分到四个 Tabs/Section 中渲染。每张卡读字典 + 数据层；**status === 'mock' 时必须叠加 `<MockBadge />` 且加 `data-status="mock"`，不允许把 mock 卡渲染成「看起来像真实证明」的样式**。AdvisorProfileCard / CaseStudyCard / CredentialStrip 内部都要把 mock badge 显眼放在卡顶部（不能藏在角落小字），呼应 Phase 0 决策 f「肉眼一望可知是占位材料」。

- [ ] **Step 3: typecheck + dev QA**

```bash
pnpm run typecheck
pnpm run dev
```

- [ ] **Step 4: Commit**

```bash
git add components/trust lib/data/trust-proofs.ts
git commit -m "feat(trust): add typed trust proof grid with mock-only placeholders"
```

### Task 6.2: 实现 mock proof prelaunch guard（生产拦截 + 开发警告）

**Files:**

- Create: `scripts/prelaunch-mock-guard.ts`
- 已在 Task 0.3 把 `prebuild` 接入 `tsx scripts/prelaunch-mock-guard.ts`

按 Phase 0 决策（d）：production 失败、development 警告不阻断。

- [ ] **Step 1: 写 guard**

```ts
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PROD = process.env.NODE_ENV === 'production' || process.env.PRELAUNCH === '1';

const proofsPath = resolve('lib/data/trust-proofs.ts');
if (!existsSync(proofsPath)) {
  console.warn('[prelaunch] lib/data/trust-proofs.ts not found, skipping mock guard');
  process.exit(0);
}

const src = readFileSync(proofsPath, 'utf8');

const mockEntries = src.match(/status:\s*'mock'/g) ?? [];
const visibleMockBlocks =
  src.match(/status:\s*'mock'[\s\S]*?productionVisible:\s*true/g) ?? [];

const summary = {
  totalMock: mockEntries.length,
  visibleMockInProd: visibleMockBlocks.length,
};

const report = `[prelaunch] mock proof scan — totalMock=${summary.totalMock}, visibleMockInProd=${summary.visibleMockInProd}, mode=${PROD ? 'production' : 'development'}`;

if (summary.visibleMockInProd > 0) {
  if (PROD) {
    console.error(report);
    console.error(
      `[prelaunch] FAIL: ${summary.visibleMockInProd} mock trust proofs are still productionVisible: true. Hide them, replace with verified data, or set productionVisible: false before shipping.`
    );
    process.exit(1);
  }
  console.warn(report);
  console.warn(
    `[prelaunch] WARN: ${summary.visibleMockInProd} mock trust proofs are productionVisible. Allowed in development; production build will fail.`
  );
  process.exit(0);
}

console.log(report);
```

- [ ] **Step 2: 验证开发态不阻断**

```bash
pnpm run prebuild
```

预期：当前阶段 `productionVisible: true` 的 mock 条目可能为 0，输出 `[prelaunch] mock proof scan — totalMock=N, visibleMockInProd=0, mode=development`，exit 0。

故意把任一 mock entry 改 `productionVisible: true`，再跑：

```bash
pnpm run prebuild
```

预期：输出 WARN，exit 0。

- [ ] **Step 3: 验证生产态阻断**

```bash
PRELAUNCH=1 pnpm run prebuild
```

预期：输出 FAIL + 冲突项，exit 1。还原 entry。

- [ ] **Step 4: Commit**

```bash
git add scripts/prelaunch-mock-guard.ts
git commit -m "chore(trust): add prelaunch mock guard (prod fail, dev warn)"
```

### Task 6.3: 把 `TrustFootnote.tsx` 与 `AdvisorCard.tsx` 接到数据层

**Files:**

- Modify: `components/sections/TrustFootnote.tsx`
- Modify: `components/sections/AdvisorCard.tsx`

- [ ] **Step 1: 替换硬编码**

`TrustFootnote.tsx` 删除任何写死的「5-star」「Tripadvisor」「licensed」等字段，改为根据 `renderableProofs` 中 status=verified 的 D 类条目渲染；空数组时显示字典中的中性 fallback 文案（按 Phase 0 决策 f，本阶段所有 D 类 proof 均为 mock 占位 + `productionVisible: false`，所以 verified 数组天然为空，footnote 默认走中性 fallback 文案）。

`AdvisorCard.tsx` 改为读 trust proofs 中 kind === 'B_advisor' 的条目，使用 `<AdvisorProfileCard />`；status=mock 时整张卡走 `<MockBadge />` 路径（按 Phase 0 决策 f，本阶段顾问数据全部 status=mock + 命名带 `demo-` 前缀；不允许伪装成真实顾问）。

- [ ] **Step 2: build + dev QA**

```bash
pnpm run build
pnpm run dev
```

逐项确认页面不再显示伪造的真实背书文字。

- [ ] **Step 3: Commit**

```bash
git add components/sections/TrustFootnote.tsx components/sections/AdvisorCard.tsx
git commit -m "refactor(trust): drive footnote and advisor card from typed proofs"
```

---

## Phase 7 — QA 闭环与文档

### Task 7.1: 扩展 README / docs 注明数据层与 mock 规则

**Files:**

- Modify: `docs/README.md`（如不存在则新建于 `docs/lead-generation-overview.md`）

- [ ] **Step 1: 写入说明**

简述：locale provider 入口、字典扩展方式（`leadResponsePromise` 单 key 锁定）、`lib/data/contact-channels.ts` 单一来源原则、`lib/data/trust-proofs.ts` 状态机、`scripts/prelaunch-mock-guard.ts` 触发条件（prod fail / dev warn）、`/api/leads` 落地链路（Drizzle → Supabase Free + RLS service_role-only）、env 三件套（NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / SUPABASE_SECRET_KEY + DATABASE_URL）的分布与禁用边界、部署目标 Vercel + nodejs runtime 约束（Phase 0 决策 e）。

- [ ] **Step 2: 写 mock proof 替换清单**

按 Phase 0 决策 f，在 `docs/lead-generation-overview.md` 末尾新增 `## Mock proof replacement checklist` 段落，列出当前 `lib/data/trust-proofs.ts` 中所有 status=mock 占位条目，按 A/B/C/D 分四组、每条记录：
- `id`（含 mock-/demo-/example-/sample- 前缀）
- 占位用途（一句话说明这条 proof 在版式上承担什么）
- 替换需要的真实材料（例：A 类需要真实 Tripadvisor / Google review 链接 + 客户授权；B 类需要顾问真实姓名 + 头像授权 + 服务语言；C 类需要客户授权的真实行程素材；D 类需要真实证书号 / 合作 logo 使用授权）
- 替换后操作（把 `status: 'mock'` 改 `verified` + `productionVisible: true` + 移除 mock badge 视觉）
- 上线 gate：`PRELAUNCH=1 pnpm run prebuild` 必须 exit 0，否则 `next build` 在 production 会被 mock guard 拦截

清单要求：每个 mock entry 一行，不允许 TBD / fill in later；entry 增删时本清单必须同步。

- [ ] **Step 3: Commit**

```bash
git add docs/lead-generation-overview.md
git commit -m "docs(lead): document data layer, supabase rls, mock guard, replacement checklist"
```

### Task 7.2: build + typecheck + lint 全跑

- [ ] **Step 1: 跑全套**

```bash
pnpm run build
pnpm run typecheck
```

预期：全部 PASS。命令顺序按 Phase 0 决策固定为 `build && typecheck && lint`，作为本计划的最终验证闭环。失败时回到对应任务修；不要在最后阶段引入“快速 hack”。

- [ ] **Step 2: 记录耗时与结果**

把三个命令的输出 tail 写入 `docs/superpowers/plans/notes-2026-05-21-qa-run.md`（命令、退出码、耗时、关键结论）。

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/notes-2026-05-21-qa-run.md
git commit -m "docs(qa): record final build/typecheck/lint run results"
```

### Task 7.3: 浏览器手工 QA（桌面 + 移动）

- [ ] **Step 1: 启动 dev**

```bash
pnpm run dev
```

- [ ] **Step 2: 桌面端 QA**

逐项核对（每项必须截图或 console 记录）：
1. EN 访问首次渲染 → hero 文案英文。
2. 切换 ZH → 全站文案改中。
3. 表单填半，切换语言 → 已填字段保留。
4. 提交缺必填 → 字典内的错误提示。
5. 提交完整 → 进入 success 状态，看到 `leadResponsePromise` 文案（24 小时；中国节假日除外）+ 备选渠道。
6. 浏览 hero / mid / footer 三处 lead-form 入口。
7. trust proof 区中 mock 项有徽标，verified 项无徽标。
8. footer 渠道顺序与 `overseasOrder` 一致（form > email > whatsapp > phone > wechat > social）。

- [ ] **Step 3: 移动端 QA**

devtools 模拟 iPhone 14 Pro 与 Pixel 7：
- LeadForm 字段在小屏可填、键盘类型对（email / tel / number 各自正确）。
- 浮层 ChatLauncher / InteractiveDock 渠道列表跟桌面一致。

- [ ] **Step 4: 把 QA 截图归档**

存到 `docs/qa/2026-05-21/desktop/` 与 `docs/qa/2026-05-21/mobile/`，并在 `notes-2026-05-21-qa-run.md` 记录每张截图对应的检查项。

- [ ] **Step 5: Commit**

```bash
git add docs/qa
git commit -m "docs(qa): record manual desktop and mobile QA evidence"
```

### Task 7.4: 模拟 prelaunch 走一次 mock 清理预演

- [ ] **Step 1: 把任一 mock proof 临时改为 `productionVisible: true`**

仅在本地分支临时改 `lib/data/trust-proofs.ts`。

- [ ] **Step 2: 跑 prelaunch**

```bash
PRELAUNCH=1 pnpm run prebuild
```

预期：exit 1，输出列出违规条目数。

- [ ] **Step 3: 还原**

```bash
git checkout -- lib/data/trust-proofs.ts
```

- [ ] **Step 4: 再跑一次**

```bash
PRELAUNCH=1 pnpm run prebuild
```

预期：exit 0。

- [ ] **Step 5: 把这次预演结果追加到 `notes-2026-05-21-qa-run.md`**

不需要 commit（只是 notes，已在 7.2 commit 范围内）。

### Task 7.5: 上线后 1 周访问回温备忘（Supabase Free 防暂停）

**Files:**

- Modify: `docs/lead-generation-overview.md`（Task 7.1 创建的 doc）

Supabase Free 项目 1 周无活动会被自动暂停（pause）。本计划不内置 cron / keepalive；由运营或后续工程接 Vercel Cron / GitHub Actions 完成。

按 Phase 0 决策 e：本计划部署目标 = Vercel；未来若改投 VPS / Cloudflare Workers，仅需替换 `lib/db.ts` 内 driver 与 `app/api/leads/route.ts` runtime（例如 Cloudflare 路径切到 HTTP driver + Edge Runtime），其余业务代码、字典、表单 schema、trust proof 数据层完全不动。

- [ ] **Step 1: 在文档中追加备忘**

在 `docs/lead-generation-overview.md` 末尾追加一段：

```
## Supabase Free 1-week revival reminder

Supabase Free projects are automatically paused after ~1 week of inactivity.
This plan does not install a cron/keepalive job. Operations responsibility:

- Within 6 days of last write, hit the project once to keep it warm.
  Acceptable revival actions: open the Supabase Dashboard for the project,
  submit a smoke lead via the live site, or run `pnpm run dev` locally with
  the project's DATABASE_URL.
- If the project is paused, the next admin login will show a "Resume" button.
  Resume takes up to 60 seconds; no data is lost.
- Once we have stable lead volume (>= 1 lead/day for 14 consecutive days),
  this reminder can be retired.
- A future plan may install a Vercel Cron / GitHub Actions ping that runs
  `select 1` against `leads` weekly. Out of scope for this plan.

## Future migration note (deploy target)

Current deploy target: Vercel (Phase 0 decision e). If we later move to a
VPS or Cloudflare Workers, only two files change:

- `lib/db.ts`: swap `postgres-js` for the platform's recommended driver
  (e.g. Cloudflare → HTTP driver via `@neondatabase/serverless` or similar).
- `app/api/leads/route.ts`: change `runtime = 'nodejs'` to whatever the
  new platform supports (Cloudflare Workers → `runtime = 'edge'`).

Business code, dictionaries, lead form schema, contact channels, and trust
proof data layer are platform-agnostic by design and require no changes.
```

- [ ] **Step 2: Commit**

```bash
git add docs/lead-generation-overview.md
git commit -m "docs(ops): add supabase free 1-week revival + vercel migration note"
```

---

## Self-Review 备忘

- 任何带「具体响应时间」「真实评价」「真实顾问姓名」「真实合作 logo」的文案在执行期出现时，都应回到 spec §6 与 trust proof status 流程，先标 mock 或 hidden，不写真名。响应时间承诺**只能**通过字典顶层 `leadResponsePromise` 输出（24 小时；中国节假日除外），其它任何 sections / FAQ / email 模板都不允许另写承诺时长。
- 表单内容跨语言保持：用 React state 而不是 dictionary 重渲触发的非受控初值；如发现 input 重置，回到 Task 5.1 检查 keying。
- `app/api/leads/route.ts` 通过 Drizzle 写 Supabase Free，必须 server-only + `runtime = 'nodejs'`，禁止从 `'use client'` 文件导入 `lib/db.ts` 或 `SUPABASE_SECRET_KEY` / `TURNSTILE_SECRET_KEY` / `FEISHU_WEBHOOK_URL`。RLS 默认拒绝、仅 service_role 可读写，QA 时一定要在 Supabase Dashboard 用 anon role 跑 `select * from leads` 验证拒绝，确保前端永远走 server route。
- 若 Task 4.x 出现 dictionary 与 sections 字段错位，把 dictionary 当作 source of truth，不让组件回退到硬编码。
- prelaunch guard 行为按 Phase 0 决策固定：production 失败、development 警告不阻断；不允许加 `--force` 或临时跳过；guard 在 production build 失败时必须修数据，不能改脚本来「让它过」。
- Supabase Free 1 周无活动暂停的风险已在 Task 7.5 备忘；上线后第 5-6 天必须主动触达项目（提交一条 smoke lead 或在 Dashboard 操作），等真实流量稳定再退场该备忘。
- 部署目标按 Phase 0 决策 e 锁定为 Vercel：禁止本计划阶段引入 `wrangler.jsonc` / `@opennextjs/cloudflare` / `@cloudflare/next-on-pages` 等 Cloudflare 适配；不在 `lib/db.ts` 切到 HTTP driver；任何「为了边缘运行时」的改动都是范围扩张，要回到决策 e 重新讨论。
- **真实材料替换是唯一上线前阻塞项**：按 Phase 0 决策 f，本阶段所有 trust proof 全部 status=mock + `productionVisible: false`；上线前必须由 user 把每条 mock entry 替换为真实数据（A 真评价 + 授权、B 真顾问 + 头像授权、C 真案例 + 客户授权、D 真资质 + 使用许可），并把 `status` 改 `verified` + `productionVisible: true` + 清掉 mock badge。prelaunch guard 在 production build 时会兜底拦截没替换干净的 mock；这是唯一硬门禁，其它 QA 项都不能升级为「上线阻塞」。
- 飞书机器人通知（决策 g）失败**不能阻塞主响应**：route handler 必须用 `void notifyFeishu(...)` 或 try/catch + console.error，让用户始终看到 200；否则 webhook 临时不可用就会给用户报 5xx。
- Cloudflare Turnstile token（决策 i）**绝对不能在 client 信任**：所有「token 已通过」的判断必须由 server 端 fetch `https://challenges.cloudflare.com/turnstile/v0/siteverify` 校验后返回，前端只是把 token 透传；client 拿到 onSuccess 回调不等于校验通过。
- 蜜罐字段（决策 i）必须满足 a11y：`aria-hidden="true"` + `tabindex={-1}` + `autocomplete="off"` + Tailwind `sr-only`（不是 `display:none`，否则部分爬虫会跳过；也不是 `visibility:hidden`，会让屏幕阅读器读到）；命名贴近真实字段（`company_website`），让 bot 误以为是常规字段。
- WhatsApp（决策 h）本期只做 wa.me 链接：禁止本计划引入 Meta Cloud API、模板审批流程、自动外发；env 缺 `NEXT_PUBLIC_WHATSAPP_PHONE` 时该渠道直接 `visibility: 'hidden'`，不展示破链。Cloud API 用法属第二阶段，启用前需 1-3 天 Meta 模板审批 + Permanent Access Token + Phone Number ID，单独 Phase 处理。
- 表单栈（决策 j）必须 react-hook-form + zod + shadcn form 三件套同时在场：缺任一项都不算合格实现；schema 单源放 `lib/data/lead-form.ts`，禁止任何文件再写一遍。
- 界面工作模式（决策 j）：Phase 4/5/6 task 缺截图就不能 commit；review 时 team lead 直接看 `docs/qa/2026-05-21/<section-name>/` 目录的 before/after PNG 决定是否放行。
