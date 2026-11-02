import type { SxProps, Theme } from '@mui/material';

export const productCardSx: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  minWidth: 0,
  height: '100%',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: 1.5,
  boxShadow: 'none',
  border: 1,
  borderColor: 'divider',
};

export const productActionAreaSx: SxProps<Theme> = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

export const productImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  placeItems: 'center',
  backgroundColor: 'action.hover',
};

export const productImageSx: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
};

export const productContentSx: SxProps<Theme> = {
  display: 'flex',
  minWidth: 0,
  flex: 1,
  flexDirection: 'column',
  gap: 1,
  p: { xs: 1.25, sm: 1.5, md: 2 },
};

export const productNameSx: SxProps<Theme> = {
  minHeight: '2.5em',
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  lineHeight: 1.4,
  fontWeight: 700,
};

export const productDescriptionSx: SxProps<Theme> = {
  minHeight: '2.8em',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  lineHeight: 1.45,
};

export const productSizesSx: SxProps<Theme> = {
  display: 'flex',
  minHeight: 32,
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  gap: 0.5,
  mt: 'auto',
  '& .MuiChip-root': {
    cursor: 'default',
  },
};

export const productCardActionSx: SxProps<Theme> = { p: 1.25, pt: 0, pb: 1.25 };