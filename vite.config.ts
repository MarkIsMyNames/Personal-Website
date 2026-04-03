import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import en from './src/i18n/locales/en.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          name: en.profile.name,
          bio: en.profile.bio,
        },
      },
    }),
  ],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['**/*.styles.test.{ts,tsx}', 'node_modules/**'],
  },
});
