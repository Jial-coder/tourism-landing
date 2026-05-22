'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { SoftLinkButton } from '@/components/chrome/SoftLinkButton';

export function PathCFooter() {
  const dict = useDictionary();
  const t = dict.home.pathCFooter;
  const softLinks = dict.home.nav.softLinks;

  const sitemapColumns = [
    t.sitemap.plan,
    t.sitemap.discover,
    t.sitemap.about,
    t.sitemap.channels,
  ];

  const softLinkClass =
    'text-soft-ivory/60 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm';
  const liveLinkClass =
    'text-soft-ivory/85 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm';

  return (
    <footer
      data-feedback-id="HOME-PATH-C-FOOTER-01"
      className="bg-deep-slate pb-8 pt-16 text-soft-ivory"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          {/* Section 1 — Brand block */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
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

            {/* Section 2 — Sitemap (4 columns) */}
            <nav
              aria-label="Site map"
              className="grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {sitemapColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-3">
                  <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-2 text-sm">
                    {col.links.map((link) => {
                      const softKey = (link as { soft?: keyof typeof softLinks }).soft;
                      if (softKey && softLinks[softKey]) {
                        const copy = softLinks[softKey];
                        return (
                          <li key={link.href}>
                            <SoftLinkButton
                              title={copy.title}
                              body={copy.body}
                              className={`text-left ${softLinkClass}`}
                            >
                              {link.label}
                            </SoftLinkButton>
                          </li>
                        );
                      }
                      return (
                        <li key={link.href}>
                          <a href={link.href} className={liveLinkClass}>
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Section 3 — Site-level trust trio */}
          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-soft-ivory/10 pt-12 md:grid-cols-3">
            {/* Trust network */}
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.trustNetwork.heading}
              </p>
              <p className="text-sm leading-relaxed text-soft-ivory/70">
                {t.trustNetwork.body}
              </p>
              <ul
                className="mt-2 flex flex-wrap gap-2"
                aria-label={t.trustNetwork.heading}
              >
                {t.trustNetwork.partners.map((partner) => (
                  <li
                    key={partner.label}
                    className="inline-flex items-center gap-2 rounded-full border border-soft-ivory/15 bg-soft-ivory/[0.04] px-3 py-1"
                  >
                    <span className="text-[12px] font-misans-regular text-soft-ivory/85">
                      {partner.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gold/85">
                      {t.trustNetwork.partnerStatusLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reply promise */}
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.replyPromise.heading}
              </p>
              <p className="text-sm leading-relaxed text-soft-ivory/85">
                {t.replyPromise.body}
              </p>
              <p className="mt-1 text-xs text-soft-ivory/55">
                {t.replyPromise.meta}
              </p>
            </div>

            {/* Why pandatravel */}
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-soft-ivory/55">
                {t.whyPanda.heading}
              </p>
              <p className="text-sm leading-relaxed text-soft-ivory/70">
                {t.whyPanda.body}
              </p>
            </div>
          </div>

          {/* Section 4 — Legal row */}
          <div className="mt-12 flex flex-col items-start gap-2 border-t border-soft-ivory/10 pt-6 text-xs text-soft-ivory/55 md:flex-row md:items-center md:gap-4">
            <span>{t.copyright}</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span className="text-gold/85">{t.mockNotice}</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span>{t.languageHint}</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default PathCFooter;
