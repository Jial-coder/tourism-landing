'use client';

import { useLocale } from '@/components/i18n/LocaleProvider';
import { SUPPORTED_LOCALES } from '@/lib/data/locales';

export const LocaleSwitch = () => {
  const { locale, setLocale } = useLocale();
  return (
    <div role="group" aria-label="language switch" className="flex gap-2">
      {SUPPORTED_LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={locale === code}
          className={locale === code ? 'font-semibold' : 'text-muted-foreground'}
          onClick={() => setLocale(code)}
        >
          {code === 'en' ? 'EN' : '中文'}
        </button>
      ))}
    </div>
  );
};
