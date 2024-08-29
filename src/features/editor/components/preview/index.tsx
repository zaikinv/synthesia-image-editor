import '../../../../index.css';
import { FC, useRef } from 'react';
import { state } from '../../store';
import { useLoaderData } from 'react-router-dom';
import { ProgressiveImage } from '../../../../components/progressiveImage';
import { controlsConfig } from '../../config';
import { LoaderData } from '../../../../types';
import { appConfig } from '../../../../config.ts';
import './style.scss';
import { useResizeObserver } from 'usehooks-ts';
import { getScaledImageDimensions } from '../../../../utils';

export const Preview: FC = () => {
  const { image } = useLoaderData() as LoaderData;
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useResizeObserver({ ref });

  const aspectRatio = controlsConfig.height.max! / controlsConfig.width.max!;

  // On mobile devices we need to find a way to show the image being resized.
  // To do that, we would assume the the size of the preview canvas is the maximum
  // image size and will scale the image size accordingly.
  const { scaledWidth, scaledHeight } = getScaledImageDimensions(
    width,
    height,
    state.value.width.value!,
    state.value.height.value!,
  );

  const imageStyle = {
    width: `${scaledWidth}px`,
    height: `${scaledHeight}px`,
    filter: `grayscale(${state.value.grayscale.value ? 1 : 0}) blur(${state.value.blur.value}px)`,
    objectFit: 'cover',
  };

  return (
    <div className="preview" ref={ref} style={{ height: width * aspectRatio }}>
      <ProgressiveImage
        imageId={image.id}
        alt={image.author}
        sourceWidth={appConfig.gallery.imagePreviewWidth}
        sourceHeight={appConfig.gallery.imagePreviewHeight}
        targetWidth={controlsConfig.width.max!}
        targetHeight={controlsConfig.height.max!}
        style={imageStyle}
      />
    </div>
  );
};
