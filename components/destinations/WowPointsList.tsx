import Image from "next/image";
import {
  Mountain,
  Sunrise,
  Coffee,
  Brush,
  Lamp,
  Bike,
  Soup,
  Building,
  Fish,
  TreePine,
  Camera,
  Bird,
  Leaf,
  Mountain as Peak,
  Sparkles,
  Tent,
  Compass,
  Cloud,
} from "lucide-react";
import type { ReactNode } from "react";
import type { WowPoint } from "@/lib/data/destinations";

const ICONS: Record<string, ReactNode> = {
  wall: <Mountain aria-hidden size={20} />,
  sunrise: <Sunrise aria-hidden size={20} />,
  tea: <Coffee aria-hidden size={20} />,
  art: <Brush aria-hidden size={20} />,
  lantern: <Lamp aria-hidden size={20} />,
  army: <Sparkles aria-hidden size={20} />,
  bike: <Bike aria-hidden size={20} />,
  noodle: <Soup aria-hidden size={20} />,
  pagoda: <Building aria-hidden size={20} />,
  shrimp: <Fish aria-hidden size={20} />,
  tree: <TreePine aria-hidden size={20} />,
  museum: <Camera aria-hidden size={20} />,
  skyline: <Building aria-hidden size={20} />,
  river: <Fish aria-hidden size={20} />,
  climb: <Peak aria-hidden size={20} />,
  monkey: <Leaf aria-hidden size={20} />,
  canyon: <Mountain aria-hidden size={20} />,
  glass: <Sparkles aria-hidden size={20} />,
  peak: <Peak aria-hidden size={20} />,
  lake: <Cloud aria-hidden size={20} />,
  falls: <Cloud aria-hidden size={20} />,
  temple: <Building aria-hidden size={20} />,
  chant: <Lamp aria-hidden size={20} />,
  market: <Tent aria-hidden size={20} />,
  pine: <TreePine aria-hidden size={20} />,
  village: <Building aria-hidden size={20} />,
  mountain: <Peak aria-hidden size={20} />,
};

function fallback(): ReactNode {
  return <Compass aria-hidden size={20} />;
}

export function WowPointsList({
  points,
  lang = "zh",
}: {
  points: WowPoint[];
  lang?: "zh" | "en";
}) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {points.map((p, i) => {
        const text = lang === "zh" ? p.zh : p.en;
        const icon = ICONS[p.icon] ?? fallback();
        if (p.image) {
          const altText = lang === "zh" ? p.image.alt.zh : p.image.alt.en;
          return (
            <li
              key={p.icon + i}
              className="flex flex-col overflow-hidden rounded-[12px] bg-paper ring-1 ring-ink/10"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={p.image.src}
                  alt={altText}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-start gap-3 p-5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-vermilion-soft text-vermilion-deep">
                  {icon}
                </span>
                <p className="text-[14px] font-misans-regular leading-relaxed text-ink/85 lg:text-[15px]">
                  {text}
                </p>
              </div>
            </li>
          );
        }
        return (
          <li
            key={p.icon + i}
            className="flex items-start gap-4 rounded-[12px] bg-paper p-5 ring-1 ring-ink/10"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-vermilion-soft text-vermilion-deep">
              {icon}
            </span>
            <p className="text-[14px] font-misans-regular leading-relaxed text-ink/85 lg:text-[15px]">
              {text}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
