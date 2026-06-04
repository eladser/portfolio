// Watches the home scroll container. If the user blasts from top to past the hero
// (scrollTop > heroDistance) in under `thresholdMs`, fire `onFire` exactly once.
// Resets if they go back to the top.

import { useEffect, useRef } from 'react';

export function useFastScrollDetector(scroller, { heroDistance = 2400, thresholdMs = 1200 }, onFire) {
  const startedAt = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const sc = scroller?.current;
    if (!sc) return;
    const onScroll = () => {
      if (fired.current) return;
      const top = sc.scrollTop;
      if (top < 60) {
        startedAt.current = performance.now();
        return;
      }
      if (top > heroDistance && startedAt.current != null) {
        const elapsed = performance.now() - startedAt.current;
        if (elapsed < thresholdMs) {
          fired.current = true;
          onFire(elapsed);
        }
        startedAt.current = null;
      }
    };
    sc.addEventListener('scroll', onScroll, { passive: true });
    return () => sc.removeEventListener('scroll', onScroll);
  }, [scroller, heroDistance, thresholdMs, onFire]);
}
