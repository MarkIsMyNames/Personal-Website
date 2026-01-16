import { Fragment, useMemo } from 'react';
import type { Profile } from '../types';
import {
  BioSection,
  BioContent,
  ProfileImage,
  BioTitle,
  BioSubtitle,
  BioText,
  BioEducation,
} from './Bio.styles';

type BioProps = {
  profile: Profile;
};

export function Bio({ profile }: BioProps) {
  const bioSentences = useMemo(
    () => profile.bio.split('. ').filter((sentence) => sentence.trim() !== ''),
    [profile.bio],
  );

  return (
    <BioSection aria-label="About section">
      <BioContent>
        <ProfileImage
          src={profile.image}
          alt={`${profile.name} - ${profile.title}`}
        />
        <BioTitle>{profile.name}</BioTitle>
        <BioSubtitle>{profile.title}</BioSubtitle>
        <BioText
          role="article"
          aria-label="Biography"
        >
          {bioSentences.map((sentence, index) => (
            <Fragment key={index}>
              {sentence}
              {index < bioSentences.length - 1 && '.'}
              {index < bioSentences.length - 1 && <br />}
            </Fragment>
          ))}
        </BioText>
        <BioEducation aria-label="Education information">
          {profile.university} • Class of {profile.graduationYear}
        </BioEducation>
      </BioContent>
    </BioSection>
  );
}
