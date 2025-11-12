import { useState } from 'react';
import HomePage from './components/HomePage';
import InvitationPage from './components/InvitationPage';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  // Always keep animations enabled - no reduced motion
  const reducedMotion = false;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ffe6f0] via-[#ffd6e8] to-[#ffc0d9]">
      <BackgroundEffects reducedMotion={reducedMotion} />
      <MusicPlayer />

      {!showInvitation ? (
        <HomePage onOpenInvitation={() => setShowInvitation(true)} reducedMotion={reducedMotion} />
      ) : (
        <InvitationPage reducedMotion={reducedMotion} />
      )}
    </div>
  );
}

export default App;
