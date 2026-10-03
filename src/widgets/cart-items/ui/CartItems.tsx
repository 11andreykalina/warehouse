import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';

import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';
import { removeFromCart, updateCartItemQuantity, useCartItems } from '@/entities/cart';
import { Button, ImageWithFallback } from '@/shared/ui';
import {
  cartItemActionsSx,
  cartItemDetailsSx,
  cartItemImageSx,
  cartItemSx,
  cartListSx,
  cartProductNameSx,
  cartQuantitySx,
  emptyCartSx,
  quantityControlSx,
} from './CartItems.styles';

export function CartItems() {
  const items = useCartItems();

  if (items.length === 0) {
    return (
      <Paper sx={emptyCartSx}>
        <Typography variant="h6" gutterBottom>Заявка пока пуста</Typography>
        <Typography color="text.secondary">Добавьте позиции из каталога, чтобы отправить заявку на получение.</Typography>
      </Paper>
    );
  }

  return (
    <Stack sx={cartListSx}>
      {items.map((item) => {
        const product = mockProducts.find((entry) => entry.id === item.productId);
        const category = product
          ? mockCategories.find((entry) => entry.id === product.categoryId)?.name ?? 'Форменное имущество'
          : 'Позиция каталога';

        return (
          <Paper key={`${item.productId}-${item.size}`} sx={cartItemSx}>
            <Box sx={cartItemImageSx}>
              <ImageWithFallback
                src={product?.image ?? ''}
                alt={product?.name ?? 'Позиция больше недоступна'}
                category={category}
                sx={cartItemImageSx}
              />
            </Box>
            <Stack sx={cartItemDetailsSx}>
              <Typography sx={cartProductNameSx}>{product?.name ?? 'Позиция больше недоступна в каталоге'}</Typography>
              <Typography variant="body2" color="text.secondary">Размер: {item.size}</Typography>
            </Stack>
            <Box sx={cartItemActionsSx}>
              <Stack direction="row" spacing={0.5} aria-label={`Количество: ${item.quantity}`} sx={quantityControlSx}>
                <IconButton
                  size="small"
                  aria-label={`Уменьшить количество позиции ${product?.name ?? item.productId}`}
                  onClick={() => updateCartItemQuantity(item.productId, item.size, item.quantity - 1)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography aria-live="polite" sx={cartQuantitySx}>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  aria-label={`Увеличить количество позиции ${product?.name ?? item.productId}`}
                  onClick={() => updateCartItemQuantity(item.productId, item.size, item.quantity + 1)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Stack>
              <Button type="button" variant="text" onClick={() => removeFromCart(item.productId, item.size)}>
                Удалить
              </Button>
            </Box>
          </Paper>
        );
      })}
    </Stack>
  );
}
