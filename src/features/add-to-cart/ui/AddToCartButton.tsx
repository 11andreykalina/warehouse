import { useState } from 'react';
import { Alert, Stack } from '@mui/material';

import { addToCart } from '@/entities/cart';
import { Button } from '@/shared/ui';
import { addToCartStackSx } from './AddToCartButton.styles';

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
    <Stack spacing={1} sx={addToCartStackSx}>
      <Button type="button" variant="primary" disabled={disabled} onClick={handleAdd}>
        Добавить в заявку
      </Button>
      {added ? (
        <Alert role="status" severity="success" variant="outlined">Позиция добавлена</Alert>
      ) : null}
      {error ? (
        <Alert role="alert" severity="error">{error}</Alert>
      ) : null}
    </Stack>
  );
}
