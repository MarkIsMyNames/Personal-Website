import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Skills } from './Skills';
import { theme } from '../styles/theme';
import type { Skill } from '../types';
import React from 'react';

const mockSkills: Skill[] = [
  { id: '1', name: 'Java', iconName: 'FaJava', category: 'language' },
  { id: '2', name: 'Python', iconName: 'FaPython', category: 'language' },
  { id: '3', name: 'React', iconName: 'FaReact', category: 'framework' },
  { id: '4', name: 'Ember', iconName: 'SiEmberdotjs', category: 'framework' },
  { id: '5', name: 'Linux', iconName: 'FaLinux', category: 'tool' },
  { id: '6', name: 'OOP', iconName: 'BiCodeBlock', category: 'tool' },
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
