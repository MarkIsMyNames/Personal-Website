import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { LocaleApp } from './LocaleApp';
import i18n from './i18n/i18n';

function renderLocaleApp(lang: string) {
  render(
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[`/${lang}`]}>
          <Routes>
            <Route
              path={`/${lang}`}
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
    void i18n.changeLanguage('en');
  });

  it('calls i18n.changeLanguage with the lang param', () => {
    const spy = vi.spyOn(i18n, 'changeLanguage');
    renderLocaleApp('fr');
    expect(spy).toHaveBeenCalledWith('fr');
    spy.mockRestore();
  });

  it('does not call i18n.changeLanguage when already on the en route', () => {
    const spy = vi.spyOn(i18n, 'changeLanguage');
    renderLocaleApp('en');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('renders the about section', () => {
    renderLocaleApp('en');
    expect(document.getElementById('about')).toBeInTheDocument();
  });
});
