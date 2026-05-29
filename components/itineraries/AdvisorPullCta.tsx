import { CTAPrimary } from "@/components/atoms/CTAGhost";
import type { Itinerary } from "@/lib/data/itineraries";

export function AdvisorPullCta({ itinerary }: { itinerary: Itinerary }) {
  const planHref = `/plan?itinerary=${encodeURIComponent(itinerary.slug)}`;

  return (
    <article className="grid grid-cols-1 gap-8 rounded-[12px] bg-paper p-6 ring-1 ring-ink/10 lg:grid-cols-[160px_1fr] lg:p-10">
      <div className="flex flex-col items-start gap-3">
        <div
          className="flex size-32 items-center justify-center rounded-full bg-vermilion-soft text-[40px] font-misans-heavy text-vermilion-deep ring-1 ring-vermilion/20"
          aria-hidden
        >
          L
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            你的中国旅程顾问
          </div>
          <h3 className="text-[24px] font-misans-bold text-ink lg:text-[28px]">
            定制规划台 · 北京
          </h3>
        </div>

        <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
          这条路线不作为固定产品销售。你的版本要按你的节奏来——天数、同行人、出行月份、酒店偏好、想看什么不想看什么，都会通过需求表单整理成初步草稿。
        </p>

        <ul className="grid grid-cols-1 gap-2 text-[13px] font-misans-regular text-ink/70 sm:grid-cols-2">
          <li>先通过表单提交需求</li>
          <li>1 个工作日内出初步方案</li>
          <li>无销售奖金 / 无购物店</li>
          <li>出行支持写入合同与行前包</li>
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAPrimary href={planHref} className="h-11 px-6">
            提交我的定制需求
          </CTAPrimary>
        </div>

        <p className="text-[12px] font-misans-regular text-ink/70">
          外部联系渠道确认前，公开页面只保留表单入口。
        </p>
      </div>
    </article>
  );
}
