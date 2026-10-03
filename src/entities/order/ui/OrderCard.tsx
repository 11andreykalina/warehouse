import { Button, Chip, Paper, Stack, Typography } from '@mui/material';

import type { Order } from '../model/types';
import { orderCardHeaderSx, orderCardSx, orderItemsSx, orderTitleSx } from './OrderCard.styles';

export function OrderCard({
  order,
  productName,
  onReceive,
}: {
  order: Order;
  productName: (productId: string) => string | undefined;
  onReceive?: (order: Order) => void;
}) {
  const status =
    order.status === 'submitted'
      ? 'Отправлена'
      : order.status === 'approved'
        ? 'Согласована'
        : 'Выдана';

  return (
    <Paper component="article" sx={orderCardSx}>
      <Stack direction="row" sx={orderCardHeaderSx}>
        <Typography variant="subtitle1" sx={orderTitleSx}>Заявка {order.id.slice(-8)}</Typography>
        <Chip size="small" color={order.status === 'submitted' ? 'primary' : 'default'} label={status} />
      </Stack>
      <Stack component="ul" spacing={0.5} sx={orderItemsSx}>
        {order.items.map((item) => {
          return (
            <Typography component="li" variant="body2" key={`${item.productId}-${item.size}`}>
              {productName(item.productId) ?? 'Позиция каталога'} — размер {item.size}, {item.quantity} шт.
            </Typography>
          );
        })}
      </Stack>
      <Typography variant="caption" color="text.secondary">Создана {new Date(order.createdAt).toLocaleDateString('ru-RU')}</Typography>
      {order.status !== 'issued' && onReceive ? (
        <Button size="small" variant="outlined" onClick={() => onReceive(order)}>
          Подтвердить получение со склада
        </Button>
      ) : null}
    </Paper>
  );
}
