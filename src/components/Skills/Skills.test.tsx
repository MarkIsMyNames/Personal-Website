import { screen } from '@testing-library/react';
import { Skills } from './Skills';
import { AriaRole } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import { renderWithTheme } from '../../test-utils';

const mockSkills = defaultLocale.skillsData;

describe('Skills Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    screen.getByText(defaultLocale.skills.sectionTitle);
  });

  it('renders skill names from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      screen.getByText(skill.name);
    });
  });

  it('renders correct number of skill cards matching skills prop length', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getAllByRole(AriaRole.ListItem)).toHaveLength(mockSkills.length);
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    screen.getByLabelText(
      defaultLocale.common.ariaLabels.section.replace(
        '{{title}}',
        defaultLocale.navigation.sections.skills,
      ),
    );
  });

  it('renders skill list with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    screen.getByLabelText(defaultLocale.skills.ariaLabels.list);
  });

  it('renders each skill card with aria-label from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      screen.getByLabelText(defaultLocale.skills.ariaLabels.card.replace('{{name}}', skill.name));
    });
  });
});
