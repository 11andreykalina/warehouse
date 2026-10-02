import { CategoryCard, mockCategories } from '@/entities/category';

export function CategoryNavigation() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Быстрый переход</p>
          <h2>Категории имущества</h2>
        </div>
      </div>
      <div className="category-grid">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
