import type { SxProps, Theme } from '@mui/material';

export const outfitCardSx: SxProps<Theme> = { overflow: 'hidden', borderRadius: 1.5 };

export const outfitImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  minHeight: 190,
  m: 1.5,
  mb: 0,
  overflow: 'hidden',
  placeItems: 'center',
  borderRadius: 1.25,
  backgroundColor: 'action.hover',
};

export const outfitContentSx: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 0.5, p: 2 };

export const outfitNameSx: SxProps<Theme> = { fontWeight: 650 };