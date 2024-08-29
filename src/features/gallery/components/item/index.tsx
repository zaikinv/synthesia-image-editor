import { Link } from 'react-router-dom';
import './style.scss';
import { ProgressiveImage } from '../../../../components/progressiveImage';
import { appConfig } from '../../../../config.ts';
import { ImageMetaLabels } from '../../config';
import { FC } from 'react';
import { PicsumImage } from '../../../../types';

interface ItemProps {
  image: PicsumImage;
}

export const Item: FC<ItemProps> = ({ image }) => {
  return (
    <div className="item">
      <Link to={`/edit/${image.id}`} className="item__link">
        <ProgressiveImage
          imageId={image.id}
          alt={image.author}
          sourceWidth={9}
          sourceHeight={6}
          targetWidth={appConfig.gallery.imagePreviewWidth}
          targetHeight={appConfig.gallery.imagePreviewHeight}
        />
      </Link>
      {appConfig.gallery.showMeta.map((meta) => (
        <p key={meta} className="item__meta item-meta">
          {ImageMetaLabels[meta]}:{' '}
          <span className="item-meta__value">{image[meta]}</span>
        </p>
      ))}
    </div>
  );
};
