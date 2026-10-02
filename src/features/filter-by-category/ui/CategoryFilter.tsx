import type { Category } from '@/entities/category';

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="filter-row">
      <button className={selected === null ? 'chip chip--active' : 'chip'} type="button" onClick={() => onSelect(null)}>
        Все
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={selected === category.id ? 'chip chip--active' : 'chip'}
          type="button"
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
