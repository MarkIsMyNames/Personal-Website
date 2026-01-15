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
    flex-direction: column;
  }
`;

export const ProjectImage = styled.img<{ $isSingle?: boolean; $isClickable?: boolean }>`
  max-height: 300px;
  max-width: ${({ $isSingle }) => ($isSingle ? '100%' : '400px')};
  border-radius: 8px;
  object-fit: contain;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    transform: ${({ $isClickable }) => ($isClickable ? 'scale(1.02)' : 'none')};
    opacity: ${({ $isClickable }) => ($isClickable ? '0.9' : '1')};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`;

export const ProjectContent = styled.div`
  padding: 2rem;
`;

export const ProjectTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.accentPrimary};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
`;

export const ProjectRole = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-style: italic;
`;

export const ProjectDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProjectHighlights = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

export const HighlightItem = styled.li`
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  position: relative;
  line-height: 1.6;

  &::before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.accentPrimary};
    font-size: 1.25rem;
  }
`;

export const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
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
`;
