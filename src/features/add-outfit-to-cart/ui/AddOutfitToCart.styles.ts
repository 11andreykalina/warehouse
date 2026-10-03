import type { SxProps, Theme } from '@mui/material';

export const outfitDialogListSx: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 1.5, py: 1 };

export const outfitDialogRowSx: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) minmax(170px, 0.5fr)' },
  alignItems: 'center',
  gap: 1.5,
  p: 1.5,
  border: 1,
  borderColor: 'divider',
  borderRadius: 1.25,
};

export const outfitDialogProductNameSx: SxProps<Theme> = { fontWeight: 600 };

export const addOutfitButtonSx: SxProps<Theme> = { alignSelf: 'flex-start' };

export const outfitDialogActionsSx: SxProps<Theme> = { px: 3, pb: 2.5 };