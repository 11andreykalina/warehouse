import type { Outfit } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';

export function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <article className="outfit-card">
      <div className="outfit-card__image">
        <ImageWithFallback src={outfit.image} alt={outfit.name} category="Комплект формы" className="outfit-card__image-content" />
      </div>
      <div className="outfit-card__content">
        <strong>{outfit.name}</strong>
        <small>
          {outfit.season === 'summer' ? 'Летний' : outfit.season === 'winter' ? 'Зимний' : 'Демисезонный'} комплект ·{' '}
          {outfit.purpose === 'daily' ? 'повседневный' : outfit.purpose === 'dress' ? 'парадный' : 'специальный'}
        </small>
      </div>
    </article>
  );
}
