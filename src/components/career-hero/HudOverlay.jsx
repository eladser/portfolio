// Per-chapter HUD card (bottom-left). Opacity driven by the same per-artifact curve
// as the 3D crossfade so the card hands off in sync with the model.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

function opacityFor(index, p) {
  const T1A = 0.30, T1B = 0.50;
  const T2A = 0.65, T2B = 0.85;
  if (index === 0) {
    if (p < T1A) return 1;
    if (p > T1B) return 0;
    return 1 - smoothstep((p - T1A) / (T1B - T1A));
  }
  if (index === 1) {
    if (p < T1A) return 0;
    if (p < T1B) return smoothstep((p - T1A) / (T1B - T1A));
    if (p < T2A) return 1;
    if (p < T2B) return 1 - smoothstep((p - T2A) / (T2B - T2A));
    return 0;
  }
  if (p < T2A) return 0;
  if (p < T2B) return smoothstep((p - T2A) / (T2B - T2A));
  return 1;
}

export function HudOverlay({ chapter, index, progress }) {
  const o = useMemo(() => opacityFor(index, progress), [index, progress]);
  // Lift the card up slightly as it enters (translateY 8 → 0), matches Emil's enter rule
  const yPx = (1 - o) * 8;
  return (
    <div
      className="absolute bottom-10 left-10 max-w-md font-mono text-xs leading-relaxed pointer-events-none select-none"
      style={{
        opacity: o,
        transform: `translateY(${yPx}px)`,
        willChange: 'opacity, transform',
      }}
      aria-hidden={o < 0.01}
    >
      <div className="text-[#4ECDC4] tracking-[0.18em] mb-1">{chapter.org}</div>
      <div className="text-white/85 tracking-wide mb-2">{chapter.years} · {chapter.role}</div>
      <div className="text-white/55 mb-3">{chapter.detail}</div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-white/70">
        {chapter.stack.map((s, i) => (
          <span key={s} className="px-1.5 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.08]">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
