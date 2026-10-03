import type { SxProps, Theme } from '@mui/material';

export const bottomPaperSx: SxProps<Theme> = {
  position: 'fixed',
  zIndex: 1200,
  right: 0,
  bottom: 0,
  left: 0,
  display: { xs: 'block', lg: 'none' },
  borderTop: 1,
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  pb: 'env(safe-area-inset-bottom)',
  backdropFilter: 'blur(12px)',
};

export const bottomNavigationSx: SxProps<Theme> = {
  height: 64,
  backgroundColor: 'transparent',
  '& .MuiBottomNavigationAction-root': { minWidth: 0, px: 0.5, color: 'text.secondary' },
  '& .MuiBottomNavigationAction-label': { fontSize: 10 },
  '& .Mui-selected': { color: 'primary.main' },
};