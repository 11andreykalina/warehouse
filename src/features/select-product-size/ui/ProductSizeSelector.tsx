import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { sizeSelectorSx, sizeToggleGroupSx } from './ProductSizeSelector.styles';

export function ProductSizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <Stack spacing={1.25} sx={sizeSelectorSx}>
      <Typography component="p" variant="subtitle2" id="size-selector-label">
        Выберите размер
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={selected}
        aria-labelledby="size-selector-label"
        onChange={(_, value: string | null) => {
          if (value !== null) onSelect(value);
        }}
        sx={sizeToggleGroupSx}
      >
        {sizes.map((size) => (
          <ToggleButton key={size} value={size}>
            {size}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
