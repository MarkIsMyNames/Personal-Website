import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangRedirect } from './LangRedirect';
import { LocaleApp } from './LocaleApp';
import { SUPPORTED_LANGS, DEFAULT_LANG } from './i18n/locales/localeConfig';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LangRedirect />}
          />
          {SUPPORTED_LANGS.map((lang) => (
            <Route
              key={lang}
              path={`/${lang}`}
              element={<LocaleApp />}
            />
          ))}
          <Route
            path="*"
            element={
              <Navigate
                to={`/${DEFAULT_LANG}`}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
