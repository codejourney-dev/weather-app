import { useRef } from "react";
import WeatherIllustration from "../../components/weather-visuals/WeatherIllustration";
import {convertTemperature, convertWindSpeed, formatValue} from "../../utils/units";
import { getWeatherCondition } from "../../utils/weather";
import { useLanguage } from "../../context/LanguageContext";

function HourlyForecast({hourlyData, units}) {

  const {t} = useLanguage();

  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const handleMouseDown = (e) => {
    isDown.current = true;

    sliderRef.current.classList.add("dragging");

    startX.current =
      e.pageX - sliderRef.current.offsetLeft;

    scrollLeft.current =
      sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;

    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseUp = () => {
    isDown.current = false;

    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;

    e.preventDefault();

    const x =
      e.pageX - sliderRef.current.offsetLeft;

    const walk = (x - startX.current) * 2.25;

    sliderRef.current.scrollLeft =
      scrollLeft.current - walk;
  };
  return (
    <div
        ref={sliderRef}
        className="hourly-forecast"
        id="hourly-forecast"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} 
    >
      {hourlyData && hourlyData.map((data, index)=>{
        const condition = getWeatherCondition(data.weatherCode);
        const isNight = data.is_day === 0;
        return(
          <div className="hf-card glass" key={index}>
            <p className="hour">
              {data.time}
            </p>
            <div className="forecast-condition">
              <WeatherIllustration
                width={30}
                scale={1}
                condition={condition}
                theme={isNight ? "dark" : "light"}
                className="hourly-icon"
              />
            </div>
            <div className="forecast-title">
              {t.labels[data.weatherCode]}
            </div>
            <h3 className="temperature" dir="ltr">
              {formatValue(
                convertTemperature(
                  data.temp,
                  units.temperature
                )
              )}°
              {units.temperature === "celsius" ? "C" : "F"}
            </h3>
            <p className="humidity">
              {data.humidity}%
            </p>
            <p className="wind-speed">
              {formatValue(
                convertWindSpeed(
                  data.wind,
                  units.windSpeed
                )
              )}
              {units.windSpeed === "kmh"
                  ? " km/h"
                  : units.windSpeed === "ms"
                  ? " m/s"
                  : " mph"
              }
            </p>
          </div>
        )
        
      })}
    </div>
  );
}

export default HourlyForecast;