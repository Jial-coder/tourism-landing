'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import type { CaseProof } from '@/lib/data/trust-proofs';

export function CaseStudyCard({ proof }: { proof: CaseProof }) {
  const { locale } = useLocale();
  if (proof.status === 'hidden') return null;

  const daysLabel = locale === 'zh' ? '天' : 'days';
  const partyLabel = locale === 'zh' ? `${proof.partySize} 人出行` : `Party of ${proof.partySize}`;
  return (
    <article
      data-status={proof.status}
      className="relative flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-ink-soft">
        <span>{proof.customerType}</span>
        <span aria-hidden="true">·</span>
        <span>
          {proof.durationDays} {daysLabel}
        </span>
        <span aria-hidden="true">·</span>
        <span>{partyLabel}</span>
      </div>
      <p className="text-xs uppercase tracking-wider text-jade">
        {proof.destinations.join(' · ')}
      </p>
      <p className="font-serif text-lg leading-snug text-ink">{proof.outcome[locale]}</p>
      <p className="text-sm text-ink-soft">{proof.challenge[locale]}</p>
    </article>
  );
}

export default CaseStudyCard;
