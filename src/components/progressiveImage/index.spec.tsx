import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ProgressiveImage } from './index.tsx';
import { appConfig } from '../../config.ts';

vi.mock('usehooks-ts', () => ({
  useIntersectionObserver: vi.fn().mockReturnValue({
    ref: { current: null },
    entry: { isIntersecting: true },
  }),
}));

describe('ProgressiveImage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with initial source', () => {
    render(
      <ProgressiveImage
        imageId="test-id"
        alt="Test Image"
        sourceWidth={100}
        sourceHeight={100}
        targetWidth={200}
        targetHeight={200}
      />,
    );

    const image = screen.getByAltText('Test Image') as HTMLImageElement;

    expect(image).not.toBeNull();

    expect(image.src).toBe(`${appConfig.apiBaseUrl}/id/test-id/100/100`);
  });

  it('updates the image source after loading the target image', async () => {
    // @ts-expect-error TS2419
    global.Image = class {
      src = '';
      onload: () => void = () => {};
      constructor() {
        setTimeout(() => this.onload(), 100);
      }
    };

    render(
      <ProgressiveImage
        imageId="test-id"
        alt="Test Image"
        sourceWidth={100}
        sourceHeight={100}
        targetWidth={200}
        targetHeight={200}
      />,
    );

    const lowResImage = screen.getByAltText('Test Image') as HTMLImageElement;

    expect(lowResImage.src).toEqual(
      `${appConfig.apiBaseUrl}/id/test-id/100/100`,
    );

    expect(lowResImage.classList.contains('image-loading')).toBe(true);

    await waitFor(() => {
      const highResImage = screen.getByAltText(
        'Test Image',
      ) as HTMLImageElement;
      expect(highResImage.src).toEqual(
        `${appConfig.apiBaseUrl}/id/test-id/200/200`,
      );
      expect(highResImage.classList.contains('image-loaded')).toBe(true);
    });
  });

  it('applies custom styles', () => {
    const customStyles = { filter: 'blur(10)' };

    render(
      <ProgressiveImage
        imageId="test-id"
        alt="Test Image"
        sourceWidth={100}
        sourceHeight={100}
        targetWidth={200}
        targetHeight={200}
        style={customStyles}
      />,
    );

    const styledImage = screen.getByAltText('Test Image') as HTMLImageElement;

    expect(styledImage.style.filter).toBe('blur(10)');
  });
});
