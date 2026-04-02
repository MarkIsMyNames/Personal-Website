import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { ImageModal } from './ImageModal';
import { theme } from '../styles/theme';
import type React from 'react';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ImageModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnPrevious = vi.fn();
  const mockOnNext = vi.fn();
  const testImageUrl = 'test-image.jpg';
  const testAltText = 'Test Image';

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

  it('displays the correct image', () => {
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
    expect(screen.getByAltText(testAltText)).toHaveAttribute('src', testImageUrl);
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
    fireEvent.click(screen.getByLabelText(/Close modal/i));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders close button', () => {
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
    expect(screen.getByLabelText(/Close modal/i)).toBeInTheDocument();
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
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
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
    fireEvent.click(screen.getByRole('dialog'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
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
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders navigation buttons when hasPrevious and hasNext are true', () => {
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
    expect(screen.getByLabelText(/Previous image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Next image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Close modal/i)).toBeInTheDocument();
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
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
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
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockOnNext).toHaveBeenCalledTimes(1);
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
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
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
    fireEvent.keyDown(document, { key: 'ArrowRight' });
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
    fireEvent.click(screen.getByLabelText(/Previous image/i));
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByLabelText(/Next image/i));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
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
    fireEvent.touchStart(document, { touches: [{ clientX: 300, clientY: 200 }] });
    fireEvent.touchMove(document, { touches: [{ clientX: 100, clientY: 200 }] });
    fireEvent.touchEnd(document);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
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
    fireEvent.touchStart(document, { touches: [{ clientX: 100, clientY: 200 }] });
    fireEvent.touchMove(document, { touches: [{ clientX: 300, clientY: 200 }] });
    fireEvent.touchEnd(document);
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
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
    fireEvent.touchStart(document, { touches: [{ clientX: 200, clientY: 200 }] });
    fireEvent.touchMove(document, { touches: [{ clientX: 180, clientY: 200 }] });
    fireEvent.touchEnd(document);
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
    fireEvent.touchStart(document, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchMove(document, { touches: [{ clientX: 190, clientY: 400 }] });
    fireEvent.touchEnd(document);
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
    expect(document.body.style.overflow).toBe('hidden');
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
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('only renders the viewed image', () => {
    const { container } = renderWithTheme(
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
    const imgs = container.querySelectorAll('[role="dialog"] img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toHaveAttribute('src', testImageUrl);
  });
});
