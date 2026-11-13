import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import {
  createSeasonFilterChangeHandler,
  seasonFilterLabels,
  seasonFilterOptions,
  type SeasonFilterValue,
} from '../model/seasonFilter';
import { seasonToggleGroupSx } from './SeasonFilter.styles';

export function SeasonFilter({
  selected,
  onSelect,
}: {
  selected: SeasonFilterValue;
  onSelect: (season: SeasonFilterValue) => void;
}) {
  const handleChange = createSeasonFilterChangeHandler(onSelect);

  return (
    <Box>
      <ToggleButtonGroup
        aria-label="Фильтр по сезону"
        exclusive
        value={selected}
        onChange={handleChange}
        sx={seasonToggleGroupSx}
      >
        {seasonFilterOptions.map((season) => (
          <ToggleButton key={season} value={season}>
            {seasonFilterLabels[season]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
