import './style.scss';
import { Item } from '../item';
import { FC } from 'react';
import { PicsumImage } from '../../../../types';

interface GridProps {
  images: PicsumImage[];
}

export const Grid: FC<GridProps> = ({ images }) => (
  <div className="grid">
    {images.map((image) => (
      <Item key={image.id} image={image} />
    ))}
  </div>
);
