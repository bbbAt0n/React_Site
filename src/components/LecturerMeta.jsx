import { formatExperience } from "../data/format.js";
import { Tooltip } from "./Tooltip.jsx";
import "./LecturerMeta.css";

function getExperienceTooltip(years) {
  if (!years) return "Стаж преподавательской и исследовательской работы";
  return `Общий стаж работы: ${formatExperience(years)}. Включает преподавание, научные исследования и руководство практическими проектами.`;
}

function getDegreeTooltip(degree) {
  if (!degree) return "Информация об учёной степени";
  const normalized = degree.toLowerCase();
  if (normalized.includes("доктор")) {
    return `${degree[0].toUpperCase() + degree.slice(1)} — высшая учёная степень в РФ, присуждаемая за выдающиеся научные достижения и фундаментальные труды.`;
  }
  if (normalized.includes("кандидат")) {
    return `${degree[0].toUpperCase() + degree.slice(1)} — учёная степень первой ступени в РФ, присуждаемая после публичной защиты кандидатской диссертации.`;
  }
  return `Учёная степень: ${degree}. Подтверждает официальную академическую квалификацию лектора.`;
}

function Icon({ children }) {
  return (
    <svg
      className="lecturer-meta__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="lecturer-meta__info-icon"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.75" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7v4.5M8 4.75h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EducationIcon() {
  return (
    <Icon>
      <path
        d="M3 10.5 12 5l9 5.5-9 5.5L3 10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 12.5v4.2c0 .2 2.4 2.3 5.5 2.3s5.5-2.1 5.5-2.3v-4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function ExperienceIcon() {
  return (
    <Icon>
      <rect
        x="3.5"
        y="7"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 7V5.8A1.8 1.8 0 0 1 9.8 4h4.4A1.8 1.8 0 0 1 16 5.8V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function DegreeIcon() {
  return (
    <Icon>
      <circle cx="12" cy="9" r="5.25" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 14.5 6 20l6-2 6 2-2-5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

function DisciplinesIcon() {
  return (
    <Icon>
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4H20v14.5H7.5A2.5 2.5 0 0 0 5 21V6.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M5 16.5h15" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
}

function FormatIcon() {
  return (
    <Icon>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 21h8M12 17v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

const FORMATS = ["Онлайн", "Офлайн"];

export function LecturerMeta({
  education,
  experienceYears,
  degree,
  disciplines,
  showFormats = true,
}) {
  return (
    <dl className="lecturer-meta">
      <div>
        <dt>
          <EducationIcon />
          Образование
        </dt>
        <dd>{education}</dd>
      </div>

      <Tooltip
        as="div"
        className="lecturer-meta__item lecturer-meta__item--interactive"
        content={getExperienceTooltip(experienceYears)}
        ariaLabel={`Стаж: ${formatExperience(experienceYears)}`}
      >
        <dt>
          <ExperienceIcon />
          Стаж
          <span className="lecturer-meta__info-badge" title="Подробнее о стаже">
            <InfoIcon />
          </span>
        </dt>
        <dd>{formatExperience(experienceYears)}</dd>
      </Tooltip>

      {degree ? (
        <Tooltip
          as="div"
          className="lecturer-meta__item lecturer-meta__item--interactive"
          content={getDegreeTooltip(degree)}
          ariaLabel={`Учёная степень: ${degree}`}
        >
          <dt>
            <DegreeIcon />
            Учёная степень
            <span className="lecturer-meta__info-badge" title="Подробнее об учёной степени">
              <InfoIcon />
            </span>
          </dt>
          <dd>{degree}</dd>
        </Tooltip>
      ) : null}

      {showFormats ? (
        <div>
          <dt>
            <FormatIcon />
            Формат
          </dt>
          <dd>
            <ul className="lecturer-meta__chips">
              {FORMATS.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}

      {disciplines?.length ? (
        <div className="lecturer-meta__disciplines">
          <dt>
            <DisciplinesIcon />
            Дисциплины
          </dt>
          <dd>
            <ul className="lecturer-meta__chips">
              {disciplines.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}
