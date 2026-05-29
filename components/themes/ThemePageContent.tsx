"use client";

import { CTAPrimary, CTAGhost } from "@/components/atoms/CTAGhost";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { themePageCopy, type ThemePageSlug } from "@/lib/data/theme-page-copy";

export function ThemePageContent({ slug }: { slug: ThemePageSlug }) {
  const { locale } = useLocale();
  const copy = themePageCopy[locale];
  const theme = copy.themes[slug];

  return (
    <main className="min-h-screen bg-cream px-6 pt-28 pb-16 text-ink lg:px-16 lg:pt-36">
      <section className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-5">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">
            {theme.kicker}
          </div>
          <h1 className="text-[40px] font-misans-heavy leading-[1.08] tracking-tight lg:text-[72px]">
            {theme.title}
          </h1>
          <p className="max-w-[700px] text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
            {theme.description}
          </p>
          <div className="grid gap-3 pt-4">
            {theme.bullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-[10px] ring-1 ring-ink/10 bg-paper px-4 py-3 text-[14px] font-misans-regular text-ink/75"
              >
                {bullet}
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[12px] ring-1 ring-ink/10 bg-paper p-6">
          <h2 className="text-[22px] font-misans-bold">{copy.shared.asideHeading}</h2>
          <p className="mt-3 text-[14px] font-misans-regular leading-relaxed text-ink/70">
            {copy.shared.asideBody}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <CTAPrimary href={`/plan?theme=${slug}`} className="h-11 px-6 text-[13px]">
              {copy.shared.primaryCta}
            </CTAPrimary>
            <CTAGhost href="/" className="h-11 px-6">
              {copy.shared.backHome}
            </CTAGhost>
          </div>
        </aside>
      </section>
    </main>
  );
}
