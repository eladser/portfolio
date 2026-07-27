// Per-chapter HUD — left side, vertically centered. Big typography so the chapter
// reads as a real title, not a footer caption. Opacity matches the per-artifact crossfade.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

// [fade-in start, fully in, fade-out start, fully out] per chapter.
//
// These do NOT overlap, and that's the whole point. The artifacts can crossfade —
// they're photos moving through depth, so blending them reads as one passing the
// other. Two blocks of text pinned to the same box do not blend, they stack, and
// both stay legible: "WEM ENERGY" printed through "KLA CPG DIVISION". The windows
// used to overlap by 0.20 each, which left ~500px of the 2400px pin unreadable.
// Now the outgoing chapter is gone before the incoming one starts, with a short
// gap where the artifact swap carries the moment on its own.
//
// Chapter 01 waits for the intro header to clear (gone by ~0.14). Chapter 03's tail
// must finish by 0.93, where FuturePrompt takes over.
const WINDOWS = [
  { in: 0.10, full: 0.18, out: 0.30, gone: 0.38 },
  { in: 0.42, full: 0.50, out: 0.65, gone: 0.73 },
  { in: 0.77, full: 0.85, out: 0.88, gone: 0.93 },
];

function opacityFor(index, p) {
  const w = WINDOWS[index];
  if (p < w.in || p >= w.gone) return 0;
  if (p < w.full) return smoothstep((p - w.in) / (w.full - w.in));
  if (p < w.out) return 1;
  return 1 - smoothstep((p - w.out) / (w.gone - w.out));
}

export function HudOverlay({ chapter, index, progress }) {
  const o = useMemo(() => opacityFor(index, progress), [index, progress]);
  const yPx = (1 - o) * 14;
  // Mobile: sit low in the frame so the artifact owns the upper half instead of being
  // covered by the chapter text. Desktop keeps the centred left column.
  return (
    <div
      className="absolute left-5 right-5 bottom-28 sm:left-12 sm:right-auto sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-lg font-mono pointer-events-none select-none"
      aria-hidden={o < 0.01}
    >
      {/* Positioning lives on the wrapper (incl. the responsive -50% centring); the
          animated offset lives here, so an inline transform can't clobber it. */}
      <div style={{ opacity: o, transform: `translateY(${yPx}px)`, willChange: 'opacity, transform' }}>
      {/* Accent rail */}
      <div className="flex items-start gap-5">
        <div className="w-px self-stretch min-h-[110px] sm:min-h-[180px] bg-gradient-to-b from-[#4ECDC4] via-[#4ECDC4]/40 to-transparent mt-2" aria-hidden="true" />
        <div>
          <div className="text-[#4ECDC4] text-[10px] tracking-[0.32em] mb-2 sm:mb-3">CHAPTER {String(index + 1).padStart(2, '0')}</div>
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-2 sm:mb-4">
            {chapter.org}
          </h2>
          <div className="text-white/85 text-sm sm:text-base md:text-lg mb-1 tracking-wide">{chapter.years}</div>
          <div className="text-white/90 text-base sm:text-lg md:text-xl mb-1 sm:mb-2">{chapter.role}</div>
          <div className="text-white/55 text-xs sm:text-sm mb-3 sm:mb-6 italic">{chapter.detail}</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1.5 text-white/75 text-[10px] sm:text-xs">
            {chapter.stack.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-sm bg-white/[0.04] border border-white/[0.10]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
