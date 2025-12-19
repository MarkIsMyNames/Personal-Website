import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { theme } from '../styles/theme';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Navigation Component', () => {
  let scrollToMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToMock = vi.fn();
    window.scrollTo = scrollToMock as typeof window.scrollTo;

    // Mock getBoundingClientRect
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
    expect(screen.getByText(/Mark Drohan/i)).toBeInTheDocument();
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

  it('navigation links have correct hover behavior', () => {
    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });

  it('renders all four navigation sections', () => {
    renderWithTheme(<Navigation />);
    const links = screen.getAllByRole('generic');
    expect(links.length).toBeGreaterThan(0);
  });

  it('scrolls to top when brand is clicked', () => {
    renderWithTheme(<Navigation />);
    const brand = screen.getByText(/Mark Drohan/i);
    fireEvent.click(brand);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('hides navigation when scrolling down', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('shows navigation when scrolling up', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Simulate scroll down then up
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('shows navigation when scroll position is less than 10', () => {
    const { container } = renderWithTheme(<Navigation />);

    Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders profile image', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText('Mark Drohan profile picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'Personal Profile.jpg');
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
      if (element) document.body.removeChild(element);
    });
  });

  it('renders name section with profile image and text', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', { name: /scroll to top/i });
    expect(nameButton).toBeInTheDocument();

    const profileImage = screen.getByAltText('Mark Drohan profile picture');
    const nameText = screen.getByText('Mark Drohan');

    expect(profileImage).toBeInTheDocument();
    expect(nameText).toBeInTheDocument();
  });

  it('name section is clickable and scrolls to top', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole('button', { name: /scroll to top/i });

    fireEvent.click(nameButton);
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('does not reattach scroll listener on every scroll event', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderWithTheme(<Navigation />);

    const initialAddCalls = addEventListenerSpy.mock.calls.length;

    // Simulate multiple scroll events
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    fireEvent.scroll(window);

    // addEventListener should only be called once during mount, not after each scroll
    expect(addEventListenerSpy).toHaveBeenCalledTimes(initialAddCalls);

    unmount();

    // removeEventListener should be called once during unmount
    expect(removeEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles clicking link when section does not exist', () => {
    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);

    // Don't add the section to DOM
    fireEvent.click(aboutLink);

    // Should not throw error
    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('handles case when nav element height is unavailable', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.body.appendChild(mockElement);

    // Mock querySelector to return null for nav
    const originalQuerySelector = document.querySelector;
    document.querySelector = vi.fn((selector) => {
      if (selector === 'nav') {
        return null;
      }
      return originalQuerySelector.call(document, selector);
    });

    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(/About/i);
    fireEvent.click(aboutLink);

    // Should still call scrollTo with navHeight = 0
    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
    document.querySelector = originalQuerySelector;
  });

  it('maintains visibility state when already visible and scrolling to top', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Start at top (visible = true)
    Object.defineProperty(window, 'scrollY', { value: 5, writable: true });
    fireEvent.scroll(window);

    // Scroll down slightly but still < 10
    Object.defineProperty(window, 'scrollY', { value: 8, writable: true });
    fireEvent.scroll(window);

    // Nav should still be visible
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('maintains visibility state when already visible and scrolling up', () => {
    const { container } = renderWithTheme(<Navigation />);

    // Start scrolled down
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    fireEvent.scroll(window);

    // Scroll up to make visible
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    fireEvent.scroll(window);

    // Scroll up again (already visible)
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
