import { css, default as styled } from 'styled-components';

export const gradientTextMixin = css`
  -webkit-background-clip: ${({ theme }) => theme.cssValues.backgroundClip.text};
  -webkit-text-fill-color: ${({ theme }) => theme.cssValues.color.transparent};
  background-clip: ${({ theme }) => theme.cssValues.backgroundClip.text};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.text.fontSize.sectionTitle};
  font-weight: ${({ theme }) => theme.text.fontWeight.bold};
  text-align: ${({ theme }) => theme.cssValues.textAlign.center};
  width: ${({ theme }) => theme.cssValues.width.fitContent};
  margin: ${({ theme }) => theme.cssValues.inset.zero} ${({ theme }) => theme.cssValues.margin.auto}
    ${({ theme }) => theme.spacing.relaxed};
  background: ${({ theme }) => theme.gradients.accent};
  ${gradientTextMixin}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.text.fontSize.pageHeading};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.text.fontSize.cardHeading};
    margin-bottom: ${({ theme }) => theme.spacing.comfortable};
  }
`;
