import { Box } from '@mui/material';

import { OutfitCard, mockOutfits, type Outfit } from '@/entities/outfit';
import { FeedGrid } from '@/shared/ui';
import { outfitRailSx } from './OutfitFeed.styles';

export function OutfitFeed({ outfits = mockOutfits, horizontal = false }: { outfits?: Outfit[]; horizontal?: boolean }) {
  const cards = outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} />);

  if (!horizontal) {
    return <FeedGrid>{cards}</FeedGrid>;
  }

  return (
    <Box
      role="region"
      aria-label="Готовые комплекты"
      tabIndex={0}
      sx={outfitRailSx}
    >
      {cards}
    </Box>
  );
}
