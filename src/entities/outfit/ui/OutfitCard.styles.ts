import type { SxProps, Theme } from '@mui/material';

export const outfitCardSx: SxProps<Theme> = { overflow: 'hidden', borderRadius: 1.5 };

export const outfitCardActionSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

export const outfitImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  aspectRatio: '4 / 3',
  m: 1.5,
  mb: 0,
  width: 'calc(100% - 24px)',
  overflow: 'hidden',
  placeItems: 'center',
  borderRadius: 1.25,
  backgroundColor: 'action.hover',
};

export const outfitImageSx: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
  objectFit: 'cover',
};

export const outfitActionLabelSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  mt: 1,
};

export const outfitContentSx: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 0.5, p: 2 };

export const outfitNameSx: SxProps<Theme> = { fontWeight: 650 };

export const outfitMetaSx: SxProps<Theme> = { display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 };