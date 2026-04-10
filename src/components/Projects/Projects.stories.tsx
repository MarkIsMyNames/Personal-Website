import type { Meta, StoryObj } from '@storybook/react';
import { Projects } from './Projects';
import en from '../../i18n/locales/en.json';
import { SINGLE_ITEM_COUNT } from '../../config';
import { AriaRole } from '../../types';

const allProjects = en.projectsData;

const multiImageProject = allProjects.find((p) => p.images.length > SINGLE_ITEM_COUNT);
if (!multiImageProject) {
  throw new Error('No multi-image project found in en.json');
}

const singleImageProject = allProjects.find((p) => p.images.length === SINGLE_ITEM_COUNT);
if (!singleImageProject) {
  throw new Error('No single-image project found in en.json');
}

export default { component: Projects } satisfies Meta<typeof Projects>;
type Story = StoryObj<typeof Projects>;

export const SingleImageProject: Story = {
  args: { projects: [singleImageProject] },
};

export const MultiImageProject: Story = {
  args: { projects: [multiImageProject] },
};

export const EmptyProjects: Story = {
  args: { projects: [] },
};

export const HoverProjectImage: Story = {
  args: { projects: allProjects },
  parameters: {
    pseudo: { hover: `[role="${AriaRole.Button}"]` },
  },
};
