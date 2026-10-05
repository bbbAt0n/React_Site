import { formatPrice } from "../data/format.js";
import "./TariffList.css";

export function TariffList({ tariffs }) {
  return (
    <ul className="tariff-list">
      {tariffs.map((tariff) => (
        <li key={tariff.id} className="tariff-list__item">
          <span className="tariff-list__name">{tariff.name}</span>
          <span className="tariff-list__price">
            {formatPrice(tariff.price, tariff.priceFrom)}
          </span>
        </li>
      ))}
    </ul>
  );
}
