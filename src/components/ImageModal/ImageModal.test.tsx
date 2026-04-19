import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ImageModal } from './ImageModal';
import { defaultLocale } from '../../i18n/localeConfig';
import {
  SINGLE_CALL,
  SINGLE_ITEM_COUNT,
  FIRST_INDEX,
  TOUCH_X_HIGH,
  TOUCH_X_MID,
  TOUCH_X_LOW,
  TOUCH_BELOW_THRESHOLD_END_X,
  TEST_IMAGE_URL,
  TEST_IMAGE_ALT,
} from '../../config';
import { AriaRole, HtmlAttr, HtmlTag, KeyboardKey, OverflowValue } from '../../types';
import { renderWithTheme } from '../../test-utils';

describe('ImageModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();

  const renderDefault = (overrides?: { hasPrevious?: boolean; hasNext?: boolean }) =>
    renderWithTheme(
      <ImageModal
        imageUrl={TEST_IMAGE_URL}
        altText={TEST_IMAGE_ALT}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious={overrides?.hasPrevious ?? false}
        hasNext={overrides?.hasNext ?? false}
      />,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders image with correct src and modal aria-label', () => {
    renderDefault();
    const image = screen.getByAltText(TEST_IMAGE_ALT);
    expect(image).toHaveAttribute(HtmlAttr.Src, TEST_IMAGE_URL);
    const dialog = screen.getByLabelText(defaultLocale.imageModal.ariaLabels.modal);
    expect(dialog).toHaveAttribute(HtmlAttr.AriaModal);
  });

  it('calls onClose when close button is clicked', () => {
    renderDefault();
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.close));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onClose when Escape key is pressed', () => {
    renderDefault();
    fireEvent.keyDown(document, { key: KeyboardKey.Escape });
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onClose when overlay is clicked', () => {
    renderDefault();
    fireEvent.click(screen.getByRole(AriaRole.Dialog));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onClose when image is clicked', () => {
    renderDefault();
    fireEvent.click(screen.getByAltText(TEST_IMAGE_ALT));
    expect(mockOnClose).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('renders previous and next buttons with translated aria-labels when both are enabled', () => {
    renderDefault({ hasPrevious: true, hasNext: true });
    screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous);
    screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next);
  });

  it('does not render previous button when hasPrevious is false', () => {
    renderDefault();
    expect(
      screen.queryByLabelText(defaultLocale.imageModal.ariaLabels.previous),
    ).not.toBeInTheDocument();
  });

  it('does not render next button when hasNext is false', () => {
    renderDefault();
    expect(
      screen.queryByLabelText(defaultLocale.imageModal.ariaLabels.next),
    ).not.toBeInTheDocument();
  });

  it('clicking navigation buttons does not also trigger onClose', () => {
    renderDefault({ hasPrevious: true, hasNext: true });
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous));
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onPrevious when left arrow key is pressed', () => {
    renderDefault({ hasPrevious: true });
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowLeft });
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onNext when right arrow key is pressed', () => {
    renderDefault({ hasNext: true });
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowRight });
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('does not call onPrevious when hasPrevious is false', () => {
    renderDefault();
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowLeft });
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it('does not call onNext when hasNext is false', () => {
    renderDefault();
    fireEvent.keyDown(document, { key: KeyboardKey.ArrowRight });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('calls navigation callbacks when navigation buttons are clicked', () => {
    renderDefault({ hasPrevious: true, hasNext: true });
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.previous));
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
    fireEvent.click(screen.getByLabelText(defaultLocale.imageModal.ariaLabels.next));
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onNext when swiped left', () => {
    renderDefault({ hasNext: true });
    fireEvent.pointerDown(document, { clientX: TOUCH_X_HIGH });
    fireEvent.pointerUp(document, { clientX: TOUCH_X_LOW });
    expect(mockOnNext).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('calls onPrevious when swiped right', () => {
    renderDefault({ hasPrevious: true });
    fireEvent.pointerDown(document, { clientX: TOUCH_X_LOW });
    fireEvent.pointerUp(document, { clientX: TOUCH_X_HIGH });
    expect(mockOnPrevious).toHaveBeenCalledTimes(SINGLE_CALL);
  });

  it('does not call onNext when swiped left but hasNext is false', () => {
    renderDefault();
    fireEvent.pointerDown(document, { clientX: TOUCH_X_HIGH });
    fireEvent.pointerUp(document, { clientX: TOUCH_X_LOW });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('does not call onPrevious when swiped right but hasPrevious is false', () => {
    renderDefault();
    fireEvent.pointerDown(document, { clientX: TOUCH_X_LOW });
    fireEvent.pointerUp(document, { clientX: TOUCH_X_HIGH });
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it('does not trigger swipe for small movements', () => {
    renderDefault({ hasNext: true });
    fireEvent.pointerDown(document, { clientX: TOUCH_X_MID });
    fireEvent.pointerUp(document, { clientX: TOUCH_BELOW_THRESHOLD_END_X });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('removes event listeners on unmount so keyboard events no longer fire', () => {
    const { unmount } = renderDefault();
    unmount();
    fireEvent.keyDown(document, { key: KeyboardKey.Escape });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('sets body overflow to hidden when rendered and restores on unmount', () => {
    const { unmount } = renderDefault();
    expect(document.body.style.overflow).toBe(OverflowValue.Locked);
    unmount();
    expect(document.body.style.overflow).toBe(OverflowValue.Restored);
  });

  it('only renders the viewed image', () => {
    renderDefault();
    const images = screen.getByRole(AriaRole.Dialog).querySelectorAll(HtmlTag.Img);
    expect(images).toHaveLength(SINGLE_ITEM_COUNT);
    expect(images[FIRST_INDEX]).toHaveAttribute(HtmlAttr.Src, TEST_IMAGE_URL);
  });
});
