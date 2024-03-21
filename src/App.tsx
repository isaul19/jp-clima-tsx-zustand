import styles from "./App.module.css";
import { Alert } from "./components/alert/Alert";
import { Form } from "./components/form/Form";
import { Spinner } from "./components/spinner/Spinner";
import { WeatherDetail } from "./components/weatherDetail/WeatherDetail";
import { useWeather } from "./hooks/useWeather";

export const App = () => {
  const { weather, notFound, isLoading, hasWeatherData, fetchWeather } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {isLoading && <Spinner />}
        {!isLoading && notFound && <Alert>Ciudad no encontrada</Alert>}
        {!isLoading && hasWeatherData && <WeatherDetail weather={weather} />}
      </div>
    </>
  );
};
