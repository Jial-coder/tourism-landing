import { CTAPrimary, CTAGhost } from "@/components/atoms/CTAGhost";
import { SectionInner } from "@/components/atoms/SectionContainer";
import { MessageCircle } from "lucide-react";

/**
 * DualCTA — M-DUAL-CTA full variant（不是 hero 内的 placeholder，也不是 nav compact）。
 * brief: docs/modules/M-DUAL-CTA.md (3 变体之一：full)
 */
export function DualCTA() {
  return (
    <section
      data-feedback-id="DUAL-CTA-01"
      className="relative w-full bg-charcoal-blue/40 py-16 lg:py-24"
    >
      <SectionInner>
        <div className="flex flex-col items-center text-center gap-6 max-w-[760px] mx-auto">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
            两条入口
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-misans-bold leading-tight text-soft-ivory tracking-tight">
            想好了再聊，或者现在就 WhatsApp
          </h2>
          <p className="text-[14px] lg:text-[16px] font-misans-regular text-soft-ivory/75 leading-relaxed">
            主入口给"先想清楚"的你 · 一条副入口给"现在就想问一句"的你。我们不会用同一个表单同时套两件事。
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <CTAPrimary href="/plan" className="h-12 px-8 text-[14px]">
              免费定制行程
            </CTAPrimary>
            <CTAGhost href="https://wa.me/" className="h-12 px-7">
              <MessageCircle size={14} className="mr-2" aria-hidden />
              WhatsApp · 值班顾问
            </CTAGhost>
          </div>
          <p className="text-[12px] font-misans-regular italic text-soft-ivory/55 mt-1">
            想看一份现成方案？<a href="/itineraries/sample-10d" className="underline-offset-4 hover:underline">10 天样板行程 →</a>
          </p>
        </div>
      </SectionInner>
    </section>
  );
}
