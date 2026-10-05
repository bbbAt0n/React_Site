import { Button } from "./Button.jsx";
import { LecturerMeta } from "./LecturerMeta.jsx";
import { LecturerPortrait } from "./LecturerPortrait.jsx";
import { TariffList } from "./TariffList.jsx";
import { Link } from "../router/Link.jsx";
import "./LecturerCard.css";

export function LecturerCard({
  photo,
  photoFallback,
  fullName,
  degree,
  education,
  experienceYears,
  disciplines,
  teaser,
  tariffs,
  href,
  bookingHref,
}) {
  return (
    <article className="lecturer-card">
      <Link
        className="lecturer-card__photo"
        href={href}
        tabIndex={-1}
        aria-hidden="true"
      >
        <LecturerPortrait
          src={photo}
          fallbackSrc={photoFallback}
          fullName={fullName}
        />
      </Link>

      <div className="lecturer-card__info">
        <h2 className="lecturer-card__name">
          <Link href={href}>{fullName}</Link>
        </h2>
        <LecturerMeta
          education={education}
          experienceYears={experienceYears}
          degree={degree}
          disciplines={disciplines}
        />
        {bookingHref ? (
          <Button href={bookingHref} variant="solid">
            Оставить заявку
          </Button>
        ) : null}
      </div>

      <div className="lecturer-card__offer">
        {teaser ? <p className="lecturer-card__teaser">{teaser}</p> : null}
        {tariffs?.length ? <TariffList tariffs={tariffs} /> : null}
        <Link href={href} className="button button--text lecturer-card__cta">
          Открыть профиль
        </Link>
      </div>
    </article>
  );
}
