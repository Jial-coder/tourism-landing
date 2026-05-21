'use client';

import { useRef } from 'react';
import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { NumberTicker } from '@/components/motion/NumberTicker';
import { AnimatedBeam } from '@/components/motion/AnimatedBeam';

export function HowWeWork() {
  const dict = useDictionary();
  const t = dict.home.howWeWork;

  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const stepRefs = [step1Ref, step2Ref, step3Ref];

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

        <div ref={containerRef} className="relative mt-12 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {t.steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 0.1}>
                <article
                  ref={stepRefs[idx]}
                  className="rounded-2xl border border-ink/10 bg-paper p-8 transition-colors hover:border-ink/20"
                >
                  <div className="font-serif text-5xl leading-none text-jade tabular-nums">
                    <NumberTicker
                      value={idx + 1}
                      prefix="0"
                      duration={0.8}
                    />
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden md:block"
          >
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              curvature={-30}
              duration={2.6}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              curvature={-30}
              duration={2.6}
              delay={0.6}
            />
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
