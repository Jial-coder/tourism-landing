'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { listItineraries, type Itinerary, type ItineraryTheme } from '@/lib/data/itineraries';
import { DESTINATIONS, type Destination, type DestinationSlug } from '@/lib/data/destinations';

const THEME_LABELS: Record<ItineraryTheme, { zh: string; en: string }> = {
  'first-time': { zh: '首次入门', en: 'First-time' },
  'visa-free': { zh: '免签', en: 'Visa-free' },
  family: { zh: '家庭', en: 'Family' },
  honeymoon: { zh: '蜜月', en: 'Honeymoon' },
  nature: { zh: '自然', en: 'Nature' },
  culture: { zh: '文化', en: 'Culture' },
  food: { zh: '美食', en: 'Food' },
};

const ROUTE_STARTER_SLUGS: DestinationSlug[] = ['beijing', 'guilin', 'zhangjiajie'];

function pickPrimaryTheme(themes: ItineraryTheme[]): ItineraryTheme {
  // 优先级：visa-free > honeymoon > family > nature > culture > first-time > food
  const priority: ItineraryTheme[] = [
    'visa-free',
    'honeymoon',
    'family',
    'nature',
    'culture',
    'first-time',
    'food',
  ];
  for (const t of priority) {
    if (themes.includes(t)) return t;
  }
  return themes[0];
}

function pitchLine(it: Itinerary, locale: 'zh' | 'en'): string {
  const first = it.glance[0]?.oneLine?.[locale];
  const highlight = it.highlights[0]?.[locale];
  return highlight ?? first ?? '';
}

function starterPitch(dest: Destination, locale: 'zh' | 'en'): string {
  return dest.wowPoints[0]?.[locale] ?? dest.tagline[locale];
}

export function SampleItineraries() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.sampleItineraries;
  const items = listItineraries();
  const routeStarters = ROUTE_STARTER_SLUGS.map((slug) => DESTINATIONS[slug]);
  const starterCta = locale === 'zh' ? '交给顾问定制' : 'Build from this direction';
  const starterMeta =
    locale === 'zh'
      ? '公开目的地 · 按月份、预算和节奏重排'
      : 'Public destination · reshaped by month, budget and pace';

  return (
    <section
      data-feedback-id="HOME-SAMPLE-ITINERARIES-01"
      className="bg-paper py-12 sm:py-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-2 sm:gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-vermilion-deep">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-2xl leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>
            <p className="max-w-2xl text-[13px] leading-normal text-ink-soft sm:text-base sm:leading-relaxed md:text-lg">
              {t.body}
            </p>
          </div>
        </Reveal>

        {items.length === 0 ? (
          <div className="mt-5 flex md:hidden">
            <Link
              href="/plan"
              className="inline-flex h-11 items-center justify-center rounded-full bg-vermilion px-6 text-sm font-semibold text-soft-ivory shadow-lg shadow-vermilion/20 transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              {t.seeAll}
              <ArrowRight className="ml-2" size={14} aria-hidden />
            </Link>
          </div>
        ) : null}

        {items.length > 0 ? (
          <ul className="mt-6 grid gap-2 sm:gap-3 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {items.map((it, idx) => {
            const primaryTheme = pickPrimaryTheme(it.themes);
            const themeLabel = THEME_LABELS[primaryTheme]?.[locale] ?? primaryTheme;
            const pitch = pitchLine(it, locale);
            const monthRange = it.bestMonths.slice(0, 3).join(' / ');
            const href = `/itineraries/${it.slug}`;
            const daysLabel = locale === 'zh' ? '天' : 'days';
            const priceLabel = locale === 'zh'
              ? `USD ${it.priceFromUsd.toLocaleString()} 起`
              : `From USD ${it.priceFromUsd.toLocaleString()}`;
            const monthLabel = locale === 'zh'
              ? `${monthRange}`
              : `${monthRange}`;

            return (
              <li key={it.slug}>
                <Reveal delay={idx * 0.08}>
                  <Link
                    href={href}
                    className="group flex h-full flex-row overflow-hidden rounded-xl bg-cream ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:flex-col md:rounded-2xl"
                  >
                    <div className="relative aspect-[1/1] w-24 shrink-0 overflow-hidden bg-deep-slate sm:w-28 md:aspect-[4/3] md:w-full">
                      <Image
                        src={it.hero.src}
                        alt={it.hero.alt[locale]}
                        fill
                        sizes="(min-width:1024px) 360px, (min-width:768px) 50vw, 112px"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                      />
                      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 truncate rounded-full bg-soft-ivory/90 px-1.5 py-0.5 text-[9px] font-misans-bold tracking-[0.1em] uppercase text-ink md:left-4 md:top-4 md:max-w-none md:px-3 md:py-1 md:text-[11px] md:tracking-[0.18em]">
                        {themeLabel}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:p-4 md:gap-3 md:p-6">
                      <h3 className="font-serif text-[15px] leading-snug tracking-tight text-ink sm:text-lg md:text-2xl">
                        {it.title[locale]}
                      </h3>

                      {pitch ? (
                        <p className="line-clamp-2 text-[12px] font-misans-regular leading-normal text-ink/70 sm:text-[13px] md:line-clamp-none md:text-[14px] md:leading-relaxed">
                          {pitch}
                        </p>
                      ) : null}

                      <p className="mt-1 hidden flex-wrap items-baseline gap-x-2 gap-y-1 text-[12px] font-misans-regular text-ink/65 sm:flex md:gap-x-3 md:text-[13px]">
                        <span className="font-misans-bold text-ink/85">
                          {it.days} {daysLabel}
                        </span>
                        <span aria-hidden>·</span>
                        <span className="font-misans-bold text-vermilion">{priceLabel}</span>
                        <span aria-hidden>·</span>
                        <span>{monthLabel}</span>
                      </p>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-1.5 text-[11px] font-misans-bold text-jade group-hover:underline underline-offset-4 sm:pt-2 sm:text-[12px] md:pt-3 md:text-[13px]">
                        {t.cta}
                        <ArrowRight aria-hidden size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
          </ul>
        ) : (
          <ul className="mt-6 grid gap-2 sm:gap-3 md:mt-16 md:grid-cols-3 md:gap-6">
            {routeStarters.map((dest, idx) => (
              <li key={dest.slug}>
                <Reveal delay={idx * 0.08}>
                  <Link
                    href={`/plan?destination=${dest.slug}`}
                    className="group flex h-full flex-row overflow-hidden rounded-xl bg-cream ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:flex-col md:rounded-2xl"
                  >
                    <div className="relative aspect-[1/1] w-24 shrink-0 overflow-hidden bg-deep-slate sm:w-28 md:aspect-[4/3] md:w-full">
                      <Image
                        src={dest.hero.src}
                        alt={dest.hero.alt[locale]}
                        fill
                        sizes="(min-width:1024px) 360px, (min-width:768px) 50vw, 112px"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep-slate/70 to-transparent"
                      />
                      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 truncate rounded-full bg-soft-ivory/90 px-1.5 py-0.5 text-[9px] font-misans-bold tracking-[0.1em] uppercase text-ink md:left-4 md:top-4 md:max-w-none md:px-3 md:py-1 md:text-[11px] md:tracking-[0.18em]">
                        {locale === 'zh' ? dest.cn : dest.en}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:p-4 md:gap-3 md:p-6">
                      <h3 className="font-serif text-[15px] leading-snug tracking-tight text-ink sm:text-lg md:text-2xl">
                        {dest.tagline[locale]}
                      </h3>
                      <p className="line-clamp-2 text-[12px] font-misans-regular leading-normal text-ink/70 sm:text-[13px] md:line-clamp-none md:text-[14px] md:leading-relaxed">
                        {starterPitch(dest, locale)}
                      </p>
                      <p className="hidden text-[12px] font-misans-regular text-ink/65 sm:block md:text-[13px]">
                        {starterMeta}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-1.5 text-[11px] font-misans-bold text-jade group-hover:underline underline-offset-4 sm:pt-2 sm:text-[12px] md:pt-3 md:text-[13px]">
                        {starterCta}
                        <ArrowRight aria-hidden size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex justify-center md:mt-10">
          <Link
            href={items.length > 0 ? '/itineraries' : '/plan'}
            className="hidden items-center gap-1.5 rounded-sm text-[14px] font-misans-bold text-ink underline-offset-4 hover:text-jade hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper md:inline-flex"
          >
            {t.seeAll}
            <ArrowRight aria-hidden size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SampleItineraries;
