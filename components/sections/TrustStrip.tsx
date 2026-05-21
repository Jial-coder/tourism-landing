import { MockBadge } from '@/components/trust/MockBadge';
import en from '@/lib/data/dictionaries/en';

export function TrustStrip() {
  const items = en.home.trustStrip.items;

  return (
    <section
      data-feedback-id="HOME-TRUST-STRIP-01"
      className="bg-cream py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {items.map((item) => (
            <div key={item.stat} className="flex flex-col items-center text-center">
              <dt className="font-serif text-3xl tabular-nums text-ink md:text-4xl">
                {item.stat}
              </dt>
              <dd className="mt-2 max-w-[180px] text-sm leading-snug text-ink-soft">
                {item.label}
              </dd>
              <MockBadge className="mt-3">sample</MockBadge>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default TrustStrip;
