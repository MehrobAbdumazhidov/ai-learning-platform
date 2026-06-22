import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container header-content">
        <Navigation isOpen={menuOpen} />

        <Link className="header-brand" to="/">
          Ai Learning Platform
        </Link>

        <div className="header-actions">
          <a className="header-btn header-btn-secondary" href="#">
            Зарегистрироваться
          </a>
          <a className="header-btn header-btn-primary" href="#">
            Войти
          </a>
          <button
            className="menu-toggle"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
