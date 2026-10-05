import { Link } from "../router/Link.jsx";
import "./Footer.css";

const FOOTER_ITEMS = [
  { id: "home", label: "Главная", href: "/" },
  { id: "partners", label: "Партнеры", href: "/#partners" },
  { id: "about", label: "О нас", href: "/#about" },
  { id: "lecturers", label: "Лекторы", href: "/lecturers" },
  { id: "courses", label: "Курсы", href: "/courses" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">Учебная платформа</p>
        <nav aria-label="Разделы сайта">
          <ul className="footer__nav">
            {FOOTER_ITEMS.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer__note">
          Подбор лекторов для компаний, вузов и НКО
        </p>
      </div>
    </footer>
  );
}
