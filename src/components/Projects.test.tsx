import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Projects } from './Projects';
import { theme } from '../styles/theme';
import type { Project } from '../types';
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
    expect(screen.getByText(/Projects & Experience/i)).toBeInTheDocument();
  });

  it('renders all project titles', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Project 2/i)).toBeInTheDocument();
  });

  it('renders project roles', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Role 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Role 2/i)).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/This is a test project description/i)).toBeInTheDocument();
    expect(screen.getByText(/Another test project/i)).toBeInTheDocument();
  });

  it('renders project highlights', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/First highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/Second highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/Third highlight/i)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    expect(screen.getByText(/Express/i)).toBeInTheDocument();
  });

  it('renders project images with correct alt text', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 3 of 3/i)).toBeInTheDocument();
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    expect(screen.getByText(/Projects & Experience/i)).toBeInTheDocument();
  });

  it('handles project with no highlights', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, highlights: [] }]} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });

  it('handles project with no tags', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, tags: [] }]} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });

  it('opens modal when clicking a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('opens modal when pressing Enter on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('opens modal when pressing Space on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i), {
      key: ' ',
      code: 'Space',
    });
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('does not open modal when pressing other keys on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i), {
      key: 'a',
      code: 'KeyA',
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates to next image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i));
    fireEvent.click(screen.getByLabelText(/Next image/i));
    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
  });

  it('navigates to previous image in modal', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i));
    fireEvent.click(screen.getByLabelText(/Previous image/i));
    expect(container.querySelector('[role="dialog"] img')).toHaveAttribute('alt', 'Image 0');
  });

  it('closes modal when close button is clicked', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(screen.getByAltText(/Test Project 1 screenshot 1 of 1/i));
    expect(screen.getByRole('dialog')).toBeVisible();
    fireEvent.click(screen.getByLabelText(/Close modal/i));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
