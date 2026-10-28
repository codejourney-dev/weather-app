
export default function Snow({
  className = "",
  count = 14,
}) {
  const random = (seed) => {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  };

  const flakes = Array.from({ length: count }, (_, i) => {
    const duration = 2.8 + random(i + 31) * 3.2;

    return {
      x: 5 + random(i + 1) * 170,
      y: -15 + random(i + 11) * 100,
      size: 0.45 + random(i + 21) * 0.55,
      duration,
      delay: -random(i + 41) * duration,
      drift: -8 + random(i + 51) * 16,
      rotation: random(i + 61) * 180,
    };
  });

  return (
    <svg
      className={`weather-illustration snow-illustration ${className}`}
      viewBox="0 0 180 90"
      aria-hidden="true"
    >
      {flakes.map((flake, i) => (
        <g
          key={i}
          transform={`translate(${flake.x} ${flake.y})`}
        >
          <g
            className="snow-particle"
            style={{
              "--snow-duration": `${flake.duration}s`,
              "--snow-delay": `${flake.delay}s`,
              "--snow-drift": `${flake.drift}px`,
              "--snow-rotation": `${flake.rotation}deg`,
            }}
          >
            <g transform={`scale(${flake.size})`}>
              <path
                d="M-4 0 H4 M0 -4 V4 M-3 -3 L3 3 M-3 3 L3 -3"
                stroke="var(--snow-color, #FFFFFF)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  );
}
