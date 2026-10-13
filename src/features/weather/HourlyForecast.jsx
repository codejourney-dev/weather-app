import { useEffect,useRef } from "react";

function HourlyForecast() {
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
        <div className="hf-card card">
          <p className="hour">00:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">19</h3>
          <p className="humidity">38%</p>
          <p className="wind-speed">2.7 km/h</p>
        </div>

        <div className="hf-card card">
          <p className="hour">01:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">02:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">03:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">04:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">05:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">06:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">07:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">08:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">09:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">10:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">11:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">12:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">13:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">14:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">15:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">16:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">17:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">18:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">19:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">20:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">21:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">22:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
        <div className="hf-card card">
          <p className="hour">23:00</p>
          <span className="forecast-condition">Sunny</span>
          <h3 className="temperature">18</h3>
          <p className="humidity">40%</p>
          <p className="wind-speed">2.5 km/h</p>
        </div>
    </section>
  );
}

export default HourlyForecast;