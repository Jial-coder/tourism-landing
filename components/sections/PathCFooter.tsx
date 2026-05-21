'use client';

import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { CONTACT_CHANNELS, overseasOrder } from '@/lib/data/contact-channels';
import { Reveal } from '@/components/motion/Reveal';

export function PathCFooter() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.home.pathCFooter;
  const channels = overseasOrder(CONTACT_CHANNELS).filter(
    (c) => c.kind !== 'form' && c.visibility !== 'hidden'
  );
  const mockLabel = locale === 'zh' ? '占位' : 'mock';
  return (
    <footer
      data-feedback-id="HOME-PATH-C-FOOTER-01"
      className="bg-deep-slate pb-8 pt-16 text-soft-ivory"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3">
              <p className="font-serif text-2xl tracking-tight text-soft-ivory">
                pandatravel
              </p>
              <p className="text-sm leading-relaxed text-soft-ivory/70">
                {t.brandTagline}
              </p>
              <p className="mt-1 text-xs tracking-wider text-soft-ivory/50">
                pandatravel.com.cn
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.quickLinksHeading}
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {t.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-soft-ivory/85 underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.contactHeading}
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      className="text-soft-ivory/85 underline-offset-4 hover:underline"
                      rel="noopener noreferrer"
                    >
                      {channel.label[locale] ?? channel.label.en}
                      {channel.status === 'mock' && (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-gold/80">
                          {mockLabel}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.legalHeading}
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {t.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-soft-ivory/70 underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-soft-ivory/60">{t.languageHint}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start gap-2 border-t border-soft-ivory/10 pt-6 text-xs text-soft-ivory/55 md:flex-row md:items-center md:gap-4">
            <span>{t.copyright}</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span className="text-gold/85">{t.mockNotice}</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default PathCFooter;
