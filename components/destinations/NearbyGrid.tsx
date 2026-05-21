import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  type DestinationSlug,
  type NearbyRef,
  DESTINATIONS,
} from "@/lib/data/destinations";

export function NearbyGrid({
  refs,
  lang = "zh",
}: {
  refs: NearbyRef[];
  lang?: "zh" | "en";
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {refs.map((r) => {
        const target = DESTINATIONS[r.slug as DestinationSlug];
        if (!target) return null;
        const reason = lang === "zh" ? r.reason.zh : r.reason.en;
        const cn = target.cn;
        const en = target.en;
        return (
          <Link
            key={r.slug}
            href={`/destinations/${r.slug}`}
            className="group flex flex-col overflow-hidden rounded-[10px] bg-paper ring-1 ring-ink/10 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink/5">
              <Image
                src={target.hero.src}
                alt={lang === "zh" ? target.hero.alt.zh : target.hero.alt.en}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[18px] font-misans-bold text-ink">
                  {lang === "zh" ? `${cn} · ${en}` : `${en} · ${cn}`}
                </h3>
                <span className="shrink-0 text-[12px] font-misans-regular text-jade">
                  +{r.days} {lang === "zh" ? "天" : "d"}
                </span>
              </div>
              <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75 lg:text-[14px]">
                {reason}
              </p>
              <span className="inline-flex items-center gap-1 text-[12px] font-misans-regular text-jade group-hover:underline">
                {lang === "zh" ? `串成多日行程` : `Add to your itinerary`}
                <ArrowRight aria-hidden size={12} />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
