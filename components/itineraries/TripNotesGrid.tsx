import type { Itinerary } from "@/lib/data/itineraries";

const NOTE_LABELS: { key: keyof Itinerary["tripNotes"]; zh: string; en: string }[] = [
  { key: "accommodation", zh: "住", en: "Accommodation" },
  { key: "transportation", zh: "行", en: "Transportation" },
  { key: "meals", zh: "吃", en: "Meals" },
  { key: "visa", zh: "签证", en: "Visa" },
];

export function TripNotesGrid({ notes }: { notes: Itinerary["tripNotes"] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {NOTE_LABELS.map(({ key, zh, en }) => (
        <article
          key={key}
          className="flex h-full flex-col gap-3 rounded-[12px] bg-paper p-5 ring-1 ring-ink/10"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[18px] font-misans-bold text-ink">{zh}</h3>
            <span className="text-[11px] font-misans-regular tracking-[0.18em] uppercase text-jade">
              {en}
            </span>
          </div>
          <p className="text-[13px] font-misans-regular leading-relaxed text-ink/75">
            {notes[key].zh}
          </p>
        </article>
      ))}
    </div>
  );
}
