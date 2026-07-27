// Scripted replay of a real mtop session. Column formats, colours, key hints and
// status line are copied from internal/ui/app.go so what renders here is what the
// binary prints — see modelsPane/gpuPane/requestsPane/throughputPane in that file.
//
// The session it replays is the one from the README: llama3.1 has blown past its
// TTL and is still holding 6.2G, mtop marks it overdue, you press u, it's gone.

const MEM_TOTAL = 32607;

// %-22s %8s %6s %6s  %s
const QWEN = { name: 'qwen3:8b', size: '5.03G', quant: 'Q4_K_M', vram: '6.5G', ttl: '4m12s' };
const LLAMA = { name: 'llama3.1:8b', size: '4.92G', quant: 'Q4_K_M', vram: '6.2G', ttl: 'overdue, press u', overdue: true };

// %-9s %-26s %10.1f %6d %8d  %s
const req = (time, tok, out, prompt, total) => ({ time, model: 'qwen3:8b', tok, out, prompt, total });

const R = [
  req('14:21:58', 114.1, 96, 44, '860ms'),
  req('14:22:03', 109.8, 241, 118, '2.24s'),
  req('14:22:07', 112.4, 184, 92, '1.68s'),
  req('14:22:12', 111.6, 203, 76, '1.82s'),
  req('14:22:16', 113.9, 158, 61, '1.39s'),
  req('14:22:24', 118.2, 227, 84, '1.92s'),
];

const START = {
  models: [QWEN, LLAMA],
  sel: 0,
  holding: '12.7G',
  gpu: { util: 34, used: 13724, temp: 58, watt: 214 },
  gpuSpark: { util: '▃▅▆▇▆█▇▆', mem: '▆▆▇▇▇▇▇▇' },
  reqs: R.slice(0, 3),
  spark: '▄▆▅▇▆█▇▇',
  rate: 112.4,
  stats: '(peak 114 · p50 110 · p95 114 · 1.8 Wh · 3120 tok/Wh)',
  flash: null,
  key: null,
};

// Each step patches the previous frame and says how long it sits on screen.
const STEPS = [
  { hold: 1600 },
  { hold: 1100, reqs: R.slice(0, 4), gpu: { util: 41, used: 13980, temp: 59, watt: 231 } },
  { hold: 1300, reqs: R.slice(1, 5), rate: 113.9, spark: '▆▅▇▆█▇▇█', gpu: { util: 37, used: 13892, temp: 60, watt: 226 } },
  { hold: 900, sel: 1, key: 'j' },
  { hold: 1100, key: 'u' },
  {
    hold: 2400,
    models: [QWEN],
    sel: 0,
    key: null,
    holding: '6.5G',
    flash: 'unloaded llama3.1:8b',
    gpu: { util: 22, used: 7376, temp: 52, watt: 141 },
    gpuSpark: { util: '▅▇▆█▇▆▃▂', mem: '▇▇▇▇▇▆▃▂' },
  },
  {
    hold: 2200,
    flash: null,
    reqs: R.slice(2, 6),
    rate: 118.2,
    spark: '▅▇▆█▇▇█▇',
    stats: '(peak 118 · p50 112 · p95 118 · 2.1 Wh · 3402 tok/Wh)',
    gpu: { util: 44, used: 7612, temp: 55, watt: 189 },
  },
];

export const FRAMES = STEPS.reduce((acc, { hold, ...patch }) => {
  return [...acc, { ...(acc[acc.length - 1] ?? START), ...patch, hold }];
}, []);

export const META = {
  gpuName: 'NVIDIA GeForce RTX 5090',
  memTotal: MEM_TOTAL,
  version: 'v1.3.0',
  proxy: '127.0.0.1:4321',
};

export const pct = (used) => Math.round((used * 100) / MEM_TOTAL);

// The Go side pads with Sprintf; doing the same here keeps the columns identical
// instead of approximating them with CSS widths.
export const modelRow = (m) =>
  `${m.name.padEnd(22)} ${m.size.padStart(8)} ${m.quant.padStart(6)} ${m.vram.padStart(6)}  ${m.ttl}`;

export const MODEL_HEAD = `${'NAME'.padEnd(22)} ${'SIZE'.padStart(8)} ${'QUANT'.padStart(6)} ${'VRAM'.padStart(6)}  TTL`;

export const reqRow = (r) =>
  `${r.time.padEnd(9)} ${r.model.padEnd(26)} ${r.tok.toFixed(1).padStart(10)} ${String(r.out).padStart(6)} ${String(r.prompt).padStart(8)}  ${r.total}`;

export const REQ_HEAD = `${'TIME'.padEnd(9)} ${'MODEL'.padEnd(26)} ${'TOK/S'.padStart(10)} ${'OUT'.padStart(6)} ${'PROMPT'.padStart(8)}  TOTAL`;
