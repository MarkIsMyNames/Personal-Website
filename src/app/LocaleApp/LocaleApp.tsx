import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { theme } from '../../styles/theme';
import { GlobalStyles } from '../../styles/Global.styles';
import { AppContainer } from '../../styles/App.styles';
import { Navigation } from '../../components/Navigation/Navigation';
import { Bio } from '../../components/Bio/Bio';
import { Skills } from '../../components/Skills/Skills';
import { Projects } from '../../components/Projects/Projects';
import { Contact } from '../../components/Contact/Contact';
import { SectionId, LinkRel, Hreflang } from '../../types';
import {
  PRODUCTION_BASE_URL,
  PATH_LANG_SEGMENT,
  META_DESCRIPTION,
  SLASH_PATH_SPLIT,
} from '../../config';
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  isSupportedLang,
  type SupportedLang,
} from '../../i18n/localeConfig';

export function LocaleApp() {
  const location = useLocation();
  const { t, i18n: i18nInstance } = useTranslation();
  const lang: SupportedLang =
    isSupportedLang(i18nInstance.language) ? i18nInstance.language : DEFAULT_LANG;

  useEffect(() => {
    const pathLang = location.pathname.split(SLASH_PATH_SPLIT)[PATH_LANG_SEGMENT];
    if (pathLang && isSupportedLang(pathLang) && i18n.language !== pathLang) {
      void i18n.changeLanguage(pathLang);
    }
  }, [location.pathname]);

  const profile = t('profile', { returnObjects: true });
  const skills = t('skillsData', { returnObjects: true });
  const projects = t('projectsData', { returnObjects: true });

  return (
    <ThemeProvider theme={theme}>
      <Helmet htmlAttributes={{ lang }}>
        <meta
          name={META_DESCRIPTION}
          content={profile.bio}
        />
        {SUPPORTED_LANGS.map((supportedLang) => (
          <link
            key={supportedLang}
            rel={LinkRel.Alternate}
            hrefLang={supportedLang}
            href={`${PRODUCTION_BASE_URL}${SLASH_PATH_SPLIT}${supportedLang}`}
          />
        ))}
        <link
          rel={LinkRel.Alternate}
          hrefLang={Hreflang.XDefault}
          href={`${PRODUCTION_BASE_URL}${SLASH_PATH_SPLIT}${DEFAULT_LANG}`}
        />
      </Helmet>
      <GlobalStyles />
      <Navigation />
      <AppContainer>
        <div id={SectionId.About}>
          <Bio profile={profile} />
        </div>
        <div id={SectionId.Skills}>
          <Skills skills={skills} />
        </div>
        <div id={SectionId.Projects}>
          <Projects projects={projects} />
        </div>
        <div id={SectionId.Contact}>
          <Contact profile={profile} />
        </div>
        <Analytics />
        <SpeedInsights />
      </AppContainer>
    </ThemeProvider>
  );
}
