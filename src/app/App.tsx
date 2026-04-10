import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangRedirect } from './LangRedirect/LangRedirect';
import { LocaleApp } from './LocaleApp/LocaleApp';
import { SUPPORTED_LANGS, DEFAULT_LANG } from '../i18n/localeConfig';
import { SLASH_PATH_SPLIT, STAR_PATH } from '../config';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={SLASH_PATH_SPLIT}
            element={<LangRedirect />}
          />
          {SUPPORTED_LANGS.map((lang) => (
            <Route
              key={lang}
              path={`${SLASH_PATH_SPLIT}${lang}`}
              element={<LocaleApp />}
            />
          ))}
          <Route
            path={STAR_PATH}
            element={
              <Navigate
                to={`${SLASH_PATH_SPLIT}${DEFAULT_LANG}`}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
