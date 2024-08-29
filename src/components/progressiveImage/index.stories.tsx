import '../../index.css';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressiveImage } from './index';

const meta: Meta<typeof ProgressiveImage> = {
  component: ProgressiveImage,
  title: 'Components/ProgressiveImage',
  argTypes: {
    imageId: { control: 'text' },
    alt: { control: 'text' },
    sourceWidth: { control: 'number' },
    sourceHeight: { control: 'number' },
    targetWidth: { control: 'number' },
    targetHeight: { control: 'number' },
    style: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressiveImage>;

export const Default: Story = {
  args: {
    imageId: '13',
    alt: 'Sample Progressive Image',
    sourceWidth: 50,
    sourceHeight: 50,
    targetWidth: 500,
    targetHeight: 500,
    style: {},
  },
  render: (args) => <ProgressiveImage {...args} />,
};
