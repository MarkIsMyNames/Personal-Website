import styled from 'styled-components';

export const SkillsSection = styled.section`
  padding-bottom: 3.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export const SkillCard = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    box-shadow: ${({ theme }) => theme.shadows.large};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 1rem;
  }
`;

export const SkillName = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;
