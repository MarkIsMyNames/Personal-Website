import { useEffect, useRef } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';
import { AriaRole, DomEvent, KeyboardKey, OverflowValue } from '../../types';
import { useTranslation } from 'react-i18next';
import {
  SWIPE_THRESHOLD_PX,
  FIRST_INDEX,
  NO_MOVEMENT,
  CLOSE_SYMBOL,
  PREV_SYMBOL,
  NEXT_SYMBOL,
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

    document.addEventListener(DomEvent.KeyDown, handleKeyDown);
    document.addEventListener(DomEvent.TouchStart, handleTouchStart, { passive: true });
    document.addEventListener(DomEvent.TouchEnd, handleTouchEnd);
    document.body.style.overflow = OverflowValue.Locked;

    return () => {
      document.removeEventListener(DomEvent.KeyDown, handleKeyDown);
      document.removeEventListener(DomEvent.TouchStart, handleTouchStart);
      document.removeEventListener(DomEvent.TouchEnd, handleTouchEnd);
      document.body.style.overflow = OverflowValue.Restored;
    };
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <ModalOverlay
      onClick={onClose}
      role={AriaRole.Dialog}
      aria-modal
      aria-label={t('imageModal.ariaLabels.modal')}
    >
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={t('imageModal.ariaLabels.close')}
      >
        {CLOSE_SYMBOL}
      </CloseButton>
      {hasPrevious && (
        <NavigationButtonLeft
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label={t('imageModal.ariaLabels.previous')}
        >
          {PREV_SYMBOL}
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
          {NEXT_SYMBOL}
        </NavigationButtonRight>
      )}
      <ModalImage
        src={imageUrl}
        alt={altText}
      />
    </ModalOverlay>
  );
}
