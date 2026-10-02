import { OrderCard, useOrders } from '@/entities/order';
import { mockProducts } from '@/entities/product';

export function OrderList() {
  const orders = useOrders();

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <h2>Заявок пока нет</h2>
        <p>Отправленные заявки появятся здесь.</p>
      </div>
    );
  }

  return (
    <div className="stack-list">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          productName={(productId) => mockProducts.find((product) => product.id === productId)?.name}
        />
      ))}
    </div>
  );
}
