import { useParams } from 'react-router-dom';

import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';

export function useProductPage() {
  const { id } = useParams();
  const product = mockProducts.find((item) => item.id === id);
  const categoryName = product
    ? mockCategories.find((item) => item.id === product.categoryId)?.name ?? 'Форменное имущество'
    : 'Форменное имущество';

  return { product, categoryName };
}
