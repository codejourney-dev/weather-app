import "./weather-effects.css";
import { resolveWeatherEffects } from "./effectsConfig";

const rainDrops = Array.from({ length: 22 }, (_, index) => index);
const snowFlakes = Array.from({ length: 18 }, (_, index) => index);
const windStreaks = Array.from({ length: 7 }, (_, index) => index);

/**
 * Decorative animated atmosphere. It is a sibling above the UI/background
 * layers and never captures pointer events.
 */
function WeatherEffects({ condition, theme, timeOfDay, windy = false }) {
  const effects = resolveWeatherEffects({ condition, theme, timeOfDay, windy });

  const classNames = [
    "weather-effects",
    effects.sunlight && "has-sunlight",
    effects.rain && "has-rain",
    effects.snow && "has-snow",
    effects.lightning && "has-lightning",
    effects.fog && "has-fog",
    effects.wind && "has-wind",
    effects.night && "is-night",
  ].filter(Boolean).join(" ");

  return (
    <div className={classNames} aria-hidden="true">
      {effects.sunlight && <div className="effect-sunlight" />}
      {effects.rain && (
        <div className="effect-rain">
          {rainDrops.map((drop) => (
            <span
              className="rain-drop"
              key={drop}
              style={{
                left: `${(drop * 37) % 100}%`,
                animationDelay: `${(drop % 9) * -0.23}s`,
                animationDuration: `${0.75 + (drop % 5) * 0.12}s`,
              }}
            />
          ))}
        </div>
      )}
      {effects.snow && (
        <div className="effect-snow">
          {snowFlakes.map((flake) => (
            <span
              className="snow-flake"
              key={flake}
              style={{
                left: `${(flake * 53) % 100}%`,
                animationDelay: `${(flake % 8) * -0.7}s`,
                animationDuration: `${6 + (flake % 6)}s`,
                opacity: 0.35 + (flake % 5) * 0.12,
              }}
            />
          ))}
        </div>
      )}
      {effects.wind && (
        <div className="effect-wind">
          {windStreaks.map((streak) => (
            <span
              className="wind-streak"
              key={streak}
              style={{
                top: `${12 + streak * 11}%`,
                animationDelay: `${streak * -0.8}s`,
                animationDuration: `${2.5 + (streak % 3) * 0.7}s`,
              }}
            />
          ))}
        </div>
      )}
      {effects.lightning && <div className="effect-lightning" />}
      {effects.fog && <div className="effect-fog" />}
    </div>
  );
}

export default WeatherEffects;
