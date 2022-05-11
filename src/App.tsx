import Input from "./components/cityInput/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCity, setCityData } from "./store/reducer/actions";
import { WeatherInfo } from "./components/WeatherInfo";
import { getCityByCoords } from "./helpers/getCityByCoords";
import { fetchWeatherByCity } from "./helpers/fetchWeatherByCity";
import { IWeatherData } from "./types/types";

export const images = require.context("../public/img/weather/64x64", true);

function App() {
  const city: string = useSelector((state: any) => state.reducer.city);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const callbackSetCity = (city: string) => {
    handleFetchingWeatherByCity(city);
  };

  async function handleFetchingWeatherByCity(city: string) {
    try {
      const data: IWeatherData = await fetchWeatherByCity(city);
      dispatch(setCity(data.location.name));
      dispatch(setCityData(data));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) =>
          getCityByCoords(position, callbackSetCity)
      );
    } else {
      setError("error");
    }
  }, []);

  return (
    <div className="App container">
      <h2 style={{ margin: 8 }}>Fast weather</h2>
      <Input loading={loading} setLoading={setLoading} />
      <WeatherInfo />
    </div>
  );
}

export default App;
