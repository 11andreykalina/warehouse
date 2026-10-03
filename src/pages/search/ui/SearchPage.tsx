import { useMemo, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { SearchProducts } from '@/features/search-products';
import { mockProducts } from '@/entities/product';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
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
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="Поиск по каталогу" title="Найдите нужную позицию" />
        <SearchProducts value={query} onChange={setQuery} />
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
