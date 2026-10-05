import { Footer } from "./components/Footer.jsx";
import { NavBar } from "./components/NavBar.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import CoursesPage from "./pages/CoursesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LecturerPage from "./pages/LecturerPage.jsx";
import LecturersPage from "./pages/LecturersPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useRouter } from "./router/context.js";
import { Router } from "./router/Router.jsx";

const NAV_ITEMS = [
  { id: "home", label: "Главная", href: "/" },
  { id: "partners", label: "Партнеры", href: "/#partners" },
  { id: "about", label: "О нас", href: "/#about" },
  { id: "lecturers", label: "Лекторы", href: "/lecturers" },
  { id: "courses", label: "Курсы", href: "/courses" },
];

const routes = [
  { path: "/lecturers/:id", Page: LecturerPage },
  { path: "/lecturers", Page: LecturersPage },
  { path: "/courses/:id", Page: CoursePage },
  { path: "/courses", Page: CoursesPage },
  { path: "/contacts", Page: ContactsPage },
  { path: "/", Page: HomePage },
  { path: "*", Page: NotFoundPage },
];

function getActiveId(pathname, hash) {
  if (pathname.startsWith("/lecturers")) return "lecturers";
  if (pathname.startsWith("/courses")) return "courses";
  if (pathname.startsWith("/contacts")) return "contacts";
  if (pathname === "/") {
    if (hash === "#partners") return "partners";
    if (hash === "#about") return "about";
    return "home";
  }
  return null;
}

function AppShell() {
  const { location, route } = useRouter();
  const Page = route?.Page ?? NotFoundPage;
  const activeId = getActiveId(location.pathname, location.hash);

  return (
    <div className="layout">
      <a className="skip-link" href="#main">
        К содержимому
      </a>
      <header className="layout__header">
        <NavBar items={NAV_ITEMS} activeId={activeId} />
      </header>
      <main id="main" className="layout__main" tabIndex={-1}>
        <Page />
      </main>
      <div className="layout__footer">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router routes={routes}>
      <AppShell />
    </Router>
  );
}
