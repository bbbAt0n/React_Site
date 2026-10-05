// Контент из файла «Описание задания.docx».
export const lecturers = [
  {
    "id": "petrov",
    "fullName": "Петров Дмитрий Сергеевич",
    "education": "МФТИ, прикладная математика и информатика (2012)",
    "experienceYears": 12,
    "degree": "кандидат технических наук",
    "courseIds": [
      "algorithms",
      "python-data",
      "computer-science"
    ],
    "tariffs": [
      {
        "id": "petrov-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2500,
        "priceFrom": false
      },
      {
        "id": "petrov-t2",
        "name": "Пакет из 8 занятий",
        "price": 18000,
        "priceFrom": false
      },
      {
        "id": "petrov-t3",
        "name": "Интенсив (4 занятия за неделю)",
        "price": 11000,
        "priceFrom": false
      }
    ],
    "teaser": "изучаем, как эффективно хранить и обрабатывать данные."
  },
  {
    "id": "sokolov",
    "fullName": "Соколов Андрей Владимирович",
    "education": "МГУ, биохимия (2010)",
    "experienceYears": 14,
    "degree": "доктор биологических наук",
    "courseIds": [
      "biochemistry",
      "molecular-biology",
      "human-physiology"
    ],
    "tariffs": [
      {
        "id": "sokolov-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 3000,
        "priceFrom": false
      },
      {
        "id": "sokolov-t2",
        "name": "Пакет из 8 занятий",
        "price": 22000,
        "priceFrom": false
      },
      {
        "id": "sokolov-t3",
        "name": "Подготовка к олимпиадам (12 занятий)",
        "price": 36000,
        "priceFrom": false
      }
    ],
    "teaser": "изучаем химические процессы в живых организмах."
  },
  {
    "id": "nikolaev",
    "fullName": "Николаев Игорь Петрович",
    "education": "ВШЭ, экономика (2015)",
    "experienceYears": 9,
    "degree": "кандидат экономических наук",
    "courseIds": [
      "microeconomics",
      "macroeconomics",
      "financial-literacy"
    ],
    "tariffs": [
      {
        "id": "nikolaev-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2200,
        "priceFrom": false
      },
      {
        "id": "nikolaev-t2",
        "name": "Пакет из 8 занятий",
        "price": 16000,
        "priceFrom": false
      },
      {
        "id": "nikolaev-t3",
        "name": "Корпоративный тренинг (4 часа)",
        "price": 15000,
        "priceFrom": false
      }
    ],
    "teaser": "изучаем поведение отдельных агентов на рынке."
  },
  {
    "id": "fyodorov",
    "fullName": "Фёдоров Алексей Михайлович",
    "education": "СПбГАСУ, архитектура (2008)",
    "experienceYears": 16,
    "degree": null,
    "courseIds": [
      "architectural-design",
      "architecture-history",
      "autocad-revit"
    ],
    "tariffs": [
      {
        "id": "fyodorov-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2800,
        "priceFrom": false
      },
      {
        "id": "fyodorov-t2",
        "name": "Пакет из 8 занятий",
        "price": 20000,
        "priceFrom": false
      },
      {
        "id": "fyodorov-t3",
        "name": "Проект под ключ (консультация + сопровождение)",
        "price": 45000,
        "priceFrom": true
      }
    ],
    "teaser": "создаём концепции и рабочие проекты зданий."
  },
  {
    "id": "lebedev",
    "fullName": "Лебедев Константин Андреевич",
    "education": "МФТИ, физика (2013)",
    "experienceYears": 11,
    "degree": "кандидат физико‑математических наук",
    "courseIds": [
      "general-physics",
      "theoretical-mechanics",
      "ege-physics"
    ],
    "tariffs": [
      {
        "id": "lebedev-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2400,
        "priceFrom": false
      },
      {
        "id": "lebedev-t2",
        "name": "Пакет из 8 занятий",
        "price": 17000,
        "priceFrom": false
      },
      {
        "id": "lebedev-t3",
        "name": "Интенсив перед экзаменом (5 занятий)",
        "price": 13000,
        "priceFrom": false
      }
    ],
    "teaser": "фундаментальные законы природы."
  },
  {
    "id": "smirnova",
    "fullName": "Смирнова Елена Викторовна",
    "education": "МГУ, филология (2011)",
    "experienceYears": 13,
    "degree": "кандидат филологических наук",
    "courseIds": [
      "russian-stylistics",
      "literature-19-20",
      "ege-russian"
    ],
    "tariffs": [
      {
        "id": "smirnova-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2300,
        "priceFrom": false
      },
      {
        "id": "smirnova-t2",
        "name": "Пакет из 8 занятий",
        "price": 16500,
        "priceFrom": false
      },
      {
        "id": "smirnova-t3",
        "name": "Проверка и разбор сочинений (5 работ)",
        "price": 10000,
        "priceFrom": false
      }
    ],
    "teaser": "учимся писать грамотно и выразительно."
  },
  {
    "id": "vasilyeva",
    "fullName": "Васильева Ольга Дмитриевна",
    "education": "ВШЭ, дизайн (2016)",
    "experienceYears": 8,
    "degree": null,
    "courseIds": [
      "graphic-design",
      "photoshop-illustrator",
      "ux-ui"
    ],
    "tariffs": [
      {
        "id": "vasilyeva-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2600,
        "priceFrom": false
      },
      {
        "id": "vasilyeva-t2",
        "name": "Пакет из 8 занятий",
        "price": 19000,
        "priceFrom": false
      },
      {
        "id": "vasilyeva-t3",
        "name": "Менторство над проектом (4 недели)",
        "price": 35000,
        "priceFrom": false
      }
    ],
    "teaser": "создаём визуальные коммуникации."
  },
  {
    "id": "morozova",
    "fullName": "Морозова Анна Павловна",
    "education": "МГУ, психология (2014)",
    "experienceYears": 10,
    "degree": "кандидат психологических наук",
    "courseIds": [
      "general-psychology",
      "social-psychology",
      "developmental-psychology"
    ],
    "tariffs": [
      {
        "id": "morozova-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2700,
        "priceFrom": false
      },
      {
        "id": "morozova-t2",
        "name": "Пакет из 8 занятий",
        "price": 20000,
        "priceFrom": false
      },
      {
        "id": "morozova-t3",
        "name": "Корпоративный тренинг по командообразованию (4 часа)",
        "price": 25000,
        "priceFrom": false
      }
    ],
    "teaser": "изучаем основные психические процессы."
  },
  {
    "id": "kozlova",
    "fullName": "Козлова Ирина Николаевна",
    "education": "МФТИ, прикладная математика (2017)",
    "experienceYears": 7,
    "degree": null,
    "courseIds": [
      "linear-algebra",
      "probability-stats",
      "intro-ml"
    ],
    "tariffs": [
      {
        "id": "kozlova-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2900,
        "priceFrom": false
      },
      {
        "id": "kozlova-t2",
        "name": "Пакет из 8 занятий",
        "price": 21000,
        "priceFrom": false
      },
      {
        "id": "kozlova-t3",
        "name": "Проект по анализу данных (с сопровождением)",
        "price": 40000,
        "priceFrom": true
      }
    ],
    "teaser": "математический фундамент для IT и инженерии."
  },
  {
    "id": "tikhonova",
    "fullName": "Тихонова Мария Сергеевна",
    "education": "МГИМО, международные отношения (2012)",
    "experienceYears": 12,
    "degree": "кандидат политических наук",
    "courseIds": [
      "international-relations",
      "political-science",
      "english-ir"
    ],
    "tariffs": [
      {
        "id": "tikhonova-t1",
        "name": "Индивидуальное занятие (60 мин)",
        "price": 2500,
        "priceFrom": false
      },
      {
        "id": "tikhonova-t2",
        "name": "Пакет из 8 занятий",
        "price": 18000,
        "priceFrom": false
      },
      {
        "id": "tikhonova-t3",
        "name": "Подготовка к собеседованию на английском (3 занятия)",
        "price": 9000,
        "priceFrom": false
      }
    ],
    "teaser": "изучаем взаимодействие государств и международных организаций."
  }
];

export function getLecturerById(id) {
  return lecturers.find((lecturer) => lecturer.id === id) ?? null;
}
