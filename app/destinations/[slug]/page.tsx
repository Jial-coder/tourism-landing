import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";

type Slug =
  | "beijing"
  | "xian"
  | "shanghai"
  | "guilin"
  | "zhangjiajie"
  | "jiuzhaigou"
  | "dali"
  | "huangshan";

const DESTINATIONS: Record<Slug, {
  en: string;
  cn: string;
  tagline: string;
  intro: string;
  src: string;
  iata: string;
  gps: string;
}> = {
  beijing: {
    en: "Beijing",
    cn: "北京",
    tagline: "故宫红墙 · 长城秋色 · 胡同晨光",
    intro:
      "故宫的清晨没什么人，光从太和殿一侧斜进来，红墙黄瓦特别沉。10-11 月秋色压住整座城，长城慕田峪段的金黄能看一整天。我们会帮你跳过八达岭那种排队景点，安排一段需要走两小时的野长城，再回胡同里吃一顿熟人家的家常菜。",
    src: "/landmarks/beijing.jpg",
    iata: "PEK",
    gps: "39.9042° N · 116.4074° E",
  },
  xian: {
    en: "Xi'an",
    cn: "西安",
    tagline: "兵马俑 · 城墙 · 回坊夜市",
    intro:
      "十三朝古都，地下两米就可能埋着唐代的瓦。秦始皇陵兵马俑值得一上午，但更好玩的是骑车绕城墙一圈，14 公里的明城墙在脚下一直延伸。3-5 月或 9-10 月最舒服，傍晚去回坊吃一顿羊肉泡馍，顺便看看老城的烟火。",
    src: "/landmarks/xian.jpg",
    iata: "XIY",
    gps: "34.3416° N · 108.9398° E",
  },
  shanghai: {
    en: "Shanghai",
    cn: "上海",
    tagline: "外滩天际线 · 法租界梧桐 · 弄堂早茶",
    intro:
      "黄浦江两岸是两个时代叠在一起。傍晚走外滩看陆家嘴亮灯，第二天清晨去武康路喝杯咖啡，下午钻进弄堂看晾衣杆下的真实生活。4-5 月或 10-11 月气候最稳，我们会安排一个本地建筑师带你走老租界，听老房子背后的故事。",
    src: "/landmarks/shanghai.jpg",
    iata: "PVG",
    gps: "31.2304° N · 121.4737° E",
  },
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
  huangshan: {
    en: "Huangshan",
    cn: "黄山",
    tagline: "云海 · 奇松怪石 · 日出之巅",
    intro:
      "安徽南部的黄山，老一辈山水画里的样子就是从这儿来的。云海在山腰翻涌，迎客松立在悬崖边，凌晨四点起来去光明顶看日出值得一次失眠。3-5 月或 10-11 月最舒服，山上住一晚才能错开下午的索道人流，下山再去宏村看徽派古村，是很完整的两天。",
    src: "/landmarks/huangshan.jpg",
    iata: "TXN",
    gps: "30.1342° N · 118.1745° E",
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

        <section className="relative w-full bg-cream py-16 lg:py-24">
          <SectionInner>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-12 lg:gap-20 items-start">
              <div className="flex flex-col gap-5 max-w-[640px]">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">
                  这一站值得去吗
                </div>
                <p className="text-[15px] lg:text-[17px] font-misans-regular text-ink/85 leading-relaxed">
                  {d.intro}
                </p>
                <p className="text-[13px] font-misans-regular text-ink/55 leading-relaxed">
                  详细行程、住宿、最佳时节、签证 + 机票配置都由 Lin
                  跟你一对一聊完之后给。我们不卖标准包，所以这里不放价格表。
                </p>
              </div>
              <aside className="rounded-[8px] ring-1 ring-ink/10 bg-paper p-5 flex flex-col gap-4">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">
                  下一步
                </div>
                <p className="text-[14px] font-misans-regular text-ink/80 leading-relaxed">
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
                  className="text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:underline hover:text-jade"
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
