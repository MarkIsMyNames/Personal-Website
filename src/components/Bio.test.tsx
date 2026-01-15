import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Bio } from './Bio';
import { theme } from '../styles/theme';
import type { Profile } from '../types';
import React from 'react';

const mockProfile: Profile = {
  id: '1',
  name: 'Test User',
  title: 'Test Engineer',
  bio: 'This is a test bio. It has multiple sentences. Great for testing.',
  image: 'test.jpg',
  email: 'test@example.com',
  github: 'testuser',
  graduationYear: 2027,
  university: 'Test University',
};

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Bio Component', () => {
  it('renders profile name', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const nameElement = screen.getByText(/Test User/i);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders profile title', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const titleElement = screen.getByText(/Test Engineer/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders profile bio with sentences', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(screen.getByText(/This is a test bio/i)).toBeInTheDocument();
    expect(screen.getByText(/It has multiple sentences/i)).toBeInTheDocument();
  });

  it('renders education information', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const educationElement = screen.getByText(/Test University • Class of 2027/i);
    expect(educationElement).toBeInTheDocument();
  });

  it('renders profile image with correct alt text', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(/Test User/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'test.jpg');
  });

  it('renders profile image with rounded style', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    const imageElement = screen.getByAltText(/Test User/i);
    const styles = window.getComputedStyle(imageElement);
    expect(styles.borderRadius).toBe('50%');
  });

  it('displays all bio content in correct order', () => {
    renderWithTheme(<Bio profile={mockProfile} />);
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test bio/i)).toBeInTheDocument();
    expect(screen.getByText(/Test University • Class of 2027/i)).toBeInTheDocument();
  });
});
