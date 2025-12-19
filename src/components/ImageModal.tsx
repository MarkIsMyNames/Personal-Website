import React, { useEffect, useRef, useCallback } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';

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

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  altText,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const onCloseRef = useRef(onClose);
  const onPreviousRef = useRef(onPrevious);
  const onNextRef = useRef(onNext);
  const hasPreviousRef = useRef(hasPrevious);
  const hasNextRef = useRef(hasNext);

  // Keep refs updated with latest values
  useEffect(() => {
    onCloseRef.current = onClose;
    onPreviousRef.current = onPrevious;
    onNextRef.current = onNext;
    hasPreviousRef.current = hasPrevious;
    hasNextRef.current = hasNext;
  });

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
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    e.stopPropagation();
  };

  const handleNavigationClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    callback: () => void,
  ): void => {
    e.stopPropagation();
    callback();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image modal"
    >
      <CloseButton onClick={onClose} aria-label="Close modal">
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
      <ModalImage src={imageUrl} alt={altText} onClick={handleImageClick} />
    </ModalOverlay>
  );
};
