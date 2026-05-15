import styled from 'styled-components';

export const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.standard};
  text-align: ${({ theme }) => theme.cssValues.textAlign.center};
  background: ${({ theme }) => theme.colors.sectionBackground};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  margin-top: ${({ theme }) => theme.spacing.section};
  box-shadow: ${({ theme }) => theme.shadows.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.twoAndHalf} ${({ theme }) => theme.spacing.standard};
    margin-top: ${({ theme }) => theme.spacing.relaxed};
  }
`;

export const ContactLinks = styled.ul`
  display: ${({ theme }) => theme.cssValues.display.flex};
  flex-direction: ${({ theme }) => theme.cssValues.flexDirection.column};
  gap: ${({ theme }) => theme.spacing.comfortable};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  list-style: ${({ theme }) => theme.cssValues.listStyle.none};
  max-width: ${({ theme }) => theme.sizes.contactLinksMaxWidth};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: ${({ theme }) => theme.sizes.contactLinksMobileMaxWidth};
  }
`;

export const ContactItem = styled.li`
  width: ${({ theme }) => theme.cssValues.width.full};
`;

export const ContactLink = styled.a`
  display: ${({ theme }) => theme.cssValues.display.flex};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  gap: ${({ theme }) => theme.spacing.standard};
  padding: ${({ theme }) => theme.spacing.standard} ${({ theme }) => theme.spacing.relaxed};
  background: ${({ theme }) => theme.colors.cardBackground};
  border: ${({ theme }) => theme.borders.thin};
  border-radius: ${({ theme }) => theme.borderRadius.contactLink};
  text-decoration: ${({ theme }) => theme.cssValues.textDecoration.none};
  color: ${({ theme }) => theme.colors.textDefault};
  font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  transition: ${({ theme }) => theme.transitions.hoverAll};
  justify-content: ${({ theme }) => theme.cssValues.justifyContent.center};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    background: ${({ theme }) => theme.colors.pageBackground};
    transform: ${({ theme }) => theme.transforms.liftSmall};
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodyMedium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.caption};
  }
`;
