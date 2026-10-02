import type { WardrobeItem } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';

export function WardrobeItemCard({ item }: { item: WardrobeItem }) {
  return (
    <article className="wardrobe-item-card">
      <div className="wardrobe-item-card__image">
        <ImageWithFallback src={item.image} alt={item.name} category={item.category} className="wardrobe-item-card__image-content" />
      </div>
      <div className="wardrobe-item-card__content">
        <strong>{item.name}</strong>
        <small>
          {item.season === 'summer' ? 'Летняя форма' : item.season === 'winter' ? 'Зимняя форма' : 'Демисезонная форма'} · {item.category}
        </small>
      </div>
    </article>
  );
}
