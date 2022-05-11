import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface WeatherInfoProps {}

export const WeatherInfo: FC<WeatherInfoProps> = () => {
  const city = useSelector((state: any) => state.reducer);
  const cityName: string = city.city || "";
  const cityData = city.data || {};
  const [showAllParams, setShowAllParams] = useState<boolean>(false);

  let [temperature_mode, setTemperature_mode] = useState<string>("C");
  let lastUpdated: string[] = ["00:00"];
  let lastUpdatedTime: string = "00:00";
  try {
    lastUpdated = cityData.current.last_updated.split(" ");
    lastUpdatedTime = lastUpdated[lastUpdated.length - 1];
  } catch (e) {}

  const toggleTemperatureMode = () => {
    if (temperature_mode === "C") {
      setTemperature_mode("F");
    } else {
      setTemperature_mode("C");
    }
  };

  if (cityName) {
    return (
      <div>
        <div
          style={{
            margin: "16px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <p>
            Current city: <b>{cityName}</b>
          </p>
          <p style={{ marginLeft: "8px" }}>
            last updated: <b>{lastUpdatedTime}</b>
          </p>
        </div>
        <Box
          sx={{
            display: "flex",
            ml: 2,
            mr: 2,
            "& > :not(style)": {
              width: "100%",
              m: 1,
              height: "fit-content",
              minHeight: "120px",
            },
          }}
        >
          <Paper
            style={{
              flexGrow: 1,
              minWidth: 140,
              maxWidth: 260,
              flexWrap: "wrap",
            }}
            sx={{
              backgroundColor: "inherit",
              pt: 1,
              "& > :not(style)": {
                fontSize: "18px",
              },
            }}
            elevation={3}
          >
            <p style={{ margin: "0 8px 6px" }}>
              Wind speed: {cityData.current.wind_kph} km/h
            </p>
            <p style={{ margin: "0 8px 6px" }}>
              Humidity: {cityData.current.humidity}%
            </p>
            <p style={{ margin: "0 8px 6px" }}>
              Cloud: {cityData.current.cloud}%
            </p>
            <p style={{ margin: "0 8px 6px" }}>
              feels like:
              {temperature_mode === "C"
                ? ` ${cityData.current.feelslike_c}`
                : ` ${cityData.current.feelslike_f}`}
            </p>
            <p style={{ margin: "0 8px 6px" }}>
              Average visibility: {cityData.current.vis_km} km
            </p>
            {showAllParams && (
              <div>
                <p style={{ margin: "0 8px 6px" }}>
                  Wind direction in degrees: {cityData.current.wind_degree}
                </p>
                <p style={{ margin: "0 8px 6px" }}>
                  Wind direction as 16 point compass. e.g.: NSW:{" "}
                  {cityData.current.wind_dir}
                </p>
                <p style={{ margin: "0 8px 6px" }}>
                  Pressure in millibars: {cityData.current.pressure_mb}
                </p>
                <p style={{ margin: "0 8px 6px" }}>
                  Precipitation amount in millimeters:{" "}
                  {cityData.current.precip_mm}
                </p>
                <p style={{ margin: "0 8px 6px" }}>
                  UV Index: {cityData.current.uv}
                </p>
                <p style={{ margin: "0 8px 6px" }}>
                  Wind gust: {cityData.current.gust_kph}km/h
                </p>
              </div>
            )}
            <div
              onClick={() => {
                setShowAllParams(!showAllParams);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: "100%",
                backgroundColor: "var(--button-color)",
                color: "var(--app-color)",
                borderRadius: "0 0 4px 4px",
              }}
            >
              {showAllParams ? "Hide" : "Show all"}
              <KeyboardArrowDownIcon
                style={{
                  transform: showAllParams ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          </Paper>
          <Paper
            style={{
              position: "relative",
              alignItems: "center",
              display: "flex",
              padding: 8,
              width: "fit-content",
            }}
            sx={{ backgroundColor: "inherit" }}
            elevation={3}
          >
            <div
              onClick={toggleTemperatureMode}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 12,
                top: 6,
              }}
            >
              <span
                style={{
                  color:
                    temperature_mode === "C" ? "var(--button-color)" : "black",
                }}
              >
                °C
              </span>{" "}
              |
              <span
                style={{
                  color:
                    temperature_mode !== "C" ? "var(--button-color)" : "black",
                }}
              >
                °F
              </span>
            </div>
            <p style={{ width: "fit-content", fontSize: 48 }}>
              {temperature_mode === "C"
                ? `${cityData.current.temp_c}`
                : `${cityData.current.temp_f}`}
            </p>
            <p
              style={{
                width: "fit-content",
                fontSize: 48,
                visibility: "hidden",
              }}
            >
              82.
            </p>
            <img
              style={{ position: "absolute", right: 10, bottom: 10 }}
              src={cityData.current.condition.icon}
              alt={cityData.current.condition.text}
            />
          </Paper>
        </Box>
      </div>
    );
  } else {
    return (
      <div
        style={{
          border: "2px dashed var(--button-color)",
          margin: "16px",
          borderRadius: "7px",
          padding: "16px",
        }}
      >
        <h5>
          We could not get access to your location, you can enter the desired
          city in the search
        </h5>
      </div>
    );
  }
};
