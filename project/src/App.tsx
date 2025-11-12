import { useState } from 'react';
import HomePage from './components/HomePage';
import InvitationPage from './components/InvitationPage';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ffe6f0] via-[#ffd6e8] to-[#ffc0d9]">
      <BackgroundEffects reducedMotion={reducedMotion} />
      <MusicPlayer />

      <button
        onClick={() => setReducedMotion(!reducedMotion)}
        className="fixed top-4 left-4 z-50 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full text-xs text-gray-700 hover:bg-white transition-all shadow-lg"
        aria-label="Toggle animations"
      >
        {reducedMotion ? '✨ Enable' : '⏸ Reduce'} Motion
      </button>

      {!showInvitation ? (
        <HomePage onOpenInvitation={() => setShowInvitation(true)} reducedMotion={reducedMotion} />
      ) : (
        <InvitationPage reducedMotion={reducedMotion} />
      )}
    </div>
  );
}

export default App;
