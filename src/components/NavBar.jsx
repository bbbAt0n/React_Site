import { Link } from "../router/Link.jsx";
import "./NavBar.css";

const DEFAULT_ITEMS = [
  { id: "home", label: "Главная", href: "/" },
  { id: "partners", label: "Партнеры", href: "/#partners" },
  { id: "about", label: "О нас", href: "/#about" },
  { id: "lecturers", label: "Лекторы", href: "/lecturers" },
  { id: "courses", label: "Курсы", href: "/courses" },
];

export function NavBar({ items = DEFAULT_ITEMS, activeId = "home" }) {
  return (
    <nav className="navbar" aria-label="Основная навигация">
      <ul className="navbar__bar">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="navbar__link"
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
