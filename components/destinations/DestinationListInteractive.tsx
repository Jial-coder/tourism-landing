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

type ThemeFilter = DestinationTheme | "any";

const THEME_FILTERS: { id: ThemeFilter; label: string }[] = [
  { id: "any", label: "全部主题" },
  ...DESTINATION_THEME_ORDER.map((t) => ({
    id: t,
    label: DESTINATION_THEME_LABELS[t].zh,
  })),
];

function getThemes(d: Destination): DestinationTheme[] {
  return d.themes ?? DESTINATION_THEMES[d.slug] ?? [];
}

export function DestinationListInteractive({
  items,
}: {
  items: Destination[];
}) {
  const [theme, setTheme] = useState<ThemeFilter>("any");

  const filtered = useMemo(() => {
    if (theme === "any") return items;
    return items.filter((d) => getThemes(d).includes(theme));
  }, [items, theme]);

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-ink/70">
          按主题筛选
        </span>
        <div className="flex flex-wrap gap-2">
          {THEME_FILTERS.map((opt) => {
            const selected = opt.id === theme;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
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

      {filtered.length === 0 ? (
        <div className="rounded-[12px] bg-paper p-8 ring-1 ring-ink/10 text-center">
          <p className="text-[15px] font-misans-regular text-ink/75">
            目前没有这个主题的目的地。换一个主题再看，或者直接告诉 Lin 你想要的中国，我们替你串。
          </p>
          <CTAPrimary href="/plan" className="mt-5 h-11 px-6">
            告诉 Lin 我想要的版本
          </CTAPrimary>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-paper ring-1 ring-ink/10 transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep-slate">
                    <Image
                      src={d.hero.src}
                      alt={d.hero.alt.zh}
                      fill
                      sizes="(min-width:1280px) 380px, (min-width:768px) 50vw, 100vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deep-slate/55 to-transparent"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-soft-ivory/85 px-3 py-1 text-[11px] font-misans-bold tracking-[0.18em] uppercase text-ink">
                      推荐 {recommendedDays} 天
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                      {d.iata} · {d.gps}
                    </div>
                    <h3 className="text-[20px] font-misans-bold leading-snug text-ink">
                      {d.cn} · {d.en}
                    </h3>
                    <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                      {d.tagline.zh}
                    </p>
                    <ul className="flex flex-wrap gap-1.5 pt-1">
                      {themes.slice(0, 3).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-ink/12 bg-cream px-2.5 py-0.5 text-[11px] font-misans-regular text-ink/65"
                        >
                          {DESTINATION_THEME_LABELS[t].zh}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[13px] font-misans-regular text-jade group-hover:underline">
                      看 8 章节深度 <ArrowRight aria-hidden size={12} />
                    </span>
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
