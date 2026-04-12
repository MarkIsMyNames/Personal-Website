import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { theme } from './src/styles/theme';
import { FAVICON_PATH, ENTRY_POINT_PATH, SLASH_PATH_SPLIT, ROOT_ELEMENT_ID, FETCH_PRIORITY_HIGH, CHARSET_UTF8 } from './src/config';
import { DEFAULT_LANG, defaultLocale } from './src/i18n/localeConfig';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          name: defaultLocale.profile.name,
          pageBackgroundStyle: `<style>body{background-color:${theme.colors.pageBackground};color:${theme.colors.textDefault}}</style>`,
          defaultLang: DEFAULT_LANG,
          charset: CHARSET_UTF8,
          faviconPath: FAVICON_PATH,
          fetchPriority: FETCH_PRIORITY_HIGH,
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
          exclude: ['**/*.styles.test.{ts,tsx}', 'node_modules/**'],
        },
      },
      {
        plugins: [react(), storybookTest()],
        test: {
          name: 'storybook',
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
