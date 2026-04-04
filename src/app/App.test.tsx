import { render, screen, within } from '@testing-library/react';
import App from './App';
import en from '../i18n/locales/en.json';

describe('App Component', () => {
  describe('Sections', () => {
    it('renders about section', () => {
      render(<App />);
      expect(document.getElementById('about')).toBeInTheDocument();
    });

    it('renders skills section', () => {
      render(<App />);
      expect(document.getElementById('skills')).toBeInTheDocument();
    });

    it('renders projects section', () => {
      render(<App />);
      expect(document.getElementById('projects')).toBeInTheDocument();
    });

    it('renders contact section', () => {
      render(<App />);
      expect(document.getElementById('contact')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('renders navigation landmark with translated aria-label', () => {
      render(<App />);
      expect(
        screen.getByRole('navigation', { name: en.navigation.ariaLabels.nav }),
      ).toBeInTheDocument();
    });
  });

  describe('Skills', () => {
    it('renders all translated skill names', () => {
      render(<App />);
      const skillsSections = screen.getAllByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.skills),
      );
      const skillsSection = skillsSections.find((el) => el.tagName.toLowerCase() === 'section');
      if (!skillsSection) {
        throw new Error('Skills section not found');
      }
      en.skillsData.forEach((skill) => {
        expect(within(skillsSection).getByText(skill.name)).toBeInTheDocument();
      });
    });

    it('renders correct number of skill cards matching skillsData', () => {
      render(<App />);
      const skillsSections = screen.getAllByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.skills),
      );
      const skillsSection = skillsSections.find((el) => el.tagName.toLowerCase() === 'section');
      if (!skillsSection) {
        throw new Error('Skills section not found');
      }
      expect(within(skillsSection).getAllByRole('listitem')).toHaveLength(en.skillsData.length);
    });
  });

  describe('Projects', () => {
    it('renders all translated project titles', () => {
      render(<App />);
      en.projectsData.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('renders translated project roles', () => {
      render(<App />);
      en.projectsData.forEach((project) => {
        expect(screen.getByText(project.role)).toBeInTheDocument();
      });
    });

    it('renders translated project descriptions', () => {
      render(<App />);
      en.projectsData.forEach((project) => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });

    it('renders correct number of project cards matching projectsData', () => {
      render(<App />);
      const projectsList = screen.getByLabelText(en.projects.ariaLabels.list);
      const directCards = Array.from(projectsList.children).filter(
        (child) => child.getAttribute('role') === 'listitem',
      );
      expect(directCards).toHaveLength(en.projectsData.length);
    });
  });
});
