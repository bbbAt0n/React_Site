import "./LecturerPhoto.css";

export function LecturerPhoto({ src, alt }) {
  return (
    <figure className="lecturer-photo">
      <img
        className="lecturer-photo__image"
        src={src}
        alt={alt}
        width={434}
        height={289}
      />
    </figure>
  );
}
