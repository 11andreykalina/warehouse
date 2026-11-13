import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { mockCategories } from '@/entities/category';
import {
  cartItemQuantityUpdated,
  cartItemRemoved,
  useCartItems,
} from '@/entities/cart';
import { mockProducts } from '@/entities/product';

export function useCartItemsModel() {
  const dispatch = useDispatch();
  const items = useCartItems();

  const entries = useMemo(
    () =>
      items.map((item) => {
        const product = mockProducts.find((entry) => entry.id === item.productId);
        const categoryName = product
          ? mockCategories.find((entry) => entry.id === product.categoryId)?.name ?? 'Форменное имущество'
          : 'Позиция каталога';

        return {
          ...item,
          product,
          categoryName,
          decrease: () =>
            dispatch(
              cartItemQuantityUpdated({
                productId: item.productId,
                size: item.size,
                quantity: item.quantity - 1,
              }),
            ),
          increase: () =>
            dispatch(
              cartItemQuantityUpdated({
                productId: item.productId,
                size: item.size,
                quantity: item.quantity + 1,
              }),
            ),
          remove: () => dispatch(cartItemRemoved({ productId: item.productId, size: item.size })),
        };
      }),
    [dispatch, items],
  );

  return { entries };
}
