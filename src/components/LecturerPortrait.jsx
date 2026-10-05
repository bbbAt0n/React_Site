import { useState } from "react";
import { initials } from "../data/format.js";
import "./LecturerPortrait.css";

export function LecturerPortrait({
  src,
  fallbackSrc,
  fullName,
  loading = "lazy",
}) {
  const primary = src || "";
  const [currentSrc, setCurrentSrc] = useState(primary);
  const [trackedSrc, setTrackedSrc] = useState(primary);

  if (primary !== trackedSrc) {
    setTrackedSrc(primary);
    setCurrentSrc(primary);
  }

  function handleError() {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setCurrentSrc("");
  }

  return (
    <div className="lecturer-portrait">
      {currentSrc ? (
        <img
          className="lecturer-portrait__image"
          src={currentSrc}
          alt=""
          width={220}
          height={235}
          loading={loading}
          decoding="async"
          onError={handleError}
        />
      ) : (
        <div className="lecturer-portrait__placeholder" aria-hidden="true">
          {initials(fullName)}
        </div>
      )}
    </div>
  );
}
