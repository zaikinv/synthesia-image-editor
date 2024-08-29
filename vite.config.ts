import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { appConfig } from './src/config';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          imageCount: appConfig.gallery.imagesPerPage,
          imageWidth: appConfig.gallery.imagePreviewWidth,
          imageHeight: appConfig.gallery.imagePreviewHeight,
        },
      },
    }),
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
    visualizer({}),
  ],
  server: {
    port: 5173,
  },
});
