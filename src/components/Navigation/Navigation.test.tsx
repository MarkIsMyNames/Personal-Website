import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { theme } from '../../styles/theme';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  SCROLL_BEHAVIOR,
  SCROLL_TOP_ZERO,
  WINDOW_PROP_SCROLL_Y,
  NAV_TRANSFORM_HIDDEN,
  NAV_TRANSFORM_VISIBLE,
  SCROLL_Y_BELOW_THRESHOLD_LOW,
  SCROLL_Y_BELOW_THRESHOLD_HIGH,
  SCROLL_Y_LOW,
  SCROLL_Y_MID,
  SCROLL_Y_HIGH,
  REGEX_FLAG_CASE_INSENSITIVE,
  MOCK_RECT_ZERO,
  MOCK_RECT_TOP,
  MOCK_RECT_HEIGHT,
} from '../../config';
import { AriaRole, HtmlAttr, HtmlTag, SectionId, WindowGlobal } from '../../types';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Navigation Component', () => {
  let scrollToMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToMock = vi.fn();
    vi.stubGlobal(WindowGlobal.ScrollTo, scrollToMock);

    Element.prototype.getBoundingClientRect = vi.fn(
      () => new DOMRect(MOCK_RECT_ZERO, MOCK_RECT_TOP, MOCK_RECT_ZERO, MOCK_RECT_HEIGHT),
    );
  });

  it('renders brand name from translation', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(defaultLocale.profile.name)).toBeInTheDocument();
  });

  it('renders all navigation links from translation', () => {
    renderWithTheme(<Navigation />);
    expect(screen.getByText(defaultLocale.navigation.sections.about)).toBeInTheDocument();
    expect(screen.getByText(defaultLocale.navigation.sections.skills)).toBeInTheDocument();
    expect(screen.getByText(defaultLocale.navigation.sections.projects)).toBeInTheDocument();
    expect(screen.getByText(defaultLocale.navigation.sections.contact)).toBeInTheDocument();
  });

  it('calls scrollTo when clicking About link', () => {
    const mockElement = document.createElement(HtmlTag.Div);
    mockElement.id = SectionId.About;
    document.body.appendChild(mockElement);

    renderWithTheme(<Navigation />);
    const aboutLink = screen.getByText(defaultLocale.navigation.sections.about);
    fireEvent.click(aboutLink);

    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('scrolls to top when brand is clicked', () => {
    renderWithTheme(<Navigation />);
    const brand = screen.getByText(defaultLocale.profile.name);
    fireEvent.click(brand);
    expect(scrollToMock).toHaveBeenCalledWith({ top: SCROLL_TOP_ZERO, behavior: SCROLL_BEHAVIOR });
  });

  it('hides navigation when scrolling down', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_LOW, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_MID, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_HIDDEN);
  });

  it('shows navigation when scrolling up', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_MID, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_LOW, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });

  it('shows navigation when scroll position is less than 10', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, {
      value: SCROLL_Y_BELOW_THRESHOLD_LOW,
      writable: true,
    });
    fireEvent.scroll(window);

    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });

  it('renders profile image with src from portfolioData', () => {
    renderWithTheme(<Navigation />);
    const image = screen.getByAltText(
      defaultLocale.navigation.ariaLabels.profileImage.replace(
        '{{name}}',
        defaultLocale.profile.name,
      ),
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(HtmlAttr.Src, defaultLocale.profile.image);
  });

  it('scrolls to correct section when clicking each link', () => {
    const sections = [SectionId.About, SectionId.Skills, SectionId.Projects, SectionId.Contact];
    sections.forEach((sectionId) => {
      const mockElement = document.createElement(HtmlTag.Div);
      mockElement.id = sectionId;
      document.body.appendChild(mockElement);
    });

    renderWithTheme(<Navigation />);

    sections.forEach((sectionId) => {
      scrollToMock.mockClear();
      const link = screen.getByText(new RegExp(sectionId, REGEX_FLAG_CASE_INSENSITIVE));
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
    const nameButton = screen.getByRole(AriaRole.Button, {
      name: defaultLocale.navigation.ariaLabels.link.replace(
        '{{section}}',
        defaultLocale.navigation.sections.about,
      ),
    });
    expect(nameButton).toBeInTheDocument();
  });

  it('brand button is clickable and scrolls to top', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole(AriaRole.Button, {
      name: defaultLocale.navigation.ariaLabels.link.replace(
        '{{section}}',
        defaultLocale.navigation.sections.about,
      ),
    });

    fireEvent.click(nameButton);
    expect(scrollToMock).toHaveBeenCalledWith({ top: SCROLL_TOP_ZERO, behavior: SCROLL_BEHAVIOR });
  });

  it('does not reattach scroll listener on every scroll event', () => {
    const addEventListenerSpy = vi.spyOn(window, WindowGlobal.AddEventListener);
    const removeEventListenerSpy = vi.spyOn(window, WindowGlobal.RemoveEventListener);

    const { unmount } = renderWithTheme(<Navigation />);

    const initialAddCalls = addEventListenerSpy.mock.calls.length;

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_LOW, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_MID, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_HIGH, writable: true });
    fireEvent.scroll(window);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(initialAddCalls);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles clicking link when section does not exist', () => {
    renderWithTheme(<Navigation />);
    const skillsLink = screen.getByText(defaultLocale.navigation.sections.skills);

    fireEvent.click(skillsLink);

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('maintains visibility when scrolling within top 10px', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, {
      value: SCROLL_Y_BELOW_THRESHOLD_LOW,
      writable: true,
    });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, {
      value: SCROLL_Y_BELOW_THRESHOLD_HIGH,
      writable: true,
    });
    fireEvent.scroll(window);

    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });

  it('maintains visibility when scrolling up multiple times', () => {
    renderWithTheme(<Navigation />);

    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_HIGH, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_MID, writable: true });
    fireEvent.scroll(window);
    Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: SCROLL_Y_LOW, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });
});
