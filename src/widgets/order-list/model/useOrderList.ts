import { useState } from 'react';

import { useOrders, type Order } from '@/entities/order';
import { mockProducts } from '@/entities/product';

export function useOrderList() {
  const orders = useOrders();
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [receiptCompleted, setReceiptCompleted] = useState(false);

  const handleReceive = (order: Order) => setReceiptOrder(order);
  const handleCloseReceipt = () => setReceiptOrder(null);
  const handleReceiptCompleted = () => {
    setReceiptOrder(null);
    setReceiptCompleted(true);
  };
  const handleCloseSuccess = () => setReceiptCompleted(false);
  const getProductName = (productId: string) =>
    mockProducts.find((product) => product.id === productId)?.name;

  return {
    orders,
    receiptOrder,
    receiptCompleted,
    getProductName,
    handleReceive,
    handleCloseReceipt,
    handleReceiptCompleted,
    handleCloseSuccess,
  };
}
