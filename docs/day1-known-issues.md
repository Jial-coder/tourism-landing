# Day 1 Known Issues

## ⚠️ HMR WebSocket 502（不修，开发体感影响）

**症状**：dev mode 通过 cloudflared ephemeral tunnel 访问时，浏览器 console 报 3-6 个：
```
WebSocket connection to 'wss://*.trycloudflare.com/_next/webpack-hmr' failed:
Error during WebSocket handshake: Unexpected response code: 502
```

**根因**：trycloudflare quick tunnel 对 WebSocket upgrade 支持不稳定（quick tunnel 是 anonymous，不保证 WS）。Next.js 16 dev mode 用 WS 做热重载（HMR）。

**影响范围**：
- ✅ 客户视角：**无影响**（客户不开 devtools，页面正常渲染）
- ⚠️ 开发体感：改文件不会自动 reload，要手动刷新浏览器
- ✅ Production build：无问题（next build + next start 不用 HMR）
- ✅ 本地 localhost:3000 直连：无问题

**何时需要修**：
- 客户反馈说"页面有 console 错误怕不专业" → 切 named tunnel + WSS 配置
- 改稿频繁需要 HMR → 本地开 devtools 直连 localhost，让客户看 tunnel URL

**修法（备选）**：
1. 升级到 named tunnel（需要 Cloudflare 账号 + 一次 cloudflared login）
2. dev 时本地预览，给客户的链接走 production build：`pnpm build && pnpm start` + tunnel
3. Next.js 配 `experimental.allowedDevOrigins`（已知 16.x 对 trycloudflare 仍有概率失败）

**当前选择**：保持 ephemeral tunnel，console errors 容忍。Day 5 review 时再评估是否升级。

## ⚠️ pnpm 11 + sharp build script 阻塞（绕过）

**症状**：`pnpm install / dev / build` 在 sharp 0.34.5 这种带原生 binding 的包面前，因 `runDepsStatusCheck` 把 `IGNORED_BUILDS` 当 fatal 而退出，即使 package.json `pnpm.onlyBuiltDependencies` 已声明、`.npmrc` 关掉 `verify-deps-before-run` 也不放行。

**根因**：pnpm 11 的 default deps-check 把"批准但未构建的脚本"等同失败；`pnpm approve-builds` 的 multiselect prompt 在非 TTY（claude code shell）下 `ERR_USE_AFTER_CLOSE` 崩溃。

**当前绕法**：用 `npm install` + `npm run dev` 替代 pnpm。

**何时回切 pnpm**：pnpm 13 修复或我们换 corepack pinned 版本。

## ⚠️ Stitch 官方 MCP 不暴露 tools / resources（确认绕过）

**症状**：`claude mcp add stitch --transport http https://stitch.googleapis.com/mcp` 返回 `✓ Connected`，但 `ListMcpResourcesTool` 返回空，工具列表里没有任何 `stitch_*` 工具。

**根因**：Stitch 官方 MCP（截至 2026-05-18）实际可能是给 Stitch web app 内部自用，不对外暴露标准 MCP tool/resource 接口。codex v8 调研时假设的"Stitch MCP 可让 AI 生成"不成立。

**绕过**：回到 v9 sign-off 时 Stitch 的本意 —— **Stitch 是 vibe design accelerator，主用法是 web UI 出稿**：
1. 用户在 https://stitch.withgoogle.com/ 出稿（Pro mode）
2. 出稿后导出 React 代码
3. AI（Claude Code）集成进 portal `/client/prototype`

**Stitch MCP 注册保留不删**：将来 Google 可能补 tool API；保留不增加任何成本（Connected ≠ 调用 ≠ 配额消耗）。

**对 v9 架构无影响**：Stitch 在 v9 里就是 accelerator only，用 web UI 跟用 MCP 在 design stack 里是同等位置；只是手动一步而已。

**何时回试 MCP**：Q4 2026 前后 Stitch 退出 Google Labs 时，重新查 docs 看有无 tool 暴露。
