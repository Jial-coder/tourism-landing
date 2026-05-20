import { notFound } from "next/navigation";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary, CTAGhost } from "@/components/atoms/CTAGhost";

type Theme = {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  bullets: string[];
};

const THEMES: Record<string, Theme> = {
  family: {
    slug: "family",
    title: "带孩子来中国，节奏要先对",
    kicker: "FAMILY TRAVEL",
    description: "少换酒店、少赶车、保留每天的恢复时间。顾问会先确认孩子年龄和体力，再推荐城市与自然组合。",
    bullets: ["亲子友好的酒店和车程", "可替换的雨天方案", "轻徒步与文化体验平衡"],
  },
  nature: {
    slug: "nature",
    title: "想看自然，就不要把城市塞太满",
    kicker: "NATURE FIRST",
    description: "张家界、九寨沟、桂林、大理可以走出完全不同的自然节奏。先选你喜欢的景观，我们再拼路线。",
    bullets: ["山地、湖泊、喀斯特、云海四类景观", "适合摄影和轻徒步的时段", "减少无意义中转"],
  },
  "business-add-on": {
    slug: "business-add-on",
    title: "出差后加几天，也能玩得像一趟旅行",
    kicker: "BUSINESS ADD-ON",
    description: "根据你的会议城市和返程机场，把 2-5 天空档改成顺路的城市漫游或自然短线。",
    bullets: ["按会议地点反推路线", "保留缓冲时间", "适配晚到早走航班"],
  },
  heritage: {
    slug: "heritage",
    title: "探亲和旅行可以放在同一条线里",
    kicker: "HERITAGE + LEISURE",
    description: "如果你有家族城市、祖籍线索或亲友安排，顾问会先把不可移动的探亲节点锁住，再补旅行段。",
    bullets: ["围绕固定探亲日期排程", "中英文沟通材料", "适合长辈同行的节奏"],
  },
};

export function generateStaticParams() {
  return Object.keys(THEMES).map((slug) => ({ slug }));
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = THEMES[slug];

  if (!theme) {
    notFound();
  }

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-deep-slate px-6 pt-28 pb-16 text-soft-ivory lg:px-16 lg:pt-36">
        <section className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-5">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
              {theme.kicker}
            </div>
            <h1 className="text-[40px] font-misans-heavy leading-[1.08] tracking-tight lg:text-[72px]">
              {theme.title}
            </h1>
            <p className="max-w-[700px] text-[15px] font-misans-regular leading-relaxed text-soft-ivory/72 lg:text-[17px]">
              {theme.description}
            </p>
            <div className="grid gap-3 pt-4">
              {theme.bullets.map((bullet) => (
                <div key={bullet} className="rounded-[10px] border border-soft-ivory/10 bg-charcoal-blue/35 px-4 py-3 text-[14px] font-misans-regular text-soft-ivory/72">
                  {bullet}
                </div>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-[12px] border border-soft-ivory/10 bg-charcoal-blue/45 p-6">
            <h2 className="text-[22px] font-misans-bold">让顾问按这个方向设计</h2>
            <p className="mt-3 text-[14px] font-misans-regular leading-relaxed text-soft-ivory/68">
              这只是切入点。你可以把它和目的地、天数、同行人一起发给 Lin。
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <CTAPrimary href={`/plan?theme=${theme.slug}`} className="h-11 px-6 text-[13px]">
                用这个方向定制行程
              </CTAPrimary>
              <CTAGhost href="/" className="h-11 px-6">回到首页</CTAGhost>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
