import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: ${({ theme }) => theme.cssValues.position.fixed};
  top: ${({ theme }) => theme.cssValues.inset.zero};
  left: ${({ theme }) => theme.cssValues.inset.zero};
  right: ${({ theme }) => theme.cssValues.inset.zero};
  bottom: ${({ theme }) => theme.cssValues.inset.zero};
  background: ${({ theme }) => theme.colors.modalOverlay};
  display: ${({ theme }) => theme.cssValues.display.flex};
  justify-content: ${({ theme }) => theme.cssValues.justifyContent.center};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  touch-action: ${({ theme }) => theme.cssValues.touchAction.none};
`;

export const ModalImage = styled.img`
  width: ${({ theme }) => theme.sizes.modalImageWidth};
  height: ${({ theme }) => theme.sizes.modalImageHeight};
  object-fit: ${({ theme }) => theme.cssValues.objectFit.contain};
  animation: ${({ theme }) => theme.animations.zoomIn};

  @keyframes zoomIn {
    from {
      transform: scale(${({ theme }) => theme.animations.scaleFrom});
      opacity: ${({ theme }) => theme.cssValues.opacity.zero};
    }
    to {
      transform: ${({ theme }) => theme.transforms.scaleIdentity};
      opacity: ${({ theme }) => theme.cssValues.opacity.full};
    }
  }
`;

export const CloseButton = styled.button`
  position: ${({ theme }) => theme.cssValues.position.absolute};
  top: ${({ theme }) => theme.spacing.relaxed};
  right: ${({ theme }) => theme.spacing.relaxed};
  background: ${({ theme }) => theme.colors.cardBackground};
  border: ${({ theme }) => theme.borders.standard};
  color: ${({ theme }) => theme.colors.textDefault};
  width: ${({ theme }) => theme.sizes.closeButton};
  height: ${({ theme }) => theme.sizes.closeButton};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  font-size: ${({ theme }) => theme.text.fontSize.subheading};
  cursor: ${({ theme }) => theme.cssValues.cursor.pointer};
  z-index: ${({ theme }) => theme.zIndex.modalContent};
  transition: ${({ theme }) => theme.transitions.hoverAll};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHighlight};
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    transform: ${({ theme }) => theme.transforms.rotateClose};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.spacing.standard};
    right: ${({ theme }) => theme.spacing.standard};
    width: ${({ theme }) => theme.sizes.closeButtonMobile};
    height: ${({ theme }) => theme.sizes.closeButtonMobile};
    font-size: ${({ theme }) => theme.text.fontSize.leadText};
  }
`;

export const NavigationButton = styled.button`
  position: ${({ theme }) => theme.cssValues.position.absolute};
  top: ${({ theme }) => theme.cssValues.inset.half};
  transform: ${({ theme }) => theme.transforms.centerVertical};
  background: ${({ theme }) => theme.colors.cardBackground};
  border: ${({ theme }) => theme.borders.standard};
  color: ${({ theme }) => theme.colors.textDefault};
  width: ${({ theme }) => theme.sizes.navButton};
  height: ${({ theme }) => theme.sizes.navButton};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  font-size: ${({ theme }) => theme.text.fontSize.sectionTitle};
  cursor: ${({ theme }) => theme.cssValues.cursor.pointer};
  transition: ${({ theme }) => theme.transitions.hoverAll};
  padding-bottom: ${({ theme }) => theme.spacing.micro};
  font-family: ${({ theme }) => theme.fonts.fallback};
  font-weight: ${({ theme }) => theme.text.fontWeight.light};
  z-index: ${({ theme }) => theme.zIndex.modalContent};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHighlight};
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    transform: ${({ theme }) => theme.transforms.centerVerticalScaleUp};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${({ theme }) => theme.sizes.navButtonMobile};
    height: ${({ theme }) => theme.sizes.navButtonMobile};
    font-size: ${({ theme }) => theme.text.fontSize.pageHeading};
    padding-bottom: ${({ theme }) => theme.spacing.linkUnderlinePadding};
  }
`;

export const NavigationButtonLeft = styled(NavigationButton)`
  left: ${({ theme }) => theme.spacing.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.spacing.standard};
  }
`;

export const NavigationButtonRight = styled(NavigationButton)`
  right: ${({ theme }) => theme.spacing.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing.standard};
  }
`;
