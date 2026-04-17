import { render, screen } from '@testing-library/react';
import App from './App';
import { defaultLocale } from '../i18n/localeConfig';
import { AriaRole, SectionId } from '../types';

describe('App Component', () => {
  describe('Sections', () => {
    it.each(Object.values(SectionId))('renders %s section', (sectionId) => {
      render(<App />);
      expect(document.getElementById(sectionId)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders navigation landmark with translated aria-label', () => {
      render(<App />);
      screen.getByRole(AriaRole.Navigation, { name: defaultLocale.navigation.ariaLabels.nav });
    });
  });
});
