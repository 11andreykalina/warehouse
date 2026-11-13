import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';

import type { Order } from '@/entities/order';
import { useReceiveOrder } from '../model/useReceiveOrder';

export function ReceiveOrderDialog({
  order,
  onClose,
  onReceived,
}: {
  order: Order;
  onClose: () => void;
  onReceived: () => void;
}) {
  const { error, receiptItems, handleConfirm } = useReceiveOrder(order, onReceived);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Подтвердить получение со склада</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Срок носки рассчитывается автоматически и не редактируется здесь. Для позиций с внесённой нормой применяется её срок; для остальных используется временный демонстрационный срок 3 года. С даты получения начнётся обратный отсчёт, после которого вещь автоматически попадёт в архив.
          </Typography>
          {receiptItems.map((item) => (
              <Stack key={item.key} spacing={0.5}>
                <Typography variant="body2">
                  {item.name} · размер {item.size} · {item.quantity} шт.
                </Typography>
                {item.entitlementDescription ? (
                  <Typography variant="caption" color="text.secondary">
                    {item.entitlementDescription}
                  </Typography>
                ) : null}
              </Stack>
          ))}
          {error ? <Alert severity="error">{error}</Alert> : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Перенести в гардероб
        </Button>
      </DialogActions>
    </Dialog>
  );
}
