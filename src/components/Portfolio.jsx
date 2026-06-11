import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal, X, Github, Gamepad2 } from 'lucide-react';
import { CareerHeroStatic } from './CareerHeroStatic';
import { useEnable3D } from '../hooks/useEnable3D';
const CareerHero3D = lazy(() => import('./CareerHero3D'));
import { PROJECTS } from '../data/projects';
import { FeaturedProjectCard } from './showcase/FeaturedProjectCard';
import { ProjectCard } from './showcase/ProjectCard';
import GitHubActivity from './GitHubActivity';
import GitHubHeatmap from './GitHubHeatmap';
import CodeShowcase from './CodeShowcase';
import TerminalComponent from './Terminal';
import { StackUsageViz } from './StackUsageViz';
import useEasterEggs from '../hooks/useEasterEggs';
import { useSound } from '../contexts/SoundContext';
import { useHoldKey } from '../hooks/useHoldKey';
import { useFastScrollDetector } from '../hooks/useFastScrollDetector';
import { ManifestoOverlay } from './easter-eggs/ManifestoOverlay';
import { VerboseOverlay } from './easter-eggs/VerboseOverlay';

const asciiArt = `+----------------------------------+
|  public class Developer          |
|  {                               |
|      string Name = "Elad";       |
|      string Focus = ".NET";      |
|                                  |
|      void Build() =>             |
|          Tools.ThatHelp();       |
|  }                               |
+----------------------------------+`;

const TypingGame = ({ isDark }) => {
  const [gameState, setGameState] = useState('idle');
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [statusMessage, setStatusMessage] = useState('');
  const inputRef = useRef(null);

  const codeSnippets = [
    'var result = await db.QueryAsync<User>();',
    'app.UseMiddleware<DebugMiddleware>();',
    'services.AddSignalR();',
    'return Ok(new { success = true });',
    'logger.LogInformation("Request completed");',
    'builder.Services.AddDbContext<AppDb>();',
  ];

  const startGame = () => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setCurrentText(randomSnippet);
    setUserInput('');
    setGameState('playing');
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setStatusMessage('Game started. Type the code snippet shown above.');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setUserInput(value);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentText[i]) correct++;
    }
    const newAccuracy = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(newAccuracy);

    if (value === currentText) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const words = currentText.length / 5;
      const finalWpm = Math.round(words / timeElapsed);
      setWpm(finalWpm);
      setGameState('finished');
      setStatusMessage(`Game completed! You scored ${finalWpm} words per minute with ${newAccuracy}% accuracy.`);
    }
  };

  const getCharClass = (index) => {
    if (index >= userInput.length) return 'text-gray-300';
    return userInput[index] === currentText[index] ? 'text-emerald-400' : 'text-red-400 bg-red-950';
  };

  return (
    <div className={`rounded-lg border overflow-hidden ${
      isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-zinc-900 border-black/10'
    }`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <span className="text-xs font-mono text-zinc-300">typing-test.exe</span>
        {gameState === 'playing' && (
          <span className={`text-xs font-mono ${accuracy >= 90 ? 'text-emerald-400' : accuracy >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
            {accuracy}% accuracy
          </span>
        )}
        {gameState === 'finished' && (
          <span className="text-xs font-mono text-purple-400">{wpm} WPM</span>
        )}
      </div>

      <div className="p-4">
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </div>

        {gameState === 'idle' && (
          <div className="text-center py-4">
            <p className="text-zinc-300 text-sm mb-3">Test your .NET typing speed</p>
            <button
              onClick={startGame}
              className="px-4 py-2 rounded-lg bg-purple-950 text-purple-400 hover:bg-purple-900 text-sm font-medium transition-colors"
            >
              Start
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="font-mono text-sm mb-3 leading-relaxed tracking-wide">
              {currentText.split('').map((char, i) => (
                <span key={i} className={getCharClass(i)}>
                  {char}
                </span>
              ))}
            </div>
            <label htmlFor="typing-input" className="sr-only">
              Type the code snippet
            </label>
            <input
              id="typing-input"
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInput}
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 font-mono text-sm text-white focus:outline-none focus:border-purple-500/50"
              placeholder="Start typing..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-white mb-1">{wpm} WPM</div>
            <div className="text-zinc-300 text-sm mb-4">{accuracy}% accuracy</div>
            <button
              onClick={startGame}
              className="px-4 py-2 rounded-lg bg-purple-950 text-purple-400 hover:bg-purple-900 text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const TerminalDemo = ({ isDark }) => {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const sampleLogs = [
    { type: 'http', method: 'GET', path: '/api/users', status: 200, time: 12 },
    { type: 'db', query: 'SELECT * FROM Users WHERE active = 1', rows: 24, time: 3 },
    { type: 'http', method: 'POST', path: '/api/auth/login', status: 200, time: 45 },
    { type: 'cache', action: 'HIT', key: 'user:session:a4f2', time: 1 },
    { type: 'http', method: 'GET', path: '/api/products?page=1', status: 200, time: 8 },
    { type: 'db', query: 'SELECT COUNT(*) FROM Orders', rows: 1, time: 2 },
    { type: 'http', method: 'PUT', path: '/api/users/42', status: 204, time: 23 },
    { type: 'http', method: 'GET', path: '/api/orders/latest', status: 404, time: 5 },
    { type: 'cache', action: 'MISS', key: 'orders:latest', time: 0 },
    { type: 'http', method: 'POST', path: '/api/checkout', status: 201, time: 156 },
    { type: 'db', query: 'INSERT INTO Orders (user_id, total)', rows: 1, time: 8 },
  ];

  const startDemo = () => {
    setLogs([]);
    setIsRunning(true);
    setStatusMessage('Demo started. Displaying live HTTP traffic simulation.');
    let i = 0;

    const interval = setInterval(() => {
      if (i >= sampleLogs.length) {
        clearInterval(interval);
        setIsRunning(false);
        setStatusMessage('Demo completed. All traffic logs displayed.');
        return;
      }

      const log = sampleLogs[i];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [...prev, { ...log, timestamp }]);
      i++;
    }, 500);
  };

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-emerald-400';
    if (status >= 400 && status < 500) return 'text-amber-400';
    return 'text-red-400';
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'text-sky-400',
      POST: 'text-emerald-400',
      PUT: 'text-amber-400',
      DELETE: 'text-red-400',
    };
    return colors[method] || 'text-gray-300';
  };

  return (
    <div className={`rounded-lg border overflow-hidden ${
      isDark ? 'bg-[#0d0d0d] border-white/10' : 'bg-zinc-900 border-black/10'
    }`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-zinc-300" />
          <span className="text-xs font-mono text-zinc-300">AspNetDebugDashboard · localhost:5000</span>
        </div>
        <button
          onClick={startDemo}
          disabled={isRunning}
          className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
            isRunning
              ? 'bg-white/5 text-zinc-300 cursor-not-allowed'
              : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
          }`}
        >
          {isRunning ? 'Running...' : 'Run Demo'}
        </button>
      </div>
      <div className="p-4 font-mono text-xs h-52 overflow-y-auto">
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </div>
        {logs.length === 0 && !isRunning && (
          <span className="text-gray-300">Click "Run Demo" to see live traffic</span>
        )}
        {logs.map((log, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 py-0.5"
          >
            <span className="text-gray-300 w-16">{log.timestamp}</span>
            {log.type === 'http' && (
              <>
                <span className={`w-12 ${getMethodColor(log.method)}`}>{log.method}</span>
                <span className={`w-8 ${getStatusColor(log.status)}`}>{log.status}</span>
                <span className="text-gray-300 flex-1 truncate">{log.path}</span>
              </>
            )}
            {log.type === 'db' && (
              <>
                <span className="text-purple-400 w-12">SQL</span>
                <span className="text-zinc-300 w-8">{log.rows}r</span>
                <span className="text-gray-300 flex-1 truncate">{log.query}</span>
              </>
            )}
            {log.type === 'cache' && (
              <>
                <span className={`w-12 ${log.action === 'HIT' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {log.action}
                </span>
                <span className="text-zinc-300 w-8">cache</span>
                <span className="text-gray-300 flex-1 truncate">{log.key}</span>
              </>
            )}
            <span className="text-gray-300">{log.time}ms</span>
          </m.div>
        ))}
      </div>
    </div>
  );
};

const debugMessages = [
  { time: '09:42:01', type: 'info', msg: 'GET /api/portfolio 200 OK (3ms)' },
  { time: '09:42:01', type: 'info', msg: 'Resolving dependencies...' },
  { time: '09:42:02', type: 'success', msg: 'SignalR connection established' },
  { time: '09:42:02', type: 'warn', msg: 'Cache miss: profile_data' },
  { time: '09:42:03', type: 'info', msg: 'SELECT * FROM skills WHERE years > 5' },
  { time: '09:42:03', type: 'success', msg: '14 rows returned' },
  { time: '09:42:04', type: 'info', msg: 'You found this. Nice.' },
  { time: '09:42:05', type: 'warn', msg: 'TODO: fix that one bug from 2019' },
];

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Showcase' },
  { id: 'about', label: 'About' },
];

const Portfolio = () => {
  const [view, setView] = useState('home');
  const [time, setTime] = useState(new Date());
  const [showConsole, setShowConsole] = useState(false);
  const homeScrollRef = useRef(null);
  const consoleRef = useRef(null);
  const consoleCloseButtonRef = useRef(null);
  const consoleTriggerRef = useRef(null);

  const isDark = true;

  // Easter eggs and sound effects
  const { konamiActivated } = useEasterEggs();
  const { playSound } = useSound();
  const enable3D = useEnable3D();

  // M5b easter eggs: manifesto, verbose mode, fast-scroll WARN
  const [showManifesto, setShowManifesto] = useState(false);
  const [showVerbose, setShowVerbose] = useState(false);
  const [injectedTerminalLine, setInjectedTerminalLine] = useState(null);
  const terminalCommands = {
    whoami: {
      description: 'Show who you are talking to',
      execute: () => {
        setShowManifesto(true);
        return 'elad-sertshuk · see panel ↗';
      },
    },
  };
  useHoldKey('Backquote', 3000, useCallback(() => setShowVerbose((v) => !v), []));
  useFastScrollDetector(homeScrollRef, { heroDistance: 2400, thresholdMs: 1200 },
    useCallback((elapsedMs) => {
      const secs = (elapsedMs / 1000).toFixed(1);
      setInjectedTerminalLine({ type: 'error', content: `WARN: you blinked through 10 years of work in ${secs} seconds` });
    }, []));

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showConsole) return;

    const focusableElements = consoleRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [showConsole]);

  useEffect(() => {
    if (showConsole) {
      consoleTriggerRef.current = document.activeElement;
      setTimeout(() => consoleCloseButtonRef.current?.focus(), 100);
    } else if (consoleTriggerRef.current) {
      consoleTriggerRef.current.focus();
      consoleTriggerRef.current = null;
    }
  }, [showConsole]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowConsole(prev => !prev);
        return;
      }

      if (e.key === 'Escape' && showConsole) {
        setShowConsole(false);
        return;
      }

      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '1') setView('home');
      if (e.key === '2') setView('projects');
      if (e.key === '3') setView('about');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConsole]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#4ECDC4] focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <a href="#main-nav" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#4ECDC4] focus:text-black focus:px-4 focus:py-2 focus:rounded">
        Skip to navigation
      </a>

      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #0a0a0a 70%)'
        }}
      />

      <AnimatePresence>
        {showConsole && (
          <m.div
            ref={consoleRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="console-title"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-4 right-4 w-96 rounded-lg border shadow-2xl z-50 overflow-hidden ${
              isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-black/10'
            }`}
          >
            <div className={`flex items-center justify-between px-3 py-2 border-b ${
              isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
            }`}>
              <div className="flex items-center gap-2">
                <Terminal size={14} aria-hidden="true" />
                <span id="console-title" className="text-xs font-mono">debug.console</span>
              </div>
              <button
                ref={consoleCloseButtonRef}
                onClick={() => setShowConsole(false)}
                aria-label="Close debug console"
                className="text-gray-300 hover:text-zinc-300 transition-colors"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
            <div
              role="log"
              aria-live="polite"
              aria-atomic="false"
              className="p-3 font-mono text-xs space-y-1 max-h-48 overflow-y-auto"
            >
              {debugMessages.map((log, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2"
                >
                  <span className="text-gray-300">{log.time}</span>
                  <span className={
                    log.type === 'success' ? 'text-green-400' :
                    log.type === 'warn' ? 'text-yellow-400' :
                    log.type === 'error' ? 'text-red-400' :
                    'text-blue-400'
                  }>[{log.type.toUpperCase()}]</span>
                  <span className="text-zinc-300">{log.msg}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <nav id="main-nav" role="navigation" aria-label="Main navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center gap-1 p-1.5 rounded-2xl backdrop-blur-xl ${
            isDark ? 'bg-white/10 border border-white/10' : 'bg-black/10 border border-black/10'
          }`}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playSound('click');
                setView(item.id);
              }}
              onMouseEnter={() => playSound('hover')}
              aria-current={view === item.id ? 'page' : undefined}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                view === item.id
                  ? isDark ? 'text-white' : 'text-black'
                  : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-300 hover:text-black'
              }`}
            >
              {view === item.id && (
                <m.div
                  layoutId="navIndicator"
                  className={`absolute inset-0 rounded-xl ${
                    isDark ? 'bg-white/15' : 'bg-black/10'
                  }`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </m.div>
      </nav>

      <main id="main-content" className="h-full w-full">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <m.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={homeScrollRef}
              className="relative h-full w-full overflow-y-auto overflow-x-hidden"
            >
              {enable3D ? (
                <Suspense fallback={<CareerHeroStatic />}>
                  <CareerHero3D scroller={homeScrollRef} />
                </Suspense>
              ) : (
                <CareerHeroStatic />
              )}
              {/* Thin footer below the hero — right-aligned so it doesn't collide with
                  the centered nav pill OR the bottom-left LiveStrip widget. */}
              <footer className="flex justify-end px-10 pt-10 pb-24 font-mono text-[10px] tracking-[0.24em] text-white/35 uppercase">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 justify-end text-right">
                  <span>&copy; 2026</span>
                  <span aria-hidden="true">&middot;</span>
                  <a
                    href="https://github.com/eladser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#4ECDC4] transition-colors lowercase tracking-normal"
                  >
                    github
                  </a>
                  <span aria-hidden="true">&middot;</span>
                  <a
                    href="https://linkedin.com/in/eladser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#4ECDC4] transition-colors lowercase tracking-normal"
                  >
                    linkedin
                  </a>
                  <span aria-hidden="true">&middot;</span>
                  <a
                    href="mailto:elad.ser@gmail.com"
                    className="text-white/60 hover:text-[#4ECDC4] transition-colors lowercase tracking-normal"
                  >
                    elad.ser@gmail.com
                  </a>
                  <span aria-hidden="true">&middot;</span>
                  <span>react + vite + r3f</span>
                </div>
              </footer>
          </m.div>
        )}

        {view === 'projects' && (
          <m.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center px-4 sm:px-8 py-12 sm:py-24">
              <div className="max-w-5xl w-full">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 sm:mb-12"
                >
                  <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Showcase
                  </h1>
                  <p className={`text-base ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Some things I've built over the years
                  </p>
                </m.div>

                <div className="mb-12">
                  <FeaturedProjectCard project={PROJECTS[0]} />
                  <div className="grid md:grid-cols-2 gap-5">
                    {PROJECTS.slice(1).map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                  </div>
                </div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    How to use it
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Quick setup in your ASP.NET Core app
                  </p>

                  <CodeShowcase
                    isDark={isDark}
                    title="Debug Dashboard Setup"
                    description="Capture requests, EF Core queries, logs, and exceptions at /_debug"
                    files={[
                      {
                        name: 'Program.cs',
                        language: 'csharp',
                        code: `using AspNetDebugDashboard.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDebugDashboard();   // register services

var app = builder.Build();

app.UseDebugDashboard();                // middleware (no-op outside Development)

app.MapControllers();
app.Run();`
                      },
                      {
                        name: 'appsettings.json',
                        language: 'json',
                        code: `{
  "DebugDashboard": {
    "MaxEntries": 2000,
    "LogResponseBodies": true,
    "SlowQueryThresholdMs": 500
  }
}`
                      }
                    ]}
                    highlightLines={[5, 9]}
                    demoUrl="https://github.com/eladser/AspNetDebugDashboard"
                  />
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-8"
                >
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    What it looks like
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    A sample of the request and query stream it captures
                  </p>

                  <TerminalDemo isDark={isDark} />
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mb-8"
                >
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Mini Game
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    How fast can you type .NET code?
                  </p>

                  <TypingGame isDark={isDark} />
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Try the Terminal
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Interactive terminal with commands about me
                  </p>

                  <TerminalComponent
                    isDark={isDark}
                    commands={terminalCommands}
                    injectedLine={injectedTerminalLine}
                  />
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className={`text-center pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
                >
                  <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    If any of this looks useful, email me.{' '}
                    <a
                      href="mailto:elad.ser@gmail.com"
                      className={`underline underline-offset-2 ${
                        isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-900'
                      }`}
                    >
                      Send me an email
                    </a>
                  </p>
                </m.div>
              </div>
            </div>
          </m.div>
        )}

        {view === 'about' && (
          <m.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative h-full w-full overflow-auto"
          >
            <div className="min-h-full flex items-center justify-center px-4 sm:px-8 py-12 sm:py-24">
              <div className="max-w-2xl w-full">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 sm:mb-8"
                >
                  <h1 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    About
                  </h1>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Most of my work is C# and .NET. The stuff I find interesting is the invisible plumbing.
                    Middleware, debug tools, internal libraries that everyone uses but nobody talks about.
                  </p>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                    Career-wise, mostly enterprise backends and real-time stuff with SignalR. Enough frontend
                    to be useful when I need to be. Lately I keep coming back to DX tooling. The kind that
                    saves you two seconds, a few hundred times a day.
                  </p>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                    Current side project is{' '}
                    <a
                      href="https://github.com/eladser/seerlens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4ECDC4] hover:underline"
                    >
                      Seerlens
                    </a>
                    , local devtools for AI calls. Think browser Network tab, pointed at your LLM calls.
                    It catches the kind of regression you can't see in a stack trace: a prompt tweak that
                    quietly makes answers worse.
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-8"
                >
                  <pre className="font-mono text-xs text-purple-400/60 leading-tight select-none overflow-x-auto">
                    {asciiArt}
                  </pre>
                </m.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-10">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 sm:p-6 rounded-xl border bg-zinc-900 border-white/10"
                  >
                    <h3 className="text-sm font-medium mb-3 sm:mb-4 text-zinc-300">
                      Currently
                    </h3>
                    <p className="leading-relaxed text-gray-300 text-sm">
                      Working on SignalR-based tooling. Maintaining debug middleware.
                      Open to new opportunities.
                    </p>
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-4 sm:p-6 rounded-xl border bg-zinc-900 border-white/10"
                  >
                    <h3 className="text-sm font-medium mb-3 sm:mb-4 text-zinc-300">
                      Tools
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
                      <span className="px-2 py-1 rounded bg-white/5">Rider</span>
                      <span className="px-2 py-1 rounded bg-white/5">VS Code</span>
                      <span className="px-2 py-1 rounded bg-white/5">DataGrip</span>
                      <span className="px-2 py-1 rounded bg-white/5">Windows Terminal</span>
                      <span className="px-2 py-1 rounded bg-white/5">Git</span>
                    </div>
                  </m.div>
                </div>

                <div className="space-y-6 mt-10">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <StackUsageViz />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <GitHubHeatmap isDark={isDark} username="eladser" />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <GitHubActivity isDark={isDark} username="eladser" useRealData={true} />
                  </m.div>
                </div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className={`mt-10 pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
                >
                  <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Email's the easiest way to reach me.{' '}
                    <a
                      href="mailto:elad.ser@gmail.com"
                      className={`underline underline-offset-2 ${
                        isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-900'
                      }`}
                    >
                      elad.ser@gmail.com
                    </a>
                  </p>
                </m.div>
              </div>
            </div>
          </m.div>
        )}
        </AnimatePresence>
      </main>

      {/* Konami Code Easter Egg Notification */}
      <AnimatePresence>
        {konamiActivated && (
          <m.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl backdrop-blur-xl bg-[#0a0a0a]/95 border border-[#4ECDC4]/40 shadow-2xl shadow-[#4ECDC4]/10"
          >
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-7 h-7 text-[#4ECDC4]" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <div className="text-white font-bold text-lg">Konami Code Activated</div>
                <div className="text-[#4ECDC4]/80 text-sm">Secret developer mode unlocked</div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* M5b easter eggs */}
      <ManifestoOverlay open={showManifesto} onClose={() => setShowManifesto(false)} />
      <VerboseOverlay open={showVerbose} onClose={() => setShowVerbose(false)} scroller={homeScrollRef} />
    </div>
  );
};

export default Portfolio;
