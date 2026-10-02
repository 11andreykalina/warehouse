import { useMemo, useState } from 'react';

import { SearchProducts } from '@/features/search-products';
import { mockProducts } from '@/entities/product';
import { ProductFeed } from '@/widgets/product-feed';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return mockProducts;
    }

    return mockProducts.filter((product) =>
      `${product.name} ${product.description}`.toLocaleLowerCase('ru-RU').includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  return (
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Поиск по каталогу</p>
            <h1>Найдите нужную позицию</h1>
          </div>
        </div>
        <SearchProducts value={query} onChange={setQuery} />
      </section>
      <section className="section-block">
        <p className="search-results-count">
          {normalizedQuery ? `Найдено позиций: ${results.length}` : `В каталоге позиций: ${results.length}`}
        </p>
        {results.length > 0 ? (
          <ProductFeed products={results} />
        ) : (
          <div className="empty-state">
            <h2>Ничего не найдено</h2>
            <p>Проверьте запрос или попробуйте другое название.</p>
          </div>
        )}
      </section>
    </div>
  );
}
