export function RevoLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        filter: 'drop-shadow(0 0 7px rgba(58,160,255,.55)) drop-shadow(0 0 10px rgba(255,154,60,.25))',
      }}
    >
      <defs>
        <linearGradient id="go" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc24d" />
          <stop offset="1" stopColor="#ff8a2a" />
        </linearGradient>
        <linearGradient id="gc" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd6ff" />
          <stop offset="1" stopColor="#2f8bff" />
        </linearGradient>
        <radialGradient id="gcore">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#9fe0ff" />
          <stop offset="100%" stopColor="#2f8bff" />
        </radialGradient>
      </defs>
      <g transform="rotate(-22 50 50)">
        <path d="M14,50 A36,15 0 0 1 86,50" fill="none" stroke="url(#go)" strokeWidth="7" strokeLinecap="round" />
        <path d="M86,50 A36,15 0 0 1 14,50" fill="none" stroke="url(#gc)" strokeWidth="8.5" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="7.5" fill="url(#gcore)" />
    </svg>
  );
}
