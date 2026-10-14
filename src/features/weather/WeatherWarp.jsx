import { useEffect } from 'react';
import Footer from "../../components/layout/Footer";
import AirQuality from "./AirQuality";
import MarineWeather from "./MarineWeather";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import WeeklyForecast from "./WeeklyForecast";
import WeatherDetails from "./WeatherDetails";
import HistoricalWeather from "./HistoricalWeather";

function WeatherWarp({data, setData, activeCity, weatherData, setWeatherData,forecastData, setForeCastData, hourlyData, setHourlyData}){
    useEffect(()=>{
        if(!activeCity) return;

        const fetchWeatherData = async () => {
            const {latitude, longitude} = activeCity;

            try {
                //call api 

                const baseUrl = "https://api.open-meteo.com/v1/forecast";
                // define the query parameters
                const params = new URLSearchParams({
                latitude: latitude,
                longitude: longitude,
                current_weather: "true",
                daily: "temperature_2m_max,temperature_2m_min,weather_code",
                hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
                timezone: "auto",
                });

                //full url
                const url = `${baseUrl}?${params.toString()}`;

                const response = await fetch(url);

                const weatherJson = await response.json();

                setData({...weatherJson, location: activeCity});
                
                
            } catch (error) {
                console.log("Error fetching weather data:", error);
            }
        }
        fetchWeatherData();
    }, [activeCity, setData]);
    //transform & store weather data
    useEffect(()=>{
        if(!data || !data.location) return;
        
        const {location, current_weather, daily, hourly} = data;
        const currentWeather = {
            city: location.name,
            country: location.country,
            temperature: current_weather.temperature,
            feelsLike: current_weather.apparent_temperature || current_weather.temperature,
            humidity: hourly.relative_humidity_2m[0],
            windSpeed: current_weather.windspeed,
            weatherCode: current_weather.weathercode,
            minTemp: daily.temperature_2m_min[0],
            maxTemp: daily.temperature_2m_max[0],
        }
        setWeatherData(currentWeather);

        const forecast = daily.time.slice(1,7).map((date, index)=>({
            day: new Date(date).toLocaleDateString(undefined, {weekday: "long"}),
            minTemp: daily.temperature_2m_min[index+1],
            maxTemp: daily.temperature_2m_max[index+1],
            weatherCode: daily.weather_code[index+1],
        }));
        setForeCastData(forecast);

        const hourlyForecast = hourly.time.slice(0, 24).map((time, index)=>({
            time: new Date(time).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
            }),
            temp: hourly.temperature_2m[index],
            humidity: hourly.relative_humidity_2m[index],
            wind: hourly.wind_speed_10m[index],
            weatherCode: hourly.weather_code[index],
        }));
        setHourlyData(hourlyForecast);

    }, [data, setWeatherData, setForeCastData, setHourlyData])
    return (
        <>
            <CurrentWeather weatherData={weatherData} />
            {/* forecast section */}
            <div className="forecast-warp">
                {/* hourly forecast section */}
                <HourlyForecast hourlyData={hourlyData}/>
                {/* weekly forecast section */}
                <WeeklyForecast forecastData={forecastData}/>
                {/* weather condition details */}
                <WeatherDetails />
                {/* air quality section*/}
                <AirQuality />
                {/* Marine weather section if coastal city */}
                <MarineWeather />
                {/* historical weather section */}
                <HistoricalWeather />
                {/* footer section */}
                <Footer />
            </div>
        </>
    );
}
export default WeatherWarp;