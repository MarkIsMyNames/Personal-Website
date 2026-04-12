import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import { LocaleApp } from './LocaleApp';
import i18n from '../../i18n/i18n';
import { SLASH_PATH_SPLIT, TEST_LANG_FR, I18N_CHANGE_LANGUAGE } from '../../config';
import { DEFAULT_LANG } from '../../i18n/localeConfig';
import { SectionId } from '../../types';

function renderLocaleApp(lang: string) {
  render(
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[`${SLASH_PATH_SPLIT}${lang}`]}>
          <Routes>
            <Route
              path={`${SLASH_PATH_SPLIT}${lang}`}
              element={<LocaleApp />}
            />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </HelmetProvider>,
  );
}

describe('LocaleApp', () => {
  beforeEach(() => {
    void i18n.changeLanguage(DEFAULT_LANG);
  });

  it('calls i18n.changeLanguage with the lang param', () => {
    const spy = vi.spyOn(i18n, I18N_CHANGE_LANGUAGE);
    renderLocaleApp(TEST_LANG_FR);
    expect(spy).toHaveBeenCalledWith(TEST_LANG_FR);
    spy.mockRestore();
  });

  it('does not call i18n.changeLanguage when already on the en route', () => {
    const spy = vi.spyOn(i18n, I18N_CHANGE_LANGUAGE);
    renderLocaleApp(DEFAULT_LANG);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('renders the about section', () => {
    renderLocaleApp(DEFAULT_LANG);
    expect(document.getElementById(SectionId.About)).toBeInTheDocument();
  });
});
