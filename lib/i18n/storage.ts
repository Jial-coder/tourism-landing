import { DEFAULT_LOCALE, type Locale, isLocale } from '@/lib/data/locales';

const STORAGE_KEY = 'tourism-landing.locale.v1';

export const readStoredLocale = (): Locale | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(raw) ? raw : null;
};

export const writeStoredLocale = (locale: Locale): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, locale);
};

export const fallbackLocale = (): Locale => DEFAULT_LOCALE;
