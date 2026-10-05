import { useMemo } from "react";
import { lecturerPhoto } from "../api/photos.js";
import { Button } from "../components/Button.jsx";
import { LecturerCard } from "../components/LecturerCard.jsx";
import { courses, getCoursesByLecturerId } from "../data/courses.js";
import { formatLecturersCount } from "../data/format.js";
import { lecturers } from "../data/lecturers.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { useRouter } from "../router/context.js";
import "./LecturersPage.css";

function setSearchHref(value) {
  const params = new URLSearchParams();
  if (value) params.set("q", value);
  const search = params.toString();
  return search ? `/lecturers?${search}` : "/lecturers";
}

function matchesQuery(lecturer, courseTitles, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    lecturer.fullName,
    lecturer.education,
    lecturer.degree ?? "",
    ...courseTitles,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(needle);
}

export default function LecturersPage() {
  const { location, navigate } = useRouter();
  const query = new URLSearchParams(location.search).get("q") ?? "";

  usePageTitle("Лекторы — Учебная платформа");

  const rows = useMemo(
    () =>
      lecturers.map((lecturer) => {
        const lecturerCourses = getCoursesByLecturerId(lecturer.id);
        const lead = lecturerCourses[0];
        const teaser = lead
          ? `${lead.title} — ${lead.description}`
          : lecturer.teaser;

        return {
          lecturer,
          courses: lecturerCourses,
          teaser,
        };
      }),
    [],
  );

  const visible = rows.filter((row) =>
    matchesQuery(
      row.lecturer,
      row.courses.map((course) => course.title),
      query,
    ),
  );

  function onQueryChange(value) {
    navigate(setSearchHref(value), { replace: true });
  }

  return (
    <div className="page lecturers-page">
      <header className="lecturers-page__header">
        <h1>Лекторы</h1>
        <p>
          Десять преподавателей, у каждого — три дисциплины, десять тем и три
          тарифа. Откройте профиль или сразу оставьте заявку.
        </p>
      </header>

      <form
        className="lecturers-page__search"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="field">
          <label htmlFor="discipline-search">Поиск</label>
          <input
            className="field-input"
            id="discipline-search"
            name="q"
            type="search"
            value={query}
            placeholder="Петров или биохимия"
            autoComplete="off"
            list="discipline-options"
            aria-describedby="discipline-search-hint"
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <p className="field__hint" id="discipline-search-hint">
            Поиск по имени и дисциплине
          </p>
          <datalist id="discipline-options">
            {courses.map((course) => (
              <option key={course.id} value={course.title} />
            ))}
          </datalist>
        </div>
      </form>

      <p className="lecturers-page__status" role="status">
        {query.trim()
          ? visible.length
            ? `${formatLecturersCount(visible.length)} по запросу «${query.trim()}»`
            : `Нет лекторов по запросу «${query.trim()}»`
          : ""}
      </p>

      {visible.length ? (
        <ul className="lecturers-page__grid">
          {visible.map(({ lecturer, courses: lecturerCourses, teaser }) => {
            const photo = lecturerPhoto(lecturer.id);

            return (
              <li key={lecturer.id}>
                <LecturerCard
                  photo={photo.src}
                  photoFallback={photo.fallbackSrc}
                  fullName={lecturer.fullName}
                  degree={lecturer.degree}
                  education={lecturer.education}
                  experienceYears={lecturer.experienceYears}
                  disciplines={lecturerCourses.map((course) => course.title)}
                  teaser={teaser}
                  tariffs={lecturer.tariffs}
                  href={`/lecturers/${lecturer.id}`}
                  bookingHref={`/contacts?lecturer=${lecturer.id}`}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="empty-state lecturers-page__empty">
          <h2>Никого не нашли</h2>
          <p>
            Нет лекторов по запросу «{query.trim()}». Проверьте имя или
            дисциплину — либо сбросьте поиск. В каталоге десять преподавателей.
          </p>
          <Button href="/lecturers">Сбросить поиск</Button>
        </div>
      )}
    </div>
  );
}
