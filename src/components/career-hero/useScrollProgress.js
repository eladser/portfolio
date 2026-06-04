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
    // Defer creation past the wrapper's 300ms mount animation. If ScrollTrigger measures
    // while the parent motion.div is still transforming, the first scroll bounces every
    // tick as ScrollTrigger auto-corrects against the stale layout.
    let st;
    const initTimer = setTimeout(() => {
      st = ScrollTrigger.create({
        trigger: ref.current,
        scroller: scrollerEl,               // tie to the SPA's home-view scroll container
        start: 'top top',
        end: `+=${distance}`,
        pin: true,
        pinSpacing: true,
        pinType: 'transform',               // explicit — required for non-window scrollers
        anticipatePin: 1,                   // avoid the engagement jump on first pin
        invalidateOnRefresh: true,          // re-measure on refresh, not just on first init
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
      stRef.current = st;
    }, 400);
    // WEM lesson: layout shifts after fonts/images load → ScrollTrigger caches wrong start.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(initTimer);
      clearTimeout(t);
      if (st) st.kill();
    };
  }, [ref, distance, scroller]);

  return progress;
}
