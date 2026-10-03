import type { SxProps, Theme } from '@mui/material';

export const outfitRailSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  gap: 2,
  overflowX: 'auto',
  overflowY: 'hidden',
  pb: 1,
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
  overscrollBehaviorX: 'contain',
  scrollbarColor: `${theme.palette.divider} transparent`,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': { height: 6 },
  '&::-webkit-scrollbar-thumb': { borderRadius: 99, backgroundColor: theme.palette.divider },
  '& > article': {
    flex: { xs: '0 0 min(340px, calc(100vw - 56px))', md: '0 0 400px' },
    scrollSnapAlign: 'start',
  },
});