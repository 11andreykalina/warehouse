import type { Outfit } from './types';

export function getOutfitCardSummary(outfit: Outfit) {
  if (outfit.productIds.length === 0) {
    return 'Состав комплекта готовится';
  }

  const purpose =
    outfit.purpose === 'daily'
      ? 'повседневный'
      : outfit.purpose === 'dress'
        ? 'парадный'
        : 'специальный';

  return `${outfit.productIds.length} позиций · ${purpose}`;
}
