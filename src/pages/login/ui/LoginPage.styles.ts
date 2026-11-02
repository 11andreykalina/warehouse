import type { SxProps, Theme } from '@mui/material';

export const loginPageSx: SxProps<Theme> = {
  width: { xs: 'calc(100% - 32px)', sm: 'min(100% - 48px, 1200px)' },
  mx: 'auto',
  pt: { xs: 3, md: 5 },
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const loginThemeControlSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
  width: 'min(100%, 440px)',
  mx: 'auto',
};

export const loginCardSx: SxProps<Theme> = {
  width: 'min(100%, 440px)',
  mx: 'auto',
  mt: { xs: 2, md: 0 },
  p: { xs: 2.75, sm: 4 },
  border: 1,
  borderColor: 'divider',
  borderRadius: 3,
  background: 'linear-gradient(180deg, rgba(19, 29, 45, 0.96), rgba(12, 20, 31, 0.94))',
  boxShadow: '0 18px 50px rgba(6, 11, 21, 0.35)',
};

export const loginHintSx: SxProps<Theme> = {
  mt: 2,
  color: 'text.secondary',
  lineHeight: 1.55,
};