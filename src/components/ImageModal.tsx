import { useEffect, useRef, useCallback, type MouseEvent } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';

const SWIPE_THRESHOLD = 50;

type ImageModalProps = {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export function ImageModal({
  isOpen,
  imageUrl,
  altText,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: ImageModalProps) {
  const onCloseRef = useRef(onClose);
  const onPreviousRef = useRef(onPrevious);
  const onNextRef = useRef(onNext);
  const hasPreviousRef = useRef(hasPrevious);
  const hasNextRef = useRef(hasNext);

  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Keep refs updated with latest values
  useEffect(() => {
    onCloseRef.current = onClose;
    onPreviousRef.current = onPrevious;
    onNextRef.current = onNext;
    hasPreviousRef.current = hasPrevious;
    hasNextRef.current = hasNext;
  });

  const handleTouchStart = useCallback((e: TouchEvent): void => {
    const touch = e.touches[0];
    if (touch) {
      touchStartXRef.current = touch.clientX;
      touchEndXRef.current = touch.clientX;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent): void => {
    const touch = e.touches[0];
    if (touch) {
      touchEndXRef.current = touch.clientX;
    }
  }, []);

  const handleTouchEnd = useCallback((): void => {
    const deltaX = touchStartXRef.current - touchEndXRef.current;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX > 0 && hasNextRef.current && onNextRef.current) {
      onNextRef.current();
    } else if (deltaX < 0 && hasPreviousRef.current && onPreviousRef.current) {
      onPreviousRef.current();
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onCloseRef.current();
    } else if (e.key === 'ArrowLeft' && hasPreviousRef.current && onPreviousRef.current) {
      onPreviousRef.current();
    } else if (e.key === 'ArrowRight' && hasNextRef.current && onNextRef.current) {
      onNextRef.current();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const handleOverlayClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleImageClick = useCallback((e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  }, []);

  const handleNavigationClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, callback: () => void) => {
      e.stopPropagation();
      callback();
    },
    [],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image modal"
    >
      <CloseButton
        onClick={onClose}
        aria-label="Close modal"
      >
        ✕
      </CloseButton>
      {hasPrevious && onPrevious && (
        <NavigationButtonLeft
          onClick={(e) => handleNavigationClick(e, onPrevious)}
          aria-label="Previous image"
        >
          ‹
        </NavigationButtonLeft>
      )}
      {hasNext && onNext && (
        <NavigationButtonRight
          onClick={(e) => handleNavigationClick(e, onNext)}
          aria-label="Next image"
        >
          ›
        </NavigationButtonRight>
      )}
      <ModalImage
        src={imageUrl}
        alt={altText}
        onClick={handleImageClick}
      />
    </ModalOverlay>
  );
}
