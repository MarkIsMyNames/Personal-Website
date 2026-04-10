import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { theme } from '../src/styles/theme';
import en from '../src/i18n/locales/en.json';

document.body.style.backgroundColor = theme.colors.pageBackground;

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
});

export default {
  decorators: [
    (Story) => <ThemeProvider theme={theme}><Story /></ThemeProvider>,
    (Story) => <I18nextProvider i18n={i18n}><Story /></I18nextProvider>,
  ],
  parameters: {
    a11y: {
      test: 'error',
    },
  },
} satisfies Preview;
