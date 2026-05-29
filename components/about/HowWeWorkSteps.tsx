"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { aboutPageCopy } from "@/lib/data/about-page-copy";

export function HowWeWorkSteps() {
  const { locale } = useLocale();
  const steps = aboutPageCopy[locale].how.steps;

  return (
    <ol className="grid grid-cols-1 gap-2.5 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {steps.map((s) => (
        <li
          key={s.num}
          className="grid grid-cols-[42px_minmax(0,1fr)] gap-3 rounded-[10px] bg-cream p-3.5 ring-1 ring-ink/10 md:flex md:flex-col md:gap-3 md:rounded-[14px] md:p-6"
        >
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-baseline md:gap-3">
            <span className="text-[30px] font-misans-heavy leading-none text-vermilion md:text-[34px]">
              {s.num}
            </span>
            <span className="text-[9px] font-misans-regular leading-tight tracking-[0.12em] uppercase text-jade md:text-[11px] md:tracking-[0.18em]">
              {s.hint}
            </span>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5 md:gap-3">
            <h3 className="text-[15px] font-misans-bold leading-snug text-ink md:text-[18px]">
              {s.title}
            </h3>
            <p className="text-[12px] font-misans-regular leading-relaxed text-ink/70 md:text-[13px] lg:text-[14px]">
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
