import { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { SearchProducts } from '@/features/search-products';
import { mockProducts } from '@/entities/product';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { ProductFeed } from '@/widgets/product-feed';

export function SearchPage() {
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

  return (
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="Поиск по каталогу" title="Найдите нужную позицию" />
        <SearchProducts value={query} onChange={handleSearchChange} />
      </Stack>
      <Stack component="section" spacing={2}>
        <Typography variant="body2" color="text.secondary">
          {normalizedQuery ? `Найдено позиций: ${results.length}` : `В каталоге позиций: ${results.length}`}
        </Typography>
        {results.length > 0 ? (
          <ProductFeed products={results} />
        ) : (
          <EmptyState title="Ничего не найдено" description="Проверьте запрос или попробуйте другое название." />
        )}
      </Stack>
    </PageStack>
  );
}
