import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

/**
 * LoadingExperience - Terminal-style loading animation
 *
 * Features:
 * - Terminal boot sequence
 * - Loading messages with delays
 * - Progress bar
 * - Smooth fade out when complete
 *
 * Usage:
 * <LoadingExperience onComplete={() => setLoaded(true)} />
 */

const LoadingExperience = ({ onComplete }) => {
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { message: '> Initializing portfolio.exe...', delay: 200 },
    { message: '> Loading .NET assemblies...', delay: 300 },
    { message: '> Compiling React components...', delay: 400 },
    { message: '> Establishing SignalR connection...', delay: 350 },
    { message: '> Fetching GitHub data...', delay: 300 },
    { message: '> Rendering UI elements...', delay: 250 },
    { message: '> Optimizing performance...', delay: 200 },
    { message: '✓ Ready!', delay: 500 },
  ];

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];

      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, step.message]);
        setProgress(((currentStep + 1) / loadingSteps.length) * 100);
        setCurrentStep(currentStep + 1);
      }, step.delay);

      return () => clearTimeout(timer);
    } else if (currentStep === loadingSteps.length && !isComplete) {
      // Complete sequence
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }, 300);
    }
  }, [currentStep, isComplete, onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
        >
          <div className="w-full max-w-2xl px-6">
            {/* ASCII Art Logo */}
            <m.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-purple-400 mb-8 text-center text-xs md:text-sm whitespace-pre"
            >
              {`
  _____ _           _   ____            _       _         _
 | ____| | __ _  __| | |  _ \\ ___  _ __| |_ ___| | ____ | |
 |  _| | |/ _\` |/ _\` | | |_) / _ \\| '__| __/ _ \\ |/ / _\`|  |
 | |___| | (_| | (_| | |  __/  __/| |  | ||  __/  | (_| | |
 |_____|_|\\__,_|\\__,_| |_|   \\___||_|   \\__\\___|_ \\\\__,_|_|
              `}
            </m.div>

            {/* Loading Messages */}
            <div className="font-mono text-green-400 space-y-2 mb-6 min-h-[240px]">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-2 ${
                      message.startsWith('✓') ? 'text-green-400 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    {message}
                  </m.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                <span>Loading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <m.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Blinking Cursor */}
            {currentStep < loadingSteps.length && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-mono text-green-400 mt-4 flex items-center gap-1"
              >
                <span className="inline-block w-2 h-4 bg-green-400" />
              </m.div>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingExperience;
