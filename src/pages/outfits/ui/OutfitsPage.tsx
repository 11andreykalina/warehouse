import { useState } from 'react';
import { MenuItem, Stack, TextField } from '@mui/material';

import {
  mockOutfits,
  outfitGenderLabels,
  outfitSeasonLabels,
  outfitServiceLabels,
  type OutfitGender,
  type OutfitSeason,
  type OutfitService,
} from '@/entities/outfit';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { OutfitFeed } from '@/widgets/outfit-feed';
import { outfitFiltersSx, outfitsSectionSx } from './OutfitsPage.styles';

const seasonOptions = Object.entries(outfitSeasonLabels) as [OutfitSeason, string][];
const serviceOptions = Object.entries(outfitServiceLabels) as [OutfitService, string][];
const genderOptions = Object.entries(outfitGenderLabels) as [OutfitGender, string][];

export function OutfitsPage() {
  const [season, setSeason] = useState<OutfitSeason | 'all'>('all');
  const [service, setService] = useState<OutfitService | 'all'>('all');
  const [gender, setGender] = useState<OutfitGender | 'all'>('all');
  const filteredOutfits = mockOutfits.filter(
    (outfit) =>
      (season === 'all' || outfit.season === season) &&
      (service === 'all' || outfit.service === service) &&
      (gender === 'all' || outfit.gender === gender),
  );

  return (
    <PageStack>
      <Stack component="section" sx={outfitsSectionSx}>
        <SectionHeading eyebrow="Готовые наборы" title="Комплекты формы" description="Выберите комплект, чтобы посмотреть состав и размеры товаров." />
        <Stack sx={outfitFiltersSx}>
          <TextField select label="Сезон" size="small" value={season} onChange={(event) => setSeason(event.target.value as OutfitSeason | 'all')}>
            <MenuItem value="all">Все сезоны</MenuItem>
            {seasonOptions.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </TextField>
          <TextField select label="Служба" size="small" value={service} onChange={(event) => setService(event.target.value as OutfitService | 'all')}>
            <MenuItem value="all">Все службы</MenuItem>
            {serviceOptions.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
          </TextField>
          <TextField select label="Пол" size="small" value={gender} onChange={(event) => setGender(event.target.value as OutfitGender | 'all')}>
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