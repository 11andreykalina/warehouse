import type { SxProps, Theme } from '@mui/material';

export const pageBackButtonSx: SxProps<Theme> = (theme) => ({
  flexShrink: 0,
  alignSelf: 'stretch',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  height: 56,
  px: 1.5,
  borderRadius: 2,
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(12, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.82)',
  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 4px 12px rgba(15, 23, 42, 0.06)',
  fontSize: '0.95rem',
  fontWeight: 600,
  lineHeight: 1,
  '& .MuiButton-startIcon': {
    margin: 0,
    mr: 0.75,
  },
});