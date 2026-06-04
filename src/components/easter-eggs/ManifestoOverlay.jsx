// Slides in from the right when `whoami` is typed in the terminal. Content is in
// Elad's voice — no invented credentials, just a tight bio.

import { useEffect } from 'react';

export function ManifestoOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-[#0a0a0a]/95 border-l border-[#4ECDC4]/30 backdrop-blur-sm font-mono text-sm text-white/80 pointer-events-auto overflow-y-auto`}
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 350ms cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        role="dialog"
        aria-label="manifesto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[#4ECDC4] tracking-[0.32em] text-[10px]">$ WHOAMI</span>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-xs tracking-wider"
              aria-label="close manifesto"
            >
              [esc] close
            </button>
          </div>

          <div className="space-y-4 leading-relaxed">
            <p className="text-white">elad-sertshuk · backend engineer · haifa, il</p>

            <p>
              Started at <span className="text-[#4ECDC4]">Elbit</span> in 2014, building
              instructor consoles for military simulators. Real-time WPF apps running in
              serious rooms.
            </p>

            <p>
              Five years at <span className="text-[#4ECDC4]">KLA</span>, on cleanroom
              fab tools shipped to semiconductor fabs around the world. Field-support
              meant the bugs found you, not the other way around.
            </p>

            <p>
              Now at <span className="text-[#4ECDC4]">WEM</span>, leading the software
              side of grid-scale battery storage. C# microservices behind, React in
              front, PostgreSQL in the back. Some LLM integration work mixed in lately
              <span className="text-violet-400/90"> (Claude / Gemini / MCP)</span>.
            </p>

            <p className="text-white/55 italic">
              I like systems that have to actually work. The kind where "it should
              work" isn't enough.
            </p>

            <div className="pt-6 border-t border-white/10">
              <div className="text-white/45 text-xs tracking-wider mb-2">REACH OUT</div>
              <a
                href="mailto:elad.ser@gmail.com"
                className="text-[#4ECDC4] hover:underline"
              >
                elad.ser@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
