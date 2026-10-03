import type { SxProps, Theme } from '@mui/material';

export const sizeSelectorSx: SxProps<Theme> = { gap: 1 };

export const sizeToggleGroupSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
  },
  '& .MuiToggleButton-root': {
    minWidth: 48,
    px: 1.5,
    color: 'text.secondary',
    '&.Mui-selected': { borderColor: 'primary.main', backgroundColor: 'action.selected', color: 'primary.main' },
  },
};