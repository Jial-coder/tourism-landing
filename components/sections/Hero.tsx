import Image from "next/image";
import { Pill } from "@/components/atoms/Pill";
import { VisaChip } from "@/components/atoms/VisaChip";
import { CTAGhost } from "@/components/atoms/CTAGhost";
import { HeadlineGroup } from "@/components/atoms/HeadlineGroup";
import { FilmGrain } from "@/components/atoms/FilmGrain";
import { ChinaMapOverlay } from "@/components/atoms/ChinaMapOverlay";

export function Hero() {
  return (
    <section
      data-feedback-id="HERO-01"
      className="relative w-full min-h-[100vh] overflow-hidden bg-deep-slate"
    >
      {/* Layer 1: v4-a 纯黄山云海日出（已 strip 地图烙印） */}
      <div className="absolute inset-0">
        <Image
          src="/landmarks/hero-gen/v4-a.webp"
          alt="黄山云海日出 cinematic 主图"
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 1280px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Layer 2: 蒙版（左 55% 渐变，保 headline 可读） */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 right-1/2 lg:right-[55%] bg-gradient-to-r from-deep-slate/55 via-charcoal-blue/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-1/2 lg:hidden bg-gradient-to-t from-deep-slate/75 via-charcoal-blue/35 to-transparent"
      />

      {/* Layer 3: ChinaMapOverlay（lg+，右半 SVG 矢量地图，4 marker 跳详情） */}
      <ChinaMapOverlay
        className="hidden lg:block absolute inset-y-0 right-0 w-[55%]"
        ariaLabel="中国主要目的地地图"
      />

      {/* Layer 4: very light grain */}
      <FilmGrain opacity={0.025} />

      {/* Content layer */}
      <div className="relative pointer-events-none mx-auto flex w-full max-w-[1440px] flex-col px-6 lg:px-16 pt-[96px] lg:pt-[140px] pb-12 lg:pb-32 min-h-[100vh]">
        <div className="relative flex flex-1 items-start">
          <div className="relative z-10 pointer-events-auto flex flex-col gap-6 lg:gap-7 max-w-[560px]">
            <HeadlineGroup
              h1={<>还没想好去中国哪？</>}
              h2={<>从你喜欢的，开始一段旅程。</>}
              supporting={
                <>
                  告诉我们你的旅行节奏、时间和目的地灵感。本地中国旅行顾问会把你的想法变成一条专属路线，而不是一个标准包。
                </>
              }
            />

            <div
              className="flex flex-wrap gap-3"
              aria-label="诊断式入口"
            >
              {["还没想好", "只有 10 天", "带孩子", "想看自然"].map((label) => (
                <Pill key={label}>{label}</Pill>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <CTAGhost href="/plan">免费定制行程</CTAGhost>
              <a
                href="/itineraries"
                className="text-[13px] font-misans-regular tracking-wide text-soft-ivory/75 italic underline-offset-4 hover:underline"
              >
                看看行程思路 →
              </a>
            </div>

            <VisaChip className="hidden lg:inline-flex max-w-fit">
              美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩 公民 30 天免签 — 截至 2026 年 12 月
            </VisaChip>
          </div>
        </div>

        {/* Mobile-only: visa chip below content */}
        <div className="lg:hidden mt-8">
          <VisaChip>
            30 天免签 · 美 / 英 / 加 / 欧 / 澳 / 新 / 日 / 韩
          </VisaChip>
        </div>
      </div>
    </section>
  );
}
