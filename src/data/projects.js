// Project list — real repos, real URLs, real descriptions. Don't invent.

export const PROJECTS = [
  {
    id: 'seerlens',
    name: 'Seerlens',
    tagline: 'local devtools for AI calls',
    status: { label: 'v1.0', tone: 'teal' },
    featured: true,
    description:
      "Local devtools for AI calls. One line of setup and a dashboard shows every LLM call your app makes: prompt, cost, tokens, latency, tool calls. Compare models side by side, set cost budgets with alerts, watch agent and MCP step traces, and gate CI on an eval score. .NET-first but speaks OpenTelemetry, so Python and JS land in the same dashboard.",
    tags: ['C#', '.NET', 'OpenTelemetry', 'evals', 'LLM observability'],
    links: {
      source: 'https://github.com/eladser/seerlens',
      nuget: 'https://www.nuget.org/packages/Seerlens',
    },
    githubRepo: 'eladser/seerlens',
    fallbackStars: 0,
    media: { type: 'gif', src: 'seerlens-demo.gif' },
    accent: 'teal',
  },
  {
    id: 'mtop',
    name: 'mtop',
    tagline: 'htop for your local AI',
    status: { label: 'On Homebrew', tone: 'emerald' },
    description:
      "htop for whatever local model server you're running — Ollama, llama.cpp, LM Studio, vLLM. Loaded models and their VRAM, the GPU, and live requests with tok/s, all in one terminal window. It evicts models that won't unload on their own, and a small pass-through proxy reads the per-request numbers off the wire (also exposed as Prometheus /metrics). `mtop compare` benchmarks a prompt across models.",
    tags: ['Go', 'TUI', 'Ollama', 'local LLMs'],
    links: {
      source: 'https://github.com/eladser/mtop',
    },
    githubRepo: 'eladser/mtop',
    fallbackStars: 0,
    accent: 'emerald',
  },
  {
    id: 'aerolens',
    name: 'AeroLens',
    tagline: 'real-time flight tracking',
    status: { label: 'Live', tone: 'sky' },
    description:
      "Real-time flight tracker with AI delay predictions. It pulls in live aircraft positions and weather data, and lets you save trips you want to keep an eye on. React 19 frontend, ASP.NET Core 8 + SignalR backend. The AI calls fall back between Groq, Mistral, and Gemini.",
    tags: ['React 19', 'ASP.NET Core 8', 'SignalR', 'AI/ML'],
    links: {
      live: 'https://aerolens.eladser.dev',
      source: 'https://github.com/eladser/AeroLens',
    },
    githubRepo: 'eladser/AeroLens',
    fallbackStars: 0,
    accent: 'sky',
  },
  {
    id: 'debug-dashboard',
    name: 'Debug Dashboard',
    tagline: 'Telescope-style debug panel for .NET',
    status: { label: 'v2.0', tone: 'purple' },
    description:
      "Started as a way to stop sprinkling Console.WriteLine everywhere. It's a Telescope-style panel for ASP.NET Core now: every request with the EF Core queries it ran, plus logs and exceptions, at /_debug. N+1 queries get flagged, there's copy-as-cURL and Ctrl+K search. Stores to a local LiteDB file and the whole UI ships as one offline page inside the package.",
    tags: ['C#', '.NET', 'EF Core', 'LiteDB'],
    links: {
      source: 'https://github.com/eladser/AspNetDebugDashboard',
      nuget: 'https://www.nuget.org/packages/AspNetDebugDashboard',
    },
    githubRepo: 'eladser/AspNetDebugDashboard',
    fallbackStars: 0,
    accent: 'purple',
  },
  {
    id: 'simpleconfigdiff',
    name: 'SimpleConfigDiff',
    tagline: 'diff configs by structure, not lines',
    status: { label: 'Live', tone: 'teal' },
    description:
      "Diffs config files by structure instead of by line, so a reordered YAML key or \"true\" vs true doesn't show up as noise. Ten formats and cross-format diffs, runs in the browser, installs as a PWA, and there's a CLI for CI that exits non-zero when something changed. Nothing leaves your machine.",
    tags: ['React 19', 'TypeScript', 'PWA', 'CLI'],
    links: {
      live: 'https://eladser.github.io/SimpleConfigDiff/',
      source: 'https://github.com/eladser/SimpleConfigDiff',
    },
    githubRepo: 'eladser/SimpleConfigDiff',
    fallbackStars: 0,
    accent: 'teal',
  },
  {
    id: 'dotnet-tools',
    name: '.NET Tools',
    tagline: 'utility helpers I kept rewriting',
    status: { label: 'On NuGet', tone: 'emerald' },
    description:
      "Utility functions I kept copy-pasting between projects. JSON formatting, string helpers, a few other things. Packaged it up and put it on NuGet so I'd stop doing that.",
    tags: ['C#', '.NET'],
    links: {
      source: 'https://github.com/eladser/.net-tools',
    },
    githubRepo: 'eladser/.net-tools',
    fallbackStars: 0,
    accent: 'emerald',
  },
];
