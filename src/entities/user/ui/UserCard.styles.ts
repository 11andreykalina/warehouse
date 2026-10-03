import type { SxProps, Theme } from '@mui/material';

export const profileCardSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 2.5,
  p: { xs: 2, sm: 3 },
  border: 1,
  borderColor: 'divider',
  borderRadius: 1.5,
  backgroundColor: 'background.paper',
};

export const profileFactsSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 2,
  m: 0,
  '& dt': { color: 'text.secondary', fontSize: 13 },
  '& dd': { m: 0, fontSize: 14, fontWeight: 650 },
};