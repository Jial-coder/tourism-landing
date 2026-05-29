"use client";

import Image from "next/image";
import { ArrowRight, CalendarDays, MapPinned, Route } from "lucide-react";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ItineraryListInteractive } from "@/components/itineraries/ItineraryListInteractive";
import { itineraryPageCopy, type ItineraryEmptyPointIcon } from "@/lib/data/itinerary-page-copy";
import type { Itinerary } from "@/lib/data/itineraries";

const EMPTY_POINT_ICONS: Record<ItineraryEmptyPointIcon, typeof CalendarDays> = {
  calendar: CalendarDays,
  map: MapPinned,
  route: Route,
};

export function ItinerariesPageContent({ items }: { items: Itinerary[] }) {
  const { locale } = useLocale();
  const copy = itineraryPageCopy[locale];
  const hasPublicItineraries = items.length > 0;

  return (
    <main className="flex-1 bg-cream text-ink">
      <section
        aria-labelledby="it-list-hero-title"
        className="relative isolate w-full overflow-hidden bg-deep-slate pt-28 text-soft-ivory md:pt-36"
      >
        <Image
          src="/landmarks/zhangjiajie.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-deep-slate/70 via-deep-slate/40 to-deep-slate/90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-deep-slate/80 via-deep-slate/35 to-transparent"
        />
        <SectionInner className="relative py-20 lg:py-28">
          <div className="flex max-w-[820px] flex-col gap-5">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.22em] text-jade-soft">
              {copy.hero.eyebrow}
            </div>
            <h1
              id="it-list-hero-title"
              className="font-serif text-[40px] leading-[1.05] tracking-tight text-soft-ivory drop-shadow-[0_2px_18px_rgba(15,23,42,0.45)] md:text-[56px] lg:text-[72px]"
            >
              {hasPublicItineraries ? copy.hero.publicHeading : copy.hero.emptyHeading}
            </h1>
            <p className="max-w-[680px] text-[15px] font-misans-regular leading-relaxed text-soft-ivory/78 lg:text-[17px]">
              {hasPublicItineraries ? copy.hero.publicBody : copy.hero.emptyBody}
            </p>
            {!hasPublicItineraries && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CTAPrimary href="/plan" className="h-12 gap-2 px-7">
                  {copy.hero.primaryCta}
                  <ArrowRight aria-hidden size={16} />
                </CTAPrimary>
                <a
                  href="/destinations"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-soft-ivory/30 bg-soft-ivory/10 px-6 text-[14px] font-misans-bold text-soft-ivory backdrop-blur-sm transition-colors hover:bg-soft-ivory/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory/70"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
            )}
          </div>
        </SectionInner>
      </section>

      {hasPublicItineraries ? (
        <section
          aria-labelledby="it-list-grid-title"
          className="relative w-full bg-cream py-10 lg:py-16"
        >
          <SectionInner>
            <h2 id="it-list-grid-title" className="sr-only">
              {copy.grid.srTitle}
            </h2>
            <ItineraryListInteractive items={items} />
          </SectionInner>
        </section>
      ) : (
        <EmptyItineraryStudio copy={copy.emptyStudio} />
      )}

      <section
        aria-labelledby="it-list-cta-title"
        className="relative w-full bg-paper py-16 lg:py-24 border-t border-ink/10"
      >
        <SectionInner>
          <div className="flex flex-col items-start gap-6 rounded-[16px] bg-cream p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="flex flex-col gap-2">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                {copy.cta.eyebrow}
              </div>
              <h2
                id="it-list-cta-title"
                className="text-[24px] lg:text-[32px] font-misans-heavy tracking-tight text-ink"
              >
                {hasPublicItineraries ? copy.cta.publicHeading : copy.cta.emptyHeading}
              </h2>
              <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                {hasPublicItineraries ? copy.cta.publicBody : copy.cta.emptyBody}
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

function EmptyItineraryStudio({
  copy,
}: {
  copy: (typeof itineraryPageCopy)["en"]["emptyStudio"];
}) {
  return (
    <section
      aria-labelledby="it-empty-title"
      className="relative w-full bg-paper py-14 lg:py-20"
    >
      <SectionInner>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-start">
          <div className="max-w-[560px]">
            <p className="text-[12px] font-misans-regular uppercase tracking-[0.22em] text-jade">
              {copy.eyebrow}
            </p>
            <h2
              id="it-empty-title"
              className="mt-4 font-serif text-[32px] leading-tight tracking-tight text-ink md:text-[44px]"
            >
              {copy.heading}
            </h2>
            <p className="mt-4 text-[15px] font-misans-regular leading-relaxed text-ink/72">
              {copy.body}
            </p>
            <CTAPrimary href="/plan" className="mt-8 h-12 gap-2 px-7">
              {copy.cta}
              <ArrowRight aria-hidden size={16} />
            </CTAPrimary>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {copy.points.map((point, index) => {
              const Icon = EMPTY_POINT_ICONS[point.icon];
              return (
                <li key={point.title}>
                  <article className="flex h-full gap-4 rounded-2xl border border-ink/10 bg-cream p-5 shadow-sm">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-vermilion-soft text-vermilion-deep">
                      <Icon aria-hidden size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-misans-bold uppercase tracking-[0.18em] text-vermilion-deep">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-serif text-xl leading-snug text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink/68">
                        {point.body}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </SectionInner>
    </section>
  );
}
