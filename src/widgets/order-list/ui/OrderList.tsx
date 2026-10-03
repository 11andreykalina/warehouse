import { Stack } from '@mui/material';

import { OrderCard, useOrders } from '@/entities/order';
import { mockProducts } from '@/entities/product';
import { EmptyState } from '@/shared/ui';

export function OrderList() {
  const orders = useOrders();

  if (orders.length === 0) {
    return (
      <EmptyState title="Заявок пока нет" description="Отправленные заявки появятся здесь." />
    );
  }

  return (
    <Stack spacing={1.5}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          productName={(productId) => mockProducts.find((product) => product.id === productId)?.name}
        />
      ))}
    </Stack>
  );
}
