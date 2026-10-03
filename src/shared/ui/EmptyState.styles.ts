import type { SxProps, Theme } from '@mui/material';

export const emptyStateSx: SxProps<Theme> = {
  p: { xs: 2.5, sm: 3.25 },
  border: '1px dashed',
  borderColor: 'divider',
  borderRadius: 1.5,
  backgroundColor: 'background.paper',
  color: 'text.secondary',
};