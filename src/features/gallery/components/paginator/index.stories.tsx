import { Meta, StoryObj } from '@storybook/react';
import { Paginator } from './index';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Paginator> = {
  component: Paginator,
  title: 'Components/Paginator',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Paginator>;

export const Default: Story = {
  render: () => <Paginator currentPage={2} totalPages={5} />,
};
