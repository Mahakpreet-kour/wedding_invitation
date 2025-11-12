import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Define handlers outside try block so they're accessible in cleanup
    const handleError = () => {
      setHasError(true);
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        // Set start time to 5 seconds (skip intro)
        audioRef.current.currentTime = 5;
      }
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    const handlePlay = () => {
      if (audioRef.current && audioRef.current.currentTime < 5) {
        audioRef.current.currentTime = 5;
      }
    };

    try {
      audioRef.current = new Audio('/wedding-song.mp3');
      
      // Wedding song - "Aaj Sajeya" / "Sajaya H Aaj Din Khushiya Da"
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;
      audioRef.current.preload = 'auto';

      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('play', handlePlay);
    } catch (err) {
      console.error('Failed to initialize audio:', err);
      setHasError(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Check if file exists first
      if (hasError) {
        alert(`Music file not found!\n\nPlease add your song file:\n1. Download "Aaj Sajeya" song (MP3 format)\n2. Save it as "wedding-song.mp3"\n3. Place it in: project/public/wedding-song.mp3\n4. Refresh the page\n\nOr use an online URL by updating MusicPlayer.tsx`);
        return;
      }

      // Ensure audio is loaded and set to start position
      if (audioRef.current.readyState >= 2) {
        // Audio is loaded enough to play
        audioRef.current.currentTime = 5; // Start from 5 seconds
      }

      // Try to play the audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
            // Ensure song starts from 5 seconds (skip intro)
            if (audioRef.current) {
              audioRef.current.currentTime = 5;
            }
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((error) => {
            console.error('Audio playback failed:', error);
            setHasError(true);
            setIsPlaying(false);
            alert(`Music playback failed!\n\nError: ${error.message}\n\nPlease check:\n1. File exists at: project/public/wedding-song.mp3\n2. File format is MP3\n3. Browser allows audio playback\n4. Try refreshing the page`);
          });
      } else {
        // Fallback if play() doesn't return a promise
        setIsPlaying(true);
        setHasError(false);
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 right-4 z-50 p-3 bg-gradient-to-br from-pink-100 to-pink-200 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:from-pink-200 hover:to-pink-300 transition-all hover:scale-110 border-2 border-pink-300/50 ${hasError ? 'opacity-60' : ''}`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={hasError ? 'Music file not found - Add wedding-song.mp3 to public folder' : (isPlaying ? 'Music Playing - Click to Pause' : 'Click to Play Wedding Song')}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-pink-600 animate-pulse" />
      ) : (
        <VolumeX className={`w-6 h-6 ${hasError ? 'text-red-400' : 'text-pink-500'}`} />
      )}
    </button>
  );
}

export default MusicPlayer;
