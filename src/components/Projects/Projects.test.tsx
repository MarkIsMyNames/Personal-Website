import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Projects } from './Projects';
import { theme } from '../../styles/theme';
import type { Project } from '../../types';
import en from '../../i18n/locales/en.json';
import type React from 'react';

const firstMockProject: Project = {
  title: 'Test Project 1',
  role: 'Test Role 1',
  description: 'This is a test project description.',
  highlights: ['First highlight', 'Second highlight'],
  images: ['test1.jpg'],
  tags: ['React', 'TypeScript'],
};

const secondMockProject: Project = {
  title: 'Test Project 2',
  role: 'Test Role 2',
  description: 'Another test project.',
  highlights: ['Third highlight'],
  images: ['test2.jpg', 'test3.jpg', 'test4.jpg'],
  tags: ['Node.js', 'Express'],
};

const mockProjects: Project[] = [firstMockProject, secondMockProject];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Projects Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(en.projects.sectionTitle)).toBeInTheDocument();
  });

  it('renders all project titles from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(firstMockProject.title)).toBeInTheDocument();
    expect(screen.getByText(secondMockProject.title)).toBeInTheDocument();
  });

  it('renders project roles from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(firstMockProject.role)).toBeInTheDocument();
    expect(screen.getByText(secondMockProject.role)).toBeInTheDocument();
  });

  it('renders project descriptions from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(firstMockProject.description)).toBeInTheDocument();
    expect(screen.getByText(secondMockProject.description)).toBeInTheDocument();
  });

  it('renders project highlights from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText('First highlight')).toBeInTheDocument();
    expect(screen.getByText('Second highlight')).toBeInTheDocument();
    expect(screen.getByText('Third highlight')).toBeInTheDocument();
  });

  it('renders project tags from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
  });

  it('renders project images with translated screenshot alt text', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`)).toBeInTheDocument();
    expect(screen.getByAltText(`${secondMockProject.title} screenshot 1 of 3`)).toBeInTheDocument();
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    expect(screen.getByText(en.projects.sectionTitle)).toBeInTheDocument();
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(
      screen.getByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.projects),
      ),
    ).toBeInTheDocument();
  });

  it('renders project cards with translated aria-labels', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(
      screen.getByLabelText(
        en.projects.ariaLabels.card.replace('{{title}}', firstMockProject.title),
      ),
    ).toBeInTheDocument();
  });

  it('handles project with no highlights', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, highlights: [] }]} />);
    expect(screen.getByText(firstMockProject.title)).toBeInTheDocument();
  });

  it('handles project with no tags', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, tags: [] }]} />);
    expect(screen.getByText(firstMockProject.title)).toBeInTheDocument();
  });

  it('opens modal when clicking a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('opens modal when pressing Enter on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('opens modal when pressing Space on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`), {
      key: ' ',
      code: 'Space',
    });
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('does not open modal when pressing other keys', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`), {
      key: 'a',
      code: 'KeyA',
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates to next image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(`${secondMockProject.title} screenshot 1 of 3`));
    fireEvent.click(screen.getByLabelText(en.imageModal.ariaLabels.next));
    expect(
      screen.getByAltText(en.imageModal.ariaLabels.image.replace('{{index}}', '2')),
    ).toBeInTheDocument();
  });

  it('navigates to previous image in modal', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(`${secondMockProject.title} screenshot 2 of 3`));
    fireEvent.click(screen.getByLabelText(en.imageModal.ariaLabels.previous));
    expect(container.querySelector('[role="dialog"] img')).toHaveAttribute(
      'alt',
      en.imageModal.ariaLabels.image.replace('{{index}}', '1'),
    );
  });

  it('closes modal when close button is clicked', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(`${firstMockProject.title} screenshot 1 of 1`));
    fireEvent.click(screen.getByLabelText(en.imageModal.ariaLabels.close));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
