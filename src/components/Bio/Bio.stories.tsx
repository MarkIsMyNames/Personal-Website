import type { Meta, StoryObj } from '@storybook/react';
import { Bio } from './Bio';
import { defaultLocale } from '../../i18n/localeConfig';

export default { component: Bio } satisfies Meta<typeof Bio>;
type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {
    profile: defaultLocale.profile,
  },
};
