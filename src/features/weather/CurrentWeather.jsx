import {Droplets,Wind,CircleGauge  } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {convertPressure, convertTemperature, convertWindSpeed, formatValue} from "../../utils/units";
import WeatherIllustration from "../../components/weather-visuals/WeatherIllustration";
import { getWeatherCondition } from "../../utils/weather";

function CurrentWeather({weatherData, units}){
    const { t } = useLanguage();
    const condition = weatherData && getWeatherCondition(weatherData.weatherCode);
    const isNight = weatherData && weatherData.isDay === 0;
    return(
        <section className="hero">
            <div className="current-face">
                <div className="current-temperature" dir='ltr'>
                    <h1>
                        {weatherData && formatValue(
                            convertTemperature(
                                weatherData.temperature,
                                units.temperature
                            )
                        )}°
                        {units.temperature === "celsius" ? "C" : "F"}
                    </h1>
                </div>
                <div className="details-icon">
                    {weatherData && (
                        <WeatherIllustration
                            width={50}
                            scale={3}
                            condition={condition}
                            theme={isNight ? "dark" : "light"}
                            className="hero-weather-art"
                        />
                    )}
                </div>
            </div>
            <div className="current-details">
                <div className="details-text">
                    <span>
                        {weatherData && t.labels[weatherData.weatherCode]}
                    </span>
                    <span>
                        <CircleGauge  />
                        {weatherData && formatValue(
                            convertPressure(weatherData.pressure,units.pressure)
                        )} 
                        {units.pressure === "mmhg"
                            ? " mmhg"
                            : units.pressure === "inhg"
                            ? " inhg"
                            : units.pressure === "hpa"
                            ? " hpa"
                            : " mph"
                        }
                    </span>
                    <span>
                        <Droplets />
                        {weatherData && (weatherData.humidity)}
                    </span>
                    <span>
                        <Wind />
                        {weatherData && formatValue(
                            convertWindSpeed(
                                weatherData.windSpeed,
                                units.windSpeed
                            ),
                            1
                        )}
                        {units.windSpeed === "kmh"
                            ? " km/h"
                            : units.windSpeed === "ms"
                            ? " m/s"
                            : " mph"
                        }
                    </span>
                </div>
                {/* <div className="condition">
                    <p>
                        
                        
                    </p>
                </div>
                <div className="minmax-temp">
                    <p>
                        
                    </p>
                </div>
                <div className="humidity">
                    <p>
                        
                    </p>
                </div>
                <div className="wind">
                    <p>
                        
                    </p>
                </div> */}
            </div>
        </section>
    )
}
export default CurrentWeather;