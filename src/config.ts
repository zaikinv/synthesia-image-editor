import { Control } from './features/editor/types';
import { ImageMeta } from './features/gallery/config';

export const appConfig = {
  apiBaseUrl: 'https://picsum.photos',
  editor: {
    enabledControls: [
      Control.WIDTH,
      Control.HEIGHT,
      Control.GRAYSCALE,
      Control.BLUR,
    ],
  },
  gallery: {
    imagesPerPage: 12,
    imagePreviewWidth: 300,
    imagePreviewHeight: 200,
    showMeta: [ImageMeta.AUTHOR],
  },
};
