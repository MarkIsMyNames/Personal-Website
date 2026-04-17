import { screen, fireEvent } from '@testing-library/react';
import { Projects, getModalImageUrl } from './Projects';
import { AriaRole, ErrorMessage, HtmlAttr, HtmlTag, KeyboardKey, KeyCode } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  DISPLAY_INDEX_OFFSET,
  FIRST_INDEX,
  IMAGE_INDEX_FIRST,
  IMAGE_INDEX_SECOND,
  SINGLE_ITEM_COUNT,
} from '../../config';
import { renderWithTheme } from '../../test-utils';

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
    screen.getByText(defaultLocale.projects.sectionTitle);
  });

  it('renders all project titles from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    screen.getByText(firstMockProject.title);
    screen.getByText(secondMockProject.title);
  });

  it('renders project roles from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    screen.getByText(firstMockProject.role);
    screen.getByText(secondMockProject.role);
  });

  it('renders project descriptions from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    screen.getByText(firstMockProject.description);
    screen.getByText(secondMockProject.description);
  });

  it('renders project highlights from props', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    [...firstMockProject.highlights, ...secondMockProject.highlights].forEach((highlight) => {
      screen.getByText(highlight);
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
    screen.getByAltText(
      screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
    );
    screen.getByAltText(
      screenshotAlt(secondMockProject.title, DISPLAY_INDEX_OFFSET, secondMockProject.images.length),
    );
  });

  it('renders empty project list', () => {
    renderWithTheme(<Projects projects={[]} />);
    screen.getByText(defaultLocale.projects.sectionTitle);
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    screen.getByLabelText(
      defaultLocale.common.ariaLabels.section.replace(
        '{{title}}',
        defaultLocale.navigation.sections.projects,
      ),
    );
  });

  it('renders project cards with translated aria-labels', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    screen.getByLabelText(
      defaultLocale.projects.ariaLabels.card.replace('{{title}}', firstMockProject.title),
    );
  });

  it('handles project with no highlights', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, highlights: [] }]} />);
    screen.getByText(firstMockProject.title);
  });

  it('handles project with no tags', () => {
    renderWithTheme(<Projects projects={[{ ...firstMockProject, tags: [] }]} />);
    screen.getByText(firstMockProject.title);
  });

  it.each([
    [KeyboardKey.Enter, KeyCode.Enter],
    [KeyboardKey.Space, KeyCode.Space],
  ])('opens modal when pressing %s on a project image', (key, code) => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
      { key, code },
    );
    expect(screen.getByRole(AriaRole.Dialog)).toBeVisible();
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

  it('does not open modal when pressing other keys', () => {
    renderWithTheme(<Projects projects={mockProjects} />);
    fireEvent.keyDown(
      screen.getByAltText(
        screenshotAlt(firstMockProject.title, DISPLAY_INDEX_OFFSET, firstMockProject.images.length),
      ),
      { key: KeyboardKey.A, code: KeyCode.KeyA },
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
    screen.getByAltText(
      defaultLocale.imageModal.ariaLabels.image.replace('{{index}}', IMAGE_INDEX_SECOND),
    );
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
