import { Link, useLocation } from 'react-router-dom';

import type { Product } from '../model/types';
import { ImageWithFallback } from '@/shared/ui';

export function ProductCard({ product, categoryName }: { product: Product; categoryName: string }) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}${location.hash}`;
  const state = { returnTo };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} state={state} className="product-card__link">
        <div className="product-card__image">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            category={categoryName}
            className="product-card__image-content"
          />
        </div>
        <div className="product-card__content">
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__description">{product.description}</p>
          <div className="product-card__sizes" aria-label={`Доступные размеры: ${product.availableSizes.join(', ')}`}>
            {product.availableSizes.map((size) => (
              <span key={size} className="product-card__size">
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="product-card__content product-card__content--action">
        <Link className="button button--secondary product-card__action" to={`/product/${product.id}`} state={state}>
          Выбрать размер
        </Link>
      </div>
    </article>
  );
}
