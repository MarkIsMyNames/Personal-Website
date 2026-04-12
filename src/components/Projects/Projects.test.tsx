import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Projects, getModalImageUrl } from './Projects';
import { theme } from '../../styles/theme';
import { AriaRole, ErrorMessage, HtmlAttr, HtmlTag, KeyboardKey, KeyCode } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  DISPLAY_INDEX_OFFSET,
  FIRST_INDEX,
  IMAGE_INDEX_FIRST,
  IMAGE_INDEX_SECOND,
  SINGLE_ITEM_COUNT,
} from '../../config';
import type React from 'react';

const firstMockProject = defaultLocale.projectsData.find(
  (p) => p.images.length === SINGLE_ITEM_COUNT,
);
if (!firstMockProject) {
  throw new Error(ErrorMessage.NoSingleImageProject);
}

const secondMockProject = defaultLocale.projectsData.find(
  (p) => p.images.length > SINGLE_ITEM_COUNT,
);
if (!secondMockProject) {
  throw new Error(ErrorMessage.NoMultiImageProject);
}

const mockProjects = [firstMockProject, secondMockProject];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const screenshotAlt = (title: string, index: number, total: number): string =>
  defaultLocale.projects.ariaLabels.screenshotAlt
    .replace('{{title}}', title)
    .replace('{{index}}', String(index))
    .replace('{{total}}', String(total));

describe('getModalImageUrl', () => {
  it('returns the image url at the given index', () => {
    const image = firstMockProject.images[FIRST_INDEX];
    if (!image) {
      throw new Error(ErrorMessage.NoImageAtIndex);
    }
    expect(getModalImageUrl({ images: [image], index: FIRST_INDEX })).toBe(image);
  });
});

describe('Projects Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(screen.getByText(defaultLocale.projects.sectionTitle)).toBeInTheDocument();
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
    [...firstMockProject.highlights, ...secondMockProject.highlights].forEach((highlight) => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it('renders project tags from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    [...firstMockProject.tags, ...secondMockProject.tags].forEach((tag) => {
      expect(screen.getAllByText(tag)[FIRST_INDEX]).toBeInTheDocument();
    });
  });

  it('renders project images with translated screenshot alt text', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        screenshotAlt(
          secondMockProject.title,
          DISPLAY_INDEX_OFFSET,
          secondMockProject.images.length,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    expect(screen.getByText(defaultLocale.projects.sectionTitle)).toBeInTheDocument();
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(
      screen.getByLabelText(
        defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.projects,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders project cards with translated aria-labels', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    expect(
      screen.getByLabelText(
        defaultLocale.projects.ariaLabels.card.replace('{{title}}', firstMockProject.title),
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
    fireEvent.click(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
    );
    expect(screen.getByRole(AriaRole.Dialog)).toBeVisible();
  });

  it('opens modal when pressing Enter on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
      {
        key: KeyboardKey.Enter,
        code: KeyCode.Enter,
      },
    );
    expect(screen.getByRole(AriaRole.Dialog)).toBeVisible();
  });

  it('opens modal when pressing Space on a project image', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
      {
        key: KeyboardKey.Space,
        code: KeyCode.Space,
      },
    );
    expect(screen.getByRole(AriaRole.Dialog)).toBeVisible();
  });

  it('does not open modal when pressing other keys', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
      {
        key: KeyboardKey.A,
        code: KeyCode.KeyA,
      },
    );
    expect(screen.queryByRole(AriaRole.Dialog)).not.toBeInTheDocument();
  });

  it('navigates to next image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(
      screen.getByAltText(
        screenshotAlt(
          secondMockProject.title,
          DISPLAY_INDEX_OFFSET,
          secondMockProject.images.length,
        ),
      ),
    );
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next));
    expect(
      screen.getByAltText(
        defaultLocale.imageModal.ariaLabels.image.replace('{{index}}', IMAGE_INDEX_SECOND),
      ),
    ).toBeInTheDocument();
  });

  it('navigates to previous image in modal', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(
      screen.getByAltText(
        screenshotAlt(
          secondMockProject.title,
          DISPLAY_INDEX_OFFSET + SINGLE_ITEM_COUNT,
          secondMockProject.images.length,
        ),
      ),
    );
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous));
    const img = screen.getByRole(AriaRole.Dialog).querySelector(HtmlTag.Img);
    if (!img) {
      throw new Error(ErrorMessage.NoImageAtIndex);
    }
    expect(img).toHaveAttribute(
      HtmlAttr.Alt,
      defaultLocale.imageModal.ariaLabels.image.replace('{{index}}', IMAGE_INDEX_FIRST),
    );
  });

  it('closes modal when close button is clicked', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.click(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
    );
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.close));
    expect(screen.queryByRole(AriaRole.Dialog)).not.toBeInTheDocument();
  });
});
