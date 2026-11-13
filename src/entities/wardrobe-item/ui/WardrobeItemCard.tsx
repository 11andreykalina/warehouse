import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { WardrobeItem } from '../model/types';
import { getWardrobeItemCardViewModel } from '../model/getWardrobeItemCardViewModel';
import { ImageWithFallback } from '@/shared/ui';
import { wardrobeCardSx, wardrobeContentSx, wardrobeImageFrameSx, wardrobeItemNameSx } from './WardrobeItemCard.styles';

export function WardrobeItemCard({
  item,
}: {
  item: WardrobeItem;
}) {
  const viewModel = getWardrobeItemCardViewModel(item);

  return (
    <Card component="article" sx={wardrobeCardSx}>
      <Stack sx={wardrobeImageFrameSx}>
        <ImageWithFallback src={item.image} alt={item.name} category={item.category} sx={wardrobeImageFrameSx} />
      </Stack>
      <CardContent sx={wardrobeContentSx}>
        <Typography sx={wardrobeItemNameSx}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {viewModel.seasonLabel} · {item.category}
        </Typography>
        <Typography variant="body2">Размер {item.size}</Typography>
        <Typography variant="body2" color="text.secondary">
          Получено {viewModel.issuedAt} · срок носки {item.wearPeriodDays} дн.
        </Typography>
        {viewModel.isActive && viewModel.daysLeft !== null ? (
          <Typography variant="body2" color={viewModel.daysLeft <= 30 ? 'warning.main' : 'success.main'}>
            Осталось {viewModel.daysLeft} дн. · до {viewModel.expiresAt}
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              {viewModel.archiveDescription}
            </Typography>
            {viewModel.isExpired ? (
              <>
                <Typography variant="body2">
                  Можно оформить заявку на новую вещь в каталоге.
                </Typography>
                <Button component={Link} to="/catalog" size="small">
                  Перейти в каталог
                </Button>
              </>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
