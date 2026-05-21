import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type BestTime,
  type Month,
  MONTH_LABELS,
  MONTH_ORDER,
} from "@/lib/data/destinations";

const TONE: Record<BestTime["months"][Month], string> = {
  best: "bg-jade text-soft-ivory ring-jade/30",
  good: "bg-vermilion-soft text-vermilion-deep ring-vermilion/20",
  avoid: "bg-paper text-ink/45 ring-ink/10",
};

const TONE_LABEL: Record<BestTime["months"][Month], { zh: string; en: string }> = {
  best: { zh: "最佳", en: "Best" },
  good: { zh: "可去", en: "Good" },
  avoid: { zh: "不推荐", en: "Avoid" },
};

export function BestTimeStrip({
  bestTime,
  slug,
  lang = "zh",
}: {
  bestTime: BestTime;
  slug: string;
  lang?: "zh" | "en";
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
        {MONTH_ORDER.map((m) => {
          const tone = bestTime.months[m];
          const label = MONTH_LABELS[m];
          return (
            <Link
              key={m}
              href={`/best-time/${m}`}
              className={cn(
                "group flex flex-col items-center gap-1 rounded-[8px] px-1 py-3 text-center ring-1 transition-colors",
                TONE[tone],
                "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              )}
            >
              <span className="text-[12px] font-misans-bold leading-none lg:text-[13px]">
                {lang === "zh" ? label.zh : label.en}
              </span>
              <span className="text-[10px] font-misans-regular tracking-wide opacity-80 lg:text-[11px]">
                {lang === "zh" ? TONE_LABEL[tone].zh : TONE_LABEL[tone].en}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/75 lg:text-[15px]">
        {lang === "zh" ? bestTime.summary.zh : bestTime.summary.en}
      </p>

      <p className="text-[12px] font-misans-regular text-ink/55">
        <Link
          href="/best-time"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          {lang === "zh" ? "看 12 月份完整建议" : "See full 12-month guide"}
          <ArrowRight aria-hidden size={12} />
        </Link>
        <span className="ml-2 opacity-60">/destinations/{slug}</span>
      </p>
    </div>
  );
}
