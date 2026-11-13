import type { WardrobeItem } from './types';
import { getDaysUntil } from './expiration';

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('ru-RU');
}

function getSeasonLabel(season: WardrobeItem['season']) {
  switch (season) {
    case 'summer':
      return 'Летняя форма';
    case 'winter':
      return 'Зимняя форма';
    case 'demi-season':
      return 'Демисезонная форма';
    case 'all-season':
      return 'Всесезонная форма';
  }
}

export function getWardrobeItemCardViewModel(item: WardrobeItem) {
  const isActive = item.status === 'active';
  const daysLeft = isActive ? getDaysUntil(item.expiresAt) : null;
  const archiveDate = item.archivedAt ?? item.expiresAt;
  const archiveDescription =
    item.archiveReason === 'manual'
      ? `В архиве с ${formatDate(archiveDate)} · срок носки до ${formatDate(item.expiresAt)}`
      : `Срок носки истёк ${formatDate(item.expiresAt)}.`;

  return {
    seasonLabel: getSeasonLabel(item.season),
    issuedAt: formatDate(item.issuedAt),
    expiresAt: formatDate(item.expiresAt),
    archiveDescription,
    isActive,
    daysLeft,
    isExpired: item.archiveReason === 'expired',
  };
}
