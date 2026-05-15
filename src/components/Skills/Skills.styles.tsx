import styled from 'styled-components';

export const SkillsSection = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing.sectionLarge};
`;

export const SkillsGrid = styled.div`
  display: ${({ theme }) => theme.cssValues.display.grid};
  grid-template-columns: ${({ theme }) => theme.grid.cols4};
  grid-auto-rows: ${({ theme }) => theme.grid.autoRows1fr};
  gap: ${({ theme }) => theme.spacing.relaxed};
  max-width: ${({ theme }) => theme.sizes.skillsGridMaxWidth};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: ${({ theme }) => theme.grid.cols3};
    gap: ${({ theme }) => theme.spacing.comfortable};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: ${({ theme }) => theme.grid.cols2};
    gap: ${({ theme }) => theme.spacing.standard};
  }
`;

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  border: ${({ theme }) => theme.borders.thin};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  padding: ${({ theme }) => theme.spacing.relaxed} ${({ theme }) => theme.spacing.comfortable};
  display: ${({ theme }) => theme.cssValues.display.flex};
  flex-direction: ${({ theme }) => theme.cssValues.flexDirection.column};
  align-items: ${({ theme }) => theme.cssValues.alignItems.center};
  gap: ${({ theme }) => theme.spacing.standard};
  transition: ${({ theme }) => theme.transitions.hoverAll};
  box-shadow: ${({ theme }) => theme.shadows.small};
  color: ${({ theme }) => theme.colors.textDefault};

  &:hover {
    transform: ${({ theme }) => theme.transforms.liftMedium};
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.comfortable} ${({ theme }) => theme.spacing.standard};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.comfortable} ${({ theme }) => theme.spacing.tight};
    gap: ${({ theme }) => theme.spacing.tight};
  }
`;

export const SkillName = styled.span`
  font-size: ${({ theme }) => theme.text.fontSize.bodyLarge};
  font-weight: ${({ theme }) => theme.text.fontWeight.medium};
  text-align: ${({ theme }) => theme.cssValues.textAlign.center};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodyMedium};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.bodySmall};
  }
`;
