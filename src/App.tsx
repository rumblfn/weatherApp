import Input from "./components/cityInput/index";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { setCity } from "./store/reducer/actions";
import { WeatherInfo } from "./components/WeatherInfo";
import { getCityByCoords } from "./helpers/getCityByCoords";

function App() {
  const city: string = useSelector((state: any) => state.reducer.city);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const callbackSetCity = (city: string) => {
    dispatch(setCity(city))
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => getCityByCoords(position, callbackSetCity)
      );
    } else {
      setError("error");
    }
  }, []);

  return (
    <div className="App container">
      <Input loading={loading} setLoading={setLoading} />
      <WeatherInfo city={city} />
    </div>
  );
}

export default App;
