import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";

type Slug = "zhangjiajie" | "jiuzhaigou" | "guilin" | "dali";

const DESTINATIONS: Record<Slug, {
  en: string;
  cn: string;
  tagline: string;
  intro: string;
  src: string;
  iata: string;
  gps: string;
}> = {
  zhangjiajie: {
    en: "Zhangjiajie",
    cn: "张家界",
    tagline: "砂岩柱林 · 雾峰 · 武陵源",
    intro:
      "湖南西北，砂岩柱林从林海中拔地而起，雾气在峰间翻涌。最适合 4-6 月雨后或 10-11 月秋色。我们会帮你避开人流最重的路线，安排一个能在山顶住一晚的版本。",
    src: "/landmarks/zhangjiajie.jpg",
    iata: "DYG",
    gps: "29.0970° N · 110.4795° E",
  },
  jiuzhaigou: {
    en: "Jiuzhaigou",
    cn: "九寨沟",
    tagline: "高山湖泊 · 川西秘境 · 九寨黄龙",
    intro:
      "四川阿坝，海子、瀑布、藏寨。9-10 月秋色最浓，水的颜色从碧绿到孔雀蓝层层叠。建议跟黄龙、若尔盖一起串成 6 天的川西线。",
    src: "/landmarks/jiuzhaigou.jpg",
    iata: "JZH",
    gps: "33.2604° N · 103.9189° E",
  },
  guilin: {
    en: "Guilin",
    cn: "桂林",
    tagline: "喀斯特 · 漓江 · 阳朔",
    intro:
      "广西桂林，从市区南下到阳朔的这段漓江，是国画里那种山一样的风景。可以骑行、坐筏、徒步、或者在山脚下的乡村酒店住几天。",
    src: "/landmarks/guilin.jpg",
    iata: "KWL",
    gps: "25.2734° N · 110.2900° E",
  },
  dali: {
    en: "Dali",
    cn: "大理",
    tagline: "洱海 · 苍山 · 古城白族",
    intro:
      "云南大理，苍山在西，洱海在东，中间夹着大理古城。3-5 月气候最舒服，可以骑环湖、白族村寨拜访、或者跟丽江-香格里拉串成 8 天的滇北线。",
    src: "/landmarks/dali.jpg",
    iata: "DLU",
    gps: "25.6065° N · 100.2675° E",
  },
};

export function generateStaticParams() {
  return Object.keys(DESTINATIONS).map((slug) => ({ slug }));
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in DESTINATIONS)) notFound();
  const d = DESTINATIONS[slug as Slug];

  return (
    <>
      <TopNav />
      <main className="flex-1">
        <section className="relative w-full min-h-[80vh] overflow-hidden bg-deep-slate">
          <div className="absolute inset-0">
            <Image
              src={d.src}
              alt={`${d.en} ${d.cn}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-deep-slate via-charcoal-blue/40 to-charcoal-blue/15"
          />
          <SectionInner className="relative pt-[160px] pb-20 lg:pb-32 min-h-[80vh] flex flex-col justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[13px] font-misans-regular text-soft-ivory/75 hover:text-soft-ivory mb-8 self-start"
            >
              <ArrowLeft size={14} aria-hidden /> 回首页
            </Link>
            <div className="flex flex-col gap-3 max-w-[680px]">
              <div className="flex items-center gap-3 text-[12px] font-misans-regular tracking-widest text-soft-ivory/55">
                <span>{d.gps}</span>
                <span>·</span>
                <span>{d.iata}</span>
              </div>
              <h1 className="text-[40px] lg:text-[72px] font-misans-heavy tracking-tight leading-[1.05] text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]">
                {d.en} · {d.cn}
              </h1>
              <p className="text-[15px] lg:text-[18px] font-misans-regular text-soft-ivory/85">
                {d.tagline}
              </p>
            </div>
          </SectionInner>
        </section>

        <section className="relative w-full bg-deep-slate py-16 lg:py-24">
          <SectionInner>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-12 lg:gap-20 items-start">
              <div className="flex flex-col gap-5 max-w-[640px]">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
                  这一站值得去吗
                </div>
                <p className="text-[15px] lg:text-[17px] font-misans-regular text-soft-ivory/80 leading-relaxed">
                  {d.intro}
                </p>
                <p className="text-[13px] font-misans-regular text-soft-ivory/55 leading-relaxed">
                  详细行程、住宿、最佳时节、签证 + 机票配置都由 Lin
                  跟你一对一聊完之后给。我们不卖标准包，所以这里不放价格表。
                </p>
              </div>
              <aside className="rounded-[8px] border border-soft-ivory/10 bg-charcoal-blue/40 p-5 flex flex-col gap-4">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
                  下一步
                </div>
                <p className="text-[14px] font-misans-regular text-soft-ivory/80 leading-relaxed">
                  把 {d.cn} 加进你的行程草稿，让 Lin 在 4 小时内回复一份初步方案。
                </p>
                <CTAPrimary
                  href={`/plan?destination=${encodeURIComponent(d.cn)}`}
                  className="h-11"
                >
                  把 {d.cn} 加进我的行程
                </CTAPrimary>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`想聊聊 ${d.cn} ${d.en}`)}`}
                  className="text-[13px] font-misans-regular text-soft-ivory/85 underline-offset-4 hover:underline"
                >
                  WhatsApp Lin · 直接聊 →
                </a>
              </aside>
            </div>
          </SectionInner>
        </section>
      </main>
      <Footer />
    </>
  );
}
