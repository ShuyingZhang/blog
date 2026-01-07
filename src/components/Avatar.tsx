export default function Avatar() {
  return (
    <div className="w-32 h-32 mx-auto mb-6 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Robot body */}
        <rect x="20" y="30" width="60" height="50" rx="10" fill="#0ea5e9" />

        {/* Head */}
        <rect x="25" y="15" width="50" height="40" rx="8" fill="#38bdf8" />

        {/* Eyes */}
        <circle cx="40" cy="35" r="8" fill="white" />
        <circle cx="60" cy="35" r="8" fill="white" />
        <circle cx="42" cy="35" r="4" fill="#1a1a2e" />
        <circle cx="62" cy="35" r="4" fill="#1a1a2e" />

        {/* Eye highlights */}
        <circle cx="44" cy="33" r="1.5" fill="white" />
        <circle cx="64" cy="33" r="1.5" fill="white" />

        {/* Antenna */}
        <rect x="47" y="5" width="6" height="12" fill="#94a3b8" />
        <circle cx="50" cy="5" r="5" fill="#ef4444" />

        {/* Smile */}
        <path d="M 35 50 Q 50 60 65 50" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <rect x="5" y="40" width="18" height="8" rx="4" fill="#0ea5e9" />
        <rect x="77" y="40" width="18" height="8" rx="4" fill="#0ea5e9" />

        {/* Hands */}
        <circle cx="12" cy="44" r="6" fill="#38bdf8" />
        <circle cx="88" cy="44" r="6" fill="#38bdf8" />

        {/* Heart badge */}
        <path d="M 50 68 C 45 63 40 65 40 70 C 40 75 50 80 50 80 C 50 80 60 75 60 70 C 60 65 55 63 50 68" fill="#ef4444" />
      </svg>
    </div>
  );
}
