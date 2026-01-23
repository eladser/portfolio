import { useEffect, useState, useCallback } from 'react';

/**
 * useEasterEggs - Hook for managing easter eggs
 *
 * Features:
 * - Konami code detection (↑↑↓↓←→←→BA)
 * - Secret mode activation
 * - Custom key sequences
 *
 * Usage:
 * const { secretMode, konamiActivated, activateSecret } = useEasterEggs();
 */

const useEasterEggs = () => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  // Konami code sequence
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA',
  ];

  const activateSecret = useCallback((secret) => {
    switch (secret) {
      case 'konami':
        setKonamiActivated(true);
        setSecretMode(true);
        // Show notification
        console.log('🎮 Konami Code Activated!');
        // You could also trigger confetti, change theme, etc.
        break;
      case 'matrix':
        // Trigger matrix rain effect
        console.log('🔢 Matrix Mode Activated!');
        break;
      case 'retro':
        // Activate retro theme
        console.log('👾 Retro Mode Activated!');
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Update key sequence
      setKeySequence((prev) => {
        const newSequence = [...prev, e.code];
        // Keep only last 10 keys
        if (newSequence.length > 10) {
          newSequence.shift();
        }

        // Check for Konami code
        if (newSequence.length === konamiCode.length) {
          const matches = konamiCode.every((key, index) => key === newSequence[index]);
          if (matches && !konamiActivated) {
            activateSecret('konami');
          }
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konamiActivated, activateSecret]);

  const resetEasterEggs = useCallback(() => {
    setKonamiActivated(false);
    setSecretMode(false);
    setKeySequence([]);
  }, []);

  return {
    konamiActivated,
    secretMode,
    activateSecret,
    resetEasterEggs,
  };
};

export default useEasterEggs;
