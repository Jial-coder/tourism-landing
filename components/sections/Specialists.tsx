'use client';

import { MockBadge } from '@/components/trust/MockBadge';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { demoAdvisors } from '@/lib/data/trust-proofs';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);

export function Specialists() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.specialists;
  const advisors = demoAdvisors();

  const marqueeItems = advisors.flatMap((a) => [
    a.displayName[locale],
    a.role[locale],
    a.languages.join(' · '),
    a.destinations.join(' · '),
  ]);

  return (
    <section
      id="specialists"
      data-feedback-id="HOME-SPECIALISTS-01"
      className="bg-deep-slate py-20 text-soft-ivory lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade-soft">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-soft-ivory md:text-5xl">
              {t.heading}
            </h2>
            <p className="text-base leading-relaxed text-soft-ivory/75 md:text-lg">{t.body}</p>
          </div>
        </Reveal>

        <div className="mt-10 border-y border-soft-ivory/10 py-4">
          <Marquee
            speed={42}
            items={marqueeItems.map((label) => (
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-soft-ivory/55">
                {label}
              </span>
            ))}
          />
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-6 md:mt-16 md:grid-cols-4">
          {advisors.map((advisor, idx) => (
            <li key={advisor.id}>
              <Reveal delay={idx * 0.1}>
                <article className="relative flex h-full flex-col items-start gap-4 rounded-2xl border border-soft-ivory/10 bg-soft-ivory/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-jade-soft/40 hover:bg-soft-ivory/[0.06]">
                  <MockBadge className="absolute right-4 top-4 bg-gold/15 text-soft-ivory ring-gold/30">
                    demo
                  </MockBadge>

                  <div
                    aria-hidden="true"
                    className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-deep-slate via-jade/40 to-jade-soft font-serif text-2xl tracking-wide text-soft-ivory ring-1 ring-soft-ivory/15"
                  >
                    {initials(advisor.displayName.en)}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl leading-snug tracking-tight text-soft-ivory">
                      {advisor.displayName[locale]}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-soft-ivory/70">
                      {advisor.role[locale]}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-1.5">
                    {advisor.languages.map((lang) => (
                      <li
                        key={lang}
                        className="rounded-full border border-soft-ivory/20 bg-soft-ivory/5 px-2.5 py-0.5 text-[11px] font-medium text-soft-ivory/85"
                      >
                        {lang}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs uppercase tracking-wider text-jade-soft">
                    {advisor.destinations.slice(0, 3).join(' · ')}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="mt-12 flex justify-center md:mt-16">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-jade px-7 py-3 text-sm font-semibold text-soft-ivory shadow-lg shadow-jade/20 transition-colors hover:bg-jade-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-soft focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
            >
              {t.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Specialists;
