"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Itinerary, ItineraryTheme } from "@/lib/data/itineraries";
import { DESTINATIONS } from "@/lib/data/destinations";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { itineraryPageCopy } from "@/lib/data/itinerary-page-copy";
import type { Locale } from "@/lib/data/locales";

type DurationBucket = "any" | "5-7" | "8-10" | "11-14" | "15+";
type MonthBucket = "any" | "Apr-May" | "Jun-Aug" | "Sep-Nov" | "Dec-Mar";

const DURATION_BUCKETS: DurationBucket[] = ["any", "5-7", "8-10", "11-14", "15+"];
const MONTH_BUCKETS: MonthBucket[] = ["any", "Apr-May", "Jun-Aug", "Sep-Nov", "Dec-Mar"];
const THEME_BUCKETS: (ItineraryTheme | "any")[] = [
  "any",
  "first-time",
  "visa-free",
  "family",
  "honeymoon",
  "nature",
  "culture",
  "food",
];

function matchesDuration(days: number, bucket: DurationBucket) {
  if (bucket === "any") return true;
  if (bucket === "5-7") return days >= 5 && days <= 7;
  if (bucket === "8-10") return days >= 8 && days <= 10;
  if (bucket === "11-14") return days >= 11 && days <= 14;
  if (bucket === "15+") return days >= 15;
  return true;
}

function matchesMonth(bestMonths: string[], bucket: MonthBucket) {
  if (bucket === "any") return true;
  const groups: Record<MonthBucket, string[]> = {
    any: [],
    "Apr-May": ["Apr", "May"],
    "Jun-Aug": ["Jun", "Jul", "Aug"],
    "Sep-Nov": ["Sep", "Oct", "Nov"],
    "Dec-Mar": ["Dec", "Jan", "Feb", "Mar"],
  };
  return groups[bucket].some((m) => bestMonths.includes(m));
}

function matchesTheme(themes: ItineraryTheme[], theme: ItineraryTheme | "any") {
  if (theme === "any") return true;
  return themes.includes(theme);
}

function destinationLabel(value: string, locale: Locale) {
  const destination = DESTINATIONS[value as keyof typeof DESTINATIONS];
  if (!destination) return value;
  return locale === "zh" ? destination.cn : destination.en;
}

export function ItineraryListInteractive({ items }: { items: Itinerary[] }) {
  const { locale } = useLocale();
  const copy = itineraryPageCopy[locale].filters;
  const [duration, setDuration] = useState<DurationBucket>("any");
  const [month, setMonth] = useState<MonthBucket>("any");
  const [theme, setTheme] = useState<ItineraryTheme | "any">("any");
  const durationOptions = useMemo(
    () => DURATION_BUCKETS.map((id) => ({ id, label: copy.durations[id] })),
    [copy.durations],
  );
  const monthOptions = useMemo(
    () => MONTH_BUCKETS.map((id) => ({ id, label: copy.months[id] })),
    [copy.months],
  );
  const themeOptions = useMemo(
    () => THEME_BUCKETS.map((id) => ({ id, label: copy.themes[id] })),
    [copy.themes],
  );

  const filtered = useMemo(() => {
    return items.filter(
      (it) =>
        matchesDuration(it.days, duration) &&
        matchesMonth(it.bestMonths, month) &&
        matchesTheme(it.themes, theme),
    );
  }, [items, duration, month, theme]);

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <FilterRow label={copy.durationLabel} options={durationOptions} value={duration} onChange={setDuration} />
      <FilterRow label={copy.themeLabel} options={themeOptions} value={theme} onChange={setTheme} />
      <FilterRow label={copy.monthLabel} options={monthOptions} value={month} onChange={setMonth} />

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
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((it) => (
            <li key={it.slug}>
              <Link
                href={`/itineraries/${it.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-paper ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep-slate">
                  <Image
                    src={it.hero.src}
                    alt={it.hero.alt[locale]}
                    fill
                    sizes="(min-width:1280px) 380px, (min-width:768px) 50vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-soft-ivory/85 px-3 py-1 text-[11px] font-misans-bold tracking-[0.18em] uppercase text-ink">
                    {copy.days(it.days)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                    {it.kicker[locale]}
                  </div>
                  <h3 className="text-[20px] font-misans-bold leading-snug text-ink">
                    {it.title[locale]}
                  </h3>
                  <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                    {copy.destinationPrefix}{" "}
                    {it.destinations
                      .slice(0, 4)
                      .map((destination) => destinationLabel(destination, locale))
                      .join(" · ")}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="flex items-baseline gap-1 text-[15px] font-misans-bold text-vermilion">
                      {copy.priceFrom(it.priceFromUsd)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade group-hover:underline">
                    {copy.cardCta} <ArrowRight aria-hidden size={12} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-ink/70">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt.id === value;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className={
                "inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-misans-regular transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream " +
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
  );
}
