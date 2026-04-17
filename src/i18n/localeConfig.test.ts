import { detectLang, isSupportedLang, DEFAULT_LANG } from './localeConfig';
import {
  UNSUPPORTED_LANG_CODE,
  TEST_LANG_EN,
  TEST_LANG_FR,
  TEST_LANG_DE,
  TEST_LANG_ES,
  TEST_LANG_GA,
  TEST_LOCALE_EN_US,
  TEST_LOCALE_FR_FR,
  TEST_LOCALE_DE_DE,
  TEST_LOCALE_ES_ES,
  TEST_LOCALE_GA_IE,
  TEST_LOCALE_UNSUPPORTED,
  EMPTY_STRING,
} from '../config';

describe('detectLang', () => {
  it.each([
    [TEST_LOCALE_EN_US, TEST_LANG_EN],
    [TEST_LOCALE_FR_FR, TEST_LANG_FR],
    [TEST_LOCALE_DE_DE, TEST_LANG_DE],
    [TEST_LOCALE_ES_ES, TEST_LANG_ES],
    [TEST_LOCALE_GA_IE, TEST_LANG_GA],
    [TEST_LOCALE_UNSUPPORTED, DEFAULT_LANG],
    [EMPTY_STRING, DEFAULT_LANG],
  ])('detectLang(%s) returns %s', (input, expected) => {
    expect(detectLang(input)).toBe(expected);
  });
});

describe('isSupportedLang', () => {
  it.each([
    [DEFAULT_LANG, true],
    [TEST_LANG_EN, true],
    [TEST_LANG_FR, true],
    [TEST_LANG_DE, true],
    [TEST_LANG_ES, true],
    [TEST_LANG_GA, true],
    [UNSUPPORTED_LANG_CODE, false],
  ])('isSupportedLang(%s) returns %s', (lang, expected) => {
    expect(isSupportedLang(lang)).toBe(expected);
  });
});
