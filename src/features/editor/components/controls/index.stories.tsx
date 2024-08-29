import '../../../../index.css';
import { Meta, StoryObj } from '@storybook/react';
import { Controls } from './index';
import { state } from '../../store';

const mockEditorState = {
  control1: { value: 20 },
  control2: { value: true },
  control3: { value: 50 },
};

const meta: Meta<typeof Controls> = {
  component: Controls,
  title: 'Components/Controls',
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

type Story = StoryObj<typeof Controls>;

export const Default: Story = {
  render: () => <Controls />,
};
