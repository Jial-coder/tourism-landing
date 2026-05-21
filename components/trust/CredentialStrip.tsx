import { MockBadge } from '@/components/trust/MockBadge';
import type { CredentialProof } from '@/lib/data/trust-proofs';

const CATEGORY_LABEL: Record<CredentialProof['category'], string> = {
  entity: 'Entity',
  license: 'License',
  partner: 'Partner',
  payment: 'Payment',
  privacy: 'Privacy',
  process: 'Process',
};

export function CredentialStrip({ credentials }: { credentials: CredentialProof[] }) {
  if (credentials.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {credentials.map((c) => {
        const isMock = c.status === 'mock';
        return (
          <li
            key={c.id}
            data-status={c.status}
            className="relative flex h-full flex-col gap-2 rounded-2xl border border-ink/10 bg-cream p-5"
          >
            {isMock && <MockBadge className="self-start">placeholder</MockBadge>}
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-jade">
              {CATEGORY_LABEL[c.category]}
            </span>
            <h4 className="font-serif text-base leading-snug text-ink">
              {c.displayName.en}
            </h4>
            <p className="text-sm leading-relaxed text-ink-soft">{c.description.en}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CredentialStrip;
