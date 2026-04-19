import styled from 'styled-components';

export const ContactSection = styled.section`
  padding: 4rem 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.sectionBackground};
  border-radius: 16px;
  margin-top: 4rem;
  box-shadow: ${({ theme }) => theme.shadows.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 2.5rem 1rem;
    margin-top: 2rem;
  }
`;

export const ContactLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  list-style: none;
  max-width: 350px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 300px;
  }
`;

export const ContactItem = styled.li`
  width: 100%;
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDefault};
  font-size: 1.125rem;
  transition: all 0.3s ease;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentHighlight};
    background: ${({ theme }) => theme.colors.pageBackground};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.875rem;
  }
`;
