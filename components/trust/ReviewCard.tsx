import { MockBadge } from '@/components/trust/MockBadge';
import type { ReviewProof } from '@/lib/data/trust-proofs';

const PLATFORM_LABEL: Record<ReviewProof['platform'], string> = {
  tripadvisor: 'Tripadvisor',
  google: 'Google',
  email: 'Email',
  other: 'Verified Reviewer',
};

export function ReviewCard({ review }: { review: ReviewProof }) {
  const isMock = review.status === 'mock';
  return (
    <article
      data-status={review.status}
      className="relative flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
    >
      {isMock && <MockBadge className="self-start">mock</MockBadge>}
      <span aria-hidden="true" className="font-serif text-3xl leading-none text-jade">
        “
      </span>
      <p className="text-base leading-relaxed text-ink">{review.quote.en}</p>
      <div className="mt-auto flex flex-col gap-1 border-t border-ink/10 pt-3 text-xs text-ink-soft">
        <span className="font-medium text-ink">
          {PLATFORM_LABEL[review.platform]} placeholder
        </span>
        <span>
          {review.travelType} · {review.destination}
        </span>
      </div>
    </article>
  );
}

export default ReviewCard;
