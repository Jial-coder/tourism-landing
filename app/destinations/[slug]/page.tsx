import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { MockBadge } from "@/components/trust/MockBadge";
import { WowPointsList } from "@/components/destinations/WowPointsList";
import { BestTimeStrip } from "@/components/destinations/BestTimeStrip";
import { DurationCards } from "@/components/destinations/DurationCards";
import { NearbyGrid } from "@/components/destinations/NearbyGrid";
import { TailorMakePullCta } from "@/components/destinations/TailorMakePullCta";
import {
  DESTINATIONS,
  DESTINATION_SLUGS,
  getDestination,
} from "@/lib/data/destinations";

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const planHref = `/plan?destination=${encodeURIComponent(d.slug)}`;
  const waMsg = `想聊聊 ${d.cn} ${d.en}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <TopNav />
      <main className="flex-1">
        {/* 1. Hero — 唯一暗段保留 */}
        <section
          aria-labelledby="dest-hero-title"
          className="relative w-full min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] overflow-hidden bg-deep-slate"
        >
          <div className="absolute inset-0">
            <Image
              src={d.hero.src}
              alt={d.hero.alt.zh}
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
          <SectionInner className="relative pt-[140px] pb-16 md:pt-[160px] md:pb-20 lg:pb-32 min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] flex flex-col justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-misans-regular text-soft-ivory/75 hover:text-soft-ivory mb-8 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-slate rounded-sm"
            >
              <ArrowLeft size={14} aria-hidden /> 回首页
            </Link>
            <div className="flex flex-col gap-3 max-w-[760px]">
              <div className="flex items-center gap-3 text-[12px] font-misans-regular tracking-widest text-soft-ivory/60">
                <span>{d.gps}</span>
                <span aria-hidden>·</span>
                <span>{d.iata}</span>
              </div>
              <h1
                id="dest-hero-title"
                className="text-[40px] md:text-[56px] lg:text-[72px] font-misans-heavy tracking-tight leading-[1.05] text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]"
              >
                {d.en} · {d.cn}
              </h1>
              <p className="text-[15px] lg:text-[18px] font-misans-regular text-soft-ivory/85">
                {d.tagline.zh}
              </p>
            </div>
          </SectionInner>
        </section>

        {/* 2. Why Visit Now */}
        <section
          aria-labelledby="why-visit-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-20">
              <div className="flex flex-col gap-5 max-w-[680px]">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  这一站值得去吗
                </div>
                <h2
                  id="why-visit-title"
                  className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
                >
                  {d.cn}，{d.tagline.zh.split(" · ")[0]}
                </h2>
                <p className="text-[15px] lg:text-[17px] font-misans-regular leading-relaxed text-ink/80">
                  {d.whyVisit.zh}
                </p>
                <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                  详细行程、住宿、最佳时节、签证 + 机票配置都由 Lin 跟你一对一聊完之后给。我们不卖标准包，所以这里不放价格表。
                </p>
              </div>
              <div className="flex h-fit flex-col gap-4 rounded-[10px] bg-paper p-6 ring-1 ring-ink/10">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                    下一步
                  </span>
                  <MockBadge>sample data</MockBadge>
                </div>
                <p className="text-[14px] font-misans-regular leading-relaxed text-ink/80">
                  把 {d.cn} 加进你的行程草稿，让 Lin 在 1 个工作日内回复一份初步方案。
                </p>
                <CTAPrimary href={planHref} className="h-11">
                  把 {d.cn} 加进我的行程
                </CTAPrimary>
                <a
                  href={waHref}
                  className="text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:text-jade hover:underline"
                >
                  WhatsApp Lin · 直接聊 →
                </a>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 3. Wow Points */}
        <section
          aria-labelledby="wow-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Wow Points · 在 {d.cn} 真正会被记住的几件事
              </div>
              <h2
                id="wow-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                3–5 个清晨值得早起的瞬间
              </h2>
            </div>
            <WowPointsList points={d.wowPoints} />

            {/* 节奏 CTA #1 */}
            <p className="mt-10 text-[14px] font-misans-regular text-ink/65">
              不确定哪个最适合你？{" "}
              <Link
                href={planHref}
                className="text-jade underline-offset-4 hover:underline"
              >
                告诉顾问，让 Lin 替你挑 →
              </Link>
            </p>
          </SectionInner>
        </section>

        {/* 4. Best Time to Visit */}
        <section
          aria-labelledby="best-time-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Best Time
              </div>
              <h2
                id="best-time-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                12 个月里，哪几个月去最舒服
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
              <BestTimeStrip bestTime={d.bestTime} slug={d.slug} />
              <div className="flex h-fit flex-col gap-3 rounded-[10px] bg-paper p-5 ring-1 ring-ink/10">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  气候提示
                </div>
                <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75">
                  数据为多年公开历史平均，具体年份会偏移。Lin 会按你的出发月份，推荐能避开人潮 / 雨季的具体路线。
                </p>
                <MockBadge className="self-start">sample averages</MockBadge>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 5. How Long to Stay */}
        <section
          aria-labelledby="duration-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                How Long to Stay
              </div>
              <h2
                id="duration-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                {d.cn} 留几天才不亏
              </h2>
            </div>
            <DurationCards durations={d.durations} />

            {/* 节奏 CTA #2 */}
            <p className="mt-10 text-[14px] font-misans-regular text-ink/65">
              拿不准要排几天？{" "}
              <Link
                href={planHref}
                className="text-jade underline-offset-4 hover:underline"
              >
                告诉顾问，让 Lin 帮你算节奏 →
              </Link>
            </p>
          </SectionInner>
        </section>

        {/* 6. Nearby & Combine */}
        <section
          aria-labelledby="nearby-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Nearby & Combine
              </div>
              <h2
                id="nearby-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                顺路的城市，可串成 X 天的中国之旅
              </h2>
              <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                每条都标了高铁 / 飞行时间和推荐天数，你可以把它当成 {d.cn} 的延伸方向。
              </p>
            </div>
            <NearbyGrid refs={d.nearby} />
          </SectionInner>
        </section>

        {/* 7. Sample Itineraries Match */}
        <section
          aria-labelledby="sample-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Sample Itineraries
              </div>
              <h2
                id="sample-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                我们已经写过的样板，{d.cn} 在哪些里
              </h2>
              <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/70 lg:text-[15px]">
                样板是参考节奏，不是固定包。Lin 会按你的偏好把样板改成你的私人草案。
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {d.matchedItineraries.map((it) => {
                const cardClasses =
                  "flex h-full flex-col justify-between gap-4 rounded-[10px] bg-cream p-6 ring-1 ring-ink/10";
                if (!it.available) {
                  return (
                    <li key={it.slug}>
                      <div className={cardClasses}>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-ink/70">
                              筹建中
                            </span>
                            <MockBadge>coming soon</MockBadge>
                          </div>
                          <h3 className="text-[18px] font-misans-bold text-ink lg:text-[20px]">
                            {it.label.zh}
                          </h3>
                          <p className="text-[13px] font-misans-regular leading-relaxed text-ink/65">
                            这条样板我们正在写。如果你想要它的预览或者类似主题的私人草案，告诉 Lin 一句就行。
                          </p>
                        </div>
                        <Link
                          href={planHref}
                          className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade underline-offset-4 hover:underline"
                        >
                          请 Lin 写一份给我 <ArrowRight aria-hidden size={12} />
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
                        <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                          已写好
                        </div>
                        <h3 className="text-[18px] font-misans-bold text-ink lg:text-[20px]">
                          {it.label.zh}
                        </h3>
                        <p className="text-[13px] font-misans-regular leading-relaxed text-ink/70">
                          看完整版样板节奏 + 城市配比 + 价格区间。
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[13px] font-misans-regular text-jade group-hover:underline">
                        看完整样板 <ArrowRight aria-hidden size={12} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SectionInner>
        </section>

        {/* 8. Tailor-Make CTA + Advisor pull */}
        <section
          aria-labelledby="tailor-title"
          className="relative w-full bg-cream py-16 lg:py-24"
        >
          <SectionInner>
            <div className="mb-10 flex flex-col gap-3 lg:mb-14">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Tailor-Make
              </div>
              <h2
                id="tailor-title"
                className="text-[28px] lg:text-[40px] font-misans-heavy tracking-tight text-ink"
              >
                把 {d.cn} 改成你的版本
              </h2>
            </div>
            <TailorMakePullCta destination={d} />
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}

// 防止 destinations 数据被 tree-shake 剪掉（有时类型 only import 的字段会被打包器误判）
void DESTINATIONS;
