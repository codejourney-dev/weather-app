import {Droplets,Wind,ArrowUpDown } from 'lucide-react';
import {getWeatherIcon, getConditionLabel } from "../../utils/weather";

function CurrentWeather({weatherData}){
    return(
        <section className="hero">
            <div className="current-temperature">
                <h1>{weatherData && (weatherData.temperature)}°C</h1>
            </div>
            <div className="current-details">
                <div className="condition">
                    <p>
                        <span>
                            {weatherData && getWeatherIcon(weatherData.weatherCode)}
                        </span>
                        <span>
                            {weatherData && getConditionLabel(weatherData.weatherCode)}
                        </span>
                    </p>
                </div>
                <div className="minmax-temp">
                    <p>
                        <ArrowUpDown />
                        {weatherData && (weatherData.minTemp)}/
                        {weatherData && (weatherData.maxTemp)}°C
                    </p>
                </div>
                <div className="humidity">
                    <p>
                        <Droplets />
                        {weatherData && (weatherData.humidity)}
                    </p>
                </div>
                <div className="wind">
                    <p>
                        <Wind />
                        {weatherData && (weatherData.windSpeed)}km/h
                    </p>
                </div>
            </div>
        </section>
    )
}
export default CurrentWeather;