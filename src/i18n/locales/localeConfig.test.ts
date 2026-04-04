import { detectLang, isSupportedLang } from './localeConfig';

describe('detectLang', () => {
  it('returns en for en-US', () => {
    expect(detectLang('en-US')).toBe('en');
  });

  it('returns fr for fr-FR', () => {
    expect(detectLang('fr-FR')).toBe('fr');
  });

  it('returns de for de-DE', () => {
    expect(detectLang('de-DE')).toBe('de');
  });

  it('returns es for es-ES', () => {
    expect(detectLang('es-ES')).toBe('es');
  });

  it('returns ga for ga-IE', () => {
    expect(detectLang('ga-IE')).toBe('ga');
  });

  it('falls back to en for an unsupported language', () => {
    expect(detectLang('ja-JP')).toBe('en');
  });

  it('falls back to en for an empty string', () => {
    expect(detectLang('')).toBe('en');
  });
});

describe('isSupportedLang', () => {
  it('returns true for en', () => {
    expect(isSupportedLang('en')).toBe(true);
  });

  it('returns true for fr', () => {
    expect(isSupportedLang('fr')).toBe(true);
  });

  it('returns true for de', () => {
    expect(isSupportedLang('de')).toBe(true);
  });

  it('returns true for es', () => {
    expect(isSupportedLang('es')).toBe(true);
  });

  it('returns true for ga', () => {
    expect(isSupportedLang('ga')).toBe(true);
  });

  it('returns false for an unsupported language', () => {
    expect(isSupportedLang('ja')).toBe(false);
  });
});
