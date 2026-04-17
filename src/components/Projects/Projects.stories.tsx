import type { Meta, StoryObj } from '@storybook/react';
import { Projects } from './Projects';
import { defaultLocale } from '../../i18n/localeConfig';
import { SINGLE_ITEM_COUNT } from '../../config';
import { AriaRole, TestErrorMessage } from '../../types';

const allProjects = defaultLocale.projectsData;

const multiImageProject = allProjects.find((p) => p.images.length > SINGLE_ITEM_COUNT);
if (!multiImageProject) {
  throw new Error(TestErrorMessage.NoMultiImageProject);
}

const singleImageProject = allProjects.find((p) => p.images.length === SINGLE_ITEM_COUNT);
if (!singleImageProject) {
  throw new Error(TestErrorMessage.NoSingleImageProject);
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
