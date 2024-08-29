import { Meta, StoryObj } from '@storybook/react';
import { Item } from './index';
import { PicsumImage } from '../../../../types';
import { MemoryRouter } from 'react-router-dom';

const sampleImage: PicsumImage = {
  id: '1',
  url: 'https://picsum.photos/200/300?image=1',
  author: 'Author 1',
  width: 200,
  height: 300,
  download_url: 'https://picsum.photos/id/1/200/300',
};

const meta: Meta<typeof Item> = {
  component: Item,
  title: 'Components/Item',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => <Item image={sampleImage} />,
};
