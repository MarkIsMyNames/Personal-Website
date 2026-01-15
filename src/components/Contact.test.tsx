import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Contact } from './Contact';
import { theme } from '../styles/theme';
import type { Profile } from '../types';
import React from 'react';

const mockProfile: Profile = {
  id: '1',
  name: 'Test User',
  title: 'Test Engineer',
  bio: 'Test bio',
  image: 'test.jpg',
  email: 'test@example.com',
  github: 'testuser',
  graduationYear: 2027,
  university: 'Test University',
};

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Contact Component', () => {
  it('renders section title', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const titleElement = screen.getByText(/Get In Touch/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders email link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(/Email test@example.com/i);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('renders GitHub link with correct href', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(/Visit GitHub profile of testuser/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/testuser');
  });

  it('GitHub link opens in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const githubLink = screen.getByLabelText(/Visit GitHub profile of testuser/i);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('email link does not open in new tab', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const emailLink = screen.getByLabelText(/Email test@example.com/i);
    expect(emailLink).not.toHaveAttribute('target', '_blank');
  });

  it('displays complete contact information', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/github.com\/testuser/i)).toBeInTheDocument();
  });

  it('renders both email and GitHub contact methods', () => {
    renderWithTheme(<Contact profile={mockProfile} />);
    const links = screen.getAllByRole('listitem');
    expect(links).toHaveLength(2);
  });
});
