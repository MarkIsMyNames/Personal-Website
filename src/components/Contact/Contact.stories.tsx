import type { Meta, StoryObj } from '@storybook/react';
import { Contact } from './Contact';
import { defaultLocale } from '../../i18n/localeConfig';

const defaultProfile = defaultLocale.profile;

const emailLabel = defaultLocale.contact.ariaLabels.email.replace(
  '{{email}}',
  defaultLocale.profile.email,
);
const githubLabel = defaultLocale.contact.ariaLabels.github.replace(
  '{{username}}',
  defaultLocale.profile.github,
);

export default { component: Contact } satisfies Meta<typeof Contact>;
type Story = StoryObj<typeof Contact>;

export const Default: Story = {
  args: {
    profile: defaultProfile,
  },
};

export const HoverEmail: Story = {
  args: {
    profile: defaultProfile,
  },
  parameters: {
    pseudo: { hover: `[aria-label="${emailLabel}"]` },
  },
};

export const HoverGithub: Story = {
  args: {
    profile: defaultProfile,
  },
  parameters: {
    pseudo: { hover: `[aria-label="${githubLabel}"]` },
  },
};
