import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Navigation } from './Navigation';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  SCROLL_TOP_ZERO,
  WINDOW_PROP_SCROLL_Y,
  NAV_TRANSFORM_HIDDEN,
  NAV_TRANSFORM_VISIBLE,
  SCROLL_Y_BELOW_THRESHOLD_LOW,
  SCROLL_Y_LOW,
  SCROLL_Y_MID,
  SCROLL_Y_HIGH,
  REGEX_FLAG_CASE_INSENSITIVE,
  MOCK_RECT_ZERO,
  MOCK_RECT_TOP,
  MOCK_RECT_HEIGHT,
} from '../../config';
import { AriaRole, HtmlAttr, HtmlTag, ScrollBehavior, SectionId, WindowGlobal } from '../../types';
import { renderWithTheme } from '../../test-utils';

const simulateScroll = (y: number) => {
  Object.defineProperty(window, WINDOW_PROP_SCROLL_Y, { value: y, writable: true });
  fireEvent.scroll(window);
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
    screen.getByText(defaultLocale.profile.name);
  });

  it('renders all navigation links from translation', () => {
    renderWithTheme(<Navigation />);
    screen.getByText(defaultLocale.navigation.sections.about);
    screen.getByText(defaultLocale.navigation.sections.skills);
    screen.getByText(defaultLocale.navigation.sections.projects);
    screen.getByText(defaultLocale.navigation.sections.contact);
  });

  it('renders brand button with correct aria-label and scrolls to top when clicked', () => {
    renderWithTheme(<Navigation />);
    const nameButton = screen.getByRole(AriaRole.Button, {
      name: defaultLocale.navigation.ariaLabels.link.replace(
        '{{section}}',
        defaultLocale.navigation.sections.about,
      ),
    });
    expect(nameButton).toBeInTheDocument();
    fireEvent.click(nameButton);
    expect(scrollToMock).toHaveBeenCalledWith({
      top: SCROLL_TOP_ZERO,
      behavior: ScrollBehavior.Smooth,
    });
  });

  it('renders profile image with src from translation', () => {
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

  it('hides navigation when scrolling down', () => {
    renderWithTheme(<Navigation />);
    simulateScroll(SCROLL_Y_LOW);
    simulateScroll(SCROLL_Y_MID);
    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_HIDDEN);
  });

  it('shows navigation when scrolling up', () => {
    renderWithTheme(<Navigation />);
    simulateScroll(SCROLL_Y_MID);
    simulateScroll(SCROLL_Y_LOW);
    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });

  it('shows navigation when scroll position is less than 10', () => {
    renderWithTheme(<Navigation />);
    simulateScroll(SCROLL_Y_BELOW_THRESHOLD_LOW);
    expect(screen.getByRole(AriaRole.Navigation)).toHaveStyle(NAV_TRANSFORM_VISIBLE);
  });

  it.each(Object.values(SectionId))('scrolls to %s section when clicking nav link', (sectionId) => {
    const mockElement = document.createElement(HtmlTag.Div);
    mockElement.id = sectionId;
    document.body.appendChild(mockElement);

    renderWithTheme(<Navigation />);
    fireEvent.click(screen.getByText(new RegExp(sectionId, REGEX_FLAG_CASE_INSENSITIVE)));
    expect(scrollToMock).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it('does not reattach scroll listener on every scroll event', () => {
    const addEventListenerSpy = vi.spyOn(window, WindowGlobal.AddEventListener);
    const removeEventListenerSpy = vi.spyOn(window, WindowGlobal.RemoveEventListener);

    const { unmount } = renderWithTheme(<Navigation />);
    const initialAddCalls = addEventListenerSpy.mock.calls.length;

    simulateScroll(SCROLL_Y_LOW);
    simulateScroll(SCROLL_Y_MID);
    simulateScroll(SCROLL_Y_HIGH);

    expect(addEventListenerSpy).toHaveBeenCalledTimes(initialAddCalls);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles clicking link when section does not exist', () => {
    renderWithTheme(<Navigation />);
    fireEvent.click(screen.getByText(defaultLocale.navigation.sections.skills));
    expect(scrollToMock).not.toHaveBeenCalled();
  });
});
