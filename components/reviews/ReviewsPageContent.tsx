"use client";

import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { ChineseSeal } from "@/components/brand/ChineseSeal";
import { PromiseList } from "@/components/about/PromiseList";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { EarlyStatusBanner } from "@/components/reviews/EarlyStatusBanner";
import { reviewsPageCopy } from "@/lib/data/reviews-page-copy";

export function ReviewsPageContent() {
  const { locale } = useLocale();
  const copy = reviewsPageCopy[locale];

  return (
    <main className="flex-1 bg-cream">
      <section
        aria-labelledby="reviews-hero-title"
        className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
      >
        <SectionInner>
          <div className="flex max-w-[860px] flex-col gap-5">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
              {copy.hero.eyebrow}
            </div>
            <h1
              id="reviews-hero-title"
              className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-ink md:text-[56px] lg:text-[68px]"
            >
              {copy.hero.heading}
            </h1>
            <p className="text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
              {copy.hero.body}
            </p>
          </div>
        </SectionInner>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 z-10 hidden md:block opacity-85"
        >
          <ChineseSeal text="信" size={72} variant="outline" />
        </div>
      </section>

      <section
        aria-labelledby="reviews-status-title"
        className="relative w-full bg-cream py-10 lg:py-16"
      >
        <SectionInner>
          <h2 id="reviews-status-title" className="sr-only">
            {copy.status.srTitle}
          </h2>
          <EarlyStatusBanner />
        </SectionInner>
      </section>

      <section
        aria-labelledby="reviews-promise-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex max-w-[760px] flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {copy.promise.eyebrow}
            </div>
            <h2
              id="reviews-promise-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {copy.promise.heading}
            </h2>
            <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
              {copy.promise.body}
            </p>
          </div>
          <PromiseList />
        </SectionInner>
      </section>

      <section
        aria-labelledby="reviews-proof-needed-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.proofNeeded.eyebrow}
              </div>
              <h2
                id="reviews-proof-needed-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {copy.proofNeeded.heading}
              </h2>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70">
                {copy.proofNeeded.body}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {copy.proofNeeded.items.map((item, index) => (
                <li key={item.title}>
                  <article className="flex h-full flex-col gap-2 rounded-[14px] bg-paper p-5 ring-1 ring-ink/10">
                    <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] font-misans-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                      {item.body}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="reviews-awards-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.awards.eyebrow}
              </div>
              <h2
                id="reviews-awards-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {copy.awards.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-4 rounded-[14px] bg-paper p-6 ring-1 ring-ink/10 lg:p-8">
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/75 lg:text-[15px]">
                {copy.awards.body}
              </p>
              <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                {copy.awards.note}
              </p>
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="reviews-cta-title"
        className="relative w-full bg-paper py-16 lg:py-24 border-t border-ink/10"
      >
        <SectionInner>
          <div className="flex flex-col items-start gap-6 rounded-[16px] bg-cream p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col gap-2">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
                {copy.cta.eyebrow}
              </div>
              <h2
                id="reviews-cta-title"
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
