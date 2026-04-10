import type { Profile } from '../../types';
import { Icon } from '../../utils/iconMapper';
import { SectionTitle } from '../../styles/Shared.styles';
import { ContactSection, ContactLinks, ContactLink } from './Contact.styles';
import { useTranslation } from 'react-i18next';
import { CONTACT_ICON_SIZE, GITHUB_BASE_URL, MAILTO_PREFIX, EXTERNAL_LINK_REL } from '../../config';

type ContactProps = {
  profile: Profile;
};

export function Contact({ profile }: ContactProps) {
  const { t } = useTranslation();
  return (
    <ContactSection
      aria-label={t('common.ariaLabels.section', { title: t('navigation.sections.contact') })}
    >
      <SectionTitle>{t('contact.sectionTitle')}</SectionTitle>
      <ContactLinks aria-label={t('contact.ariaLabels.list')}>
        <li>
          <ContactLink
            href={`${MAILTO_PREFIX}${profile.email}`}
            aria-label={t('contact.ariaLabels.email', { email: profile.email })}
          >
            <Icon
              iconName="FaEnvelope"
              size={CONTACT_ICON_SIZE}
            />
            <span>{profile.email}</span>
          </ContactLink>
        </li>
        <li>
          <ContactLink
            href={`${GITHUB_BASE_URL}${profile.github}`}
            target="_blank"
            rel={EXTERNAL_LINK_REL}
            aria-label={t('contact.ariaLabels.github', { username: profile.github })}
          >
            <Icon
              iconName="FaGithub"
              size={CONTACT_ICON_SIZE}
            />
            <span>{t('contact.githubUrl', { username: profile.github })}</span>
          </ContactLink>
        </li>
      </ContactLinks>
    </ContactSection>
  );
}
