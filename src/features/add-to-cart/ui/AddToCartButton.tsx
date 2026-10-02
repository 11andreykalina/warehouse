import { useState } from 'react';

import { addToCart } from '@/entities/cart';
import { Button } from '@/shared/ui';

export function AddToCartButton({
  productId,
  size,
  disabled = false,
}: {
  productId: string;
  size: string;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = () => {
    try {
      addToCart(productId, size);
      setAdded(true);
      setError('');
    } catch (addError) {
      console.error('Could not add the item to the issue request.', addError);
      setError('Не удалось добавить позицию. Попробуйте ещё раз.');
    }
  };

  return (
    <div className="add-to-request">
      <Button type="button" variant="primary" disabled={disabled} onClick={handleAdd}>
        Добавить в заявку
      </Button>
      {added ? (
        <span className="add-to-request__confirmation" role="status">
          Позиция добавлена
        </span>
      ) : null}
      {error ? (
        <span className="form-error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
