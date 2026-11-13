import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { mockProducts } from '@/entities/product';

export function useSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return mockProducts;
    }

    return mockProducts.filter((product) =>
      `${product.name} ${product.description}`.toLocaleLowerCase('ru-RU').includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const handleSearchChange = (nextQuery: string) => {
    const trimmedQuery = nextQuery.trim();
    setSearchParams(trimmedQuery ? { q: trimmedQuery } : {});
  };

  return { query, normalizedQuery, results, handleSearchChange };
}
