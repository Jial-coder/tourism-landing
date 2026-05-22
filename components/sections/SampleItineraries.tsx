'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MockBadge } from '@/components/trust/MockBadge';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { ITINERARIES, ITINERARY_SLUGS, type Itinerary, type ItineraryTheme } from '@/lib/data/itineraries';

const THEME_LABELS: Record<ItineraryTheme, { zh: string; en: string }> = {
  'first-time': { zh: '首次入门', en: 'First-time' },
  'visa-free': { zh: '免签', en: 'Visa-free' },
  family: { zh: '家庭', en: 'Family' },
  honeymoon: { zh: '蜜月', en: 'Honeymoon' },
  nature: { zh: '自然', en: 'Nature' },
  culture: { zh: '文化', en: 'Culture' },
  food: { zh: '美食', en: 'Food' },
};

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

export function SampleItineraries() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.sampleItineraries;
  const items = ITINERARY_SLUGS.map((slug) => ITINERARIES[slug]).filter(Boolean) as Itinerary[];

  return (
    <section
      data-feedback-id="HOME-SAMPLE-ITINERARIES-01"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-vermilion-deep">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {t.heading}
            </h2>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">{t.body}</p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
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
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep-slate">
                      <Image
                        src={it.hero.src}
                        alt={it.hero.alt[locale]}
                        fill
                        sizes="(min-width:1024px) 360px, (min-width:768px) 50vw, 100vw"
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-soft-ivory/90 px-3 py-1 text-[11px] font-misans-bold tracking-[0.18em] uppercase text-ink">
                        {themeLabel}
                      </span>
                      <span className="absolute right-4 top-4">
                        <MockBadge>样板</MockBadge>
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="font-serif text-2xl leading-snug tracking-tight text-ink">
                        {it.title[locale]}
                      </h3>

                      {pitch ? (
                        <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70">
                          {pitch}
                        </p>
                      ) : null}

                      <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px] font-misans-regular text-ink/65">
                        <span className="font-misans-bold text-ink/85">
                          {it.days} {daysLabel}
                        </span>
                        <span aria-hidden>·</span>
                        <span className="font-misans-bold text-vermilion">{priceLabel}</span>
                        <span aria-hidden>·</span>
                        <span>{monthLabel}</span>
                      </p>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-misans-bold text-jade group-hover:underline underline-offset-4">
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

        <div className="mt-10 flex justify-center">
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-1.5 text-[14px] font-misans-bold text-ink underline-offset-4 hover:text-jade hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
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
