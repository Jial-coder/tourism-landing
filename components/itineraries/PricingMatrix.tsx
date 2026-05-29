import type { Itinerary } from "@/lib/data/itineraries";

const HOTEL_LABEL: Record<string, string> = {
  '3-star': '3 星',
  '4-star': '4 星',
  '5-star': '5 星',
  luxury: '奢华',
  simple: '简约',
};

export function PricingMatrix({ pricing, days }: { pricing: Itinerary["pricing"]; days: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
            Tour Price
          </span>
        </div>
        <p className="text-[13px] font-misans-regular leading-relaxed text-ink/65">
          下面的数字是每人每晚酒店底价区间，不是最终成交价。你的真实报价由顾问根据出行月份、组人数、机票和加项 1:1 算给你。
        </p>
        <div className="overflow-hidden rounded-[12px] bg-cream ring-1 ring-ink/10">
          <table className="w-full text-left text-[14px] font-misans-regular">
            <thead className="bg-paper">
              <tr className="text-[12px] tracking-[0.18em] uppercase text-ink/70">
                <th scope="col" className="w-1/3 px-4 py-3">酒店等级</th>
                <th scope="col" className="px-4 py-3 text-right">USD / 晚 / 人</th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">说明</th>
              </tr>
            </thead>
            <tbody>
              {pricing.base.map((row, i) => (
                <tr
                  key={row.hotelClass}
                  className={i === pricing.base.length - 1 ? "" : "border-b border-ink/10"}
                >
                  <td className="px-4 py-3 text-[13px] font-misans-bold text-ink">
                    {HOTEL_LABEL[row.hotelClass] ?? row.hotelClass}
                  </td>
                  <td className="px-4 py-3 text-right text-[16px] font-misans-bold text-vermilion">
                    USD {row.usdPerNight.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-ink/65 hidden md:table-cell">
                    {row.note?.zh ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex h-fit flex-col gap-3 rounded-[12px] bg-paper p-5 ring-1 ring-ink/10">
        <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-jade">
          含 / 不含
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[12px] font-misans-bold tracking-[0.1em] uppercase text-ink/65">含</p>
          <ul className="flex flex-col gap-1.5 text-[13px] font-misans-regular text-ink/80">
            {pricing.inclusions.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-jade" />
                <span>{it.zh}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-[12px] font-misans-bold tracking-[0.1em] uppercase text-ink/65">不含</p>
          <ul className="flex flex-col gap-1.5 text-[13px] font-misans-regular text-ink/65">
            {pricing.exclusions.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink/25" />
                <span>{it.zh}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 text-[12px] font-misans-regular text-ink/70">
          全程 {days} 天 · 人均区间在 1:1 沟通后给定
        </p>
      </div>
    </div>
  );
}
