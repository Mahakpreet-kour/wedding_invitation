import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    // Try to load the wedding song - "Sajaya H Aaj Din Khushiya Da"
    // Option 1: Local file in public folder (rename your file to wedding-song.mp3)
    audioRef.current.src = '/wedding-song.mp3';
    
    // Option 2: If you have an online URL, uncomment and use this:
    // audioRef.current.src = 'https://your-song-url.com/song.mp3';
    
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    audioRef.current.preload = 'auto';

    // Handle audio loading errors
    audioRef.current.addEventListener('error', (e) => {
      console.log('Audio file not found. Please add wedding-song.mp3 to public folder or use online URL.');
      setHasError(true);
    });

    // Handle when audio can play
    audioRef.current.addEventListener('canplay', () => {
      setHasError(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('canplay', () => {});
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
      // Try to play the audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((error) => {
            console.log('Audio playback failed:', error);
            setHasError(true);
            setIsPlaying(false);
            alert('Music file not found. Please add wedding-song.mp3 to the public folder.');
          });
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
