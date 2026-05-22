import Link from "next/link";
import { CTAPrimary } from "@/components/atoms/CTAGhost";
import { MockBadge } from "@/components/trust/MockBadge";
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
  const waText = lang === "zh"
    ? `想聊聊 ${cn} ${en}`
    : `I'd like to talk about ${en} (${cn})`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(waText)}`;

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
            {lang === "zh" ? "你的中国旅程顾问" : "Your China advisor"}
          </div>
          <h3 className="text-[24px] font-misans-bold text-ink lg:text-[28px]">
            {lang === "zh" ? "Lin · 北京 · 7 年定制" : "Lin · Beijing-based, 7 yrs custom"}
          </h3>
        </div>

        <p className="max-w-[560px] text-[14px] font-misans-regular leading-relaxed text-ink/80 lg:text-[15px]">
          {lang === "zh"
            ? `把 ${cn} 加进你的草稿，告诉 Lin 你的天数、同行人和预期，初步方案会在 1 个工作日内回到你的邮箱。我们不卖标准包，所以这里看不到价格表。`
            : `Add ${en} to your draft, tell Lin who you are travelling with and roughly when, and a first-pass plan lands in your inbox within one business day. We don't run packaged tours, so you won't find a price table here.`}
        </p>

        <ul className="grid grid-cols-1 gap-2 text-[13px] font-misans-regular text-ink/70 sm:grid-cols-2">
          <li>{lang === "zh" ? "1 名顾问从询价到落地全程" : "One advisor from inquiry to arrival"}</li>
          <li>{lang === "zh" ? "1 个工作日内回方案" : "First plan within 1 business day"}</li>
          <li>{lang === "zh" ? "无销售奖金提成" : "No commission-driven upsells"}</li>
          <li>{lang === "zh" ? "落地后顾问值班" : "Advisor on-call during your trip"}</li>
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAPrimary href={planHref} className="h-11 px-6">
            {lang === "zh" ? `把 ${cn} 加进我的行程` : `Add ${en} to my plan`}
          </CTAPrimary>
          <a
            href={waHref}
            className="inline-flex items-center text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:text-jade hover:underline"
          >
            {lang === "zh" ? "WhatsApp Lin · 直接聊 →" : "WhatsApp Lin directly →"}
          </a>
          <Link
            href={destination.advisorAnchor}
            className="text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
          >
            {lang === "zh" ? "看 Lin 是谁" : "Meet Lin"}
          </Link>
        </div>
      </div>
    </article>
  );
}
