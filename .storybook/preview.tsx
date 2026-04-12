import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { theme } from '../src/styles/theme';
import { DEFAULT_LANG, LOCALES } from '../src/i18n/localeConfig';

document.body.style.backgroundColor = theme.colors.pageBackground;

void i18n.use(initReactI18next).init({
  resources: { [DEFAULT_LANG]: { translation: LOCALES[DEFAULT_LANG] } },
  lng: DEFAULT_LANG,
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
