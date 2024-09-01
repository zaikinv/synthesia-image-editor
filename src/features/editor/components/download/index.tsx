import { FC } from 'react';
import { state } from '../../store';
import './style.scss';
import { downloadFromUrl, getImageUrl } from '../../../../utils';

export const Download: FC = () => {
  const handleDownload = async () => {
    const url = getImageUrl({
      imageId: state.value.id.value,
      width: state.value.width.value,
      height: state.value.height.value,
      grayscale: state.value.grayscale.value,
      blur: state.value.blur.value,
    });
    const filename = `Image-${state.value.id.value}.jpg`;
    await downloadFromUrl(url, filename);
  };

  return (
    <div className="download">
      <button onClick={handleDownload} className="download__button">
        Download
      </button>
    </div>
  );
};
