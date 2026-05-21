'use client';

import {
  TRUST_PROOFS,
  renderableProofs,
  type AdvisorProof,
  type CaseProof,
  type ReviewProof,
  type CredentialProof,
} from '@/lib/data/trust-proofs';
import { useDictionary } from '@/components/i18n/LocaleProvider';

import { AdvisorProfileCard } from '@/components/trust/AdvisorProfileCard';
import { CaseStudyCard } from '@/components/trust/CaseStudyCard';
import { ReviewCard } from '@/components/trust/ReviewCard';
import { CredentialStrip } from '@/components/trust/CredentialStrip';
import { Reveal } from '@/components/motion/Reveal';

export function TrustProofGrid() {
  const isProduction = process.env.NODE_ENV === 'production';
  const visible = renderableProofs(TRUST_PROOFS, { isProduction });

  const advisors = visible.filter((p): p is AdvisorProof => p.kind === 'B_advisor');
  const cases = visible.filter((p): p is CaseProof => p.kind === 'C_case');
  const reviews = visible.filter((p): p is ReviewProof => p.kind === 'A_review');
  const credentials = visible.filter(
    (p): p is CredentialProof => p.kind === 'D_credential'
  );

  const dict = useDictionary();
  const t = dict.home.trustGrid;

  return (
    <section
      data-feedback-id="HOME-TRUST-GRID-01"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
              {t.heading}
            </h2>
            <p className="text-base leading-relaxed text-ink-soft md:text-lg">{t.body}</p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16">
          {advisors.length > 0 && (
            <Reveal>
              <div>
                <h3 className="font-serif text-2xl leading-snug text-ink">
                  {t.sections.advisors.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.sections.advisors.body}</p>
                <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {advisors.map((a) => (
                    <li key={a.id}>
                      <AdvisorProfileCard advisor={a} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {cases.length > 0 && (
            <Reveal>
              <div>
                <h3 className="font-serif text-2xl leading-snug text-ink">
                  {t.sections.cases.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.sections.cases.body}</p>
                <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                  {cases.map((c) => (
                    <li key={c.id}>
                      <CaseStudyCard proof={c} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {reviews.length > 0 && (
            <Reveal>
              <div>
                <h3 className="font-serif text-2xl leading-snug text-ink">
                  {t.sections.reviews.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.sections.reviews.body}</p>
                <ul className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {reviews.map((r) => (
                    <li key={r.id}>
                      <ReviewCard review={r} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {credentials.length > 0 && (
            <Reveal>
              <div>
                <h3 className="font-serif text-2xl leading-snug text-ink">
                  {t.sections.credentials.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.sections.credentials.body}</p>
                <div className="mt-6">
                  <CredentialStrip credentials={credentials} />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default TrustProofGrid;
