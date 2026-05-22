import type { Duration } from "@/lib/data/destinations";

export function DurationCards({
  durations,
  lang = "zh",
}: {
  durations: Duration[];
  lang?: "zh" | "en";
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {durations.map((d) => {
        const label = lang === "zh" ? d.label.zh : d.label.en;
        const pitch = lang === "zh" ? d.pitch.zh : d.pitch.en;
        return (
          <article
            key={d.days}
            className="flex flex-col gap-3 rounded-[10px] bg-paper p-5 ring-1 ring-ink/10"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-misans-heavy leading-none text-vermilion">
                {d.days}
              </span>
              <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-ink/70">
                {lang === "zh" ? "天" : d.days === 1 ? "day" : "days"}
              </span>
            </div>
            <h3 className="text-[15px] font-misans-bold text-ink">{label}</h3>
            <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75 lg:text-[14px]">
              {pitch}
            </p>
          </article>
        );
      })}
    </div>
  );
}
