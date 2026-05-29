'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { CTAPrimary } from '@/components/atoms/CTAGhost';

export function QuickContactCard() {
  const { t } = useLocale();
  const dict = t.home.visaFree;
  return (
    <article className="flex flex-col gap-5 rounded-[12px] bg-vermilion-soft/70 p-6 ring-1 ring-vermilion/20 lg:p-10">
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-vermilion-deep">
          {dict.contact.heading}
        </span>
        <p className="text-[16px] font-misans-bold text-ink lg:text-[18px]">{dict.contact.body}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <CTAPrimary href="/plan?type=visa-free" className="h-11">
          {dict.contact.whatsappCta}
        </CTAPrimary>
        <a
          href={dict.contact.embassyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-misans-regular text-ink/75 underline-offset-4 hover:text-jade hover:underline"
        >
          {dict.contact.embassyCta}
        </a>
        <a
          href="#not-on-list"
          className="text-[13px] font-misans-regular text-ink/70 underline-offset-4 hover:text-jade hover:underline"
        >
          {dict.contact.notOnListCta}
        </a>
      </div>
    </article>
  );
}
