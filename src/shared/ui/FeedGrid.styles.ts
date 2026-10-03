import type { SxProps, Theme } from '@mui/material';

export const feedGridSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))', lg: 'repeat(4, minmax(0, 1fr))' },
  gridAutoRows: '1fr',
  gap: { xs: 1.5, md: 2 },
};