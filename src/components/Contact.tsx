import React from 'react';
import type { Profile } from '../types';
import { Icon } from '../utils/iconMapper';
import { ContactSection, SectionTitle, ContactLinks, ContactLink } from './Contact.styles';

type ContactProps = {
  profile: Profile;
};

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  return (
    <ContactSection aria-label="Contact section">
      <SectionTitle>Get In Touch</SectionTitle>
      <ContactLinks
        role="list"
        aria-label="Contact information"
      >
        <ContactLink
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.email}`}
          role="listitem"
        >
          <Icon
            iconName="FaEnvelope"
            size={24}
          />
          <span>{profile.email}</span>
        </ContactLink>
        <ContactLink
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit GitHub profile of ${profile.github}`}
          role="listitem"
        >
          <Icon
            iconName="FaGithub"
            size={24}
          />
          <span>github.com/{profile.github}</span>
        </ContactLink>
      </ContactLinks>
    </ContactSection>
  );
};
