# Path C 验收报告（2026-05-21 自主推进夜班）

**分支**: feat/lead-generation-foundation
**最终 HEAD**: 见 git log

## 验证矩阵

| 项目 | 命令 / 操作 | 结果 |
|---|---|---|
| typecheck | `pnpm run typecheck` | PASS |
| build | `pnpm run build` | PASS（20 routes，Turbopack 编译完整通过） |
| Drizzle migrate | `pnpm run db:migrate` | PASS（0000_init_leads + 0001_leads_rls 已应用到真 Supabase） |
| dev server | `pnpm run dev` | localhost:3001 运行中 |
| 桌面 QA 1440×900 | Playwright fullPage | PASS — `desktop-full.jpeg`、`desktop-fold1.jpeg`、`desktop-leadform.jpeg` |
| 移动 QA 390×812 | Playwright fullPage | PASS — `mobile-fold1.jpeg`、`mobile-full.jpeg` |
| 页面节奏量化 | 9 个 main section，9819px 总高 | dark hero → cream(stats/how/dest) → paper(itineraries) → dark(specialists) → cream(trust grid) → paper(form) → paper(FAQ) → dark footer |
| body theme | bg-cream + text-ink + Newsreader/Inter 变量 | 已切到 Path C |
| LocaleSwitch reload 持久化 | 已在 9c82c04 commit 验证 | 通过（cookie 1 年） |
| 首页 lead form | 14 字段 + 蜜罐 sr-only + 提交按钮 | OK；country 字段未单独渲染（可选字段，schema 允许，本期略） |
| Turnstile widget | iframe 渲染 | 缺 NEXT_PUBLIC_TURNSTILE_SITE_KEY 时返回 null（dev 行为，按设计） |
| /api/leads | runtime=nodejs 已落，本地未真发 POST | stub→真管线已替换；未做端到端真插入 |

## 决策路径

完整路径 C：
- 旧 Hero/Diagnostic/ConciergeBand/AdvisorCard/ConciergeNote/DualCTA/TrustFootnote 全部不再装配（保留文件 archive）
- 新挂载：HomeHero / TrustStrip / HowWeWork / DestinationGrid / SampleItineraries / Specialists / TrustProofGrid / LeadForm / FAQ / PathCFooter

## 已知遗留（已写入 plan / DESIGN.md 不阻碍上线）

1. **mock 全占位**（A/B/C/D + stats），prebuild guard 在 `NODE_ENV=production || PRELAUNCH=1` 时拦截；本期 dev/preview 不阻断（决策 d）
2. **rate limit 单 instance** — Vercel 多实例不共享，Phase 7 备忘
3. **Turnstile dev bypass** — 缺 secret key 时 `verifyTurnstile` 直接 return true，部署前必须设
4. **Feishu webhook 缺 env** — 只 console.log，不阻塞
5. **TS 5.0.2 < 5.1 推荐版本** — Next.js 警告，不影响 build
6. **Supabase Free 1 周无活动暂停** — Phase 7 Task 7.5 备忘
7. **country / multiselect** — country 字段在 schema 中但未渲染；travelStyle/destinations 用 readonly textarea 占位（待真实 multiselect 组件接入）
8. **package-lock.json** — 已 .gitignore；项目锁定 pnpm

## 下一步（user 上线前必做）

按 `docs/DESIGN.md` §10 + plan Task 7.1 替换清单：
1. 把 Supabase 项目设密码 reset（密码出现在对话历史里）
2. Unsplash key rotate（同样出现过）
3. 配 Vercel env：DATABASE_URL / NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY / SUPABASE_SECRET_KEY / SUPABASE_PROJECT_REF / FEISHU_WEBHOOK_URL / NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY / NEXT_PUBLIC_WHATSAPP_PHONE
4. 把 trust-proofs.ts 中所有 `status: 'mock'` 替换为 `verified` + 上线前再补 country 字段渲染
5. 跑一次 `PRELAUNCH=1 pnpm run prebuild` 看 mock guard 是否 exit 0；之前都是 stub，现在真 guard 由 Phase 6 Task 6.2 完成（注：本夜班未跑 6.2，guard 仍是 stub `console.log + exit 0`）
