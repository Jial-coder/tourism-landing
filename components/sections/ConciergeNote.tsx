import { SectionInner } from "@/components/atoms/SectionContainer";

/**
 * ConciergeNote — M-CONCIERGE-NOTE 顾问引言条幅（mini variant，与 BAND 派生但不带表单）。
 * brief: docs/modules/M-CONCIERGE-NOTE.md
 *
 * 不抢 ADVISOR-CARD 主角；只做"克制的顾问语气"。
 */
export function ConciergeNote() {
  return (
    <section
      data-feedback-id="CONCIERGE-NOTE-01"
      className="relative w-full bg-charcoal-blue/30 py-12 lg:py-16"
    >
      <SectionInner>
        <div className="max-w-[820px] mx-auto text-center flex flex-col gap-4">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] text-alpine-blue/80">
            顾问语气
          </div>
          <p className="text-[18px] lg:text-[24px] font-misans-bold leading-relaxed text-soft-ivory italic">
            "我们不卖路线。我们听你想去做什么，再帮你拼一条只属于你的中国。"
          </p>
          <p className="text-[13px] font-misans-regular text-soft-ivory/60">
            — 林颂阳 · Lin · 旅行顾问，2018 至今
          </p>
        </div>
      </SectionInner>
    </section>
  );
}
