import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";
import { useLanguage } from "../../context/LanguageContext";
import { fetchOpenMeteoWeather } from "../../services/openMeteo";


function WeatherWarp({
    data, setData, 
    activeCity, 
    weatherData, setWeatherData,
    forecastData, setForeCastData,
    hourlyData, setHourlyData, units,
}){
    const { language } = useLanguage();
    const location = useLocation();
    const showWeather = location.pathname === "/";

    // fetching weather data
    useEffect(()=>{
        if (!activeCity) {
            setData(null);
            return undefined;
        }

        const city = activeCity;
        const controller = new AbortController();
        setData(null);

        const fetchWeatherData = async () => {
            try {
                const weatherJson = await fetchOpenMeteoWeather({
                    latitude: city.latitude,
                    longitude: city.longitude,
                    signal: controller.signal,
                });
                setData({ ...weatherJson, location: city });
                
            } catch (error) {
                if (error.name === "AbortError") return;

                console.error("Open-Meteo weather request failed:", error);
                setData(null);
            }
        }
        fetchWeatherData();
        return () => controller.abort();
    }, [activeCity, setData]);
    //transform & store weather data
    useEffect(()=>{
        if (!showWeather || !data?.location || !data.current || !data.daily || !data.hourly) {
            setWeatherData(null);
            setForeCastData(null);
            setHourlyData(null);
            // setWeatherDetails(null);
            return;
        }
        
        
        const {location, current, daily, hourly} = data;
        const currentHour = current.time?.slice(0, 13);
        const hourlyTimes = hourly.time ?? [];
        let startIndex = hourlyTimes.findIndex((time) => time.slice(0, 13) === currentHour);
        // Fall back to the first future hour if the current hour is absent from the hourly array.
        if (startIndex < 0) {
            startIndex = hourlyTimes.findIndex((time) => time >= currentHour);
        }
        if (startIndex < 0 && hourlyTimes.length > 0) startIndex = hourlyTimes.length - 1;
        // transform current data
        const currentWeather = {
            city: location.name,
            country: location.country,
            temperature: current.temperature_2m,
            feelsLike: current.apparent_temperature ?? current.temperature_2m,
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            windDirection: current.wind_direction_10m,
            windGusts: current.wind_gusts_10m,
            weatherCode: current.weather_code,
            cloudCover: current.cloud_cover,
            precipitation: current.precipitation,
            rain: current.rain,
            showers: current.showers,
            snowfall: current.snowfall,
            pressure: current.surface_pressure,
            pressureMSL: current.pressure_msl,
            isDay: current.is_day,
            is_day: current.is_day,
            time: current.time,
            sunrise: daily.sunrise?.[0],
            sunset: daily.sunset?.[0],
        }
        setWeatherData(currentWeather);
        // transform weekly data
        const forecast = (daily.time ?? []).slice(1, 7).map((date, index) => {
            const dayIndex = index + 1;
            return {
                date,
                day: new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" }),
                minTemp: daily.temperature_2m_min?.[dayIndex],
                maxTemp: daily.temperature_2m_max?.[dayIndex],
                minFeelsLike: daily.apparent_temperature_min?.[dayIndex],
                maxFeelsLike: daily.apparent_temperature_max?.[dayIndex],
                weatherCode: daily.weather_code?.[dayIndex],
                uvIndex: daily.uv_index_max?.[dayIndex],
                sunrise: daily.sunrise?.[dayIndex],
                sunset: daily.sunset?.[dayIndex],
                precipitationSum: daily.precipitation_sum?.[dayIndex],
                precipitationProbability: daily.precipitation_probability_max?.[dayIndex],
                windSpeedMax: daily.wind_speed_10m_max?.[dayIndex],
            };
        });
        setForeCastData(forecast);
        // transform hourly data
        const hourlyForecast = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
            const actualIndex = startIndex + index;
            return {
                time: time.slice(0, 13) === currentHour
                    ? (language === "en" ? "now" : "اکنون") 
                    : new Date(`${time}:00`).toLocaleTimeString(undefined, {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                timestamp: time,
                temp: hourly.temperature_2m?.[actualIndex],
                humidity: hourly.relative_humidity_2m?.[actualIndex],
                dewPoint: hourly.dew_point_2m?.[actualIndex],
                feelsLike: hourly.apparent_temperature?.[actualIndex],
                precipitationProbability: hourly.precipitation_probability?.[actualIndex],
                precipitation: hourly.precipitation?.[actualIndex],
                rain: hourly.rain?.[actualIndex],
                showers: hourly.showers?.[actualIndex],
                snowfall: hourly.snowfall?.[actualIndex],
                wind: hourly.wind_speed_10m?.[actualIndex],
                windDirection: hourly.wind_direction_10m?.[actualIndex],
                windGusts: hourly.wind_gusts_10m?.[actualIndex],
                cloudCover: hourly.cloud_cover?.[actualIndex],
                visibility: hourly.visibility?.[actualIndex],
                pressure: hourly.surface_pressure?.[actualIndex],
                weatherCode: hourly.weather_code?.[actualIndex],
                is_day: hourly.is_day?.[actualIndex],
                uvIndex: hourly.uv_index?.[actualIndex],
            };
        });
        setHourlyData(hourlyForecast);

    }, [data, setWeatherData, setForeCastData, setHourlyData,showWeather,language]);
    if (!showWeather) {
        return null;
    }
    return (
        <div className='app-warp'>
            <div className="app-content">
                {/* hero section */}
                <CurrentWeather 
                    weatherData={weatherData} 
                    units={units}
                />
                {/* hourly forecast section */}
                <HourlyForecast 
                    hourlyData={hourlyData}
                    units={units}
                />
                {/* weekly forecast section */}
                <WeeklyForecast 
                    forecastData={forecastData}
                    units={units}
                />
            </div>
        </div>
    );
}
export default WeatherWarp;