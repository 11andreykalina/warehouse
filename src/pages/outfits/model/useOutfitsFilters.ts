import { useState, type ChangeEventHandler } from 'react';

import {
  mockOutfits,
  type OutfitGender,
  type OutfitSeason,
  type OutfitService,
} from '@/entities/outfit';

type FilterValue<T extends string> = T | 'all';
type FilterChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export function useOutfitsFilters() {
  const [season, setSeason] = useState<FilterValue<OutfitSeason>>('all');
  const [service, setService] = useState<FilterValue<OutfitService>>('all');
  const [gender, setGender] = useState<FilterValue<OutfitGender>>('all');

  const handleSeasonChange: FilterChangeHandler = (event) => {
    setSeason(event.target.value as FilterValue<OutfitSeason>);
  };
  const handleServiceChange: FilterChangeHandler = (event) => {
    setService(event.target.value as FilterValue<OutfitService>);
  };
  const handleGenderChange: FilterChangeHandler = (event) => {
    setGender(event.target.value as FilterValue<OutfitGender>);
  };

  const filteredOutfits = mockOutfits.filter(
    (outfit) =>
      (season === 'all' || outfit.season === season) &&
      (service === 'all' || outfit.service === service) &&
      (gender === 'all' || outfit.gender === gender),
  );

  return {
    season,
    service,
    gender,
    filteredOutfits,
    handleSeasonChange,
    handleServiceChange,
    handleGenderChange,
  };
}
