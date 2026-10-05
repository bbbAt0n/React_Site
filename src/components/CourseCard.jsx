import { formatTopicsCount } from "../data/format.js";
import { Link } from "../router/Link.jsx";
import "./CourseCard.css";

export function CourseCard({
  title,
  description,
  lecturerName,
  topicsCount,
  href,
}) {
  return (
    <Link
      className="course-card"
      href={href}
      aria-label={`${title}, открыть программу`}
    >
      <h2 className="course-card__title">{title}</h2>
      {description ? (
        <p className="course-card__lead">{description}</p>
      ) : null}
      <p className="course-card__meta">{lecturerName}</p>
      <p className="course-card__topics">{formatTopicsCount(topicsCount)}</p>
      <span className="button button--text course-card__cta" aria-hidden="true">
        Открыть программу
      </span>
    </Link>
  );
}
