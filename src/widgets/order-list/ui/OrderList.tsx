import { Alert, Stack } from '@mui/material';

import { OrderCard } from '@/entities/order';
import { ReceiveOrderDialog } from '@/features/receive-order';
import { EmptyState } from '@/shared/ui';
import { useOrderList } from '../model/useOrderList';

export function OrderList() {
  const {
    orders,
    receiptOrder,
    receiptCompleted,
    getProductName,
    handleReceive,
    handleCloseReceipt,
    handleReceiptCompleted,
    handleCloseSuccess,
  } = useOrderList();

  if (orders.length === 0) {
    return (
      <EmptyState title="Заявок пока нет" description="Отправленные заявки появятся здесь." />
    );
  }

  return (
    <Stack spacing={1.5}>
      {receiptCompleted ? (
        <Alert severity="success" onClose={handleCloseSuccess}>
          Полученные вещи добавлены в гардероб. Срок носки начнёт отсчитываться с сегодняшнего дня.
        </Alert>
      ) : null}
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          productName={getProductName}
          onReceive={handleReceive}
        />
      ))}
      {receiptOrder ? (
        <ReceiveOrderDialog
          key={receiptOrder.id}
          order={receiptOrder}
          onClose={handleCloseReceipt}
          onReceived={handleReceiptCompleted}
        />
      ) : null}
    </Stack>
  );
}
