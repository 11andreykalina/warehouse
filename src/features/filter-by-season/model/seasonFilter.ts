import type { MouseEvent } from 'react';

export type SeasonFilterValue = 'all' | 'summer' | 'demi-season' | 'winter';

export const seasonFilterOptions: SeasonFilterValue[] = ['all', 'summer', 'demi-season', 'winter'];

export const seasonFilterLabels: Record<SeasonFilterValue, string> = {
  all: 'Все сезоны',
  summer: 'Лето',
  'demi-season': 'Демисезон',
  winter: 'Зима',
};

export function createSeasonFilterChangeHandler(
  onSelect: (season: SeasonFilterValue) => void,
) {
  return (_: MouseEvent<HTMLElement>, value: SeasonFilterValue | null) => {
    if (value !== null) {
      onSelect(value);
    }
  };
}
