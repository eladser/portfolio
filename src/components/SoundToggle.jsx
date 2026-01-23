import { Volume2, VolumeX } from 'lucide-react';
import useSoundEffects from '../hooks/useSoundEffects';

/**
 * SoundToggle - Toggle button for sound effects
 *
 * Features:
 * - Toggle sound on/off
 * - Visual feedback
 * - Accessible
 *
 * Usage:
 * <SoundToggle isDark={true} />
 */

const SoundToggle = ({ isDark = true }) => {
  const { soundEnabled, toggleSound, playSound } = useSoundEffects();

  const handleClick = () => {
    if (!soundEnabled) {
      // Play a test sound when enabling
      setTimeout(() => playSound('click'), 100);
    }
    toggleSound();
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-lg transition-colors ${
        soundEnabled
          ? isDark
            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          : isDark
          ? 'bg-white/[0.05] text-zinc-500 hover:bg-white/[0.1]'
          : 'bg-black/[0.05] text-zinc-500 hover:bg-black/[0.1]'
      }`}
      aria-label={soundEnabled ? 'Disable sound effects' : 'Enable sound effects'}
      title={soundEnabled ? 'Sound effects enabled' : 'Sound effects disabled'}
    >
      {soundEnabled ? (
        <Volume2 size={18} aria-hidden="true" />
      ) : (
        <VolumeX size={18} aria-hidden="true" />
      )}
    </button>
  );
};

export default SoundToggle;
