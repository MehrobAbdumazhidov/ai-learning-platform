const filters = [
  { value: 'all', label: 'Все' },
  { value: 'ai', label: 'AI' },
  { value: 'web', label: 'Web' },
  { value: 'business', label: 'Бизнес' },
];

export default function FilterButtons({ active, onChange }) {
  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={active === filter.value ? 'active' : ''}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
