// Brief narrative beat that flashes during each crossfade window. Explains *why* the
// next chapter is next, in his voice — connects the artifacts as one career, not three.

import { useMemo } from 'react';

const BRIDGES = [
  // Elbit → KLA: 0.30..0.50
  { from: 0.30, to: 0.50, text: 'Defense was the start. Then the semiconductor side called.' },
  // KLA → WEM: 0.65..0.85
  { from: 0.65, to: 0.85, text: 'Five years in the cleanroom. Now the energy grid.' },
];

function bridgeForProgress(p) {
  for (const b of BRIDGES) {
    if (p >= b.from && p <= b.to) {
      const t = (p - b.from) / (b.to - b.from);   // 0..1 across the window
      // Bell-shaped opacity: 0 → 1 → 0
      const opacity = Math.sin(t * Math.PI);
      return { text: b.text, opacity };
    }
  }
  return null;
}

export function BridgeCaption({ progress }) {
  const bridge = useMemo(() => bridgeForProgress(progress), [progress]);
  if (!bridge) return null;

  return (
    <div
      className="absolute bottom-32 left-1/2 -translate-x-1/2 max-w-2xl text-center pointer-events-none"
      style={{ opacity: bridge.opacity }}
      aria-hidden="true"
    >
      <div className="text-white text-xl md:text-2xl font-mono tracking-tight leading-snug">
        {bridge.text}
      </div>
    </div>
  );
}
