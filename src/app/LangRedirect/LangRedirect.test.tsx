import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LangRedirect } from './LangRedirect';

function renderWithRoutes(navigatorLanguage: string) {
  vi.stubGlobal('navigator', { language: navigatorLanguage });
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={<LangRedirect />}
        />
        <Route
          path="/de"
          element={<div>german-page</div>}
        />
        <Route
          path="/es"
          element={<div>spanish-page</div>}
        />
        <Route
          path="/ga"
          element={<div>irish-page</div>}
        />
        <Route
          path="/fr"
          element={<div>french-page</div>}
        />
        <Route
          path="/en"
          element={<div>english-page</div>}
        />
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
    expect(screen.getByText('french-page')).toBeInTheDocument();
  });

  it('redirects to /fr when browser language is fr', () => {
    renderWithRoutes('fr');
    expect(screen.getByText('french-page')).toBeInTheDocument();
  });

  it('redirects to /en when browser language is en-US', () => {
    renderWithRoutes('en-US');
    expect(screen.getByText('english-page')).toBeInTheDocument();
  });

  it('redirects to /de when browser language is de-DE', () => {
    renderWithRoutes('de-DE');
    expect(screen.getByText('german-page')).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es-ES', () => {
    renderWithRoutes('es-ES');
    expect(screen.getByText('spanish-page')).toBeInTheDocument();
  });

  it('redirects to /es when browser language is es', () => {
    renderWithRoutes('es');
    expect(screen.getByText('spanish-page')).toBeInTheDocument();
  });

  it('redirects to /ga when browser language is ga-IE', () => {
    renderWithRoutes('ga-IE');
    expect(screen.getByText('irish-page')).toBeInTheDocument();
  });

  it('redirects to /ga when browser language is ga', () => {
    renderWithRoutes('ga');
    expect(screen.getByText('irish-page')).toBeInTheDocument();
  });
});
