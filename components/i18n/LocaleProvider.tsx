'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, type Locale, isLocale } from '@/lib/data/locales';
import en from '@/lib/data/dictionaries/en';
import zh from '@/lib/data/dictionaries/zh';
import { readStoredLocale, writeStoredLocale } from '@/lib/i18n/storage';

const dictionaries = { en, zh } as const;

const COOKIE_NAME = 'locale';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const writeLocaleCookie = (next: Locale) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (typeof dictionaries)['en'];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) => {
  const [locale, setLocaleState] = useState<Locale>(
    isLocale(initialLocale) ? initialLocale : DEFAULT_LOCALE
  );

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored && stored !== locale) {
      setLocaleState(stored);
      writeLocaleCookie(stored);
      if (typeof document !== 'undefined') document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
    writeLocaleCookie(next);
    if (typeof document !== 'undefined') document.documentElement.lang = next;
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] as (typeof dictionaries)['en'] }),
    [locale, setLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider />');
  return ctx;
};

export const useDictionary = () => useLocale().t;
