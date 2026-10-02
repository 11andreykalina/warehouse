import { useLocation } from 'react-router-dom';

import { OrderList } from '@/widgets/order-list';

export function OrdersPage() {
  const location = useLocation();
  const locationState = location.state;
  const submittedOrderId =
    typeof locationState === 'object' &&
    locationState !== null &&
    'submittedOrderId' in locationState &&
    typeof locationState.submittedOrderId === 'string'
      ? locationState.submittedOrderId
      : undefined;

  return (
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">История обращений</p>
            <h1>Мои заявки</h1>
          </div>
        </div>
        {submittedOrderId ? (
          <div className="section-notice" role="status">
            Заявка создана. Её номер: {submittedOrderId.slice(-8)}.
          </div>
        ) : null}
        <OrderList />
      </section>
    </div>
  );
}
