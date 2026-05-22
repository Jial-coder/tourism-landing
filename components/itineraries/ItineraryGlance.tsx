import type { GlanceRow } from "@/lib/data/itineraries";

export function ItineraryGlance({ glance }: { glance: GlanceRow[] }) {
  return (
    <div className="overflow-hidden rounded-[12px] ring-1 ring-ink/10 bg-paper">
      <table className="w-full text-left text-[14px] font-misans-regular text-ink">
        <thead>
          <tr className="bg-cream text-[12px] tracking-[0.18em] uppercase text-ink/70">
            <th scope="col" className="w-16 px-4 py-3">Day</th>
            <th scope="col" className="w-1/3 px-4 py-3">Cities</th>
            <th scope="col" className="px-4 py-3">Highlights</th>
          </tr>
        </thead>
        <tbody>
          {glance.map((row, i) => (
            <tr
              key={row.day}
              className={i === glance.length - 1 ? "" : "border-b border-ink/10"}
            >
              <td className="px-4 py-3 align-top text-[13px] font-misans-bold text-vermilion">
                D{row.day}
              </td>
              <td className="px-4 py-3 align-top text-[13px] font-misans-regular text-ink/85">
                {row.cities.join(" → ")}
              </td>
              <td className="px-4 py-3 align-top text-[13px] font-misans-regular text-ink/75">
                {row.oneLine.zh}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
