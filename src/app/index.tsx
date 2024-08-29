import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { appConfig } from '../config.ts';

import './style.scss';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      loader: () => redirect('/gallery'),
    },
    {
      path: '/gallery',
      lazy: async () => {
        const { ImageGalleryRoute } = await import('./routes/gallery');
        return {
          Component: ImageGalleryRoute,
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const page = url.searchParams.get('page') || 1;

            const response = await fetch(
              `${appConfig.apiBaseUrl}/v2/list?page=${page}&limit=${appConfig.gallery.imagesPerPage}`,
            );
            const images = await response.json();

            return { images, currentPage: Number(page), totalPages: 10 };
          },
        };
      },
    },
    {
      path: '/edit/:imageId',
      lazy: async () => {
        const { ImageEditorRoute } = await import('./routes/editor');
        return {
          Component: ImageEditorRoute,
          loader: async ({ params }) => {
            const response = await fetch(
              `${appConfig.apiBaseUrl}/id/${params.imageId}/info`,
            );
            const image = await response.json();
            return { image };
          },
        };
      },
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/404');
        return { Component: NotFoundRoute };
      },
    },
  ]);

  return (
    <div className="app-container">
      <h2>Synthesia Image Editor</h2>
      <RouterProvider router={router} />
    </div>
  );
};
