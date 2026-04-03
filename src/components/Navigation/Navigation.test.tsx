import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { theme } from '../../styles/theme';
import en from '../../i18n/locales/en.json';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Navigation Component', () => {
  let scrollToMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToMock = vi.fn();
    vi.stubGlobal('scrollTo', scrollToMock);

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

  it('renders brand name from translation', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(en.profile.name)).toBeInTheDocument();
  });

  it('renders all navigation links from translation', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(en.navigation.sections.about)).toBeInTheDocument();
    expect(screen.getByText(en.navigation.sections.skills)).toBeInTheDocument();
    expect(screen.getByText(en.navigation.sections.projects)).toBeInTheDocument();
    expect(screen.getByText(en.navigation.sections.contact)).toBeInTheDocument();
  });

  it('calls scrollTo when clicking About link', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.body.appendChild(mockElement);

    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(en.navigation.sections.about);
    fireEvent.click(aboutLink);

    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('scrolls to top when brand is clicked', () => {
    renderWithTheme(<Navigation />);
    const brand = screen.getByText(en.profile.name);
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

  it('renders profile image with src from portfolioData', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(`${en.profile.name} profile picture`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', en.profile.image);
  });

  it('renders nav profile image as a circle', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(`${en.profile.name} profile picture`);
    expect(window.getComputedStyle(image).borderRadius).toBe('50%');
  });

  it('renders nav profile image with equal width and height', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(`${en.profile.name} profile picture`);
    expect(window.getComputedStyle(image).width).toBe('2.5rem');
    expect(window.getComputedStyle(image).height).toBe('2.5rem');
  });

  it('renders nav profile image with object-fit cover to prevent distortion', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(`${en.profile.name} profile picture`);
    expect(window.getComputedStyle(image).objectFit).toBe('cover');
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

  it('renders brand button with correct aria-label', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', {
      name: en.navigation.ariaLabels.link.replace('{{section}}', en.navigation.sections.about),
    });
    expect(nameButton).toBeInTheDocument();
  });

  it('brand button is clickable and scrolls to top', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', {
      name: en.navigation.ariaLabels.link.replace('{{section}}', en.navigation.sections.about),
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
    const skillsLink = screen.getByText(en.navigation.sections.skills);

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
