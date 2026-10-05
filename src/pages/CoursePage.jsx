import { Button } from "../components/Button.jsx";
import { TariffList } from "../components/TariffList.jsx";
import { getCourseById } from "../data/courses.js";
import { getLecturerById } from "../data/lecturers.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { useRouter } from "../router/context.js";
import { Link } from "../router/Link.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import "./CoursePage.css";

export default function CoursePage() {
  const { params } = useRouter();
  const course = getCourseById(params.id);
  const lecturer = course ? getLecturerById(course.lecturerId) : null;
  const title = course
    ? `${course.title} — Учебная платформа`
    : "Страница не найдена — Учебная платформа";

  usePageTitle(title);

  if (!course || !lecturer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page course-page">
      <p className="course-page__back">
        <Link href="/courses">Все курсы</Link>
      </p>

      <header className="course-page__intro">
        <h1>{course.title}</h1>
        <p className="course-page__lead">{course.description}</p>
        <p className="course-page__lecturer">
          Лектор:{" "}
          <Link href={`/lecturers/${lecturer.id}`}>{lecturer.fullName}</Link>
        </p>
      </header>

      <section className="course-page__section" aria-labelledby="topics-title">
        <h2 id="topics-title">Темы</h2>
        <ol className="course-page__topics">
          {course.topics.map((topic, index) => (
            <li key={`${course.id}-${index}`}>
              <span className="course-page__topic-title">{topic.title}</span>
              {topic.summary ? (
                <span className="course-page__topic-summary">{topic.summary}</span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="course-page__section" aria-labelledby="tariffs-title">
        <h2 id="tariffs-title">Тарифы</h2>
        <TariffList tariffs={lecturer.tariffs} />
      </section>

      <section className="course-page__booking" aria-labelledby="booking-title">
        <h2 id="booking-title">Бронирование</h2>
        <p>
          Имя, почта и короткое описание задачи — этого достаточно, чтобы
          забронировать эту дисциплину.
        </p>
        <Button href={`/contacts?course=${course.id}`} variant="solid">
          Оставить заявку
        </Button>
      </section>
    </div>
  );
}
