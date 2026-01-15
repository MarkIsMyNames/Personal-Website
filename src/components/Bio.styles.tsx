import styled from 'styled-components';

export const BioSection = styled.section`
  padding-top: 4rem;
  padding-bottom: 3.5rem;
  text-align: center;
`;

export const BioContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.accentPrimary};
  box-shadow: ${({ theme }) => theme.shadows.large};
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

export const BioTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: ${({ theme }) => theme.gradients.accent};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const BioSubtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accentPrimary};
  margin-bottom: 1.5rem;
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

export const BioText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 1rem;
`;

export const BioEducation = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
`;
