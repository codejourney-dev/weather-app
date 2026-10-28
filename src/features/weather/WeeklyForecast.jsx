import { useRef } from "react";
import {getWeatherIcon } from "../../utils/weather";
import { useLanguage } from "../../context/LanguageContext";
import {convertTemperature, formatValue} from "../../utils/units";
import WeatherIllustration from "../../components/weather-visuals/WeatherIllustration";
import { getWeatherCondition } from "../../utils/weather";

function WeeklyForecast({forecastData, units}) {
  const sliderRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const { t } = useLanguage();
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


// useEffect(() => {
//   const slider = sliderRef.current;

//   if (!slider) return;

//   const handleWheel = (e) => {
//     const maxScroll = slider.scrollWidth - slider.clientWidth;
//     // if haven't horizontal scroll
//     if (maxScroll <= 0) return;
//     e.preventDefault();
//     e.stopPropagation();
//     slider.scrollLeft += e.deltaY;
//   };

//   slider.addEventListener("wheel", handleWheel, {
//     passive: false,
//   });

//   return () => {
//     slider.removeEventListener("wheel", handleWheel);
//   };
// }, []);

  return (
    <section
        ref={sliderRef}
        className="weekly-forecast"
        id="weekly-forecast"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
    >
      {forecastData && forecastData.map((data, index)=>(
        <div className="wf-card glass" key={index}>
            <h4>
              {t.days[data.day]}
            </h4>
            <WeatherIllustration
              condition={getWeatherCondition(data.weatherCode)}
              width={30}
              scale={2}
              theme="light"
              className="weekly-icon"
            />
            {/* <span>
              {getWeatherIcon(data.weatherCode)}
            </span> */}
            <span>
              {t.labels[data.weatherCode]}
            </span>
            <h3 dir="ltr">
              {formatValue(convertTemperature(
                data.minTemp,
                units.temperature
              ))}/{formatValue(convertTemperature(
                data.maxTemp,
                units.temperature
              ))}°
              {units.temperature === "celsius" ? "C" : "F"}
            </h3>
        </div>
      ))}
    </section>
  );
}

export default WeeklyForecast;

