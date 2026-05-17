export default function WorkflowPage() {
  return (
    <article className="space-y-6 py-12">
      <header className="space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-[#C9A65C]">
          客户业务流程 · CLIENT WORKFLOW
        </span>
        <h1
          className="text-[clamp(36px,5vw,64px)] leading-tight text-[#1F4E5C]"
          style={{ fontFamily: '"Noto Serif SC", serif' }}
        >
          从浏览到留资
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[#1A1A1A]/75">
          客户在 portal 上的完整路径，每个节点带 <code className="rounded bg-[#E8E0D5] px-1 text-xs">data-feedback-id</code>{" "}
          与 client-progress.json / DESIGN.md 三方一致校验。源文件{" "}
          <code className="rounded bg-[#E8E0D5] px-1 text-xs">docs/client-workflow.drawio</code>， 用{" "}
          <code className="rounded bg-[#E8E0D5] px-1 text-xs">npm run client:export</code> 重新导出 SVG。
        </p>
      </header>

      <div className="rounded-2xl border border-[#E8E0D5] bg-[#F8F4EC] p-6 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/client-workflow.svg"
          alt="客户业务流程图：客户首次到访 → HERO 浏览 → 行程卡片 → 价格区 → 选择（表单 / 聊天）→ 联系方式入库"
          className="w-full"
        />
      </div>

      <section className="border-t border-[#E8E0D5] pt-6 text-sm text-[#1A1A1A]/70">
        <h2 className="mb-3 font-semibold text-[#1F4E5C]">节点状态</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <StatusItem id="ENTRY" status="approved" label="客户首次到访" />
          <StatusItem id="HERO-01" status="ready_for_review" label="HERO 浏览" />
          <StatusItem id="ITIN-01" status="planned" label="行程卡片" />
          <StatusItem id="PRICE-01" status="planned" label="价格区" />
          <StatusItem id="FORM-01" status="planned" label="询价表单" />
          <StatusItem id="CHAT-01" status="planned" label="在线聊聊（Day 6）" />
          <StatusItem id="LEAD" status="planned" label="入库销售跟进" />
        </div>
      </section>
    </article>
  );
}

function StatusItem({ id, status, label }: { id: string; status: string; label: string }) {
  const colors: Record<string, string> = {
    planned: "bg-[#E8E0D5] text-[#1A1A1A]/70",
    in_progress: "bg-[#C9A65C]/30 text-[#1F4E5C]",
    ready_for_review: "bg-[#1F4E5C] text-[#F8F4EC]",
    approved: "bg-[#1F4E5C]/20 text-[#1F4E5C]",
  };
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#E8E0D5] bg-white/40 px-3 py-2 text-sm">
      <div>
        <div className="font-mono text-xs text-[#C9A65C]">{id}</div>
        <div className="text-[#1A1A1A]/85">{label}</div>
      </div>
      <span className={`rounded-full px-2 py-0.5 text-[10px] ${colors[status] ?? colors.planned}`}>
        {status}
      </span>
    </div>
  );
}
