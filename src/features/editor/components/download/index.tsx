import { FC } from 'react';
import { state } from '../../store';
import './style.scss';
import { getImageUrl } from '../../../../utils';

export const Download: FC = () => {
  return (
    <div className="download">
      <a
        href={getImageUrl({
          imageId: state.value.id.value,
          width: state.value.width.value,
          height: state.value.height.value,
          grayscale: state.value.grayscale.value,
          blur: state.value.blur.value,
        })}
        download={`image-${state.value.id.value}.jpg`}
        target={'_blank'}
        className="download__button"
      >
        Download
      </a>
    </div>
  );
};
