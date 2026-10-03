import { FeedGrid } from '@/shared/ui';
import { mockCategories } from '@/entities/category';
import type { Product } from '@/entities/product';
import { getApplicableProductEntitlements, ProductCard } from '@/entities/product';
import type { UniformEligibilityProfile } from '@/shared/model';

export function ProductFeed({
  products,
  entitlementProfile,
}: {
  products: Product[];
  entitlementProfile?: UniformEligibilityProfile;
}) {
  return (
    <FeedGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          entitlements={
            entitlementProfile
              ? getApplicableProductEntitlements(product, entitlementProfile)
              : product.entitlements
          }
          categoryName={
            mockCategories.find((category) => category.id === product.categoryId)?.name ??
            'Форменное имущество'
          }
        />
      ))}
    </FeedGrid>
  );
}
