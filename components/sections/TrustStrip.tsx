'use client';

import { useDictionary } from '@/components/i18n/LocaleProvider';
import { NumberTicker } from '@/components/motion/NumberTicker';
import { Reveal } from '@/components/motion/Reveal';

export function TrustStrip() {
  const dict = useDictionary();
  const items = dict.home.trustStrip.items;

  return (
    <section
      aria-label="Trip planning trust signals"
      data-feedback-id="HOME-TRUST-STRIP-01"
      className="border-b border-ink/10 bg-cream text-ink"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-5 md:py-7 lg:px-10">
        <Reveal>
          <dl className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.label}
                className="min-h-[92px] rounded-lg border border-ink/10 bg-soft-ivory px-3 py-3 shadow-sm sm:min-h-[116px] sm:px-4 sm:py-4"
              >
                <dt className="text-xs leading-snug text-ink-soft sm:text-sm sm:leading-relaxed">
                  {item.label}
                </dt>
                <dd className="mt-2 font-serif text-xl leading-none text-ink sm:mt-3 sm:text-3xl md:text-4xl">
                  <NumberTicker
                    value={item.value}
                    suffix={item.suffix}
                    animateFromZero={false}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export default TrustStrip;
