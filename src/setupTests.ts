import '@testing-library/jest-dom';
import { vi } from 'vitest';
import en from './i18n/locales/en.json';

const enData = en as Record<string, unknown>;

function getNestedValue(key: string): unknown {
  return (
    key.split('.').reduce((current: unknown, segment: string) => {
      if (current !== null && typeof current === 'object') {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, enData) ?? key
  );
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      const value = getNestedValue(key);
      if (typeof value !== 'string') {
        return options?.['returnObjects'] === true ? value : key;
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
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));
