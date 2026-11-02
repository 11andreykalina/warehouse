import type { SxProps, Theme } from '@mui/material';

export const categoryToggleGroupSx: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1,
  '& .MuiToggleButtonGroup-grouped': {
    margin: 0,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1.5,
    backgroundColor: 'rgba(15, 23, 42, 0.24)',
    '&:not(:first-of-type)': { borderLeft: '1px solid' },
  },
  '& .MuiToggleButton-root': {
    px: 1.8,
    py: 0.9,
    color: 'text.secondary',
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 1.5,
    transition: 'all 0.2s ease',
    '&:hover': { backgroundColor: 'rgba(142, 175, 224, 0.08)', color: 'text.primary' },
    '&.Mui-selected': {
      borderColor: 'primary.main',
      background: 'linear-gradient(135deg, rgba(142, 175, 224, 0.28), rgba(142, 175, 224, 0.12))',
      color: 'text.primary',
      boxShadow: 'inset 0 0 0 1px rgba(142, 175, 224, 0.18)',
    },
    '&.Mui-selected:hover': { background: 'linear-gradient(135deg, rgba(142, 175, 224, 0.32), rgba(142, 175, 224, 0.16))' },
  },
};