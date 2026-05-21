import Image from 'next/image';
import en from '@/lib/data/dictionaries/en';

export function DestinationGrid() {
  const t = en.home.destinations;

  return (
    <section
      data-feedback-id="HOME-DESTINATIONS-01"
      className="bg-cream py-20 lg:py-28"
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

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {t.items.map((item) => (
            <li key={item.slug}>
              <a
                href="#lead-form"
                aria-label={`Plan a trip to ${item.name}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-ink/10 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade hover:shadow-xl hover:ring-jade/40"
              >
                <Image
                  src={`/landmarks/${item.slug}.jpg`}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-deep-slate/85 via-deep-slate/20 to-deep-slate/0"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
                  <h3 className="font-serif text-2xl leading-tight tracking-tight text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.5)]">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-snug text-soft-ivory/85">{item.hook}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DestinationGrid;
