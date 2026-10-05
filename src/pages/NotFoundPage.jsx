import { Button } from "../components/Button.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";

export default function NotFoundPage() {
  usePageTitle("Страница не найдена — Учебная платформа");

  return (
    <div className="page empty-state">
      <p className="empty-state__code" aria-hidden="true">
        404
      </p>
      <h1>Страница не найдена</h1>
      <p>
        Такого адреса на сайте нет. Откройте главную или выберите лектора в
        каталоге.
      </p>
      <div className="empty-state__actions">
        <Button href="/" variant="solid">
          На главную
        </Button>
        <Button href="/lecturers">К лекторам</Button>
      </div>
    </div>
  );
}
