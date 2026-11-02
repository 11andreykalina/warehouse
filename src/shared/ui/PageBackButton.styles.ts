import type { SxProps, Theme } from '@mui/material';

export const pageBackButtonSx: SxProps<Theme> = (theme) => ({
  flexShrink: 0,
  alignSelf: 'center',
  minWidth: 0,
  px: 1.25,
  py: 0.75,
  borderRadius: 2,
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(12, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.82)',
  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 4px 12px rgba(15, 23, 42, 0.06)',
});