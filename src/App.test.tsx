import { render, screen, within } from '@testing-library/react';
import App from './App';
import { profile, skills, projects } from './data/portfolioData';

describe('App Component', () => {
  describe('Profile Information', () => {
    it('renders name', () => {
      render(<App />);
      const nameElements = screen.getAllByText(new RegExp(profile.name, 'i'));
      expect(nameElements.length).toBeGreaterThan(0);
      expect(nameElements[0]).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<App />);
      const titleElements = screen.getAllByText(new RegExp(profile.title, 'i'));
      expect(titleElements.length).toBeGreaterThan(0);
      expect(titleElements[0]).toBeInTheDocument();
    });

    it('renders bio section with biography article', () => {
      render(<App />);
      const bioArticle = screen.getByRole('article', { name: /biography/i });
      expect(bioArticle).toBeInTheDocument();
    });

    it('renders profile image with correct alt text', () => {
      render(<App />);
      const profileImage = screen.getByAltText(`${profile.name} - ${profile.title}`);
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', profile.image);
    });

    it('renders education information', () => {
      render(<App />);
      const educationElement = screen.getByLabelText(/education information/i);
      expect(educationElement).toBeInTheDocument();
      expect(educationElement).toHaveTextContent(/University of Limerick/i);
      expect(educationElement).toHaveTextContent(String(profile.graduationYear));
    });
  });

  describe('Navigation', () => {
    it('renders navigation menu items', () => {
      render(<App />);
      expect(screen.getByRole('menuitem', { name: /about/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /skills/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /projects/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /contact/i })).toBeInTheDocument();
    });

    it('renders navigation landmark', () => {
      render(<App />);
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    });
  });

  describe('Sections', () => {
    it('renders about section', () => {
      render(<App />);
      const aboutSection = document.getElementById('about');
      expect(aboutSection).toBeInTheDocument();
    });

    it('renders skills section', () => {
      render(<App />);
      const skillsSection = document.getElementById('skills');
      expect(skillsSection).toBeInTheDocument();
    });

    it('renders projects section', () => {
      render(<App />);
      const projectsSection = document.getElementById('projects');
      expect(projectsSection).toBeInTheDocument();
    });

    it('renders contact section', () => {
      render(<App />);
      const contactSection = document.getElementById('contact');
      expect(contactSection).toBeInTheDocument();
    });
  });

  describe('Skills', () => {
    it('renders skills section with correct title', () => {
      render(<App />);
      expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    });

    it('renders skill items', () => {
      render(<App />);
      const skillsSection = screen.getByLabelText(/technical skills section/i);
      skills.forEach((skill) => {
        expect(within(skillsSection).getByText(skill.name)).toBeInTheDocument();
      });
    });
  });

  describe('Projects', () => {
    it('renders all project titles', () => {
      render(<App />);
      projects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });

    it('renders project roles', () => {
      render(<App />);
      projects.forEach((project) => {
        expect(screen.getByText(project.role)).toBeInTheDocument();
      });
    });

    it('renders project descriptions', () => {
      render(<App />);
      projects.forEach((project) => {
        expect(screen.getByText(project.description)).toBeInTheDocument();
      });
    });
  });

  describe('Contact', () => {
    it('renders email link with correct href', () => {
      render(<App />);
      const emailLink = screen.getByLabelText(new RegExp(`email ${profile.email}`, 'i'));
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', `mailto:${profile.email}`);
    });

    it('renders GitHub link with correct href', () => {
      render(<App />);
      const githubLink = screen.getByLabelText(
        new RegExp(`visit github profile of ${profile.github}`, 'i'),
      );
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', `https://github.com/${profile.github}`);
    });

    it('renders contact section title', () => {
      render(<App />);
      expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    });
  });
});
