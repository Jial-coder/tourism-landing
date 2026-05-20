# Next.js 16 研究记录（2026-05-21）

研究范围：Phase 0 Task 0.1 + 0.2 — 围绕 LocaleProvider 边界、`<html lang>` 设置入口、POST handler 签名、`runtime` 配置语法、`generateMetadata` 是否能读 cookie 这 5 个问题，做 Next.js 16.2.6 本地 docs（`node_modules/next/dist/docs/`）的事实校对，给后续 Phase 1-5 的实现锁死答案。

参考的 6 份本地文档：
- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-server.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`
- `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
- 补充对照：`03-file-conventions/02-route-segment-config/runtime.md`、`03-file-conventions/layout.md`

> Plan 假设对照 = `docs/superpowers/plans/2026-05-21-tourism-lead-generation-implementation.md` 决策段（lines 73-141）。

---

## 1. LocaleProvider 边界 = `'use client'`（Client Component）

**结论**：`LocaleProvider` 必须以 `'use client'` 指令开头实现为 Client Component；不能保持为 Server Component。

**理由（事实依据）**：

- `05-server-and-client-components.md` Lines 343-413 “Context providers” 明确：
  > React context is **not supported in Server Components**. To use context, **create a Client Component that accepts `children`**.
  并给出标准模板（`'use client'` + `createContext` + `<Context.Provider value=...>{children}</Context.Provider>`）。
- 同文档 Lines 173-176 指出 `'use client'` 是 Server / Client 模块图的边界标记；标记之后该文件的所有 import 与子组件都进入 client bundle。
- 用户态字段（locale）需要 `useState` / `useContext` / `useEffect` 同步路由或 cookie，这些 hook 都属于 Lines 19-24 的 Client Component 触发条件。

**实现约束**：
- `lib/i18n/LocaleProvider.tsx` 顶部第一行写 `'use client'`，再 `import { createContext, useContext, useState } from 'react'`。
- 在 `app/layout.tsx`（保持 Server Component）内直接渲染 `<LocaleProvider initialLocale={locale}>{children}</LocaleProvider>`，把 server 侧解析出的 locale 通过 `props` 传给 client provider。Lines 240-289 “Passing data from Server to Client Components” 给的就是这个模式。
- Provider 包裹范围尽量靠近 `{children}`，不要包整个 `<html>` —— Lines 412-413 “Good to know” 明确建议这种最小作用域，便于 server-side 静态优化。

---

## 2. html lang 设置入口 = `app/layout.tsx`（Server Component）内 `await cookies()` 决定

**结论**：`<html lang>` 在 root layout（保持 Server Component）内通过 `import { cookies } from 'next/headers'` + `await cookies()` 读到 locale cookie 后直接 SSR 渲染，**不要**等 client `useEffect` 同步。

**理由（事实依据）**：

- `03-file-conventions/layout.md` Lines 26-50：root layout 必须定义 `<html>` 与 `<body>` 标签，标准示例就在 server component 里直接写 `<html lang="en">`。
- 同文件 Lines 153-175 “Caveats” 给出 Server Component 内 `await cookies()` 读取 cookie 的官方模板：
  ```tsx
  import { cookies } from 'next/headers'
  export default async function Layout({ children }) {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
    return '...'
  }
  ```
  Next.js 15+ 起 `cookies()` 是 async，必须 `await`。
- 等 client `useEffect` 同步会出现两个问题：(a) HTML 首屏 lang 错误，影响 SEO 与屏幕阅读器；(b) Hydration 后 DOM 突变会触发 React hydration mismatch warning。两者都不可接受。

**实现约束**：
- `app/layout.tsx` 改成 `export default async function RootLayout(...)`；在函数顶部 `const cookieStore = await cookies()` 拿到 `locale` cookie，缺省回退 `DEFAULT_LOCALE = 'en'`（Phase 1 Task 1.1 决策）。
- `<html lang={locale === 'zh' ? 'zh-CN' : 'en'}>`；`<body>` 不动。
- Server-resolved 的 locale 同时作为 `<LocaleProvider initialLocale={locale}>` 的 prop 传给客户端，避免双源 drift。
- 当前 `app/layout.tsx` 是同步函数 + 硬编码 `lang="zh-CN"`（lines 10, 16），Phase 1 Task 1.x 必须改造为 async server component。

---

## 3. POST handler 推荐签名 = `(request: NextRequest)` → `Response.json(...)` 或 `NextResponse.json(...)`

**结论**：`app/api/leads/route.ts` 导出签名采用：

```ts
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json();
  // honeypot / Turnstile / rate-limit / leadFormSchema.safeParse / db insert / Feishu webhook
  return Response.json({ ok: true }, { status: 200 });
}
```

**理由（事实依据）**：

- `03-file-conventions/route.md` Lines 60-78：`request` 参数官方定义就是 `NextRequest`（Web `Request` 的扩展），方便用 `request.cookies` / `request.nextUrl.searchParams` / `request.json()`。Plan 决策 i 的速率限制 + Turnstile remoteip 需要从 headers 取 `x-forwarded-for`，`NextRequest` 的 `request.headers.get(...)` 与 Web `Request` 一致，但 `NextRequest` 提供了更稳的类型。
- 返回值方面，Lines 6-18 与 Lines 483-499 都直接用 `Response.json({...})`，这是 Web 标准 API，类型是 `Response`，无需额外 import。当需要设置 Cookie / 自定义 header 链路时再换 `NextResponse.json(..., { headers: ... })`（`04-functions/next-response.md` 暴露这些便利方法）。本项目目前只需返回 200/400/429 的 JSON，**优先 `Response.json`**，更轻、更接近 Web 标准。
- `15-route-handlers.md` Lines 41-43 明确支持 GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS；POST handler 默认不缓存（Lines 49-51），符合“每次提交都必须真写库”的要求。
- Plan 决策 e 强制 `app/api/leads/route.ts` `export const runtime = 'nodejs'`（Vercel + drizzle-orm + postgres-js 直连）。`route.md` Lines 640-660 “Segment Config Options” 列出 `runtime = 'nodejs'` 是合法的 segment config，且本文件示例与 plan 一致。

---

## 4. `export const runtime = 'edge' | 'nodejs'` —— Next.js 16 仍支持，**默认 `'nodejs'`**

**结论**：Next.js 16.x 仍然支持 `export const runtime = 'nodejs' | 'edge'` 在 page / layout / route 顶部声明，**默认值已改为 `'nodejs'`**。`'experimental-edge'` 旧值在 v15.0.0-RC 已 deprecated（有 codemod）；**不存在**“runtime 配置语法被改名 / 废弃”的情况。

**理由（事实依据）**：

- `02-route-segment-config/runtime.md` Lines 6-19 直接给定签名：
  ```ts
  export const runtime = 'nodejs' // 'nodejs' | 'edge'
  ```
  并标注 `'nodejs'` 为 default。
- `02-route-segment-config/index.md` Lines 8-14 表格对 `runtime` 标注 `'nodejs' | 'edge'`，default `'nodejs'`。
- 同文件 Lines 18-21 的 Version History 显示：
  - `v16.0.0`：`dynamic` / `dynamicParams` / `revalidate` / `fetchCache` 在 Cache Components 启用时**移除**（`runtime` 不在被移除清单内 → 仍保留）。
  - `v16.0.0`：`export const experimental_ppr = true` 移除（与 runtime 无关）。
  - `v15.0.0-RC`：`export const runtime = "experimental-edge"` deprecated（不影响 `'edge'` 与 `'nodejs'` 两个有效值）。
- `runtime.md` Lines 21-24 “Good to know” 注意事项：
  - `'edge'` 在 Cache Components 模式下不被支持；本项目不打算启用 Cache Components，nodejs 路径是默认。
  - 该选项不能在 `proxy` 文件中使用（不影响 `app/api/*/route.ts`）。

**与 plan 假设的关系**：plan 决策 e 与 Task 0.2 假设“`runtime = 'nodejs'` 仍可用”——事实校对一致，**无冲突**。

---

## 5. `generateMetadata` 能读 cookie 决定语言 meta —— 支持，但有约束

**结论**：`generateMetadata` 可以在函数体内 `await cookies()` 读 cookie 切换 `<title>` / `<description>` / `<openGraph>` 等语言相关字段；但要求该 segment 不能完全 prerender，访问 cookie 会让 metadata 进入 streaming / runtime 路径。

**理由（事实依据）**：

- `04-functions/generate-metadata.md` Line 27 明确 `metadata` 与 `generateMetadata` **只在 Server Components 中导出**；Server Components 可以使用 `cookies()` / `headers()`（`05-server-and-client-components.md` Lines 26-32 + `15-route-handlers.md` Lines 113-124 均印证）。
- 同文档 Lines 1254-1314 “With Cache Components”：
  > When Cache Components is enabled, `generateMetadata` follows the same rules as other components. **If metadata accesses runtime data (`cookies()`, `headers()`, `params`, `searchParams`)** or performs uncached data fetching, it defers to request time.
  并给出 `(await cookies()).get('token')?.value` 的示例（Lines 1278-1289），证明 `cookies()` 在 `generateMetadata` 中是受支持的、但会让该页面 metadata 走 streaming / runtime 而非 prerender。
- 同文档 Lines 119-131（位于 `14-metadata-and-og-images.md` 同名章节内）补充：streaming metadata 默认开启，对 bot/crawler 关闭（Twitterbot / Slackbot / Bingbot 走非 streaming 路径），不影响主流社交分享卡片抓取。

**实现约束（影响 Phase 4 metadata 任务）**：
- 如要在 `app/layout.tsx` 用 `generateMetadata` 替换静态 `metadata`，函数必须 `async` + `await cookies()`；server-side 拿到 locale 后 return `{ title, description, openGraph: { locale: ... } }` 等。
- 当前项目没有启用 Cache Components；即便不启用，访问 `cookies()` 会让该 segment 默认 dynamic（`route.md` Lines 113-124 列出的 “Prerendering stops if … runtime APIs like cookies() …” 等同规则）。本项目首页本身需要 dynamic（locale cookie + Turnstile script + lead form），不冲突。
- 如果未来引入 Cache Components 并希望保留 SSG，则要走 `'use cache'` 路径或 `<DynamicMarker />`（generate-metadata.md Lines 1265-1314 给的两条出路）；本计划 Phase 0-7 不涉及。

**与 plan 假设的关系**：plan 没有写死 metadata 是否 SSR；本结论保守地选 “server-side 读 cookie + dynamic metadata”，与决策 a/e/i 的 server-only 数据流向一致，**无冲突**。

---

## 与 plan 假设的潜在出入（综合）

无显著冲突。5 条结论全部与 plan 决策段（lines 73-141）一致：

- LocaleProvider = client、root layout = server async、html lang = server SSR 来自 cookie，跟 Phase 1 Task 1.x “Typed 数据层 + 国际化骨架” 没有矛盾。
- POST handler 用 `NextRequest` + `Response.json` + `runtime = 'nodejs'`，跟决策 e（Vercel / 不切 HTTP driver）+ 决策 i（蜜罐 + Turnstile + 限流串行管线）+ 决策 g（Feishu webhook 通知）兼容。
- `runtime` 配置语法在 16.x 仍然有效；`'experimental-edge'` 已废弃但**不影响 `'nodejs'`**。
- `generateMetadata` 读 cookie 切语言 meta 受支持；不需要回头修改 plan 的 Phase 4/5 任务范围。

**Status：DONE（无 concerns，全部命中 plan 假设）。**

---

## Task 0.4 锁定记录 — `leadResponsePromise` 字典 key

Phase 4/5 实填字典时必须使用以下唯一 key（不是 TBD，不是 pending，禁止任何 sections / email autoresponse 用其它文案承诺响应时间）：

```
leadResponsePromise.en = "A China travel advisor usually replies within 24 hours (Chinese holidays excluded)."
leadResponsePromise.zh = "我们的中国旅行顾问通常会在 24 小时内回复你（中国节假日除外）"
```

引用方至少：`components/sections/LeadFormSuccess.tsx`、`components/sections/ConciergeNote.tsx`、未来 email autoresponse 模板。

字典结构约束（与 Phase 1 Task 1.1 一致）：`leadResponsePromise` 是 **顶层 string 单 key**，不嵌入 `leadFormSuccess` / `concierge` / `email` 任一 section 命名空间，确保多处引用同源。中英文字典对象必须严格同形，`leadResponsePromise` 在 Task 1.1 直接写入最终文案（不放 `// TODO_COPY`）。
