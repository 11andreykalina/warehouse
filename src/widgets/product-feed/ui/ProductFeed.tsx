import { FeedGrid } from '@/shared/ui';
import { mockCategories } from '@/entities/category';
import type { Product } from '@/entities/product';
import { ProductCard } from '@/entities/product';

export function ProductFeed({ products }: { products: Product[] }) {
  return (
    <FeedGrid>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryName={
            mockCategories.find((category) => category.id === product.categoryId)?.name ??
            'Форменное имущество'
          }
        />
      ))}
    </FeedGrid>
  );
}
