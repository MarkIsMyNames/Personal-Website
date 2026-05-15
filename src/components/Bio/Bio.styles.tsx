import styled from 'styled-components';
import { gradientTextMixin } from '../../styles/Shared.styles';

export const BioSection = styled.section`
  padding-top: ${({ theme }) => theme.spacing.section};
  padding-bottom: ${({ theme }) => theme.spacing.sectionLarge};
  text-align: ${({ theme }) => theme.cssValues.textAlign.center};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ theme }) => theme.spacing.micro};
    padding-bottom: ${({ theme }) => theme.spacing.twoAndHalf};
  }
`;

export const BioContent = styled.div`
  max-width: ${({ theme }) => theme.sizes.bioContentMaxWidth};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto};
`;

export const ProfileImage = styled.img`
  width: ${({ theme }) => theme.sizes.profileImageDesktop};
  height: ${({ theme }) => theme.sizes.profileImageDesktop};
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  object-fit: ${({ theme }) => theme.cssValues.objectFit.cover};
  border: ${({ theme }) => theme.borders.thickAccent};
  box-shadow: ${({ theme }) => theme.shadows.large};
  margin-bottom: ${({ theme }) => theme.spacing.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ theme }) => theme.sizes.profileImageTablet};
    height: ${({ theme }) => theme.sizes.profileImageTablet};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: ${({ theme }) => theme.sizes.profileImageMobile};
    height: ${({ theme }) => theme.sizes.profileImageMobile};
  }
`;

export const BioTitle = styled.h1`
  font-size: ${({ theme }) => theme.text.fontSize.profileName};
  font-weight: ${({ theme }) => theme.text.fontWeight.bold};
  width: ${({ theme }) => theme.cssValues.width.fitContent};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto}
    ${({ theme }) => theme.spacing.compact};
  background: ${({ theme }) => theme.gradients.accent};
  ${gradientTextMixin}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.pageHeading};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.cardHeading};
  }
`;

export const BioSubtitle = styled.h2`
  font-size: ${({ theme }) => theme.text.fontSize.subheading};
  color: ${({ theme }) => theme.colors.accentHighlight};
  margin-bottom: ${({ theme }) => theme.spacing.comfortable};
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.leadText};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  }
`;

export const BioText = styled.p`
  font-size: ${({ theme }) => theme.text.fontSize.leadText};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.text.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.standard};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodySmall};
    line-height: ${({ theme }) => theme.text.lineHeight.normal};
  }
`;

export const BioEducation = styled.p`
  font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: ${({ theme }) => theme.cssValues.fontStyle.italic};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.caption};
  }
`;
