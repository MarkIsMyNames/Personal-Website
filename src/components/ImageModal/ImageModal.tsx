import { useEffect, useRef } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';
import { KeyboardKey } from '../../types';
import { useTranslation } from 'react-i18next';

const SWIPE_THRESHOLD = 50;

type ImageModalProps = {
  imageUrl: string;
  altText: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

export function ImageModal({
  imageUrl,
  altText,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ImageModalProps) {
  const { t } = useTranslation();
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === KeyboardKey.Escape) {
        onClose();
      } else if (e.key === KeyboardKey.ArrowLeft && hasPrevious) {
        onPrevious();
      } else if (e.key === KeyboardKey.ArrowRight && hasNext) {
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

      if (deltaX > 0 && hasNext) {
        onNext();
      } else if (deltaX < 0 && hasPrevious) {
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
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <ModalOverlay
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('imageModal.ariaLabels.modal')}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t('imageModal.ariaLabels.close')}
      >
        ✕
      </CloseButton>
      {hasPrevious && (
        <NavigationButtonLeft
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label={t('imageModal.ariaLabels.previous')}
        >
          ‹
        </NavigationButtonLeft>
      )}
      {hasNext && (
        <NavigationButtonRight
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label={t('imageModal.ariaLabels.next')}
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
