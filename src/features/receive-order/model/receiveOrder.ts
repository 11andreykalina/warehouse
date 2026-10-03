import type { Order } from '@/entities/order';
import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';
import { addDaysToDate, getLocalDate, type WardrobeItem } from '@/entities/wardrobe-item';

export function receiveOrder(order: Order, wearPeriods: number[]): Omit<WardrobeItem, 'id'>[] {
  if (order.status === 'issued' || wearPeriods.length !== order.items.length) {
    throw new Error('The order is already issued or its wear periods are incomplete.');
  }

  if (!wearPeriods.every((days) => Number.isInteger(days) && days > 0)) {
    throw new Error('Every issued item must have a positive whole-number wear period.');
  }

  const issuedAt = getLocalDate();
  return order.items.flatMap((orderItem, itemIndex) => {
    const product = mockProducts.find((candidate) => candidate.id === orderItem.productId);
    if (!product) {
      throw new Error(`Product ${orderItem.productId} is missing from the catalog.`);
    }

    const expiresAt = addDaysToDate(issuedAt, wearPeriods[itemIndex]);
    const category =
      mockCategories.find((candidate) => candidate.id === product.categoryId)?.name ??
      'Форменное имущество';

    return Array.from({ length: orderItem.quantity }, (_, quantityIndex) => ({
      productId: product.id,
      name: product.name,
      image: product.image,
      season: product.season,
      category,
      size: orderItem.size,
      issuedAt,
      wearPeriodDays: wearPeriods[itemIndex],
      expiresAt,
      status: 'active' as const,
      sourceOrderId: order.id,
      sourceOrderItemId: `${itemIndex}-${quantityIndex}`,
    }));
  });
}
