import { Alert, Stack } from '@mui/material';

import { Button } from '@/shared/ui';
import type { Order } from '@/entities/order';
import { useCreateOrder } from '../model/useCreateOrder';
import { createOrderStackSx } from './CreateOrderButton.styles';

export function CreateOrderButton({ onSubmitted }: { onSubmitted: (order: Order) => void }) {
  const { canSubmit, error, handleSubmit } = useCreateOrder(onSubmitted);

  return (
    <Stack spacing={1.5} sx={createOrderStackSx}>
      <Button type="button" variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
        Отправить заявку
      </Button>
      {error ? <Alert role="alert" severity="error">{error}</Alert> : null}
    </Stack>
  );
}
