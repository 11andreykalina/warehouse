export function getLocalDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function addDaysToDate(date: string, days: number): string {
  if (!isDateOnly(date) || !Number.isInteger(days) || days < 1) {
    throw new Error('A valid date and positive whole number of days are required.');
  }

  const [year, month, day] = date.split('-').map(Number);
  const result = new Date(year, month - 1, day + days);
  return getLocalDate(result);
}

export function getDaysUntil(date: string, today = getLocalDate()): number {
  if (!isDateOnly(date) || !isDateOnly(today)) {
    throw new Error('A valid date is required to calculate remaining wear time.');
  }

  const [year, month, day] = date.split('-').map(Number);
  const [todayYear, todayMonth, todayDay] = today.split('-').map(Number);
  const expiryUtc = Date.UTC(year, month - 1, day);
  const todayUtc = Date.UTC(todayYear, todayMonth - 1, todayDay);
  return Math.ceil((expiryUtc - todayUtc) / 86_400_000);
}

export function getDaysForPeriod(
  startDate: string,
  period: { value: number; unit: 'days' | 'years' },
): number {
  if (!isDateOnly(startDate) || !Number.isInteger(period.value) || period.value < 1) {
    throw new Error('A valid start date and positive wear period are required.');
  }

  if (period.unit === 'days') {
    return period.value;
  }

  const [year, month, day] = startDate.split('-').map(Number);
  const targetYear = year + period.value;
  const lastDayOfTargetMonth = new Date(targetYear, month, 0).getDate();
  const targetDate = getLocalDate(new Date(targetYear, month - 1, Math.min(day, lastDayOfTargetMonth)));
  return getDaysUntil(targetDate, startDate);
}
