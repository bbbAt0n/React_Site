import { getPublicImageUrl } from "../api/photos.js";
import { Button } from "../components/Button.jsx";
import { LecturerPhoto } from "../components/LecturerPhoto.jsx";
import { PartnerCard } from "../components/PartnerCard.jsx";
import { partners } from "../data/partners.js";
import { Link } from "../router/Link.jsx";
import "./HomePage.css";

const CLASSROOM_PHOTO = getPublicImageUrl("/home/classroom.jpg");

const STATS = [
  { id: "lecturers", value: "10", label: "лекторов", href: "/lecturers" },
  { id: "courses", value: "30", label: "дисциплин", href: "/courses" },
  { id: "tariffs", value: "3", label: "тарифа" },
];

const AUDIENCES = [
  {
    id: "companies",
    title: "Компании",
    text: "Лекторы под задачи команд: от онбординга до отраслевых семинаров.",
  },
  {
    id: "schools",
    title: "Образовательные учреждения",
    text: "Гостевые курсы и открытые лекции для студентов и преподавателей.",
  },
  {
    id: "nko",
    title: "НКО",
    text: "Эксперты для просветительских программ и публичных встреч.",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <LecturerPhoto
          src={CLASSROOM_PHOTO}
          alt="Лектор проводит занятие в аудитории"
        />
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__slogan">
            Наши лекторы — признанные специалисты в своих областях, готовые
            делиться опытом и знаниями.
          </h1>
          <Button href="/lecturers" className="hero__cta">
            Найти лектора
          </Button>
        </div>
      </section>

      <ul className="home-stats">
        {STATS.map((stat) => {
          const content = (
            <>
              <span className="home-stats__value">{stat.value}</span>
              <span className="home-stats__label">{stat.label}</span>
            </>
          );

          return (
            <li key={stat.id} className="home-stats__item">
              {stat.href ? (
                <Link href={stat.href} className="home-stats__link">
                  {content}
                </Link>
              ) : (
                <div className="home-stats__body">{content}</div>
              )}
            </li>
          );
        })}
      </ul>

      <section className="about" id="about" aria-labelledby="about-title">
        <h2 id="about-title" className="home-section-title">
          О нас
        </h2>
        <div className="about__copy">
          <p>
            Наша учебная платформа соединяет компании, образовательные
            учреждения и НКО с профессиональными лекторами, спикерами и
            тренерами.
          </p>
          <p>
            Мы упрощаем процесс подбора, бронирования и организации лекций,
            помогая находить экспертов, которые не просто делятся знаниями, но и
            вдохновляют аудиторию.
          </p>
        </div>
        <ul className="about__audiences">
          {AUDIENCES.map((item) => (
            <li key={item.id} className="about__card">
              <h3 className="about__card-title">{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="partners"
        id="partners"
        aria-labelledby="partners-title"
      >
        <h2 id="partners-title" className="home-section-title">
          Партнеры
        </h2>
        <ul className="partners__grid">
          {partners.map((partner) => (
            <li key={partner.id}>
              <PartnerCard
                name={partner.name}
                logo={partner.logo}
                description={partner.description}
                href={partner.href}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
