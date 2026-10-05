export function formatPrice(amount, priceFrom = false) {
  const number = new Intl.NumberFormat("ru-RU").format(amount);
  const value = `${number}\u00a0₽`;
  return priceFrom ? `от ${value}` : value;
}

export function formatCount(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  let word = many;
  if (mod10 === 1 && mod100 !== 11) {
    word = one;
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    word = few;
  }
  return `${n} ${word}`;
}

export function formatExperience(years) {
  return formatCount(years, "год", "года", "лет");
}

export function formatTopicsCount(n) {
  return formatCount(n, "тема", "темы", "тем");
}

export function formatLecturersCount(n) {
  return formatCount(n, "лектор", "лектора", "лекторов");
}

export function initials(fullName) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}
