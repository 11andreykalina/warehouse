import { FeedGrid } from '@/shared/ui';
import type { Product } from '@/entities/product';
import { ProductCard } from '@/entities/product';
import type { UniformEligibilityProfile } from '@/shared/model';
import { getProductFeedViewModel } from '../model/productFeed';

export function ProductFeed({
  products,
  entitlementProfile,
}: {
  products: Product[];
  entitlementProfile?: UniformEligibilityProfile;
}) {
  const feedItems = getProductFeedViewModel(products, entitlementProfile);

  return (
    <FeedGrid>
      {feedItems.map(({ product, entitlements, categoryName }) => (
        <ProductCard
          key={product.id}
          product={product}
          entitlements={entitlements}
          categoryName={categoryName}
        />
      ))}
    </FeedGrid>
  );
}
