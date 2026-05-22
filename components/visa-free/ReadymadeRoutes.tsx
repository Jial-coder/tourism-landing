import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { useLocale } from '@/components/i18n/LocaleProvider';
import { READYMADE_ROUTES, REGION_LABEL } from '@/lib/data/visa-free';

export function ReadymadeRoutes({
  dict,
  locale,
}: {
  dict: ReturnType<typeof useLocale>['t']['home']['visaFree'];
  locale: 'en' | 'zh';
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]">
          {dict.readymade.heading}
        </h2>
        <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
          {dict.readymade.body}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {READYMADE_ROUTES.map((r) => {
          const planHref = `/plan?type=visa-free&port=${encodeURIComponent(r.entryPortSlug)}&stay=240h`;
          const region = locale === 'zh' ? REGION_LABEL[r.region].zh : REGION_LABEL[r.region].en;
          const title = locale === 'zh' ? r.title.zh : r.title.en;
          const oneLine = locale === 'zh' ? r.oneLiner.zh : r.oneLiner.en;
          return (
            <li key={r.slug}>
              <article className="flex h-full flex-col justify-between gap-4 rounded-[10px] bg-paper p-5 ring-1 ring-ink/10">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                      {region}
                    </span>
                    {!r.available && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-medium text-ink/65 ring-1 ring-ink/15">
                        <span aria-hidden className="size-1.5 rounded-full bg-jade" />
                        {dict.readymade.comingSoonBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[17px] font-misans-bold text-ink lg:text-[18px]">{title}</h3>
                  <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                    {oneLine}
                  </p>
                </div>
                <Link
                  href={planHref}
                  className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
                >
                  {dict.readymade.cta} <ArrowRight aria-hidden size={12} />
                </Link>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
