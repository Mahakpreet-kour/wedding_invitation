import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  reducedMotion: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownTimer({ targetDate, reducedMotion }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-[#e1b800]/30">
      <h3 className="text-3xl md:text-4xl font-dancing text-[#e1b800] text-center mb-6">
        Countdown to Forever
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className={`text-center p-4 bg-gradient-to-br from-[#ffe6f0] to-[#fff8f5] rounded-2xl shadow-lg ${!reducedMotion ? 'hover:scale-105 transition-transform' : ''}`}
          >
            <div className={`text-4xl md:text-5xl font-bold text-[#e1b800] mb-2 ${!reducedMotion ? 'animate-glow' : ''}`}>
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-poppins text-gray-600 uppercase tracking-wider">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountdownTimer;
