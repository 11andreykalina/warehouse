export function ProductSizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="size-selector">
      <p className="size-selector__label" id="size-selector-label">
        Выберите размер
      </p>
      <div className="size-picker" role="group" aria-labelledby="size-selector-label">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={selected === size ? 'chip chip--active' : 'chip'}
            aria-pressed={selected === size}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
