"use client";

import { useDictionary } from "@/components/i18n/LocaleProvider";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { SoftLinkButton } from "@/components/chrome/SoftLinkButton";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/data/locales";
import { NewsletterForm } from "./NewsletterForm";

/**
 * Footer — site-wide footer for non-home pages.
 *
 * Dead-link pass (2026-05-23):
 *   - Sitemap data sourced from `dict.home.pathCFooter.sitemap` (single source of
 *     truth, shared with PathCFooter on /).
 *   - Soft-flagged links (themes / legal / etc.) render as <SoftLinkButton>;
 *     bodies come from `dict.home.nav.softLinks.*`.
 *   - Removed hardcoded dead routes: /best-time, /careers, /press, /contact/wechat,
 *     /about/promise, /about/responsible-travel, /about/voices.
 *   - Auth links removed (now soft-routed in TopNav only).
 *   - Newsletter sign-up + multilingual display row + manifesto strip kept.
 *
 * brief: docs/modules/M-FOOTER.md (revised)
 */

const LANG_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export function Footer() {
  const dict = useDictionary();
  const t = dict.home.pathCFooter;
  const softLinks = dict.home.nav.softLinks;

  const sitemapColumns = [
    t.sitemap.plan,
    t.sitemap.discover,
    t.sitemap.about,
    t.sitemap.channels,
  ];

  const liveLinkClass =
    "text-[13px] font-misans-regular text-soft-ivory/85 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm";
  const softLinkClass =
    "text-left text-[13px] font-misans-regular text-soft-ivory/60 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm";

  return (
    <footer
      data-feedback-id="FOOTER-01"
      className="relative w-full bg-gradient-to-b from-charcoal-blue to-deep-slate"
    >
      <FilmGrain opacity={0.04} />
      <div className="relative">
        {/* Manifesto strip */}
        <div className="border-y border-soft-ivory/8">
          <SectionInner className="py-8 lg:py-12">
            <p className="text-[18px] lg:text-[28px] font-misans-bold tracking-tight italic text-soft-ivory text-center">
              {t.manifesto.title}
            </p>
            <p className="mt-2 text-[13px] font-misans-regular text-soft-ivory/55 text-center">
              {t.manifesto.subtitle}
            </p>
          </SectionInner>
        </div>

        {/* Columns + Newsletter */}
        <SectionInner className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {/* Newsletter (col 1) */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-alpine-blue/80">
                {t.newsletter.heading}
              </div>
              <p className="text-[13px] font-misans-regular text-soft-ivory/75 leading-relaxed">
                {t.newsletter.body}
              </p>
              <NewsletterForm />
            </div>

            {/* Sitemap (4 columns, mirrors PathCFooter) */}
            {sitemapColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-soft-ivory/55">
                  {col.heading}
                </div>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => {
                    const softKey = (link as { soft?: keyof typeof softLinks }).soft;
                    if (softKey && softLinks[softKey]) {
                      const copy = softLinks[softKey];
                      return (
                        <li key={link.href}>
                          <SoftLinkButton
                            title={copy.title}
                            body={copy.body}
                            className={softLinkClass}
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
          </div>
        </SectionInner>

        {/* Language display row + legal */}
        <div className="border-t border-soft-ivory/8">
          <SectionInner className="py-6 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-misans-regular">
              {SUPPORTED_LOCALES.map((code) => (
                <span
                  key={code}
                  className="text-soft-ivory/75"
                >
                  {LANG_LABELS[code]}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-misans-regular text-soft-ivory/45">
              <span>{t.copyright}</span>
              <SoftLinkButton
                title={softLinks.legalPrivacy.title}
                body={softLinks.legalPrivacy.body}
                className="hover:text-soft-ivory/65"
              >
                {t.legalShortLabels.privacy}
              </SoftLinkButton>
              <SoftLinkButton
                title={softLinks.legalTerms.title}
                body={softLinks.legalTerms.body}
                className="hover:text-soft-ivory/65"
              >
                {t.legalShortLabels.terms}
              </SoftLinkButton>
              <SoftLinkButton
                title={softLinks.legalIcp.title}
                body={softLinks.legalIcp.body}
                className="hover:text-soft-ivory/65"
              >
                {t.legalShortLabels.icp}
              </SoftLinkButton>
            </div>
          </SectionInner>
        </div>

        <div className="h-6" /> {/* safe area for CHAT-LAUNCHER */}
      </div>
    </footer>
  );
}
