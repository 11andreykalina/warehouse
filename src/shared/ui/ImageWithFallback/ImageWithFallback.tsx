import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

import { useImageWithFallback } from './model/useImageWithFallback';
import { fallbackLabelSx, fallbackMarkSx, fallbackSx, imageSx as defaultImageSx } from './ImageWithFallback.styles';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  category: string;
  sx?: SxProps<Theme>;
  imageSx?: SxProps<Theme>;
};

export function ImageWithFallback({ src, alt, category, sx, imageSx }: ImageWithFallbackProps) {
  const { unavailable, markUnavailable } = useImageWithFallback();
  const containerSx = [fallbackSx, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])];
  const renderedImageSx = [
    defaultImageSx,
    ...(imageSx ? (Array.isArray(imageSx) ? imageSx : [imageSx]) : []),
    ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
  ];

  if (unavailable || !src) {
    return (
      <Box role="img" aria-label={`${alt}. Фото пока не добавлено.`} sx={containerSx}>
        <Typography aria-hidden="true" sx={fallbackMarkSx}>Фото</Typography>
        <Typography variant="caption" sx={fallbackLabelSx}>{category}</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={markUnavailable}
      sx={renderedImageSx}
    />
  );
}
