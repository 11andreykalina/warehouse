import type { Order } from '@/entities/order';
import { mockCategories } from '@/entities/category';
import {
  getProductWearEntitlement,
  mockProducts,
} from '@/entities/product';
import type { UniformEligibilityProfile } from '@/shared/model';
import {
  addDaysToDate,
  getDaysForPeriod,
  getLocalDate,
  type WardrobeItem,
} from '@/entities/wardrobe-item';

export function receiveOrder(
  order: Order,
  profile: UniformEligibilityProfile,
): Omit<WardrobeItem, 'id'>[] {
  if (order.status === 'issued') {
    throw new Error('The order is already issued.');
  }

  const issuedAt = getLocalDate();
  return order.items.flatMap((orderItem, itemIndex) => {
    const product = mockProducts.find((candidate) => candidate.id === orderItem.productId);
    if (!product) {
      throw new Error(`Product ${orderItem.productId} is missing from the catalog.`);
    }

    const entitlement = getProductWearEntitlement(product, profile);

    const wearPeriodDays = getDaysForPeriod(issuedAt, entitlement.period);
    const expiresAt = addDaysToDate(issuedAt, wearPeriodDays);
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
      wearPeriodDays,
      expiresAt,
      status: 'active' as const,
      sourceOrderId: order.id,
      sourceOrderItemId: `${itemIndex}-${quantityIndex}`,
    }));
  });
}
