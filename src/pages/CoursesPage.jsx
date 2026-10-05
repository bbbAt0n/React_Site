import { CourseCard } from "../components/CourseCard.jsx";
import { courses } from "../data/courses.js";
import { getLecturerById } from "../data/lecturers.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import "./CoursesPage.css";

export default function CoursesPage() {
  usePageTitle("Курсы — Учебная платформа");

  return (
    <div className="page courses-page">
      <header className="courses-page__header">
        <h1>Курсы</h1>
        <p>
          Тридцать дисциплин: у каждой — десять тем и три тарифа лектора.
          Откройте программу, чтобы выбрать формат занятий.
        </p>
      </header>

      <ul className="courses-page__grid">
        {courses.map((course) => {
          const lecturer = getLecturerById(course.lecturerId);

          return (
            <li key={course.id}>
              <CourseCard
                title={course.title}
                description={course.description}
                lecturerName={lecturer?.fullName ?? ""}
                topicsCount={course.topics.length}
                href={`/courses/${course.id}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
