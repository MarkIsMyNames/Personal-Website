import styled from 'styled-components';
import { gradientTextMixin } from '../../styles/Shared.styles';

export const Nav = styled.nav<{ $isVisible: boolean }>`
  position: ${({ theme }) => theme.cssValues.position.fixed};
  top: ${({ theme }) => theme.cssValues.inset.zero};
  width: ${({ theme }) => theme.cssValues.width.full};
  border-bottom: ${({ theme }) => theme.borders.standard};
  padding: ${({ theme }) => theme.spacing.standard} ${({ theme }) => theme.spacing.relaxed};
  z-index: ${({ theme }) => theme.zIndex.nav};
  backdrop-filter: ${({ theme }) => theme.cssValues.backdropFilter.navBlur};
  background: ${({ theme }) => theme.colors.navBackground};
  box-shadow: ${({ theme }) => theme.shadows.small};
  transform: ${({ $isVisible, theme }) =>
    $isVisible ? theme.transforms.navVisible : theme.transforms.navHidden};
  transition: ${({ theme }) => theme.transitions.navSlide};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.standard} ${({ theme }) => theme.spacing.comfortable};
  }
`;

export const NavContainer = styled.div`
  max-width: ${({ theme }) => theme.sizes.navMaxWidth};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto};
  padding: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.spacing.relaxed};
  display: ${({ theme }) => theme.cssValues.display.flex};
  justify-content: ${({ theme }) => theme.cssValues.justifyContent.spaceBetween};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.spacing.standard};
    justify-content: ${({ theme }) => theme.cssValues.justifyContent.center};
  }
`;

export const NavBrandContainer = styled.div`
  display: ${({ theme }) => theme.cssValues.display.flex};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  gap: ${({ theme }) => theme.spacing.tight};
  cursor: ${({ theme }) => theme.cssValues.cursor.pointer};
  transition: ${({ theme }) => theme.transitions.buttonScale};

  &:hover {
    transform: ${({ theme }) => theme.transforms.hoverScale};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${({ theme }) => theme.cssValues.display.none};
  }
`;

export const NavProfileImage = styled.img`
  width: ${({ theme }) => theme.sizes.navProfileImage};
  height: ${({ theme }) => theme.sizes.navProfileImage};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  object-fit: ${({ theme }) => theme.cssValues.objectFit.cover};
  border: ${({ theme }) => theme.borders.standardAccent};
`;

export const NavBrand = styled.div`
  font-size: ${({ theme }) => theme.text.fontSize.cardHeading};
  font-weight: ${({ theme }) => theme.text.fontWeight.bold};
  background: ${({ theme }) => theme.gradients.accent};
  ${gradientTextMixin}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.cardTitle};
  }
`;

export const NavLinks = styled.div`
  display: ${({ theme }) => theme.cssValues.display.flex};
  gap: ${({ theme }) => theme.spacing.navLinkGap};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  padding-right: ${({ theme }) => theme.spacing.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.navLinkGapTablet};
    padding-right: ${({ theme }) => theme.spacing.compact};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.navLinkGapMobile};
    padding-right: ${({ theme }) => theme.cssValues.inset.zero};
  }
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.textDefault};
  text-decoration: ${({ theme }) => theme.cssValues.textDecoration.none};
  font-size: ${({ theme }) => theme.text.fontSize.navLink};
  font-weight: ${({ theme }) => theme.text.fontWeight.semiBold};
  transition: ${({ theme }) => theme.transitions.hoverColor};
  cursor: ${({ theme }) => theme.cssValues.cursor.pointer};
  position: ${({ theme }) => theme.cssValues.position.relative};
  padding: ${({ theme }) => theme.spacing.linkUnderlinePadding}
    ${({ theme }) => theme.cssValues.inset.zero};
  display: ${({ theme }) => theme.cssValues.display.inlineBlock};

  &::after {
    content: ${({ theme }) => theme.cssValues.content.empty};
    position: ${({ theme }) => theme.cssValues.position.absolute};
    bottom: ${({ theme }) => theme.sizes.navLinkUnderlineOffset};
    left: ${({ theme }) => theme.cssValues.inset.zero};
    width: ${({ theme }) => theme.cssValues.width.zero};
    height: ${({ theme }) => theme.sizes.navLinkUnderlineHeight};
    background: ${({ theme }) => theme.gradients.accent};
    transition: ${({ theme }) => theme.transitions.hoverWidth};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accentHighlight};

    &::after {
      width: ${({ theme }) => theme.cssValues.width.full};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodyMedium};
  }
`;
