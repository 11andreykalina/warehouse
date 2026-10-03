import type { SxProps, Theme } from '@mui/material';

export const appBarSx = (theme: Theme) => ({
  position: 'sticky' as const,
  top: 0,
  zIndex: 1100,
  borderTop: '3px solid',
  borderColor: 'secondary.main',
  backgroundColor: theme.palette.mode === 'dark' ? '#0b1423' : '#102545',
  color: 'common.white',
  boxShadow: '0 8px 24px rgb(15 31 54 / 12%)',
});

export const toolbarSx: SxProps<Theme> = {
  width: '100%',
  maxWidth: 1248,
  minHeight: { xs: '64px !important', md: '72px !important' },
  mx: 'auto',
  px: { xs: 2, md: 3 },
  gap: { xs: 0.5, md: 1.5 },
};

export const brandSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: 1,
  color: 'inherit',
  fontSize: 18,
  fontWeight: 750,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

export const brandMarkSx: SxProps<Theme> = {
  display: 'grid',
  width: 38,
  height: 38,
  placeItems: 'center',
  borderRadius: 1.5,
  backgroundColor: 'secondary.main',
  color: 'common.white',
  fontSize: 13,
  fontWeight: 700,
};

export const brandTextSx: SxProps<Theme> = { fontWeight: 750 };

export const navSx: SxProps<Theme> = {
  display: { xs: 'none', lg: 'flex' },
  flex: 1,
  justifyContent: 'flex-end',
  gap: 0.25,
  '& .MuiButton-root': {
    minWidth: 0,
    px: 1.1,
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', color: 'common.white' },
    '&[aria-current="page"]': {
      backgroundColor: 'rgba(255,255,255,0.12)',
      boxShadow: 'inset 0 -2px #bd2738',
      color: 'common.white',
    },
  },
};

export const cartBadgeSx: SxProps<Theme> = {
  '& .MuiBadge-badge': { right: -10, top: 1 },
};

export const navButtonSx: SxProps<Theme> = {
  minWidth: 0,
  px: 1.1,
  color: 'inherit',
  fontSize: 13,
};