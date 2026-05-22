import { MockBadge } from "@/components/trust/MockBadge";

export function EarlyStatusBanner() {
  return (
    <div className="rounded-[16px] bg-paper p-6 ring-1 ring-ink/10 lg:p-10">
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              当前状态
            </span>
            <MockBadge>正在筹建 · pre-launch</MockBadge>
          </div>
          <h2 className="text-[24px] font-misans-heavy leading-tight tracking-tight text-ink lg:text-[32px]">
            正在招募首批旅客 · Reviews coming after first cohort
          </h2>
          <p className="max-w-[640px] text-[14px] font-misans-regular leading-relaxed text-ink/75 lg:text-[15px]">
            pandatravel v1 还没正式接客，所以这一页没有 16,917 条评价、没有 Tripadvisor 五颗星——那些数字我们不打算造。下面这一段写的是：在我们还没有真实评价的时候，你应该用什么尺子量我们。
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-[10px] bg-cream p-5 ring-1 ring-ink/10">
          <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
            Cohort 0 · 招募进度
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-misans-heavy leading-none text-ink">
              0
            </span>
            <span className="text-[13px] font-misans-regular text-ink/65">
              / 5 组首批旅客
            </span>
          </div>
          <p className="text-[12px] font-misans-regular leading-relaxed text-ink/70">
            首批 5 组旅客行程结束后开放真实评价聚合（Trustindex / Tripadvisor）。
          </p>
        </div>
      </div>
    </div>
  );
}
