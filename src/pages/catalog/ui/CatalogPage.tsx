import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CategoryFilter } from '@/features/filter-by-category';
import { SeasonFilter } from '@/features/filter-by-season';
import { mockCategories } from '@/entities/category';
import { mockProducts } from '@/entities/product';
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
    <div className="page-stack">
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Каталог</p>
            <h1>Форменное имущество</h1>
            <p>Выберите категорию, сезон и размер позиции.</p>
          </div>
        </div>
        <CategoryFilter categories={mockCategories} selected={selectedCategory} onSelect={handleSelectCategory} />
        <SeasonFilter selected={season} onSelect={setSeason} />
      </section>

      <section className="section-block">
        <p className="search-results-count">Найдено позиций: {filteredProducts.length}</p>
        {filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} />
        ) : (
          <div className="empty-state">
            <h2>Позиции не найдены</h2>
            <p>Попробуйте выбрать другую категорию или сезон.</p>
          </div>
        )}
      </section>
    </div>
  );
}
