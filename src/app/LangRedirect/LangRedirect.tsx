import { Navigate } from 'react-router-dom';
import { detectLang } from '../../i18n/localeConfig';

export function LangRedirect() {
  const lang = detectLang(navigator.language);
  return (
    <Navigate
      to={`/${lang}`}
      replace
    />
  );
}
