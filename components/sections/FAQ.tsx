'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Reveal } from '@/components/motion/Reveal';
import { AccordionItemMotion } from '@/components/motion/AccordionItemMotion';

export function FAQ() {
  const dict = useDictionary();
  const t = dict.home.faq;
  return (
    <section
      id="faq"
      data-feedback-id="HOME-FAQ-01"
      className="bg-paper py-14 sm:py-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col gap-3 text-center">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-vermilion-deep">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </Reveal>

        <Accordion type="single" collapsible className="mt-8 flex flex-col gap-1 md:mt-12">
          {t.items.map((item, idx) => (
            <AccordionItem
              key={item.q}
              value={`item-${idx}`}
              className="rounded-xl border border-ink/10 bg-cream px-4 md:rounded-2xl md:px-5"
            >
              <AccordionTrigger className="py-3 font-serif text-[17px] leading-snug text-ink md:py-4 md:text-xl">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-ink-soft md:text-base">
                <AccordionItemMotion>
                  <p>{item.a}</p>
                </AccordionItemMotion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Reveal>
          <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-12">
            <p className="text-sm text-ink-soft">{t.ctaHint}</p>
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full border border-jade/40 bg-cream px-6 py-2.5 text-sm font-medium text-jade transition-colors hover:bg-jade hover:text-soft-ivory"
            >
              {t.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default FAQ;
