import { Link } from 'react-router-dom';

import type { Category } from '../model/types';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link className="category-card" to={`/catalog?category=${category.id}`}>
      <span>{category.name}</span>
      <span className="category-card__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
