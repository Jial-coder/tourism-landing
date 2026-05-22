import Image from "next/image";
import type { DayBlock, DayActivity } from "@/lib/data/itineraries";
import { TailorMakeTip } from "./TailorMakeTip";

function ActivityRow({ activity }: { activity: DayActivity }) {
  return (
    <li className="flex gap-3 text-[13px] font-misans-regular leading-relaxed text-ink/80">
      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink/30" />
      <div className="flex flex-col gap-1">
        <p className="text-ink">{activity.activity.zh}</p>
        {activity.note ? (
          <p className="text-[12px] text-ink/70 italic">
            tip · {activity.note.zh}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function DayPart({ label, items }: { label: string; items: DayActivity[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
        {label}
      </div>
      <ul className="flex flex-col gap-2">
        {items.map((it, i) => (
          <ActivityRow key={i} activity={it} />
        ))}
      </ul>
    </div>
  );
}

export function DayByDayAccordion({ days }: { days: DayBlock[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {days.map((d, i) => (
        <li key={d.day}>
          <details
            className="group rounded-[12px] bg-paper ring-1 ring-ink/10 open:ring-ink/15 motion-reduce:open:[--no-anim:1]"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-[12px]">
              <div className="flex flex-col gap-1">
                <div className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion">
                  Day {d.day}
                </div>
                <div className="text-[18px] font-misans-bold text-ink lg:text-[20px]">
                  {d.cityCn ?? d.city} · {d.city}
                </div>
              </div>
              <span
                aria-hidden
                className="mt-2 size-2.5 shrink-0 rounded-full bg-vermilion/30 transition-transform group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>

            <div className="grid grid-cols-1 gap-6 px-5 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,260px)] lg:gap-8">
              <div className="flex flex-col gap-5">
                <DayPart label="Morning" items={d.morning} />
                <DayPart label="Afternoon" items={d.afternoon} />
                <DayPart label="Evening" items={d.evening} />
                {d.tailorMakeTip ? (
                  <TailorMakeTip tip={d.tailorMakeTip} />
                ) : null}
              </div>
              {d.images.length ? (
                <div className="flex flex-col gap-3">
                  {d.images.map((img) => (
                    <div
                      key={img.src + img.alt.zh}
                      className="relative aspect-[4/3] overflow-hidden rounded-[8px] ring-1 ring-ink/10"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt.zh}
                        fill
                        sizes="(min-width:1024px) 260px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
