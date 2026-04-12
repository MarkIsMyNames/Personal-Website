import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { ImageModal } from './ImageModal';
import { theme } from '../../styles/theme';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  SINGLE_CALL,
  SINGLE_ITEM_COUNT,
  FIRST_INDEX,
  TOUCH_X_HIGH,
  TOUCH_X_MID,
  TOUCH_X_LOW,
  TOUCH_Y,
  TOUCH_BELOW_THRESHOLD_END_X,
  TOUCH_VERTICAL_START_Y,
  TOUCH_VERTICAL_END_X,
  TOUCH_VERTICAL_END_Y,
  TEST_IMAGE_URL,
  TEST_IMAGE_ALT,
} from '../../config';
import { AriaRole, HtmlAttr, HtmlTag, KeyboardKey, OverflowValue } from '../../types';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ImageModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();
  const testImageUrl = TEST_IMAGE_URL;
  const testAltText = TEST_IMAGE_ALT;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the image', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    expect(screen.getByAltText(testAltText)).toBeInTheDocument();
  });

  it('displays the correct image src', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    expect(screen.getByAltText(testAltText)).toHaveAttribute(HtmlAttr.Src, testImageUrl);
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.close));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('renders close button with translated aria-label', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    expect(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.close)).toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.keyDown(document, { key: KeyboardKey.Escape });
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onClose when overlay is clicked', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.click(screen.getByRole(AriaRole.Dialog));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onClose when image is clicked', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.click(screen.getByAltText(testAltText));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('renders modal with correct aria-label', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    expect(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.modal)).toBeInTheDocument();
  });

  it('renders navigation buttons with translated aria-labels when hasPrevious and hasNext are true', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious
        hasNext
      />,
    );
    expect(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.close)).toBeInTheDocument();
  });

  it('calls onPrevious when left arrow key is pressed', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious
        hasNext={false}
      />,
    );
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowLeft });
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onNext when right arrow key is pressed', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext
      />,
    );
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowRight });
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('does not call onPrevious when hasPrevious is false', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowLeft });
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it('does not call onNext when hasNext is false', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowRight });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('calls navigation callbacks when navigation buttons are clicked', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious
        hasNext
      />,
    );
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous));
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next));
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onNext when swiped left', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext
      />,
    );
    fireEvent.touchStart(document, { touches: [{ clientX: TOUCH_X_HIGH, clientY: TOUCH_Y }] });
    fireEvent.touchEnd(document, { changedTouches: [{ clientX: TOUCH_X_LOW, clientY: TOUCH_Y }] });
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onPrevious when swiped right', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious
        hasNext={false}
      />,
    );
    fireEvent.touchStart(document, { touches: [{ clientX: TOUCH_X_LOW, clientY: TOUCH_Y }] });
    fireEvent.touchEnd(document, { changedTouches: [{ clientX: TOUCH_X_HIGH, clientY: TOUCH_Y }] });
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('does not trigger swipe for small movements', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext
      />,
    );
    fireEvent.touchStart(document, { touches: [{ clientX: TOUCH_X_MID, clientY: TOUCH_Y }] });
    fireEvent.touchEnd(document, {
      changedTouches: [{ clientX: TOUCH_BELOW_THRESHOLD_END_X, clientY: TOUCH_Y }],
    });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('does not trigger swipe for vertical movements', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext
      />,
    );
    fireEvent.touchStart(document, {
      touches: [{ clientX: TOUCH_X_MID, clientY: TOUCH_VERTICAL_START_Y }],
    });
    fireEvent.touchEnd(document, {
      changedTouches: [{ clientX: TOUCH_VERTICAL_END_X, clientY: TOUCH_VERTICAL_END_Y }],
    });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('sets body overflow to hidden when rendered', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    expect(document.body.style.overflow).toBe(OverflowValue.Locked);
  });

  it('restores body overflow when unmounted', () => {
    const { unmount } = renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    unmount();
    expect(document.body.style.overflow).toBe(OverflowValue.Restored);
  });

  it('only renders the viewed image', () => {
    renderWithTheme(
      <ImageModal
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={false}
        hasNext={false}
      />,
    );
    const dialog = screen.getByRole(AriaRole.Dialog);
    const images = dialog.querySelectorAll(HtmlTag.Img);
    expect(images).toHaveLength(SINGLE_ITEM_COUNT);
    expect(images[FIRST_INDEX]).toHaveAttribute(HtmlAttr.Src, testImageUrl);
  });
});
