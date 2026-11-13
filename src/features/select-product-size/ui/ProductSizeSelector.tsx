import { Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { createProductSizeChangeHandler } from '../model/productSizeSelector';
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
  const handleChange = createProductSizeChangeHandler(onSelect);

  return (
    <Stack spacing={1.25} sx={sizeSelectorSx}>
      <Typography component="p" variant="subtitle2" id="size-selector-label">
        Выберите размер
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={selected}
        aria-labelledby="size-selector-label"
        onChange={handleChange}
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
