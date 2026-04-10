import { AriaRole, type Skill } from '../../types';
import { Icon } from '../../utils/iconMapper';
import { SectionTitle } from '../../styles/Shared.styles';
import { SkillsSection, SkillsGrid, SkillCard, SkillName } from './Skills.styles';
import { useTranslation } from 'react-i18next';
import { SKILL_ICON_SIZE } from '../../config';

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
        role={AriaRole.List}
        aria-label={t('skills.ariaLabels.list')}
      >
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            role={AriaRole.ListItem}
            aria-label={t('skills.ariaLabels.card', { name: skill.name })}
          >
            <Icon
              iconName={skill.iconName}
              size={SKILL_ICON_SIZE}
            />
            <SkillName>{skill.name}</SkillName>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
