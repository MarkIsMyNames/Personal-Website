import type { Meta, StoryObj } from '@storybook/react';
import { Skills } from './Skills';
import { defaultLocale } from '../../i18n/localeConfig';
import { AriaRole, ErrorMessage } from '../../types';
import { FIRST_INDEX, UNKNOWN_ICON_NAME, UNKNOWN_SKILL_NAME } from '../../config';

const firstSkill = defaultLocale.skillsData[FIRST_INDEX];
if (!firstSkill) {
  throw new Error(ErrorMessage.NoSkillData);
}

export default { component: Skills } satisfies Meta<typeof Skills>;
type Story = StoryObj<typeof Skills>;

export const Default: Story = {
  args: {
    skills: defaultLocale.skillsData,
  },
};

export const SingleSkill: Story = {
  args: {
    skills: [firstSkill],
  },
};

export const UnknownIcon: Story = {
  args: {
    skills: [{ name: UNKNOWN_SKILL_NAME, iconName: UNKNOWN_ICON_NAME }],
  },
};

export const HoverSkillCard: Story = {
  args: {
    skills: [firstSkill],
  },
  parameters: {
    pseudo: { hover: `[role="${AriaRole.ListItem}"]` },
  },
};
