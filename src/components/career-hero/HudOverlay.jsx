// Per-chapter HUD — left side, vertically centered. Big typography so the chapter
// reads as a real title, not a footer caption. Opacity matches the per-artifact crossfade.

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
  if (p < 0.90) return 1;
  // tail fade to hand off to the FuturePrompt (fully gone by p=0.95)
  return 1 - smoothstep(Math.min(1, (p - 0.90) / 0.05));
}

export function HudOverlay({ chapter, index, progress }) {
  const o = useMemo(() => opacityFor(index, progress), [index, progress]);
  const yPx = (1 - o) * 14;
  return (
    <div
      className="absolute left-12 top-1/2 -translate-y-1/2 max-w-lg font-mono pointer-events-none select-none"
      style={{
        opacity: o,
        transform: `translate(0, calc(-50% + ${yPx}px))`,
        willChange: 'opacity, transform',
      }}
      aria-hidden={o < 0.01}
    >
      {/* Accent rail */}
      <div className="flex items-start gap-5">
        <div className="w-px self-stretch min-h-[180px] bg-gradient-to-b from-[#4ECDC4] via-[#4ECDC4]/40 to-transparent mt-2" aria-hidden="true" />
        <div>
          <div className="text-[#4ECDC4] text-[10px] tracking-[0.32em] mb-3">CHAPTER {String(index + 1).padStart(2, '0')}</div>
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-4">
            {chapter.org}
          </h2>
          <div className="text-white/85 text-base md:text-lg mb-1 tracking-wide">{chapter.years}</div>
          <div className="text-white/90 text-lg md:text-xl mb-2">{chapter.role}</div>
          <div className="text-white/55 text-sm mb-6 italic">{chapter.detail}</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-white/75 text-xs">
            {chapter.stack.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.10]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
