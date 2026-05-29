"use client";

import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { DestinationListInteractive } from "@/components/destinations/DestinationListInteractive";
import { destinationPageCopy } from "@/lib/data/destination-page-copy";
import type { Destination } from "@/lib/data/destinations";

export function DestinationsListPageContent({
  items,
}: {
  items: Destination[];
}) {
  const { locale } = useLocale();
  const copy = destinationPageCopy[locale];

  return (
    <main className="flex-1 bg-cream">
      <section
        aria-labelledby="dest-list-hero-title"
        className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
      >
        <SectionInner>
          <div className="flex max-w-[820px] flex-col gap-5">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {copy.hero.eyebrow}
            </div>
            <h1
              id="dest-list-hero-title"
              className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-ink md:text-[56px] lg:text-[72px]"
            >
              {copy.hero.heading}
            </h1>
            <p className="text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
              {copy.hero.body}
            </p>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="dest-list-grid-title"
        className="relative w-full bg-cream py-10 lg:py-16"
      >
        <SectionInner>
          <h2 id="dest-list-grid-title" className="sr-only">
            {copy.grid.srTitle}
          </h2>
          <DestinationListInteractive items={items} />
        </SectionInner>
      </section>

      <section
        aria-labelledby="dest-list-why-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
            <div className="flex flex-col gap-4">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.why.eyebrow}
              </div>
              <h2
                id="dest-list-why-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {copy.why.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
              {copy.why.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === copy.why.paragraphs.length - 1 ? "text-[13px] text-ink/70" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="dest-list-cta-title"
        className="relative w-full bg-cream py-16 lg:py-24 border-t border-ink/10"
      >
        <SectionInner>
          <div className="flex flex-col items-start gap-6 rounded-[16px] bg-paper p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col gap-2">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.cta.eyebrow}
              </div>
              <h2
                id="dest-list-cta-title"
                className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
              >
                {copy.cta.heading}
              </h2>
              <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                {copy.cta.body}
              </p>
            </div>
            <CTAPrimary href="/plan" className="h-12 px-7">
              {copy.cta.button}
            </CTAPrimary>
          </div>
        </SectionInner>
      </section>
    </main>
  );
}
