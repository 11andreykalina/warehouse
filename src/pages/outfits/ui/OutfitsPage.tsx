import { MenuItem, Stack, TextField } from '@mui/material';

import {
  outfitGenderLabels,
  outfitSeasonLabels,
  outfitServiceLabels,
  type OutfitGender,
  type OutfitSeason,
  type OutfitService,
} from '@/entities/outfit';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { OutfitFeed } from '@/widgets/outfit-feed';
import { useOutfitsFilters } from '../model/useOutfitsFilters';
import { outfitFiltersSx, outfitsSectionSx } from './OutfitsPage.styles';

const seasonOptions = Object.entries(outfitSeasonLabels) as [OutfitSeason, string][];
const serviceOptions = Object.entries(outfitServiceLabels) as [OutfitService, string][];
const genderOptions = Object.entries(outfitGenderLabels) as [OutfitGender, string][];

export function OutfitsPage() {
  const {
    season,
    service,
    gender,
    filteredOutfits,
    handleSeasonChange,
    handleServiceChange,
    handleGenderChange,
  } = useOutfitsFilters();

  return (
    <PageStack>
      <Stack component="section" sx={outfitsSectionSx}>
        <SectionHeading eyebrow="Готовые наборы" title="Комплекты формы" description="Выберите комплект, чтобы посмотреть состав и размеры товаров." />
        <Stack sx={outfitFiltersSx}>
          <TextField select label="Сезон" size="small" value={season} onChange={handleSeasonChange}>
            <MenuItem value="all">Все сезоны</MenuItem>
            {seasonOptions.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </TextField>
          <TextField select label="Служба" size="small" value={service} onChange={handleServiceChange}>
            <MenuItem value="all">Все службы</MenuItem>
            {serviceOptions.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </TextField>
          <TextField select label="Пол" size="small" value={gender} onChange={handleGenderChange}>
            <MenuItem value="all">Любой</MenuItem>
            {genderOptions.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </TextField>
        </Stack>
        {filteredOutfits.length > 0 ? (
          <OutfitFeed outfits={filteredOutfits} />
        ) : (
          <EmptyState title="Комплекты не найдены" description="Измените условия фильтрации." />
        )}
      </Stack>
    </PageStack>
  );
}