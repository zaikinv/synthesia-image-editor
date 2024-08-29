export interface PicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface LoaderData {
  image: PicsumImage;
  currentPage: number;
  totalPages: number;
  images: PicsumImage[];
}
