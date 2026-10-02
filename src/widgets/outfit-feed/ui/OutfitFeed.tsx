import { OutfitCard, mockOutfits } from '@/entities/outfit';

export function OutfitFeed() {
  return (
    <div className="product-grid">
      {mockOutfits.map((outfit) => (
        <OutfitCard key={outfit.id} outfit={outfit} />
      ))}
    </div>
  );
}
