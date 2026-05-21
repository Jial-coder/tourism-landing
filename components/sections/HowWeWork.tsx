'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';

export function HowWeWork() {
  const dict = useDictionary();
  const t = dict.home.howWeWork;

  return (
    <section
      data-feedback-id="HOME-HOW-WE-WORK-01"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {t.eyebrow}
            </p>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-12 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {t.steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.1}>
                <article className="rounded-2xl border border-ink/10 bg-paper p-8 transition-colors hover:border-ink/20">
                  <div className="font-serif text-5xl leading-none text-jade tabular-nums">
                    <span style={{ fontWeight: 700 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl leading-snug tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-12 flex justify-center md:mt-16">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full bg-jade px-7 py-3 text-sm font-semibold text-cream shadow-md shadow-jade/15 transition-colors hover:bg-jade-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
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
