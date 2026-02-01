import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../contexts/SoundContext';

const SoundToggle = ({ isDark = true }) => {
  const { soundEnabled, toggleSound, playSound } = useSound();

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
            ? 'bg-purple-950 text-purple-400 hover:bg-purple-900'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          : isDark
          ? 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
          : 'bg-black/[0.05] text-gray-400 hover:bg-black/[0.1]'
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
