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
import {
  SWIPE_THRESHOLD_PX,
  OVERFLOW_LOCKED,
  OVERFLOW_RESTORED,
  FIRST_INDEX,
  NO_MOVEMENT,
} from '../../config';

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
  const touchStartXRef = useRef(FIRST_INDEX);

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
      const touch = e.touches[FIRST_INDEX];
      if (touch) {
        touchStartXRef.current = touch.clientX;
      }
    };

    const handleTouchEnd = (e: TouchEvent): void => {
      const touch = e.changedTouches[FIRST_INDEX];
      if (!touch) {
        return;
      }
      const deltaX = touchStartXRef.current - touch.clientX;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
        return;
      }
      if (deltaX > NO_MOVEMENT && hasNext) {
        onNext();
      } else if (deltaX < NO_MOVEMENT && hasPrevious) {
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.body.style.overflow = OVERFLOW_LOCKED;

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = OVERFLOW_RESTORED;
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
