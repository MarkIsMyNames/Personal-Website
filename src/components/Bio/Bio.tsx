import { Fragment } from 'react';
import { AriaRole, FetchPriority, type Profile } from '../../types';
import {
  BioSection,
  BioContent,
  ProfileImage,
  BioTitle,
  BioSubtitle,
  BioText,
  BioEducation,
} from './Bio.styles';
import { useTranslation } from 'react-i18next';
import { BIO_SENTENCE_DELIMITER, DISPLAY_INDEX_OFFSET } from '../../config';

type BioProps = {
  profile: Profile;
};

export function Bio({ profile }: BioProps) {
  const { t } = useTranslation();
  const bioSentences = profile.bio.split(BIO_SENTENCE_DELIMITER).filter(Boolean);

  return (
    <BioSection
      aria-label={t('common.ariaLabels.section', { title: t('navigation.sections.about') })}
    >
      <BioContent>
        <ProfileImage
          src={profile.image}
          alt={t('bio.ariaLabels.image', { name: profile.name, title: profile.title })}
          fetchPriority={FetchPriority.High}
        />
        <BioTitle>{profile.name}</BioTitle>
        <BioSubtitle>{profile.title}</BioSubtitle>
        <BioText
          role={AriaRole.Article}
          aria-label={t('bio.ariaLabels.biography')}
        >
          {bioSentences.map((sentence, index) => (
            <Fragment key={sentence}>
              {sentence}
              {index < bioSentences.length - DISPLAY_INDEX_OFFSET && <br />}
            </Fragment>
          ))}
        </BioText>
        <BioEducation aria-label={t('bio.ariaLabels.education')}>
          {t('bio.education', {
            university: profile.university,
            year: profile.graduationYear,
          })}
        </BioEducation>
      </BioContent>
    </BioSection>
  );
}
