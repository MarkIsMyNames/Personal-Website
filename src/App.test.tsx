import { render, screen, within } from '@testing-library/react';
import App from './App';
import en from './i18n/locales/en.json';

describe('App Component', () => {
  describe('Profile Information', () => {
    it('renders translated name', () => {
      render(<App />);
      const nameElements = screen.getAllByText(en.profile.name);
      expect(nameElements.length).toBeGreaterThan(0);
    });

    it('renders translated title', () => {
      render(<App />);
      expect(screen.getByText(en.profile.title)).toBeInTheDocument();
    });

    it('renders bio section with biography article', () => {
      render(<App />);
      expect(
        screen.getByRole('article', { name: en.bio.ariaLabels.biography }),
      ).toBeInTheDocument();
    });

    it('renders profile image with translated alt text and src from portfolioData', () => {
      render(<App />);
      const altText = en.bio.ariaLabels.image
        .replace('{{name}}', en.profile.name)
        .replace('{{title}}', en.profile.title);
      const profileImage = screen.getByAltText(altText);
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', en.profile.image);
    });

    it('renders education information with translated university and graduationYear from portfolioData', () => {
      render(<App />);
      const educationElement = screen.getByLabelText(en.bio.ariaLabels.education);
      expect(educationElement).toBeInTheDocument();
      expect(educationElement).toHaveTextContent(en.profile.university);
      expect(educationElement).toHaveTextContent(String(en.profile.graduationYear));
    });
  });

  describe('Navigation', () => {
    it('renders navigation menu items with translated text', () => {
      render(<App />);
      expect(
        screen.getByRole('menuitem', { name: new RegExp(en.navigation.sections.about, 'i') }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: new RegExp(en.navigation.sections.skills, 'i') }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: new RegExp(en.navigation.sections.projects, 'i') }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('menuitem', { name: new RegExp(en.navigation.sections.contact, 'i') }),
      ).toBeInTheDocument();
    });

    it('renders navigation landmark with translated aria-label', () => {
      render(<App />);
      expect(
        screen.getByRole('navigation', { name: en.navigation.ariaLabels.nav }),
      ).toBeInTheDocument();
    });
  });

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

  describe('Skills', () => {
    it('renders skills section title', () => {
      render(<App />);
      expect(screen.getAllByText(en.skills.sectionTitle).length).toBeGreaterThan(0);
    });

    it('renders all translated skill names', () => {
      render(<App />);
      const skillsSections = screen.getAllByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.skills),
      );
      const skillsSection = skillsSections.find((el) => el.tagName.toLowerCase() === 'section')!;
      en.skillsData.forEach((skill) => {
        expect(within(skillsSection).getByText(skill.name)).toBeInTheDocument();
      });
    });

    it('renders correct number of skill cards matching portfolioData', () => {
      render(<App />);
      const skillsSections = screen.getAllByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.skills),
      );
      const skillsSection = skillsSections.find((el) => el.tagName.toLowerCase() === 'section')!;
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

    it('renders correct number of project cards matching portfolioData', () => {
      render(<App />);
      const projectsList = screen.getByLabelText(en.projects.ariaLabels.list);
      const directCards = Array.from(projectsList.children).filter(
        (child) => child.getAttribute('role') === 'listitem',
      );
      expect(directCards).toHaveLength(en.projectsData.length);
    });
  });

  describe('Contact', () => {
    it('renders email link with correct href', () => {
      render(<App />);
      const emailLabel = en.contact.ariaLabels.email.replace('{{email}}', en.profile.email);
      const emailLink = screen.getByLabelText(new RegExp(emailLabel, 'i'));
      expect(emailLink).toHaveAttribute('href', `mailto:${en.profile.email}`);
    });

    it('renders GitHub link with correct href', () => {
      render(<App />);
      const githubLabel = en.contact.ariaLabels.github.replace('{{username}}', en.profile.github);
      const githubLink = screen.getByLabelText(new RegExp(githubLabel, 'i'));
      expect(githubLink).toHaveAttribute('href', `https://github.com/${en.profile.github}`);
    });

    it('renders contact section title', () => {
      render(<App />);
      expect(screen.getAllByText(en.contact.sectionTitle).length).toBeGreaterThan(0);
    });
  });
});
