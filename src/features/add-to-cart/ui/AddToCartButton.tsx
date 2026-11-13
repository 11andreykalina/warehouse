import { Alert, Stack } from '@mui/material';

import { Button } from '@/shared/ui';
import { useAddToCart } from '../model/useAddToCart';
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
  const { added, error, handleAdd } = useAddToCart(productId, size);

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
