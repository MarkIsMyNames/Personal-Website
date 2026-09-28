import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { theme } from './src/styles/theme';
import {
  FAVICON_PATH,
  ENTRY_POINT_PATH,
  SLASH_PATH_SPLIT,
  ROOT_ELEMENT_ID,
  CHARSET_UTF8,
  PRODUCTION_BASE_URL,
} from './src/config';
import { FetchPriority } from './src/types';
import { DEFAULT_LANG, defaultLocale, SUPPORTED_LANGS } from './src/i18n/localeConfig';

// Emits sitemap.xml listing every locale URL with hreflang alternates.
function sitemapPlugin(): Plugin {
  const alternates = SUPPORTED_LANGS.map(
    (lang) =>
      `    <xhtml:link rel="alternate" hreflang="${lang}" href="${PRODUCTION_BASE_URL}/${lang}"/>`,
  ).join('\n');
  const urls = SUPPORTED_LANGS.map(
    (lang) => `  <url>\n    <loc>${PRODUCTION_BASE_URL}/${lang}</loc>\n${alternates}\n  </url>`,
  ).join('\n');
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin(),
    createHtmlPlugin({
      inject: {
        data: {
          name: defaultLocale.profile.name,
          pageBackgroundStyle: `<style>body{background-color:${theme.colors.pageBackground};color:${theme.colors.textDefault}}</style>`,
          defaultLang: DEFAULT_LANG,
          charset: CHARSET_UTF8,
          faviconPath: FAVICON_PATH,
          fetchPriority: FetchPriority.High,
          profileImagePath: `${SLASH_PATH_SPLIT}${defaultLocale.profile.image}`,
          rootElementId: ROOT_ELEMENT_ID,
          entryPointPath: ENTRY_POINT_PATH,
        },
      },
    }),
  ],
  build: {
    outDir: 'build',
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: './src/setupTests.ts',
          exclude: ['**/*.styles.test.{ts,tsx}', 'e2e/**', 'storybook-tests/**', 'node_modules/**'],
        },
      },
      {
        plugins: [react(), storybookTest()],
        optimizeDeps: {
          include: ['aria-query', 'lz-string', '@testing-library/dom'],
        },
        test: {
          name: 'accessibility-tests',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
