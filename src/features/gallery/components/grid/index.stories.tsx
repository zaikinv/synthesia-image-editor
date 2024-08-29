import { Meta, StoryObj } from '@storybook/react';
import { Grid } from './index';
import { PicsumImage } from '../../../../types';
import { BrowserRouter } from 'react-router-dom';

const sampleImages: Partial<PicsumImage>[] = [
  {
    id: '1',
    url: 'https://picsum.photos/200/300?image=11',
    author: 'Author 1',
  },
  {
    id: '2',
    url: 'https://picsum.photos/200/300?image=12',
    author: 'Author 2',
  },
  {
    id: '3',
    url: 'https://picsum.photos/200/300?image=13',
    author: 'Author 3',
  },
  {
    id: '4',
    url: 'https://picsum.photos/200/300?image=14',
    author: 'Author 4',
  },
  {
    id: '5',
    url: 'https://picsum.photos/200/300?image=15',
    author: 'Author 5',
  },
  {
    id: '6',
    url: 'https://picsum.photos/200/300?image=16',
    author: 'Author 6',
  },
  {
    id: '7',
    url: 'https://picsum.photos/200/300?image=17',
    author: 'Author 7',
  },
  {
    id: '8',
    url: 'https://picsum.photos/200/300?image=18',
    author: 'Author 8',
  },
  {
    id: '9',
    url: 'https://picsum.photos/200/300?image=19',
    author: 'Author 9',
  },
  {
    id: '20',
    url: 'https://picsum.photos/200/300?image=10',
    author: 'Author 10',
  },
];

const meta: Meta<typeof Grid> = {
  component: Grid,
  title: 'Components/Grid',
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    // @ts-expect-error for simplicity
    images: sampleImages,
  },
};
