// Pin a target element via GSAP ScrollTrigger and expose 0..1 progress through the pin.
// scrub:true means progress tracks scroll smoothly, no rAF debounce of our own needed.

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress(ref, { distance = 2400, scroller } = {}) {
  const [progress, setProgress] = useState(0);
  const stRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const scrollerEl = (scroller && scroller.current) || undefined;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      scroller: scrollerEl,                 // tie to the SPA's home-view scroll container
      start: 'top top',
      end: `+=${distance}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });
    stRef.current = st;
    // WEM lesson: layout shifts after fonts/images load → ScrollTrigger caches wrong start.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
      st.kill();
    };
  }, [ref, distance, scroller]);

  return progress;
}
