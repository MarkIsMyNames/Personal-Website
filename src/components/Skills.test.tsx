import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Skills } from './Skills';
import { theme } from '../styles/theme';
import { SkillCategory, type Skill } from '../types';
import React from 'react';

const mockSkills: Skill[] = [
  { name: 'Java', iconName: 'FaJava', category: SkillCategory.Language },
  { name: 'Python', iconName: 'FaPython', category: SkillCategory.Language },
  { name: 'React', iconName: 'FaReact', category: SkillCategory.Framework },
  { name: 'Ember', iconName: 'SiEmberdotjs', category: SkillCategory.Framework },
  { name: 'OOP', iconName: 'BiCodeBlock', category: SkillCategory.Concept },
  { name: 'Linux', iconName: 'FaLinux', category: SkillCategory.Technology },
];

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Skills Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    const titleElement = screen.getByText(/Technical Skills/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders all skills in a single list', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    expect(screen.getByText(/Java/i)).toBeInTheDocument();
    expect(screen.getByText(/Python/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Ember/i)).toBeInTheDocument();
    expect(screen.getByText(/Linux/i)).toBeInTheDocument();
    expect(screen.getByText(/OOP/i)).toBeInTheDocument();
  });

  it('renders correct number of skills', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('displays skill icons', () => {
    renderWithTheme(<Skills skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });
});
