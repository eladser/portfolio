// Mobile + reduced-motion gate. Same check used inside CareerHero3D, lifted so the
// parent can skip the lazy import altogether — keeps the 3D vendor chunks off mobile.

import { useEffect, useState } from 'react';

export function useEnable3D() {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mq1 = window.matchMedia('(hover: hover) and (min-width: 900px)');
    const mq2 = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setEnabled(mq1.matches && !mq2.matches);
    decide();
    mq1.addEventListener('change', decide);
    mq2.addEventListener('change', decide);
    return () => {
      mq1.removeEventListener('change', decide);
      mq2.removeEventListener('change', decide);
    };
  }, []);
  return enabled;
}
