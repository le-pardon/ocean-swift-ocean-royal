export function LeafArt({ tint, className = "" }: { tint: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <ellipse cx="60" cy="128" rx="28" ry="6" fill="rgba(28,36,24,0.12)" />
      <path d="M60 128 C60 90 20 70 24 36 C40 20 56 18 60 8 C64 18 80 20 96 36 C100 70 60 90 60 128 Z" fill={tint} />
      <path d="M60 16 C60 16 60 120 60 124" stroke="#1c2418" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <path d="M60 48 C46 54 38 62 32 74" stroke="#1c2418" strokeOpacity="0.22" fill="none" />
      <path d="M60 48 C74 54 82 62 88 74" stroke="#1c2418" strokeOpacity="0.22" fill="none" />
      <path d="M60 72 C48 80 42 90 38 102" stroke="#1c2418" strokeOpacity="0.18" fill="none" />
      <path d="M60 72 C72 80 78 90 82 102" stroke="#1c2418" strokeOpacity="0.18" fill="none" />
    </svg>
  );
}
