import styled from 'styled-components';

export const ProjectsSection = styled.section`
  padding-bottom: 2rem;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

export const ProjectImages = styled.div<{ $isSingle?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: ${({ $isSingle }) => ($isSingle ? '3rem 2rem' : '2rem')};
  background: ${({ theme }) => theme.colors.bgCard};
  overflow-x: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
    padding: 1.5rem 1rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ProjectImage = styled.img<{ $isSingle?: boolean }>`
  max-height: 300px;
  max-width: ${({ $isSingle }) => ($isSingle ? '100%' : '400px')};
  border-radius: 8px;
  object-fit: contain;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 80vw;
    max-height: 250px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 85vw;
    max-height: 200px;
  }
`;

export const ProjectContent = styled.div`
  padding: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.25rem;
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.accentPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.35rem;
  }
`;

export const ProjectRole = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const ProjectDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.7;
  }
`;

export const ProjectHighlights = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

export const HighlightItem = styled.li`
  display: flex;
  margin-bottom: 0.75rem;
  line-height: 1.6;

  &::before {
    content: '▹';
    margin-right: 0.5rem;
    margin-top: -0.35rem;
    color: ${({ theme }) => theme.colors.accentPrimary};
    font-size: 1.25rem;
    line-height: 1.6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.5rem;
  }
`;

export const ProjectTag = styled.span`
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.accentPrimary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
    background: ${({ theme }) => theme.colors.bgPrimary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 0.375rem 0.75rem;
  }
`;
