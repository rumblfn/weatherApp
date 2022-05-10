import Input from "./components/cityInput/index";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => getCityByCoords(position.coords.latitude, position.coords.longitude)
      );
    } else {
      setError("error");
    }
  }, []);

  async function getCityByCoords(latitude: number, longitude: number) {
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      setCity(response.data.city);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {console.log(city)}, [city])

  return (
    <div className="App container">
      <Input />
      
    </div>
  );
}

export default App;
