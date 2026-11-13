import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { cartItemAdded } from '@/entities/cart';

export function useAddToCart(productId: string, size: string) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = () => {
    try {
      dispatch(cartItemAdded({ productId, size }));
      setAdded(true);
      setError('');
    } catch (addError) {
      console.error('Could not add the item to the issue request.', addError);
      setError('Не удалось добавить позицию. Попробуйте ещё раз.');
    }
  };

  return { added, error, handleAdd };
}
