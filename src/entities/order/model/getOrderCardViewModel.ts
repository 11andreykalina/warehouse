import type { Order } from './types';

export function getOrderCardViewModel(
  order: Order,
  productName: (productId: string) => string | undefined,
  onReceive?: (order: Order) => void,
) {
  const status =
    order.status === 'submitted'
      ? 'Отправлена'
      : order.status === 'approved'
        ? 'Согласована'
        : 'Выдана';

  return {
    status,
    statusColor: order.status === 'submitted' ? 'primary' as const : 'default' as const,
    title: `Корзина ${order.id.slice(-8)}`,
    createdAt: new Date(order.createdAt).toLocaleDateString('ru-RU'),
    items: order.items.map((item) => ({
      key: `${item.productId}-${item.size}`,
      description: `${productName(item.productId) ?? 'Позиция каталога'} — размер ${item.size}, ${item.quantity} шт.`,
    })),
    canReceive: order.status !== 'issued' && Boolean(onReceive),
    handleReceive: () => onReceive?.(order),
  };
}
