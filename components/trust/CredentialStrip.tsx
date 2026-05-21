'use client';

import { MockBadge } from '@/components/trust/MockBadge';
import { useLocale } from '@/components/i18n/LocaleProvider';
import type { CredentialProof } from '@/lib/data/trust-proofs';

const CATEGORY_LABEL_EN: Record<CredentialProof['category'], string> = {
  entity: 'Entity',
  license: 'License',
  partner: 'Partner',
  payment: 'Payment',
  privacy: 'Privacy',
  process: 'Process',
};

const CATEGORY_LABEL_ZH: Record<CredentialProof['category'], string> = {
  entity: '主体',
  license: '资质',
  partner: '合作方',
  payment: '支付',
  privacy: '隐私',
  process: '流程',
};

export function CredentialStrip({ credentials }: { credentials: CredentialProof[] }) {
  const { locale } = useLocale();
  if (credentials.length === 0) return null;
  const placeholderLabel = locale === 'zh' ? '占位' : 'placeholder';
  const labelMap = locale === 'zh' ? CATEGORY_LABEL_ZH : CATEGORY_LABEL_EN;
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
            {isMock && <MockBadge className="self-start">{placeholderLabel}</MockBadge>}
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-jade">
              {labelMap[c.category]}
            </span>
            <h4 className="font-serif text-base leading-snug text-ink">
              {c.displayName[locale]}
            </h4>
            <p className="text-sm leading-relaxed text-ink-soft">{c.description[locale]}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CredentialStrip;
