import { useNavigate } from 'react-router-dom';

import { useCartItems } from '@/entities/cart';
import type { Order } from '@/entities/order';

export function useCartPage() {
  const navigate = useNavigate();
  const items = useCartItems();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitted = (order: Order) => {
    navigate('/orders', { state: { submittedOrderId: order.id } });
  };

  return { items, totalQuantity, handleSubmitted };
}
