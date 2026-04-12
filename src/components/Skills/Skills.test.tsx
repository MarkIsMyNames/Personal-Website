import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Skills } from './Skills';
import { theme } from '../../styles/theme';
import { AriaRole } from '../../types';
import { defaultLocale } from '../../i18n/localeConfig';
import type React from 'react';

const mockSkills = defaultLocale.skillsData;

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Skills Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByText(defaultLocale.skills.sectionTitle)).toBeInTheDocument();
  });

  it('renders skill names from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('renders correct number of skill cards matching skills prop length', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getAllByRole(AriaRole.ListItem)).toHaveLength(mockSkills.length);
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(
      screen.getByLabelText(
        defaultLocale.common.ariaLabels.section.replace(
          '{{title}}',
          defaultLocale.navigation.sections.skills,
        ),
      ),
    ).toBeInTheDocument();
  });

  it('renders skill list with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByLabelText(defaultLocale.skills.ariaLabels.list)).toBeInTheDocument();
  });

  it('renders each skill card with aria-label from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(
        screen.getByLabelText(defaultLocale.skills.ariaLabels.card.replace('{{name}}', skill.name)),
      ).toBeInTheDocument();
    });
  });
});
