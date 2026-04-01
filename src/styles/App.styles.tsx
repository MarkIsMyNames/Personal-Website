import styled from 'styled-components';

export const AppContainer = styled.main`
  min-height: 100vh;
  max-width: 1240px;
  margin: auto;
  padding: 3rem 1rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 5rem 1rem 1rem;
  }
`;
