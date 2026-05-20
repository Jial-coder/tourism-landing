import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionInner } from "@/components/atoms/SectionContainer";

/**
 * DestinationTilesSection — M-DESTINATION-TILES 独立段（不是 hero 内 collage）。
 * brief: docs/modules/M-DESTINATION-TILES.md §3 "/destinations 顶部" 非对称编辑型集群。
 */

const TILES = [
  {
    href: "/destinations/zhangjiajie",
    src: "/landmarks/zhangjiajie.jpg",
    en: "Zhangjiajie",
    cn: "张家界",
    tagline: "雾峰 · 砂岩柱林",
    width: 360,
    rotate: "-1.2deg",
    yOffset: 0,
  },
  {
    href: "/destinations/guilin",
    src: "/landmarks/guilin.jpg",
    en: "Guilin",
    cn: "桂林",
    tagline: "喀斯特河流 · 漓江",
    width: 320,
    rotate: "+0.8deg",
    yOffset: 36,
  },
  {
    href: "/destinations/jiuzhaigou",
    src: "/landmarks/lhasa.jpg",
    en: "Jiuzhaigou",
    cn: "九寨沟",
    tagline: "高山湖泊 · 川西秘境",
    width: 300,
    rotate: "-0.6deg",
    yOffset: 12,
  },
  {
    href: "/destinations/yunnan",
    src: "/landmarks/lijiang.jpg",
    en: "Yunnan",
    cn: "云南 · 丽江",
    tagline: "古镇 · 高地小径",
    width: 280,
    rotate: "+1.0deg",
    yOffset: 60,
  },
];

export function DestinationTilesSection() {
  return (
    <section
      data-feedback-id="DEST-TILES-01"
      className="relative w-full bg-deep-slate py-20 lg:py-32"
    >
      <SectionInner>
        <div className="flex flex-col gap-3 max-w-[640px] mb-12 lg:mb-16">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
            目的地
          </div>
          <h2 className="text-[32px] lg:text-[48px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
            从 1 个真实想去的地方开始
          </h2>
          <p className="text-[14px] lg:text-[16px] font-misans-regular text-soft-ivory/70 leading-relaxed">
            这是顾问最常问客人的开场。你不需要一次想全 10 站，从一个让你心动的地点出发，剩下的我们来拼。
          </p>
        </div>

        {/* asymmetric editorial cluster — desktop */}
        <div className="hidden lg:flex flex-wrap gap-x-10 gap-y-10 items-start">
          {TILES.map((tile) => (
            <a
              key={tile.href}
              href={tile.href}
              style={{
                width: tile.width,
                marginTop: tile.yOffset,
                transform: `rotate(${tile.rotate})`,
              }}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] border border-soft-ivory/10 motion-safe:transition-all motion-safe:duration-300 group-hover:border-soft-ivory/25 group-hover:-translate-y-1">
                <Image
                  src={tile.src}
                  alt={`${tile.en} ${tile.cn}`}
                  fill
                  sizes="360px"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-misans-bold text-soft-ivory">
                    {tile.en} · {tile.cn}
                  </span>
                  <span className="text-[12px] font-misans-regular text-soft-ivory/60">
                    {tile.tagline}
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className="text-soft-ivory/40 motion-safe:transition-all group-hover:text-soft-ivory group-hover:translate-x-1"
                  aria-hidden
                />
              </div>
            </a>
          ))}
        </div>

        {/* mobile horizontal swipe strip */}
        <div className="lg:hidden -mx-6 flex gap-4 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          {TILES.map((tile) => (
            <a
              key={`m-${tile.href}`}
              href={tile.href}
              className="shrink-0 w-[240px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] border border-soft-ivory/10">
                <Image
                  src={tile.src}
                  alt={`${tile.en} ${tile.cn}`}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5">
                <div className="text-[13px] font-misans-bold text-soft-ivory">
                  {tile.en} · {tile.cn}
                </div>
                <div className="text-[11px] font-misans-regular text-soft-ivory/60">
                  {tile.tagline}
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionInner>
    </section>
  );
}
