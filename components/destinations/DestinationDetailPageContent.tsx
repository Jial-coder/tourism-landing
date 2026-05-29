"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { ChineseSeal } from "@/components/brand/ChineseSeal";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BestTimeStrip } from "@/components/destinations/BestTimeStrip";
import { DurationCards } from "@/components/destinations/DurationCards";
import { NearbyGrid } from "@/components/destinations/NearbyGrid";
import { TailorMakePullCta } from "@/components/destinations/TailorMakePullCta";
import { WowPointsList } from "@/components/destinations/WowPointsList";
import type { Destination } from "@/lib/data/destinations";

const DEST_SEAL_CHAR: Record<string, string> = {
  beijing: "北",
  xian: "西",
  shanghai: "上",
  guilin: "桂",
  zhangjiajie: "张",
  jiuzhaigou: "九",
  dali: "大",
  huangshan: "黄",
};

const copy = {
  en: {
    back: "Back to destinations",
    whyEyebrow: "Route anchor",
    whyHeading: (name: string) => `Should ${name} anchor your China route?`,
    whyBody: (name: string) =>
      `${name} is a useful starting point when the season, pace and next city are planned together. Use this page to judge whether it belongs in your route; the final plan is written after your travel month, party size and priorities are clear.`,
    whyNote:
      "This is a planning starter, not a fixed package or a live supplier promise. Current access, ticketing, weather, transport and guide availability are checked before any quote is prepared.",
    ctaEyebrow: "Next step",
    ctaBody: (name: string) =>
      `Add ${name} to your request. The form gives Lin enough context to decide whether it should be a main stop, a side trip, or something to save for another route.`,
    ctaButton: (name: string) => `Add ${name} to my plan`,
    wowEyebrow: "Ideas to verify",
    wowHeading: "Moments worth discussing before the route is written",
    wowNote:
      "Not every idea fits every month or travel style. Treat these as conversation starters, then let the advisor check what is realistic for your dates.",
    wowLink: "Ask Lin to choose the right moments",
    bestTimeEyebrow: "Best time",
    bestTimeHeading: "Which months usually work best",
    climateEyebrow: "Season note",
    climateBody:
      "Seasonal guidance is a planning reference. Specific closures, crowd levels and weather conditions should be checked again before booking.",
    durationEyebrow: "How long to stay",
    durationHeading: (name: string) => `How many days should ${name} hold?`,
    durationNote: "Not sure how many days to reserve?",
    durationLink: "Ask Lin to shape the pace",
    nearbyEyebrow: "Nearby and combine",
    nearbyHeading: (name: string) => `What pairs naturally with ${name}`,
    nearbyBody:
      "Use these as route directions rather than fixed transfers. Rail, flight and drive times should be verified again for your travel month.",
    routeEyebrow: "Route fit",
    routeHeading: (name: string) => `Where ${name} can fit in a larger trip`,
    routeBody:
      "These are common route directions. Hidden or unfinished sample itineraries stay as custom-request cards until the underlying product data is reviewed.",
    customBadge: "Custom draft",
    publicBadge: "Route direction",
    customBody:
      "This route is not published as a fixed product. Share your month, pace and party size, and we will draft a version around you.",
    publicBody: "Open the route direction and use it as a starting point, not a final quote.",
    customLink: "Ask Lin to draft it",
    publicLink: "View route direction",
    tailorEyebrow: "Tailor-make",
    tailorHeading: (name: string) => `Turn ${name} into your version`,
  },
  zh: {
    back: "回目的地列表",
    whyEyebrow: "路线锚点",
    whyHeading: (name: string) => `${name} 适合做这趟中国路线的核心吗？`,
    whyBody: (name: string) =>
      `${name} 是否适合放进路线，要和出行月份、旅行节奏、下一站一起判断。这个页面先帮你判断方向；最终路线会在明确月份、同行人和偏好之后再写。`,
    whyNote:
      "这是路线规划起点，不是固定套餐，也不是实时供应商承诺。具体开放、票务、天气、交通和向导可用性都要在报价前再次确认。",
    ctaEyebrow: "下一步",
    ctaBody: (name: string) =>
      `把 ${name} 加进需求表。Lin 会根据你的信息判断它适合做主站、顺路支线，还是留给另一条路线。`,
    ctaButton: (name: string) => `把 ${name} 加进我的行程`,
    wowEyebrow: "待确认体验",
    wowHeading: "路线写出来前，值得先讨论的几个瞬间",
    wowNote:
      "不是每个体验都适合所有月份和旅行方式。先把它们当成讨论起点，再由顾问确认你的日期里哪些真实可行。",
    wowLink: "请 Lin 帮我筛选适合的体验",
    bestTimeEyebrow: "最佳时节",
    bestTimeHeading: "一年里通常哪几个月更合适",
    climateEyebrow: "季节说明",
    climateBody:
      "季节建议只是规划参考。具体封闭、人流、天气和临时调整，需要在正式预订前再次核实。",
    durationEyebrow: "停留天数",
    durationHeading: (name: string) => `${name} 留几天比较合适`,
    durationNote: "拿不准要排几天？",
    durationLink: "让 Lin 帮你算节奏",
    nearbyEyebrow: "顺路串联",
    nearbyHeading: (name: string) => `${name} 可以和哪些地方自然串起来`,
    nearbyBody:
      "这些是路线方向，不是固定交通承诺。高铁、航班和车程需要按你的出行月份再次核实。",
    routeEyebrow: "路线适配",
    routeHeading: (name: string) => `${name} 适合放在哪类大路线里`,
    routeBody:
      "下面是常见路线方向。未完成或未审核的样例行程先保持按需定制，不作为固定产品公开销售。",
    customBadge: "按需起草",
    publicBadge: "路线方向",
    customBody:
      "这类路线不作为固定产品展示。告诉 Lin 你的出发月份、节奏和同行人，我们会按你的情况起草。",
    publicBody: "打开路线方向作为讨论起点，不作为最终报价。",
    customLink: "请 Lin 写一份给我",
    publicLink: "看路线方向",
    tailorEyebrow: "定制路线",
    tailorHeading: (name: string) => `把 ${name} 改成你的版本`,
  },
} as const;

export function DestinationDetailPageContent({
  destination,
  publicItinerarySlugs,
}: {
  destination: Destination;
  publicItinerarySlugs: string[];
}) {
  const { locale } = useLocale();
  const t = copy[locale];
  const name = locale === "zh" ? destination.cn : destination.en;
  const planHref = `/plan?destination=${encodeURIComponent(destination.slug)}`;
  const publicItinerarySlugSet = new Set(publicItinerarySlugs);

  return (
    <main className="flex-1">
      <section
        aria-labelledby="dest-hero-title"
        className="relative min-h-[70vh] w-full overflow-hidden bg-deep-slate md:min-h-[75vh] lg:min-h-[80vh]"
      >
        <div className="absolute inset-0">
          <Image
            src={destination.hero.src}
            alt={destination.hero.alt[locale]}
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
        <SectionInner className="relative flex min-h-[70vh] flex-col justify-end pt-[140px] pb-16 md:min-h-[75vh] md:pt-[160px] md:pb-20 lg:min-h-[80vh] lg:pb-32">
          <Link
            href="/destinations"
            className="mb-8 inline-flex items-center gap-2 self-start rounded-sm text-[13px] font-misans-regular text-soft-ivory/75 hover:text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate"
          >
            <ArrowLeft size={14} aria-hidden /> {t.back}
          </Link>
          <div className="flex max-w-[760px] flex-col gap-3">
            <div className="flex items-center gap-3 text-[12px] font-misans-regular tracking-widest text-soft-ivory/65">
              <span>{destination.gps}</span>
              <span aria-hidden className="text-vermilion">
                ·
              </span>
              <span>{destination.iata}</span>
            </div>
            <h1
              id="dest-hero-title"
              className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)] md:text-[56px] lg:text-[72px]"
            >
              {locale === "zh" ? `${destination.cn} · ${destination.en}` : destination.en}
            </h1>
            <p className="text-[15px] font-misans-regular text-soft-ivory/85 lg:text-[18px]">
              {destination.tagline[locale]}
            </p>
          </div>
        </SectionInner>
        {locale === "zh" && (
          <div
            aria-hidden
            className="pointer-events-none absolute right-6 bottom-6 z-10 hidden opacity-85 md:block"
          >
            <ChineseSeal
              text={DEST_SEAL_CHAR[destination.slug] ?? destination.cn.charAt(0)}
              size={72}
              variant="solid"
            />
          </div>
        )}
      </section>

      <section
        aria-labelledby="why-visit-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-20">
            <div className="flex max-w-[700px] flex-col gap-5">
              <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
                {t.whyEyebrow}
              </div>
              <h2
                id="why-visit-title"
                className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
              >
                {t.whyHeading(name)}
              </h2>
              <p className="text-[15px] font-misans-regular leading-relaxed text-ink/80 lg:text-[17px]">
                {t.whyBody(name)}
              </p>
              <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                {t.whyNote}
              </p>
            </div>
            <div className="flex h-fit flex-col gap-4 rounded-[10px] bg-paper p-6 ring-1 ring-ink/10">
              <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
                {t.ctaEyebrow}
              </div>
              <p className="text-[14px] font-misans-regular leading-relaxed text-ink/80">
                {t.ctaBody(name)}
              </p>
              <CTAPrimary href={planHref} className="h-11">
                {t.ctaButton(name)}
              </CTAPrimary>
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="wow-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.wowEyebrow}
            </div>
            <h2
              id="wow-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.wowHeading}
            </h2>
            <p className="max-w-[680px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
              {t.wowNote}
            </p>
          </div>
          <WowPointsList points={destination.wowPoints} lang={locale} />

          <p className="mt-10 text-[14px] font-misans-regular text-ink/65">
            <Link
              href={planHref}
              className="inline-flex items-center gap-1 text-jade underline-offset-4 hover:underline"
            >
              {t.wowLink} <ArrowRight aria-hidden size={12} />
            </Link>
          </p>
        </SectionInner>
      </section>

      <section
        aria-labelledby="best-time-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.bestTimeEyebrow}
            </div>
            <h2
              id="best-time-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.bestTimeHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
            <BestTimeStrip
              bestTime={destination.bestTime}
              slug={destination.slug}
              lang={locale}
            />
            <div className="flex h-fit flex-col gap-3 rounded-[10px] bg-paper p-5 ring-1 ring-ink/10">
              <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
                {t.climateEyebrow}
              </div>
              <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75">
                {t.climateBody}
              </p>
            </div>
          </div>
        </SectionInner>
      </section>

      <section
        aria-labelledby="duration-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.durationEyebrow}
            </div>
            <h2
              id="duration-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.durationHeading(name)}
            </h2>
          </div>
          <DurationCards durations={destination.durations} lang={locale} />

          <p className="mt-10 text-[14px] font-misans-regular text-ink/65">
            {t.durationNote}{" "}
            <Link
              href={planHref}
              className="text-jade underline-offset-4 hover:underline"
            >
              {t.durationLink} <ArrowRight aria-hidden size={12} />
            </Link>
          </p>
        </SectionInner>
      </section>

      <section
        aria-labelledby="nearby-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.nearbyEyebrow}
            </div>
            <h2
              id="nearby-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.nearbyHeading(name)}
            </h2>
            <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
              {t.nearbyBody}
            </p>
          </div>
          <NearbyGrid refs={destination.nearby} lang={locale} />
        </SectionInner>
      </section>

      <section
        aria-labelledby="sample-title"
        className="relative w-full bg-paper py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.routeEyebrow}
            </div>
            <h2
              id="sample-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.routeHeading(name)}
            </h2>
            <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
              {t.routeBody}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {destination.matchedItineraries.map((it) => {
              const cardClasses =
                "flex h-full flex-col justify-between gap-4 rounded-[10px] bg-cream p-6 ring-1 ring-ink/10";
              const isPublicItinerary =
                it.available && publicItinerarySlugSet.has(it.slug);
              const routeLabel = it.label[locale];

              if (!isPublicItinerary) {
                return (
                  <li key={it.slug}>
                    <div className={cardClasses}>
                      <div className="flex flex-col gap-3">
                        <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-ink/70">
                          {t.customBadge}
                        </div>
                        <h3 className="text-[18px] font-misans-bold text-ink lg:text-[20px]">
                          {routeLabel}
                        </h3>
                        <p className="text-[13px] font-misans-regular leading-relaxed text-ink/65">
                          {t.customBody}
                        </p>
                      </div>
                      <Link
                        href={planHref}
                        className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade underline-offset-4 hover:underline"
                      >
                        {t.customLink} <ArrowRight aria-hidden size={12} />
                      </Link>
                    </div>
                  </li>
                );
              }

              return (
                <li key={it.slug}>
                  <Link
                    href={`/itineraries/${it.slug}`}
                    className={`group ${cardClasses} transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
                        {t.publicBadge}
                      </div>
                      <h3 className="text-[18px] font-misans-bold text-ink lg:text-[20px]">
                        {routeLabel}
                      </h3>
                      <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                        {t.publicBody}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade group-hover:underline">
                      {t.publicLink} <ArrowRight aria-hidden size={12} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SectionInner>
      </section>

      <section
        aria-labelledby="tailor-title"
        className="relative w-full bg-cream py-16 lg:py-24"
      >
        <SectionInner>
          <div className="mb-10 flex flex-col gap-3 lg:mb-14">
            <div className="text-[12px] font-misans-regular uppercase tracking-[0.18em] text-vermilion-deep">
              {t.tailorEyebrow}
            </div>
            <h2
              id="tailor-title"
              className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
            >
              {t.tailorHeading(name)}
            </h2>
          </div>
          <TailorMakePullCta destination={destination} lang={locale} />
        </SectionInner>
      </section>
    </main>
  );
}
