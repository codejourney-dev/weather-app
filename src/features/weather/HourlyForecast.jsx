import { useEffect,useRef } from "react";
import {getWeatherIcon, getConditionLabel } from "../../utils/weather";

function HourlyForecast({hourlyData}) {
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


  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleWheel = (e) => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      // if haven't horizontal scroll
      if (maxScroll <= 0) return;
      e.preventDefault();
      e.stopPropagation();
      slider.scrollLeft += e.deltaY;
    };

    slider.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);
  hourlyData && hourlyData.map((data, index)=>{
    console.log("index:", index, data)
  });
  return (
    <section
        ref={sliderRef}
        className="hourly-forecast"
        id="hourly-forecast"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} 
    >
      {hourlyData && hourlyData.map((data, index)=>(
        <div className="hf-card card" key={index}>
          <p className="hour">
            {data.time}
          </p>
          <div className="forecast-condition">
            <span>
              {getWeatherIcon(data.weatherCode)}
            </span>
            <span>
              {getConditionLabel(data.weatherCode)}
            </span>
          </div>
          <h3 className="temperature">
            {data.temp}
          </h3>
          <p className="humidity">
            {data.humidity}%
          </p>
          <p className="wind-speed">
            {data.wind}km/h
          </p>
        </div>
      ))}
    </section>
  );
}

export default HourlyForecast;