import { getWeatherCondition } from "../data/weatherCodes";
import { getTimeOfDay } from "./timeOfDay";

export const timeOfDayTokens = {
  dawn: { gradient: ["#F4D4C5", "#E99A83", "#A987B5"], accent: "#A987B5" },
  "early-morning": { gradient: ["#D7EEF2", "#B8DDE9", "#F2D6B8"], accent: "#E6A875" },
  morning: { gradient: ["#C4E9F4", "#83C9E8", "#7DCBC0"], accent: "#4B9EAE" },
  noon: { gradient: ["#9CDEF5", "#55B9E8", "#80D4D0"], accent: "#238EB8" },
  afternoon: { gradient: ["#B3D9E8", "#75B7DE", "#E9C5A5"], accent: "#D69A68" },
  sunset: { gradient: ["#F5C18B", "#E99A83", "#A987B5"], accent: "#C66D62" },
  "early-night": { gradient: ["#777CB0", "#555C91", "#303D70"], accent: "#B8BCE8" },
  midnight: { gradient: ["#35486D", "#182745", "#10182D"], accent: "#8CA8D8" },
  "late-night": { gradient: ["#405778", "#263B5C", "#1B2542"], accent: "#A1B5D5" },
};

/** Creates the visual state separately from the API response and UI components. */
export function resolveWeatherVisual(current, daily) {
  if (!current) return { theme: "light", timeOfDay: "noon", condition: "unknown", accent: "#238EB8" };

  const isDay = current.is_day === 1;
  const timeOfDay = getTimeOfDay({
    time: current.time,
    sunrise: daily?.sunrise?.[0],
    sunset: daily?.sunset?.[0],
    isDay,
  });
  const condition = getWeatherCondition(current.weather_code);
  const tokens = timeOfDayTokens[timeOfDay] ?? timeOfDayTokens.noon;
  const gradient = tokens.gradient.join(", ");

  return {
    theme: isDay ? "light" : "dark",
    timeOfDay,
    condition,
    accent: tokens.accent,
    style: { "--weather-gradient": `linear-gradient(145deg, ${gradient})`, "--weather-accent": tokens.accent },
  };
}
