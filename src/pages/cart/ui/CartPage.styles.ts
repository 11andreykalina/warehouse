import type { SxProps, Theme } from '@mui/material';

export const cartPageSectionSx: SxProps<Theme> = { gap: 2.5 };

export const cartSummarySx: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'stretch', sm: 'center' },
  justifyContent: 'space-between',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  pt: 2,
  borderTop: 1,
  borderColor: 'divider',
};