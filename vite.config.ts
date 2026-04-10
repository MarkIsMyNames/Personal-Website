import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import en from './src/i18n/locales/en.json';
import { theme } from './src/styles/theme';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          name: en.profile.name,
          pageBackgroundStyle: `<style>body{background-color:${theme.colors.pageBackground}}</style>`,
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
          setupFiles: ['.storybook/vitest.setup.ts'],
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
