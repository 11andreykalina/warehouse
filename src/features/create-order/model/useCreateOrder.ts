import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { cartCleared, useCartItems } from '@/entities/cart';
import { createOrder, orderAdded, type Order } from '@/entities/order';

export function useCreateOrder(onSubmitted: (order: Order) => void) {
  const dispatch = useDispatch();
  const items = useCartItems();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (items.length === 0) {
      setError('Добавьте хотя бы одну позицию перед отправкой заявки.');
      return;
    }

    try {
      const order = createOrder(items);
      dispatch(orderAdded(order));
      dispatch(cartCleared());
      onSubmitted(order);
    } catch (submitError) {
      console.error('Could not submit issue request.', submitError);
      setError('Не удалось сохранить заявку. Повторите попытку.');
    }
  };

  return { items, error, canSubmit: items.length > 0, handleSubmit };
}
