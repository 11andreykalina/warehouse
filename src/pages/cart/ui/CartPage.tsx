import { useNavigate } from 'react-router-dom';

import { useCartItems } from '@/entities/cart';
import type { Order } from '@/entities/order';
import { CreateOrderButton } from '@/features/create-order';
import { CartItems } from '@/widgets/cart-items';

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartItems();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitted = (order: Order) => {
    navigate('/orders', { state: { submittedOrderId: order.id } });
  };

  return (
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Заявка на получение</p>
            <h1>Выбранные позиции</h1>
          </div>
        </div>
        <CartItems />
        {items.length > 0 ? (
          <div className="cart-summary">
            <span className="cart-summary__text">
              Позиций: {items.length}, всего единиц: {totalQuantity}
            </span>
            <CreateOrderButton onSubmitted={handleSubmitted} />
          </div>
        ) : null}
      </section>
    </div>
  );
}
