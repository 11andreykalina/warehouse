import { Stack, Typography } from '@mui/material';

import { SearchProducts } from '@/features/search-products';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { ProductFeed } from '@/widgets/product-feed';
import { useSearchPage } from '../model/useSearchPage';

export function SearchPage() {
  const { query, normalizedQuery, results, handleSearchChange } = useSearchPage();

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
