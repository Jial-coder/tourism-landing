import { DEFAULT_LOCALE, type Locale, isLocale, SUPPORTED_LOCALES } from '@/lib/data/locales';

export const detectLocaleFromAcceptLanguage = (
  header: string | null | undefined
): Locale => {
  if (!header) return DEFAULT_LOCALE;
  const parts = header
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase());
  for (const tag of parts) {
    const base = tag.split('-')[0];
    if (isLocale(base) && SUPPORTED_LOCALES.includes(base)) return base;
  }
  return DEFAULT_LOCALE;
};
