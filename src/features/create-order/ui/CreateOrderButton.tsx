import { useState } from 'react';

import { clearCart, useCartItems } from '@/entities/cart';
import { createOrder } from '@/entities/order';
import { Button } from '@/shared/ui';
import type { Order } from '@/entities/order';

export function CreateOrderButton({ onSubmitted }: { onSubmitted: (order: Order) => void }) {
  const items = useCartItems();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (items.length === 0) {
      setError('Добавьте хотя бы одну позицию перед отправкой заявки.');
      return;
    }

    try {
      const order = createOrder(items);
      clearCart();
      onSubmitted(order);
    } catch (submitError) {
      console.error('Could not submit issue request.', submitError);
      setError('Не удалось сохранить заявку. Повторите попытку.');
    }
  };

  return (
    <div className="form-stack">
      <Button type="button" variant="primary" disabled={items.length === 0} onClick={handleSubmit}>
        Отправить заявку
      </Button>
      {error ? <p className="form-error" role="alert">{error}</p> : null}
    </div>
  );
}
