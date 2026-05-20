import { SectionInner } from "@/components/atoms/SectionContainer";
import {
  DestinationCarousel,
  type CarouselItem,
} from "@/components/atoms/DestinationCarousel";

/**
 * DestinationTilesSection — M-DESTINATION-TILES (v8 重构)。
 *
 * 改动：从静态非对称编辑型集群 → 改为 DestinationCarousel（v8 hero 去轮播后下移到这里）。
 * 桌面上下翻 / 移动左右翻 / 手动 / 点击跳详情。caption 单行 EN·CN（captionVariant="single"）。
 */

const ITEMS: CarouselItem[] = [
  {
    href: "/destinations/zhangjiajie",
    src: "/landmarks/zhangjiajie.jpg",
    en: "Zhangjiajie",
    cn: "张家界",
    tagline: "雾峰 · 砂岩柱林",
    iata: "DYG",
    gps: "29.10° N · 110.48° E",
  },
  {
    href: "/destinations/jiuzhaigou",
    src: "/landmarks/jiuzhaigou.jpg",
    en: "Jiuzhaigou",
    cn: "九寨沟",
    tagline: "高山湖泊 · 川西秘境",
    iata: "JZH",
    gps: "33.26° N · 103.92° E",
  },
  {
    href: "/destinations/guilin",
    src: "/landmarks/guilin.jpg",
    en: "Guilin",
    cn: "桂林",
    tagline: "喀斯特河流 · 漓江",
    iata: "KWL",
    gps: "25.27° N · 110.29° E",
  },
  {
    href: "/destinations/dali",
    src: "/landmarks/dali.jpg",
    en: "Dali",
    cn: "大理",
    tagline: "洱海 · 苍山 · 古城白族",
    iata: "DLU",
    gps: "25.61° N · 100.27° E",
  },
];

export function DestinationTilesSection() {
  return (
    <section
      data-feedback-id="DEST-TILES-01"
      className="relative w-full bg-deep-slate py-20 lg:py-32"
    >
      <SectionInner>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-3 max-w-[560px]">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
              目的地
            </div>
            <h2 className="text-[32px] lg:text-[48px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
              从 1 个真实想去的地方开始
            </h2>
            <p className="text-[14px] lg:text-[16px] font-misans-regular text-soft-ivory/70 leading-relaxed">
              这是顾问最常问客人的开场。你不需要一次想全 10 站，从一个让你心动的地点出发，剩下的我们来拼。
            </p>
            <p className="mt-4 text-[12px] font-misans-regular text-soft-ivory/45">
              点击图片查看目的地详情 · 桌面上下箭头切换 · 移动端左右滑动
            </p>
          </div>

          <DestinationCarousel items={ITEMS} captionVariant="single" />
        </div>
      </SectionInner>
    </section>
  );
}
