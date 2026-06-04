// Brief narrative beat that flashes during each crossfade window. Explains *why* the
// next chapter is next, in his voice — connects the artifacts as one career, not three.

import { useMemo } from 'react';

const BRIDGES = [
  // Elbit → KLA: 0.12..0.32
  { from: 0.12, to: 0.32, text: 'Four years at Elbit, then I switched to KLA.' },
  // KLA → WEM: 0.50..0.70
  { from: 0.50, to: 0.70, text: 'Five years on fab tools. Joined WEM in 2025.' },
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
