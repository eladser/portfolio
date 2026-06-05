// Persistent top-right timeline. Three nodes for the three chapters; the active one
// fills teal and the connector line fills proportionally to scroll. Always visible so
// the visitor knows "I'm 2 of 3" without having to guess.

import { useMemo } from 'react';

const smoothstep = (t) => t * t * (3 - 2 * t);

function activeIndex(p) {
  if (p < 0.42) return 0;
  if (p < 0.75) return 1;
  if (p < 0.92) return 2;
  return 3;            // future "?" — lights up at the end
}

// Connector fill 0..1 across the whole timeline (4 evenly-spaced nodes)
function lineFill(p) {
  // Three settled holds; connector lands at each node when that chapter is active
  if (p < 0.15) return 0;
  if (p < 0.40) return smoothstep((p - 0.15) / 0.25) * (1 / 3);
  if (p < 0.55) return 1 / 3;
  if (p < 0.80) return 1 / 3 + smoothstep((p - 0.55) / 0.25) * (1 / 3);
  if (p < 0.92) return 2 / 3;
  return 2 / 3 + Math.min(1, (p - 0.92) / 0.08) * (1 / 3);
}

export function TimelineIndicator({ chapters, progress }) {
  const active = useMemo(() => activeIndex(progress), [progress]);
  const fill = useMemo(() => lineFill(progress), [progress]);
  // 4 nodes: the three real chapters + a future "?" placeholder
  const nodes = [
    ...chapters.map((c) => ({ year: String(c.yearStart) })),
    { year: '?', future: true },
  ];

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
        {/* Four nodes: 3 chapters + future "?" */}
        {nodes.map((n, i) => {
          const isActive = i === active;
          const isPast = i < active;
          const isFuture = !!n.future;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-3.5 h-3.5 rounded-full border transition-colors duration-300 ${
                  isActive && !isFuture
                    ? 'bg-[#4ECDC4] border-[#4ECDC4] shadow-[0_0_12px_rgba(78,205,196,0.6)]'
                    : isActive && isFuture
                    ? 'bg-[#0a0a0a] border-[#4ECDC4] shadow-[0_0_12px_rgba(78,205,196,0.45)]'
                    : isPast
                    ? 'bg-[#4ECDC4]/40 border-[#4ECDC4]/60'
                    : 'bg-[#0a0a0a] border-white/25'
                }`}
              />
              <div
                className={`absolute top-6 text-[11px] font-mono tracking-wider whitespace-nowrap ${
                  isActive ? 'text-[#4ECDC4]' : 'text-white/45'
                }`}
              >
                {n.year}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-right font-mono text-[10px] tracking-[0.24em] text-white/45">
        {active < 3 ? `CHAPTER ${active + 1} OF 3` : `WHAT'S NEXT?`}
      </div>
    </div>
  );
}
