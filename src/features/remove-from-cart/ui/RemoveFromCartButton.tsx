import { Button } from '@/shared/ui';
import { useRemoveFromCart } from '../model/useRemoveFromCart';

export function RemoveFromCartButton({ productId, size }: { productId: string; size: string }) {
  const handleRemove = useRemoveFromCart(productId, size);

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleRemove}
    >
      Удалить
    </Button>
  );
}
