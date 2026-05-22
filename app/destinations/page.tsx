import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { DestinationListInteractive } from "@/components/destinations/DestinationListInteractive";
import { DESTINATIONS, DESTINATION_SLUGS } from "@/lib/data/destinations";

export const metadata = {
  title: "目的地 · 8 城精选 | pandatravel",
  description:
    "我们 v1 只做 8 座中国城市的深度路线，不是 28 城堆砌。每条路线由北京顾问 1:1 起草。",
};

export default function DestinationsListPage() {
  const items = DESTINATION_SLUGS.map((slug) => DESTINATIONS[slug]);

  return (
    <>
      <TopNav variant="always-chromed" />
      <main className="flex-1 bg-cream">
        {/* 1. Hero */}
        <section
          aria-labelledby="dest-list-hero-title"
          className="relative w-full bg-cream pt-28 pb-12 md:pt-36 lg:pb-16"
        >
          <SectionInner>
            <div className="flex max-w-[820px] flex-col gap-5">
              <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                Destinations
              </div>
              <h1
                id="dest-list-hero-title"
                className="text-[40px] font-misans-heavy leading-[1.05] tracking-tight text-ink md:text-[56px] lg:text-[72px]"
              >
                8 座城市，8 种进入中国的方式
              </h1>
              <p className="text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
                我们 v1 没有 28 城清单，只有 8 个我们自己反复走过的城市。每一个都标了主题、推荐天数和顾问下笔时会问你的第一句话——你来挑顺手的，剩下的中国由我们替你串。
              </p>
            </div>
          </SectionInner>
        </section>

        {/* 2. Filtered grid */}
        <section
          aria-labelledby="dest-list-grid-title"
          className="relative w-full bg-cream py-10 lg:py-16"
        >
          <SectionInner>
            <h2 id="dest-list-grid-title" className="sr-only">
              按主题筛选并查看 8 座城市
            </h2>
            <DestinationListInteractive items={items} />
          </SectionInner>
        </section>

        {/* 3. Why we curated 8 */}
        <section
          aria-labelledby="dest-list-why-title"
          className="relative w-full bg-paper py-16 lg:py-24"
        >
          <SectionInner>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
              <div className="flex flex-col gap-4">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Why 8, not 28
                </div>
                <h2
                  id="dest-list-why-title"
                  className="text-[28px] font-misans-heavy tracking-tight text-ink lg:text-[40px]"
                >
                  我们为什么只挑这 8 座
                </h2>
              </div>
              <div className="flex flex-col gap-4 text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
                <p>
                  中国有 30 多个值得停留的省级目的地。但 v1 我们只把 8 个写到深度——北京、西安、上海、桂林、张家界、九寨沟、大理、黄山。这 8 个不是我们「能写的最多」，是我们觉得「写一遍就能写到顾问敢自己回信的程度」。
                </p>
                <p>
                  比起一份 28 城的产品目录，我们更想给你一份 8 城的诚实地图：去过哪几个清晨、住过哪几家小院、哪一段路坐高铁不坐飞机更舒服。等首批旅客回来反馈之后，我们再决定要不要把第 9 个、第 10 个加进来。
                </p>
                <p className="text-[13px] text-ink/70">
                  不在这 8 个里面的目的地（比如成都、杭州、敦煌、新疆），我们仍然能替你串进定制行程，只是当前没有独立 8 章节的深度页。直接告诉 Lin 就行。
                </p>
              </div>
            </div>
          </SectionInner>
        </section>

        {/* 4. Tailor-Make CTA */}
        <section
          aria-labelledby="dest-list-cta-title"
          className="relative w-full bg-cream py-16 lg:py-24 border-t border-ink/10"
        >
          <SectionInner>
            <div className="flex flex-col items-start gap-6 rounded-[16px] bg-paper p-8 ring-1 ring-ink/10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
                  Tailor-Make
                </div>
                <h2
                  id="dest-list-cta-title"
                  className="text-[24px] font-misans-heavy tracking-tight text-ink lg:text-[32px]"
                >
                  想去的城市不在这 8 个里？
                </h2>
                <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/70">
                  我们仍然能写。直接告诉 Lin 你想要的中国——成都、杭州、敦煌、新疆、西藏都可以——4 小时内回你一版思路。
                </p>
              </div>
              <CTAPrimary href="/plan" className="h-12 px-7">
                告诉 Lin 我想去哪 →
              </CTAPrimary>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}
