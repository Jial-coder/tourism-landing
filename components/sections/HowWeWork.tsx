'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';

export function HowWeWork() {
  const dict = useDictionary();
  const t = dict.home.howWeWork;

  return (
    <section
      data-feedback-id="HOME-HOW-WE-WORK-01"
      className="bg-cream py-14 sm:py-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-vermilion-deep">
              {t.eyebrow}
            </p>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-8 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-vermilion/30 via-ink/10 to-jade/40 md:left-8 md:right-8 md:top-9 md:h-px md:w-auto md:bg-gradient-to-r"
          />
          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            {t.steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.1}>
                <article className="relative min-h-[132px] rounded-xl border border-ink/10 bg-paper/85 p-4 pl-16 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.55)] transition-colors hover:border-vermilion/30 md:min-h-[260px] md:p-7">
                  <div className="absolute left-0 top-4 flex h-10 w-10 -translate-x-0 items-center justify-center rounded-full border border-vermilion/25 bg-cream font-serif text-xl leading-none text-vermilion tabular-nums shadow-[0_10px_24px_-14px_rgba(195,63,35,0.65)] md:static md:mb-8 md:h-12 md:w-12 md:text-2xl">
                    <span style={{ fontWeight: 700 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl leading-snug tracking-tight text-ink md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft md:mt-3 md:text-[15px]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-8 flex justify-start md:mt-16 md:justify-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-vermilion px-7 py-3 text-sm font-semibold text-soft-ivory shadow-lg shadow-vermilion/25 transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            >
              {t.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default HowWeWork;
