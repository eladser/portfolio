// Reduced-motion gate for the scroll hero.
//
// This used to exclude anything under 900px too, because the hero was ~931 kB of 3D
// stack plus 55.8 MB of models — indefensible on a phone. It's now three ~100 kB
// stills, so mobile gets the real hero; only a reduced-motion preference falls back
// to the static chapter list (a scroll-driven narrative is exactly what that opts out of).

import { useEffect, useState } from 'react';

export function useEnable3D() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setEnabled(!mq.matches);
    decide();
    mq.addEventListener('change', decide);
    return () => mq.removeEventListener('change', decide);
  }, []);
  return enabled;
}
