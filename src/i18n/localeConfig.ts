import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import ga from './locales/ga.json';
import { FIRST_INDEX } from '../config';

export const LOCALES = { en, fr, de, es, ga };
export type SupportedLang = keyof typeof LOCALES;
export const SUPPORTED_LANGS = Object.keys(LOCALES).filter(
  (localeKey): localeKey is SupportedLang => localeKey in LOCALES,
);
export const DEFAULT_LANG: SupportedLang = 'en';

export function isSupportedLang(lang: string): lang is SupportedLang {
  return lang in LOCALES;
}

export function detectLang(browserLanguage: string): SupportedLang {
  const parts = browserLanguage.split('-');
  const prefix = parts[FIRST_INDEX];
  if (!prefix) {
    return DEFAULT_LANG;
  }
  return isSupportedLang(prefix) ? prefix : DEFAULT_LANG;
}
