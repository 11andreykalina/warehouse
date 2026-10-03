import { Card, CardContent, Stack, Typography } from '@mui/material';

import type { WardrobeItem } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';
import { wardrobeCardSx, wardrobeContentSx, wardrobeImageFrameSx, wardrobeItemNameSx } from './WardrobeItemCard.styles';

export function WardrobeItemCard({ item }: { item: WardrobeItem }) {
  return (
    <Card component="article" sx={wardrobeCardSx}>
      <Stack sx={wardrobeImageFrameSx}>
        <ImageWithFallback src={item.image} alt={item.name} category={item.category} sx={wardrobeImageFrameSx} />
      </Stack>
      <CardContent sx={wardrobeContentSx}>
        <Typography sx={wardrobeItemNameSx}>{item.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {item.season === 'summer' ? 'Летняя форма' : item.season === 'winter' ? 'Зимняя форма' : 'Демисезонная форма'} · {item.category}
        </Typography>
      </CardContent>
    </Card>
  );
}
