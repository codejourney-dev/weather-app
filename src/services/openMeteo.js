import { weatherVariables } from "../data/weatherVariables";

const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

/** Fetch forecast data for a geographic point. */
export async function fetchOpenMeteoWeather({ latitude, longitude, signal }) {
  if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) {
    throw new TypeError("Valid latitude and longitude are required to fetch weather data.");
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: weatherVariables.current.join(","),
    hourly: weatherVariables.hourly.join(","),
    daily: weatherVariables.daily.join(","),
    timezone: "auto",
    forecast_days: "7",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
  });

  const response = await fetch(`${FORECAST_API_URL}?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Open-Meteo Forecast API error: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.reason || "Open-Meteo weather data is unavailable.");
  }

  if (!payload.current || !payload.hourly || !payload.daily) {
    throw new Error("Open-Meteo returned an incomplete forecast response.");
  }

  return payload;
}
