import { TopNav } from "@/components/chrome/TopNav";
import { Footer } from "@/components/sections/Footer";
import { CTAPrimary } from "@/components/atoms/CTAGhost";

export default function ItinerariesPage() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-deep-slate px-6 pt-28 pb-16 text-soft-ivory lg:px-16 lg:pt-36">
        <section className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
            ITINERARIES
          </div>
          <h1 className="text-[40px] font-misans-heavy leading-[1.08] tracking-tight lg:text-[72px]">
            先看一条样板路线
          </h1>
          <p className="max-w-[680px] text-[15px] font-misans-regular leading-relaxed text-soft-ivory/72 lg:text-[17px]">
            样板行程用来帮你判断节奏，不是固定套餐。当前先开放 10 天第一次来中国路线。
          </p>
          <div className="mt-4 rounded-[12px] border border-soft-ivory/10 bg-charcoal-blue/35 p-6">
            <h2 className="text-[24px] font-misans-bold">10 天第一次来中国</h2>
            <p className="mt-2 text-[14px] font-misans-regular text-soft-ivory/68">
              北京、西安、张家界、桂林、上海，一条平衡文化和自然的参考线。
            </p>
            <CTAPrimary href="/itineraries/sample-10d" className="mt-5 h-11 px-6 text-[13px]">
              查看 10 天样板行程
            </CTAPrimary>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
