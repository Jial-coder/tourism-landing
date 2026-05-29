import Link from "next/link";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import type { Destination } from "@/lib/data/destinations";

export function TailorMakePullCta({
  destination,
  lang = "zh",
}: {
  destination: Destination;
  lang?: "zh" | "en";
}) {
  const cn = destination.cn;
  const en = destination.en;
  const planHref = `/plan?destination=${encodeURIComponent(destination.slug)}`;

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
            {lang === "zh" ? "你的中国旅程顾问" : "Your China advisor"}
          </div>
          <h3 className="text-[24px] font-misans-bold text-ink lg:text-[28px]">
            {lang === "zh" ? "定制规划台 · 北京" : "Custom planning desk · Beijing"}
          </h3>
        </div>

        <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
          {lang === "zh"
            ? `把 ${cn} 加进你的草稿，告诉我们你的天数、同行人和预期，初步方案会通过表单流程整理。我们不卖标准包，所以这里不放价格表。`
            : `Add ${en} to your draft, tell us who you are travelling with and roughly when, and we will use the form flow to prepare a first-pass plan. We don't run packaged tours, so you won't find a price table here.`}
        </p>

        <ul className="grid grid-cols-1 gap-2 text-[13px] font-misans-regular text-ink/70 sm:grid-cols-2">
          <li>{lang === "zh" ? "先通过表单提交需求" : "Start with the request form"}</li>
          <li>{lang === "zh" ? "按月份和节奏整理" : "Shape the route around month and pace"}</li>
          <li>{lang === "zh" ? "不要求购买固定套餐" : "No fixed package requirement"}</li>
          <li>{lang === "zh" ? "行前确认支持边界" : "Support scope confirmed before departure"}</li>
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAPrimary href={planHref} className="h-11 px-6">
            {lang === "zh" ? `把 ${cn} 加进我的行程` : `Add ${en} to my plan`}
          </CTAPrimary>
          <Link
            href="/about"
            className="text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
          >
            {lang === "zh" ? "了解我们如何工作" : "See how we work"}
          </Link>
        </div>
      </div>
    </article>
  );
}
