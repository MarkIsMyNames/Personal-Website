import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/Global.styles';
import { AppContainer } from './styles/App.styles';
import { Navigation } from './components/Navigation/Navigation';
import { Bio } from './components/Bio/Bio';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { profile, skills, projects } from './data/portfolioData';
import { SectionId } from './types';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
