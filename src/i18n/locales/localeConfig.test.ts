import { detectLang, isSupportedLang, DEFAULT_LANG, SUPPORTED_LANGS } from './localeConfig';

describe('detectLang', () => {
  it('returns fr for fr-FR', () => {
    expect(detectLang('fr-FR')).toBe('fr');
  });

  it('returns fr for fr', () => {
    expect(detectLang('fr')).toBe('fr');
  });

  it('returns en for en-US', () => {
    expect(detectLang('en-US')).toBe('en');
  });

  it('returns DEFAULT_LANG for unsupported de-DE', () => {
    expect(detectLang('de-DE')).toBe(DEFAULT_LANG);
  });
});

describe('isSupportedLang', () => {
  it('returns true for en', () => {
    expect(isSupportedLang('en')).toBe(true);
  });

  it('returns true for fr', () => {
    expect(isSupportedLang('fr')).toBe(true);
  });

  it('returns false for de', () => {
    expect(isSupportedLang('de')).toBe(false);
  });
});

describe('SUPPORTED_LANGS', () => {
  it('contains en', () => {
    expect(SUPPORTED_LANGS).toContain('en');
  });

  it('contains fr', () => {
    expect(SUPPORTED_LANGS).toContain('fr');
  });
});
