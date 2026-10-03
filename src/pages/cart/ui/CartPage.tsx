import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';

import { useCartItems } from '@/entities/cart';
import type { Order } from '@/entities/order';
import { CreateOrderButton } from '@/features/create-order';
import { PageStack, SectionHeading } from '@/shared/ui';
import { CartItems } from '@/widgets/cart-items';
import { cartPageSectionSx, cartSummarySx } from './CartPage.styles';

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartItems();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitted = (order: Order) => {
    navigate('/orders', { state: { submittedOrderId: order.id } });
  };

  return (
    <PageStack>
      <Stack component="section" sx={cartPageSectionSx}>
        <SectionHeading eyebrow="Заявка на получение" title="Выбранные позиции" />
        <CartItems />
        {items.length > 0 ? (
          <Box sx={cartSummarySx}>
            <Typography variant="body2" color="text.secondary">
              Позиций: {items.length}, всего единиц: {totalQuantity}
            </Typography>
            <CreateOrderButton onSubmitted={handleSubmitted} />
          </Box>
        ) : null}
      </Stack>
    </PageStack>
  );
}
