import type { Order } from '../model/types';

export function OrderCard({
  order,
  productName,
}: {
  order: Order;
  productName: (productId: string) => string | undefined;
}) {
  const status =
    order.status === 'submitted'
      ? 'Отправлена'
      : order.status === 'approved'
        ? 'Согласована'
        : 'Выдана';

  return (
    <article className="order-card">
      <div className="order-card__header">
        <strong>Заявка {order.id.slice(-8)}</strong>
        <span className={`status-tag ${order.status === 'submitted' ? 'status-tag--submitted' : ''}`}>
          {status}
        </span>
      </div>
      <ul className="order-card__items">
        {order.items.map((item) => {
          return (
            <li key={`${item.productId}-${item.size}`}>
              {productName(item.productId) ?? 'Позиция каталога'} — размер {item.size}, {item.quantity} шт.
            </li>
          );
        })}
      </ul>
      <div className="order-card__meta">
        <span>Создана {new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
      </div>
    </article>
  );
}
