import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { cartItemsAdded } from '@/entities/cart';
import type { Product } from '@/entities/product';

export function useAddOutfitToCart(products: Product[], disabled: boolean) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [notificationOpen, setNotificationOpen] = useState(false);
  const hasAllSizes = products.length > 0 && products.every((product) => selectedSizes[product.id]);
  const isButtonDisabled = disabled || products.length === 0;

  const handleOpen = () => {
    setSelectedSizes({});
    setDialogOpen(true);
  };

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((current) => ({ ...current, [productId]: size }));
  };

  const handleAdd = () => {
    if (!hasAllSizes) return;

    dispatch(
      cartItemsAdded(
        products.map((product) => ({ productId: product.id, size: selectedSizes[product.id] })),
      ),
    );
    setDialogOpen(false);
    setNotificationOpen(true);
  };

  const handleCloseDialog = () => setDialogOpen(false);
  const handleCloseNotification = () => setNotificationOpen(false);

  return {
    dialogOpen,
    selectedSizes,
    notificationOpen,
    hasAllSizes,
    isButtonDisabled,
    handleOpen,
    handleSizeChange,
    handleAdd,
    handleCloseDialog,
    handleCloseNotification,
  };
}
