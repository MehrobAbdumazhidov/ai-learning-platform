import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
        {theme === 'dark' ? '☀️ Светлая тема' : '🌙 Сменить тему'}
      </button>
    </div>
  );
}
