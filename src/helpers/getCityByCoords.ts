import axios from "axios";

export async function getCityByCoords(
  position: GeolocationPosition,
  callbackSetCity: (value: string) => void
) {
  const lat: number = position.coords.latitude;
  const lg: number = position.coords.longitude;
  try {
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lg}&localityLanguage=en`
    );
    callbackSetCity(response.data.city);
  } catch (e) {
    console.log(e);
  }
}
