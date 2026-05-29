"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { aboutPageCopy } from "@/lib/data/about-page-copy";

export function PromiseList() {
  const { locale } = useLocale();
  const promises = aboutPageCopy[locale].promise.items;

  return (
    <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
      {promises.map((p) => (
        <li
          key={p.kicker}
          className="flex flex-col gap-2 rounded-[10px] bg-paper p-3 ring-1 ring-ink/10 sm:gap-3 sm:rounded-[14px] sm:p-6"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[10px] font-misans-regular tracking-[0.16em] uppercase text-vermilion sm:text-[12px] sm:tracking-[0.18em]">
              {p.kicker}
            </span>
            <span className="h-px flex-1 bg-ink/15" aria-hidden />
          </div>
          <h3 className="text-[14px] font-misans-bold leading-snug text-ink sm:text-[18px]">
            {p.title}
          </h3>
          <p className="text-[11px] font-misans-regular leading-relaxed text-ink/70 sm:text-[13px] lg:text-[14px]">
            {p.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
