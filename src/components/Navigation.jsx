import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Главная', end: true },
  { to: '/about', label: 'О платформе' },
  { to: '/contact', label: 'Контакты' },
  { to: '/blog', label: 'Блог' },
];

export default function Navigation({ isOpen }) {
  return (
    <nav className="header-nav" aria-label="Основная навигация">
      <ul className={`nav-menu${isOpen ? ' active' : ''}`}>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
