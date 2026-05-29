"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { reviewsPageCopy } from "@/lib/data/reviews-page-copy";

export function EarlyStatusBanner() {
  const { locale } = useLocale();
  const copy = reviewsPageCopy[locale].status;

  return (
    <div className="rounded-[16px] bg-paper p-6 ring-1 ring-ink/10 lg:p-10">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {copy.eyebrow}
            </span>
          </div>
          <h2 className="text-[24px] font-misans-heavy leading-tight tracking-tight text-ink lg:text-[32px]">
            {copy.heading}
          </h2>
          <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/75 lg:text-[15px]">
            {copy.body}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-[10px] bg-cream p-5 ring-1 ring-ink/10">
          <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
            {copy.meterLabel}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-misans-heavy leading-none text-ink">
              {copy.meterValue}
            </span>
            <span className="text-[13px] font-misans-regular text-ink/65">
              {copy.meterUnit}
            </span>
          </div>
          <p className="text-[12px] font-misans-regular leading-relaxed text-ink/70">
            {copy.meterBody}
          </p>
        </div>
      </div>
    </div>
  );
}
