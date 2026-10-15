export function GrowLoop({ className = "" }: { className?: string }) {
  return (
    <div className={`grow-scene bg-cream ${className}`} aria-hidden>
      <svg viewBox="0 0 360 200" fill="none">
        <rect width="360" height="200" fill="#e8d9b8" />
        <rect width="360" height="118" fill="#dce7d4" />
        <circle cx="292" cy="38" r="18" fill="#f0d48a" />
        <path d="M0 118 C80 102 140 128 220 112 C280 100 330 118 360 108 L360 200 L0 200 Z" fill="#c4a574" />
        <path d="M0 148 C90 138 180 158 360 142 L360 200 L0 200 Z" fill="#8b5a32" />

        <g className="g-roots" stroke="#6b3f22" strokeWidth="1.4" fill="none">
          <path d="M180 148 C172 162 164 172 158 184" />
          <path d="M180 148 C180 164 176 176 174 188" />
          <path d="M180 148 C188 160 196 174 204 186" />
        </g>

        <circle className="g-seed" cx="180" cy="148" r="5" fill="#5c3a1e" />

        <g className="g-stem">
          <path d="M180 148 C180 120 180 96 180 72" stroke="#2c5a32" strokeWidth="3.2" strokeLinecap="round" />
        </g>

        <g className="g-canopy">
          <ellipse cx="180" cy="62" rx="42" ry="28" fill="#3f6b3c" />
          <ellipse cx="156" cy="70" rx="22" ry="16" fill="#2c5a32" />
          <ellipse cx="204" cy="68" rx="24" ry="17" fill="#4e7a45" />
          <ellipse cx="180" cy="48" rx="20" ry="14" fill="#5a8a4e" />
        </g>

        <circle className="g-apple" cx="166" cy="70" r="5" fill="#7d9a3c" />
        <circle className="g-apple" cx="192" cy="64" r="5" fill="#7d9a3c" />
        <circle className="g-apple" cx="180" cy="80" r="4.5" fill="#7d9a3c" />
        <circle className="g-apple" cx="206" cy="76" r="4.5" fill="#7d9a3c" />

        <g className="g-farmer" transform="translate(214 108)">
          <ellipse cx="36" cy="56" rx="14" ry="6" fill="#6b4424" opacity="0.35" />
          <rect x="22" y="38" width="16" height="20" rx="3" fill="#3d4f2e" />
          <rect x="24" y="28" width="12" height="12" rx="6" fill="#c9a07a" />
          <ellipse cx="30" cy="26" rx="11" ry="3.5" fill="#c4a45a" />
          <rect x="19" y="25" width="22" height="2.4" rx="1" fill="#b08a3c" />
          <g className="g-arm">
            <path d="M38 34 L52 22" stroke="#c9a07a" strokeWidth="3.2" strokeLinecap="round" />
          </g>
          <circle className="g-held" cx="54" cy="18" r="4.5" fill="#c45c38" />
          <path d="M10 46 C10 40 18 38 22 42 L22 52 C16 54 10 52 10 46 Z" fill="#8b5a32" />
          <ellipse cx="16" cy="50" rx="8" ry="3.5" fill="#6b4424" />
        </g>
      </svg>
    </div>
  );
}
