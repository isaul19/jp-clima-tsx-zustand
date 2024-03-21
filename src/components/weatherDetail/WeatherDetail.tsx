import styles from "./Weather.module.css";
import { Weather } from "../../types";
import { getCelsiusByFarenhit } from "../../utils";

interface Props {
  weather: Weather;
}

export const WeatherDetail = ({ weather }: Props) => {
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styles.current}>{getCelsiusByFarenhit(weather.main.temp)} °C</p>

      <div className={styles.minmax}>
        <p>
          Min: <span>{getCelsiusByFarenhit(weather.main.temp_min)} °C</span>
        </p>
        <p>
          Max: <span>{getCelsiusByFarenhit(weather.main.temp_max)} °C</span>{" "}
        </p>
      </div>
    </div>
  );
};
