import { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { orderMarkedIssued, useOrders, type Order } from '@/entities/order';
import { formatProductEntitlement, getApplicableProductEntitlements, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  getDaysForPeriod,
  getLocalDate,
  wardrobeItemsAdded,
} from '@/entities/wardrobe-item';
import type { UniformEligibilityProfile } from '@/shared/model';
import { receiveOrder } from '../model/receiveOrder';

const entitlementProfile: UniformEligibilityProfile = {
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
  const [error, setError] = useState('');
  const missingWearPeriod = order.items.some((item) => {
    const product = mockProducts.find((candidate) => candidate.id === item.productId);
    return !product || getApplicableProductEntitlements(product, entitlementProfile).length === 0;
  });

  const handleConfirm = () => {
    if (missingWearPeriod) {
      setError('Для одной или нескольких позиций не настроен подтверждённый срок носки. Обратитесь к администратору каталога.');
      return;
    }

    try {
      const currentOrder = orders.find((candidate) => candidate.id === order.id);
      if (!currentOrder || currentOrder.status === 'issued') {
        throw new Error('The order no longer exists or has already been issued.');
      }

      dispatch(wardrobeItemsAdded(receiveOrder(currentOrder, entitlementProfile)));
      dispatch(orderMarkedIssued(currentOrder.id));
      onReceived();
    } catch (receiveError) {
      console.error('Could not register order receipt.', receiveError);
      setError(
        receiveError instanceof Error && receiveError.message.startsWith('No verified wear period')
          ? 'Для одной или нескольких позиций не настроен подтверждённый срок носки. Обратитесь к администратору каталога.'
          : 'Не удалось записать получение. Повторите попытку.',
      );
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Подтвердить получение со склада</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Срок носки установлен по норме снабжения и не редактируется здесь. С даты получения начнётся обратный отсчёт; по его окончании вещь автоматически попадёт в архив.
          </Typography>
          {order.items.map((item) => {
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
                    Установленный срок: {getDaysForPeriod(getLocalDate(), entitlement.period)} дн. · {formatProductEntitlement(entitlement)}
                  </Typography>
                ) : (
                  <Typography variant="caption" color="error">
                    Подтверждённый срок носки для позиции не настроен.
                  </Typography>
                )}
              </Stack>
            );
          })}
          {error ? <Alert severity="error">{error}</Alert> : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleConfirm} disabled={missingWearPeriod}>
          Перенести в гардероб
        </Button>
      </DialogActions>
    </Dialog>
  );
}
