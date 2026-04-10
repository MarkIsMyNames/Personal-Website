import type { Meta, StoryObj } from '@storybook/react';
import { Contact } from './Contact';
import en from '../../i18n/locales/en.json';

const defaultProfile = en.profile;

const emailLabel = en.contact.ariaLabels.email.replace('{{email}}', en.profile.email);
const githubLabel = en.contact.ariaLabels.github.replace('{{username}}', en.profile.github);

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
