import { FC, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useDispatch } from "react-redux";
import { setCityData, setCity } from "../../store/reducer/actions";
import { IWeatherData } from "../../types/types"
import { fetchWeatherByCity } from "../../helpers/fetchWeatherByCity"

interface InputProps {
  loading: boolean;
  setLoading: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const Input: FC<InputProps> = ({ loading, setLoading }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current?.value) {
      handleFetchingWeatherByCity(inputRef.current?.value || "");
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === "Enter" || e.keyCode === 13) && inputRef.current?.value) {
      handleFetchingWeatherByCity(inputRef.current?.value || "");
    }
  };

  async function handleFetchingWeatherByCity(city: string) {
    try {
      const data: IWeatherData = await fetchWeatherByCity(city)
      dispatch(setCity(data.location.name));
      dispatch(setCityData(data));
      setLoading(false);
    } catch {
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
