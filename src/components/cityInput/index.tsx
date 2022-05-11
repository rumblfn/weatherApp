import { FC, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import axios from "axios";
import { IWeather } from "../../types/types";
import { useDispatch } from "react-redux";
import { setCityData, setCity } from "../../store/reducer/actions";
import { IWeatherData } from "../../types/types"

interface InputProps {
  loading: boolean;
  setLoading: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Input: FC<InputProps> = ({ loading, setLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current?.value) {
      fetchWeatherByCity(inputRef.current?.value || "");
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.keyCode === 13) && inputRef.current?.value) {
      fetchWeatherByCity(inputRef.current?.value || "");
    }
  };

  async function fetchWeatherByCity(city: string) {
    setLoading(true);
    try {
      const response: IWeather = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=f40fa20386b64691829182655221005&q=${city}&aqi=no`
      );
      const data: IWeatherData = response.data;
      dispatch(setCity(data.location.name));
      dispatch(setCityData(data));
      setLoading(false);
    } catch (e) {
      alert(e);
      setLoading(false);
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
        onKeyDown={onKeyPressed}
      />
      <Button
        onClick={clickHandler}
        sx={{
          backgroundColor: loading
            ? "var(--secondary-button-color)"
            : "var(--button-color)",
          color: "var(--app-color)",
          height: 64,
          width: 64,
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
