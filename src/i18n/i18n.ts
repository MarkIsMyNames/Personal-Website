import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LOCALES, DEFAULT_LANG, isSupportedLang, type defaultLocale } from './localeConfig';
import { PATH_LANG_SEGMENT, SLASH_PATH_SPLIT } from '../config';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof defaultLocale;
    };
  }
}

const resources = Object.fromEntries(
  Object.entries(LOCALES).map(([lang, translation]) => [lang, { translation }]),
);

const pathSegment = window.location.pathname.split(SLASH_PATH_SPLIT)[PATH_LANG_SEGMENT];
const initialLang = pathSegment && isSupportedLang(pathSegment) ? pathSegment : DEFAULT_LANG;

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: DEFAULT_LANG,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
