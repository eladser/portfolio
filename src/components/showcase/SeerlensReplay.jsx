// Replays one real Seerlens trace. The spans, durations, cost, token counts and tool
// calls are read off docs/img/trace-waterfall.png in the seerlens repo; the start
// offsets are derived from the bar geometry in that capture and sum to the 1.73 s the
// header reports. Nothing here is a round number I picked.
//
// A waterfall is the one thing in that UI that a still image can't show, because the
// point of it is what happened when. So this draws it.

import { useEffect, useRef, useState } from 'react';

const TEAL = '#4ECDC4';
const VIOLET = '#A78BFA';

const SPANS = [
  { kind: 'OTHER', name: 'research agent: refund…', at: 0,    ms: 1727, root: true },
  { kind: 'LLM',   name: 'chat: gpt-4o',            at: 0,    ms: 775 },
  { kind: 'MCP',   name: 'search_docs',             at: 775,  ms: 124 },
  { kind: 'MCP',   name: 'read_file',               at: 899,  ms: 108 },
  { kind: 'LLM',   name: 'chat: gpt-4o',            at: 1007, ms: 720 },
];

const TOTAL = 1727;
const HOLD = 1400;      // beat on the finished trace before looping
const TRACE = { cost: '$0.000510', tokens: '40 / 41', model: 'gpt-4o' };

const COLOR = { LLM: TEAL, MCP: VIOLET, OTHER: '#52525b' };

const fmt = (ms) => (ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`);

function Stat({ label, value, dim }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.14em] text-zinc-600">{label}</div>
      <div className={`font-mono text-[11px] tabular-nums ${dim ? 'text-zinc-600' : 'text-zinc-200'}`}>{value}</div>
    </div>
  );
}

export function SeerlensReplay() {
  const [t, setT] = useState(TOTAL);   // finished state is also the reduced-motion state
  const boxRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    let raf;
    let start;
    const tick = (now) => {
      start ??= now;
      const e = (now - start) % (TOTAL + HOLD);
      setT(Math.min(e, TOTAL));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live]);

  const done = t >= TOTAL;
  const toolCalls = SPANS.filter((s) => s.kind === 'MCP' && t >= s.at + s.ms).length;

  return (
    <div
      ref={boxRef}
      className="rounded-md border border-white/10 bg-[#0b0f14] overflow-hidden"
      role="img"
      aria-label="Seerlens trace waterfall: an agent run costing $0.000510 over 1.73 seconds, made of a gpt-4o call, two MCP tool calls (search_docs and read_file), then a second gpt-4o call."
    >
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10">
        <span className="text-[11px] font-semibold text-zinc-200">Seerlens</span>
        <span className="font-mono text-[9px] tracking-wider" style={{ color: TEAL }}>● LIVE</span>
        <span className="ml-auto font-mono text-[9px] text-zinc-600">Traces</span>
      </div>

      <div className="p-3">
        <div className="text-[12px] text-zinc-200 mb-2.5">research agent: refund policy</div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-2 gap-x-3 mb-3">
          <Stat label="DURATION" value={fmt(t)} />
          <Stat label="COST" value={done ? TRACE.cost : '—'} dim={!done} />
          <Stat label="TOKENS" value={done ? TRACE.tokens : '—'} dim={!done} />
          <Stat label="TOOL CALLS" value={toolCalls} />
          <Stat label="MODEL" value={TRACE.model} />
          <Stat label="STATUS" value={done ? 'ok' : 'running'} dim={!done} />
        </div>

        <div className="space-y-[3px]">
          {SPANS.map((s, i) => {
            const p = Math.max(0, Math.min(1, (t - s.at) / s.ms));
            const started = t >= s.at;
            return (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-9 shrink-0 rounded-sm px-1 py-px text-center font-mono text-[8px] tracking-wider"
                  style={{ color: COLOR[s.kind], background: `${COLOR[s.kind]}1a` }}
                >
                  {s.kind}
                </span>
                <span className={`w-[104px] shrink-0 truncate text-[10px] ${s.root ? 'text-zinc-400' : 'text-zinc-300'}`}>
                  {s.name}
                </span>
                {/* No track fill — at 4% white it read as a full-width bar on every row,
                    so every span looked like it ran the whole trace. */}
                <span className="relative h-[7px] flex-1">
                  <span
                    className="absolute inset-y-0 rounded-sm"
                    style={{
                      left: `${(s.at / TOTAL) * 100}%`,
                      width: `${(s.ms / TOTAL) * 100 * p}%`,
                      background: COLOR[s.kind],
                      opacity: s.root ? 0.45 : 1,
                    }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-[10px] tabular-nums text-zinc-500">
                  {started ? fmt(Math.min(t - s.at, s.ms)) : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
