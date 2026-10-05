import { lecturerPhoto } from "../api/photos.js";
import { Button } from "../components/Button.jsx";
import { LecturerMeta } from "../components/LecturerMeta.jsx";
import { LecturerPortrait } from "../components/LecturerPortrait.jsx";
import { TariffList } from "../components/TariffList.jsx";
import { getCoursesByLecturerId } from "../data/courses.js";
import { getLecturerById } from "../data/lecturers.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { useRouter } from "../router/context.js";
import { Link } from "../router/Link.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import "./LecturerPage.css";

export default function LecturerPage() {
  const { params } = useRouter();
  const lecturer = getLecturerById(params.id);
  const title = lecturer
    ? `${lecturer.fullName} — Учебная платформа`
    : "Страница не найдена — Учебная платформа";

  usePageTitle(title);

  if (!lecturer) {
    return <NotFoundPage />;
  }

  const courses = getCoursesByLecturerId(lecturer.id);
  const photo = lecturerPhoto(lecturer.id);

  return (
    <div className="page lecturer-page">
      <p className="lecturer-page__back">
        <Link href="/lecturers">Все лекторы</Link>
      </p>

      <header className="lecturer-page__hero">
        <LecturerPortrait
          src={photo.src}
          fallbackSrc={photo.fallbackSrc}
          fullName={lecturer.fullName}
          loading="eager"
        />
        <div className="lecturer-page__intro">
          <h1>{lecturer.fullName}</h1>
          <LecturerMeta
            education={lecturer.education}
            experienceYears={lecturer.experienceYears}
            degree={lecturer.degree}
          />
          <Button href={`/contacts?lecturer=${lecturer.id}`} variant="solid">
            Оставить заявку
          </Button>
        </div>
      </header>

      <section className="lecturer-page__section" aria-labelledby="disciplines-title">
        <h2 id="disciplines-title">Дисциплины</h2>
        <div className="lecturer-page__courses">
          {courses.map((course) => (
            <article
              key={course.id}
              className="lecturer-course"
              aria-labelledby={`course-${course.id}`}
            >
              <h3 id={`course-${course.id}`}>
                <Link href={`/courses/${course.id}`}>{course.title}</Link>
              </h3>
              <p className="lecturer-course__lead">{course.description}</p>
              <ol className="lecturer-course__topics">
                {course.topics.map((topic, index) => (
                  <li key={`${course.id}-${index}`}>
                    <span className="lecturer-course__topic-title">
                      {topic.title}
                    </span>
                    {topic.summary ? (
                      <span className="lecturer-course__topic-summary">
                        {topic.summary}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="lecturer-page__section" aria-labelledby="tariffs-title">
        <h2 id="tariffs-title">Тарифы</h2>
        <TariffList tariffs={lecturer.tariffs} />
      </section>

      <section className="lecturer-page__booking" aria-labelledby="booking-title">
        <h2 id="booking-title">Заявка</h2>
        <p>
          Имя, почта и короткое описание задачи — этого достаточно, чтобы
          пригласить лектора.
        </p>
        <Button href={`/contacts?lecturer=${lecturer.id}`} variant="solid">
          Оставить заявку
        </Button>
      </section>
    </div>
  );
}
