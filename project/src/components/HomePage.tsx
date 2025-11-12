import { useState } from 'react';
import { Heart } from 'lucide-react';

interface HomePageProps {
  onOpenInvitation: () => void;
  reducedMotion: boolean;
}

function HomePage({ onOpenInvitation, reducedMotion }: HomePageProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleRoseClick = () => {
    const audio = new Audio();
    audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwF';
    audio.play().catch(() => {});
    onOpenInvitation();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 relative z-10 ${!reducedMotion ? 'animate-fadeIn' : ''}`}>
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-dancing text-[#e1b800] drop-shadow-[0_0_20px_rgba(225,184,0,0.4)] animate-glow">
          Wedding Invitation
        </h1>

        <div className={`flex justify-center my-8 ${!reducedMotion ? 'animate-spin-slow' : ''}`}>
          <div className="relative flex items-center">
            <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 4px 8px rgba(212, 172, 13, 0.4))' }}>
              <defs>
                {/* Golden gradient for ring borders */}
                <linearGradient id="goldBorder1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="25%" stopColor="#ffed4e" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="75%" stopColor="#daa520" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
                <linearGradient id="goldBorder2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="25%" stopColor="#ffed4e" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="75%" stopColor="#daa520" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
              
              {/* First Ring - Only golden border */}
              <g transform="translate(60, 100)">
                {/* Outer golden ring border */}
                <circle cx="0" cy="0" r="45" fill="none" stroke="url(#goldBorder1)" strokeWidth="4" opacity="0.95"/>
                {/* Inner golden ring border */}
                <circle cx="0" cy="0" r="30" fill="none" stroke="url(#goldBorder1)" strokeWidth="3" opacity="0.9"/>
              </g>
              
              {/* Second Ring - Interlocked, only golden border */}
              <g transform="translate(140, 100)">
                {/* Outer golden ring border */}
                <circle cx="0" cy="0" r="45" fill="none" stroke="url(#goldBorder2)" strokeWidth="4" opacity="0.95"/>
                {/* Inner golden ring border */}
                <circle cx="0" cy="0" r="30" fill="none" stroke="url(#goldBorder2)" strokeWidth="3" opacity="0.9"/>
              </g>
            </svg>
          </div>
        </div>

        <div
          className={`relative group cursor-pointer my-12 ${!reducedMotion ? 'animate-float' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-white rounded-3xl p-3 md:p-4 shadow-2xl transform transition-transform group-hover:scale-105 border-2 border-pink-200/50">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-white">
              <img
                src="/couple-photo.jpeg"
                alt="Inder and Tanisha"
                className="w-full h-auto max-h-[600px] md:max-h-[700px] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23ffe6f0" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="32" fill="%23e1b800"%3EInder %26 Tanisha%3C/text%3E%3C/svg%3E';
                }}
              />
              {isHovering && !reducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#e1b800]/20 via-transparent to-transparent flex items-center justify-center animate-shimmer">
                  <Heart className="w-20 h-20 text-white animate-pulse" fill="white" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <p className="text-xl md:text-2xl font-poppins text-gray-800 italic font-medium">
            Together forever, starting December 6, 2025
          </p>

          <button
            onClick={handleRoseClick}
            className={`group relative px-12 py-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 transform hover:scale-110 ${!reducedMotion ? 'animate-pulse-slow' : ''}`}
            aria-label="Open invitation"
          >
            <span className="text-5xl group-hover:scale-125 transition-transform inline-block drop-shadow-lg">🌹</span>
            <div className="absolute inset-0 bg-pink-300 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
          </button>

          <p className="text-sm text-gray-700 font-poppins font-medium">Click the rose to view invitation</p>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
