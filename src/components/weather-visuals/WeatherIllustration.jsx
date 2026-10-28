
import Sun from "./Sun";
import Moon from "./Moon";
import Cloud from "./Cloud";
import Rain from "./Rain";
import Snow from "./Snow";
import Lightning from "./Lightning";

export default function WeatherIllustration({
  condition = "clear",
  theme = "light",
  className = "",
  width = 120,
  scale = 1,
}) {
  const night = theme === "dark";


const clearConditions = [
  "clear",
  "mostly-clear",
  "partly-cloudy",
];

const cloudyConditions = [
  "partly-cloudy",
  "cloudy",
  "fog",
  "light-drizzle",
  "moderate-drizzle",
  "dense-drizzle",
  "light-rain",
  "moderate-rain",
  "heavy-rain",
  "light-snow",
  "moderate-snow",
  "heavy-snow",
  "thunderstorm",
];

const rainyConditions = [
  "light-drizzle",
  "moderate-drizzle",
  "dense-drizzle",
  "light-rain",
  "moderate-rain",
  "heavy-rain",
  "thunderstorm",
];

const snowyConditions = [
  "light-snow",
  "moderate-snow",
  "heavy-snow",
];

const showOrb = clearConditions.includes(condition);
const cloudy = cloudyConditions.includes(condition);
const showRain = rainyConditions.includes(condition);
const showSnow = snowyConditions.includes(condition);
const showLightning = condition === "thunderstorm";


  const sceneWidth = width * scale;
  const compact = /\b(hourly-icon|weekly-icon)\b/.test(className);
  return (
    <div
      className={`weather-scene ${
        night ? "scene-night" : "scene-day"
      } scene-${condition} ${className}`}
      style={{
        "--scene-size": `${sceneWidth}px`,
      }}
      aria-hidden="true"
    >
      {showOrb && (
        <div className="scene-orb">
          {night ? (
            <Moon size={sceneWidth * 0.93} />
          ) : (
            <Sun size={sceneWidth} />
          )}
        </div>
      )}
      {cloudy && (
        <div className="scene-cloud scene-cloud-front">
          <Cloud
            size={sceneWidth * 1.25}
            tone={
              night || condition === "thunderstorm"
                ? "dark"
                : "light"
            }
          />
        </div>
      )}

      {showRain && (
      <Rain
        className="scene-precipitation"
        count={
          condition === "light-drizzle" ? 9 :
          condition === "moderate-drizzle" ? 13 :
          condition === "dense-drizzle" ? 18 :
          condition === "light-rain" ? 12 :
          condition === "moderate-rain" ? 17 :
          condition === "heavy-rain" ? 23 :
          compact ? 14 : 26
        }
        compact={compact}
      />
    )}

      
    {showSnow && (
      <Snow
        className="scene-precipitation"
        count={
          condition === "light-snow" ? 9 :
          condition === "moderate-snow" ? 14 :
          condition === "heavy-snow" ? 20 : 14
        }
      />
    )}


      {showLightning && (
        <Lightning
          className="scene-lightning"
          size={sceneWidth * 0.48}
        />
      )}

      {condition === "fog" && (
        <div className="scene-fog" />
      )}

      <div className="scene-sparkle sparkle-one" />
      <div className="scene-sparkle sparkle-two" />
      <div className="scene-sparkle sparkle-three" />
    </div>
  );
}
