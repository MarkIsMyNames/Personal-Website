import React, { useState } from 'react';
import type { Project } from '../types';
import { ImageModal } from './ImageModal';
import {
  ProjectsSection,
  SectionTitle,
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

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: '', alt: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectImages, setCurrentProjectImages] = useState<string[]>([]);

  const handleImageClick = (
    imageUrl: string,
    altText: string,
    projectTitle: string,
    imageIndex: number,
    allImages: string[],
  ): void => {
    // Don't open modal for Intercom images
    if (projectTitle === 'Intercom') {
      return;
    }
    setSelectedImage({ url: imageUrl, alt: altText });
    setCurrentImageIndex(imageIndex);
    setCurrentProjectImages(allImages);
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  const handlePreviousImage = (): void => {
    if (currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      const newUrl = currentProjectImages[newIndex];
      if (newUrl !== undefined) {
        setCurrentImageIndex(newIndex);
        setSelectedImage({
          url: newUrl,
          alt: `Image ${newIndex + 1}`,
        });
      }
    }
  };

  const handleNextImage = (): void => {
    if (currentImageIndex < currentProjectImages.length - 1) {
      const newIndex = currentImageIndex + 1;
      const newUrl = currentProjectImages[newIndex];
      if (newUrl !== undefined) {
        setCurrentImageIndex(newIndex);
        setSelectedImage({
          url: newUrl,
          alt: `Image ${newIndex + 1}`,
        });
      }
    }
  };

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
              key={project.id}
              role="listitem"
              aria-label={`${project.title} project`}
            >
              <ProjectImages $isSingle={isSingleImage}>
                {project.images.map((image, index) => (
                  <ProjectImage
                    key={index}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1} of ${project.images.length}`}
                    $isSingle={isSingleImage}
                    $isClickable={project.title !== 'Intercom'}
                    onClick={() =>
                      handleImageClick(
                        image,
                        `${project.title} ${index + 1}`,
                        project.title,
                        index,
                        project.images,
                      )
                    }
                    role={project.title !== 'Intercom' ? 'button' : undefined}
                    aria-label={
                      project.title !== 'Intercom'
                        ? `View full size image ${index + 1} of ${project.title}`
                        : undefined
                    }
                    tabIndex={project.title !== 'Intercom' ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (project.title !== 'Intercom' && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleImageClick(
                          image,
                          `${project.title} ${index + 1}`,
                          project.title,
                          index,
                          project.images,
                        );
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
                    <HighlightItem key={highlight.id}>{highlight.text}</HighlightItem>
                  ))}
                </ProjectHighlights>
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          );
        })}
      </ProjectsContainer>
      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage.url}
        altText={selectedImage.alt}
        onClose={handleCloseModal}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        hasPrevious={currentImageIndex > 0}
        hasNext={currentImageIndex < currentProjectImages.length - 1}
      />
    </ProjectsSection>
  );
};
