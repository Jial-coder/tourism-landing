import en from '@/lib/data/dictionaries/en';

export function HowWeWork() {
  const t = en.home.howWeWork;

  return (
    <section
      data-feedback-id="HOME-HOW-WE-WORK-01"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
            {t.eyebrow}
          </p>
          <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
            {t.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {t.steps.map((step) => (
            <article
              key={step.num}
              className="rounded-2xl border border-ink/10 bg-paper p-8 transition-colors hover:border-ink/20"
            >
              <div className="font-serif text-5xl leading-none text-jade tabular-nums">
                {step.num}
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-snug tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-16">
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center rounded-full bg-jade px-7 py-3 text-sm font-semibold text-cream shadow-md shadow-jade/15 transition-colors hover:bg-jade-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowWeWork;
