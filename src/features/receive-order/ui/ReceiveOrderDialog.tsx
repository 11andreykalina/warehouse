import { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { orderMarkedIssued, useOrders, type Order } from '@/entities/order';
import { formatProductEntitlement, getApplicableProductEntitlements, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  getDaysForPeriod,
  getLocalDate,
  wardrobeItemsAdded,
} from '@/entities/wardrobe-item';
import { receiveOrder } from '../model/receiveOrder';

const entitlementProfile = {
  gender: mockUser.measurements.gender ?? 'male',
  rankGroup: mockUser.service.rankGroup,
  service: mockUser.service.uniformService,
  duties: mockUser.service.uniformDuties,
  conditions: mockUser.service.uniformConditions,
};

export function ReceiveOrderDialog({
  order,
  onClose,
  onReceived,
}: {
  order: Order;
  onClose: () => void;
  onReceived: () => void;
}) {
  const dispatch = useDispatch();
  const orders = useOrders();
  const [wearPeriods, setWearPeriods] = useState(() => {
    const issuedAt = getLocalDate();
    return order.items.map((item) => {
      const product = mockProducts.find((candidate) => candidate.id === item.productId);
      const entitlement = product
        ? getApplicableProductEntitlements(product, entitlementProfile)[0]
        : undefined;
      return entitlement
        ? String(getDaysForPeriod(issuedAt, entitlement.period))
        : '';
    });
  });
  const [error, setError] = useState('');

  const validPeriods = wearPeriods.every((value) => {
    const days = Number(value);
    return Number.isInteger(days) && days > 0;
  });

  const handleConfirm = () => {
    if (!validPeriods) {
      setError('Укажите срок носки в целых днях для каждой позиции.');
      return;
    }

    try {
      const currentOrder = orders.find((candidate) => candidate.id === order.id);
      if (!currentOrder || currentOrder.status === 'issued') {
        throw new Error('The order no longer exists or has already been issued.');
      }

      dispatch(wardrobeItemsAdded(receiveOrder(currentOrder, wearPeriods.map(Number))));
      dispatch(orderMarkedIssued(currentOrder.id));
      onReceived();
    } catch (receiveError) {
      console.error('Could not register order receipt.', receiveError);
      setError('Не удалось записать получение. Проверьте данные и повторите попытку.');
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Подтвердить получение со склада</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            После подтверждения вещи попадут в гардероб. Указанный в каталоге срок по вашей норме подставлен в днях; проверьте его по фактической выдаче.
          </Typography>
          {order.items.map((item, index) => {
            const product = mockProducts.find((candidate) => candidate.id === item.productId);
            const productName = product?.name ?? 'Позиция каталога';
            const entitlement = product
              ? getApplicableProductEntitlements(product, entitlementProfile)[0]
              : undefined;
            return (
              <Stack key={`${item.productId}-${item.size}`} spacing={0.5}>
                <Typography variant="body2">
                  {productName} · размер {item.size} · {item.quantity} шт.
                </Typography>
                {entitlement ? (
                  <Typography variant="caption" color="text.secondary">
                    По профилю: {formatProductEntitlement(entitlement)}
                  </Typography>
                ) : null}
                <TextField
                  label="Срок носки, дней"
                  type="number"
                  value={wearPeriods[index]}
                  onChange={(event) => {
                    const next = [...wearPeriods];
                    next[index] = event.target.value;
                    setWearPeriods(next);
                  }}
                  slotProps={{ htmlInput: { min: 1, step: 1 } }}
                  size="small"
                />
              </Stack>
            );
          })}
          {error ? <Alert severity="error">{error}</Alert> : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={!validPeriods}>
          Перенести в гардероб
        </Button>
      </DialogActions>
    </Dialog>
  );
}
