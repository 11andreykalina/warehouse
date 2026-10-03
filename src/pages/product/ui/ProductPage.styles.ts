import type { SxProps, Theme } from '@mui/material';

export const productPageSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 0.9fr)' },
  gap: { xs: 2.5, md: 6 },
  p: { xs: 2, sm: 3, md: 4 },
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
  backgroundColor: 'background.paper',
  boxShadow: 2,
};

export const productImageFrameSx: SxProps<Theme> = {
  display: 'grid',
  minHeight: { xs: 250, md: 400 },
  overflow: 'hidden',
  placeItems: 'center',
  borderRadius: 1.5,
  backgroundColor: 'action.hover',
};

export const productDetailsSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2.25,
  py: 1,
};

export const productDescriptionSx: SxProps<Theme> = { color: 'text.secondary', lineHeight: 1.65 };

export const productTitleSx: SxProps<Theme> = { fontSize: { xs: 27, md: 36 }, fontWeight: 700 };