import { LOCALES, defaultLocale, DEFAULT_LANG } from './localeConfig';
import {
  EMPTY_LENGTH,
  MSG_KEYS_MISSING_FROM,
  MSG_EXTRA_KEYS_IN,
  MSG_NOT_IN_DEFAULT_LOCALE,
} from '../config';
import { isRecord, type LocaleRecord } from '../types';

function getAllKeys(obj: LocaleRecord): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    isRecord(value) ? getAllKeys(value).map((k) => `${key}.${k}`) : [key],
  );
}

const defaultKeys = getAllKeys(defaultLocale);
const nonDefaultLocales: [string, LocaleRecord][] = Object.entries(LOCALES).filter(
  ([lang]) => lang !== DEFAULT_LANG,
);

if (nonDefaultLocales.length === EMPTY_LENGTH) {
  it.todo('no additional locale files yet — add tests when a new language is added');
} else {
  describe.each(nonDefaultLocales)('%s completeness', (lang, locale) => {
    it('has no missing keys compared to the default locale', () => {
      const localeKeys = getAllKeys(locale);
      const missingKeys = defaultKeys.filter((key) => !localeKeys.includes(key));
      expect(missingKeys, `${MSG_KEYS_MISSING_FROM} ${lang}`).toHaveLength(EMPTY_LENGTH);
    });

    it('has no extra keys not present in the default locale', () => {
      const localeKeys = getAllKeys(locale);
      const extraKeys = localeKeys.filter((key) => !defaultKeys.includes(key));
      expect(extraKeys, `${MSG_EXTRA_KEYS_IN} ${lang} ${MSG_NOT_IN_DEFAULT_LOCALE}`).toHaveLength(
        EMPTY_LENGTH,
      );
    });
  });
}
