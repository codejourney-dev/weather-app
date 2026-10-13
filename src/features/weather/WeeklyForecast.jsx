import { useEffect, useRef } from "react";

function WeeklyForecast() {
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
        className="weekly-forecast"
        id="weekly-forecast"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
    >
        <div className="wf-card card">
            <h4>Monday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Tuesday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Wednesday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Thursday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Friday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Saturday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
        <div className="wf-card card">
            <h4>Sunday</h4>
            <span>Sunny</span>
            <h2>36/26</h2>
            <p>clear sky</p>
        </div>
    </section>
  );
}

export default WeeklyForecast;

