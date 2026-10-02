import { removeFromCart } from '@/entities/cart';
import { Button } from '@/shared/ui';

export function RemoveFromCartButton({ productId, size }: { productId: string; size: string }) {
  return (
    <Button type="button" variant="secondary" onClick={() => removeFromCart(productId, size)}>
      Удалить
    </Button>
  );
}
