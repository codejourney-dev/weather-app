
import { useRef } from "react";

function Carousel({ className = "", id, children }) {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;

    isDown.current = true;
    sliderRef.current?.classList.add("dragging");

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const stopDragging = () => {
    isDown.current = false;
    sliderRef.current?.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !sliderRef.current) return;

    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.25;

    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={sliderRef}
      className={className}
      id={id}
      onMouseDown={handleMouseDown}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

export default Carousel;
