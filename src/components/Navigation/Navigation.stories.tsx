import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from './Navigation';
import en from '../../i18n/locales/en.json';

export default { component: Navigation } satisfies Meta<typeof Navigation>;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};

export const HoverBrand: Story = {
  parameters: {
    pseudo: { hover: '[role="button"]' },
  },
};

export const HoverAbout: Story = {
  parameters: {
    pseudo: { hover: `[aria-label*="${en.navigation.sections.about}"][role="menuitem"]` },
  },
};

export const HoverSkills: Story = {
  parameters: {
    pseudo: { hover: `[aria-label*="${en.navigation.sections.skills}"]` },
  },
};

export const HoverProjects: Story = {
  parameters: {
    pseudo: { hover: `[aria-label*="${en.navigation.sections.projects}"]` },
  },
};

export const HoverContact: Story = {
  parameters: {
    pseudo: { hover: `[aria-label*="${en.navigation.sections.contact}"]` },
  },
};
