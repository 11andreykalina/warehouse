import type { MouseEvent } from 'react';

export function createCategoryFilterChangeHandler(onSelect: (id: string | null) => void) {
  return (_: MouseEvent<HTMLElement>, value: string | null) => {
    if (value !== null) {
      onSelect(value || null);
    }
  };
}
