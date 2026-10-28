export default function Sun({ className = "", size = 120 }) {
  return <svg className={`weather-illustration sun-illustration ${className}`} width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Sun" fill="none">
    <defs><radialGradient id="sun-core" cx="0" cy="0" r="1" gradientTransform="translate(60 60) rotate(90) scale(31)"><stop stopColor="#FFF7B2"/><stop offset="1" stopColor="#FFB84D"/></radialGradient><filter id="sun-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>
    <circle cx="60" cy="60" r="34" fill="#FFD36B" opacity=".3" filter="url(#sun-glow)"/><g className="sun-rays" stroke="#FFE49A" strokeWidth="4" strokeLinecap="round">{Array.from({length:8},(_,i)=><line key={i} x1="60" y1="9" x2="60" y2="19" transform={`rotate(${i*45} 60 60)`}/>)}</g><circle cx="60" cy="60" r="27" fill="url(#sun-core)"/>
  </svg>;
}
