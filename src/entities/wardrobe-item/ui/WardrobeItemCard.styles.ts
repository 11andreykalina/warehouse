import type { SxProps, Theme } from '@mui/material';

export const wardrobeCardSx: SxProps<Theme> = { overflow: 'hidden', borderRadius: 1.5 };

export const wardrobeImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  minHeight: 190,
  m: 1.5,
  mb: 0,
  overflow: 'hidden',
  placeItems: 'center',
  borderRadius: 1.25,
  backgroundColor: 'action.hover',
};

export const wardrobeContentSx: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 0.5, p: 2 };

export const wardrobeItemNameSx: SxProps<Theme> = { fontWeight: 650 };