'use client';

import { MockBadge } from '@/components/trust/MockBadge';
import { useDictionary } from '@/components/i18n/LocaleProvider';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { NumberTicker } from '@/components/motion/NumberTicker';

export function TrustStrip() {
  const dict = useDictionary();
  const items = dict.home.trustStrip.items;

  const marqueeItems = [
    'Beijing-based specialists',
    'Tailor-made, never packaged',
    'Real specialists, named replies',
    '24h reply window',
    '5-star sample reviews',
    'On-the-ground crisis support',
  ];

  return (
    <section
      data-feedback-id="HOME-TRUST-STRIP-01"
      className="bg-cream py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <ul
          aria-label="Trust statistics (sample)"
          className="grid list-none grid-cols-2 gap-8 p-0 md:grid-cols-4 md:gap-6"
        >
          {items.map((item, idx) => {
            const decimals = 'decimals' in item ? item.decimals : 0;
            return (
              <li key={item.label} className="flex flex-col items-center text-center">
                <Reveal delay={idx * 0.1} className="flex flex-col items-center text-center">
                  <span className="font-serif text-3xl tabular-nums text-ink md:text-4xl">
                    <NumberTicker
                      value={item.value}
                      decimals={decimals}
                      suffix={item.suffix}
                    />
                  </span>
                  <span className="mt-2 max-w-[180px] text-sm leading-snug text-ink-soft">
                    {item.label}
                  </span>
                  <MockBadge className="mt-3">sample</MockBadge>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <Marquee
            speed={36}
            items={marqueeItems.map((label) => (
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-ink-soft">
                {label}
              </span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
