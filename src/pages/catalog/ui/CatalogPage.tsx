import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import { CategoryFilter } from '@/features/filter-by-category';
import { SeasonFilter } from '@/features/filter-by-season';
import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';
import { EmptyState, PageStack, SectionHeading } from '@/shared/ui';
import { ProductFeed } from '@/widgets/product-feed';

type Season = 'all' | 'summer' | 'demi-season' | 'winter';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [season, setSeason] = useState<Season>('all');

  const filteredProducts = useMemo(
    () =>
      mockProducts.filter((product) => {
        const categoryMatches = selectedCategory ? product.categoryId === selectedCategory : true;
        const seasonMatches =
          season === 'all' || product.season === season || product.season === 'all-season';

        return categoryMatches && seasonMatches;
      }),
    [selectedCategory, season],
  );

  const handleSelectCategory = (categoryId: string | null) => {
    setSearchParams(categoryId ? { category: categoryId } : {});
  };

  return (
    <PageStack>
      <Stack component="section" spacing={2.5}>
        <SectionHeading eyebrow="Каталог" title="Форменное имущество" description="Выберите категорию, сезон и размер позиции." />
        <CategoryFilter categories={mockCategories} selected={selectedCategory} onSelect={handleSelectCategory} />
        <SeasonFilter selected={season} onSelect={setSeason} />
      </Stack>

      <Stack component="section" spacing={2}>
        <Typography variant="body2" color="text.secondary">Найдено позиций: {filteredProducts.length}</Typography>
        {filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} />
        ) : (
          <EmptyState title="Позиции не найдены" description="Попробуйте выбрать другую категорию или сезон." />
        )}
      </Stack>
    </PageStack>
  );
}
