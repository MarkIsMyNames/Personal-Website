import styled from 'styled-components';

export const ProjectsSection = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing.relaxed};
`;

export const ProjectsContainer = styled.div`
  display: ${({ theme }) => theme.cssValues.display.flex};
  flex-direction: ${({ theme }) => theme.cssValues.flexDirection.column};
  gap: ${({ theme }) => theme.spacing.spacious};
`;

export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.sectionBackground};
  border: ${({ theme }) => theme.borders.thin};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

export const ProjectImages = styled.div<{ $isSingle: boolean }>`
  display: ${({ theme }) => theme.cssValues.display.flex};
  justify-content: ${({ theme }) => theme.cssValues.justifyContent.center};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  gap: ${({ theme }) => theme.spacing.standard};
  padding: ${({ $isSingle, theme }) =>
    $isSingle ? `${theme.spacing.spacious} ${theme.spacing.relaxed}` : theme.spacing.relaxed};
  background: ${({ theme }) => theme.colors.cardBackground};
  overflow-x: ${({ theme }) => theme.cssValues.overflow.auto};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: ${({ theme }) => theme.cssValues.justifyContent.flexStart};
    padding: ${({ theme }) => theme.spacing.comfortable} ${({ theme }) => theme.spacing.standard};
    scroll-snap-type: ${({ theme }) => theme.cssValues.scrollSnap.xMandatory};
    -webkit-overflow-scrolling: ${({ theme }) => theme.cssValues.overflowScrolling.touch};
    scrollbar-width: ${({ theme }) => theme.cssValues.scrollbarWidth.none};

    &::-webkit-scrollbar {
      display: ${({ theme }) => theme.cssValues.display.none};
    }
  }
`;

export const ProjectImage = styled.img<{ $isSingle: boolean }>`
  max-width: ${({ $isSingle, theme }) =>
    $isSingle ? theme.cssValues.width.full : theme.sizes.projectImageMultiMax};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  object-fit: ${({ theme }) => theme.cssValues.objectFit.contain};
  cursor: ${({ theme }) => theme.cssValues.cursor.pointer};
  -webkit-tap-highlight-color: ${({ theme }) => theme.cssValues.color.transparent};
  user-select: ${({ theme }) => theme.cssValues.userSelect.none};
  transition:
    ${({ theme }) => theme.transitions.hoverTransform},
    ${({ theme }) => theme.transitions.hoverOpacity};

  @media (hover: hover) {
    &:hover {
      transform: ${({ theme }) => theme.transforms.hoverScale};
      opacity: ${({ theme }) => theme.cssValues.opacity.imageHover};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: ${({ theme }) => theme.sizes.projectImageTabletMax};
    max-height: ${({ theme }) => theme.sizes.projectImageTabletHeight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: ${({ theme }) => theme.sizes.projectImageMobileMax};
    max-height: ${({ theme }) => theme.sizes.projectImageMobileHeight};
  }
`;

export const ProjectContent = styled.div`
  padding: ${({ theme }) => theme.spacing.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.comfortable};
  }
`;

export const ProjectTitle = styled.h3`
  font-size: ${({ theme }) => theme.text.fontSize.pageHeading};
  font-weight: ${({ theme }) => theme.text.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.compact};
  color: ${({ theme }) => theme.colors.accentHighlight};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.subheading};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.cardTitle};
  }
`;

export const ProjectRole = styled.p`
  font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.standard};
  font-style: ${({ theme }) => theme.cssValues.fontStyle.italic};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodyMedium};
  }
`;

export const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  line-height: ${({ theme }) => theme.text.lineHeight.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.comfortable};
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodySmall};
    line-height: ${({ theme }) => theme.text.lineHeight.normal};
  }
`;

export const ProjectHighlights = styled.ul`
  list-style: ${({ theme }) => theme.cssValues.listStyle.none};
  margin-bottom: ${({ theme }) => theme.spacing.comfortable};
`;

export const HighlightItem = styled.li`
  display: ${({ theme }) => theme.cssValues.display.flex};
  margin-bottom: ${({ theme }) => theme.spacing.tight};
  line-height: ${({ theme }) => theme.text.lineHeight.tight};
  color: ${({ theme }) => theme.colors.textDefault};

  &::before {
    content: ${({ theme }) => theme.cssValues.content.bullet};
    margin-right: ${({ theme }) => theme.spacing.compact};
    margin-top: ${({ theme }) => theme.spacing.negativeListMarkerOffset};
    color: ${({ theme }) => theme.colors.accentHighlight};
    font-size: ${({ theme }) => theme.text.fontSize.leadText};
    line-height: ${({ theme }) => theme.text.lineHeight.tight};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodySmall};
  }
`;

export const ProjectTags = styled.div`
  display: ${({ theme }) => theme.cssValues.display.flex};
  flex-wrap: ${({ theme }) => theme.cssValues.flexWrap.wrap};
  gap: ${({ theme }) => theme.spacing.tight};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing.compact};
  }
`;

export const ProjectTag = styled.span`
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.accentHighlight};
  padding: ${({ theme }) => theme.spacing.compact} ${({ theme }) => theme.spacing.standard};
  border-radius: ${({ theme }) => theme.borderRadius.pill};
  font-size: ${({ theme }) => theme.text.fontSize.caption};
  border: ${({ theme }) => theme.borders.thin};
  transition: ${({ theme }) => theme.transitions.hoverAll};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    background: ${({ theme }) => theme.colors.pageBackground};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.tag};
    padding: ${({ theme }) => theme.spacing.micro} ${({ theme }) => theme.spacing.tight};
  }
`;
