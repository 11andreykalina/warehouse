import type { OutfitGender, OutfitPurpose, OutfitSeason, OutfitService } from './types';
import { uniformGenderLabels, uniformServiceLabels } from '@/shared/model';

export const outfitSeasonLabels: Record<OutfitSeason, string> = {
  summer: 'Лето',
  winter: 'Зима',
  'demi-season': 'Демисезон',
};

export const outfitServiceLabels: Record<OutfitService, string> = uniformServiceLabels;

export const outfitGenderLabels: Record<OutfitGender, string> = uniformGenderLabels;

export const outfitPurposeLabels: Record<OutfitPurpose, string> = {
  daily: 'Повседневный комплект',
  dress: 'Парадный комплект',
  special: 'Специальный комплект',
};