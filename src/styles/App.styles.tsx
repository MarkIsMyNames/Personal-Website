import styled from 'styled-components';

export const AppContainer = styled.main`
  min-height: ${({ theme }) => theme.sizes.screenHeight};
  max-width: ${({ theme }) => theme.sizes.appMaxWidth};
  margin: ${({ theme }) => theme.cssValues.margin.auto};
  padding: ${({ theme }) => theme.spacing.spacious} ${({ theme }) => theme.spacing.standard}
    ${({ theme }) => theme.spacing.relaxed};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.navOffset} ${({ theme }) => theme.spacing.standard}
      ${({ theme }) => theme.spacing.standard};
  }
`;
