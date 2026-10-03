import type { SxProps, Theme } from '@mui/material';

export const outfitDetailsSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.9fr) minmax(0, 1.1fr)' },
  gap: { xs: 2.5, md: 4 },
  p: { xs: 2, sm: 3, md: 4 },
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
  backgroundColor: 'background.paper',
};

export const outfitImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  minHeight: { xs: 240, md: 380 },
  overflow: 'hidden',
  placeItems: 'center',
  borderRadius: 1.5,
  backgroundColor: 'action.hover',
};

export const outfitImageSx: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
  objectFit: 'cover',
};

export const outfitDetailsContentSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
};

export const outfitTagsSx: SxProps<Theme> = { display: 'flex', flexWrap: 'wrap', gap: 0.75 };

export const outfitProductsListSx: SxProps<Theme> = {
  p: 0,
  border: 1,
  borderColor: 'divider',
  borderRadius: 1.5,
  overflow: 'hidden',
};

export const outfitProductLinkSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: 1,
  py: 1.5,
};

