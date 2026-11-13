import { useState } from 'react';

export function useProductSelection() {
  const [selectedSize, setSelectedSize] = useState('');

  return { selectedSize, setSelectedSize };
}
