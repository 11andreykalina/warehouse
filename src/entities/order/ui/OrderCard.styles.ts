import type { SxProps, Theme } from '@mui/material';

export const orderCardSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  p: 2.25,
  border: 1,
  borderColor: 'divider',
  borderRadius: 1.5,
  backgroundColor: 'background.paper',
};

export const orderCardHeaderSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1.5,
};

export const orderItemsSx: SxProps<Theme> = {
  m: 0,
  pl: 2.25,
  color: 'text.secondary',
  lineHeight: 1.6,
};

export const orderTitleSx: SxProps<Theme> = { fontWeight: 650 };