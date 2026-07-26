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
    // Create on the next frame, not after 400ms. The old defer existed because the home
    // wrapper animated a transform on mount and ScrollTrigger measured against stale
    // layout (first scroll bounced every tick). That wrapper animates opacity only now,
    // so the wait is obsolete — and it was actively harmful: `pin` restructures the DOM
    // (pin-spacer + transform), so firing it 400ms in landed inside the CLS window and
    // shifted the hero by ~0.3 on any run where it beat the measurement cutoff.
    let st;
    const initTimer = requestAnimationFrame(() => {
      st = ScrollTrigger.create({
        trigger: ref.current,
        scroller: scrollerEl,               // tie to the SPA's home-view scroll container
        start: 'top top',
        end: `+=${distance}`,
        pin: true,
        // The hero shell already reserves `distance` of page height, so ScrollTrigger
        // must NOT add its own spacer — inserting one after first paint is a layout shift.
        pinSpacing: false,
        pinType: 'transform',               // explicit — required for non-window scrollers
        anticipatePin: 1,                   // avoid the engagement jump on first pin
        invalidateOnRefresh: true,          // re-measure on refresh, not just on first init
        scrub: true,
        onUpdate: (self) => {
          setProgress(self.progress);
          window.__hero_progress = self.progress;  // exposed for verbose easter egg
        },
      });
      stRef.current = st;
    });
    // WEM lesson: layout shifts after fonts/images load → ScrollTrigger caches wrong start.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(initTimer);
      clearTimeout(t);
      if (st) st.kill();
    };
  }, [ref, distance, scroller]);

  return progress;
}
