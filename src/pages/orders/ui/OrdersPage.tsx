import { useLocation } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

import { OrderList } from '@/widgets/order-list';
import { PageStack, SectionHeading } from '@/shared/ui';

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
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="История обращений" title="Мои заявки" />
        {submittedOrderId ? (
          <Alert severity="success" role="status">
            Заявка создана. Её номер: {submittedOrderId.slice(-8)}.
          </Alert>
        ) : null}
        <OrderList />
      </Stack>
    </PageStack>
  );
}
