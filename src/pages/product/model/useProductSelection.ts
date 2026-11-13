import { useState } from 'react';

export function useProductSelection() {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSelectSize = (size: string) => setSelectedSize(size);

  return { selectedSize, handleSelectSize };
}
