import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { MockBadge } from "@/components/trust/MockBadge";
import { ChineseSeal } from "@/components/brand/ChineseSeal";
import { ItineraryGlance } from "@/components/itineraries/ItineraryGlance";
import { DayByDayAccordion } from "@/components/itineraries/DayByDayAccordion";
import { PricingMatrix } from "@/components/itineraries/PricingMatrix";
import { TailorMakeTip } from "@/components/itineraries/TailorMakeTip";
import { TripNotesGrid } from "@/components/itineraries/TripNotesGrid";
import { AdvisorPullCta } from "@/components/itineraries/AdvisorPullCta";
import { ITINERARIES, ITINERARY_SLUGS, getItinerary } from "@/lib/data/itineraries";

export function generateStaticParams() {
  return ITINERARY_SLUGS.map((slug) => ({ slug }));
}

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const it = getItinerary(slug);
  if (!it) notFound();

  const planHref = `/plan?itinerary=${encodeURIComponent(it.slug)}`;
  const monthRange = it.bestMonths.join(" / ");

  return (
    <>
      <TopNav />
      <main className="flex-1">
        {/* 1. Hero */}
        <section
          aria-labelledby="it-hero-title"
          className="relative w-full min-h-[64vh] md:min-h-[70vh] lg:min-h-[75vh] overflow-hidden bg-deep-slate"
        >
          <div className="absolute inset-0">
            <Image
              src={it.hero.src}
              alt={it.hero.alt.zh}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-deep-slate via-charcoal-blue/45 to-charcoal-blue/15"
          />
          <SectionInner className="relative pt-[140px] pb-16 md:pt-[160px] md:pb-20 lg:pb-28 min-h-[64vh] md:min-h-[70vh] lg:min-h-[75vh] flex flex-col justify-end">
            <Link
              href="/itineraries"
              className="inline-flex items-center gap-2 text-[13px] font-misans-regular text-soft-ivory/75 hover:text-soft-ivory mb-8 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm"
            >
              <ArrowLeft size={14} aria-hidden /> 回行程列表
            </Link>
            <div className="flex flex-col gap-4 max-w-[820px]">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
                {it.kicker.zh}
              </div>
              <h1
                id="it-hero-title"
                className="text-[36px] md:text-[52px] lg:text-[68px] font-misans-heavy tracking-tight leading-[1.05] text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]"
              >
                {it.title.zh}
              </h1>
              <p className="flex flex-wrap items-center gap-3 text-[14px] lg:text-[16px] font-misans-regular text-soft-ivory/85">
                <span>{it.days} 天</span>
                <span aria-hidden className="text-vermilion">·</span>
                <span>USD {it.priceFromUsd.toLocaleString()}- 起 / 人</span>
                <span aria-hidden className="text-vermilion">·</span>
                <span>最佳 {monthRange}</span>
                <MockBadge className="bg-soft-ivory/15 text-soft-ivory ring-soft-ivory/40">样板价位</MockBadge>
              </p>
            </div>
          </SectionInner>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-6 right-6 z-10 hidden md:block opacity-85"
          >
            <ChineseSeal text="行" size={72} variant="solid" />
          </div>
        </section>

        {/* 1.5 Compact Price Anchor — 紧贴 hero 的价格条，价格锚前置 */}
        <section
          aria-labelledby="price-anchor-title"
          className="relative w-full bg-paper border-b border-ink/8"
        >
          <SectionInner className="py-5 lg:py-6">
            <div className="flex flex-col gap-4 rounded-[12px] bg-cream px-5 py-5 ring-1 ring-ink/15 lg:flex-row lg:items-center lg:gap-8 lg:px-7 lg:py-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span
                    id="price-anchor-title"
                    className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade"
                  >
                    起价区间
                  </span>
                  <MockBadge>样板价位</MockBadge>
                </div>
                <p className="text-[22px] lg:text-[26px] font-misans-heavy tracking-tight text-ink">
                  USD {it.priceFromUsd.toLocaleString()} 起 / 人
                </p>
              </div>

              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-misans-regular text-ink/75 lg:gap-x-6">
                {it.pricing.base.slice(0, 3).map((row) => (
                  <li key={row.hotelClass} className="flex items-baseline gap-1.5">
                    <span className="text-[12px] tracking-[0.1em] uppercase text-ink/70">
                      {row.hotelClass === '3-star'
                        ? '3 星'
                        : row.hotelClass === '4-star'
                        ? '4 星'
                        : row.hotelClass === '5-star'
                        ? '5 星'
                        : row.hotelClass === 'luxury'
                        ? '奢华'
                        : '简约'}
                    </span>
                    <span className="text-[15px] font-misans-bold tabular-nums text-vermilion">
                      USD {row.usdPerNight}
                    </span>
                    <span className="text-[12px] text-ink/70">/ 晚</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-1 lg:ml-auto lg:items-end">
                <span className="text-[12px] font-misans-regular leading-snug text-ink/70">
                  最终成交价 1:1 沟通后给出
                </span>
                <a
                  href="#price-title"
                  className="inline-flex items-center gap-1 text-[13px] font-misans-bold text-jade underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
                >
                  看完整定价
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 2. Itinerary at a Glance */}
        <section aria-labelledby="glance-title" className="relative w-full bg-cream py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Itinerary at a Glance
              </div>
              <h2 id="glance-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                {it.days} 天怎么走 · 一张表先看节奏
              </h2>
              <p className="max-w-[680px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                {it.intro.zh}
              </p>
            </div>
            <ItineraryGlance glance={it.glance} />
          </SectionInner>
        </section>

        {/* 3. Day-by-Day */}
        <section aria-labelledby="dayby-title" className="relative w-full bg-paper py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Day-by-Day
              </div>
              <h2 id="dayby-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                每一天的早午晚怎么排
              </h2>
              <p className="max-w-[680px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                展开任一天看具体节奏。第一天默认展开。所有时段都按真实可执行的节奏写，不是百科条目堆砌。
              </p>
            </div>
            <DayByDayAccordion days={it.dayByDay} />
          </SectionInner>
        </section>

        {/* 4. Highlights */}
        <section aria-labelledby="highlight-title" className="relative w-full bg-cream py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Highlights
              </div>
              <h2 id="highlight-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                这条路线最值得记住的几个瞬间
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {it.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-3 rounded-[12px] bg-paper p-5 ring-1 ring-ink/10"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-vermilion-soft text-[14px] font-misans-bold uppercase text-vermilion-deep ring-1 ring-vermilion/20"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] font-misans-bold text-ink">{h.zh}</p>
                  <p className="text-[12px] font-misans-regular leading-relaxed text-ink/70">{h.en}</p>
                </li>
              ))}
            </ul>
          </SectionInner>
        </section>

        {/* 5. Tour Price */}
        <section aria-labelledby="price-title" className="relative w-full bg-paper py-16 lg:py-24 scroll-mt-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Tour Price
              </div>
              <h2 id="price-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                价格区间 · 真实成交价 1:1 算给你
              </h2>
            </div>
            <PricingMatrix pricing={it.pricing} days={it.days} />

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAPrimary href={planHref} className="h-11 px-6">
                把这条路线交给 Lin 改
              </CTAPrimary>
              <span className="text-[13px] font-misans-regular text-ink/65">
                4 小时内回复 · 1 个工作日内出初步方案
              </span>
            </div>
          </SectionInner>
        </section>

        {/* 6. Tailor-Make Tips */}
        <section aria-labelledby="tailor-tips-title" className="relative w-full bg-cream py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Tailor-Make Tips
              </div>
              <h2 id="tailor-tips-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                想把它改成你的版本？常见取舍清单
              </h2>
              <p className="max-w-[680px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                每条都是顾问真实带过的取舍。看完之后告诉 Lin 你想换哪一段，方案在 1 个工作日内回到你邮箱。
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {it.tailorMakeTips.map((tip, i) => (
                <li key={i}>
                  <TailorMakeTip tip={tip} />
                </li>
              ))}
            </ul>
          </SectionInner>
        </section>

        {/* 7. Trip Notes */}
        <section aria-labelledby="notes-title" className="relative w-full bg-paper py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Trip Notes
              </div>
              <h2 id="notes-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                住、行、吃、签证 · 一段简短交底
              </h2>
            </div>
            <TripNotesGrid notes={it.tripNotes} />
          </SectionInner>
        </section>

        {/* 8. Advisor pull */}
        <section aria-labelledby="advisor-title" className="relative w-full bg-cream py-16 lg:py-24">
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                Your Advisor
              </div>
              <h2 id="advisor-title" className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink">
                把它交给 Lin 改成你的版本
              </h2>
            </div>
            <AdvisorPullCta itinerary={it} />
          </SectionInner>
        </section>

        {/* 9. Final CTA */}
        <section
          aria-labelledby="final-cta-title"
          className="relative w-full bg-paper py-16 lg:py-24 border-t border-ink/10"
        >
          <SectionInner>
            <div className="flex flex-col items-start gap-6 rounded-[16px] bg-cream p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
                  Send my inquiry
                </div>
                <h2
                  id="final-cta-title"
                  className="text-[24px] lg:text-[32px] font-misans-heavy tracking-tight text-ink"
                >
                  这条路线 70% 就是你想要的？
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                  把它当起点，告诉 Lin 你想加 / 减 / 换的细节。我们不卖这一条样板，所以告诉我们你的版本，剩下的交给顾问。
                </p>
              </div>
              <CTAPrimary href={planHref} className="h-12 px-7">
                把这条路线交给 Lin 改 →
              </CTAPrimary>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}

// 防止 ITINERARIES 数据被 tree-shake 剪掉
void ITINERARIES;
