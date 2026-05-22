'use client';

import Image from 'next/image';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { CardStack } from '@/components/motion/CardStack';

export function DestinationGrid() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.destinations;
  const planLabel = locale === 'zh' ? '定制前往' : 'Plan a trip to';

  return (
    <section
      data-feedback-id="HOME-DESTINATIONS-01"
      className="bg-cream py-20 lg:py-28"
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

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {t.items.map((item) => (
            <li key={item.slug}>
              <CardStack className="h-full" hoverScale={1.015}>
                <a
                  href={`/destinations/${item.slug}`}
                  aria-label={`${planLabel} ${item.name}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_8px_24px_-8px_rgba(15,23,42,0.18)] ring-1 ring-ink/10 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade hover:shadow-xl hover:ring-jade/40"
                >
                  <Image
                    src={`/landmarks/${item.slug}.jpg`}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-deep-slate/85 via-deep-slate/20 to-deep-slate/0"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 z-10 h-1 bg-jade/0 transition-colors duration-300 group-hover:bg-jade"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                    <h3 className="font-serif text-2xl leading-tight tracking-tight text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.5)] transition-transform duration-400 ease-out group-hover:-translate-y-1">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-snug text-soft-ivory/85">{item.hook}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-jade-soft transition-opacity duration-300 motion-safe:opacity-0 motion-safe:group-hover:opacity-100 motion-reduce:opacity-100">
                      {planLabel} {item.name} →
                    </p>
                  </div>
                </a>
              </CardStack>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DestinationGrid;
