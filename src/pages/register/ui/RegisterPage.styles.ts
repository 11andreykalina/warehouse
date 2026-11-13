import type { SxProps, Theme } from '@mui/material';

export const registerPageSx: SxProps<Theme> = {
  width: { xs: 'calc(100% - 32px)', sm: 'min(100% - 48px, 1200px)' },
  mx: 'auto',
  pt: { xs: 3, md: 5 },
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

export const registerTitleRowSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: 1,
  minHeight: 56,
};

export const registerCardSx: SxProps<Theme> = (theme) => ({
  width: 'min(100%, 440px)',
  mx: 'auto',
  mt: { xs: 0, md: 0 },
  p: { xs: 2.75, sm: 4 },
  border: 1,
  borderColor: theme.palette.divider,
  borderRadius: 3,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(19, 29, 45, 0.96), rgba(12, 20, 31, 0.94))'
      : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(242, 246, 251, 0.96))',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 18px 50px rgba(6, 11, 21, 0.35)'
      : '0 18px 50px rgba(15, 23, 42, 0.08)',
  color: theme.palette.text.primary,
});
