'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useDictionary } from '@/components/i18n/LocaleProvider';

export function VisaFreeBanner() {
  const dict = useDictionary();
  const t = dict.home.visaFreeBanner;

  return (
    <section
      data-feedback-id="HOME-VISA-FREE-BANNER-01"
      aria-labelledby="visa-free-banner-headline"
      className="bg-vermilion-soft"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-3 px-6 py-5 lg:flex-row lg:items-center lg:gap-8 lg:px-10 lg:py-6">
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-vermilion-deep">
            {t.eyebrow}
          </p>
          <h2
            id="visa-free-banner-headline"
            className="text-[15px] font-misans-bold leading-snug text-ink lg:text-[17px]"
          >
            {t.headline}
          </h2>
          <p className="max-w-2xl text-[13px] leading-relaxed text-ink-soft lg:text-sm">
            {t.body}
          </p>
        </div>
        <Link
          href="/visa-free"
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-vermilion/40 bg-soft-ivory px-5 text-[13px] font-misans-bold text-vermilion-deep shadow-sm motion-safe:transition-colors motion-safe:duration-150 motion-reduce:transition-none hover:bg-vermilion hover:text-soft-ivory hover:border-vermilion focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-vermilion-soft"
        >
          {t.cta}
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export default VisaFreeBanner;
