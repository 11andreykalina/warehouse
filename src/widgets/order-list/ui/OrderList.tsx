import { useState } from 'react';
import { Alert, Stack } from '@mui/material';

import { OrderCard, useOrders, type Order } from '@/entities/order';
import { mockProducts } from '@/entities/product';
import { ReceiveOrderDialog } from '@/features/receive-order';
import { EmptyState } from '@/shared/ui';

export function OrderList() {
  const orders = useOrders();
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [receiptCompleted, setReceiptCompleted] = useState(false);

  if (orders.length === 0) {
    return (
      <EmptyState title="Заявок пока нет" description="Отправленные заявки появятся здесь." />
    );
  }

  return (
    <Stack spacing={1.5}>
      {receiptCompleted ? (
        <Alert severity="success" onClose={() => setReceiptCompleted(false)}>
          Полученные вещи добавлены в гардероб. Срок носки начнёт отсчитываться с сегодняшнего дня.
        </Alert>
      ) : null}
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          productName={(productId) => mockProducts.find((product) => product.id === productId)?.name}
          onReceive={setReceiptOrder}
        />
      ))}
      {receiptOrder ? (
        <ReceiveOrderDialog
          key={receiptOrder.id}
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
          onReceived={() => {
            setReceiptOrder(null);
            setReceiptCompleted(true);
          }}
        />
      ) : null}
    </Stack>
  );
}
