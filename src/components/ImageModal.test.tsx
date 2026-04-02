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
  const testImageUrl = 'test-image.jpg';
  const testAltText = 'Test Image';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    renderWithTheme(
      <ImageModal
        isOpen={false}
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    expect(screen.queryByAltText(testAltText)).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    expect(screen.getByAltText(testAltText)).toBeInTheDocument();
  });

  it('displays the correct image', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    const image = screen.getByAltText(testAltText);
    expect(image).toHaveAttribute('src', testImageUrl);
  });

  it('calls onClose when close button is clicked', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    // Use getByLabelText as it's more specific than getByRole('button') when multiple buttons exist
    const closeButton = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders close button', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    expect(screen.getByLabelText(/Close modal/i)).toBeInTheDocument();
  });

  it('calls onClose when Escape key is pressed', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when image is clicked', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    const image = screen.getByAltText(testAltText);
    fireEvent.click(image);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders navigation buttons when hasPrevious and hasNext are true', () => {
    const mockOnPrevious = vi.fn();
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
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
    const mockOnPrevious = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        hasPrevious
      />,
    );
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when right arrow key is pressed', () => {
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onNext={mockOnNext}
        hasNext
      />,
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('does not call onPrevious when hasPrevious is false', () => {
    const mockOnPrevious = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        hasPrevious={false}
      />,
    );
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(mockOnPrevious).not.toHaveBeenCalled();
  });

  it('does not call onNext when hasNext is false', () => {
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onNext={mockOnNext}
        hasNext={false}
      />,
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('calls navigation callbacks when navigation buttons are clicked', () => {
    const mockOnPrevious = vi.fn();
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        hasPrevious
        hasNext
      />,
    );
    const previousButton = screen.getByLabelText(/Previous image/i);
    const nextButton = screen.getByLabelText(/Next image/i);

    fireEvent.click(previousButton);
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);

    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when swiped left', () => {
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onNext={mockOnNext}
        hasNext
      />,
    );

    fireEvent.touchStart(document, {
      touches: [{ clientX: 300, clientY: 200 }],
    });
    fireEvent.touchMove(document, {
      touches: [{ clientX: 100, clientY: 200 }],
    });
    fireEvent.touchEnd(document);

    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevious when swiped right', () => {
    const mockOnPrevious = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onPrevious={mockOnPrevious}
        hasPrevious
      />,
    );

    fireEvent.touchStart(document, {
      touches: [{ clientX: 100, clientY: 200 }],
    });
    fireEvent.touchMove(document, {
      touches: [{ clientX: 300, clientY: 200 }],
    });
    fireEvent.touchEnd(document);

    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  it('does not trigger swipe for small movements', () => {
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onNext={mockOnNext}
        hasNext
      />,
    );

    fireEvent.touchStart(document, {
      touches: [{ clientX: 200, clientY: 200 }],
    });
    fireEvent.touchMove(document, {
      touches: [{ clientX: 180, clientY: 200 }],
    });
    fireEvent.touchEnd(document);

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('does not trigger swipe for vertical movements', () => {
    const mockOnNext = vi.fn();
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
        onNext={mockOnNext}
        hasNext
      />,
    );

    fireEvent.touchStart(document, {
      touches: [{ clientX: 200, clientY: 100 }],
    });
    fireEvent.touchMove(document, {
      touches: [{ clientX: 190, clientY: 400 }],
    });
    fireEvent.touchEnd(document);

    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('sets body overflow to hidden when opened', () => {
    renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', () => {
    const { unmount } = renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('only renders the viewed image', () => {
    const { container } = renderWithTheme(
      <ImageModal
        isOpen
        imageUrl={testImageUrl}
        altText={testAltText}
        onClose={mockOnClose}
      />,
    );
    const imgs = container.querySelectorAll('[role="dialog"] img');
    expect(imgs).toHaveLength(1);
    expect(imgs[0]).toHaveAttribute('src', testImageUrl);
  });
});
