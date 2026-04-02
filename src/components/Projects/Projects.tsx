import { useState } from 'react';
import { KeyboardKey, type Project } from '../../types';
import { ImageModal } from '../ImageModal/ImageModal';
import { SectionTitle } from '../../styles/Shared.styles';
import {
  ProjectsSection,
  ProjectsContainer,
  ProjectCard,
  ProjectImages,
  ProjectImage,
  ProjectContent,
  ProjectTitle,
  ProjectRole,
  ProjectDescription,
  ProjectHighlights,
  HighlightItem,
  ProjectTags,
  ProjectTag,
} from './Projects.styles';

type ProjectsProps = {
  projects: Project[];
};

type ModalState = {
  images: string[];
  index: number;
};

export function Projects({ projects }: ProjectsProps) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (images: string[], index: number) => setModal({ images, index });
  const closeModal = () => setModal(null);
  const prevImage = () => setModal((m) => (m && m.index > 0 ? { ...m, index: m.index - 1 } : m));
  const nextImage = () =>
    setModal((m) => (m && m.index < m.images.length - 1 ? { ...m, index: m.index + 1 } : m));

  return (
    <ProjectsSection aria-label="Projects and Experience section">
      <SectionTitle>Projects & Experience</SectionTitle>
      <ProjectsContainer
        role="list"
        aria-label="List of projects"
      >
        {projects.map((project) => {
          const isSingleImage = project.images.length === 1;
          return (
            <ProjectCard
              key={project.title}
              role="listitem"
              aria-label={`${project.title} project`}
            >
              <ProjectImages $isSingle={isSingleImage}>
                {project.images.map((image, index) => (
                  <ProjectImage
                    key={image}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1} of ${project.images.length}`}
                    height={300}
                    $isSingle={isSingleImage}
                    onClick={() => openModal(project.images, index)}
                    role="button"
                    aria-label={`View full size image ${index + 1} of ${project.title}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === KeyboardKey.Enter || e.key === KeyboardKey.Space) {
                        e.preventDefault();
                        openModal(project.images, index);
                      }
                    }}
                  />
                ))}
              </ProjectImages>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectRole>{project.role}</ProjectRole>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectHighlights>
                  {project.highlights.map((highlight) => (
                    <HighlightItem key={highlight}>{highlight}</HighlightItem>
                  ))}
                </ProjectHighlights>
                <ProjectTags>
                  {project.tags.map((tag) => (
                    <ProjectTag key={tag}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          );
        })}
      </ProjectsContainer>
      {modal !== null && (
        <ImageModal
          imageUrl={modal.images[modal.index] ?? ''}
          altText={`Image ${modal.index + 1}`}
          onClose={closeModal}
          onPrevious={prevImage}
          onNext={nextImage}
          hasPrevious={modal.index > 0}
          hasNext={modal.index < modal.images.length - 1}
        />
      )}
    </ProjectsSection>
  );
}
