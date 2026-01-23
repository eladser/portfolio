import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

/**
 * Terminal - Interactive terminal component with commands
 *
 * Features:
 * - Interactive command input
 * - Command history (up/down arrows)
 * - Tab completion
 * - ASCII art
 * - Custom commands
 *
 * Usage:
 * <Terminal
 *   isDark={true}
 *   commands={{
 *     help: { description: 'Show available commands', execute: (args) => 'Help text...' },
 *     skills: { description: 'List technical skills', execute: (args) => 'Skills list...' }
 *   }}
 * />
 */

const Terminal = ({ isDark = true, commands = {}, prompt = 'elad@portfolio:~$' }) => {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to Elad\'s Portfolio Terminal v2.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
    { type: 'output', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Default commands
  const defaultCommands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        const commandList = Object.entries({ ...defaultCommands, ...commands })
          .map(([cmd, { description }]) => `  ${cmd.padEnd(15)} - ${description}`)
          .join('\n');
        return `Available commands:\n${commandList}`;
      },
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => {
        setHistory([]);
        return null;
      },
    },
    about: {
      description: 'Display information about Elad',
      execute: () => `
╔════════════════════════════════════════════╗
║         ELAD SERTSHUK - .NET DEVELOPER     ║
╚════════════════════════════════════════════╝

Full-stack developer specializing in:
  • .NET 8 / ASP.NET Core
  • SignalR (Real-time applications)
  • React / TypeScript
  • Azure / AWS / Docker

Location: Israel
Status:   Available for hire
Email:    elad.ser@gmail.com
GitHub:   github.com/eladser
`,
    },
    skills: {
      description: 'List technical skills',
      execute: () => `
Backend:     C#, .NET 8, ASP.NET Core, SignalR
Frontend:    React, TypeScript, JavaScript, Tailwind CSS
Database:    SQL Server, Entity Framework, Redis
DevOps:      Docker, GitHub Actions, Azure, AWS
Tools:       Git, Vite, Visual Studio, VS Code
`,
    },
    projects: {
      description: 'Show portfolio projects',
      execute: () => `
┌─────────────────────────────────────────────┐
│ DEBUG DASHBOARD                              │
├─────────────────────────────────────────────┤
│ Real-time HTTP traffic monitoring for .NET  │
│ Technologies: C#, SignalR, ASP.NET Core     │
│ GitHub: github.com/eladser/debug-dashboard  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ .NET TOOLS                                   │
├─────────────────────────────────────────────┤
│ Utility functions for .NET development      │
│ Technologies: C#, NuGet                     │
│ GitHub: github.com/eladser/dotnet-tools     │
└─────────────────────────────────────────────┘
`,
    },
    contact: {
      description: 'Display contact information',
      execute: () => `
📧 Email:    elad.ser@gmail.com
🐙 GitHub:   github.com/eladser
💼 LinkedIn: linkedin.com/in/eladser
🌐 Website:  eladser.github.io/portfolio
`,
    },
    coffee: {
      description: 'Check coffee status',
      execute: () => `
    )  (
   (   ) )
    ) ( (
  ._______.
  |~~~~~~~|
  |       |
  |_______|

Status: ☕ Ready for coffee and code!
`,
    },
    whoami: {
      description: 'Display current user',
      execute: () => 'elad-sertshuk',
    },
    date: {
      description: 'Display current date and time',
      execute: () => new Date().toString(),
    },
  };

  const allCommands = { ...defaultCommands, ...commands };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    // Add command to history
    setHistory((prev) => [...prev, { type: 'command', content: `${prompt} ${trimmedCmd}` }]);
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Parse command and arguments
    const [commandName, ...args] = trimmedCmd.split(' ');
    const command = allCommands[commandName.toLowerCase()];

    if (command) {
      const output = command.execute(args);
      if (output !== null) {
        setHistory((prev) => [...prev, { type: 'output', content: output }]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'error', content: `Command not found: ${commandName}. Type "help" for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion
      const matchingCommands = Object.keys(allCommands).filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      }
    }
  };

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden font-mono ${
        isDark ? 'bg-[#1e1e1e] border-white/10' : 'bg-zinc-50 border-black/10'
      }`}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div
        className={`flex items-center gap-3 px-4 py-3 border-b ${
          isDark ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'
        }`}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
          <TerminalIcon size={16} aria-hidden="true" />
          <span>terminal</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className={`p-4 h-[500px] overflow-y-auto ${isDark ? 'text-green-400' : 'text-green-700'}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: isDark ? '#ffffff20 transparent' : '#00000020 transparent',
        }}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className={`mb-1 whitespace-pre-wrap ${
                entry.type === 'command'
                  ? isDark
                    ? 'text-purple-400'
                    : 'text-purple-600'
                  : entry.type === 'error'
                  ? isDark
                    ? 'text-red-400'
                    : 'text-red-600'
                  : ''
              }`}
            >
              {entry.content}
            </m.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className={`flex items-center gap-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
          <span>{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent outline-none ${isDark ? 'text-green-400' : 'text-green-700'}`}
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
          <ChevronRight size={14} className="animate-pulse" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
