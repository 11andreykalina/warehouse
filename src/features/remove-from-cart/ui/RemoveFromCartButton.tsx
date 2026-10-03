import { useDispatch } from 'react-redux';

import { cartItemRemoved } from '@/entities/cart';
import { Button } from '@/shared/ui';

export function RemoveFromCartButton({ productId, size }: { productId: string; size: string }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => dispatch(cartItemRemoved({ productId, size }))}
    >
      Удалить
    </Button>
  );
}
