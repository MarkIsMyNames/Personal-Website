import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Skills } from './Skills';
import { theme } from '../../styles/theme';
import type { Skill } from '../../types';
import en from '../../i18n/locales/en.json';
import type React from 'react';

const mockSkills: Skill[] = [
  { name: 'Java', iconName: 'FaJava' },
  { name: 'Python', iconName: 'FaPython' },
  { name: 'React', iconName: 'FaReact' },
];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Skills Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByText(en.skills.sectionTitle)).toBeInTheDocument();
  });

  it('renders skill names from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('renders correct number of skill cards matching skills prop length', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockSkills.length);
  });

  it('renders section with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(
      screen.getByLabelText(
        en.common.ariaLabels.section.replace('{{title}}', en.navigation.sections.skills),
      ),
    ).toBeInTheDocument();
  });

  it('renders skill list with correct aria-label', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByLabelText(en.skills.ariaLabels.list)).toBeInTheDocument();
  });

  it('renders each skill card with aria-label from props', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(
        screen.getByLabelText(en.skills.ariaLabels.card.replace('{{name}}', skill.name)),
      ).toBeInTheDocument();
    });
  });
});
