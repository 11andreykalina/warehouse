import { useLocation, useParams } from 'react-router-dom';

import { mockCategories } from '@/entities/category';
import { mockOutfits } from '@/entities/outfit';
import { mockProducts, type Product } from '@/entities/product';

export function useOutfitPage() {
  const { id } = useParams();
  const location = useLocation();
  const outfit = mockOutfits.find((item) => item.id === id);
  const products = outfit
    ? outfit.productIds
        .map((productId) => mockProducts.find((product) => product.id === productId))
        .filter((product): product is Product => product !== undefined)
    : [];
  const productEntries = products.map((product) => ({
    ...product,
    categoryName:
      mockCategories.find((category) => category.id === product.categoryId)?.name ??
      'Форменное имущество',
  }));
  const hasMissingProducts = outfit ? products.length !== outfit.productIds.length : false;
  const hasNoProducts = products.length === 0;
  const productDescription = hasNoProducts
    ? 'Состав этого комплекта ещё формируется.'
    : `В комплект входит ${products.length} ${products.length === 1 ? 'позиция' : 'позиций'}. Выберите размер каждой позиции, чтобы добавить комплект в заявку.`;
  const returnTo = `${location.pathname}${location.search}${location.hash}`;

  return {
    outfit,
    products,
    productEntries,
    hasMissingProducts,
    hasNoProducts,
    productDescription,
    returnTo,
  };
}
