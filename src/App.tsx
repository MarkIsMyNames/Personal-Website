import { ThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { AppContainer } from './styles/App.styles';
import { Navigation } from './components/Navigation';
import { Bio } from './components/Bio';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { profile, skills, projects } from './data/portfolioData';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
      <AppContainer>
        <div id="about">
          <Bio profile={profile} />
        </div>
        <div id="skills">
          <Skills skills={skills} />
        </div>
        <div id="projects">
          <Projects projects={projects} />
        </div>
        <div id="contact">
          <Contact profile={profile} />
        </div>
        <Analytics />
        <SpeedInsights />
      </AppContainer>
    </ThemeProvider>
  );
}
