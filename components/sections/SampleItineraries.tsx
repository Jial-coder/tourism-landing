import { MockBadge } from '@/components/trust/MockBadge';
import en from '@/lib/data/dictionaries/en';
import { exampleCases } from '@/lib/data/trust-proofs';

export function SampleItineraries() {
  const t = en.home.sampleItineraries;
  const cases = exampleCases();

  return (
    <section
      data-feedback-id="HOME-SAMPLE-ITINERARIES-01"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="flex max-w-3xl flex-col gap-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
            {t.eyebrow}
          </p>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
            {t.heading}
          </h2>
          <p className="text-base leading-relaxed text-ink-soft md:text-lg">{t.body}</p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition-colors hover:border-ink/20"
            >
              <div className="flex items-center justify-between gap-3">
                <MockBadge>example</MockBadge>
                <span className="font-serif text-sm tabular-nums text-ink-soft">
                  {c.durationDays} days
                </span>
              </div>

              <h3 className="mt-5 font-serif text-2xl leading-snug tracking-tight text-ink">
                {c.customerType}
              </h3>

              <p className="mt-3 text-sm font-medium uppercase tracking-wide text-jade">
                {c.destinations.join(' · ')}
              </p>

              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {c.outcome.en}
              </p>

              <a
                href="#lead-form"
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-jade underline-offset-4 transition-colors hover:text-jade-soft hover:underline"
              >
                {t.cta}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SampleItineraries;
