export const weatherIcons = {
    0: "☀️", // Clear sky
    1: "🌤️", // Mainly clear
    2: "⛅", // Partly cloudy
    3: "☁️", // Overcast
    45: "🌫️", // Fog
    48: "🌁", // Depositing fog
    51: "🌦️", // Light drizzle
    53: "🌦️", // Moderate drizzle
    55: "🌧️", // Dense drizzle
    56: "🌧️", // Light freezing drizzle
    57: "🌧️", // Heavy freezing drizzle
    61: "🌧️", // Slight rain
    63: "🌧️", // Moderate rain
    65: "🌧️", // Heavy rain
    66: "🌨️", // Freezing rain
    67: "🌨️", // Heavy freezing rain
    71: "❄️", // Slight snow fall
    73: "❄️", // Moderate snow fall
    75: "❄️", // Heavy snow fall
    77: "🌨️", // Snow grains
    80: "🌧️", // Slight rain showers
    81: "🌧️", // Moderate rain showers
    82: "🌧️", // Violent rain showers
    85: "🌨️", // Slight snow showers
    86: "🌨️", // Heavy snow showers
    95: "🌩️", // Thunderstorm
    96: "⛈️", // Thunderstorm with slight hail
    99: "⛈️", // Thunderstorm with heavy hail
}

export const getWeatherIcon = (code) => weatherIcons[code] || "❓";

// export const getConditionLabel = (code) => labels[code] || "Unknown";


export const getWeatherCondition = (weatherCode) => {
  const code = Number(weatherCode);

  if (code === 0) return "clear";
  if (code === 1) return "mostly-clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "cloudy";

  if ([45, 48].includes(code)) return "fog";

  if (code === 51) return "light-drizzle";
  if (code === 53) return "moderate-drizzle";
  if ([55, 56, 57].includes(code)) return "dense-drizzle";

  if ([61, 80].includes(code)) return "light-rain";
  if ([63, 81].includes(code)) return "moderate-rain";
  if ([65, 66, 67, 82].includes(code)) return "heavy-rain";

  if ([71, 77, 85].includes(code)) return "light-snow";
  if ([73, 86].includes(code)) return "moderate-snow";
  if (code === 75) return "heavy-snow";

  if ([95, 96, 99].includes(code)) return "thunderstorm";

  return "unknown";
};
