import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';

import { Button, ImageWithFallback } from '@/shared/ui';
import { useCartItemsModel } from '../model/useCartItemsModel';
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
  const { entries } = useCartItemsModel();

  if (entries.length === 0) {
    return (
      <Paper sx={emptyCartSx}>
        <Typography variant="h6" gutterBottom>Заявка пока пуста</Typography>
        <Typography color="text.secondary">Добавьте позиции из каталога, чтобы отправить заявку на получение.</Typography>
      </Paper>
    );
  }

  return (
    <Stack sx={cartListSx}>
      {entries.map((item) => (
        <Paper key={`${item.productId}-${item.size}`} sx={cartItemSx}>
          <Box sx={cartItemImageSx}>
            <ImageWithFallback
              src={item.product?.image ?? ''}
              alt={item.product?.name ?? 'Позиция больше недоступна'}
              category={item.categoryName}
              sx={cartItemImageSx}
            />
          </Box>
          <Stack sx={cartItemDetailsSx}>
            <Typography sx={cartProductNameSx}>{item.product?.name ?? 'Позиция больше недоступна в каталоге'}</Typography>
            <Typography variant="body2" color="text.secondary">Размер: {item.size}</Typography>
          </Stack>
          <Box sx={cartItemActionsSx}>
            <Stack direction="row" spacing={0.5} aria-label={`Количество: ${item.quantity}`} sx={quantityControlSx}>
              <IconButton
                size="small"
                aria-label={`Уменьшить количество позиции ${item.product?.name ?? item.productId}`}
                onClick={item.decrease}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography aria-live="polite" sx={cartQuantitySx}>{item.quantity}</Typography>
              <IconButton
                size="small"
                aria-label={`Увеличить количество позиции ${item.product?.name ?? item.productId}`}
                onClick={item.increase}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Button type="button" variant="text" onClick={item.remove}>
              Удалить
            </Button>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}
