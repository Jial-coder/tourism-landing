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
      className="bg-deep-slate pb-5 pt-8 text-soft-ivory md:pb-8 md:pt-14"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          {/* Section 1 — Brand block */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-8">
            <div className="flex flex-col gap-1.5 md:gap-2">
              <p className="font-serif text-xl tracking-tight text-soft-ivory md:text-2xl">
                pandatravel
              </p>
              <p className="text-[13px] leading-normal text-soft-ivory/70 md:text-sm md:leading-relaxed">
                {t.brandTagline}
              </p>
              <p className="text-[11px] tracking-wider text-soft-ivory/50 md:mt-1 md:text-xs">
                pandatravel.com.cn
              </p>
            </div>

            {/* Section 2 — Sitemap (4 columns) */}
            <nav
              aria-label="Site map"
              className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-4 md:gap-8"
            >
              {sitemapColumns.map((col) => (
                <div key={col.heading} className="flex flex-col gap-1.5 md:gap-2.5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-soft-ivory/55 md:text-[12px] md:tracking-[0.18em]">
                    {col.heading}
                  </p>
                  <ul className="flex flex-col gap-1 text-[13px] md:gap-1.5 md:text-sm">
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
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-soft-ivory/10 pt-5 md:mt-12 md:grid-cols-3 md:gap-8 md:pt-10">
            {/* Trust network */}
            <div className="col-span-2 flex flex-col gap-2 md:col-span-1 md:gap-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-soft-ivory/55 md:text-[12px] md:tracking-[0.18em]">
                {t.trustNetwork.heading}
              </p>
              <p className="text-[13px] leading-normal text-soft-ivory/70 md:text-sm md:leading-relaxed">
                {t.trustNetwork.body}
              </p>
              <ul
                className="mt-1 flex flex-wrap gap-1.5 md:mt-2 md:gap-2"
                aria-label={t.trustNetwork.heading}
              >
                {t.trustNetwork.partners.map((partner) => (
                  <li
                    key={partner.label}
                    className="inline-flex items-center rounded-full border border-soft-ivory/15 bg-soft-ivory/[0.04] px-2 py-0.5 md:px-2.5 md:py-1"
                  >
                    <span className="text-[11px] font-misans-regular text-soft-ivory/85 md:text-[12px]">
                      {partner.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reply promise */}
            <div className="flex flex-col gap-1.5 md:gap-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-soft-ivory/55 md:text-[12px] md:tracking-[0.18em]">
                {t.replyPromise.heading}
              </p>
              <p className="text-[13px] leading-normal text-soft-ivory/85 md:text-sm md:leading-relaxed">
                {t.replyPromise.body}
              </p>
              <p className="text-[11px] text-soft-ivory/55 md:mt-1 md:text-xs">
                {t.replyPromise.meta}
              </p>
            </div>

            {/* Why pandatravel */}
            <div className="flex flex-col gap-1.5 md:gap-2.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-soft-ivory/55 md:text-[12px] md:tracking-[0.18em]">
                {t.whyPanda.heading}
              </p>
              <p className="text-[13px] leading-normal text-soft-ivory/70 md:text-sm md:leading-relaxed">
                {t.whyPanda.body}
              </p>
            </div>
          </div>

          {/* Section 4 — Legal row */}
          <div className="mt-5 flex flex-col items-start gap-1.5 border-t border-soft-ivory/10 pt-4 text-[11px] leading-normal text-soft-ivory/55 md:mt-10 md:flex-row md:items-center md:gap-4 md:text-xs">
            <span>{t.copyright}</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span>{t.languageHint}</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default PathCFooter;
