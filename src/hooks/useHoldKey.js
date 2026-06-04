// Generic "hold a key for N ms to fire" detector. Used for the hold-` verbose
// easter egg. Ignores hold inside typeable elements so it doesn't trigger when
// the user is typing in the terminal.

import { useEffect } from 'react';

export function useHoldKey(targetCode, ms, onFire) {
  useEffect(() => {
    let timer = null;
    const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };

    const isTyping = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);

    const onDown = (e) => {
      if (e.code !== targetCode) return;
      if (isTyping(e.target)) return;
      if (e.repeat) return;        // OS repeat keydowns shouldn't reset the timer
      if (timer) return;
      timer = setTimeout(() => { timer = null; onFire(); }, ms);
    };
    const onUp = (e) => { if (e.code === targetCode) cancel(); };
    const onBlur = () => cancel();

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      cancel();
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [targetCode, ms, onFire]);
}
