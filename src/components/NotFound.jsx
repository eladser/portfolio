import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [typedCommand, setTypedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && typedCommand.length > 0) {
        if (typedCommand.toLowerCase() === 'cd /home' || typedCommand.toLowerCase() === 'cd ~' || typedCommand.toLowerCase() === 'home') {
          navigate('/');
        } else {
          setShowOutput(true);
        }
        return;
      }

      if (e.key === 'Backspace') {
        setTypedCommand(prev => prev.slice(0, -1));
        setShowOutput(false);
        return;
      }

      if (e.key.length === 1 && typedCommand.length < 30) {
        setTypedCommand(prev => prev + e.key);
        setShowOutput(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedCommand, navigate]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Grid pattern */}
      <div
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
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #0a0a0a 70%)'
        }}
      />

      <div className="h-full flex items-center justify-center px-8">
        <div className="max-w-2xl w-full">
          {/* ASCII 404 */}
          <m.pre
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-red-500/80 text-xs sm:text-sm mb-8 select-none"
          >
{`
    ██╗  ██╗ ██████╗ ██╗  ██╗
    ██║  ██║██╔═████╗██║  ██║
    ███████║██║██╔██║███████║
    ╚════██║████╔╝██║╚════██║
         ██║╚██████╔╝     ██║
         ╚═╝ ╚═════╝      ╚═╝
`}
          </m.pre>

          {/* Terminal Window */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border overflow-hidden bg-[#0d0d0d] border-white/10"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-zinc-500 ml-2">bash — 404</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-sm space-y-2">
              <div className="text-zinc-500">
                <span className="text-red-400">error:</span> path not found
              </div>
              <div className="text-zinc-500">
                <span className="text-zinc-600">location:</span> {window.location.pathname}
              </div>
              <div className="h-4" />

              {/* Command prompt */}
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">guest@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-zinc-500">$</span>
                <span className="text-white ml-1">
                  {typedCommand}
                  <span className={`inline-block w-2 h-4 bg-white ml-0.5 -mb-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
                </span>
              </div>

              {/* Output */}
              {showOutput && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400"
                >
                  bash: {typedCommand}: command not found
                </m.div>
              )}
            </div>
          </m.div>

          {/* Hints */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center space-y-2"
          >
            <p className="text-zinc-500 text-sm">
              Type <code className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-400 font-mono text-xs">cd /home</code> to go back
            </p>
            <p className="text-zinc-600 text-xs">
              or just{' '}
              <button
                onClick={() => navigate('/')}
                className="text-zinc-400 hover:text-white underline underline-offset-2 transition-colors"
              >
                click here
              </button>
            </p>
          </m.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
