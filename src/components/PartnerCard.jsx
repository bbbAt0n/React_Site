import "./PartnerCard.css";

export function PartnerCard({ name, logo, description, href }) {
  return (
    <a
      className="partner-card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}, официальный сайт`}
    >
      <div className="partner-card__head">
        <img
          className="partner-card__logo"
          src={logo}
          alt=""
          width={222}
          height={93}
        />
        <span className="partner-card__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="partner-card__description">{description}</p>
    </a>
  );
}
