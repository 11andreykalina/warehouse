import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { seasonToggleGroupSx } from './SeasonFilter.styles';

type Season = 'all' | 'summer' | 'demi-season' | 'winter';

export function SeasonFilter({ selected, onSelect }: { selected: Season; onSelect: (season: Season) => void }) {
  const options: Season[] = ['all', 'summer', 'demi-season', 'winter'];

  return (
    <Box>
      <ToggleButtonGroup
        aria-label="Фильтр по сезону"
        exclusive
        value={selected}
        onChange={(_, value: Season | null) => {
          if (value !== null) onSelect(value);
        }}
        sx={seasonToggleGroupSx}
      >
        {options.map((season) => (
          <ToggleButton key={season} value={season}>
            {season === 'all'
              ? 'Все сезоны'
              : season === 'summer'
                ? 'Лето'
                : season === 'demi-season'
                  ? 'Демисезон'
                  : 'Зима'}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
