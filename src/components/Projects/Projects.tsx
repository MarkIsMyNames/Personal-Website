import { useState } from 'react';
import { AriaRole, KeyboardKey, ErrorMessage, type Project } from '../../types';
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
import { useTranslation } from 'react-i18next';
import {
  PROJECT_IMAGE_HEIGHT,
  FOCUSABLE_TAB_INDEX,
  DISPLAY_INDEX_OFFSET,
  FIRST_INDEX,
  SINGLE_ITEM_COUNT,
  EMPTY_LENGTH,
} from '../../config';

type ProjectsProps = {
  projects: Project[];
};

type ModalState = {
  images: string[];
  index: number;
};

export function getModalImageUrl(modal: ModalState): string {
  const imageUrl = modal.images[modal.index];
  if (!imageUrl) {
    throw new Error(ErrorMessage.NoImageAtIndex);
  }
  return imageUrl;
}

export function Projects({ projects }: ProjectsProps) {
  const { t } = useTranslation();
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (images: string[], index: number) => setModal({ images, index });
  const closeModal = () => setModal(null);
  const prevImage = () =>
    setModal((m) =>
      m && m.index > FIRST_INDEX ? { ...m, index: m.index - DISPLAY_INDEX_OFFSET } : m,
    );
  const nextImage = () =>
    setModal((m) =>
      m && m.index < m.images.length - DISPLAY_INDEX_OFFSET
        ? { ...m, index: m.index + DISPLAY_INDEX_OFFSET }
        : m,
    );

  return (
    <ProjectsSection
      aria-label={t('common.ariaLabels.section', { title: t('navigation.sections.projects') })}
    >
      <SectionTitle>{t('projects.sectionTitle')}</SectionTitle>
      {projects.length > EMPTY_LENGTH && (
        <ProjectsContainer
          role={AriaRole.List}
          aria-label={t('projects.ariaLabels.list')}
        >
          {projects.map((project) => {
            const isSingleImage = project.images.length === SINGLE_ITEM_COUNT;
            return (
              <ProjectCard
                key={project.title}
                role={AriaRole.ListItem}
                aria-label={t('projects.ariaLabels.card', { title: project.title })}
              >
                <ProjectImages $isSingle={isSingleImage}>
                  {project.images.map((image, index) => (
                    <ProjectImage
                      key={image}
                      src={image}
                      alt={t('projects.ariaLabels.screenshotAlt', {
                        title: project.title,
                        index: index + DISPLAY_INDEX_OFFSET,
                        total: project.images.length,
                      })}
                      height={PROJECT_IMAGE_HEIGHT}
                      $isSingle={isSingleImage}
                      onClick={() => openModal(project.images, index)}
                      role={AriaRole.Button}
                      aria-label={t('projects.ariaLabels.viewImage', {
                        index: index + DISPLAY_INDEX_OFFSET,
                        title: project.title,
                      })}
                      tabIndex={FOCUSABLE_TAB_INDEX}
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
      )}
      {modal !== null &&
        (() => {
          const imageUrl = getModalImageUrl(modal);
          return (
            <ImageModal
              imageUrl={imageUrl}
              altText={t('imageModal.ariaLabels.image', {
                index: modal.index + DISPLAY_INDEX_OFFSET,
              })}
              onClose={closeModal}
              onPrevious={prevImage}
              onNext={nextImage}
              hasPrevious={modal.index > FIRST_INDEX}
              hasNext={modal.index < modal.images.length - DISPLAY_INDEX_OFFSET}
            />
          );
        })()}
    </ProjectsSection>
  );
}
