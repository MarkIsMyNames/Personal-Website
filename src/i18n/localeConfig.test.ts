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
} from '../config';

describe('detectLang', () => {
  it('returns en for en-US', () => {
    expect(detectLang(TEST_LOCALE_EN_US)).toBe(TEST_LANG_EN);
  });

  it('returns fr for fr-FR', () => {
    expect(detectLang(TEST_LOCALE_FR_FR)).toBe(TEST_LANG_FR);
  });

  it('returns de for de-DE', () => {
    expect(detectLang(TEST_LOCALE_DE_DE)).toBe(TEST_LANG_DE);
  });

  it('returns es for es-ES', () => {
    expect(detectLang(TEST_LOCALE_ES_ES)).toBe(TEST_LANG_ES);
  });

  it('returns ga for ga-IE', () => {
    expect(detectLang(TEST_LOCALE_GA_IE)).toBe(TEST_LANG_GA);
  });

  it('falls back to Default Language for an unsupported language', () => {
    expect(detectLang(TEST_LOCALE_UNSUPPORTED)).toBe(DEFAULT_LANG);
  });

  it('falls back to Default Language for an empty string', () => {
    expect(detectLang('')).toBe(DEFAULT_LANG);
  });
});

describe('isSupportedLang', () => {
  it('returns true for default language', () => {
    expect(isSupportedLang(DEFAULT_LANG)).toBe(true);
  });

  it('returns true for en', () => {
    expect(isSupportedLang(TEST_LANG_EN)).toBe(true);
  });

  it('returns true for fr', () => {
    expect(isSupportedLang(TEST_LANG_FR)).toBe(true);
  });

  it('returns true for de', () => {
    expect(isSupportedLang(TEST_LANG_DE)).toBe(true);
  });

  it('returns true for es', () => {
    expect(isSupportedLang(TEST_LANG_ES)).toBe(true);
  });

  it('returns true for ga', () => {
    expect(isSupportedLang(TEST_LANG_GA)).toBe(true);
  });

  it('returns false for an unsupported language', () => {
    expect(isSupportedLang(UNSUPPORTED_LANG_CODE)).toBe(false);
  });
});
