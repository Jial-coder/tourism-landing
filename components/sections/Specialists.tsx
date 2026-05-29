'use client';

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

const DESK_CARDS = {
  zh: [
    {
      index: '01',
      title: '北京首回',
      body: '先由北京顾问读你的表单，把月份、人数、预算和最想看的中国拆清楚。',
      meta: '4 小时内人工回复目标',
    },
    {
      index: '02',
      title: '路线编辑',
      body: '把公开目的地、免签规则和你的节奏重新排成一条私人路线草稿。',
      meta: '不套固定套餐',
    },
    {
      index: '03',
      title: '行中后援',
      body: '确认出行后再分配本地向导、司机与应急联系人，避免客服式转交。',
      meta: '按行程阶段交接',
    },
  ],
  en: [
    {
      index: '01',
      title: 'Beijing first reply',
      body: 'A Beijing specialist reads your form first and clarifies month, party size, budget and must-sees.',
      meta: '4h human reply target',
    },
    {
      index: '02',
      title: 'Route editor',
      body: 'Public destinations, visa-free limits and your pace become a private draft route.',
      meta: 'No preset package menu',
    },
    {
      index: '03',
      title: 'On-trip handoff',
      body: 'After confirmation, local guides, drivers and support contacts are assigned by trip stage.',
      meta: 'Stage-based handoff',
    },
  ],
};

export function Specialists() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.specialists;
  const advisors = demoAdvisors();
  const deskCards = DESK_CARDS[locale];

  const marqueeItems =
    advisors.length > 0
      ? advisors.flatMap((a) => [
          a.displayName[locale],
          a.role[locale],
          a.languages.join(' · '),
          a.destinations.join(' · '),
        ])
      : deskCards.flatMap((card) => [card.title, card.meta]);

  return (
    <section
      id="specialists"
      data-feedback-id="HOME-SPECIALISTS-01"
      className="bg-cream py-12 text-ink sm:py-16 lg:py-28"
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

        <div className="hidden border-y border-ink/10 py-3 md:mt-10 md:block">
          <Marquee
            speed={42}
            items={marqueeItems.map((label) => (
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/70">
                {label}
              </span>
            ))}
          />
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-2 md:mt-14 md:grid-cols-3 md:gap-6">
          {advisors.length > 0
            ? advisors.map((advisor, idx) => (
                <li key={advisor.id}>
                  <Reveal delay={idx * 0.1}>
                    <article className="relative flex h-full min-w-0 flex-col items-start gap-2 rounded-xl border border-ink/10 bg-paper p-3 transition-colors hover:border-vermilion/30 hover:bg-paper sm:gap-3 sm:p-5 md:rounded-2xl">
                      <div
                        aria-hidden="true"
                        className="flex size-12 items-center justify-center rounded-full bg-vermilion-soft font-serif text-base tracking-wide text-vermilion-deep ring-1 ring-vermilion/30 sm:size-20 sm:text-2xl"
                      >
                        {initials(advisor.displayName.en)}
                      </div>

                      <div>
                        <h3 className="font-serif text-base leading-snug tracking-tight text-ink sm:text-xl">
                          {advisor.displayName[locale]}
                        </h3>
                        <p className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">
                          {advisor.role[locale]}
                        </p>
                      </div>

                      <ul className="flex flex-wrap gap-1">
                        {advisor.languages.map((lang) => (
                          <li
                            key={lang}
                            className="rounded-full border border-ink/15 bg-cream/60 px-2 py-0.5 text-[10px] font-medium text-ink/80 sm:px-2.5 sm:text-[11px]"
                          >
                            {lang}
                          </li>
                        ))}
                      </ul>

                      <p className="hidden text-[10px] uppercase tracking-wider text-vermilion-deep sm:block sm:text-xs">
                        {advisor.destinations.slice(0, 3).join(' · ')}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))
              : deskCards.map((card, idx) => (
                <li key={card.index}>
                  <Reveal delay={idx * 0.1}>
                    <article className="relative flex h-full min-w-0 flex-col items-start gap-2 rounded-xl border border-ink/10 bg-paper p-3 transition-colors hover:border-vermilion/30 hover:bg-paper sm:gap-3 sm:p-5 md:rounded-2xl">
                      <div
                        aria-hidden="true"
                        className="flex size-10 items-center justify-center rounded-full bg-vermilion-soft font-serif text-sm tracking-wide text-vermilion-deep ring-1 ring-vermilion/30 sm:size-16 sm:text-xl"
                      >
                        {card.index}
                      </div>
                      <div>
                        <h3 className="font-serif text-base leading-snug tracking-tight text-ink sm:text-xl">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs leading-normal text-ink-soft sm:mt-2 sm:text-sm sm:leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                      <p className="mt-auto hidden text-[10px] uppercase tracking-wider text-vermilion-deep sm:block sm:text-xs">
                        {card.meta}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
        </ul>

        <Reveal>
          <div className="mt-6 flex justify-center md:mt-14">
            <a
              href="#lead-form"
              className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-vermilion px-7 py-3 text-sm font-semibold text-soft-ivory shadow-lg shadow-vermilion/25 transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
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
