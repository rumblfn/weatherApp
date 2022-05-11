import axios from "axios";
import { IWeather } from "../types/types";

export async function fetchWeatherByCity(city: string) {
  const response: IWeather = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=f40fa20386b64691829182655221005&q=${city}&aqi=no`
  );
  return response.data;
}
