type Season = 'all' | 'summer' | 'demi-season' | 'winter';

export function SeasonFilter({ selected, onSelect }: { selected: Season; onSelect: (season: Season) => void }) {
  const options: Season[] = ['all', 'summer', 'demi-season', 'winter'];

  return (
    <div className="filter-row">
      {options.map((season) => (
        <button
          key={season}
          className={selected === season ? 'chip chip--active' : 'chip'}
          type="button"
          onClick={() => onSelect(season)}
        >
          {season === 'all'
            ? 'Все сезоны'
            : season === 'summer'
              ? 'Лето'
              : season === 'demi-season'
                ? 'Демисезон'
                : 'Зима'}
        </button>
      ))}
    </div>
  );
}
