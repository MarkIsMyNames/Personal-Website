import { render, screen, within } from '@testing-library/react';
import App from './App';
import { defaultLocale } from '../i18n/localeConfig';
import { AriaRole, SectionId } from '../types';

describe('App Component', () => {
  describe('Sections', () => {
    it('renders about section', () => {
      render(<App />);
      expect(document.getElementById(SectionId.About)).toBeInTheDocument();
    });

    it('renders skills section', () => {
      render(<App />);
      expect(document.getElementById(SectionId.Skills)).toBeInTheDocument();
    });

    it('renders projects section', () => {
      render(<App />);
      expect(document.getElementById(SectionId.Projects)).toBeInTheDocument();
    });

    it('renders contact section', () => {
      render(<App />);
      expect(document.getElementById(SectionId.Contact)).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders navigation landmark with translated aria-label', () => {
      render(<App />);
      expect(
        screen.getByRole(AriaRole.Navigation, { name: defaultLocale.navigation.ariaLabels.nav }),
      ).toBeInTheDocument();
    });
  });

  describe('Skills', () => {
    it('renders all translated skill names', () => {
      render(<App />);
      const skillsSection = screen.getByRole(AriaRole.Region, {
        name: defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.skills,
        ),
      });
      defaultLocale.skillsData.forEach((skill) => {
        expect(within(skillsSection).getByText(skill.name)).toBeInTheDocument();
      });
    });

    it('renders correct number of skill cards matching skillsData', () => {
      render(<App />);
      const skillsSection = screen.getByRole(AriaRole.Region, {
        name: defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.skills,
        ),
      });
      expect(within(skillsSection).getAllByRole(AriaRole.ListItem)).toHaveLength(
        defaultLocale.skillsData.length,
      );
    });
  });

  describe('Projects', () => {
    it('renders all translated project titles', () => {
      render(<App />);
      defaultLocale.projectsData.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('renders translated project roles', () => {
      render(<App />);
      defaultLocale.projectsData.forEach((project) => {
        expect(screen.getByText(project.role)).toBeInTheDocument();
      });
    });

    it('renders translated project descriptions', () => {
      render(<App />);
      defaultLocale.projectsData.forEach((project) => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('renders correct number of project cards matching projectsData', () => {
      render(<App />);
      const projectsList = screen.getByLabelText(defaultLocale.projects.ariaLabels.list);
      expect(Array.from(projectsList.children)).toHaveLength(defaultLocale.projectsData.length);
    });
  });
});
