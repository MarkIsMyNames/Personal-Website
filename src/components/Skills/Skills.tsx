import type { Skill } from '../../types';
import { Icon } from '../../utils/iconMapper';
import { SectionTitle } from '../../styles/Shared.styles';
import { SkillsSection, SkillsGrid, SkillCard, SkillName } from './Skills.styles';
import { useTranslation } from 'react-i18next';

type SkillsProps = {
  skills: Skill[];
};

export function Skills({ skills }: SkillsProps) {
  const { t } = useTranslation();

  return (
    <SkillsSection
      aria-label={t('common.ariaLabels.section', { title: t('navigation.sections.skills') })}
    >
      <SectionTitle>{t('skills.sectionTitle')}</SectionTitle>
      <SkillsGrid
        role="list"
        aria-label={t('skills.ariaLabels.list')}
      >
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            role="listitem"
            aria-label={t('skills.ariaLabels.card', { name: skill.name })}
          >
            <Icon
              iconName={skill.iconName}
              size={50}
            />
            <SkillName>{skill.name}</SkillName>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
