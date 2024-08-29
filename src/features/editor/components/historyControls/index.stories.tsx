import '../../../../index.css';
import { Meta, StoryObj } from '@storybook/react';
import { HistoryControls } from './index';
import { state } from '../../store';

const mockEditorState = {
  undoStack: {
    value: ['something'],
  },
  redoStack: {
    value: [],
  },
};

const meta: Meta<typeof HistoryControls> = {
  component: HistoryControls,
  title: 'Components/HistoryControls',
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

type Story = StoryObj<typeof HistoryControls>;

export const Default: Story = {
  render: () => <HistoryControls />,
};
