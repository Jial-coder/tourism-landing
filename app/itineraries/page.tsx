import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { ItineraryListInteractive } from "@/components/itineraries/ItineraryListInteractive";
import { listItineraries } from "@/lib/data/itineraries";

export default function ItinerariesPage() {
  const items = listItineraries();

  return (
    <>
      <TopNav />
      <main className="flex-1 bg-cream">
        <section
          aria-labelledby="it-list-hero-title"
          className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
        >
          <SectionInner>
            <div className="flex flex-col gap-5 max-w-[820px]">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Itineraries
              </div>
              <h1
                id="it-list-hero-title"
                className="text-[40px] md:text-[56px] lg:text-[72px] font-misans-heavy tracking-tight leading-[1.05] text-ink"
              >
                先看一条样板路线 · 再改成你的版本
              </h1>
              <p className="text-[15px] lg:text-[17px] font-misans-regular leading-relaxed text-ink/75">
                这里是顾问写过最稳的 5 条样板。它们不是固定包，是给你判断节奏的起点。每条都打开看 10 章节深度，再告诉 Lin 你想加 / 减 / 换的细节。
              </p>
            </div>
          </SectionInner>
        </section>

        <section
          aria-labelledby="it-list-grid-title"
          className="relative w-full bg-cream py-10 lg:py-16"
        >
          <SectionInner>
            <h2 id="it-list-grid-title" className="sr-only">
              筛选并查看 5 条样板行程
            </h2>
            <ItineraryListInteractive items={items} />
          </SectionInner>
        </section>

        <section
          aria-labelledby="it-list-cta-title"
          className="relative w-full bg-paper py-16 lg:py-24 border-t border-ink/10"
        >
          <SectionInner>
            <div className="flex flex-col items-start gap-6 rounded-[16px] bg-cream p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Can&apos;t find yours?
                </div>
                <h2
                  id="it-list-cta-title"
                  className="text-[24px] lg:text-[32px] font-misans-heavy tracking-tight text-ink"
                >
                  没有完全符合的？告诉 Lin 你的版本。
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                  我们写得最多的是定制行程，不是清单上这 5 条。把你想要的中国发给 Lin，4 小时内回你。
                </p>
              </div>
              <CTAPrimary href="/plan" className="h-12 px-7">
                告诉 Lin 我想要的版本 →
              </CTAPrimary>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}
