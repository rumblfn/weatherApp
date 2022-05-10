import Input from "./components/cityInput/index";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import axios from "axios";
import { setCity } from "./store/reducer/actions";

function App() {
  const city: string = useSelector((state: any) => state.reducer.city);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => getCityByCoords(position)
      );
    } else {
      setError("error");
    }
  }, []);

  async function getCityByCoords(position: GeolocationPosition) {
    const lat: number = position.coords.latitude
    const lg: number = position.coords.longitude
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lg}&localityLanguage=en`
      );
      dispatch(setCity(response.data.city));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App container">
      <Input />

    </div>
  );
}

export default App;
