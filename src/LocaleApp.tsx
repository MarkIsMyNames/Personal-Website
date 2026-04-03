import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n/i18n';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/Global.styles';
import { AppContainer } from './styles/App.styles';
import { Navigation } from './components/Navigation/Navigation';
import { Bio } from './components/Bio/Bio';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { SectionId } from './types';
import { PRODUCTION_BASE_URL } from './config';
import { SUPPORTED_LANGS, DEFAULT_LANG, type SupportedLang } from './i18n/locales/localeConfig';

export function LocaleApp() {
  const { lang } = useParams<{ lang: SupportedLang }>();
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang]);

  const profile = t('profile', { returnObjects: true });
  const skills = t('skillsData', { returnObjects: true });
  const projects = t('projectsData', { returnObjects: true });

  return (
    <ThemeProvider theme={theme}>
      <Helmet htmlAttributes={{ lang }}>
        <meta
          name="description"
          content={profile.bio}
        />
        {SUPPORTED_LANGS.map((supportedLang) => (
          <link
            key={supportedLang}
            rel="alternate"
            hrefLang={supportedLang}
            href={`${PRODUCTION_BASE_URL}/${supportedLang}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${PRODUCTION_BASE_URL}/${DEFAULT_LANG}`}
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
