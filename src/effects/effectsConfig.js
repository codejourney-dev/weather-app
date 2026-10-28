/**
 * Maps weather state to lightweight CSS effects.
 * The background texture remains in BackgroundLayer; this config only controls
 * animated/foreground atmospheric effects.
 */
export function resolveWeatherEffects({ condition = "unknown", theme = "light", timeOfDay = "noon", windy = false } = {}) {
  const sunnyConditions = ["clear", "mostly-clear", "partly-cloudy"];
  return {
    sunlight: theme === "light" && sunnyConditions.includes(condition),
    rain: ["rain", "drizzle", "freezing-rain"].includes(condition),
    snow: condition === "snow",
    lightning: condition === "thunderstorm",
    fog: condition === "fog",
    wind: Boolean(windy),
    night: theme === "dark",
    timeOfDay,
  };
}
