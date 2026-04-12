import { readFileSync } from 'fs';
import { resolve } from 'path';
import { theme } from '../styles/theme.ts';
import { defaultLocale } from '../i18n/localeConfig';
import { INDEX_HTML_RELATIVE_PATH, ROOT_ELEMENT_ID } from '../config';

const indexHtml = readFileSync(resolve(__dirname, INDEX_HTML_RELATIVE_PATH), 'utf-8');

describe('index.html structure', () => {
  it('includes noscript fallback', () => {
    expect(indexHtml).toContain('<noscript>');
  });

  it('uses template variable for root element id, not a hardcoded value', () => {
    expect(indexHtml).toContain('<%= rootElementId %>');
    expect(indexHtml).not.toContain(`id="${ROOT_ELEMENT_ID}"`);
  });
});

describe('index.html injected values', () => {
  it('uses template variable for page title, not a hardcoded name', () => {
    expect(indexHtml).toContain('<%= name %>');
    expect(indexHtml).not.toContain(defaultLocale.profile.name);
  });

  it('uses template variable for body background, not a hardcoded hex value', () => {
    expect(indexHtml).toContain('<%- pageBackgroundStyle %>');
    expect(indexHtml).not.toContain(theme.colors.pageBackground);
  });

  it('contains no hardcoded hex color values', () => {
    expect(indexHtml).not.toMatch(/#[0-9a-fA-F]{3,6}/);
  });
});
