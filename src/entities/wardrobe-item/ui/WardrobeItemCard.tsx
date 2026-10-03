import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import type { WardrobeItem } from '../model/types';
import { getDaysUntil } from '../model/expiration';
import { ImageWithFallback } from '@/shared/ui';
import { wardrobeCardSx, wardrobeContentSx, wardrobeImageFrameSx, wardrobeItemNameSx } from './WardrobeItemCard.styles';

function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('ru-RU');
}

function getSeasonLabel(season: WardrobeItem['season']) {
  switch (season) {
    case 'summer':
      return 'Летняя форма';
    case 'winter':
      return 'Зимняя форма';
    case 'demi-season':
      return 'Демисезонная форма';
    case 'all-season':
      return 'Всесезонная форма';
  }
}

export function WardrobeItemCard({
  item,
}: {
  item: WardrobeItem;
}) {
  const daysLeft = item.status === 'active' ? getDaysUntil(item.expiresAt) : null;

  return (
    <Card component="article" sx={wardrobeCardSx}>
      <Stack sx={wardrobeImageFrameSx}>
        <ImageWithFallback src={item.image} alt={item.name} category={item.category} sx={wardrobeImageFrameSx} />
      </Stack>
      <CardContent sx={wardrobeContentSx}>
        <Typography sx={wardrobeItemNameSx}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {getSeasonLabel(item.season)} · {item.category}
        </Typography>
        <Typography variant="body2">Размер {item.size}</Typography>
        <Typography variant="body2" color="text.secondary">
          Получено {formatDate(item.issuedAt)} · срок носки {item.wearPeriodDays} дн.
        </Typography>
        {item.status === 'active' && daysLeft !== null ? (
          <Typography variant="body2" color={daysLeft <= 30 ? 'warning.main' : 'success.main'}>
            Осталось {daysLeft} дн. · до {formatDate(item.expiresAt)}
          </Typography>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              {item.archiveReason === 'manual'
                ? `В архиве с ${formatDate(item.archivedAt ?? item.expiresAt)} · срок носки до ${formatDate(item.expiresAt)}`
                : `Срок носки истёк ${formatDate(item.expiresAt)}.`}
            </Typography>
            {item.archiveReason === 'expired' ? (
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
