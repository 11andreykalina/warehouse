import type { SxProps, Theme } from '@mui/material';

export const cartListSx: SxProps<Theme> = { gap: 1.5 };

export const cartItemSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '52px minmax(0, 1fr)', sm: '64px minmax(0, 1fr) auto' },
  alignItems: 'center',
  gap: 1.5,
  p: 1.75,
  border: 1,
  borderColor: 'divider',
  borderRadius: 1.5,
  backgroundColor: 'background.paper',
};

export const cartItemImageSx: SxProps<Theme> = {
  width: { xs: 52, sm: 64 },
  height: { xs: 52, sm: 64 },
  overflow: 'hidden',
  borderRadius: 1.25,
  backgroundColor: 'action.hover',
};

export const cartItemDetailsSx: SxProps<Theme> = { display: 'flex', minWidth: 0, flexDirection: 'column', gap: 0.5 };

export const cartItemActionsSx: SxProps<Theme> = {
  display: 'flex',
  gridColumn: { xs: '2', sm: 'auto' },
  alignItems: 'center',
  justifyContent: { xs: 'space-between', sm: 'flex-end' },
  gap: 1,
};

export const quantityControlSx: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
};

export const emptyCartSx: SxProps<Theme> = {
  p: 3,
  border: '1px dashed',
  borderColor: 'divider',
  borderRadius: 1.5,
  color: 'text.secondary',
};

export const cartProductNameSx: SxProps<Theme> = { fontWeight: 650 };

export const cartQuantitySx: SxProps<Theme> = { minWidth: 20, textAlign: 'center' };