import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { ImageModal } from './ImageModal';
import { theme } from '../styles/theme';

const renderWithTheme = (component: React.ReactElement): ReturnType<typeof render> => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ImageModal Component', () => {
  const mockOnClose = vi.fn();
  const testImageUrl = 'test-image.jpg';
  const testAltText = 'Test Image';

  beforeEach(() => {
    mockOnClose.mockClear();
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
    const closeButton = screen.getByRole('button');
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
    expect(screen.getByRole('button')).toBeInTheDocument();
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
    const overlay = screen.getByAltText(testAltText).parentElement;
    fireEvent.click(overlay as Element);
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
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // close + previous + next
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
    const buttons = screen.getAllByRole('button');
    // buttons[0] is close, buttons[1] is previous, buttons[2] is next
    const previousButton = buttons[1];
    const nextButton = buttons[2];
    if (previousButton && nextButton) {
      fireEvent.click(previousButton);
      expect(mockOnPrevious).toHaveBeenCalledTimes(1);
      fireEvent.click(nextButton);
      expect(mockOnNext).toHaveBeenCalledTimes(1);
    }
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
});
