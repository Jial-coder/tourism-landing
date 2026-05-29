'use client';

import {
  TRUST_PROOFS,
  renderableProofs,
  type AdvisorProof,
  type CaseProof,
  type ReviewProof,
  type CredentialProof,
} from '@/lib/data/trust-proofs';
import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';

import { AdvisorProfileCard } from '@/components/trust/AdvisorProfileCard';
import { CaseStudyCard } from '@/components/trust/CaseStudyCard';
import { ReviewCard } from '@/components/trust/ReviewCard';
import { CredentialStrip } from '@/components/trust/CredentialStrip';
import { Reveal } from '@/components/motion/Reveal';

const TRUST_FALLBACK = {
  zh: [
    {
      title: '只展示授权评价',
      body: 'Tripadvisor、Google 和旅客照片只在拿到可公开授权后上线；没有授权就保持空位。',
    },
    {
      title: '只展示核验资质',
      body: '执照、支付合作和隐私文件只展示已核验版本；法务确认前保持核验中状态。',
    },
    {
      title: '先展示流程承诺',
      body: '目前首页只承诺真人回复、按对话定制、无固定套餐和行前信息用途边界。',
    },
    {
      title: '证据层可替换',
      body: '评价、案例、顾问和资质仍保留结构化入口，等真实资料通过后可以直接接入。',
    },
  ],
  en: [
    {
      title: 'Verified reviews only',
      body: 'Tripadvisor, Google and traveler photos only go live after public permission is available.',
    },
    {
      title: 'Verified credentials only',
      body: 'Licenses, payment partners and privacy documents are shown only after verification.',
    },
    {
      title: 'Promise the process first',
      body: 'For now, the page only promises human replies, custom planning, no preset menu and bounded use of form details.',
    },
    {
      title: 'Proof layer is ready',
      body: 'Reviews, cases, specialists and credentials still have structured slots for verified material later.',
    },
  ],
};

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
  const { locale } = useLocale();
  const t = dict.home.trustGrid;

  return (
    <section
      data-feedback-id="HOME-TRUST-GRID-01"
      className="bg-cream py-16 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-2 sm:gap-3">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
              {t.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>
            <p className="text-sm leading-normal text-ink-soft sm:text-base sm:leading-relaxed md:text-lg">
              {t.body}
            </p>
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <Reveal>
            <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {TRUST_FALLBACK[locale].map((item) => (
                <li key={item.title}>
                  <article className="flex h-full min-w-0 flex-col gap-2 rounded-2xl border border-ink/10 bg-paper p-4 sm:p-5">
                    <h3 className="font-serif text-base leading-snug text-ink sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-normal text-ink-soft sm:text-sm sm:leading-relaxed">
                      {item.body}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
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
        )}
      </div>
    </section>
  );
}

export default TrustProofGrid;
