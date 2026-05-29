'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import type { AdvisorProof } from '@/lib/data/trust-proofs';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);

export function AdvisorProfileCard({ advisor }: { advisor: AdvisorProof }) {
  const { locale } = useLocale();
  if (advisor.status === 'hidden') return null;

  return (
    <article
      data-status={advisor.status}
      className="relative flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-cream p-6"
    >
      <div
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-jade/20 via-jade-soft/30 to-gold/20 font-serif text-xl text-ink ring-1 ring-ink/10"
      >
        {initials(advisor.displayName.en)}
      </div>
      <div>
        <h4 className="font-serif text-lg leading-snug text-ink">
          {advisor.displayName[locale]}
        </h4>
        <p className="mt-1 text-sm text-ink-soft">{advisor.role[locale]}</p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {advisor.languages.map((lang) => (
          <li
            key={lang}
            className="rounded-full border border-ink/15 bg-paper px-2.5 py-0.5 text-[11px] font-medium text-ink-soft"
          >
            {lang}
          </li>
        ))}
      </ul>
      <p className="text-xs uppercase tracking-wider text-jade">
        {advisor.destinations.slice(0, 4).join(' · ')}
      </p>
      <p className="mt-auto text-xs text-ink-soft">{advisor.responseModel[locale]}</p>
    </article>
  );
}

export default AdvisorProfileCard;
