// Dev-only panel. Append ?debug=rot to the URL to show sliders for each artifact's
// base rotation (rx, ry, rz). Drag, find the right orientation, copy the values back.
// Stores live values in window.__hero_base so the artifact component can read them.

import { useEffect, useState } from 'react';
import { CAREER } from '../../data/career';

const KEY = '__hero_base';

function read() {
  return window[KEY] || CAREER.map(() => ({ rx: 0, ry: 0, rz: 0 }));
}
function write(arr) {
  window[KEY] = arr;
  window.dispatchEvent(new Event('hero-base-changed'));
}

export function RotationDebugPanel() {
  const [enabled, setEnabled] = useState(false);
  const [vals, setVals] = useState(read);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const on = params.get('debug') === 'rot';
    setEnabled(on);
    // ONLY initialise the global when debug is on — otherwise artifacts would
    // detect a live override and stay in side-by-side debug mode permanently
    if (on && !window[KEY]) write(CAREER.map(() => ({ rx: 0, ry: 0, rz: 0 })));
    if (!on && window[KEY]) { delete window[KEY]; window.dispatchEvent(new Event('hero-base-changed')); }
  }, []);

  if (!enabled) return null;

  const upd = (i, k, v) => {
    const next = vals.map((p) => ({ ...p }));
    next[i][k] = v;
    setVals(next);
    write(next);
  };

  const copy = () => {
    const lines = vals.map((p, i) => `  { rx: ${p.rx.toFixed(2)}, ry: ${p.ry.toFixed(2)}, rz: ${p.rz.toFixed(2)} },  // ${CAREER[i].id}`);
    const out = '// paste into BASE[] in CareerArtifact.jsx\n' + lines.join('\n');
    navigator.clipboard?.writeText(out);
    console.log(out);
  };

  return (
    <div
      className="fixed top-4 right-4 z-[100] bg-[#0a0a0a]/95 border border-[#4ECDC4]/30 rounded-md p-4 w-80 font-mono text-xs text-white/85 backdrop-blur-md pointer-events-auto"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[#4ECDC4] tracking-wider">ROTATION TUNER</div>
        <button onClick={copy} className="text-[10px] tracking-wider text-white/60 hover:text-[#4ECDC4] border border-white/15 px-2 py-0.5 rounded">
          COPY
        </button>
      </div>
      {CAREER.map((c, i) => (
        <div key={c.id} className="mb-4 last:mb-0">
          <div className="text-white/80 mb-1.5">{c.id}</div>
          {['rx', 'ry', 'rz'].map((k) => (
            <div key={k} className="flex items-center gap-2 mb-1">
              <span className="w-5 text-white/50">{k}</span>
              <input
                type="range"
                min="-3.14"
                max="3.14"
                step="0.01"
                value={vals[i][k]}
                onChange={(e) => upd(i, k, parseFloat(e.target.value))}
                className="flex-1 accent-[#4ECDC4]"
              />
              <span className="w-12 text-right text-white/70 tabular-nums">{vals[i][k].toFixed(2)}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="text-[10px] text-white/40 mt-2 leading-tight">
        Append <span className="text-[#4ECDC4]">?debug=rot</span> to use this. COPY puts code-ready values on clipboard.
      </div>
    </div>
  );
}
