import type { Bilingual } from "@/lib/data/itineraries";

export function TailorMakeTip({ tip }: { tip: Bilingual }) {
  return (
    <div className="flex items-start gap-3 rounded-[8px] bg-cream px-4 py-3 ring-1 ring-jade/30">
      <span
        aria-hidden
        className="mt-1 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-jade/15 text-[10px] font-misans-bold uppercase tracking-[0.1em] text-jade"
      >
        T
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-misans-bold tracking-[0.18em] uppercase text-jade">
          Tailor-make this
        </span>
        <p className="text-[13px] font-misans-regular leading-relaxed text-ink/85">
          {tip.zh}
        </p>
      </div>
    </div>
  );
}
