/** WMO weather interpretation codes used by Open-Meteo. */
export const weatherCodeMap = {
  0: { condition: "clear", label: "Clear sky" },
  1: { condition: "mostly-clear", label: "Mainly clear" },
  2: { condition: "partly-cloudy", label: "Partly cloudy" },
  3: { condition: "cloudy", label: "Overcast" },
  45: { condition: "fog", label: "Fog" },
  48: { condition: "fog", label: "Depositing rime fog" },
  51: { condition: "drizzle", label: "Light drizzle" },
  53: { condition: "drizzle", label: "Moderate drizzle" },
  55: { condition: "drizzle", label: "Dense drizzle" },
  56: { condition: "freezing-rain", label: "Light freezing drizzle" },
  57: { condition: "freezing-rain", label: "Dense freezing drizzle" },
  61: { condition: "rain", label: "Slight rain" },
  63: { condition: "rain", label: "Moderate rain" },
  65: { condition: "rain", label: "Heavy rain" },
  66: { condition: "freezing-rain", label: "Light freezing rain" },
  67: { condition: "freezing-rain", label: "Heavy freezing rain" },
  71: { condition: "snow", label: "Slight snowfall" },
  73: { condition: "snow", label: "Moderate snowfall" },
  75: { condition: "snow", label: "Heavy snowfall" },
  77: { condition: "snow", label: "Snow grains" },
  80: { condition: "rain", label: "Slight rain showers" },
  81: { condition: "rain", label: "Moderate rain showers" },
  82: { condition: "rain", label: "Violent rain showers" },
  85: { condition: "snow", label: "Slight snow showers" },
  86: { condition: "snow", label: "Heavy snow showers" },
  95: { condition: "thunderstorm", label: "Thunderstorm" },
  96: { condition: "thunderstorm", label: "Thunderstorm with slight hail" },
  99: { condition: "thunderstorm", label: "Thunderstorm with heavy hail" },
};

export function getWeatherCondition(code) {
  return weatherCodeMap[code]?.condition ?? "unknown";
}
