type ScaledDimensions = {
  scaledWidth: number;
  scaledHeight: number;
};

export function getScaledImageDimensions(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
): ScaledDimensions {
  if (containerWidth >= imageWidth && containerHeight >= imageHeight) {
    // no need to scale
    return {
      scaledWidth: imageWidth,
      scaledHeight: imageHeight,
    };
  }

  const widthRatio = containerWidth / imageWidth;
  const heightRatio = containerHeight / imageHeight;

  // find the smallest scale
  const scale = Math.min(widthRatio, heightRatio, 1);

  return {
    scaledWidth: Math.round(imageWidth * scale),
    scaledHeight: Math.round(imageHeight * scale),
  };
}
