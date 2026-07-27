// Replays a real mtop session in the browser. Not a video — the frames come from
// mtop-script.js and render with the same column padding the Go binary uses.

import { useEffect, useRef, useState } from 'react';
import { FRAMES, META, MODEL_HEAD, REQ_HEAD, modelRow, pct, reqRow } from './mtop-script';

const ACCENT = '#4ECDC4';
const WARN = '#FF6B6B';

// Rows come and go as models unload; fixed slot counts stop the panes from
// resizing under the rest of the page. ponytail: pad to the max the script uses.
const MODEL_SLOTS = 2;
const REQ_SLOTS = 4;

function Pane({ title, children, className = '' }) {
  return (
    <div className={`rounded border border-white/10 px-2 py-1 ${className}`}>
      <div className="font-bold" style={{ color: ACCENT }}>{title}</div>
      {children}
    </div>
  );
}

function Blank() {
  return <div>&nbsp;</div>;
}

export function MtopReplay() {
  const [i, setI] = useState(0);
  const [live, setLive] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setI(FRAMES.length - 1);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const t = setTimeout(() => setI((n) => (n + 1) % FRAMES.length), FRAMES[i].hold);
    return () => clearTimeout(t);
  }, [live, i]);

  const f = FRAMES[i];
  const memPct = pct(f.gpu.used);
  const gpuLine = `util ${String(f.gpu.util).padStart(3)}%  mem ${f.gpu.used}/${META.memTotal} MiB (${memPct}%)  ${f.gpu.temp}°C  ${f.gpu.watt}W`;
  const help = `↑/↓ select · u unload · c by model · i inspect · q quit · proxy on ${META.proxy} · ${META.version}`;

  return (
    <div
      ref={boxRef}
      className="relative rounded-md border border-white/10 bg-[#0b0b0b] overflow-hidden"
      role="img"
      aria-label="mtop terminal: two models loaded, llama3.1 flagged overdue while still holding 6.2G of VRAM, then unloaded with the u key and GPU memory drops from 42 to 22 percent."
    >
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="text-[11px] font-mono text-zinc-500">mtop</span>
      </div>

      <div className="overflow-x-auto" aria-hidden="true">
        <div className="min-w-[640px] p-2.5 font-mono text-[10px] sm:text-[11px] leading-[1.5] text-zinc-300 whitespace-pre">
          {/* Side by side like the real thing, but stacked on phones so the GPU
              numbers aren't the part you have to scroll to find. */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Pane title={<>MODELS<span className="font-normal text-zinc-500">  2 on disk</span></>} className="flex-1">
              <div className="text-zinc-500">{'  ' + MODEL_HEAD}</div>
              {Array.from({ length: MODEL_SLOTS }, (_, n) => {
                const m = f.models[n];
                if (!m) return <Blank key={n} />;
                const sel = n === f.sel;
                return (
                  <div key={m.name} style={{ color: sel ? ACCENT : m.overdue ? WARN : undefined }}>
                    {(sel ? '▸ ' : '  ') + modelRow(m)}
                  </div>
                );
              })}
            </Pane>

            <Pane title="GPU" className="flex-1">
              <div>{META.gpuName}</div>
              <div style={memPct >= 93 ? { color: WARN } : undefined}>{gpuLine}</div>
              <div className="text-zinc-500">
                {'util '}<span style={{ color: ACCENT }}>{f.gpuSpark.util}</span>
                {'  mem '}<span style={{ color: ACCENT }}>{f.gpuSpark.mem}</span>
              </div>
              <div className="text-zinc-500">{`models holding ${f.holding} of 31.8G`}</div>
            </Pane>
          </div>

          <Pane title="REQUESTS" className="mt-2">
            <div className="text-zinc-500">{REQ_HEAD}</div>
            {Array.from({ length: REQ_SLOTS }, (_, n) => {
              const r = f.reqs[n];
              return r ? <div key={r.time}>{reqRow(r)}</div> : <Blank key={n} />;
            })}
          </Pane>

          <div className="rounded border border-white/10 px-2 py-1 mt-2">
            <span className="font-bold" style={{ color: ACCENT }}>TOK/S </span>
            <span style={{ color: ACCENT }}>{f.spark}</span>
            {`  ${f.rate.toFixed(1)} `}
            <span className="text-zinc-500">{f.stats}</span>
          </div>

          <div className="px-2 pt-1.5">
            {f.flash ? (
              <>
                <span style={{ color: ACCENT }}>{f.flash}</span>
                <span className="text-zinc-500">{' · ' + help}</span>
              </>
            ) : (
              <span className="text-zinc-500">{help}</span>
            )}
          </div>
        </div>
      </div>

      {f.key && (
        <kbd className="absolute bottom-2.5 right-3 px-1.5 py-0.5 rounded border border-white/15 bg-black/70 font-mono text-[10px] text-zinc-300">
          {f.key}
        </kbd>
      )}
    </div>
  );
}
