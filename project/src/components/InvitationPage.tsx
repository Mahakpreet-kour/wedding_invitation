import { useEffect, useState } from 'react';
import { Calendar, MapPin, Share2, Heart } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import FloatingPetals from './FloatingPetals';
import Guestbook from './Guestbook';

interface InvitationPageProps {
  reducedMotion: boolean;
}

function InvitationPage({ reducedMotion }: InvitationPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSaveDate = () => {
    const event = {
      title: 'Inder & Tanisha Wedding',
      description: 'Wedding Ceremony of Inder and Tanisha',
      location: 'Belleave Inn, Sri Ganganagar',
      start: '2025-12-06T12:00:00',
      end: '2025-12-06T18:00:00',
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start.replace(/[-:]/g, '')}/${event.end.replace(/[-:]/g, '')}`;

    window.open(googleCalendarUrl, '_blank');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleShare = async () => {
    const shareText = 'You are invited to the wedding of Inder & Tanisha on December 6, 2025! 💍✨';
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Wedding Invitation', text: shareText, url: shareUrl });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className={`min-h-screen py-12 px-4 relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <FloatingPetals reducedMotion={reducedMotion} />

      {showConfetti && !reducedMotion && <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {['💖', '✨', '🌸', '💐', '🎉'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>}

      <div className="max-w-4xl mx-auto space-y-12">
        <div className={`text-center space-y-6 ${!reducedMotion ? 'animate-slideUp' : ''}`}>
          <h2 className="text-5xl md:text-7xl font-dancing text-[#e1b800] drop-shadow-[0_0_20px_rgba(225,184,0,0.4)]">
            You Are Invited
          </h2>

          <div className="bg-gradient-to-br from-white via-pink-50/50 to-white backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            <div className="absolute top-4 left-4 w-20 h-20 bg-pink-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl"></div>

            <p className="text-2xl md:text-3xl font-poppins text-gray-800 leading-relaxed">
              to attend the wedding ceremony of
            </p>

            <div className="my-8">
              <h3 className="text-6xl md:text-8xl font-dancing bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 bg-clip-text text-transparent my-4 drop-shadow-lg">
                Inder & Tanisha
              </h3>
            </div>

            <div className="space-y-6 text-left md:text-center">
              <div className="flex items-start md:items-center md:justify-center gap-3 text-lg md:text-xl text-gray-800">
                <Calendar className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1 md:mt-0" />
                <div>
                  <p className="font-semibold text-pink-600">Haldi & Ladies Sangeet</p>
                  <p className="text-gray-700">5 December 2025</p>
                  <p className="text-base text-gray-600">Khurana House, Radheshyam Road, Sri Ganganagar</p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"></div>

              <div className="flex items-start md:items-center md:justify-center gap-3 text-lg md:text-xl text-gray-800">
                <Calendar className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1 md:mt-0" />
                <div>
                  <p className="font-semibold text-pink-600">Wedding Ceremony</p>
                  <p className="text-gray-700">6 December 2025 at 12:00 PM</p>
                  <p className="text-base text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    Belleave Inn, Sri Ganganagar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={!reducedMotion ? 'animate-slideUp animation-delay-200' : ''}>
          <CountdownTimer targetDate="2025-12-06T12:00:00" reducedMotion={reducedMotion} />
        </div>

        <div className={`flex flex-wrap justify-center gap-4 ${!reducedMotion ? 'animate-slideUp animation-delay-400' : ''}`}>
          <button
            onClick={handleSaveDate}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-poppins font-semibold"
          >
            <Calendar className="w-5 h-5" />
            Save the Date
          </button>

          <button
            onClick={handleShare}
            className="px-8 py-4 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-poppins font-semibold"
          >
            <Share2 className="w-5 h-5" />
            Share via WhatsApp
          </button>

          <button
            onClick={copyLink}
            className="px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-poppins font-semibold border-2 border-pink-300/50"
          >
            Copy Link
          </button>
        </div>

        <div className={!reducedMotion ? 'animate-slideUp animation-delay-600' : ''}>
          <Guestbook />
        </div>

        <div className={`text-center py-12 ${!reducedMotion ? 'animate-slideUp animation-delay-800' : ''}`}>
          <h3 className="text-4xl md:text-5xl font-dancing bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 bg-clip-text text-transparent mb-4">
            See you at the wedding
          </h3>
          <div className="text-6xl mb-6">💍</div>
          <div className="space-y-2">
            <p className="text-lg font-poppins text-gray-800 italic font-medium">With love from</p>
            <div className="flex flex-wrap justify-center gap-3 text-lg font-poppins text-pink-600 font-semibold">
              {['Riya', 'Gautam', 'Bani', 'Lado', 'Bolu', 'Noor'].map((name, index) => (
                <span
                  key={name}
                  className={!reducedMotion ? 'animate-twinkle' : ''}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {name}{index < 5 ? ',' : ''}
                </span>
              ))}
              <Heart className="w-5 h-5 inline-block text-pink-500 animate-pulse" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;
