'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { HeroParallax } from '@/components/motion/HeroParallax';
import { HeroBackdrop } from '@/components/motion/HeroBackdrop';
import { MagneticCta } from '@/components/motion/MagneticCta';

export function HomeHero() {
  const dict = useDictionary();
  const t = dict.home.hero;

  return (
    <section
      data-feedback-id="HOME-HERO-01"
      className="relative isolate overflow-hidden bg-deep-slate text-soft-ivory min-h-[88svh] md:min-h-screen"
    >
      <HeroParallax>
        <HeroBackdrop src="/landmarks/hero-gen/v4-a.webp" />
      </HeroParallax>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-deep-slate/70 via-deep-slate/40 to-deep-slate/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-deep-slate/70 via-deep-slate/15 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[88svh] md:min-h-screen w-full max-w-6xl flex-col justify-center px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex max-w-3xl flex-col gap-6 lg:gap-8">
          <Reveal delay={0}>
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade-soft">
              {t.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl md:leading-[1.02] text-soft-ivory drop-shadow-[0_2px_18px_rgba(15,23,42,0.55)]">
              {t.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="max-w-2xl text-base leading-relaxed text-soft-ivory/80 md:text-lg">
              {t.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <MagneticCta>
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-full bg-jade px-7 py-3 text-sm font-semibold text-soft-ivory shadow-lg shadow-jade/20 transition-colors hover:bg-jade-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade-soft focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
                >
                  {t.primaryCta}
                </a>
              </MagneticCta>
              <a
                href="#specialists"
                className="inline-flex items-center justify-center rounded-full border border-soft-ivory/30 bg-soft-ivory/5 px-7 py-3 text-sm font-medium text-soft-ivory backdrop-blur-sm transition-colors hover:border-soft-ivory/60 hover:bg-soft-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory/60"
              >
                {t.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
