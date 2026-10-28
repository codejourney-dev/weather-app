import { AirVariables } from "../data/AirVariables";

const AIRQUALITY_API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export async function fetchOpenMeteoAir({ latitude, longitude, signal }) {
    if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) {
        throw new TypeError("Valid latitude and longitude are required to fetch air data.");
    }

    const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: AirVariables.current.join(","),
        hourly: AirVariables.hourly.join(","),
        timezone: "auto",
        forecast_days: "7",
    });

    const response = await fetch(`${AIRQUALITY_API_URL}?${params.toString()}`, { signal });

    if (!response.ok) {
        throw new Error(`Open-Meteo Air API error: ${response.status}`);
    }

    const payload = await response.json();
    if (payload.error) {
        throw new Error(payload.reason || "Open-Meteo Air data is unavailable.");
    }

    if (!payload.current || !payload.hourly) {
        throw new Error("Open-Meteo returned an incomplete AirQuality response.");
    }

    return payload;
}