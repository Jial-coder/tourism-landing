"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  DESTINATION_THEMES,
  DESTINATION_THEME_LABELS,
  DESTINATION_THEME_ORDER,
  type Destination,
  type DestinationTheme,
} from "@/lib/data/destinations";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { destinationPageCopy } from "@/lib/data/destination-page-copy";

type ThemeFilter = DestinationTheme | "any";

function getThemes(d: Destination): DestinationTheme[] {
  return d.themes ?? DESTINATION_THEMES[d.slug] ?? [];
}

export function DestinationListInteractive({
  items,
}: {
  items: Destination[];
}) {
  const { locale } = useLocale();
  const copy = destinationPageCopy[locale].filter;
  const [theme, setTheme] = useState<ThemeFilter>("any");
  const themeFilters = useMemo(
    () => [
      { id: "any" as const, label: copy.allThemes },
      ...DESTINATION_THEME_ORDER.map((t) => ({
        id: t,
        label: DESTINATION_THEME_LABELS[t][locale],
      })),
    ],
    [copy.allThemes, locale],
  );

  const filtered = useMemo(() => {
    if (theme === "any") return items;
    return items.filter((d) => getThemes(d).includes(theme));
  }, [items, theme]);

  return (
    <div className="flex flex-col gap-6 lg:gap-10">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-ink/70">
          {copy.label}
        </span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {themeFilters.map((opt) => {
            const selected = opt.id === theme;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                aria-pressed={selected}
                className={
                  "inline-flex min-h-9 items-center justify-center rounded-full px-3 py-1.5 text-[12px] font-misans-regular transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:px-4 sm:py-2 sm:text-[13px] " +
                  (selected
                    ? "bg-vermilion text-soft-ivory shadow-sm shadow-vermilion/20"
                    : "bg-paper text-ink/75 ring-1 ring-ink/10 hover:bg-cream hover:text-ink")
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-[12px] bg-paper p-8 ring-1 ring-ink/10 text-center">
          <p className="text-[15px] font-misans-regular text-ink/75">
            {copy.empty}
          </p>
          <CTAPrimary href="/plan" className="mt-5 h-11 px-6">
            {copy.emptyCta}
          </CTAPrimary>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((d) => {
            const themes = getThemes(d);
            const recommendedDays =
              d.durations[Math.max(0, d.durations.length - 2)]?.days ??
              d.durations[0]?.days ??
              4;
            return (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group grid h-full grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-[10px] bg-paper ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:flex sm:flex-col"
                >
                  <div className="relative min-h-[132px] w-full overflow-hidden bg-deep-slate sm:aspect-[16/10] sm:min-h-0">
                    <Image
                      src={d.hero.src}
                      alt={d.hero.alt[locale]}
                      fill
                      sizes="(min-width:1280px) 25vw, (min-width:768px) 50vw, 112px"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                    />
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-soft-ivory/85 px-2 py-0.5 text-[10px] font-misans-bold tracking-[0.12em] uppercase text-ink sm:left-3 sm:top-3 sm:px-2.5 sm:py-1">
                      {copy.recommended(recommendedDays)}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 p-4 sm:gap-3">
                    <div className="text-[10px] font-misans-regular tracking-[0.16em] uppercase text-jade sm:text-[11px]">
                      {d.iata}
                      <span className="hidden sm:inline"> · {d.gps}</span>
                    </div>
                    <h3 className="text-[17px] font-misans-bold leading-snug text-ink sm:text-[19px]">
                      {locale === "zh" ? `${d.cn} · ${d.en}` : d.en}
                    </h3>
                    <p className="line-clamp-2 text-[13px] font-misans-regular leading-relaxed text-ink/75 sm:text-[14px]">
                      {d.tagline[locale]}
                    </p>
                    <ul className="flex flex-wrap gap-1 pt-0.5 sm:gap-1.5 sm:pt-1">
                      {themes.slice(0, 3).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-ink/12 bg-cream px-2 py-0.5 text-[10px] font-misans-regular text-ink/65 sm:px-2.5 sm:text-[11px]"
                        >
                          {DESTINATION_THEME_LABELS[t][locale]}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-col gap-1 border-t border-ink/8 pt-2 sm:gap-1.5 sm:pt-3">
                      <span className="hidden text-[12px] font-misans-regular leading-snug text-ink/70 motion-safe:transition-all motion-safe:duration-200 motion-reduce:transition-none sm:inline">
                        {copy.stayAdvice(recommendedDays)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[12px] font-misans-bold text-jade underline-offset-4 group-hover:underline sm:text-[13px]">
                        {copy.cardCta(locale === "zh" ? d.cn : d.en)}
                        <ArrowRight aria-hidden size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
