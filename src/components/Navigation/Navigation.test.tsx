import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { theme } from '../../styles/theme';
import { profile } from '../../data/portfolioData';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Navigation Component', () => {
  let scrollToMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToMock = vi.fn();
    window.scrollTo = scrollToMock as typeof window.scrollTo;

    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 0,
      bottom: 200,
      right: 0,
      width: 0,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  });

  it('renders brand name', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(new RegExp(profile.name, 'i'))).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('calls scrollTo when clicking About link', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.body.appendChild(mockElement);

    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);
    fireEvent.click(aboutLink);

    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('scrolls to top when brand is clicked', () => {
    renderWithTheme(<Navigation />);
    const brand = screen.getByText(new RegExp(profile.name, 'i'));
    fireEvent.click(brand);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('hides navigation when scrolling down', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole('navigation')).toHaveStyle('transform: translateY(-100%)');
  });

  it('shows navigation when scrolling up', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole('navigation')).toHaveStyle('transform: translateY(0)');
  });

  it('shows navigation when scroll position is less than 10', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole('navigation')).toHaveStyle('transform: translateY(0)');
  });

  it('renders profile image', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(`${profile.name} profile picture`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', profile.image);
  });

  it('scrolls to correct section when clicking each link', () => {
    const sections = ['about', 'skills', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const mockElement = document.createElement('div');
      mockElement.id = sectionId;
      document.body.appendChild(mockElement);
    });

    renderWithTheme(<Navigation />);

    sections.forEach((sectionId) => {
      scrollToMock.mockClear();
      const link = screen.getByText(new RegExp(sectionId, 'i'));
      fireEvent.click(link);
      expect(scrollToMock).toHaveBeenCalled();
    });

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        document.body.removeChild(element);
      }
    });
  });

  it('renders name section with profile image and text', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', {
      name: /Navigate to About section/i,
    });
    expect(nameButton).toBeInTheDocument();

    const profileImage = screen.getByAltText(`${profile.name} profile picture`);
    const nameText = screen.getByText(profile.name);

    expect(profileImage).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
  });

  it('name section is clickable and scrolls to top', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', {
      name: /Navigate to About section/i,
    });

    fireEvent.click(nameButton);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('does not reattach scroll listener on every scroll event', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderWithTheme(<Navigation />);

    const initialAddCalls = addEventListenerSpy.mock.calls.length;

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    fireEvent.scroll(window);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(initialAddCalls);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles clicking link when section does not exist', () => {
    renderWithTheme(<Navigation />);
    const skillsLink = screen.getByText(/Skills/i);

    fireEvent.click(skillsLink);

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('maintains visibility when scrolling within top 10px', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 8, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole('navigation')).toHaveStyle('transform: translateY(0)');
  });

  it('maintains visibility when scrolling up multiple times', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole('navigation')).toHaveStyle('transform: translateY(0)');
  });
});
