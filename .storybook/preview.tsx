import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { theme } from '../src/styles/theme';
import { GlobalStyles } from '../src/styles/Global.styles';
import { DEFAULT_LANG, defaultLocale } from '../src/i18n/localeConfig';
import { STORYBOOK_A11Y_TEST_MODE, STORYBOOK_BACKGROUND_DARK_NAME } from '../src/config';

void i18n.use(initReactI18next).init({
  resources: { [DEFAULT_LANG]: { translation: defaultLocale } },
  lng: DEFAULT_LANG,
});

export default {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
    (Story) => <I18nextProvider i18n={i18n}><Story /></I18nextProvider>,
  ],
  parameters: {
    a11y: {
      test: STORYBOOK_A11Y_TEST_MODE,
      options: { resultTypes: ['violations', 'incomplete'] },
    },
    backgrounds: {
      values: [{ name: STORYBOOK_BACKGROUND_DARK_NAME, value: theme.colors.pageBackground }],
    },
  },
  initialGlobals: {
    backgrounds: { value: theme.colors.pageBackground },
  },
} satisfies Preview;
