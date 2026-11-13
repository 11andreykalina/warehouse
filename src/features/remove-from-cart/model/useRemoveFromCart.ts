import { useDispatch } from 'react-redux';

import { cartItemRemoved } from '@/entities/cart';

export function useRemoveFromCart(productId: string, size: string) {
  const dispatch = useDispatch();

  return () => dispatch(cartItemRemoved({ productId, size }));
}
