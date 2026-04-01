import { useEffect, useRef, type MouseEvent } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';
import { KeyboardKey } from '../types';

const SWIPE_THRESHOLD = 50;

type ImageModalProps = {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  loadedIndices: Set<number>;
  altText: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export function ImageModal({
  isOpen,
  images,
  currentIndex,
  loadedIndices,
  altText,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: ImageModalProps) {
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === KeyboardKey.Escape) {
        onClose();
      } else if (e.key === KeyboardKey.ArrowLeft && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === KeyboardKey.ArrowRight && hasNext && onNext) {
        onNext();
      }
    };

    const handleTouchStart = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        touchStartXRef.current = touch.clientX;
        touchEndXRef.current = touch.clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent): void => {
      const touch = e.touches[0];
      if (touch) {
        touchEndXRef.current = touch.clientX;
      }
    };

    const handleTouchEnd = (): void => {
      const deltaX = touchStartXRef.current - touchEndXRef.current;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
        return;
      }

      if (deltaX > 0 && hasNext && onNext) {
        onNext();
      } else if (deltaX < 0 && hasPrevious && onPrevious) {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
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
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="Previous image"
        >
          ‹
        </NavigationButtonLeft>
      )}
      {hasNext && onNext && (
        <NavigationButtonRight
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          ›
        </NavigationButtonRight>
      )}
      <ModalImage
        src={imageUrl}
        alt={altText}
      />
    </ModalOverlay>
  );
}
