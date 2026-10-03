import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material';

import type { Outfit } from '../model/types';
import { outfitGenderLabels, outfitSeasonLabels, outfitServiceLabels } from '../model/labels';
import { ImageWithFallback } from '@/shared/ui';
import {
  outfitCardActionSx,
  outfitCardSx,
  outfitContentSx,
  outfitImageFrameSx,
  outfitImageSx,
  outfitMetaSx,
  outfitNameSx,
  outfitActionLabelSx,
} from './OutfitCard.styles';

export function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <Card component="article" sx={outfitCardSx}>
      <CardActionArea component={Link} to={`/outfit/${outfit.id}`} sx={outfitCardActionSx}>
        <Stack sx={outfitImageFrameSx}>
          <ImageWithFallback src={outfit.image} alt={outfit.name} category="Комплект формы" imageSx={outfitImageSx} />
        </Stack>
        <CardContent sx={outfitContentSx}>
          <Typography sx={outfitNameSx}>{outfit.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {outfit.productIds.length > 0
              ? `${outfit.productIds.length} позиций · ${outfit.purpose === 'daily' ? 'повседневный' : outfit.purpose === 'dress' ? 'парадный' : 'специальный'}`
              : 'Состав комплекта готовится'}
          </Typography>
          <Stack direction="row" sx={outfitMetaSx}>
            <Chip label={outfitSeasonLabels[outfit.season]} size="small" />
            <Chip label={outfitServiceLabels[outfit.service]} size="small" variant="outlined" />
            <Chip label={outfitGenderLabels[outfit.gender]} size="small" variant="outlined" />
          </Stack>
          <Typography variant="button" color="primary.main" sx={outfitActionLabelSx}>
            Состав комплекта <ArrowForwardIcon fontSize="small" />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
