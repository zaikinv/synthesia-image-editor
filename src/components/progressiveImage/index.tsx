import { FC, useState } from 'react';
import './style.scss';
import { appConfig } from '../../config.ts';
import { useIntersectionObserver } from 'usehooks-ts';

interface ProgressiveImageProps {
  imageId: string;
  alt: string;
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
  style?: Record<string, string>;
}

export const ProgressiveImage: FC<ProgressiveImageProps> = ({
  imageId,
  alt,
  sourceWidth,
  sourceHeight,
  targetWidth,
  targetHeight,
  style,
}) => {
  const lowResImageUrl = `${appConfig.apiBaseUrl}/id/${imageId}/${sourceWidth}/${sourceHeight}`;
  const highResImageUrl = `${appConfig.apiBaseUrl}/id/${imageId}/${targetWidth}/${targetHeight}`;

  const [isHighResLoaded, setIsHighResLoaded] = useState(false);

  const imgRef = useIntersectionObserver({
    // will trigger when 10% of the image is visible
    threshold: 0.1,
  });

  if (imgRef?.entry?.isIntersecting && !isHighResLoaded) {
    const highResImg = new Image();
    highResImg.src = highResImageUrl;
    highResImg.onload = () => {
      setIsHighResLoaded(true);
    };
  }

  return (
    <div className="container">
      {!isHighResLoaded && <div className="skeleton" />}
      <img
        ref={imgRef.ref}
        src={isHighResLoaded ? highResImageUrl : lowResImageUrl}
        alt={alt}
        className={`container__image ${isHighResLoaded ? 'image-loaded' : 'image-loading'}`}
        width={targetWidth}
        height={targetHeight}
        style={style}
        loading="lazy"
      />
    </div>
  );
};
