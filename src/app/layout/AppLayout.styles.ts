import type { SxProps, Theme } from '@mui/material';

export const appShellSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  minHeight: '100vh',
  '@supports (height: 100dvh)': { minHeight: '100dvh' },
  flexDirection: 'column',
  background:
    theme.palette.mode === 'dark'
      ? 'radial-gradient(circle at top, rgba(90, 127, 193, 0.2), transparent 35%), #091521'
      : 'linear-gradient(180deg, #f7f9fc 0%, #edf3fb 100%)',
});

export const pageShellSx: SxProps<Theme> = {
  width: { xs: 'calc(100% - 32px)', sm: 'min(1200px, calc(100% - 48px))' },
  mx: 'auto',
  py: { xs: 2.5, md: 4.75 },
  pb: { xs: 12, md: 10 },
  flex: 1,
  boxSizing: 'border-box',
};

export const searchBarSx: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  width: '100%',
  mb: { xs: 2.5, md: 3 },
  '& .MuiPaper-root': {
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 42, 0.52)',
    backdropFilter: 'blur(6px)',
  },
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 2.25,
    color: 'text.primary',
    '& input::placeholder': {
      color: 'text.secondary',
      opacity: 1,
    },
  },
};