const minutesOfDay = (value) => {
  if (!value) return null;
  const match = String(value).match(/T(\d{2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
};

const wrapMinutes = (minutes) => ((minutes % 1440) + 1440) % 1440;

/** Resolve a palette phase using the selected city's local API time and sunrise/sunset. */
export function getTimeOfDay({ time, sunrise, sunset, isDay }) {
  const now = minutesOfDay(time);
  const sunriseMinutes = minutesOfDay(sunrise);
  const sunsetMinutes = minutesOfDay(sunset);

  if (now === null) return isDay ? "afternoon" : "early-night";

  if (sunriseMinutes !== null && sunsetMinutes !== null) {
    const dawnStart = wrapMinutes(sunriseMinutes - 60);
    if (now >= dawnStart && now < sunriseMinutes) return "dawn";
    if (now >= sunriseMinutes && now < sunriseMinutes + 60) return "early-morning";
    if (now >= sunriseMinutes + 60 && now < sunriseMinutes + 240) return "morning";

    const solarNoon = (sunriseMinutes + sunsetMinutes) / 2;
    if (now >= solarNoon - 60 && now < solarNoon + 60) return "noon";
    if (now >= sunriseMinutes + 240 && now < sunsetMinutes - 60) return "afternoon";
    if (now >= sunsetMinutes - 60 && now < sunsetMinutes) return "sunset";
    if (now >= sunsetMinutes && now < wrapMinutes(sunsetMinutes + 90)) return "early-night";
  }

  if (isDay) return "afternoon";
  if (now >= 22 * 60 || now < 2 * 60) return "midnight";
  if (now >= 2 * 60 && now < 5 * 60) return "late-night";
  return "early-night";
}
