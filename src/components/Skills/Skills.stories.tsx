import type { Meta, StoryObj } from '@storybook/react';
import { Skills } from './Skills';
import en from '../../i18n/locales/en.json';

export default { component: Skills } satisfies Meta<typeof Skills>;
type Story = StoryObj<typeof Skills>;

export const Default: Story = {
  args: {
    skills: en.skillsData,
  },
};

export const SingleSkill: Story = {
  args: {
    skills: [{ name: 'TypeScript', iconName: 'SiTypescript' }],
  },
};

export const UnknownIcon: Story = {
  args: {
    skills: [{ name: 'Unknown', iconName: '' }],
  },
};

export const HoverSkillCard: Story = {
  args: {
    skills: [{ name: 'TypeScript', iconName: 'SiTypescript' }],
  },
  parameters: {
    pseudo: { hover: '[role="listitem"]' },
  },
};
