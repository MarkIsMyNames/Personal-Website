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
        },
      },
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom'],
          i18n: ['i18next', 'react-i18next'],
          icons: ['react-icons'],
          helmet: ['react-helmet-async'],
          styling: ['styled-components'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['**/*.styles.test.{ts,tsx}', 'node_modules/**'],
  },
});
