// Huge background year that crossfades as scroll progresses. During transition windows
// (artifact crossfades), the year scales up + brightens — a title-card "burst" so each
// chapter handoff lands as a beat, not just a fade.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

// 0..1 burst factor — peaks (1.0) at the midpoint of either transition window
function transitionBurst(p) {
  // Elbit → KLA transition: 0.30..0.50, peak 0.40
  if (p >= 0.30 && p <= 0.50) {
    const t = (p - 0.30) / 0.20;          // 0..1
    return Math.sin(t * Math.PI);          // bell: 0→1→0
  }
  // KLA → WEM transition: 0.65..0.85, peak 0.75
  if (p >= 0.65 && p <= 0.85) {
    const t = (p - 0.65) / 0.20;
    return Math.sin(t * Math.PI);
  }
  return 0;
}

export function YearTicker({ chapters, progress }) {
  const { year, burst } = useMemo(() => {
    const ys = chapters.map((c) => c.yearStart);
    // After the last chapter, the year resolves to "?" — the future
    if (progress > 0.95) return { year: '?', burst: 0 };
    let v;
    if (progress < 0.30) v = ys[0];
    else if (progress < 0.50) {
      const t = smoothstep((progress - 0.30) / 0.20);
      v = ys[0] + (ys[1] - ys[0]) * t;
    } else if (progress < 0.65) v = ys[1];
    else if (progress < 0.85) {
      const t = smoothstep((progress - 0.65) / 0.20);
      v = ys[1] + (ys[2] - ys[1]) * t;
    } else v = ys[2];
    return { year: Math.round(v), burst: transitionBurst(progress) };
  }, [chapters, progress]);

  // During burst: scale up to 1.18, opacity goes from 0.04 to 0.11
  const scale  = 1 + burst * 0.18;
  const op     = 0.04 + burst * 0.07;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
      <span
        className="font-mono font-bold leading-none"
        style={{
          fontSize: 'clamp(280px, 38vw, 540px)',
          letterSpacing: '-0.05em',
          fontVariantNumeric: 'tabular-nums',
          color: `rgba(255,255,255,${op})`,
          transform: `scale(${scale.toFixed(3)})`,
          transition: 'none',                       // scroll-driven, no CSS transition
          willChange: 'transform, color',
        }}
      >
        {year}
      </span>
    </div>
  );
}
