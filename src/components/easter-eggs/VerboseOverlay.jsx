// Hold-` (tilde) for 3s → developer verbose overlay. Top-right corner. Shows live
// FPS, scroll depth %, hero progress, viewport size. Esc or click closes it.

import { useEffect, useRef, useState } from 'react';

export function VerboseOverlay({ open, onClose, scroller }) {
  const [fps, setFps] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const rafRef = useRef();
  const frameTimes = useRef([]);

  // Stable onClose so the keydown effect doesn't re-bind every parent render
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;

    // Esc closes. Backtick can also close it but only via the same 3s hold that opens
    // it (handled in useHoldKey toggle, not here) — kept symmetric so it doesn't conflict.
    const onKey = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', onKey);

    const measure = (t) => {
      // FPS rolling avg over last 60 frames
      frameTimes.current.push(t);
      if (frameTimes.current.length > 60) frameTimes.current.shift();
      if (frameTimes.current.length > 1) {
        const span = frameTimes.current[frameTimes.current.length - 1] - frameTimes.current[0];
        setFps(Math.round((frameTimes.current.length - 1) / (span / 1000)));
      }
      // scroll %
      const sc = scroller?.current;
      if (sc) {
        const max = Math.max(1, sc.scrollHeight - sc.clientHeight);
        setScrollPct(Math.round((sc.scrollTop / max) * 100));
      }
      // hero progress from window global (set by useScrollProgress consumers)
      setHeroProgress(Number(window.__hero_progress) || 0);
      setSize({ w: window.innerWidth, h: window.innerHeight });
      rafRef.current = requestAnimationFrame(measure);
    };
    rafRef.current = requestAnimationFrame(measure);

    return () => {
      window.removeEventListener('keydown', onKey);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      frameTimes.current = [];
    };
  }, [open, onClose, scroller]);

  if (!open) return null;

  const fpsColor = fps >= 55 ? 'text-emerald-400' : fps >= 40 ? 'text-amber-400' : 'text-rose-400';
  const row = 'flex justify-between gap-6';

  return (
    <div
      className="fixed top-4 right-4 z-50 font-mono text-[11px] leading-relaxed pointer-events-auto select-none"
      onClick={onClose}
      role="status"
      aria-label="verbose mode stats"
    >
      <div className="bg-black/85 backdrop-blur-sm border border-[#4ECDC4]/40 rounded px-3.5 py-2.5 min-w-[220px] text-white/80">
        <div className="flex items-center justify-between mb-2 text-[#4ECDC4] text-[10px] tracking-[0.32em]">
          <span>VERBOSE</span>
          <span className="text-white/40 normal-case tracking-normal">click · esc</span>
        </div>
        <div className="space-y-1">
          <div className={row}>
            <span className="text-white/45">fps</span>
            <span className={`${fpsColor} tabular-nums`}>{fps}</span>
          </div>
          <div className={row}>
            <span className="text-white/45">scroll</span>
            <span className="text-white/85 tabular-nums">{scrollPct}%</span>
          </div>
          <div className={row}>
            <span className="text-white/45">hero p</span>
            <span className="text-white/85 tabular-nums">{heroProgress.toFixed(3)}</span>
          </div>
          <div className={row}>
            <span className="text-white/45">viewport</span>
            <span className="text-white/85 tabular-nums">{size.w}×{size.h}</span>
          </div>
          <div className={row}>
            <span className="text-white/45">dpr</span>
            <span className="text-white/85 tabular-nums">{window.devicePixelRatio.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
