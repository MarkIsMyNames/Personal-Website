import { readFileSync } from 'fs';
import { resolve } from 'path';
import { theme } from './styles/theme.ts';
import en from '../src/i18n/locales/en.json';

const indexHtml = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');

describe('index.html structure', () => {
  it('declares utf-8 charset', () => {
    expect(indexHtml).toContain('<meta charset="utf-8"');
  });

  it('declares responsive viewport', () => {
    expect(indexHtml).toContain('name="viewport"');
    expect(indexHtml).toContain('width=device-width');
  });

  it('sets lang attribute on html element', () => {
    expect(indexHtml).toContain('<html lang="en"');
  });

  it('includes favicon link', () => {
    expect(indexHtml).toContain('rel="icon"');
    expect(indexHtml).toContain('href="/favicon.svg"');
  });

  it('preloads profile image with high fetch priority', () => {
    expect(indexHtml).toContain(`href="/${en.profile.image}"`);
    expect(indexHtml).toContain('fetchpriority="high"');
  });

  it('has a root mount point', () => {
    expect(indexHtml).toContain('<div id="root">');
  });

  it('includes noscript fallback', () => {
    expect(indexHtml).toContain('<noscript>');
  });
});

describe('index.html injected values', () => {
  it('uses template variable for page title, not a hardcoded name', () => {
    expect(indexHtml).toContain('<%= name %>');
    expect(indexHtml).not.toContain(en.profile.name);
  });

  it('uses template variable for meta description, not hardcoded bio text', () => {
    expect(indexHtml).toContain('name="description"');
    expect(indexHtml).toContain('<%= description %>');
    expect(indexHtml).not.toContain(en.profile.bio);
  });

  it('uses template variable for body background, not a hardcoded hex value', () => {
    expect(indexHtml).toContain('<%- pageBackgroundStyle %>');
    expect(indexHtml).not.toContain(theme.colors.pageBackground);
  });

  it('contains no other hardcoded hex color values', () => {
    expect(indexHtml).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
