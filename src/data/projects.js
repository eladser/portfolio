// Project list — real repos, real URLs, real descriptions. Don't invent.

export const PROJECTS = [
  {
    id: 'seerlens',
    name: 'Seerlens',
    tagline: 'local devtools for AI calls',
    status: { label: 'On NuGet', tone: 'teal' },
    featured: true,
    description:
      "Think of it as the browser Network tab pointed at your AI calls. One line of setup and a local dashboard shows every LLM call your app makes: the prompt, what it cost, how many tokens, how long it took, and which tools it called. Built around OpenTelemetry so it works from .NET, Python, or JS. Runs on your machine, no signup.",
    tags: ['C#', '.NET', 'OpenTelemetry', 'LLM observability'],
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
    tagline: 'live HTTP traffic for ASP.NET Core',
    status: { label: 'On NuGet', tone: 'purple' },
    description:
      "Got tired of adding Console.WriteLine everywhere to figure out what's happening. Built a middleware that shows me all HTTP traffic in real-time through a web dashboard. Uses SignalR to push updates as they happen. Now I actually know why things break.",
    tags: ['C#', '.NET Core', 'SignalR'],
    links: {
      source: 'https://github.com/eladser/AspNetDebugDashboard',
      nuget: 'https://www.nuget.org/packages/AspNetCore.DebugDashboard',
    },
    githubRepo: 'eladser/AspNetDebugDashboard',
    fallbackStars: 0,
    accent: 'purple',
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
