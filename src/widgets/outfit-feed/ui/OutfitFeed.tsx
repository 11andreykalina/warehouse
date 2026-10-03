import { FeedGrid } from '@/shared/ui';
import { OutfitCard, mockOutfits } from '@/entities/outfit';

export function OutfitFeed() {
  return (
    <FeedGrid>
      {mockOutfits.map((outfit) => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </FeedGrid>
  );
}
