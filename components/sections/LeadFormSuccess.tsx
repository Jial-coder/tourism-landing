'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { ContactChannelList } from '@/components/contact/ContactChannelList';

export function LeadFormSuccess({ submissionId }: { submissionId: string }) {
  const { locale, t } = useLocale();
  const ls = t.home.leadFormSuccess;
  const responsePromise = t.leadResponsePromise;

  return (
    <section
      id="lead-form"
      data-feedback-id="HOME-LEAD-FORM-SUCCESS-01"
      className="bg-paper py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-10 text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">
          ✓
        </p>
        <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
          {ls.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
          {ls.subtitle}
        </p>
        <p className="mt-3 text-sm text-ink-soft/80">{responsePromise}</p>
        <p className="mt-8 text-sm font-medium text-ink">{ls.channelsHeading}</p>
        <div className="mt-4">
          <ContactChannelList variant="grid" locale={locale} />
        </div>
        <p className="mt-8 text-xs text-ink-soft/70">Reference: {submissionId}</p>
      </div>
    </section>
  );
}

export default LeadFormSuccess;
