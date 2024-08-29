import '../../../../index.css';
import { Meta, StoryObj } from '@storybook/react';
import { Download } from './index';
import { state } from '../../store';

const mockEditorState = {
  id: { value: 'sample-image' },
  width: { value: 800 },
  height: { value: 600 },
  grayscale: { value: false },
  blur: { value: 0 },
};

const meta: Meta<typeof Download> = {
  component: Download,
  title: 'Components/Download',
  decorators: [
    (Story) => {
      Object.keys(mockEditorState).forEach((key) => {
        // @ts-expect-error for simplicity
        state.value[key] = mockEditorState[key];
      });

      return <Story />;
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Download>;

export const Default: Story = {
  render: () => <Download />,
};
