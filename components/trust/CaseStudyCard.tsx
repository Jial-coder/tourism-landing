import { MockBadge } from '@/components/trust/MockBadge';
import type { CaseProof } from '@/lib/data/trust-proofs';

export function CaseStudyCard({ proof }: { proof: CaseProof }) {
  const isMock = proof.status === 'mock';
  return (
    <article
      data-status={proof.status}
      className="relative flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
    >
      {isMock && <MockBadge className="self-start">example</MockBadge>}
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-ink-soft">
        <span>{proof.customerType}</span>
        <span aria-hidden="true">·</span>
        <span>{proof.durationDays} days</span>
        <span aria-hidden="true">·</span>
        <span>Party of {proof.partySize}</span>
      </div>
      <p className="text-xs uppercase tracking-wider text-jade">
        {proof.destinations.join(' · ')}
      </p>
      <p className="font-serif text-lg leading-snug text-ink">{proof.outcome.en}</p>
      <p className="text-sm text-ink-soft">{proof.challenge.en}</p>
    </article>
  );
}

export default CaseStudyCard;
