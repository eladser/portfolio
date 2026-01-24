import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal, X, Github } from 'lucide-react';
import TechTimeline from './TechTimeline';
import GitHubActivity from './GitHubActivity';
import CodeShowcase from './CodeShowcase';
import TerminalComponent from './Terminal';
import TechStackViz from './TechStackViz';
import SoundToggle from './SoundToggle';
import useEasterEggs from '../hooks/useEasterEggs';
import useSoundEffects from '../hooks/useSoundEffects';

const skills = [
  { name: 'C#', color: 'purple' },
  { name: '.NET Core', color: 'purple' },
  { name: 'ASP.NET', color: 'purple' },
  { name: 'SignalR', color: 'purple' },
  { name: 'SQL Server', color: 'blue' },
  { name: 'Node.js', color: 'green' },
  { name: 'React', color: 'cyan' },
  { name: 'TypeScript', color: 'blue' },
  { name: 'JavaScript', color: 'yellow' },
  { name: 'HTML/CSS', color: 'orange' },
  { name: 'Tailwind', color: 'cyan' },
  { name: 'Docker', color: 'blue' },
  { name: 'Azure', color: 'blue' },
  { name: 'AWS', color: 'orange' },
  { name: 'Git', color: 'orange' },
];

const skillColors = {
  purple: { bg: 'bg-purple-950', text: 'text-purple-400', border: 'border-purple-800' },
  blue: { bg: 'bg-blue-950', text: 'text-blue-400', border: 'border-blue-800' },
  green: { bg: 'bg-emerald-950', text: 'text-emerald-400', border: 'border-emerald-800' },
  cyan: { bg: 'bg-cyan-950', text: 'text-cyan-400', border: 'border-cyan-800' },
  yellow: { bg: 'bg-amber-950', text: 'text-amber-400', border: 'border-amber-800' },
  orange: { bg: 'bg-orange-950', text: 'text-orange-400', border: 'border-orange-800' },
};

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
          <span className="text-xs font-mono text-zinc-300">debug-dashboard — localhost:5000</span>
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [nameClicks, setNameClicks] = useState(0);
  const consoleRef = useRef(null);
  const consoleCloseButtonRef = useRef(null);
  const consoleTriggerRef = useRef(null);

  const isDark = true;

  // Easter eggs and sound effects
  const { konamiActivated } = useEasterEggs();
  const { playSound } = useSoundEffects();

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

  const handleNameClick = () => {
    const newCount = nameClicks + 1;
    setNameClicks(newCount);
    if (newCount >= 5) {
      setShowConsole(true);
      setNameClicks(0);
    }
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNameClick();
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-500 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to main content
      </a>
      <a href="#main-nav" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-500 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to navigation
      </a>
      <a href="#contact-section" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-500 focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to contact
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full"
            >
              <header role="banner" className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-10">
                <div className="relative flex items-center gap-3">
                  <button
                    onClick={() => setShowShortcuts(!showShortcuts)}
                    aria-label="Show keyboard shortcuts"
                    aria-expanded={showShortcuts}
                    aria-controls="shortcuts-menu"
                    className="w-6 h-6 rounded-full border border-zinc-700 text-gray-300 hover:text-gray-300 hover:border-zinc-500 text-xs font-mono transition-colors"
                  >
                    ?
                  </button>
                  <SoundToggle isDark={isDark} />
                <AnimatePresence>
                  {showShortcuts && (
                    <m.div
                      id="shortcuts-menu"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-10 left-0 p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-1.5 w-48 shadow-xl"
                    >
                      <div className="flex justify-between text-zinc-300">
                        <span>Navigate</span>
                        <span className="text-gray-300">1 2 3</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span>Debug console</span>
                        <span className="text-gray-300">Ctrl+Shift+D</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span>Close</span>
                        <span className="text-gray-300">Esc</span>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="font-mono text-xs tracking-wider text-gray-300">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jerusalem' })}
                <span className="ml-1.5 text-gray-400">IL</span>
              </span>
            </header>

            <div className="h-full flex items-center justify-center px-8">
              <div className="flex items-center gap-16 max-w-5xl">
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex-shrink-0"
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${import.meta.env.BASE_URL}profile-160.webp 160w, ${import.meta.env.BASE_URL}profile-320.webp 320w`}
                      sizes="160px"
                    />
                    <img
                      src={`${import.meta.env.BASE_URL}profile.jpg`}
                      alt="Elad Sertshuk, Full-Stack Developer specializing in .NET"
                      width="160"
                      height="160"
                      loading="eager"
                      fetchPriority="high"
                      className={`w-40 h-40 rounded-2xl object-cover ${
                        isDark ? 'ring-1 ring-white/10' : 'ring-1 ring-black/10'
                      }`}
                    />
                  </picture>
                </m.div>

                <div className="flex-1 space-y-6">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className={`text-5xl font-bold tracking-tight mb-3`}>
                      <button
                        onClick={handleNameClick}
                        onKeyDown={handleNameKeyDown}
                        className={`cursor-default select-none transition-colors ${
                          isDark
                            ? 'text-white hover:text-zinc-200'
                            : 'text-zinc-900 hover:text-zinc-700'
                        }`}
                        aria-label="Click 5 times to open debug console"
                      >
                        Elad Sertshuk
                      </button>
                    </h1>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                      Full-stack developer, mostly .NET
                    </p>
                  </m.div>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-base leading-relaxed max-w-lg ${isDark ? 'text-gray-300' : 'text-gray-300'}`}
                  >
                    I build backend systems, debug other people's code, and occasionally make things look nice on the frontend.
                    Currently obsessing over developer tooling and real-time applications.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const colors = skillColors[skill.color];
                        return (
                          <span
                            key={skill.name}
                            className={`px-3 py-1.5 rounded-lg text-sm border ${
                              isDark
                                ? `${colors.bg} ${colors.text} ${colors.border}`
                                : 'bg-black/5 text-gray-300 border-transparent'
                            }`}
                          >
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                  </m.div>

                  <m.div
                    id="contact-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 pt-2"
                  >
                    <a
                      href="https://github.com/eladser"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        isDark
                          ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                          : 'text-zinc-300 hover:text-zinc-900 hover:bg-black/5'
                      }`}
                    >
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span className="text-sm font-mono relative">
                        gh
                        <span className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-zinc-900'}`} />
                      </span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/eladser"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn profile"
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        isDark
                          ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                          : 'text-zinc-300 hover:text-zinc-900 hover:bg-black/5'
                      }`}
                    >
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span className="text-sm font-mono relative">
                        in
                        <span className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-zinc-900'}`} />
                      </span>
                      <span className="sr-only">(opens in new tab)</span>
                    </a>
                    <a
                      href="mailto:elad.ser@gmail.com"
                      aria-label="Email me at elad.ser@gmail.com"
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        isDark
                          ? 'text-zinc-300 hover:text-white hover:bg-white/5'
                          : 'text-zinc-300 hover:text-zinc-900 hover:bg-black/5'
                      }`}
                    >
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="text-sm font-mono relative">
                        @
                        <span className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-zinc-900'}`} />
                      </span>
                    </a>
                  </m.div>
                </div>
              </div>
            </div>

            <footer role="contentinfo" className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Available for work</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-gray-400">react + vite + tailwind</span>
                <span className="font-mono text-gray-300">Israel</span>
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
            <div className="min-h-full flex items-center justify-center px-8 py-24">
              <div className="max-w-5xl w-full">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    Showcase
                  </h2>
                  <p className={`text-base ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Some things I've built over the years
                  </p>
                </m.div>

                <div className="space-y-6 mb-12">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`p-6 rounded-xl border-l-2 border ${
                      isDark
                        ? 'bg-zinc-900 border-white/10 border-l-purple-800'
                        : 'bg-black/[0.02] border-black/10 border-l-purple-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        Debug Dashboard
                      </h3>
                      <a
                        href="https://github.com/eladser/debug-dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors ${
                          isDark
                            ? 'text-gray-300 hover:text-white hover:bg-zinc-700'
                            : 'text-zinc-300 hover:text-zinc-900 hover:bg-black/5'
                        }`}
                      >
                        <Github size={14} />
                        Source
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    </div>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                      Got tired of adding Console.WriteLine everywhere to figure out what's happening.
                      Built a middleware that shows me all HTTP traffic in real-time through a web dashboard.
                      Uses SignalR to push updates as they happen. Now I actually know why things break.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['C#', '.NET Core', 'SignalR'].map((tag) => (
                        <span key={tag} className={`text-xs px-2 py-1 rounded ${
                          isDark ? 'bg-purple-950 text-purple-400' : 'bg-purple-950 text-purple-600'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`p-6 rounded-xl border ${
                      isDark
                        ? 'bg-zinc-900 border-white/10'
                        : 'bg-black/[0.02] border-black/10'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                            .NET Tools
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            isDark ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-950 text-emerald-600'
                          }`}>
                            NuGet
                          </span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                          Utility functions I kept copying between projects — JSON formatting, string helpers.
                          Packaged it properly, now on NuGet.
                        </p>
                      </div>
                      <a
                        href="https://github.com/eladser/dotnet-tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors ${
                          isDark
                            ? 'text-gray-300 hover:text-white hover:bg-zinc-700'
                            : 'text-zinc-300 hover:text-zinc-900 hover:bg-black/5'
                        }`}
                      >
                        <Github size={14} />
                        Source
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    </div>
                  </m.div>
                </div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    How to use it
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Quick setup in your ASP.NET Core app
                  </p>

                  <CodeShowcase
                    isDark={isDark}
                    title="Debug Dashboard Setup"
                    description="Add real-time HTTP monitoring to your .NET app"
                    files={[
                      {
                        name: 'Program.cs',
                        language: 'csharp',
                        code: `var builder = WebApplication.CreateBuilder(args);

// Add SignalR for real-time updates
builder.Services.AddSignalR();

var app = builder.Build();

// Add Debug Dashboard middleware
app.UseMiddleware<DebugDashboardMiddleware>();

// Map the SignalR hub
app.MapHub<DebugHub>("/debug-hub");

app.Run();`
                      },
                      {
                        name: 'appsettings.json',
                        language: 'json',
                        code: `{
  "DebugDashboard": {
    "Enabled": true,
    "Port": 5000,
    "EnableHttpLogging": true,
    "EnableDatabaseLogging": true,
    "EnableCacheLogging": true
  }
}`
                      }
                    ]}
                    highlightLines={[7, 10]}
                    demoUrl="https://github.com/eladser/debug-dashboard"
                  />
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-8"
                >
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    What it looks like
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Live HTTP traffic from the debug middleware
                  </p>

                  <TerminalDemo isDark={isDark} />
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mb-8"
                >
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
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
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Try the Terminal
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Interactive terminal with commands about me
                  </p>

                  <TerminalComponent isDark={isDark} />
                </m.div>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className={`text-center pt-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}
                >
                  <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-300'}`}>
                    Interested in working together?{' '}
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
            <div className="min-h-full flex items-center justify-center px-8 py-24">
              <div className="max-w-2xl w-full">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    About
                  </h2>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    Most of my work is in C# and .NET. I like building things that help developers
                    work faster — middleware, debugging tools, utilities. The boring stuff that
                    nobody notices until it's missing.
                  </p>
                  <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                    I've worked on enterprise backends, real-time systems with SignalR, and enough
                    frontend to get by. Currently interested in developer experience tooling —
                    the kind of thing that saves you 30 seconds a hundred times a day.
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

                <div className="grid grid-cols-2 gap-4 mt-10">
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl border bg-zinc-900 border-white/10"
                  >
                    <h3 className="text-sm font-medium mb-4 text-zinc-300">
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
                    className="p-6 rounded-xl border bg-zinc-900 border-white/10"
                  >
                    <h3 className="text-sm font-medium mb-4 text-zinc-300">
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
                    <TechStackViz isDark={isDark} />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <TechTimeline isDark={isDark} />
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
                    Best way to reach me:{' '}
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
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl backdrop-blur-xl bg-purple-950 border-2 border-purple-500/50 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎮</span>
              <div>
                <div className="text-white font-bold text-lg">Konami Code Activated!</div>
                <div className="text-purple-200 text-sm">Secret developer mode unlocked</div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
