// Character-by-character snippet typing for the active chapter.
// Restarts when the chapter changes. 30ms/char, +50ms after punctuation, +100ms on newline.

import { useEffect, useState, useMemo } from 'react';

function activeIndex(p) {
  if (p < 0.22) return 0;
  if (p < 0.60) return 1;
  return 2;
}

export function TerminalStream({ chapters, progress }) {
  const idx = useMemo(() => activeIndex(progress), [progress]);
  const snippet = chapters[idx].snippet;
  const full = useMemo(() => snippet.join('\n'), [snippet]);
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    let cancelled = false;
    const tick = () => {
      if (cancelled || i >= full.length) return;
      const ch = full[i];
      setShown((s) => s + ch);
      i++;
      let delay = 30;
      if (ch === '\n') delay = 100;
      else if (/[.,;:)}]/.test(ch)) delay = 80;
      setTimeout(tick, delay);
    };
    const start = setTimeout(tick, 250);
    return () => { cancelled = true; clearTimeout(start); };
  }, [full]);

  // Tail fade: clear out for the FuturePrompt at the end of the hero
  const tailFade = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.07) : 1;

  return (
    <div
      className="absolute bottom-10 right-10 max-w-lg font-mono text-xs leading-relaxed text-white/75 pointer-events-none select-none whitespace-pre"
      style={{ minHeight: '6rem', opacity: tailFade }}
    >
      <span className="text-[#4ECDC4]/70">{'>'} </span>
      <span>{shown}</span>
      <span className="inline-block w-[7px] h-[1em] align-[-2px] bg-[#4ECDC4]/80 ml-px animate-pulse" />
    </div>
  );
}
