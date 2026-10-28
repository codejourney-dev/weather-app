export default function Lightning({ className = "", size = 70 }) {
  return <svg className={`weather-illustration lightning-illustration ${className}`} width={size} height={size} viewBox="0 0 80 100" role="img" aria-label="Lightning" fill="none"><path className="lightning-bolt" d="M45 5L17 54H37L29 94L65 40H43L45 5Z" fill="#FFE98A" stroke="#FFF8D1" strokeWidth="2" strokeLinejoin="round"/></svg>;
}
