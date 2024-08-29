import { describe, it, expect } from 'vitest';
import { getImageUrl } from './imageUrl.ts';
import { appConfig } from '../config.ts';

describe('getImageUrl', () => {
  it('should return the correct URL with all parameters', () => {
    const params = {
      imageId: '123',
      width: 300,
      height: 400,
      blur: 5,
      grayscale: true,
    };

    const result = getImageUrl(params);
    const expectedUrl = `${appConfig.apiBaseUrl}/id/123/300/400?grayscale=true&blur=5`;

    expect(result).toBe(expectedUrl);
  });

  it('should return the correct URL without grayscale and blur', () => {
    const params = {
      imageId: '123',
      width: 300,
      height: 400,
      blur: null,
      grayscale: null,
    };

    const result = getImageUrl(params);
    const expectedUrl = `${appConfig.apiBaseUrl}/id/123/300/400`;

    expect(result).toBe(expectedUrl);
  });

  it('should return the correct URL with grayscale only', () => {
    const params = {
      imageId: '123',
      width: 300,
      height: 400,
      blur: null,
      grayscale: true,
    };

    const result = getImageUrl(params);
    const expectedUrl = `${appConfig.apiBaseUrl}/id/123/300/400?grayscale=true`;

    expect(result).toBe(expectedUrl);
  });

  it('should return the correct URL with blur only', () => {
    const params = {
      imageId: '123',
      width: 300,
      height: 400,
      blur: 5,
      grayscale: null,
    };

    const result = getImageUrl(params);
    const expectedUrl = `${appConfig.apiBaseUrl}/id/123/300/400?blur=5`;

    expect(result).toBe(expectedUrl);
  });

  it('should return the correct URL when width and height are null', () => {
    const params = {
      imageId: '123',
      width: null,
      height: null,
      blur: null,
      grayscale: null,
    };

    const result = getImageUrl(params);
    const expectedUrl = `${appConfig.apiBaseUrl}/id/123/null/null`;

    expect(result).toBe(expectedUrl);
  });
});
