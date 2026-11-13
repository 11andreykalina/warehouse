import { mockCategories } from '@/entities/category';
import { getApplicableProductEntitlements, type Product } from '@/entities/product';
import type { UniformEligibilityProfile } from '@/shared/model';

export function getProductFeedViewModel(
  products: Product[],
  entitlementProfile?: UniformEligibilityProfile,
) {
  return products.map((product) => ({
    product,
    entitlements: entitlementProfile
      ? getApplicableProductEntitlements(product, entitlementProfile)
      : product.entitlements,
    categoryName:
      mockCategories.find((category) => category.id === product.categoryId)?.name ??
      'Форменное имущество',
  }));
}
