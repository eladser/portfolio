// Two small scroll/mount text effects. Both fall back to the final value under
// prefers-reduced-motion. rAF-driven, no deps.
import { useEffect, useRef, useState } from 'react';

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const GLYPHS = '!<>-_\\/[]{}=+*^?#$%&';

// Decode-on-mount: scrambles glyphs, then resolves left-to-right to `text`.
export function ScrambleText({ text, className = '', duration = 650 }) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reduced()) { setOut(text); return; }
    let raf, start;
    const n = text.length;
    const tick = (t) => {
      start ??= t;
      const p = Math.min(1, (t - start) / duration);
      const shown = Math.floor(p * n);
      let s = '';
      for (let i = 0; i < n; i++) {
        s += i < shown || text[i] === ' ' ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);
  return <span className={className}>{out}</span>;
}

// Counts from 0 to `value` once visible (easeOutCubic).
export function CountUp({ value, duration = 1100, className = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (reduced()) { setN(value); return; }
    const el = ref.current;
    let raf, start, ran = false;
    const run = () => {
      const tick = (t) => {
        start ??= t;
        const p = Math.min(1, (t - start) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setN(value);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ran) { ran = true; run(); io.disconnect(); }
    }, { threshold: 0.4 });
    if (el) io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration]);
  return <span ref={ref} className={className}>{n.toLocaleString()}</span>;
}
