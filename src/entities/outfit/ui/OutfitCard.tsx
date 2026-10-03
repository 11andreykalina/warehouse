import { Card, CardContent, Stack, Typography } from '@mui/material';

import type { Outfit } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';
import { outfitCardSx, outfitContentSx, outfitImageFrameSx, outfitNameSx } from './OutfitCard.styles';

export function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <Card component="article" sx={outfitCardSx}>
      <Stack sx={outfitImageFrameSx}>
        <ImageWithFallback src={outfit.image} alt={outfit.name} category="Комплект формы" sx={outfitImageFrameSx} />
      </Stack>
      <CardContent sx={outfitContentSx}>
        <Typography sx={outfitNameSx}>{outfit.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {outfit.season === 'summer' ? 'Летний' : outfit.season === 'winter' ? 'Зимний' : 'Демисезонный'} комплект ·{' '}
          {outfit.purpose === 'daily' ? 'повседневный' : outfit.purpose === 'dress' ? 'парадный' : 'специальный'}
        </Typography>
      </CardContent>
    </Card>
  );
}
