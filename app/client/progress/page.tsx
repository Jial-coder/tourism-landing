import progress from "@/docs/client-progress.json";

const statusColors: Record<string, string> = {
  planned: "bg-[#E8E0D5] text-[#1A1A1A]/70",
  in_progress: "bg-[#C9A65C]/30 text-[#1F4E5C]",
  ready_for_review: "bg-[#1F4E5C] text-[#F8F4EC]",
  feedback: "bg-[#C13829]/15 text-[#C13829]",
  approved: "bg-[#1F4E5C]/20 text-[#1F4E5C]",
  blocked: "bg-[#C13829] text-[#F8F4EC]",
};

export default function ProgressPage() {
  return (
    <article className="space-y-8 py-16">
      <header className="space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9A65C]">
          进度看板
        </span>
        <h1 className="font-serif text-[clamp(36px,5vw,64px)] leading-tight text-[#1F4E5C]">
          {progress.milestone.name}
          <span className="ml-3 text-2xl text-[#1A1A1A]/50">
            Day {progress.milestone.day}
          </span>
        </h1>
        <p className="text-sm text-[#1A1A1A]/60">
          updated {new Date(progress.updatedAt).toLocaleString()} · by{" "}
          {progress.updatedBy}
        </p>
      </header>

      <div className="space-y-4">
        {progress.blocks.map((block) => (
          <div
            key={block.id}
            className="rounded-2xl border border-[#E8E0D5] bg-white/60 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#C9A65C]">
                    {block.id}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      statusColors[block.status] ?? statusColors.planned
                    }`}
                  >
                    {block.status}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl text-[#1F4E5C]">{block.title}</h2>
                <p className="mt-2 text-sm text-[#1A1A1A]/70">{block.summary}</p>
              </div>
            </div>
            {block.nextAction && (
              <div className="mt-4 rounded-md bg-[#F8F4EC] px-4 py-3 text-sm">
                <span className="font-medium text-[#1F4E5C]">
                  下一步（{block.nextAction.owner} · {block.nextAction.type}）：
                </span>{" "}
                <span className="text-[#1A1A1A]/80">{block.nextAction.text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="rounded-2xl bg-[#1F4E5C] p-6 text-sm text-[#F8F4EC]">
        <p>
          客户验收入口：
          <span className="font-mono">{progress.reviewUrl}</span>
        </p>
        <p className="mt-1 text-[#F8F4EC]/70">
          Cloudflare Tunnel ephemeral URL，每次 dev 重启会变。
        </p>
      </footer>
    </article>
  );
}
