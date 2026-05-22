import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { MockBadge } from "@/components/trust/MockBadge";
import type { Itinerary } from "@/lib/data/itineraries";

export function AdvisorPullCta({ itinerary }: { itinerary: Itinerary }) {
  const planHref = `/plan?itinerary=${encodeURIComponent(itinerary.slug)}`;
  const waMsg = `想聊聊 ${itinerary.title.zh}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(waMsg)}`;

  return (
    <article className="grid grid-cols-1 gap-8 rounded-[12px] bg-paper p-6 ring-1 ring-ink/10 lg:grid-cols-[160px_1fr] lg:p-10">
      <div className="flex flex-col items-start gap-3">
        <div
          className="flex size-32 items-center justify-center rounded-full bg-vermilion-soft text-[40px] font-misans-heavy text-vermilion-deep ring-1 ring-vermilion/20"
          aria-hidden
        >
          L
        </div>
        <MockBadge>demo advisor</MockBadge>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            你的中国旅程顾问
          </div>
          <h3 className="text-[24px] font-misans-bold text-ink lg:text-[28px]">
            Lin · 北京 · 7 年定制
          </h3>
        </div>

        <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
          这条 {itinerary.title.zh} 是我们写过最稳的一版。但你的版本要按你的节奏来——天数、同行人、出行月份、酒店偏好、想看什么不想看什么，都是 1:1 跟我聊出来的。4 小时内 Lin 给你的邮箱发一份初步草稿。
        </p>

        <ul className="grid grid-cols-1 gap-2 text-[13px] font-misans-regular text-ink/70 sm:grid-cols-2">
          <li>北京顾问 4h 内回复（中国节假日除外）</li>
          <li>1 个工作日内出初步方案</li>
          <li>无销售奖金 / 无购物店</li>
          <li>落地后 24/7 顾问值班</li>
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAPrimary href={planHref} className="h-11 px-6">
            把这条路线交给 Lin 改
          </CTAPrimary>
          <a
            href={waHref}
            className="text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:text-jade hover:underline"
          >
            或者直接 WhatsApp 找 Lin →
          </a>
        </div>

        <p className="text-[12px] font-misans-regular text-ink/70">
          所有图片为占位 mock，上线前替换为真实顾问照片与 WhatsApp 号。
        </p>
      </div>
    </article>
  );
}
