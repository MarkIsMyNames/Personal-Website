import styled from 'styled-components';

export const SectionTitle = styled.h2<{ $compact?: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin: ${({ $compact }) => ($compact ? '0 0 1.5rem' : '4rem 0 3rem')};
  background: ${({ theme }) => theme.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
    margin: ${({ $compact }) => ($compact ? '0 0 1rem' : '2.5rem 0 2rem')};
  }
`;
