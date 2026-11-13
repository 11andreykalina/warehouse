import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { orderMarkedIssued, useOrders, type Order } from '@/entities/order';
import { formatProductEntitlement, getProductWearEntitlement, mockProducts } from '@/entities/product';
import { mockUser } from '@/entities/user';
import {
  getDaysForPeriod,
  getLocalDate,
  wardrobeItemsAdded,
} from '@/entities/wardrobe-item';
import type { UniformEligibilityProfile } from '@/shared/model';
import { receiveOrder } from './receiveOrder';

const entitlementProfile: UniformEligibilityProfile = {
  gender: mockUser.measurements.gender ?? 'male',
  rankGroup: mockUser.service.rankGroup,
  service: mockUser.service.uniformService,
  duties: mockUser.service.uniformDuties,
  conditions: mockUser.service.uniformConditions,
};

export function useReceiveOrder(order: Order, onReceived: () => void) {
  const dispatch = useDispatch();
  const orders = useOrders();
  const [error, setError] = useState('');
  const receiptItems = order.items.map((item) => {
    const product = mockProducts.find((candidate) => candidate.id === item.productId);
    const entitlement = product
      ? getProductWearEntitlement(product, entitlementProfile)
      : undefined;

    return {
      key: `${item.productId}-${item.size}`,
      name: product?.name ?? 'Позиция каталога',
      size: item.size,
      quantity: item.quantity,
      entitlementDescription: entitlement
        ? `Срок: ${getDaysForPeriod(getLocalDate(), entitlement.period)} дн. · ${formatProductEntitlement(entitlement)}`
        : undefined,
    };
  });

  const handleConfirm = () => {
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
      setError('Не удалось записать получение. Проверьте заявку и свободное место в хранилище браузера, затем повторите попытку.');
    }
  };

  return { error, receiptItems, handleConfirm };
}
