"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Itinerary, ItineraryTheme } from "@/lib/data/itineraries";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { MockBadge } from "@/components/trust/MockBadge";

type DurationBucket = "any" | "5-7" | "8-10" | "11-14" | "15+";
type MonthBucket = "any" | "Apr-May" | "Jun-Aug" | "Sep-Nov" | "Dec-Mar";

const DURATION_OPTIONS: { id: DurationBucket; label: string }[] = [
  { id: "any", label: "全部天数" },
  { id: "5-7", label: "5–7 天" },
  { id: "8-10", label: "8–10 天" },
  { id: "11-14", label: "11–14 天" },
  { id: "15+", label: "15 天以上" },
];

const MONTH_OPTIONS: { id: MonthBucket; label: string }[] = [
  { id: "any", label: "全部月份" },
  { id: "Apr-May", label: "4–5 月" },
  { id: "Jun-Aug", label: "6–8 月" },
  { id: "Sep-Nov", label: "9–11 月" },
  { id: "Dec-Mar", label: "12–3 月" },
];

const THEME_OPTIONS: { id: ItineraryTheme | "any"; label: string }[] = [
  { id: "any", label: "全部主题" },
  { id: "first-time", label: "第一次来" },
  { id: "visa-free", label: "过境免签" },
  { id: "family", label: "家庭带娃" },
  { id: "honeymoon", label: "蜜月" },
  { id: "nature", label: "自然山水" },
  { id: "culture", label: "历史文化" },
  { id: "food", label: "美食" },
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

export function ItineraryListInteractive({ items }: { items: Itinerary[] }) {
  const [duration, setDuration] = useState<DurationBucket>("any");
  const [month, setMonth] = useState<MonthBucket>("any");
  const [theme, setTheme] = useState<ItineraryTheme | "any">("any");

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
      <FilterRow label="天数" options={DURATION_OPTIONS} value={duration} onChange={setDuration} />
      <FilterRow label="主题" options={THEME_OPTIONS} value={theme} onChange={setTheme} />
      <FilterRow label="出行月份" options={MONTH_OPTIONS} value={month} onChange={setMonth} />

      {filtered.length === 0 ? (
        <div className="rounded-[12px] bg-paper p-8 ring-1 ring-ink/10 text-center">
          <p className="text-[15px] font-misans-regular text-ink/75">
            目前没有完全符合的样板。换个组合再看，或直接告诉 Lin 你想要的中国，我们替你写一条新的。
          </p>
          <CTAPrimary href="/plan" className="mt-5 h-11 px-6">
            告诉 Lin 我想要的版本
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
                    alt={it.hero.alt.zh}
                    fill
                    sizes="(min-width:1280px) 380px, (min-width:768px) 50vw, 100vw"
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-soft-ivory/85 px-3 py-1 text-[11px] font-misans-bold tracking-[0.18em] uppercase text-ink">
                    {it.days} 天
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                    {it.kicker.zh}
                  </div>
                  <h3 className="text-[20px] font-misans-bold leading-snug text-ink">
                    {it.title.zh}
                  </h3>
                  <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                    主目的地：{it.destinations.slice(0, 4).join(" · ")}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="flex items-baseline gap-1 text-[15px] font-misans-bold text-vermilion">
                      USD {it.priceFromUsd.toLocaleString()}-
                      <span className="text-[11px] font-misans-regular text-ink/70">/ 人 起</span>
                    </span>
                    <MockBadge>样板价位</MockBadge>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade group-hover:underline">
                    看完整 10 章节 <ArrowRight aria-hidden size={12} />
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
