

export type BlabberWordmarkSlateProps = {
  height?: number;           // SVG height in px
  className?: string;
  colorStart?: string;       // gradient start
  colorEnd?: string;         // gradient end
};

export default function BlabberWordmarkSlate({
  height = 48,
  className,
  colorStart = "#1F2937",   // slate-800
  colorEnd = "#111827",     // grayish black
}: BlabberWordmarkSlateProps) {
  const h = Math.max(20, height);

  return (
    <svg
      height={h}
      viewBox="0 0 220 64"
      role="img"
      aria-label="Blabber wordmark"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* subtle gradient for slight pop */}
        <linearGradient id="blabber-slate-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>

        {/* soft drop shadow for depth */}
        <filter id="blabber-slate-shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>

      <text
        x="6"
        y="42"
        fill="url(#blabber-slate-grad)"
        filter="url(#blabber-slate-shadow)"
        style={{
          fontFamily:
            'Inter, Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
          fontWeight: 700,
          fontSize: 40,
          letterSpacing: "-0.02em",
          textRendering: "geometricPrecision",
        }}
      >
        Blabber
      </text>
    </svg>
  );
}
