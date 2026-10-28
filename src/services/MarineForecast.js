import {marineVariables} from "../data/marineVariables";
const Marine_API_URL = "https://marine-api.open-meteo.com/v1/marine";

export async function fetchOpenMeteoMarine({ latitude, longitude, signal }) {
  if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) {
    throw new TypeError("Valid latitude and longitude are required to fetch marine data.");
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: marineVariables.current.join(","),
    hourly: marineVariables.hourly.join(","),
    daily: marineVariables.daily.join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(`${Marine_API_URL}?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Open-Meteo Marine API error: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.reason || "Open-Meteo marine data is unavailable.");
  }

  function hasMarineData(payload) {
    const hasCurrent =
      payload.current?.wave_height != null;

    const hasHourly =
      payload.hourly?.wave_height?.some(
        (value) => value != null
      );

    const hasDaily =
      payload.daily?.wave_height_max?.some(
        (value) => value != null
      );

    return hasCurrent || hasHourly || hasDaily;
  }
  const hasCurrentData =
    payload.current &&
    payload.current.wave_height != null;

  const hasHourlyData =
    payload.hourly?.wave_height?.some(
      (value) => value != null
    );

  const hasDailyData =
    payload.daily?.wave_height_max?.some(
      (value) => value != null
    );

  if (!hasCurrentData || !hasHourlyData || !hasDailyData) {
    throw new Error("Marine data is unavailable for this location.");
  }

  return payload;
}