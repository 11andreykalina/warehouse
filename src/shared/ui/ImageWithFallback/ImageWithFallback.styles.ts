import type { SxProps, Theme } from '@mui/material';

export const fallbackSx: SxProps<Theme> = {
  display: 'grid',
  width: '100%',
  minHeight: 'inherit',
  placeContent: 'center',
  gap: 1.25,
  p: 3,
  backgroundColor: 'action.hover',
  color: 'text.secondary',
  textAlign: 'center',
};

export const fallbackMarkSx: SxProps<Theme> = {
  display: 'grid',
  width: 56,
  height: 56,
  mx: 'auto',
  placeItems: 'center',
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
  backgroundColor: 'background.paper',
  color: 'primary.main',
  fontWeight: 750,
};

export const fallbackLabelSx: SxProps<Theme> = {
  color: 'text.secondary',
};

export const imageSx: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
  objectFit: 'cover',
};