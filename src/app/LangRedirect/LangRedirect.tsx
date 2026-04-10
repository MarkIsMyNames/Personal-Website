import { Navigate } from 'react-router-dom';
import { detectLang } from '../../i18n/localeConfig';
import { SLASH_PATH_SPLIT } from '../../config';

export function LangRedirect() {
  const lang = detectLang(navigator.language);
  return (
    <Navigate
      to={`${SLASH_PATH_SPLIT}${lang}`}
      replace
    />
  );
}
