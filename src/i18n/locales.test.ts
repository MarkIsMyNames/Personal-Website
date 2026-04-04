import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import en from './locales/en.json';
import { EMPTY_LENGTH } from '../config';

const localesDir = resolve(__dirname, 'locales');

function getAllKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return [prefix];
  }
  return Object.entries(obj).flatMap(([key, value]) =>
    getAllKeys(value, prefix ? `${prefix}.${key}` : key),
  );
}

const enKeys = getAllKeys(en);

const localeFiles = readdirSync(localesDir).filter(
  (file) => file.endsWith('.json') && file !== 'en.json',
);

if (localeFiles.length === EMPTY_LENGTH) {
  it.todo('no additional locale files yet — add tests when a new language is added');
} else {
  describe.each(localeFiles)('%s completeness', (file) => {
    const locale: unknown = JSON.parse(readFileSync(resolve(localesDir, file), 'utf-8'));

    it('has no missing keys compared to en.json', () => {
      const localeKeys = getAllKeys(locale);
      const missingKeys = enKeys.filter((key) => !localeKeys.includes(key));
      expect(missingKeys, `Keys missing from ${file}`).toHaveLength(EMPTY_LENGTH);
    });

    it('has no extra keys not present in en.json', () => {
      const localeKeys = getAllKeys(locale);
      const extraKeys = localeKeys.filter((key) => !enKeys.includes(key));
      expect(extraKeys, `Extra keys in ${file} not in en.json`).toHaveLength(EMPTY_LENGTH);
    });
  });
}
