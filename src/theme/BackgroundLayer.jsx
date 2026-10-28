import "./background-layer.css";

function BackgroundLayer({
  theme = "light",
  timeOfDay = "noon",
  condition = "unknown",
  windy = false,
  style,
}) {
  return (
    <div
      className="background-layer"
      data-theme={theme}
      data-time={timeOfDay}
      data-condition={condition}
      data-windy={windy ? "true" : "false"}
      style={style}
      aria-hidden="true"
    >
      <div className="background-gradient" />
      <div className="background-texture" />
      <div className="background-glow" />
      <div className="background-condition-overlay" />
    </div>
  );
}

export default BackgroundLayer;
