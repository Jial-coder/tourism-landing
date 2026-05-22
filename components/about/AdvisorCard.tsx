import Link from "next/link";
import { MockBadge } from "@/components/trust/MockBadge";
import type { Advisor } from "@/lib/data/advisors";

const BG_CLASSES: Record<NonNullable<Advisor["avatar"]["placeholder"]["bg"]>, string> = {
  vermilion: "bg-vermilion-soft text-vermilion-deep ring-vermilion/25",
  jade: "bg-jade/15 text-jade ring-jade/25",
  gold: "bg-gold/20 text-ink ring-gold/30",
};

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const bg = BG_CLASSES[advisor.avatar.placeholder.bg];
  const waMsg = `Hi ${advisor.name.en.split(" · ")[0]}, I'd like to plan a trip with pandatravel.`;
  const waHref = `https://wa.me/${advisor.whatsappPhone}?text=${encodeURIComponent(waMsg)}`;

  return (
    <article
      id={`advisor-${advisor.slug}`}
      data-status={advisor.status}
      className="flex h-full flex-col gap-5 rounded-[16px] bg-paper p-6 ring-1 ring-ink/10 lg:p-8 scroll-mt-32"
    >
      <header className="flex items-start gap-5">
        <div
          aria-hidden
          className={`flex size-20 flex-none items-center justify-center rounded-full text-[32px] font-misans-heavy ring-1 ${bg}`}
        >
          {advisor.avatar.placeholder.initials}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[20px] font-misans-bold text-ink lg:text-[22px]">
              {advisor.name.zh}
            </h3>
            <MockBadge>真名占位</MockBadge>
          </div>
          <p className="text-[12px] font-misans-regular tracking-[0.16em] uppercase text-jade">
            {advisor.name.en}
          </p>
          <p className="text-[13px] font-misans-regular text-ink/75">
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

      <div className="flex flex-col gap-3 text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
        <p>{advisor.bio.zh}</p>
      </div>

      <div className="rounded-[10px] bg-cream p-4 ring-1 ring-ink/8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            最近一次写过的草稿
          </span>
          <MockBadge>样例占位</MockBadge>
        </div>
        <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75">
          {advisor.caseSnippet.zh}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-ink/8 pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <a
          href={waHref}
          className="inline-flex items-center gap-1.5 rounded-full bg-vermilion px-4 py-2 text-[13px] font-misans-bold text-soft-ivory transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-reduce:transition-none"
        >
          WhatsApp · 直接和 {advisor.name.zh.split(" · ")[0]} 聊
        </a>
        <Link
          href={`/plan?advisor=${advisor.slug}`}
          className="inline-flex items-center text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
        >
          先填一份草稿，让 {advisor.name.zh.split(" · ")[0]} 接手 →
        </Link>
        <span className="text-[11px] font-misans-regular text-ink/70 sm:ml-auto">
          顾问 vlog 占位 · 上线前接入 30s 视频
        </span>
      </div>
    </article>
  );
}
