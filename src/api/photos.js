const LOCAL_DIR = "/lecturers";
const DEFAULT_ASSETS_BASE =
  "https://storage.yandexcloud.net/project3-images-bloody9amer";
const ASSETS_BASE = String(
  import.meta.env.VITE_ASSETS_BASE_URL ?? DEFAULT_ASSETS_BASE,
).replace(/\/+$/, "");

export function getPublicImageUrl(path) {
  return ASSETS_BASE ? `${ASSETS_BASE}/${path.replace(/^\/+/, "")}` : path;
}

// Публичный префикс бакета Yandex Object Storage, без завершающего слэша.
// Пример: https://storage.yandexcloud.net/<bucket>/lecturers
const CLOUD_BASE = String(import.meta.env.VITE_PHOTOS_BASE_URL ?? "").replace(
  /\/+$/,
  "",
);

function fileName(lecturerId) {
  return `${lecturerId}.jpg`;
}

export function getLecturerPhotoFallbackUrl(lecturerId) {
  return `${LOCAL_DIR}/${fileName(lecturerId)}`;
}

export function getLecturerPhotoUrl(lecturerId) {
  if (CLOUD_BASE) {
    return `${CLOUD_BASE}/${fileName(lecturerId)}`;
  }
  return getPublicImageUrl(getLecturerPhotoFallbackUrl(lecturerId));
}

export function lecturerPhoto(lecturerId) {
  const fallbackSrc = getLecturerPhotoFallbackUrl(lecturerId);
  const src = getLecturerPhotoUrl(lecturerId);
  return {
    src,
    fallbackSrc: src === fallbackSrc ? undefined : fallbackSrc,
  };
}
