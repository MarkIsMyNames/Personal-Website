import styled from 'styled-components';

export const ContactSection = styled.section`
  padding: 4rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 16px;
  margin-top: 4rem;
  box-shadow: ${({ theme }) => theme.shadows.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2.5rem 1rem;
    margin-top: 2rem;
  }
`;

export const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.125rem;
  transition: all 0.3s ease;
  min-width: 300px;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    background: ${({ theme }) => theme.colors.bgPrimary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 250px;
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 200px;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
`;
