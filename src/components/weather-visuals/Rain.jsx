
export default function Rain({
  className = "",
  count,
  compact = false,
}) {
  const total = count ?? (compact ? 14 : 26);

  const random = (seed) => {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  };

  const drops = Array.from({ length: total }, (_, i) => {
    const duration = 0.65 + random(i + 41) * 0.85;

    return {
      x: 5 + random(i + 1) * 170,
      y: -35 + random(i + 11) * 110,
      length: compact
        ? 5 + random(i + 21) * 4
        : 8 + random(i + 21) * 8,
      thickness: compact
        ? 1 + random(i + 31) * 0.6
        : 1.2 + random(i + 31) * 0.8,
      duration,
      delay: -random(i + 51) * duration,
      drift: -4 - random(i + 61) * 8,
      opacity: 0.55 + random(i + 71) * 0.4,
    };
  });

  return (
    <svg
      className={`weather-illustration rain-illustration ${className}`}
      viewBox="0 0 180 90"
      aria-hidden="true"
      fill="none"
    >
      {drops.map((drop, i) => (
        <g
          key={i}
          transform={`translate(${drop.x} ${drop.y})`}
          opacity={drop.opacity}
        >
          <g
            className="rain-particle"
            style={{
              "--rain-duration": `${drop.duration}s`,
              "--rain-delay": `${drop.delay}s`,
              "--rain-drift": `${drop.drift}px`,
              "--rain-distance": `${80 + drop.length}px`,
            }}
          >
            <path
              d={`M0 0 l${drop.drift / 3} ${drop.length}`}
              stroke="var(--rain-color, #5A9BC9)"
              strokeWidth={drop.thickness}
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}
