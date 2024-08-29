import { appConfig } from '../config.ts';

export const getImageUrl = (params: {
  imageId: string | null;
  width: number | null;
  blur: number | null;
  height: number | null;
  grayscale: boolean | null;
}) => {
  const { imageId, width, height, grayscale, blur } = params;

  const baseUrl = `${appConfig.apiBaseUrl}/id/${imageId}/${width}/${height}`;
  const queryParams = new URLSearchParams();

  if (grayscale) queryParams.append('grayscale', 'true');
  if (blur && blur > 0) queryParams.append('blur', blur.toString());

  const queryString = queryParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
