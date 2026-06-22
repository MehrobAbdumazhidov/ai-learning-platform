export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Поиск статей..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="search-btn" type="button" aria-label="Искать">
        🔍
      </button>
    </div>
  );
}
