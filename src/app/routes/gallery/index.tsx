import { useLoaderData } from 'react-router-dom';
import { Grid } from '../../../features/gallery/components/grid';
import { Paginator } from '../../../features/gallery/components/paginator';
import ScrollToTop from '../../../components/scrollToTop';
import './style.scss';
import { LoaderData } from '../../../types';

export const ImageGalleryRoute = () => {
  const { images, currentPage, totalPages } = useLoaderData() as LoaderData;

  if (!images.length) {
    return <p>No images available!</p>;
  }

  return (
    <div className="gallery">
      <ScrollToTop />
      <Grid images={images} />
      <Paginator currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
