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
