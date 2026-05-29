'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { HeroParallax } from '@/components/motion/HeroParallax';
import { HeroBackdrop } from '@/components/motion/HeroBackdrop';
import { MagneticCta } from '@/components/motion/MagneticCta';
import { ContactChannelList } from '@/components/contact/ContactChannelList';
import { ChineseSeal } from '@/components/brand/ChineseSeal';

export function HomeHero() {
  const dict = useDictionary();
  const t = dict.home.hero;
  const [contactOpen, setContactOpen] = useState(false);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);
  const contactDialogRef = useRef<HTMLDivElement>(null);
  const contactCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!contactOpen) return;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusable = () => {
      const dialog = contactDialogRef.current;
      if (!dialog) return [];
      return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
          !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
      );
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setContactOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        contactDialogRef.current?.focus({ preventScroll: true });
        return;
      }

      const active = document.activeElement;
      if (event.shiftKey && (active === first || !contactDialogRef.current?.contains(active))) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      }
      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    const focusFrame = window.requestAnimationFrame(() => {
      contactCloseRef.current?.focus({ preventScroll: true });
    });
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      const restoreTarget =
        previouslyFocused?.isConnected === true ? previouslyFocused : contactTriggerRef.current;
      restoreTarget?.focus({ preventScroll: true });
    };
  }, [contactOpen]);

  return (
    <section
      data-feedback-id="HOME-HERO-01"
      className="relative isolate overflow-hidden bg-deep-slate text-soft-ivory min-h-[88svh] md:min-h-screen"
    >
      <HeroParallax>
        <HeroBackdrop eager />
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
              <button
                ref={contactTriggerRef}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={contactOpen}
                aria-controls={contactOpen ? 'home-contact-dialog' : undefined}
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center justify-center rounded-full border border-vermilion/60 bg-vermilion/10 px-7 py-3 text-sm font-medium text-soft-ivory backdrop-blur-sm transition-colors hover:border-vermilion hover:bg-vermilion/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory/60"
              >
                {t.secondaryCta}
              </button>
            </div>
          </Reveal>

        </div>
      </div>

      <Reveal
        delay={0.3}
        className="pointer-events-none absolute bottom-10 left-10 z-10 hidden lg:block"
      >
        <ChineseSeal
          text="熊猫"
          size={64}
          ariaLabel="pandatravel seal"
          className="rotate-[-6deg] opacity-95"
        />
      </Reveal>

      {contactOpen && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-deep-slate/60 px-4 backdrop-blur-sm"
          onClick={() => setContactOpen(false)}
        >
          <div
            ref={contactDialogRef}
            id="home-contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-contact-title"
            aria-describedby="home-contact-description"
            tabIndex={-1}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-paper p-6 text-ink shadow-2xl ring-1 ring-ink/10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={contactCloseRef}
              type="button"
              aria-label={t.contactModalCloseLabel}
              onClick={() => setContactOpen(false)}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            >
              <X size={18} aria-hidden />
            </button>
            <div className="flex flex-col gap-2 pr-8">
              <h2 id="home-contact-title" className="font-serif text-2xl text-ink">
                {t.contactModalTitle}
              </h2>
              <p id="home-contact-description" className="text-sm leading-relaxed text-ink-soft">
                {t.contactModalDescription}
              </p>
            </div>
            <div className="mt-5">
              <ContactChannelList variant="list" onNavigate={() => setContactOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HomeHero;
