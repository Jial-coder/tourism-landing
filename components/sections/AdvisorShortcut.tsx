'use client';

import { ArrowRight, Clock3, Map, MessageCircle } from 'lucide-react';
import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';

const icons = [Clock3, Map, MessageCircle];

export function AdvisorShortcut() {
  const dict = useDictionary();
  const t = dict.home.advisorShortcut;

  return (
    <section
      data-feedback-id="HOME-ADVISOR-SHORTCUT-01"
      className="border-y border-ink/10 bg-paper text-ink"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-6 md:gap-8 md:py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-10 lg:py-10">
        <Reveal>
          <div className="flex flex-col gap-2.5 md:gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {t.eyebrow}
            </p>
            <h2 className="max-w-3xl font-serif text-2xl leading-tight tracking-tight text-ink md:text-4xl">
              {t.heading}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
              {t.body}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 lg:flex-col lg:items-stretch">
            <a
              href="/plan"
              className="inline-flex h-11 items-center justify-center rounded-full bg-vermilion px-4 text-center text-sm font-semibold text-soft-ivory shadow-lg shadow-vermilion/20 transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-12 sm:px-7"
            >
              {t.primaryCta}
              <ArrowRight className="ml-2" size={14} aria-hidden />
            </a>
            <a
              href="#lead-form"
              className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-4 text-center text-sm font-semibold text-ink transition-colors hover:border-jade hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:h-12 sm:px-7"
            >
              {t.secondaryCta}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-2">
          <ul className="grid gap-2 border-t border-ink/10 pt-4 md:grid-cols-3 md:gap-3 md:pt-6">
            {t.points.map((point, idx) => {
              const Icon = icons[idx] ?? Clock3;
              return (
                <li key={point.title} className="flex items-start gap-2.5 md:gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-jade/10 text-jade md:size-9"
                  >
                    <Icon size={16} />
                  </span>
                  <span className="flex flex-col gap-0.5 md:gap-1">
                    <span className="text-sm font-semibold text-ink">{point.title}</span>
                    <span className="text-[13px] leading-snug text-ink-soft md:text-sm md:leading-relaxed">
                      {point.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default AdvisorShortcut;
