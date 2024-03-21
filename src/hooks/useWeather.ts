import axios from "axios";
import { Geo, SearchType, Weather } from "../types";
import { useMemo, useState } from "react";
// import { object, string, number, Output, parse } from "valibot";

// VALIBOT --------------------------------------------------
// const Weather = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_min: number(),
//     temp_max: number(),
//   }),
// });
// type Weather = Output<typeof Weather>;

// ZOD -------------------------------------------------------
// import z from "zod";
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_min: z.number(),
//     temp_max: z.number(),
//   }),
// });
//
// type Weather = z.infer<typeof Weather>;

export const useWeather = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      temp: 0,
      temp_min: 0,
      temp_max: 0,
    },
  });

  const fetchWeather = async (search: SearchType) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

    try {
      setIsLoading(true);
      const GEO_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${API_KEY}`;
      const { data: geoData } = await axios.get<Geo[]>(GEO_URL);

      if (geoData.length === 0) {
        setNotFound(true);
        return;
      }

      const { lat, lon } = geoData[0];

      const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const { data: weatherData } = await axios.get<Weather>(WEATHER_URL);

      // ZOD ---------------------------------
      // const { data: weatherData } = await axios.get<Weather>(WEATHER_URL);
      // const result = Weather.safeParse(weatherData)

      // VALIBOT ------------------------------
      // const { data: weatherData } = await axios.get<Weather>(WEATHER_URL);
      // const result = parse(Weather, weatherData);

      setWeather(weatherData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    isLoading,
    hasWeatherData,
    notFound,
    fetchWeather,
  };
};
