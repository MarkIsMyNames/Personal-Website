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
  SITEMAP_FILENAME,
  SITEMAP_PLUGIN_NAME,
  SITEMAP_XML_DECLARATION,
  SITEMAP_NAMESPACE,
  XMLNS_ATTR,
} from './src/config';
import { FetchPriority } from './src/types';
import { DEFAULT_LANG, defaultLocale, SUPPORTED_LANGS } from './src/i18n/localeConfig';

// Emits sitemap.xml listing every locale URL. Hreflang alternates live in LocaleApp's <head>.
function sitemapPlugin(): Plugin {
  const urls = SUPPORTED_LANGS.map(
    (lang) => `<url><loc>${PRODUCTION_BASE_URL}${SLASH_PATH_SPLIT}${lang}</loc></url>`,
  ).join('');
  const source = `${SITEMAP_XML_DECLARATION}<urlset ${XMLNS_ATTR}="${SITEMAP_NAMESPACE}">${urls}</urlset>`;
  return {
    name: SITEMAP_PLUGIN_NAME,
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: SITEMAP_FILENAME, source });
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
