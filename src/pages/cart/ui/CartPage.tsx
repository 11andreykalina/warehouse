import { Box, Stack, Typography } from '@mui/material';

import { CreateOrderButton } from '@/features/create-order';
import { PageStack, SectionHeading } from '@/shared/ui';
import { CartItems } from '@/widgets/cart-items';
import { useCartPage } from '../model/useCartPage';
import { cartPageSectionSx, cartSummarySx } from './CartPage.styles';

export function CartPage() {
  const { items, totalQuantity, handleSubmitted } = useCartPage();

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
