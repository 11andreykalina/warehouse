import type { SxProps, Theme } from '@mui/material';

export const productCardSx: SxProps<Theme> = {
  display: 'flex',
  minWidth: 0,
  height: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 1.5,
};

export const productActionAreaSx: SxProps<Theme> = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
};

export const productImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  placeItems: 'center',
  backgroundColor: 'action.hover',
};

export const productImageSx: SxProps<Theme> = { objectFit: 'contain' };

export const productContentSx: SxProps<Theme> = {
  display: 'flex',
  minWidth: 0,
  flex: 1,
  flexDirection: 'column',
  gap: 1,
  p: { xs: 1.5, sm: 2 },
};

export const productNameSx: SxProps<Theme> = {
  minHeight: '2.9em',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  lineHeight: 1.45,
};

export const productDescriptionSx: SxProps<Theme> = {
  minHeight: '3em',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  lineHeight: 1.5,
};

export const productSizesSx: SxProps<Theme> = {
  display: 'flex',
  minHeight: 32,
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: 0.5,
  mt: 'auto',
};

export const productCardActionSx: SxProps<Theme> = { p: 1.5, pt: 0 };