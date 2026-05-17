export default function WorkflowPage() {
  return (
    <article className="space-y-6 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[#C9A65C]">
        流程图 · 占位
      </span>
      <h1 className="font-serif text-[clamp(36px,5vw,64px)] leading-tight text-[#1F4E5C]">
        客户业务流程
      </h1>
      <p className="max-w-2xl leading-relaxed text-[#1A1A1A]/80">
        Day 1 占位。next-ai-draw-io MCP 装好后这里渲染 <code className="rounded bg-[#E8E0D5] px-1">docs/client-workflow.drawio</code> 导出的静态 SVG，节点带 <code className="rounded bg-[#E8E0D5] px-1">feedbackId</code> + <code className="rounded bg-[#E8E0D5] px-1">status</code>，跟 client-progress.json 三方一致。
      </p>
      <div className="rounded-2xl border border-dashed border-[#1F4E5C]/30 bg-[#F8F4EC] px-12 py-24 text-center">
        <p className="text-sm text-[#1A1A1A]/50">
          public/client-workflow.svg 尚未生成
          <br />
          <span className="font-mono text-xs">npm run client:export</span>
        </p>
      </div>
    </article>
  );
}
