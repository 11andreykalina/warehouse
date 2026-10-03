import type { ProductEntitlement } from './types';

function pluralize(value: number, one: string, few: string, many: string) {
  const lastTwo = value % 100;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return many;
  }

  switch (value % 10) {
    case 1:
      return one;
    case 2:
    case 3:
    case 4:
      return few;
    default:
      return many;
  }
}

export function formatWearPeriod(period: ProductEntitlement['period']): string {
  if (period.unit === 'years') {
    return `${period.value} ${pluralize(period.value, 'год', 'года', 'лет')}`;
  }

  return `${period.value} ${pluralize(period.value, 'день', 'дня', 'дней')}`;
}

export function formatProductEntitlement(entitlement: ProductEntitlement): string {
  return `Норма № ${entitlement.norm} · ${formatWearPeriod(entitlement.period)} · ${entitlement.quantity}`;
}
