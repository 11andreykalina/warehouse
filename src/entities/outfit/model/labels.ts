import type { OutfitGender, OutfitPurpose, OutfitSeason, OutfitService } from './types';

export const outfitSeasonLabels: Record<OutfitSeason, string> = {
  summer: 'Лето',
  winter: 'Зима',
  'demi-season': 'Демисезон',
};

export const outfitServiceLabels: Record<OutfitService, string> = {
  general: 'Общая форма',
  pps: 'ППС',
  gibdd: 'ГИБДД',
};

export const outfitGenderLabels: Record<OutfitGender, string> = {
  male: 'Мужская',
  female: 'Женская',
  unisex: 'Унисекс',
};

export const outfitPurposeLabels: Record<OutfitPurpose, string> = {
  daily: 'Повседневный комплект',
  dress: 'Парадный комплект',
  special: 'Специальный комплект',
};