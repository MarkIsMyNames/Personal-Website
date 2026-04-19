import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { DEFAULT_LANG, LOCALES } from './i18n/localeConfig';
import { I18N_KEY_SEPARATOR, I18N_RETURN_OBJECTS_OPTION, I18N_PLUGIN_TYPE } from './config';
import { isRecord, Typeof, TestErrorMessage, type LocaleValue } from './types';

function isString(value: LocaleValue): value is string {
  return typeof value === Typeof.String;
}

function getNestedValue(key: string): LocaleValue {
  return key.split(I18N_KEY_SEPARATOR).reduce<LocaleValue>((current, segment) => {
    if (!isRecord(current)) {
      throw new Error(TestErrorMessage.LocaleKeyNotFound);
    }
    const next = current[segment];
    if (next === undefined) {
      throw new Error(TestErrorMessage.LocaleKeyNotFound);
    }
    return next;
  }, LOCALES[DEFAULT_LANG]);
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: DEFAULT_LANG },
    t: (key: string, options?: Record<string, string | number | boolean | null>) => {
      const value = getNestedValue(key);
      if (!isString(value)) {
        return options?.[I18N_RETURN_OBJECTS_OPTION] === true ? value : key;
      }
      if (options === undefined) {
        return value;
      }
      return Object.entries(options).reduce(
        (str, [k, v]) => str.replaceAll(`{{${k}}}`, String(v)),
        value,
      );
    },
  }),
  initReactI18next: { type: I18N_PLUGIN_TYPE, init: vi.fn() },
}));
