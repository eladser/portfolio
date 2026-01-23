import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useSoundEffects - Hook for managing sound effects
 *
 * Features:
 * - Play different sound types (click, hover, success, error)
 * - Toggle sound on/off
 * - Volume control
 * - Respect user preferences (prefers-reduced-motion)
 *
 * Usage:
 * const { playSound, soundEnabled, toggleSound } = useSoundEffects();
 * playSound('click');
 */

const useSoundEffects = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;

    // Check localStorage
    const saved = localStorage.getItem('portfolio-sound-enabled');
    return saved === null ? false : saved === 'true';
  });

  const [volume, setVolume] = useState(0.3); // Default volume 30%
  const audioContextRef = useRef(null);

  // Initialize Web Audio API context
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-sound-enabled', soundEnabled.toString());
  }, [soundEnabled]);

  // Generate sound using Web Audio API
  const generateSound = useCallback((type) => {
    if (!audioContextRef.current || !soundEnabled) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configure sound based on type
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
        break;

      case 'hover':
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.03);
        break;

      case 'success':
        // Play two notes for success
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);

        // Second note
        const oscillator2 = ctx.createOscillator();
        const gainNode2 = ctx.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(ctx.destination);
        oscillator2.frequency.value = 659.25; // E5
        oscillator2.type = 'sine';
        gainNode2.gain.setValueAtTime(volume, ctx.currentTime + 0.1);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        oscillator2.start(ctx.currentTime + 0.1);
        oscillator2.stop(ctx.currentTime + 0.2);
        break;

      case 'error':
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
        break;

      case 'notification':
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.08);
        break;

      default:
        oscillator.frequency.value = 440;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }
  }, [soundEnabled, volume]);

  const playSound = useCallback((type) => {
    generateSound(type);
  }, [generateSound]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const changeVolume = useCallback((newVolume) => {
    setVolume(Math.max(0, Math.min(1, newVolume)));
  }, []);

  return {
    playSound,
    soundEnabled,
    toggleSound,
    volume,
    changeVolume,
  };
};

export default useSoundEffects;
