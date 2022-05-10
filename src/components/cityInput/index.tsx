import { FC, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import axios from "axios";
import { IWeather } from "../../types/types";

const Input: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetchWeatherByCity(inputRef.current?.value || '');
  };

  async function fetchWeatherByCity(city: string) {
    try {
        const response = await axios.get<IWeather>(`http://api.weatherapi.com/v1/current.json?key=f40fa20386b64691829182655221005&q=${city}&aqi=no`)
        console.log(response)
    } catch (e) {
        alert(e)
    }
  }

  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        m: 1,
      }}
    >
      <TextField
        inputRef={inputRef}
        id="fullWidth"
        label="City"
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={clickHandler}
        sx={{
          backgroundColor: 'var(--button-color)',
          color: 'var(--app-color)',
          height: "100%",
          overflow: "hidden",
          ml: 1,
        }}
        variant="contained"
      >
        <LocationSearchingIcon />
      </Button>
    </Box>
  );
};

export default Input;
