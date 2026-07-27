import { useEffect, useRef, useState } from 'react';

// True while the nav should be on screen. Each view has its own scroll container
// and only the home one has a ref, so this listens on document in the capture
// phase — scroll doesn't bubble, but it does capture, which catches all three
// without threading refs through.
export function useHideOnScroll(threshold = 120) {
  const [shown, setShown] = useState(true);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = (e) => {
      const top = e.target?.scrollTop ?? 0;
      const down = top > last.current;
      last.current = top;
      // Ignore the jitter that a trackpad produces at rest
      setShown(top < threshold || !down);
    };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [threshold]);

  return shown;
}
