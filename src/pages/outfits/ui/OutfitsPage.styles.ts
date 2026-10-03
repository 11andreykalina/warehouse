import type { SxProps, Theme } from '@mui/material';

export const outfitsSectionSx: SxProps<Theme> = { gap: 2.5 };

export const outfitFiltersSx: SxProps<Theme> = {
	display: 'grid',
	gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
	gap: 1.5,
};