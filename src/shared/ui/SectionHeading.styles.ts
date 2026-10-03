import type { SxProps, Theme } from '@mui/material';

export const sectionHeadingSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'flex-start', sm: 'flex-end' },
  justifyContent: 'space-between',
  gap: 2,
};

export const sectionTitleGroupSx: SxProps<Theme> = { gap: 0.5 };

export const sectionEyebrowSx: SxProps<Theme> = {
  color: 'primary.main',
  fontWeight: 750,
  textTransform: 'uppercase',
};

export const sectionTitleSx = (level: 1 | 2): SxProps<Theme> => ({
  fontWeight: 700,
  lineHeight: 1.2,
  ...(level === 1 ? { fontSize: { xs: 26, sm: 30 } } : { fontSize: { xs: 21, sm: 24 } }),
});

export const sectionDescriptionSx: SxProps<Theme> = { color: 'text.secondary' };