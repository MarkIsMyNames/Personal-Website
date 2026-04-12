import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import ga from './locales/ga.json';
import { FIRST_INDEX, LOCALE_SEPARATOR, LOCALE_FILE_EXTENSION } from '../config';
import type { LocaleRecord } from '../types';

const localesMap = { en, fr, de, es, ga };
export type SupportedLang = keyof typeof localesMap;
export const LOCALES = localesMap satisfies Record<SupportedLang, LocaleRecord>;
export const DEFAULT_LANG: SupportedLang = 'en';
export const defaultLocale = LOCALES[DEFAULT_LANG];
export const DEFAULT_LOCALE_FILENAME = `${DEFAULT_LANG}${LOCALE_FILE_EXTENSION}`;
export const SUPPORTED_LANGS = Object.keys(LOCALES).filter(
  (localeKey): localeKey is SupportedLang => localeKey in LOCALES,
);

export function isSupportedLang(lang: string): lang is SupportedLang {
  return lang in LOCALES;
}

export function detectLang(browserLanguage: string): SupportedLang {
  const parts = browserLanguage.split(LOCALE_SEPARATOR);
  const prefix = parts[FIRST_INDEX];
  if (!prefix) {
    return DEFAULT_LANG;
  }
  return isSupportedLang(prefix) ? prefix : DEFAULT_LANG;
}
