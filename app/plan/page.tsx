import { TopNav } from "@/components/chrome/TopNav";
import { ConciergeBand } from "@/components/sections/ConciergeBand";
import { TrustFootnote } from "@/components/sections/TrustFootnote";
import { Footer } from "@/components/sections/Footer";

export default function PlanPage() {
  return (
    <>
      <TopNav />
      <main className="flex-1 bg-cream text-ink">
        <section className="relative overflow-hidden px-6 pt-28 pb-12 lg:px-16 lg:pt-36 lg:pb-16">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-5">
            <div className="text-[12px] font-misans-regular tracking-[0.18em] text-jade">
              PLAN MY CHINA TRIP
            </div>
            <h1 className="max-w-[760px] text-[40px] font-misans-heavy leading-[1.08] tracking-tight text-ink lg:text-[72px]">
              把你的中国旅行想法发给真人顾问
            </h1>
            <p className="max-w-[680px] text-[15px] font-misans-regular leading-relaxed text-ink/75 lg:text-[17px]">
              不需要先选套餐。写下你大概想去哪里、什么时候出发、几个人同行，Lin 会把这些信息整理成一条可讨论的初步路线。
            </p>
          </div>
        </section>
        <ConciergeBand />
        <TrustFootnote />
      </main>
      <Footer />
    </>
  );
}
