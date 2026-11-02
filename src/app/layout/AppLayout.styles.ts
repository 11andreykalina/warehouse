import type { SxProps, Theme } from '@mui/material';

export const appShellSx: SxProps<Theme> = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
};

export const pageShellSx: SxProps<Theme> = {
  width: { xs: 'calc(100% - 32px)', sm: 'min(1200px, calc(100% - 48px))' },
  mx: 'auto',
  py: { xs: 2.5, md: 4.75 },
  pb: { xs: 12, md: 10 },
  flex: 1,
  boxSizing: 'border-box',
};

export const searchBarSx: SxProps<Theme> = {
  width: '100%',
  mb: { xs: 2.5, md: 3 },
  '& .MuiPaper-root': {
    overflow: 'hidden',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 2,
  },
};