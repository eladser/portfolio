// Small always-visible widget bottom-left. Real activity signals from GitHub events.
// Pulls double duty: shows the site is "alive" + gives a true window into recent work.

import { useLiveSignals } from '../hooks/useLiveSignals';

export function LiveStrip() {
  const { loading, error, pushesThisWeek, reposTouched, lastPush } = useLiveSignals();

  return (
    <div
      className="fixed bottom-4 left-4 z-30 font-mono text-[10px] leading-relaxed pointer-events-auto select-none"
      aria-label="Live activity from GitHub"
    >
      <div className="bg-black/65 backdrop-blur-sm border border-white/10 rounded px-2.5 py-1.5 min-w-[180px]">
        <div className="flex items-center gap-1.5 text-white/55 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4]" style={{ boxShadow: '0 0 6px #4ECDC4' }} />
          <span className="tracking-[0.2em] uppercase">live · gh</span>
        </div>
        {loading ? (
          <div className="text-white/40">loading…</div>
        ) : error ? (
          <div className="text-white/40">offline</div>
        ) : (
          <div className="text-white/75 space-y-0.5">
            <div>
              <span className="text-[#4ECDC4]">{pushesThisWeek}</span>
              <span className="text-white/45"> pushes · 7d · </span>
              <span className="text-[#4ECDC4]">{reposTouched}</span>
              <span className="text-white/45"> {reposTouched === 1 ? 'repo' : 'repos'}</span>
            </div>
            {lastPush && (
              <div className="text-white/45">
                last push <span className="text-white/75">{lastPush}</span>
              </div>
            )}
          </div>
        )}
        {/* Contact links — visible on every view since LiveStrip is fixed. */}
        <div className="mt-1.5 pt-1.5 border-t border-white/10 flex items-center gap-2.5 text-white/55">
          <a
            href="https://github.com/eladser"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4ECDC4] transition-colors"
          >
            gh
          </a>
          <span className="text-white/15" aria-hidden="true">/</span>
          <a
            href="https://linkedin.com/in/eladser"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4ECDC4] transition-colors"
          >
            in
          </a>
          <span className="text-white/15" aria-hidden="true">/</span>
          <a
            href="mailto:elad.ser@gmail.com"
            className="hover:text-[#4ECDC4] transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </div>
  );
}
