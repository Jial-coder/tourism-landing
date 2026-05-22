import Image from 'next/image';
import Link from 'next/link';
import { TopNav } from '@/components/chrome/TopNav';
import { Footer } from '@/components/sections/Footer';
import { SectionInner } from '@/components/atoms/SectionContainer';
import { CTAPrimary } from '@/components/atoms/CTAGhost';
import { ChineseSeal } from '@/components/brand/ChineseSeal';
import { DecisionTool } from '@/components/visa-free/DecisionTool';
import { QuickContactCard } from '@/components/visa-free/QuickContactCard';
import {
  VisaFreeBackHome,
  VisaFreeCaveats,
  VisaFreeCaveatsHeading,
  VisaFreeHeroCopy,
  VisaFreeHeroLastReviewedLabel,
  VisaFreeHeroSourceLabel,
  VisaFreeReadymade,
  VisaFreeSectionLabel,
  VisaFreeTailorBody,
  VisaFreeTailorCta,
  VisaFreeTailorHeading,
} from './VisaFreePageClient';
import { NIA_REVIEWED, SOURCE_URL } from '@/lib/data/visa-free';

export const metadata = {
  title: '240h transit visa-free China · pandatravel',
  description:
    'Pick a passport, a port and where you fly to next. We tell you in plain language whether you qualify for the 240-hour transit visa-free programme.',
};

export default function VisaFreePage() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        {/* 1. Hero — 唯一暗段保留作为视觉锚 */}
        <section
          aria-labelledby="visa-free-hero-title"
          className="relative w-full min-h-[55vh] md:min-h-[60vh] overflow-hidden bg-deep-slate"
        >
          <div className="absolute inset-0">
            <Image
              src="/landmarks/beijing.jpg"
              alt="北京天际线 — 240 小时过境免签的常用入境枢纽 / Beijing skyline, a common 240h transit entry hub"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-deep-slate via-charcoal-blue/55 to-charcoal-blue/15"
          />
          <SectionInner className="relative pt-[140px] pb-16 md:pt-[160px] md:pb-20 flex flex-col justify-end min-h-[55vh] md:min-h-[60vh]">
            <VisaFreeHeroCopy />
            <p className="mt-6 text-[12px] font-misans-regular tracking-[0.14em] uppercase text-soft-ivory/65">
              <a
                href={SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                <VisaFreeHeroSourceLabel />
              </a>{' '}
              · <VisaFreeHeroLastReviewedLabel /> {NIA_REVIEWED}
            </p>
          </SectionInner>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 right-6 z-10 hidden md:block opacity-85"
          >
            <ChineseSeal text="客" size={72} variant="solid" />
          </div>
        </section>

        {/* 2. Decision Tool */}
        <section
          aria-labelledby="visa-free-tool-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <h2 id="visa-free-tool-title" className="sr-only">
              Visa-free decision tool
            </h2>
            <DecisionTool />
          </SectionInner>
        </section>

        {/* 3. Caveats */}
        <section
          aria-labelledby="visa-free-caveats-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                <VisaFreeSectionLabel which="caveats" />
              </span>
              <h2
                id="visa-free-caveats-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                <VisaFreeCaveatsHeading />
              </h2>
            </div>
            <VisaFreeCaveats />
          </SectionInner>
        </section>

        {/* 4. Ready-made routes */}
        <section
          aria-labelledby="visa-free-readymade-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div id="visa-free-readymade-title" />
            <VisaFreeReadymade />
          </SectionInner>
        </section>

        {/* 5. Quick contact */}
        <section
          aria-labelledby="visa-free-contact-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div id="visa-free-contact-title" />
            <QuickContactCard />
          </SectionInner>
        </section>

        {/* 6. Tailor-Make CTA */}
        <section
          aria-labelledby="visa-free-tailor-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-8 rounded-[12px] bg-paper p-6 ring-1 ring-ink/10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:p-10">
              <div className="flex flex-col gap-3">
                <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  <VisaFreeSectionLabel which="tailor" />
                </span>
                <h2
                  id="visa-free-tailor-title"
                  className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
                >
                  <VisaFreeTailorHeading />
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/75">
                  <VisaFreeTailorBody />
                </p>
              </div>
              <div className="flex flex-col items-start gap-3" id="not-on-list">
                <CTAPrimary href="/plan?type=visa-free" className="h-11">
                  <VisaFreeTailorCta />
                </CTAPrimary>
                <Link
                  href="/"
                  className="text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
                >
                  ← <VisaFreeBackHome />
                </Link>
              </div>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}
