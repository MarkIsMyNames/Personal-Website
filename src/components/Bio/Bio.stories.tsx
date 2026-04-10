import type { Meta, StoryObj } from '@storybook/react';
import { Bio } from './Bio';
import en from '../../i18n/locales/en.json';

export default { component: Bio } satisfies Meta<typeof Bio>;
type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    profile: en.profile,
  },
};
