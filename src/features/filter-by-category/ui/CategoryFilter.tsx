import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import type { Category } from '@/entities/category';
import { categoryToggleGroupSx } from './CategoryFilter.styles';

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <Box>
      <ToggleButtonGroup
        aria-label="Фильтр по категории"
        exclusive
        value={selected ?? ''}
        onChange={(_, value: string | null) => {
          if (value !== null) onSelect(value || null);
        }}
        sx={categoryToggleGroupSx}
      >
        <ToggleButton value="">Все</ToggleButton>
        {categories.map((category) => (
          <ToggleButton key={category.id} value={category.id}>
            {category.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
