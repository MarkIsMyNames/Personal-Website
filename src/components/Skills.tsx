import React from 'react';
import type { Skill } from '../types';
import { Icon } from '../utils/iconMapper';
import { SkillsSection, SectionTitle, SkillsGrid, SkillCard, SkillName } from './Skills.styles';

type SkillsProps = {
  skills: Skill[];
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <SkillsSection aria-label="Technical Skills section">
      <SectionTitle>Technical Skills</SectionTitle>
      <SkillsGrid
        role="list"
        aria-label="List of technical skills"
      >
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            role="listitem"
            aria-label={`${skill.name} skill`}
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
};
