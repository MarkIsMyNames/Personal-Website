import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LangRedirect } from './LangRedirect';
import {
  SLASH_PATH_SPLIT,
  TEST_LANG_EN,
  TEST_LANG_FR,
  TEST_LANG_DE,
  TEST_LANG_ES,
  TEST_LANG_GA,
  TEST_LOCALE_EN_US,
  TEST_LOCALE_FR_FR,
  TEST_LOCALE_DE_DE,
  TEST_LOCALE_ES_ES,
  TEST_LOCALE_GA_IE,
  UNSUPPORTED_LANG_CODE,
} from '../../config';
import { WindowGlobal } from '../../types';
import { DEFAULT_LANG, SUPPORTED_LANGS } from '../../i18n/localeConfig';

function renderWithRoutes(navigatorLanguage: string) {
  vi.stubGlobal(WindowGlobal.Navigator, { language: navigatorLanguage });
  render(
    <MemoryRouter initialEntries={[SLASH_PATH_SPLIT]}>
      <Routes>
        <Route
          path={SLASH_PATH_SPLIT}
          element={<LangRedirect />}
        />
        {SUPPORTED_LANGS.map((lang) => (
          <Route
            key={lang}
            path={`${SLASH_PATH_SPLIT}${lang}`}
            element={<div>{lang}</div>}
          />
        ))}
      </Routes>
    </MemoryRouter>,
  );
}

describe('LangRedirect', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('redirects to /default when browser language is unknown', () => {
    renderWithRoutes(UNSUPPORTED_LANG_CODE);
    expect(screen.getByText(DEFAULT_LANG)).toBeInTheDocument();
  });

  it('redirects to /fr when browser language is fr', () => {
    renderWithRoutes(TEST_LOCALE_FR_FR);
    expect(screen.getByText(TEST_LANG_FR)).toBeInTheDocument();
  });

  it('redirects to /en when browser language is en-US', () => {
    renderWithRoutes(TEST_LOCALE_EN_US);
    expect(screen.getByText(TEST_LANG_EN)).toBeInTheDocument();
  });

  it('redirects to /de when browser language is de-DE', () => {
    renderWithRoutes(TEST_LOCALE_DE_DE);
    expect(screen.getByText(TEST_LANG_DE)).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es-ES', () => {
    renderWithRoutes(TEST_LOCALE_ES_ES);
    expect(screen.getByText(TEST_LANG_ES)).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es', () => {
    renderWithRoutes(TEST_LANG_ES);
    expect(screen.getByText(TEST_LANG_ES)).toBeInTheDocument();
  });

  it('redirects to /ga when browser language is ga-IE', () => {
    renderWithRoutes(TEST_LOCALE_GA_IE);
    expect(screen.getByText(TEST_LANG_GA)).toBeInTheDocument();
  });
});
