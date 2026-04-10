import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LangRedirect } from './LangRedirect';
import { SLASH_PATH_SPLIT } from '../../config';
import { SUPPORTED_LANGS } from '../../i18n/localeConfig';

function renderWithRoutes(navigatorLanguage: string) {
  vi.stubGlobal('navigator', { language: navigatorLanguage });
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

  it('redirects to /fr when browser language is fr-FR', () => {
    renderWithRoutes('fr-FR');
    expect(screen.getByText('fr')).toBeInTheDocument();
  });

  it('redirects to /fr when browser language is fr', () => {
    renderWithRoutes('fr');
    expect(screen.getByText('fr')).toBeInTheDocument();
  });

  it('redirects to /en when browser language is en-US', () => {
    renderWithRoutes('en-US');
    expect(screen.getByText('en')).toBeInTheDocument();
  });

  it('redirects to /de when browser language is de-DE', () => {
    renderWithRoutes('de-DE');
    expect(screen.getByText('de')).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es-ES', () => {
    renderWithRoutes('es-ES');
    expect(screen.getByText('es')).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es', () => {
    renderWithRoutes('es');
    expect(screen.getByText('es')).toBeInTheDocument();
  });

  it('redirects to /ga when browser language is ga-IE', () => {
    renderWithRoutes('ga-IE');
    expect(screen.getByText('ga')).toBeInTheDocument();
  });

  it('redirects to /ga when browser language is ga', () => {
    renderWithRoutes('ga');
    expect(screen.getByText('ga')).toBeInTheDocument();
  });
});
