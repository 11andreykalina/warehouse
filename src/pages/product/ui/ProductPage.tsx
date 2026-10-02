import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { mockCategories } from '@/entities/category';
import { mockProducts, type Product } from '@/entities/product';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductSizeSelector } from '@/features/select-product-size';
import { ImageWithFallback } from '@/shared/ui';

function getReturnTo(state: unknown) {
  if (
    typeof state === 'object' &&
    state !== null &&
    'returnTo' in state &&
    typeof state.returnTo === 'string' &&
    state.returnTo.startsWith('/') &&
    !state.returnTo.startsWith('//')
  ) {
    return state.returnTo;
  }

  return '/catalog';
}

function ProductDetails({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const category = mockCategories.find((item) => item.id === product.categoryId)?.name ?? 'Форменное имущество';

  return (
    <article className="product-page">
      <div className="product-page__image">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          category={category}
          className="product-page__image-content"
        />
      </div>
      <div className="product-page__content">
        <div>
          <p className="eyebrow">{category}</p>
          <h1>{product.name}</h1>
        </div>
        <p className="product-page__description">{product.description}</p>
        {product.availableSizes.length > 0 ? (
          <ProductSizeSelector
            sizes={product.availableSizes}
            selected={selectedSize}
            onSelect={setSelectedSize}
          />
        ) : (
          <p className="form-error">Для этой позиции пока не указаны размеры.</p>
        )}
        <AddToCartButton productId={product.id} size={selectedSize} disabled={!selectedSize} />
      </div>
    </article>
  );
}

export function ProductPage() {
  const location = useLocation();
  const { id } = useParams();
  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Позиция не найдена</h2>
        <p>Возможно, её больше нет в каталоге.</p>
        <Link className="button button--secondary" to="/catalog">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <Link className="button button--secondary" to={getReturnTo(location.state)}>
        ← Назад
      </Link>
      <ProductDetails key={product.id} product={product} />
    </div>
  );
}
