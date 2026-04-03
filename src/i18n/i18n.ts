import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type en from './locales/en.json';
import { LOCALES } from './locales/localeConfig';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}

const resources = Object.fromEntries(
  Object.entries(LOCALES).map(([lang, translation]) => [lang, { translation }]),
);

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
