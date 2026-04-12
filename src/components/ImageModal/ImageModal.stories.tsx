import type { Meta, StoryObj } from '@storybook/react';
import { ImageModal } from './ImageModal';
import { defaultLocale } from '../../i18n/localeConfig';

export default { component: ImageModal } satisfies Meta<typeof ImageModal>;
type Story = StoryObj<typeof ImageModal>;

const baseArgs = {
  imageUrl: 'NASA1.jpg',
  altText: 'NASA Space Apps Challenge screenshot',
};

export const FirstImage: Story = {
  args: { ...baseArgs, hasPrevious: false, hasNext: true },
};

export const MiddleImage: Story = {
  args: { ...baseArgs, hasPrevious: true, hasNext: true },
};

export const LastImage: Story = {
  args: { ...baseArgs, hasPrevious: true, hasNext: false },
};

export const SingleImage: Story = {
  args: { ...baseArgs, hasPrevious: false, hasNext: false },
};

export const HoverClose: Story = {
  args: { ...baseArgs, hasPrevious: true, hasNext: true },
  parameters: {
    pseudo: { hover: `[aria-label="${defaultLocale.imageModal.ariaLabels.close}"]` },
  },
};

export const HoverNext: Story = {
  args: { ...baseArgs, hasPrevious: true, hasNext: true },
  parameters: {
    pseudo: { hover: `[aria-label="${defaultLocale.imageModal.ariaLabels.next}"]` },
  },
};

export const HoverPrevious: Story = {
  args: { ...baseArgs, hasPrevious: true, hasNext: true },
  parameters: {
    pseudo: { hover: `[aria-label="${defaultLocale.imageModal.ariaLabels.previous}"]` },
  },
};
