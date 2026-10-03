import type { SxProps, Theme } from '@mui/material';

export const categoryCardSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  minHeight: { xs: 94, sm: 112 },
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  p: { xs: 1.75, sm: 2.25 },
  borderRadius: 1.5,
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 35%, ${theme.palette.action.selected})`,
  color: 'text.primary',
  fontWeight: 700,
  '&:hover': { backgroundColor: 'action.hover' },
});

export const categoryArrowSx: SxProps<Theme> = { color: 'secondary.main' };