import type { SxProps, Theme } from '@mui/material';

export const categoryToggleGroupSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    '&:not(:first-of-type)': { borderLeft: '1px solid' },
  },
  '& .MuiToggleButton-root': {
    px: 1.6,
    py: 0.9,
    color: 'text.secondary',
    fontSize: 13,
    textTransform: 'none',
    '&.Mui-selected': {
      borderColor: 'primary.main',
      backgroundColor: 'action.selected',
      color: 'primary.main',
    },
    '&.Mui-selected:hover': { backgroundColor: 'action.selected' },
  },
};