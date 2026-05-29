'use client';

import Link from 'next/link';

import { useDictionary, useLocale } from '@/components/i18n/LocaleProvider';
import { ContactChannelList } from '@/components/contact/ContactChannelList';
import { Reveal } from '@/components/motion/Reveal';
import { CONTACT_CHANNELS } from '@/lib/data/contact-channels';

export function LeadFormSuccess({ submissionId }: { submissionId: string }) {
  const { locale } = useLocale();
  const t = useDictionary();
  const ls = t.home.leadFormSuccess;
  const responsePromise = t.leadResponsePromise;
  const refLabel = locale === 'zh' ? '编号' : 'Reference';
  const visibleChannels = CONTACT_CHANNELS.filter(
    (c) => c.status !== 'hidden' && c.visibility !== 'hidden',
  );
  const externalChannels = visibleChannels.filter((c) => c.kind !== 'form');
  const whatsapp = visibleChannels.find((c) => c.kind === 'whatsapp');
  const wechat = visibleChannels.find((c) => c.kind === 'wechat');
  const hasDirectChannels = Boolean(whatsapp || wechat);

  return (
    <section
      id="lead-form"
      data-feedback-id="HOME-LEAD-FORM-SUCCESS-01"
      className="bg-paper py-20 lg:py-28"
    >
      <Reveal>
        <div className="mx-auto w-full max-w-3xl px-6 text-center lg:px-10">
          <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-jade">✓</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">
            {ls.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            {ls.subtitle}
          </p>
          <p className="mt-3 text-sm text-ink-soft/80">{responsePromise}</p>

          <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-vermilion/20 bg-vermilion-soft/35 p-5 text-left">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-vermilion">
              {ls.advisorPromiseEyebrow}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-tight text-ink">
              {ls.advisorPromiseTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {ls.advisorPromiseBody}
            </p>
            {hasDirectChannels && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                {whatsapp && (
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-vermilion px-5 py-3 text-sm font-medium text-soft-ivory hover:bg-vermilion-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    {ls.directWhatsApp}
                  </a>
                )}
                {wechat && (
                  <a
                    href={wechat.href}
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-jade px-5 py-3 text-sm font-medium text-jade hover:bg-jade hover:text-soft-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  >
                    {ls.directWeChat}
                  </a>
                )}
              </div>
            )}
          </div>

          {externalChannels.length > 0 ? (
            <>
              <p className="mt-8 text-sm font-medium text-ink">{ls.channelsHeading}</p>
              <div className="mt-4">
                <ContactChannelList variant="grid" locale={locale} channels={externalChannels} />
              </div>
            </>
          ) : (
            <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-soft">
              {ls.channelsFallback}
            </p>
          )}
          <p className="mt-8 text-xs text-ink-soft/70">
            {refLabel}: {submissionId}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-ink/10 px-5 text-sm font-medium text-ink-soft hover:border-jade hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            {ls.backHome}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default LeadFormSuccess;
