// Persistent top-right timeline. Three nodes for the three chapters; the active one
// fills teal and the connector line fills proportionally to scroll. Always visible so
// the visitor knows "I'm 2 of 3" without having to guess.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

function activeIndex(p) {
  if (p < 0.42) return 0;
  if (p < 0.75) return 1;
  return 2;
}

// Connector fill 0..1 across the whole timeline (matches the year ticker interpolation)
function lineFill(p) {
  // Anchor the fill at the centre of each settled window so the connector lands
  // on each node exactly when that chapter is active
  if (p < 0.15) return 0;
  if (p < 0.40) return smoothstep((p - 0.15) / 0.25) * 0.5;     // 0..0.5 (between dot 1 and 2)
  if (p < 0.55) return 0.5;
  if (p < 0.80) return 0.5 + smoothstep((p - 0.55) / 0.25) * 0.5; // 0.5..1.0
  return 1;
}

export function TimelineIndicator({ chapters, progress }) {
  const active = useMemo(() => activeIndex(progress), [progress]);
  const fill = useMemo(() => lineFill(progress), [progress]);

  return (
    <div className="absolute top-12 right-12 max-w-[24rem] pointer-events-none select-none">
      <div className="font-mono text-[10px] tracking-[0.32em] text-white/45 mb-4 text-right">
        TIMELINE
      </div>
      <div className="relative flex items-center justify-between">
        {/* Line behind the dots */}
        <div className="absolute top-1/2 left-2 right-2 h-px bg-white/15 -translate-y-1/2" aria-hidden="true" />
        <div
          className="absolute top-1/2 left-2 h-px bg-[#4ECDC4]/80 -translate-y-1/2 origin-left"
          style={{ width: `calc((100% - 16px) * ${fill})` }}
          aria-hidden="true"
        />
        {/* Three nodes */}
        {chapters.map((chap, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <div key={chap.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-3.5 h-3.5 rounded-full border transition-colors duration-300 ${
                  isActive
                    ? 'bg-[#4ECDC4] border-[#4ECDC4] shadow-[0_0_12px_rgba(78,205,196,0.6)]'
                    : isPast
                    ? 'bg-[#4ECDC4]/40 border-[#4ECDC4]/60'
                    : 'bg-[#0a0a0a] border-white/25'
                }`}
              />
              <div
                className={`absolute top-6 text-[10px] font-mono tracking-wider whitespace-nowrap ${
                  isActive ? 'text-[#4ECDC4]' : 'text-white/40'
                }`}
              >
                {chap.yearStart}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-right font-mono text-[10px] tracking-[0.24em] text-white/45">
        CHAPTER {active + 1} OF 3
      </div>
    </div>
  );
}
