"use client";

import Link from "next/link";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { ChineseSeal } from "@/components/brand/ChineseSeal";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { aboutPageCopy } from "@/lib/data/about-page-copy";
import { PromiseList } from "@/components/about/PromiseList";
import { HowWeWorkSteps } from "@/components/about/HowWeWorkSteps";

export function AboutPageContent() {
  const { locale } = useLocale();
  const copy = aboutPageCopy[locale];

  return (
    <main className="flex-1 bg-cream">
      <section
        aria-labelledby="about-hero-title"
        className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
      >
        <SectionInner>
          <div className="flex max-w-[860px] flex-col gap-5">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
              {copy.hero.eyebrow}
            </div>
            <h1
              id="about-hero-title"
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
          <ChineseSeal text="和" size={72} variant="outline" />
        </div>
      </section>

      <section
        aria-labelledby="about-origin-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.origin.eyebrow}
              </div>
              <h2
                id="about-origin-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {copy.origin.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-4 text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
              {copy.origin.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="about-promise-title"
        className="relative w-full bg-paper py-12 lg:py-24"
      >
        <SectionInner>
          <div className="mb-6 flex max-w-[760px] flex-col gap-2.5 lg:mb-14 lg:gap-3">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {copy.promise.eyebrow}
            </div>
            <h2
              id="about-promise-title"
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
        aria-labelledby="about-how-title"
        className="relative w-full bg-cream py-12 lg:py-24"
      >
        <SectionInner>
          <div className="mb-6 flex max-w-[760px] flex-col gap-2.5 lg:mb-14 lg:gap-3">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {copy.how.eyebrow}
            </div>
            <h2
              id="about-how-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {copy.how.heading}
            </h2>
            <p className="text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
              {copy.how.body}
            </p>
          </div>
          <HowWeWorkSteps />
        </SectionInner>
      </section>

      <section
        aria-labelledby="about-pricing-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.pricing.eyebrow}
              </div>
              <h2
                id="about-pricing-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {copy.pricing.heading}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
                {copy.pricing.body}
              </p>
              <ul className="grid grid-cols-1 gap-3">
                {copy.pricing.rows.map((row) => (
                  <PriceRow
                    key={row.marker}
                    marker={row.marker}
                    label={row.label}
                    body={row.body}
                  />
                ))}
              </ul>
              <p className="text-[12px] font-misans-regular leading-relaxed text-ink/70">
                {copy.pricing.note}
              </p>
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        id="team"
        aria-labelledby="about-cta-title"
        className="relative w-full scroll-mt-32 bg-cream py-16 lg:py-24 border-t border-ink/10"
      >
        <SectionInner>
          <div
            id="contact"
            className="flex scroll-mt-32 flex-col items-start gap-6 rounded-[16px] bg-paper p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.cta.eyebrow}
              </div>
              <h2
                id="about-cta-title"
                className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
              >
                {copy.cta.heading}
              </h2>
              <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                {copy.cta.body}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTAPrimary href="/plan" className="h-12 px-7">
                {copy.cta.primary}
              </CTAPrimary>
              <Link
                href="#about-how-title"
                className="inline-flex h-12 items-center justify-center rounded-full bg-paper px-7 text-[14px] font-misans-bold text-ink ring-1 ring-ink/15 transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream motion-reduce:transition-none"
              >
                {copy.cta.secondary}
              </Link>
            </div>
          </div>
        </SectionInner>
      </section>
    </main>
  );
}

function PriceRow({
  marker,
  label,
  body,
}: {
  marker: string;
  label: string;
  body: string;
}) {
  return (
    <li className="grid grid-cols-[88px_1fr] items-baseline gap-4 rounded-[10px] bg-cream p-4 ring-1 ring-ink/8">
      <span className="text-[14px] font-misans-heavy text-vermilion lg:text-[16px]">
        {marker}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-misans-bold text-ink">{label}</span>
        <span className="text-[12px] font-misans-regular leading-relaxed text-ink/65 lg:text-[13px]">
          {body}
        </span>
      </div>
    </li>
  );
}
