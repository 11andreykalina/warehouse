import type { MouseEvent } from 'react';

export function createProductSizeChangeHandler(onSelect: (size: string) => void) {
  return (_: MouseEvent<HTMLElement>, value: string | null) => {
    if (value !== null) {
      onSelect(value);
    }
  };
}
