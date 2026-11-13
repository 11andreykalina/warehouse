import { Button, Chip, Paper, Stack, Typography } from '@mui/material';

import type { Order } from '../model/types';
import { getOrderCardViewModel } from '../model/getOrderCardViewModel';
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
  const viewModel = getOrderCardViewModel(order, productName, onReceive);

  return (
    <Paper component="article" sx={orderCardSx}>
      <Stack direction="row" sx={orderCardHeaderSx}>
        <Typography variant="subtitle1" sx={orderTitleSx}>{viewModel.title}</Typography>
        <Chip size="small" color={viewModel.statusColor} label={viewModel.status} />
      </Stack>
      <Stack component="ul" spacing={0.5} sx={orderItemsSx}>
        {viewModel.items.map((item) => (
          <Typography component="li" variant="body2" key={item.key}>
            {item.description}
          </Typography>
        ))}
      </Stack>
      <Typography variant="caption" color="text.secondary">Создана {viewModel.createdAt}</Typography>
      {viewModel.canReceive ? (
        <Button size="small" variant="outlined" onClick={viewModel.handleReceive}>
          Подтвердить получение со склада
        </Button>
      ) : null}
    </Paper>
  );
}
