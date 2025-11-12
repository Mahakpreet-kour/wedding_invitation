import { useEffect, useState } from 'react';

interface BackgroundEffectsProps {
  reducedMotion: boolean;
}

function BackgroundEffects({ reducedMotion }: BackgroundEffectsProps) {
  const [lights, setLights] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const newLights = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
    setLights(newLights);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {lights.map((light) => (
          <div
            key={light.id}
            className="absolute w-1 h-1 bg-[#e1b800] rounded-full animate-twinkle blur-[1px]"
            style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              animationDelay: `${light.delay}s`,
              animationDuration: `${light.duration}s`,
              boxShadow: '0 0 10px rgba(225, 184, 0, 0.8)',
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#ffe6f0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fff8f5] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#e1b800] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </>
  );
}

export default BackgroundEffects;
