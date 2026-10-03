import type { SxProps, Theme } from '@mui/material';

export const loginPageSx: SxProps<Theme> = {
  width: { xs: 'calc(100% - 32px)', sm: 'min(100% - 48px, 1200px)' },
  mx: 'auto',
  pt: { xs: 3, md: 5 },
};

export const loginThemeControlSx: SxProps<Theme> = { display: 'flex', justifyContent: 'flex-end', mb: 1.5 };

export const loginCardSx: SxProps<Theme> = {
  width: 'min(100%, 440px)',
  mx: 'auto',
  mt: { xs: 5, md: '8vh' },
  p: { xs: 2.75, sm: 4 },
  border: 1,
  borderColor: 'divider',
  borderRadius: 2.5,
  backgroundColor: 'background.paper',
  boxShadow: 3,
};

export const loginHintSx: SxProps<Theme> = { mt: 2, color: 'text.secondary', lineHeight: 1.55 };