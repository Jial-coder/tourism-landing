import Link from "next/link";
import type { Advisor } from "@/lib/data/advisors";

const BG_CLASSES: Record<NonNullable<Advisor["avatar"]["placeholder"]["bg"]>, string> = {
  vermilion: "bg-vermilion-soft text-vermilion-deep ring-vermilion/30",
  jade: "bg-vermilion-soft text-vermilion-deep ring-vermilion/30",
  gold: "bg-gold/20 text-ink ring-gold/35",
};

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  if (advisor.status === "hidden") return null;

  const bg = BG_CLASSES[advisor.avatar.placeholder.bg];
  const firstName = advisor.name.zh.split(" · ")[0];
  const enFirst = advisor.name.en.split(" · ")[0];
  const waMsg = `Hi ${enFirst}, I'd like to plan a trip with pandatravel.`;
  const waHref = advisor.whatsappPhone
    ? `https://wa.me/${advisor.whatsappPhone}?text=${encodeURIComponent(waMsg)}`
    : null;

  return (
    <article
      id={`advisor-${advisor.slug}`}
      data-status={advisor.status}
      className="flex h-full flex-col gap-6 rounded-[16px] bg-paper p-6 ring-1 ring-ink/10 lg:p-8 scroll-mt-32"
    >
      <header className="flex items-start gap-5">
        <div
          aria-hidden
          className={`flex size-20 lg:size-[120px] flex-none items-center justify-center rounded-full text-[32px] lg:text-[44px] font-misans-heavy ring-1 ${bg}`}
        >
          {advisor.avatar.placeholder.initials}
        </div>
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[22px] lg:text-[26px] font-misans-bold leading-tight text-ink">
              {advisor.name.zh}
            </h3>
          </div>
          <p className="text-[12px] font-misans-regular tracking-[0.16em] uppercase text-jade">
            {advisor.name.en}
          </p>
          <p className="text-[14px] italic font-misans-regular text-ink/70 lg:text-[15px]">
            {advisor.role.zh}
          </p>
        </div>
      </header>

      <ul className="flex flex-wrap gap-1.5">
        {advisor.languages.map((lang) => (
          <li
            key={lang}
            className="rounded-full border border-ink/15 bg-cream px-2.5 py-0.5 text-[11px] font-misans-regular text-ink/70"
          >
            {lang}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 text-[15px] lg:text-[16px] font-misans-regular leading-[1.7] text-ink/85">
        <p>{advisor.bio.zh}</p>
      </div>

      <div className="border-l-4 border-vermilion bg-cream pl-4 pr-4 py-3 ring-1 ring-ink/8 rounded-r-[10px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            最近一次写过的草稿
          </span>
        </div>
        <p className="text-[14px] font-misans-regular leading-relaxed text-ink/80">
          {advisor.caseSnippet.zh}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-ink/8 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {waHref && (
          <a
            href={waHref}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-jade px-5 py-2.5 text-[13px] font-misans-bold text-soft-ivory shadow-sm transition-colors hover:bg-paper hover:text-jade hover:ring-2 hover:ring-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:transition-none"
          >
            WhatsApp · 直接和 {firstName} 聊
          </a>
        )}
        <Link
          href={`/plan?advisor=${advisor.slug}`}
          className="inline-flex items-center text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
        >
          先填一份草稿，让 {firstName} 接手 →
        </Link>
        <span className="text-[11px] font-misans-regular text-ink/70 sm:ml-auto">
          顾问 vlog 占位 · 上线前接入 30s 视频
        </span>
      </div>
    </article>
  );
}
