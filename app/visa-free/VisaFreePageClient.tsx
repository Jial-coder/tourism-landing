'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { CaveatsList } from '@/components/visa-free/CaveatsList';
import { ReadymadeRoutes } from '@/components/visa-free/ReadymadeRoutes';

export function VisaFreeHeroCopy() {
  const { t } = useLocale();
  return (
    <div className="flex flex-col gap-4 max-w-[760px]">
      <span className="text-[12px] font-misans-regular tracking-[0.18em] uppercase text-soft-ivory/65">
        {t.home.visaFree.eyebrow}
      </span>
      <h1
        id="visa-free-hero-title"
        className="text-[36px] md:text-[48px] lg:text-[64px] font-misans-heavy tracking-tight leading-[1.05] text-soft-ivory drop-shadow-[0_2px_8px_rgba(15,23,42,0.4)]"
      >
        {t.home.visaFree.headline}
      </h1>
      <p className="text-[15px] lg:text-[17px] font-misans-regular text-soft-ivory/85 max-w-[640px]">
        {t.home.visaFree.lede}
      </p>
    </div>
  );
}

export function VisaFreeHeroSourceLabel() {
  const { t } = useLocale();
  return <>{t.home.visaFree.sourceLabel}</>;
}

export function VisaFreeHeroLastReviewedLabel() {
  const { t } = useLocale();
  return <>{t.home.visaFree.lastReviewedLabel}</>;
}

export function VisaFreeSectionLabel({
  which,
}: {
  which: 'caveats' | 'tailor' | 'readymade' | 'contact';
}) {
  const { locale } = useLocale();
  const map: Record<typeof which, { en: string; zh: string }> = {
    caveats: { en: 'Caveats', zh: '细则' },
    tailor: { en: 'Tailor-make', zh: '定制' },
    readymade: { en: 'Ready-made', zh: '已写好' },
    contact: { en: 'Quick contact', zh: '快速联系' },
  };
  return <>{locale === 'zh' ? map[which].zh : map[which].en}</>;
}

export function VisaFreeCaveatsHeading() {
  const { t } = useLocale();
  return <>{t.home.visaFree.caveats.heading}</>;
}

export function VisaFreeCaveats() {
  const { t } = useLocale();
  return <CaveatsList dict={t.home.visaFree} />;
}

export function VisaFreeReadymade() {
  const { t, locale } = useLocale();
  return <ReadymadeRoutes dict={t.home.visaFree} locale={locale} />;
}

export function VisaFreeTailorHeading() {
  const { t } = useLocale();
  return <>{t.home.visaFree.tailorMake.heading}</>;
}

export function VisaFreeTailorBody() {
  const { t } = useLocale();
  return <>{t.home.visaFree.tailorMake.body}</>;
}

export function VisaFreeTailorCta() {
  const { t } = useLocale();
  return <>{t.home.visaFree.tailorMake.cta}</>;
}

export function VisaFreeBackHome() {
  const { locale } = useLocale();
  return <>{locale === 'zh' ? '回首页' : 'Back to home'}</>;
}
