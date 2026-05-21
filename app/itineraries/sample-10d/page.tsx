import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary, CTAGhost } from "@/components/atoms/CTAGhost";

const DAYS = [
  ["D1-D2", "北京", "抵达、胡同慢走、故宫与景山日落"],
  ["D3-D4", "西安", "兵马俑、城墙、回民街夜游"],
  ["D5-D6", "张家界", "砂岩峰林、玻璃栈道、森林公园轻徒步"],
  ["D7-D8", "桂林 · 阳朔", "漓江、喀斯特山水、乡村骑行"],
  ["D9-D10", "上海", "外滩、老城厢、返程前自由时间"],
];

export default function Sample10DPage() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-cream px-6 pt-28 pb-16 text-ink lg:px-16 lg:pt-36">
        <div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="flex flex-col gap-7">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">
              SAMPLE ITINERARY
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-[40px] font-misans-heavy leading-[1.08] tracking-tight lg:text-[72px]">
                10 天第一次来中国样板行程
              </h1>
              <p className="max-w-[680px] text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
                一条适合第一次来中国的参考线：城市文化、山水自然和轻松返程都覆盖。它不是固定套餐，只是帮你判断节奏和取舍。
              </p>
            </div>
            <div className="grid gap-4">
              {DAYS.map(([day, place, detail]) => (
                <article key={day} className="rounded-[12px] ring-1 ring-ink/10 bg-paper p-5">
                  <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">{day}</div>
                  <h2 className="mt-2 text-[22px] font-misans-bold text-ink">{place}</h2>
                  <p className="mt-2 text-[14px] font-misans-regular leading-relaxed text-ink/70">{detail}</p>
                </article>
              ))}
            </div>
          </section>
          <aside className="h-fit rounded-[12px] ring-1 ring-ink/10 bg-paper p-6">
            <h2 className="text-[22px] font-misans-bold">想改成你的版本？</h2>
            <p className="mt-3 text-[14px] font-misans-regular leading-relaxed text-ink/70">
              告诉我们你的天数、同行人和兴趣，顾问会把这条样板路线改成可执行的私人草案。
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <CTAPrimary href="/plan?sample=10d" className="h-11 px-6 text-[13px]">免费定制行程</CTAPrimary>
              <CTAGhost href="/" className="h-11 px-6">回到首页</CTAGhost>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
