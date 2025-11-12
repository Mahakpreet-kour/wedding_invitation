import { useEffect, useState } from 'react';

interface FloatingPetalsProps {
  reducedMotion: boolean;
}

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
}

function FloatingPetals({ reducedMotion }: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-2xl animate-fall opacity-60"
          style={{
            left: `${petal.left}%`,
            top: '-10%',
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px) rotate(${petal.rotation}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}

export default FloatingPetals;
