import Image from "next/image";
import { Pill } from "@/components/atoms/Pill";
import { VisaChip } from "@/components/atoms/VisaChip";
import { CTAGhost } from "@/components/atoms/CTAGhost";
import { HeadlineGroup } from "@/components/atoms/HeadlineGroup";
import {
  DestinationTile,
  TileCaption,
} from "@/components/atoms/DestinationTile";
import { FilmGrain } from "@/components/atoms/FilmGrain";

const SHOW_MAP_OUTLINE =
  process.env.NEXT_PUBLIC_ENABLE_MAP_OUTLINE === "true";

const TILES = [
  {
    src: "/landmarks/zhangjiajie.jpg",
    alt: "Zhangjiajie 张家界 雾峰",
    caption: { en: "ZHANGJIAJIE", cn: "张家界", gps: "29.0970° N · 110.4795° E", iata: "DYG" },
    /** desktop position: right edge offset + top offset (% based) */
    style: { right: "28%", top: "20%", width: 200, rotate: "-1deg" },
  },
  {
    src: "/landmarks/lhasa.jpg",
    alt: "目的地占位图（拉萨实景） — 九寨沟实拍待替换",
    caption: { en: "JIUZHAIGOU", cn: "九寨沟", gps: "33.2604° N · 103.9189° E", iata: "JZH" },
    style: { right: "8%", top: "38%", width: 180, rotate: "+2deg" },
  },
  {
    src: "/landmarks/guilin.jpg",
    alt: "Guilin 桂林 喀斯特河流",
    caption: { en: "GUILIN", cn: "桂林", gps: "25.2734° N · 110.2900° E", iata: "KWL" },
    style: { right: "32%", top: "58%", width: 220, rotate: "-2deg" },
  },
  {
    src: "/landmarks/lijiang.jpg",
    alt: "Yunnan 云南 古城高原",
    caption: { en: "LIJIANG", cn: "云南·丽江", gps: "26.8721° N · 100.2257° E", iata: "LJG" },
    style: { right: "12%", top: "78%", width: 200, rotate: "+1deg" },
  },
];

export function Hero() {
  return (
    <section
      data-feedback-id="HERO-01"
      className="relative w-full min-h-[100vh] overflow-hidden bg-deep-slate"
    >
      {/* Layer 1: cinematic photo */}
      <div className="absolute inset-0">
        <Image
          src="/landmarks/zhangjiajie.jpg"
          alt="Zhangjiajie misty sandstone peaks at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
      </div>

      {/* Layer 2: gradient overlay (desktop horizontal, mobile vertical) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal-blue/90 via-charcoal-blue/55 to-transparent"
      />

      {/* Layer 3: film grain */}
      <FilmGrain opacity={0.05} />

      {/* Layer 4: optional China map outline (env-flag, default OFF — see R-001) */}
      {SHOW_MAP_OUTLINE && (
        // R-001: map outline disabled in production via NEXT_PUBLIC_ENABLE_MAP_OUTLINE.
        // See docs/known-risks.md and docs/DESIGN.md §7.12.
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <text
            x="720"
            y="60"
            textAnchor="middle"
            fill="#fdfbf7"
            fillOpacity="0.3"
            fontSize="10"
            fontStyle="italic"
          >
            an editorial sketch · 编辑型示意
          </text>
        </svg>
      )}

      {/* Content layer */}
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-6 lg:px-16 pt-[112px] pb-12 lg:pb-32 min-h-[100vh]">
        {/* Top: 72px transparent nav strip placeholder (TopNav floats above) */}

        <div className="relative grid flex-1 grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Left: headline + supporting + pills + CTA placeholder */}
          <div className="relative z-10 flex flex-col justify-center gap-8 max-w-[640px]">
            <HeadlineGroup
              h1={<>还没想好去中国哪？</>}
              h2={<>从你喜欢的，开始一段旅程。</>}
              supporting={
                <>
                  告诉我们你的旅行节奏、时间和目的地灵感。本地中国旅行顾问会把你的想法变成一条专属路线，而不是一个标准包。
                </>
              }
            />

            {/* Diagnostic pills */}
            <div
              className="flex flex-wrap gap-3 lg:flex-nowrap lg:overflow-x-auto lg:[&::-webkit-scrollbar]:hidden"
              aria-label="诊断式入口"
            >
              {["还没想好", "只有 10 天", "带孩子", "想看自然"].map((label) => (
                <Pill key={label}>{label}</Pill>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <CTAGhost href="/plan">免费定制行程</CTAGhost>
              <a
                href="/itineraries/sample-10d"
                className="text-[13px] font-misans-regular tracking-wide text-soft-ivory/75 italic underline-offset-4 hover:underline"
              >
                看看 10 天样板行程 →
              </a>
            </div>
          </div>

          {/* Right: visa chip + collage */}
          <div className="relative hidden lg:flex flex-col justify-start items-end pt-2 min-h-[600px]">
            <VisaChip className="self-end">
              美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩 公民 30 天免签 — 截至 2026 年 12 月
            </VisaChip>

            {/* paper-gold route line connecting tiles */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 600 800"
              preserveAspectRatio="none"
            >
              {/* path through tile centers (matched to TILES style.right/top) */}
              <path
                d="M 350 200 Q 480 280 480 380 T 380 580 Q 240 660 460 760"
                fill="none"
                stroke="#c9a65c"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
              <circle cx="350" cy="200" r="4" fill="#c9a65c" />
              <circle cx="480" cy="380" r="4" fill="#c9a65c" />
              <circle cx="380" cy="580" r="4" fill="#c9a65c" />
              <circle cx="460" cy="760" r="4" fill="#c9a65c" />
            </svg>

            {TILES.map((tile, idx) => (
              <div
                key={tile.alt}
                className="absolute"
                style={{
                  right: tile.style.right,
                  top: tile.style.top,
                  width: tile.style.width,
                }}
              >
                <DestinationTile
                  src={tile.src}
                  alt={tile.alt}
                  width={tile.style.width}
                  rotate={tile.style.rotate}
                  caption={tile.caption}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: visa chip + 2 tiles horizontal swipe */}
        <div className="lg:hidden mt-8 flex flex-col gap-6">
          <VisaChip>
            30 天免签 · 美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩
          </VisaChip>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 [&::-webkit-scrollbar]:hidden">
            {TILES.slice(0, 2).map((tile) => (
              <div key={`m-${tile.alt}`} className="shrink-0">
                <DestinationTile
                  src={tile.src}
                  alt={tile.alt}
                  width={200}
                  rotate="0deg"
                  caption={tile.caption}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
