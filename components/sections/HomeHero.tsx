'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { HeroParallax } from '@/components/motion/HeroParallax';
import { HeroBackdrop } from '@/components/motion/HeroBackdrop';
import { MagneticCta } from '@/components/motion/MagneticCta';
import { ContactChannelList } from '@/components/contact/ContactChannelList';
import { MockBadge } from '@/components/trust/MockBadge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function HomeHero() {
  const dict = useDictionary();
  const t = dict.home.hero;
  const anchor = t.anchorCard;

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
          <Reveal delay={0.25}>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <MagneticCta>
                <a
                  href="#lead-form"
                  className="inline-flex items-center justify-center rounded-full bg-vermilion px-7 py-3 text-sm font-semibold text-soft-ivory shadow-lg shadow-vermilion/25 transition-colors hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
                >
                  {t.primaryCta}
                </a>
              </MagneticCta>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-soft-ivory/30 bg-soft-ivory/5 px-7 py-3 text-sm font-medium text-soft-ivory backdrop-blur-sm transition-colors hover:border-soft-ivory/60 hover:bg-soft-ivory/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory/60"
                  >
                    {t.secondaryCta}
                  </button>
                </DialogTrigger>
                <DialogContent
                  aria-label={t.contactModalTitle}
                  className="max-h-[85vh] overflow-y-auto sm:max-w-lg"
                >
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-ink">
                      {t.contactModalTitle}
                    </DialogTitle>
                    <DialogDescription className="text-ink-soft">
                      {t.contactModalDescription}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-2">
                    <ContactChannelList variant="list" />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="lg:hidden">
            <Link
              href="/itineraries/sample-10d"
              className="mt-4 flex items-stretch gap-3 rounded-[14px] bg-paper/95 p-3 text-ink ring-1 ring-ink/10 backdrop-blur-sm transition-colors hover:ring-ink/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
            >
              <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[10px]">
                <Image
                  src="/landmarks/beijing.jpg"
                  alt={anchor.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-between gap-1 py-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-jade">
                  {anchor.eyebrow}
                </p>
                <p className="font-serif text-[15px] leading-snug text-ink line-clamp-2">
                  {anchor.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[12px] text-ink/75">{anchor.meta}</span>
                  <MockBadge>样板价位</MockBadge>
                </div>
                <span className="text-[12px] font-medium text-vermilion">
                  {anchor.cta} →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={0.5}
        className="pointer-events-none absolute bottom-10 right-10 z-10 hidden lg:block"
      >
        <Link
          href="/itineraries/sample-10d"
          className="pointer-events-auto group block w-[300px] overflow-hidden rounded-[14px] bg-paper/95 text-ink shadow-2xl shadow-deep-slate/40 ring-1 ring-ink/15 backdrop-blur-sm transition-colors hover:ring-vermilion/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
        >
          <div className="relative aspect-[5/3] w-full overflow-hidden">
            <Image
              src="/landmarks/beijing.jpg"
              alt={anchor.title}
              fill
              sizes="300px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div className="absolute left-3 top-3">
              <span
                className="inline-flex items-center rounded-full bg-vermilion-deep px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft-ivory shadow-md shadow-deep-slate/30"
                style={{ color: '#fbf7ee', backgroundColor: '#7a141d' }}
              >
                {anchor.eyebrow}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <p className="font-serif text-[18px] leading-snug text-ink">
              {anchor.title}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-ink/75">{anchor.meta}</span>
              <MockBadge>样板价位</MockBadge>
            </div>
            <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-vermilion transition-colors group-hover:text-vermilion-deep">
              {anchor.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
                →
              </span>
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}

export default HomeHero;
