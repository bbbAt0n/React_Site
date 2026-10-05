import { useRef, useState } from "react";
import { Button } from "../components/Button.jsx";
import { getCourseById } from "../data/courses.js";
import { getLecturerById, lecturers } from "../data/lecturers.js";
import { usePageTitle } from "../hooks/usePageTitle.js";
import { useRouter } from "../router/context.js";
import { Link } from "../router/Link.jsx";
import "./ContactsPage.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function contextFromSearch(search) {
  const params = new URLSearchParams(search);
  const course = getCourseById(params.get("course") ?? "");
  if (course) {
    return { courseId: course.id, lecturerId: course.lecturerId };
  }
  const lecturer = getLecturerById(params.get("lecturer") ?? "");
  return {
    courseId: "",
    lecturerId: lecturer ? lecturer.id : "",
  };
}

function emptyForm() {
  return {
    name: "",
    email: "",
    message: "",
    lecturerId: "",
  };
}

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Укажите имя";
  }
  if (!values.email.trim()) {
    errors.email = "Укажите электронную почту";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Укажите почту в формате name@company.ru";
  }
  if (!values.message.trim()) {
    errors.message = "Опишите задачу";
  }
  return errors;
}

export default function ContactsPage() {
  const { location } = useRouter();
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const formRef = useRef(null);

  usePageTitle("Заявка — Учебная платформа");

  const fromUrl = contextFromSearch(location.search);
  const lecturerId = fromUrl.lecturerId || values.lecturerId;
  const courseId = fromUrl.courseId;
  const lecturer = getLecturerById(lecturerId);
  const course = getCourseById(courseId);
  const locked = Boolean(fromUrl.lecturerId || fromUrl.courseId);

  function update(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const order = ["name", "email", "message"];
    const first = order.find((key) => nextErrors[key]);
    if (first) {
      formRef.current?.querySelector(`#${first}`)?.focus();
      return;
    }
    setSubmitted({
      email: values.email.trim(),
      lecturerName: lecturer?.fullName ?? "",
      courseTitle: course?.title ?? "",
    });
  }

  function onReset() {
    setValues(emptyForm());
    setErrors({});
    setSubmitted(null);
  }

  return (
    <div className="page contacts-page">
      <header className="contacts-page__header">
        <h1>Заявка</h1>
        <p>
          Имя, почта и короткое описание задачи. Если нужно, выберите лектора —
          остальное уточним в ответе.
        </p>
      </header>

      {submitted ? (
        <div className="contacts-page__success" role="status">
          <h2>Заявка принята</h2>
          <p>
            Ответим на {submitted.email}
            {submitted.lecturerName
              ? ` по заявке для ${submitted.lecturerName}`
              : ""}
            {submitted.courseTitle ? ` — «${submitted.courseTitle}»` : ""}.
          </p>
          <p>
            <Link href="/lecturers">Открыть каталог лекторов</Link>
          </p>
          <Button type="button" variant="solid" onClick={onReset}>
            Отправить ещё одну заявку
          </Button>
        </div>
      ) : (
        <form
          ref={formRef}
          className="contacts-form"
          noValidate
          onSubmit={onSubmit}
        >
          {locked ? (
            <div className="contacts-form__context">
              <p className="contacts-form__context-label">Заявка для</p>
              {lecturer ? (
                <p>
                  <Link href={`/lecturers/${lecturer.id}`}>
                    {lecturer.fullName}
                  </Link>
                </p>
              ) : null}
              {course ? (
                <p>
                  <Link href={`/courses/${course.id}`}>{course.title}</Link>
                </p>
              ) : null}
            </div>
          ) : (
            <div className="field">
              <label htmlFor="lecturerId">Лектор</label>
              <select
                className="field-input"
                id="lecturerId"
                name="lecturerId"
                value={values.lecturerId}
                onChange={(event) => update("lecturerId", event.target.value)}
              >
                <option value="">Подберём за вас</option>
                {lecturers.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.fullName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="field">
            <label htmlFor="name">
              Имя
              <span className="field__req" aria-hidden="true">
                *
              </span>
            </label>
            <input
              className="field-input"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={(event) => update("name", event.target.value)}
            />
            {errors.name ? (
              <p className="field__error" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="email">
              Электронная почта
              <span className="field__req" aria-hidden="true">
                *
              </span>
            </label>
            <input
              className="field-input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              spellCheck="false"
              required
              placeholder="name@company.ru"
              value={values.email}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={(event) => update("email", event.target.value)}
            />
            {errors.email ? (
              <p className="field__error" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="message">
              Задача
              <span className="field__req" aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              className="field-input"
              id="message"
              name="message"
              required
              placeholder="Формат, даты, размер аудитории"
              value={values.message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? "message-error message-hint" : "message-hint"
              }
              onChange={(event) => update("message", event.target.value)}
            />
            <p className="field__hint" id="message-hint">
              Несколько предложений достаточно
            </p>
            {errors.message ? (
              <p className="field__error" id="message-error">
                {errors.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" variant="solid">
            Отправить заявку
          </Button>
        </form>
      )}
    </div>
  );
}
