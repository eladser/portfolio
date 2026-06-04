// Huge background year that crossfades as scroll progresses. Gives the hero scroll
// a meaning ("time is passing 2014 → 2026") without adding any animation noise.
// Sits behind the 3D canvas via z-index, very low opacity so it's atmospheric not loud.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

export function YearTicker({ chapters, progress }) {
  // Interpolate the displayed year across the 3 chapter start years
  const year = useMemo(() => {
    const ys = chapters.map((c) => c.yearStart);
    // 0.00..0.30: stay at ys[0]; 0.30..0.50: ys[0] → ys[1]; 0.50..0.65: stay at ys[1]; 0.65..0.85: ys[1] → ys[2]; 0.85..1.0: stay at ys[2]
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
    return Math.round(v);
  }, [chapters, progress]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
      <span
        className="font-mono font-bold text-white/[0.04] leading-none"
        style={{
          fontSize: 'clamp(280px, 38vw, 540px)',
          letterSpacing: '-0.05em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {year}
      </span>
    </div>
  );
}
