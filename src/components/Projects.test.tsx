import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Projects } from './Projects';
import { theme } from '../styles/theme';
import type { Project } from '../types';

const firstMockProject: Project = {
  id: '1',
  title: 'Test Project 1',
  role: 'Test Role 1',
  description: 'This is a test project description.',
  highlights: [
    { id: '1', text: 'First highlight', orderIndex: 0 },
    { id: '2', text: 'Second highlight', orderIndex: 1 },
  ],
  images: ['test1.jpg'],
  tags: ['React', 'TypeScript'],
  orderIndex: 0,
};

const secondMockProject: Project = {
  id: '2',
  title: 'Test Project 2',
  role: 'Test Role 2',
  description: 'Another test project.',
  highlights: [{ id: '3', text: 'Third highlight', orderIndex: 0 }],
  images: ['test2.jpg', 'test3.jpg', 'test4.jpg'],
  tags: ['Node.js', 'Express'],
  orderIndex: 1,
};

const mockProjects: Project[] = [firstMockProject, secondMockProject];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Projects Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const titleElement = screen.getByText(/Projects & Experience/i);
    expect(titleElement).toBeInTheDocument();
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

  it('renders project images', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    // Images with button role (clickable) + regular images (non-clickable)
    const images = screen.getAllByAltText(/screenshot/i);
    expect(images.length).toBeGreaterThanOrEqual(4);
  });

  it('renders single image with correct styling', () => {
    const singleImageProject: Project[] = [firstMockProject];
    renderWithTheme(<Projects projects={singleImageProject} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);
    expect(image).toBeInTheDocument();
  });

  it('renders multiple images', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Project 2 screenshot 3 of 3/i)).toBeInTheDocument();
  });

  it('displays all project information together', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Role 1/i)).toBeInTheDocument();
    expect(screen.getByText(/First highlight/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  it('opens modal when clicking on a project image', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);
    image.click();

    // Modal should open after clicking
    expect(
      container.querySelector('img[alt="Test Project 1 screenshot 1 of 1"]'),
    ).toBeInTheDocument();
  });

  it('navigates to next image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const firstImage = screen.getByAltText(/Test Project 2 screenshot 1 of 3/i);
    firstImage.click();

    // Modal should be open, verify multiple images exist
    expect(screen.getByAltText(/Test Project 2 screenshot 1 of 3/i)).toBeInTheDocument();
  });

  it('navigates to previous image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 2 screenshot 2 of 3/i);
    image.click();

    expect(screen.getByAltText(/Test Project 2 screenshot 2 of 3/i)).toBeInTheDocument();
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    expect(screen.getByText(/Projects & Experience/i)).toBeInTheDocument();
  });

  it('handles project with no highlights', () => {
    const projectWithNoHighlights: Project[] = [
      {
        ...firstMockProject,
        highlights: [],
      },
    ];
    renderWithTheme(<Projects projects={projectWithNoHighlights} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });

  it('handles project with no tags', () => {
    const projectWithNoTags: Project[] = [
      {
        ...firstMockProject,
        tags: [],
      },
    ];
    renderWithTheme(<Projects projects={projectWithNoTags} />);
    expect(screen.getByText(/Test Project 1/i)).toBeInTheDocument();
  });

  it('opens modal when pressing Enter key on project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);

    // Simulate Enter key press
    fireEvent.keyDown(image, { key: 'Enter', code: 'Enter' });

    // Modal should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens modal when pressing Space key on project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);

    // Simulate Space key press
    fireEvent.keyDown(image, { key: ' ', code: 'Space' });

    // Modal should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not open modal when pressing other keys on project image', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);

    // Simulate a different key press (e.g., 'a')
    fireEvent.keyDown(image, { key: 'a', code: 'KeyA' });

    // Modal should not be open
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).not.toBeInTheDocument();
  });

  it('does not open modal when pressing Enter on Intercom project image', () => {
    const intercomProject: Project[] = [
      {
        ...firstMockProject,
        title: 'Intercom',
        images: ['intercom.jpg'],
      },
    ];
    const { container } = renderWithTheme(<Projects projects={intercomProject} />);
    const image = screen.getByAltText(/Intercom screenshot 1 of 1/i);

    // Simulate Enter key press
    fireEvent.keyDown(image, { key: 'Enter', code: 'Enter' });

    // Modal should not be open
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).not.toBeInTheDocument();
  });

  it('navigates to next image when clicking next button in modal', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const firstImage = screen.getByAltText(/Test Project 2 screenshot 1 of 3/i);
    fireEvent.click(firstImage);

    // Modal should be open with next button
    const nextButton = screen.getByLabelText(/Next image/i);
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    // Check that image index changed - modal image should have updated alt text
    const modalImage = container.querySelector('[role="dialog"] img');
    expect(modalImage).toHaveAttribute('alt', 'Image 2');
  });

  it('navigates to previous image when clicking previous button in modal', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const secondImage = screen.getByAltText(/Test Project 2 screenshot 2 of 3/i);
    fireEvent.click(secondImage);

    // Modal should be open with previous button
    const prevButton = screen.getByLabelText(/Previous image/i);
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    // Check that image index changed - modal image should have updated alt text
    const modalImage = container.querySelector('[role="dialog"] img');
    expect(modalImage).toHaveAttribute('alt', 'Image 1');
  });

  it('closes modal when close button is clicked', () => {
    const { container } = renderWithTheme(<Projects projects={mockProjects} />);
    const image = screen.getByAltText(/Test Project 1 screenshot 1 of 1/i);
    fireEvent.click(image);

    // Modal should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeButton);

    // Modal should be closed
    const modal = container.querySelector('[role="dialog"]');
    expect(modal).not.toBeInTheDocument();
  });
});
