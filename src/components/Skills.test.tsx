import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Skills } from './Skills';
import { theme } from '../styles/theme';
import type { Skill } from '../types';
import type React from 'react';

const mockSkills: Skill[] = [
  { name: 'Java', iconName: 'FaJava' },
  { name: 'Python', iconName: 'FaPython' },
  { name: 'React', iconName: 'FaReact' },
  { name: 'Ember', iconName: 'SiEmberdotjs' },
  { name: 'OOP', iconName: 'BiCodeBlock' },
  { name: 'Linux', iconName: 'FaLinux' },
];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Skills Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
  });

  it('renders all skill names', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('renders correct number of skill cards', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockSkills.length);
  });
});
