import type { SxProps, Theme } from '@mui/material';

export const inputSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': { minHeight: 48, borderRadius: 1.25 },
  '& .MuiOutlinedInput-input': { padding: '12px 14px' },
};